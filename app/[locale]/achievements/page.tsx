import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/layout/reveal'
import { achievements } from '@/content/achievements'
import { getProject } from '@/content/projects'
import { isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { AwardIcon, ExternalLinkIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/achievements', title: dict.nav.achievements, description: dict.achievementsPage.description })
}

export default async function AchievementsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.achievementsPage

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="container-page py-16 md:py-24">
        <ol className="divide-y divide-border border-y border-border">
          {achievements.map((item, index) => {
            const related = item.relatedProject ? getProject(item.relatedProject) : undefined
            return (
              <Reveal as="li" key={item.id} delay={index * 0.05} className="py-8 md:py-10">
                <article className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-10">
                  <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-2">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-input bg-card text-brand">
                      <AwardIcon className="size-5" />
                    </span>
                    <div className="flex items-baseline gap-3 md:flex-col md:gap-0.5">
                      <p className="text-3xl font-semibold tracking-tight text-foreground">{l(item.recognition, locale)}</p>
                      <p className="font-mono text-xs text-muted-foreground">{item.year}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{item.event}</h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {l(item.description, locale)}
                    </p>
                    {related || item.evidenceUrl ? (
                      <div className="mt-2 flex flex-wrap gap-4 pt-1 text-sm">
                        {related ? (
                          <Link
                            href={localePath(locale, `/projects/${related.slug}`)}
                            className="inline-flex min-h-11 items-center rounded-lg border border-input bg-card px-4 font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                          >
                            {t.related}: {related.name}
                          </Link>
                        ) : null}
                        {item.evidenceUrl ? (
                          <a
                            href={item.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 font-medium text-brand underline-offset-4 hover:underline"
                          >
                            <span>{dict.common.evidence}</span>
                            <ExternalLinkIcon className="size-4" />
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ol>
      </section>
    </>
  )
}
