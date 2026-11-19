export const locales = ['en', 'id'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
}

export function localePath(locale: Locale, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
