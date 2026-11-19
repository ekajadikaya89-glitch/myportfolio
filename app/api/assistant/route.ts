import { NextResponse } from 'next/server'
import { isLocale, type Locale } from '@/i18n/config'
import {
  buildGroundedSystemPrompt,
  detectPromptInjection,
  retrieveGroundedChunks,
  synthesizeDeterministicAnswer,
  type AssistantResponse,
  type RetrievedChunk,
} from '@/lib/assistant'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }
const recentByIp = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 20
const MAX_TRACKED_IPS = 1000

function rateLimited(ip: string): boolean {
  const now = Date.now()
  if (recentByIp.size >= 150) {
    for (const [key, times] of recentByIp.entries()) {
      const fresh = times.filter((t) => now - t < WINDOW_MS)
      if (fresh.length === 0) recentByIp.delete(key)
      else recentByIp.set(key, fresh)
    }
    if (recentByIp.size > MAX_TRACKED_IPS) recentByIp.clear()
  }
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recentByIp.set(ip, hits)
  return hits.length > MAX_PER_WINDOW
}

async function synthesizeWithOptionalLlm(
  query: string,
  chunks: RetrievedChunk[],
  locale: Locale,
): Promise<string | null> {
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  if (openaiKey) {
    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini'
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 260,
        messages: [
          { role: 'system', content: buildGroundedSystemPrompt(chunks, locale) },
          { role: 'user', content: query },
        ],
      }),
      signal: AbortSignal.timeout(9_000),
    })
    if (!response.ok) throw new Error(`OpenAI returned ${response.status}`)
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const text = data.choices?.[0]?.message?.content?.trim()
    return text ? text.replace(/\u2014/g, ', ') : null
  }

  const geminiKey = process.env.GEMINI_API_KEY?.trim()
  if (geminiKey) {
    const model = process.env.GEMINI_MODEL?.trim() || 'gemini-2.0-flash'
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildGroundedSystemPrompt(chunks, locale) }] },
          contents: [{ role: 'user', parts: [{ text: query }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 260 },
        }),
        signal: AbortSignal.timeout(9_000),
      },
    )
    if (!response.ok) throw new Error(`Gemini returned ${response.status}`)
    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    return text ? text.replace(/\u2014/g, ', ') : null
  }

  return null
}

export async function POST(request: Request) {
  const started = performance.now()

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please retry later.' }, { status: 429, headers: NO_STORE_HEADERS })
  }

  let body: { query?: unknown; locale?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const query = typeof body.query === 'string' ? body.query.trim().slice(0, 300) : ''
  const locale: Locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : 'en'

  if (query.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters.' }, { status: 422, headers: NO_STORE_HEADERS })
  }

  if (detectPromptInjection(query)) {
    const payload: AssistantResponse = {
      answer:
        locale === 'id'
          ? 'Permintaan ditolak oleh guardrail keamanan. Asisten ini hanya menjawab pertanyaan faktual berdasarkan data portfolio terverifikasi dan mengabaikan upaya mengubah instruksi sistem.'
          : 'Request blocked by input guardrail. This assistant only answers factual questions grounded in verified portfolio records and ignores attempts to override instructions.',
      citations: [],
      trace: {
        mode: 'grounded-retrieval',
        guardrail: 'blocked_injection',
        chunksIndexed: 0,
        chunksRetrieved: 0,
        latencyMs: Math.max(1, Math.round(performance.now() - started)),
        fallbackUsed: false,
      },
    }
    return NextResponse.json(payload, { headers: NO_STORE_HEADERS })
  }

  const { chunks, totalIndexed } = retrieveGroundedChunks(query, locale, 4)

  if (chunks.length === 0) {
    const payload: AssistantResponse = {
      answer: synthesizeDeterministicAnswer([], locale),
      citations: [],
      trace: {
        mode: 'grounded-retrieval',
        guardrail: 'out_of_scope',
        chunksIndexed: totalIndexed,
        chunksRetrieved: 0,
        latencyMs: Math.max(1, Math.round(performance.now() - started)),
        fallbackUsed: false,
      },
    }
    return NextResponse.json(payload, { headers: NO_STORE_HEADERS })
  }

  let mode: AssistantResponse['trace']['mode'] = 'grounded-retrieval'
  let fallbackUsed = false
  let answer = synthesizeDeterministicAnswer(chunks, locale)

  if (process.env.OPENAI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()) {
    try {
      const llmText = await synthesizeWithOptionalLlm(query, chunks, locale)
      if (llmText) {
        answer = llmText
        mode = 'grounded-rag-llm'
      } else {
        fallbackUsed = true
      }
    } catch (error) {
      console.error('[assistant] LLM fallback triggered:', error instanceof Error ? error.message : error)
      fallbackUsed = true
    }
  }

  const payload: AssistantResponse = {
    answer,
    citations: chunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      kind: chunk.kind,
      href: chunk.href,
      ...(chunk.external ? { external: true } : {}),
      score: chunk.score,
    })),
    trace: {
      mode,
      guardrail: 'passed',
      chunksIndexed: totalIndexed,
      chunksRetrieved: chunks.length,
      latencyMs: Math.max(1, Math.round(performance.now() - started)),
      fallbackUsed,
    },
  }

  return NextResponse.json(payload, { headers: NO_STORE_HEADERS })
}
