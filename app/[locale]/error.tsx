'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDictionary } from '@/i18n/get-dictionary'
import { AlertIcon } from '@/lib/icons'

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/id') ? 'id' : 'en'
  const dict = getDictionary(locale)

  return (
    <section
      role="alert"
      className="container-page flex min-h-[60dvh] flex-col items-start justify-center gap-5 py-20"
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-destructive">
        <AlertIcon className="size-4" />
        <span>ERROR</span>
      </span>
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
        {dict.states.errorTitle}
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
        {dict.states.errorDescription}
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px"
        >
          {dict.states.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-flex min-h-11 items-center rounded-lg border border-input bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
        >
          {dict.notFound.back}
        </Link>
      </div>
    </section>
  )
}
