'use client'

import { useRef, useState } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import { validateContact, type ContactField } from '@/lib/contact'
import { AlertIcon, CheckIcon, LoaderIcon, SendIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid' | 'not-configured'

type ContactFormProps = {
  labels: Dictionary['contact']['form']
  topics: string[]
  topicsLabel: string
  configured: boolean
}

const fields: { name: ContactField; type: 'text' | 'email' | 'textarea'; autoComplete?: string }[] = [
  { name: 'name', type: 'text', autoComplete: 'name' },
  { name: 'email', type: 'email', autoComplete: 'email' },
  { name: 'subject', type: 'text' },
  { name: 'message', type: 'textarea' },
]

export function ContactForm({ labels, topics, topicsLabel, configured }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<ContactField, true>>>({})
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const startedAt = useRef(Date.now())

  const toggleTopic = (topic: string) =>
    setSelectedTopics((current) => (current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic]))

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const result = validateContact(data)
    setErrors(result.errors)

    if (Object.keys(result.errors).length > 0) {
      setStatus('invalid')
      const firstInvalid = fields.find((field) => result.errors[field.name])
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...result.values,
          topics: selectedTopics,
          company: data.company ?? '',
          startedAt: startedAt.current,
        }),
      })
      const json = (await response.json().catch(() => ({}))) as { status?: Status; errors?: typeof errors }
      if (json.status === 'sent') {
        setStatus('sent')
        form.reset()
        setSelectedTopics([])
      } else if (json.status === 'invalid') {
        setErrors(json.errors ?? {})
        setStatus('invalid')
      } else if (json.status === 'not-configured') {
        setStatus('not-configured')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const feedback: Partial<Record<Status, { tone: 'ok' | 'warn' | 'err'; text: string }>> = {
    sent: { tone: 'ok', text: labels.success },
    error: { tone: 'err', text: labels.error },
    invalid: { tone: 'err', text: labels.invalid },
    'not-configured': { tone: 'warn', text: labels.notConfigured },
  }
  const current = feedback[status]

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 pb-8 sm:pb-0">
      {!configured ? (
        <p className="flex gap-3 rounded-lg border border-warning bg-background p-4 text-sm leading-relaxed text-foreground">
          <AlertIcon className="mt-0.5 size-4 shrink-0 text-warning" />
          <span>{labels.setupNotice}</span>
        </p>
      ) : null}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium text-foreground">{topicsLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const selected = selectedTopics.includes(topic)
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTopic(topic)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors active:translate-y-px',
                  selected
                    ? 'border-brand bg-elevated text-foreground'
                    : 'border-input bg-background text-muted-foreground hover:bg-elevated hover:text-foreground',
                )}
              >
                {selected ? <CheckIcon className="size-3.5 text-brand" /> : null}
                <span>{topic}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `contact-${field.name}`
          const errorId = `${id}-error`
          const invalid = Boolean(errors[field.name])
          const shared = {
            id,
            name: field.name,
            autoComplete: field.autoComplete,
            placeholder: labels[`${field.name}Placeholder` as const],
            'aria-invalid': invalid || undefined,
            'aria-describedby': invalid ? errorId : undefined,
            required: true,
            className: cn(
              'min-h-11 w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring',
              invalid ? 'border-destructive' : 'border-input',
            ),
          }
          return (
            <div
              key={field.name}
              className={cn('flex flex-col gap-2', (field.name === 'subject' || field.type === 'textarea') && 'sm:col-span-2')}
            >
              <label htmlFor={id} className="text-sm font-medium text-foreground">
                {labels[field.name]}
              </label>
              {field.type === 'textarea' ? (
                <textarea {...shared} rows={6} maxLength={5000} className={cn(shared.className, 'resize-y')} />
              ) : (
                <input {...shared} type={field.type} maxLength={field.name === 'subject' ? 150 : 200} />
              )}
              {invalid ? (
                <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
                  {labels.errors[field.name]}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" role="status">
        {current ? (
          <p
            className={cn(
              'flex gap-3 rounded-lg border bg-background p-4 text-sm leading-relaxed text-foreground',
              current.tone === 'ok' && 'border-success',
              current.tone === 'warn' && 'border-warning',
              current.tone === 'err' && 'border-destructive',
            )}
          >
            {current.tone === 'ok' ? (
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
            ) : (
              <AlertIcon
                className={cn(
                  'mt-0.5 size-4 shrink-0',
                  current.tone === 'warn' ? 'text-warning' : 'text-destructive',
                )}
              />
            )}
            <span>{current.text}</span>
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px disabled:opacity-60 sm:w-fit"
      >
        {status === 'sending' ? (
          <LoaderIcon className="size-4 animate-spin" />
        ) : (
          <SendIcon className="size-4" />
        )}
        <span>{status === 'sending' ? labels.sending : labels.submit}</span>
      </button>
    </form>
  )
}
