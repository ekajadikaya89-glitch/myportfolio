import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/layout/reveal'
import { TechMark } from '@/components/skills/tech-mark'
import { skillGroups } from '@/content/skills'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { DomainIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

const LEAD_GROUP_IDS = new Set(['ai', 'backend', 'frontend'])

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/skills', title: dict.nav.expertise, description: dict.skills.description })
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const leadGroups = skillGroups.filter((group) => LEAD_GROUP_IDS.has(group.id))
  const supportingGroups = skillGroups.filter((group) => !LEAD_GROUP_IDS.has(group.id))

  return (
    <>
      <PageHeader eyebrow={dict.skills.eyebrow} title={dict.skills.title} description={dict.skills.description} />

      <section aria-labelledby="lead-stack" className="container-page py-14 md:py-20">
        <h2 id="lead-stack" className="mb-8 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {dict.skills.leadHeading}
        </h2>
        <ul className="flex flex-col gap-5">
          {leadGroups.map((group, index) => (
            <Reveal
              as="li"
              key={group.id}
              delay={index * 0.04}
              className="scroll-mt-24 rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <article id={group.id} className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-start lg:gap-10">
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-input bg-background text-brand">
                    <DomainIcon name={group.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">{l(group.title, locale)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{l(group.description, locale)}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                    >
                      <TechMark name={item.name} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="supporting-stack" className="border-t border-border">
        <div className="container-page py-14 md:py-20">
          <h2 id="supporting-stack" className="mb-8 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {dict.skills.supportingHeading}
          </h2>
          <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {supportingGroups.map((group) => (
              <li key={group.id} id={group.id} className="scroll-mt-24 border-t border-border pt-6">
                <article className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground">
                      <DomainIcon name={group.icon} className="size-4" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">{l(group.title, locale)}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{l(group.description, locale)}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        <TechMark name={item.name} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">{dict.skills.note}</p>
        </div>
      </section>
    </>
  )
}
