import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { ProjectCard } from '@/components/projects/project-card'
import { ProjectFilter } from '@/components/projects/project-filter'
import { FinalCta } from '@/components/sections/final-cta'
import { projectCategories, projects } from '@/content/projects'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/projects', title: dict.nav.projects, description: dict.projectsPage.description })
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  const items = projects.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    node: (
      <ProjectCard project={project} locale={locale} statusLabels={dict.status} viewLabel={dict.common.viewDetails} />
    ),
  }))

  return (
    <>
      <PageHeader
        eyebrow={dict.projectsPage.eyebrow}
        title={dict.projectsPage.title}
        description={dict.projectsPage.description}
      />
      <section className="container-page py-14 md:py-20">
        <ProjectFilter
          items={items}
          categories={projectCategories.map((id) => ({ id, label: dict.projectsPage.categories[id] }))}
          labels={{
            all: dict.projectsPage.all,
            filter: dict.projectsPage.filterLabel,
            empty: dict.projectsPage.empty,
            emptyHint: dict.projectsPage.emptyHint,
            resetFilter: dict.projectsPage.resetFilter,
          }}
        />
      </section>
      <FinalCta locale={locale} dict={dict} />
    </>
  )
}
