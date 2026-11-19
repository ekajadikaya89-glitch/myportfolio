import type { Locale } from '@/i18n/config'

export type Localized<T = string> = Record<Locale, T>

export type ProjectCategory =
  | 'ai'
  | 'saas'
  | 'web'
  | 'mobile'
  | 'erp'
  | 'fintech'
  | 'devtools'

export type ProjectStatus = 'live' | 'in-development' | 'concept' | 'client-work'

export type ProjectFeature = {
  label: Localized
  state: 'implemented' | 'planned'
}

export type Project = {
  slug: string
  name: string
  categories: ProjectCategory[]
  categoryLabel: Localized
  status: ProjectStatus
  summary: Localized
  problem: Localized
  solution: Localized
  contribution: Localized
  highlights: Localized<string[]>
  features?: ProjectFeature[]
  featuresNote?: Localized
  stack: string[]
  image: string
  imageAlt: Localized
  links: { repo?: string; live?: string }
  recognition?: Localized
  featured?: boolean
}

export type ExperienceEntry = {
  id: string
  kind: 'role' | 'program'
  title: Localized
  organization: string
  period?: string
  summary: Localized
  responsibilities: Localized<string[]>
  projects?: string[]
  note?: Localized
}

export type Achievement = {
  id: string
  title: Localized
  event: string
  year: string
  recognition: Localized
  description: Localized
  relatedProject?: string
  evidenceUrl?: string
}

export type SkillGroup = {
  id: string
  title: Localized
  description: Localized
  icon: string
  items: { name: string; logo?: string }[]
}

export type ArticleBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'callout'; text: string }

export type Article = {
  slug: string
  title: Localized
  excerpt: Localized
  category: Localized
  status: 'published' | 'planned'
  readingMinutes?: number
  body?: Localized<ArticleBlock[]>
}
