'use client'

import { usePathname } from 'next/navigation'
import { LinkButton } from '@/components/layout/link-button'
import { getDictionary } from '@/i18n/get-dictionary'
import { ArrowLeftIcon } from '@/lib/icons'

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/id') ? 'id' : 'en'
  const dict = getDictionary(locale)

  return (
    <section className="container-page flex min-h-[60dvh] flex-col items-start justify-center gap-5 py-20">
      <p className="font-mono text-xs font-medium text-brand">404</p>
      <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight">{dict.notFound.title}</h1>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">{dict.notFound.description}</p>
      <LinkButton href={`/${locale}`} variant="secondary">
        <ArrowLeftIcon />
        <span>{dict.notFound.back}</span>
      </LinkButton>
    </section>
  )
}
