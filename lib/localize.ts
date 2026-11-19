import type { Locale } from '@/i18n/config'
import type { Localized } from '@/types/content'

export function l<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en
}
