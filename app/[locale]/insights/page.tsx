import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/layout/reveal'
import { plannedArticles, publishedArticles } from '@/content/articles'
import { isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { ClockIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/insights', title: dict.nav.insights, description: dict.insights.description })
}

export default async function InsightsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.insights

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section aria-labelledby="published" className="container-page py-14 md:py-20">
        <h2 id="published" className="mb-8 text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {t.published}
        </h2>

        {publishedArticles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-input bg-card px-6 py-14 text-center">
            <p className="font-semibold text-foreground">{t.empty}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.emptyHint}</p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {publishedArticles.map((article, index) => (
              <Reveal as="li" key={article.slug} delay={index * 0.04}>
                <article className="group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-input md:p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-md border border-border bg-background px-2.5 py-1 font-mono font-medium text-brand">
                      {l(article.category, locale)}
                    </span>
                    {article.readingMinutes ? (
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="size-3.5" />
                        <span>
                          {article.readingMinutes} {dict.common.minRead}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    <Link
                      href={localePath(locale, `/insights/${article.slug}`)}
                      className="after:absolute after:inset-0 after:rounded-xl"
                    >
                      {l(article.title, locale)}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{l(article.excerpt, locale)}</p>
                  <span className="mt-auto pt-2 text-sm font-medium text-brand group-hover:underline" aria-hidden="true">
                    {dict.common.readArticle}
                  </span>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {plannedArticles.length ? (
        <section aria-labelledby="planned" className="border-t border-border">
          <div className="container-page py-14 md:py-20">
            <h2 id="planned" className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {t.planned}
            </h2>
            <p className="mb-8 mt-2 text-sm text-muted-foreground">{t.plannedNote}</p>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {plannedArticles.map((article) => (
                <li
                  key={article.slug}
                  className="flex flex-col gap-2 bg-card px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-6"
                >
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{l(article.category, locale)}</p>
                    <h3 className="mt-1 font-medium text-foreground">{l(article.title, locale)}</h3>
                  </div>
                  <span className="w-fit shrink-0 rounded-md border border-dashed border-input px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t.comingSoon}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
