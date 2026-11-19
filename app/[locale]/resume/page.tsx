import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrintButton } from '@/components/layout/print-button'
import { achievements } from '@/content/achievements'
import { experience } from '@/content/experience'
import { featuredProjects } from '@/content/projects'
import { siteConfig } from '@/content/site'
import { education, skillGroups } from '@/content/skills'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/resume', title: dict.resume.title, description: dict.resume.description })
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-border py-7 md:grid-cols-[180px_1fr] md:gap-10 print:break-inside-avoid print:py-5">
      <h2 className="font-mono text-xs font-medium text-brand">{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.resume

  return (
    <div className="container-page max-w-4xl py-12 md:py-16 print:py-0">
      <div className="no-print mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium text-brand">{t.eyebrow}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>
        </div>
        <PrintButton label={t.print} />
      </div>

      <article className="rounded-xl border border-border bg-card p-6 md:p-10 print:border-0 print:p-0">
        <header className="pb-7">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{siteConfig.name}</h1>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            AI Engineer &amp; Full-Stack Developer · {siteConfig.location}
          </p>
        </header>

        <ResumeSection title={t.summary}>
          <p className="leading-relaxed text-foreground">{dict.about.recruiterSummary}</p>
        </ResumeSection>

        <ResumeSection title={t.skills}>
          <dl className="flex flex-col gap-3 text-sm">
            {skillGroups.map((group) => (
              <div key={group.id} className="grid gap-1 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-foreground">{l(group.title, locale)}</dt>
                <dd className="text-muted-foreground">{group.items.map((item) => item.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title={t.experience}>
          {experience.map((entry) => (
            <div key={entry.id} className="mb-5 last:mb-0">
              <h3 className="font-semibold text-foreground">
                {l(entry.title, locale)} | {entry.organization}
              </h3>
              {entry.period ? <p className="text-sm text-muted-foreground">{entry.period}</p> : null}
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-muted-foreground">
                {l(entry.responsibilities, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {entry.projects?.length ? (
                <p className="mt-2 text-sm">
                  <span className="font-medium text-foreground">{dict.experiencePage.projects}:</span>{' '}
                  <span className="text-muted-foreground">{entry.projects.join(', ')}</span>
                </p>
              ) : null}
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={t.projects}>
          <ul className="flex flex-col gap-4">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <h3 className="font-semibold text-foreground">
                  {project.name}{' '}
                  <span className="font-normal text-muted-foreground">({dict.status[project.status]})</span>
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{l(project.summary, locale)}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{project.stack.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title={t.education}>
          <h3 className="font-semibold text-foreground">
            {dict.about.degree} ({dict.about.degreeLocal})
          </h3>
          <p className="text-sm text-muted-foreground">
            {dict.about.university} · {dict.about.gpa} {education.gpa}
          </p>
        </ResumeSection>

        <ResumeSection title={t.achievements}>
          <ul className="flex flex-col gap-2 text-sm text-foreground">
            {achievements.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{l(item.recognition, locale)}</span>: {item.event} ({item.year})
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title={t.contact}>
          <ul className="flex flex-col gap-1 text-sm text-foreground">
            <li>LinkedIn: {siteConfig.linkedin.replace('https://www.', '')}</li>
            <li>GitHub: {siteConfig.github.replace('https://', '')}</li>
            {siteConfig.email ? <li>Email: {siteConfig.email}</li> : null}
          </ul>
        </ResumeSection>
      </article>
    </div>
  )
}
