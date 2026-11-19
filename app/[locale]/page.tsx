import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Expertise } from '@/components/sections/expertise'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { Introduction } from '@/components/sections/introduction'
import { Philosophy } from '@/components/sections/philosophy'
import { PortfolioAssistant } from '@/components/sections/portfolio-assistant'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, path: '/', type: 'profile' })
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Introduction dict={dict} />
      <Expertise locale={locale} dict={dict} />
      <FeaturedProjects locale={locale} dict={dict} />
      <Philosophy
        eyebrow={dict.philosophy.eyebrow}
        title={dict.philosophy.title}
        principles={dict.philosophy.principles}
      />
      <PortfolioAssistant locale={locale} copy={dict.assistant} />
      <FinalCta locale={locale} dict={dict} />
    </>
  )
}
