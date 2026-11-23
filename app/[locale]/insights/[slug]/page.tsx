import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CodeBlock } from '@/components/insights/code-block'
import { ReadingProgress } from '@/components/insights/reading-progress'
import { getArticle, publishedArticles } from '@/content/articles'
import { siteConfig } from '@/content/site'
import { isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, InfoIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'
import type { ArticleBlock } from '@/types/content'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => publishedArticles.map((article) => ({ locale, slug: article.slug })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const article = getArticle(slug)
  if (!isLocale(locale) || !article || article.status !== 'published') return {}
  return buildMetadata({
    locale,
    path: `/insights/${slug}`,
    title: l(article.title, locale),
    description: l(article.excerpt, locale),
    type: 'article',
  })
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={block.id} className="mb-4 mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight">
          {block.text}
        </h2>
      )
    case 'p':
      return <p className="my-5 leading-[1.8] text-muted-foreground">{block.text}</p>
    case 'list':
      return (
        <ul className="my-5 flex flex-col gap-2.5 text-muted-foreground">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 inline-block size-1.5 shrink-0 bg-brand" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} caption={block.caption} />
    case 'callout':
      return (
        <aside className="my-8 flex gap-3 rounded-lg border border-brand bg-card p-5 text-sm leading-relaxed text-foreground">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand" />
          <p>{block.text}</p>
        </aside>
      )
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  const article = getArticle(slug)
  if (!isLocale(locale) || !article || article.status !== 'published' || !article.body) notFound()
  const dict = getDictionary(locale)
  const blocks = l(article.body, locale)
  const toc = blocks.filter((block): block is Extract<ArticleBlock, { type: 'h2' }> => block.type === 'h2')
  const title = l(article.title, locale)
  const currentIndex = publishedArticles.findIndex((item) => item.slug === article.slug)
  const previousArticle = currentIndex > 0 ? publishedArticles[currentIndex - 1] : null
  const nextArticle =
    currentIndex >= 0 && currentIndex < publishedArticles.length - 1
      ? publishedArticles[currentIndex + 1]
      : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: l(article.excerpt, locale),
    inLanguage: locale,
    author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}${localePath(locale, `/insights/${slug}`)}`,
  }

  return (
    <>
      <ReadingProgress label={dict.insights.readingProgress} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="container-page pb-20 pt-10 md:pt-14">
        <Link
          href={localePath(locale, '/insights')}
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          <span>{dict.nav.insights}</span>
        </Link>

        <header className="mt-6 max-w-3xl border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-md border border-border bg-card px-2.5 py-1 font-mono font-medium text-brand">
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
          <h1 className="mt-5 text-[clamp(1.85rem,4vw,3.1rem)] font-semibold leading-tight text-balance-tight">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{l(article.excerpt, locale)}</p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0 max-w-3xl">
              {blocks.map((block, index) => (
                <Block key={`${block.type}-${index}`} block={block} />
              ))}

              {previousArticle || nextArticle ? (
                <nav
                  aria-label={dict.nav.insights}
                  className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
                >
                  {previousArticle ? (
                    <Link
                      href={localePath(locale, `/insights/${previousArticle.slug}`)}
                      className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-input hover:bg-elevated active:translate-y-px"
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>{dict.insights.previousArticle}</span>
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {l(previousArticle.title, locale)}
                      </span>
                    </Link>
                  ) : (
                    <div aria-hidden="true" />
                  )}
                  {nextArticle ? (
                    <Link
                      href={localePath(locale, `/insights/${nextArticle.slug}`)}
                      className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-input hover:bg-elevated active:translate-y-px sm:text-right"
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground sm:justify-end">
                        <span>{dict.insights.nextArticle}</span>
                        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {l(nextArticle.title, locale)}
                      </span>
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </div>
          {toc.length ? (
            <nav aria-label={dict.insights.toc} className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-sm font-semibold text-foreground">{dict.insights.toc}</p>
              <ol className="flex flex-col border-l border-border text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px flex min-h-11 items-center rounded-r-md border-l border-transparent py-2 pl-4 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground active:translate-y-px"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>
      </article>
    </>
  )
}
