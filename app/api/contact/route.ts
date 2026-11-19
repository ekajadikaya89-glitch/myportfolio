import { NextResponse } from 'next/server'
import { isAllowedContactEndpoint, MIN_FILL_MS, validateContact, type ContactPayload } from '@/lib/contact'

const recentByIp = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_TRACKED_IPS = 1000

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

function pruneRateLimitStore(now: number) {
  for (const [key, timestamps] of recentByIp.entries()) {
    const active = timestamps.filter((time) => now - time < WINDOW_MS)
    if (active.length === 0) {
      recentByIp.delete(key)
    } else {
      recentByIp.set(key, active)
    }
  }
  if (recentByIp.size > MAX_TRACKED_IPS) {
    const excess = recentByIp.size - MAX_TRACKED_IPS
    const keys = recentByIp.keys()
    for (let i = 0; i < excess; i++) {
      const oldest = keys.next().value
      if (oldest) recentByIp.delete(oldest)
    }
  }
}

function rateLimited(ip: string) {
  const now = Date.now()
  if (recentByIp.size >= 100) pruneRateLimitStore(now)
  const hits = (recentByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  hits.push(now)
  recentByIp.set(ip, hits)
  return hits.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  // Honeypot or too-fast submission: respond as success so bots learn nothing.
  const elapsed = Date.now() - Number(body.startedAt ?? 0)
  if (body.company || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ status: 'sent' }, { headers: NO_STORE_HEADERS })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ status: 'rate-limited' }, { status: 429, headers: NO_STORE_HEADERS })
  }

  const { errors, values } = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: 'invalid', errors }, { status: 422, headers: NO_STORE_HEADERS })
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT?.trim()
  if (!endpoint || !isAllowedContactEndpoint(endpoint)) {
    return NextResponse.json({ status: 'not-configured' }, { status: 503, headers: NO_STORE_HEADERS })
  }

  const topics = Array.isArray(body.topics) ? body.topics.filter((t) => typeof t === 'string').slice(0, 6) : []

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...values, topics: topics.join(', '), _subject: `[Portfolio] ${values.subject}` }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Delivery failed with ${response.status}`)
    return NextResponse.json({ status: 'sent' }, { headers: NO_STORE_HEADERS })
  } catch (error) {
    console.error('[contact] delivery error', error instanceof Error ? error.message : error)
    return NextResponse.json({ status: 'error' }, { status: 502, headers: NO_STORE_HEADERS })
  }
}
