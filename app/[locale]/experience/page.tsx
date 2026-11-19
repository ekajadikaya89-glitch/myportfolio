import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/layout/reveal'
import { experience } from '@/content/experience'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { BriefcaseIcon, ProgramIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/experience', title: dict.nav.experience, description: dict.experiencePage.description })
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.experiencePage

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="container-page py-16 md:py-24">
        <ol className="relative flex flex-col gap-10 border-l border-border pl-7 md:pl-11">
          {experience.map((entry) => (
            <Reveal as="li" key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.75rem+17px)] top-0 flex size-8 items-center justify-center rounded-md border border-input bg-background text-brand md:-left-[calc(2.75rem+17px)]"
              >
                {entry.kind === 'role' ? <BriefcaseIcon className="size-4" /> : <ProgramIcon className="size-4" />}
              </span>
              <article className="rounded-xl border border-border bg-card p-6 md:p-8">
                <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium text-brand">
                      {entry.kind === 'role' ? t.role : t.program}
                    </p>
                    <h2 className="mt-1.5 text-xl font-semibold tracking-tight md:text-2xl">{l(entry.title, locale)}</h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">{entry.organization}</p>
                  </div>
                  {entry.period ? <p className="font-mono text-sm text-muted-foreground">{entry.period}</p> : null}
                </header>
                <p className="mt-4 leading-relaxed text-muted-foreground">{l(entry.summary, locale)}</p>

                <div className="mt-7 grid gap-8 border-t border-border pt-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-foreground">{t.responsibilities}</h3>
                    <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                      {l(entry.responsibilities, locale).map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 inline-block size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {entry.projects?.length ? (
                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-foreground">{t.projects}</h3>
                      <ul className="flex flex-wrap gap-2">
                        {entry.projects.map((name) => (
                          <li
                            key={name}
                            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                {entry.note ? <p className="mt-6 text-xs text-muted-foreground">{l(entry.note, locale)}</p> : null}
              </article>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  )
}
