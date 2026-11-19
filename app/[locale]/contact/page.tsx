import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/forms/contact-form'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { ExternalLinkIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/lib/icons'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/contact', title: dict.nav.contact, description: dict.contact.description })
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.contact

  const channels = [
    { href: siteConfig.linkedin, label: 'LinkedIn', handle: 'in/eka-prasetyo', icon: LinkedInIcon },
    { href: siteConfig.github, label: 'GitHub', handle: `@${siteConfig.githubHandle}`, icon: GitHubIcon },
    ...(siteConfig.email ? [{ href: `mailto:${siteConfig.email}`, label: 'Email', handle: siteConfig.email, icon: MailIcon }] : []),
  ]

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="relative rounded-xl border border-border bg-card p-6 md:p-8">
          <ContactForm
            labels={t.form}
            topics={t.categories}
            topicsLabel={t.categoriesLabel}
            configured={Boolean(process.env.CONTACT_FORM_ENDPOINT)}
          />
        </div>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-sm font-semibold text-foreground">{t.direct}</h2>
          <ul className="flex flex-col gap-3">
            {channels.map((channel) => {
              const Icon = channel.icon
              const external = !channel.href.startsWith('mailto:')
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex min-h-16 items-center gap-4 rounded-xl border border-input bg-card p-4 transition-colors hover:bg-elevated active:translate-y-px"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-medium text-foreground">{channel.label}</span>
                      <span className="truncate text-sm text-muted-foreground">{channel.handle}</span>
                    </span>
                    {external ? <ExternalLinkIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" /> : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>
      </section>
    </>
  )
}
