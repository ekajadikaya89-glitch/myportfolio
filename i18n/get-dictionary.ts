import type { Locale } from './config'
import { en } from './dictionaries/en'
import { id } from './dictionaries/id'

const dictionaries = { en, id }

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? en
}

export type { Dictionary } from './dictionaries/en'
