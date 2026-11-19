import type { Metadata } from 'next'
import { siteConfig } from '@/content/site'
import { locales, localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

type BuildMetadataInput = {
  locale: Locale
  path?: string
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
}

export function buildMetadata({
  locale,
  path = '/',
  title,
  description,
  image,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const dict = getDictionary(locale)
  const resolvedDescription = description ?? dict.meta.siteDescription
  const canonical = localePath(locale, path)
  const languages = Object.fromEntries(locales.map((code) => [code, localePath(code, path)]))
  const images = image ? [{ url: image, width: 1600, height: 1000 }] : undefined

  return {
    title: title ?? { absolute: dict.meta.siteTitle },
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': localePath('en', path) },
    },
    openGraph: {
      type,
      url: canonical,
      siteName: siteConfig.name,
      title: title ? `${title} | ${siteConfig.name}` : dict.meta.siteTitle,
      description: resolvedDescription,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${siteConfig.name}` : dict.meta.siteTitle,
      description: resolvedDescription,
      ...(images ? { images: images.map((img) => img.url) } : {}),
    },
  }
}

export function personJsonLd(locale: Locale) {
  const dict = getDictionary(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'AI Engineer & Full-Stack Developer',
    description: dict.meta.siteDescription,
    address: { '@type': 'PostalAddress', addressCountry: 'ID' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Mercu Buana' },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      'Artificial Intelligence',
      'Large Language Models',
      'Full-Stack Development',
      'Software Architecture',
      'Mobile Development',
      'Flutter',
      'Next.js',
      'Laravel',
    ],
  }
}
