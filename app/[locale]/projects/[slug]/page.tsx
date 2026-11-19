import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LinkButton } from '@/components/layout/link-button'
import { Reveal } from '@/components/layout/reveal'
import { ProjectCard } from '@/components/projects/project-card'
import { StatusBadge } from '@/components/projects/status-badge'
import { getProject, projects } from '@/content/projects'
import { isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { ArrowLeftIcon, AwardIcon, CheckIcon, CirclePendingIcon, ExternalLinkIcon, GitHubIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!isLocale(locale) || !project) return {}
  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.name,
    description: l(project.summary, locale),
    type: 'article',
  })
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!isLocale(locale) || !project) notFound()
  const dict = getDictionary(locale)
  const t = dict.projectsPage
  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3)

  return (
    <>
      <article>
        <header className="container-page flex flex-col gap-6 pb-10 pt-10 md:pt-14">
          <Link
            href={localePath(locale, '/projects')}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            <span>{dict.common.allProjects}</span>
          </Link>
          <Reveal className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} label={dict.status[project.status]} />
              <span className="font-mono text-xs text-muted-foreground">{l(project.categoryLabel, locale)}</span>
            </div>
            <h1 className="text-[clamp(2rem,4.8vw,3.75rem)] font-semibold leading-[1.06] text-balance-tight">
              {project.name}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              {l(project.summary, locale)}
            </p>
            {project.links.repo || project.links.live ? (
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                {project.links.live ? (
                  <LinkButton href={project.links.live} external>
                    <span>{dict.common.visitSite}</span>
                    <ExternalLinkIcon />
                  </LinkButton>
                ) : null}
                {project.links.repo ? (
                  <LinkButton href={project.links.repo} external variant="secondary">
                    <GitHubIcon />
                    <span>{dict.common.viewRepo}</span>
                    <ExternalLinkIcon className="size-3.5 opacity-75" />
                  </LinkButton>
                ) : null}
              </div>
            ) : null}
          </Reveal>
        </header>

        <div className="container-page">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={project.image}
              alt={l(project.imageAlt, locale)}
              width={1600}
              height={1000}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>

        <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            <section aria-labelledby="overview">
              <h2 id="overview" className="mb-5 text-2xl font-semibold tracking-tight">
                {t.overview}
              </h2>
              <dl className="flex flex-col gap-6">
                {[
                  [dict.featured.problem, project.problem],
                  [dict.featured.solution, project.solution],
                  [dict.featured.contribution, project.contribution],
                ].map(([label, value]) => (
                  <div key={label as string} className="grid gap-2 border-t border-border pt-5 md:grid-cols-[180px_1fr] md:gap-6">
                    <dt className="font-mono text-xs font-medium text-brand">{label as string}</dt>
                    <dd className="leading-relaxed text-muted-foreground">{l(value as typeof project.problem, locale)}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="highlights">
              <h2 id="highlights" className="mb-5 text-2xl font-semibold tracking-tight">
                {t.highlights}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {l(project.highlights, locale).map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.features?.length ? (
              <section aria-labelledby="scope">
                <h2 id="scope" className="mb-2 text-2xl font-semibold tracking-tight">
                  {t.features}
                </h2>
                {project.featuresNote ? (
                  <p className="mb-5 text-sm text-muted-foreground">{l(project.featuresNote, locale)}</p>
                ) : null}
                <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                  {project.features.map((feature) => {
                    const implemented = feature.state === 'implemented'
                    return (
                      <li key={feature.label.en} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                        <span className="flex items-center gap-3 text-foreground">
                          {implemented ? (
                            <CheckIcon className="size-4 shrink-0 text-success" />
                          ) : (
                            <CirclePendingIcon className="size-4 shrink-0 text-muted-foreground" />
                          )}
                          <span>{l(feature.label, locale)}</span>
                        </span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {dict.status[feature.state]}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-sm font-semibold text-foreground">{dict.common.stack}</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {project.recognition ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <AwardIcon className="size-4 text-brand" />
                  <span>{t.recognition}</span>
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{l(project.recognition, locale)}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </article>

      <section aria-labelledby="more-projects" className="border-t border-border">
        <div className="container-page py-16">
          <h2 id="more-projects" className="mb-8 text-2xl font-semibold tracking-tight">
            {t.otherProjects}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <ProjectCard project={item} locale={locale} statusLabels={dict.status} viewLabel={dict.common.viewDetails} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
