export type ContactField = 'name' | 'email' | 'subject' | 'message'

export type ContactPayload = Record<ContactField, string> & {
  topics: string[]
  hp_field: string
  elapsedMs: number
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: Partial<Record<ContactField, string>>) {
  const errors: Partial<Record<ContactField, true>> = {}
  const name = input.name?.trim() ?? ''
  const email = input.email?.trim() ?? ''
  const subject = input.subject?.trim() ?? ''
  const message = input.message?.trim() ?? ''

  if (name.length < 2 || name.length > 100) errors.name = true
  if (!EMAIL_PATTERN.test(email) || email.length > 200) errors.email = true
  if (subject.length < 3 || subject.length > 150) errors.subject = true
  if (message.length < 20 || message.length > 5000) errors.message = true

  return { errors, values: { name, email, subject, message } }
}

export function isAllowedContactEndpoint(rawUrl: string, nodeEnv = process.env.NODE_ENV): boolean {
  try {
    const parsed = new URL(rawUrl)
    if (parsed.protocol === 'https:') return true
    if (
      nodeEnv !== 'production' &&
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
    ) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export const MIN_FILL_MS = 1200
