import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/layout/reveal'
import { FinalCta } from '@/components/sections/final-cta'
import { Philosophy } from '@/components/sections/philosophy'
import { education, professionalInterests } from '@/content/skills'
import { siteConfig } from '@/content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { GitHubIcon, GraduationIcon, LinkedInIcon, MapPinIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({ locale, path: '/about', title: dict.nav.about, description: dict.about.bio[0], type: 'profile' })
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const [lead, ...rest] = dict.about.bio

  return (
    <>
      <PageHeader eyebrow={dict.about.eyebrow} title={dict.about.title} />

      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          <p className="text-xl font-medium leading-snug text-foreground md:text-2xl">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <aside className="flex flex-col gap-6">
          <Reveal className="overflow-hidden rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-[#f4f6f9] sm:size-28">
                <img
                  src="/images/eka-prasetyo.jpg"
                  alt={dict.about.portraitAlt}
                  width={800}
                  height={800}
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold tracking-tight text-foreground">{siteConfig.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">AI Engineer &amp; Full-Stack Developer</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPinIcon className="size-3.5 shrink-0 text-brand" />
                  <span>{siteConfig.location}</span>
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex size-11 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    <GitHubIcon className="size-4" />
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex size-11 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.04} className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationIcon className="size-4 text-brand" />
              <span>{dict.about.education}</span>
            </h2>
            <p className="text-lg font-semibold tracking-tight">{dict.about.degree}</p>
            <p className="text-sm text-muted-foreground">{dict.about.degreeLocal}</p>
            <p className="mt-3 text-sm text-foreground">{dict.about.university}</p>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">{dict.about.gpa}</span>
              <span className="font-mono text-base font-semibold text-foreground">{education.gpa}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold text-foreground">{dict.about.recruiterTitle}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{dict.about.recruiterSummary}</p>
          </Reveal>
        </aside>
      </section>

      <section aria-labelledby="interests-title" className="border-t border-border">
        <div className="container-page py-14 md:py-20">
          <h2 id="interests-title" className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
            {dict.about.interests}
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {l(professionalInterests, locale).map((interest) => (
              <li
                key={interest}
                className="rounded-md border border-border bg-card px-3.5 py-2 text-sm text-foreground"
              >
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Philosophy eyebrow={dict.philosophy.eyebrow} title={dict.about.philosophyTitle} principles={dict.about.philosophy} />
      <FinalCta locale={locale} dict={dict} />
    </>
  )
}
