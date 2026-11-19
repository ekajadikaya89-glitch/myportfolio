import Link from 'next/link'
import { LinkButton } from '@/components/layout/link-button'
import { Reveal } from '@/components/layout/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { StatusBadge } from '@/components/projects/status-badge'
import { featuredProjects } from '@/content/projects'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { ExternalLinkIcon, GitHubIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { cn } from '@/lib/utils'

export function FeaturedProjects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="featured-title" className="border-t border-border">
      <div className="container-page py-20 md:py-28">
        <SectionHeading
          id="featured-title"
          eyebrow={dict.featured.eyebrow}
          title={dict.featured.title}
          description={dict.featured.description}
          action={
            <LinkButton href={localePath(locale, '/projects')} variant="secondary">
              {dict.common.allProjects}
            </LinkButton>
          }
        />

        <ol className="mt-14 flex flex-col gap-16 md:gap-24">
          {featuredProjects.map((project, index) => {
            const href = localePath(locale, `/projects/${project.slug}`)
            const reversed = index % 2 === 1
            return (
              <li key={project.slug}>
                <article className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                  <Reveal className={cn(reversed && 'lg:order-2')}>
                    <Link
                      href={href}
                      aria-label={`${dict.common.viewDetails}: ${project.name}`}
                      className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-input active:opacity-95"
                    >
                      <img
                        src={project.image}
                        alt={l(project.imageAlt, locale)}
                        width={1600}
                        height={1000}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : undefined}
                        decoding={index === 0 ? 'sync' : 'async'}
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <StatusBadge
                        status={project.status}
                        label={dict.status[project.status]}
                        className="absolute left-3.5 top-3.5"
                      />
                    </Link>
                  </Reveal>

                  <Reveal delay={0.04} className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-px w-6 bg-border" aria-hidden="true" />
                      <span>{l(project.categoryLabel, locale)}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      <Link
                        href={href}
                        className="rounded-sm underline-offset-4 hover:underline"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <dl className="flex flex-col gap-3.5 border-t border-border pt-4 text-sm leading-relaxed">
                      <div>
                        <dt className="font-medium text-foreground">{dict.featured.problem}</dt>
                        <dd className="mt-0.5 text-muted-foreground">{l(project.problem, locale)}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-foreground">{dict.featured.solution}</dt>
                        <dd className="mt-0.5 text-muted-foreground">{l(project.solution, locale)}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-foreground">{dict.featured.contribution}</dt>
                        <dd className="mt-0.5 text-muted-foreground">{l(project.contribution, locale)}</dd>
                      </div>
                    </dl>
                    <ul className="flex flex-wrap gap-2" aria-label={dict.common.stack}>
                      {project.stack.slice(0, 6).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <LinkButton href={href} variant="secondary">
                        {dict.common.viewDetails}
                        <span className="sr-only">: {project.name}</span>
                      </LinkButton>
                      {project.links.live ? (
                        <LinkButton href={project.links.live} external variant="ghost">
                          <span>{dict.common.visitSite}</span>
                          <ExternalLinkIcon className="size-3.5" />
                          <span className="sr-only">: {project.name}</span>
                        </LinkButton>
                      ) : null}
                      {project.links.repo ? (
                        <LinkButton href={project.links.repo} external variant="ghost">
                          <GitHubIcon className="size-4" />
                          <span>GitHub</span>
                          <ExternalLinkIcon className="size-3.5 opacity-70" />
                          <span className="sr-only">: {project.name}</span>
                        </LinkButton>
                      ) : null}
                    </div>
                  </Reveal>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
