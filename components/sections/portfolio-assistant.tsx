'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { AssistantResponse } from '@/lib/assistant'
import { AlertIcon, ExternalLinkIcon, LoaderIcon, SendIcon } from '@/lib/icons'

type Props = {
  locale: Locale
  copy: Dictionary['assistant']
}

export function PortfolioAssistant({ locale, copy }: Props) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AssistantResponse | null>(null)
  const [showTrace, setShowTrace] = useState(false)

  async function runQuery(text: string) {
    const trimmed = text.trim()
    if (trimmed.length < 2) {
      setError(copy.validationError)
      return
    }
    setQuery(trimmed)
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, locale }),
      })
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string }
        setError(data.error || copy.requestError)
        return
      }
      const data = (await response.json()) as AssistantResponse
      setResult(data)
    } catch {
      setError(copy.requestError)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void runQuery(query)
  }

  const modeLabel =
    result?.trace.mode === 'grounded-rag-llm' ? copy.modeLlm : copy.modeRetrieval

  return (
    <section id="explorer" aria-labelledby="assistant-title" className="scroll-mt-20 border-t border-border">
      <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-4">
          <p className="font-mono text-xs font-medium text-brand">{copy.eyebrow}</p>
          <h2
            id="assistant-title"
            className="text-[clamp(1.75rem,3.4vw,2.65rem)] font-semibold leading-[1.12] text-balance-tight"
          >
            {copy.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{copy.description}</p>

          <div className="mt-2 flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">{copy.promptsLabel}</p>
            <div className="flex flex-col gap-2">
              {copy.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={loading}
                  onClick={() => void runQuery(prompt)}
                  className="inline-flex min-h-11 items-center rounded-lg border border-input bg-card px-3.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-elevated active:translate-y-px disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <label htmlFor="assistant-query" className="text-sm font-medium text-foreground">
              {copy.inputLabel}
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                id="assistant-query"
                name="query"
                type="text"
                maxLength={300}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.inputPlaceholder}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={error ? 'assistant-error' : undefined}
                className="min-h-11 flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px disabled:opacity-60"
              >
                {loading ? <LoaderIcon className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
                <span>{loading ? copy.submitting : copy.submit}</span>
              </button>
            </div>
          </form>

          <div aria-live="polite" aria-busy={loading} className="flex flex-1 flex-col gap-4">
            {error ? (
              <p
                id="assistant-error"
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-destructive bg-background p-4 text-sm text-foreground"
              >
                <AlertIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
                <span>{error}</span>
              </p>
            ) : null}

            {loading ? (
              <div
                role="status"
                className="flex items-center gap-3 rounded-lg border border-border bg-background p-5 text-sm text-muted-foreground"
              >
                <LoaderIcon className="size-4 shrink-0 animate-spin text-brand" />
                <span>{copy.loadingState}</span>
              </div>
            ) : null}

            {!loading && !result && !error ? (
              <div className="rounded-lg border border-dashed border-input bg-background p-5 text-sm leading-relaxed text-muted-foreground">
                {copy.emptyState}
              </div>
            ) : null}

            {!loading && result ? (
              <div className="flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-background p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-xs">
                  <span className="font-mono font-medium text-brand">{modeLabel}</span>
                  <span className="font-mono text-muted-foreground">
                    {copy.guardrailLabel}: {result.trace.guardrail} · {result.trace.latencyMs}ms
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-sm leading-relaxed text-foreground whitespace-pre-line">
                  {result.answer}
                </div>

                {result.citations.length > 0 ? (
                  <div className="border-t border-border pt-3">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground">{copy.citationsLabel}</p>
                    <ul className="flex flex-wrap gap-2">
                      {result.citations.map((citation) => (
                        <li key={citation.id}>
                          {citation.external ? (
                            <a
                              href={citation.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-input bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                            >
                              <span>{citation.title}</span>
                              <ExternalLinkIcon className="size-3.5 shrink-0 text-muted-foreground" />
                            </a>
                          ) : (
                            <Link
                              href={citation.href}
                              className="inline-flex min-h-11 items-center rounded-md border border-input bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                            >
                              {citation.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="border-t border-border pt-3">
                  <button
                    type="button"
                    aria-expanded={showTrace}
                    onClick={() => setShowTrace((open) => !open)}
                    className="inline-flex min-h-11 items-center rounded-md px-2 font-mono text-xs font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground active:translate-y-px"
                  >
                    {showTrace ? copy.hideTrace : copy.inspectTrace}
                  </button>
                  {showTrace ? (
                    <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-md border border-border bg-card p-3 font-mono text-xs leading-relaxed text-muted-foreground">
                      {JSON.stringify(
                        {
                          mode: result.trace.mode,
                          guardrail: result.trace.guardrail,
                          chunksIndexed: result.trace.chunksIndexed,
                          chunksRetrieved: result.trace.chunksRetrieved,
                          latencyMs: result.trace.latencyMs,
                          fallbackUsed: result.trace.fallbackUsed,
                          scores: result.citations.map((c) => ({ id: c.id, score: c.score })),
                        },
                        null,
                        2,
                      )}
                    </pre>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
