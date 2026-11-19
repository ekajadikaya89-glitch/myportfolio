import { siteConfig } from '@/content/site'
import { localePath, type Locale } from '@/i18n/config'

export function getResumeLink(locale: Locale) {
  return siteConfig.resumeFile
    ? { href: siteConfig.resumeFile, isFile: true }
    : { href: localePath(locale, '/resume'), isFile: false }
}
