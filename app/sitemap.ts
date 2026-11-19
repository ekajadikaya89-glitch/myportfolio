import type { MetadataRoute } from 'next'
import { publishedArticles } from '@/content/articles'
import { projects } from '@/content/projects'
import { siteConfig } from '@/content/site'
import { localePath, locales } from '@/i18n/config'

const staticPaths = ['/', '/about', '/skills', '/projects', '/experience', '/achievements', '/insights', '/contact', '/resume']

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...projects.map((project) => `/projects/${project.slug}`),
    ...publishedArticles.map((article) => `/insights/${article.slug}`),
  ]

  return paths.map((path) => ({
    url: `${siteConfig.url}${localePath('en', path)}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `${siteConfig.url}${localePath(locale, path)}`])),
    },
  }))
}
