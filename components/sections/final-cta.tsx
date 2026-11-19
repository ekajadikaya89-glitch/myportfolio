import { LinkButton } from '@/components/layout/link-button'
import { siteConfig } from '@/content/site'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { ExternalLinkIcon, GitHubIcon } from '@/lib/icons'

export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="cta-title" className="border-t border-border bg-card">
      <div className="container-page flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="flex max-w-xl flex-col gap-2.5">
          <h2 id="cta-title" className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight text-balance-tight">
            {dict.cta.title}
          </h2>
          <p className="text-base text-muted-foreground">{dict.cta.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href={localePath(locale, '/contact')}>{dict.cta.primary}</LinkButton>
          <LinkButton href={siteConfig.github} external variant="secondary">
            <GitHubIcon />
            <span>{dict.cta.secondary}</span>
            <ExternalLinkIcon className="size-3.5 opacity-75" />
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
