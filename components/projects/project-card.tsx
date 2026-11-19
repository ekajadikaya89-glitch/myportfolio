import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { l } from '@/lib/localize'
import type { Project } from '@/types/content'
import { StatusBadge } from './status-badge'

type ProjectCardProps = {
  project: Project
  locale: Locale
  statusLabels: Dictionary['status']
  viewLabel: string
}

export function ProjectCard({ project, locale, statusLabels, viewLabel }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-input">
      <div className="relative overflow-hidden border-b border-border bg-background">
        <img
          src={project.image}
          alt={l(project.imageAlt, locale)}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover"
        />
        <StatusBadge status={project.status} label={statusLabels[project.status]} className="absolute left-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs text-muted-foreground">{l(project.categoryLabel, locale)}</p>
        <h3 className="text-xl font-semibold tracking-tight">
          <Link
            href={localePath(locale, `/projects/${project.slug}`)}
            className="after:absolute after:inset-0 after:rounded-xl"
          >
            {project.name}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{l(project.summary, locale)}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
        <span className="pt-2 text-sm font-medium text-brand group-hover:underline" aria-hidden="true">
          {viewLabel}
        </span>
      </div>
    </article>
  )
}
