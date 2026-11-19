import Link from 'next/link'
import { Reveal } from '@/components/layout/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { expertiseAreas } from '@/content/skills'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { DomainIcon } from '@/lib/icons'
import { l } from '@/lib/localize'

export function Expertise({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const leadAreas = expertiseAreas.filter((area) => area.tier === 'lead')
  const supportingAreas = expertiseAreas.filter((area) => area.tier === 'supporting')

  return (
    <section aria-labelledby="expertise-title" className="border-t border-border bg-card/40">
      <div className="container-page py-20 md:py-28">
        <SectionHeading
          id="expertise-title"
          eyebrow={dict.expertise.eyebrow}
          title={dict.expertise.title}
          description={dict.expertise.description}
        />

        {/* Lead tier: two spacious primary engineering panels */}
        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {leadAreas.map((area, index) => (
            <Reveal as="li" key={area.id} delay={index * 0.05}>
              <article className="flex h-full flex-col justify-between gap-6 rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-input bg-background text-brand">
                      <DomainIcon name={area.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{l(area.title, locale)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {l(area.description, locale)}
                  </p>
                  <ul className="mt-1 flex flex-col gap-2 border-t border-border pt-4 text-sm text-foreground">
                    {l(area.deliverables, locale).map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="inline-block size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href={localePath(locale, area.href)}
                    className="inline-flex min-h-11 items-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                  >
                    {l(area.cta, locale)}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Supporting tier: horizontal specification ledger rows (distinct from boxed cards above) */}
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {supportingAreas.map((area, index) => (
            <li key={area.id} className="grid gap-4 py-6 md:grid-cols-[240px_1fr_auto] md:items-center md:gap-8">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground">
                  <DomainIcon name={area.icon} className="size-4" />
                </span>
                <div>
                  <span className="block font-mono text-xs text-muted-foreground">0{index + 3}</span>
                  <h3 className="text-base font-semibold tracking-tight">{l(area.title, locale)}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{l(area.description, locale)}</p>
              <Link
                href={localePath(locale, area.href)}
                className="inline-flex min-h-11 w-fit items-center rounded-lg px-3 text-sm font-medium text-brand underline-offset-4 hover:underline active:opacity-80"
              >
                {l(area.cta, locale)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
