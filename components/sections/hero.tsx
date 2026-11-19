import { LinkButton } from '@/components/layout/link-button'
import { Reveal } from '@/components/layout/reveal'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { DownloadIcon, MapPinIcon } from '@/lib/icons'
import { getResumeLink } from '@/lib/resume'
import { HeroVisual } from './hero-visual'
import { TechTicker } from './tech-ticker'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const resume = getResumeLink(locale)

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid items-center gap-12 pb-14 pt-10 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-20">
        <div className="flex flex-col gap-6">
          <p className="inline-flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
            <span className="inline-block size-2 shrink-0 bg-success" aria-hidden="true" />
            <span>{dict.hero.label}</span>
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.25rem,5vw,4.15rem)] font-semibold leading-[1.06] text-balance-tight"
          >
            {dict.hero.headline}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {dict.hero.description}
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <LinkButton href={localePath(locale, '/projects')}>{dict.hero.primaryCta}</LinkButton>
            <LinkButton href={localePath(locale, '/contact')} variant="secondary">
              {dict.hero.secondaryCta}
            </LinkButton>
            <LinkButton
              href={resume.href}
              download={resume.isFile ? 'Eka-Prasetyo-Resume.pdf' : false}
              variant="ghost"
            >
              <DownloadIcon />
              {dict.hero.resumeCta}
            </LinkButton>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon className="size-4 shrink-0 text-brand" />
            <span>{dict.hero.basedIn}</span>
          </p>
        </div>

        <Reveal delay={0.08} className="w-full">
          <HeroVisual caption={dict.hero.visualCaption} />
        </Reveal>
      </div>
      <TechTicker items={dict.ticker} controls={dict.tickerControls} />
    </section>
  )
}
