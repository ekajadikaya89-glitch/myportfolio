import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { defaultLocale, isLocale, localePath, locales } from '../i18n/config.ts'
import { en } from '../i18n/dictionaries/en.ts'
import { id } from '../i18n/dictionaries/id.ts'

function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectKeys(v as Record<string, unknown>, path))
    } else {
      keys.push(path)
    }
  }
  return keys.sort()
}

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings)
  return []
}

describe('i18n config and dictionaries', () => {
  it('uses English as default and recognizes only supported locales', () => {
    assert.equal(defaultLocale, 'en')
    assert.deepEqual([...locales], ['en', 'id'])
    assert.equal(isLocale('en'), true)
    assert.equal(isLocale('id'), true)
    assert.equal(isLocale('fr'), false)
  })

  it('builds clean locale paths', () => {
    assert.equal(localePath('en', '/'), '/en')
    assert.equal(localePath('id', '/'), '/id')
    assert.equal(localePath('en', '/projects'), '/en/projects')
    assert.equal(localePath('id', 'contact'), '/id/contact')
  })

  it('maintains exact key parity between EN and ID dictionaries', () => {
    assert.deepEqual(collectKeys(en), collectKeys(id))
  })

  it('contains zero em dashes in UI dictionary copy (R-02)', () => {
    for (const str of [...collectStrings(en), ...collectStrings(id)]) {
      assert.equal(str.includes('\u2014'), false, `Unexpected em dash in: ${str}`)
    }
  })
})
