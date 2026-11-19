import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isAllowedContactEndpoint, MIN_FILL_MS, validateContact } from '../lib/contact.ts'

describe('validateContact', () => {
  it('accepts a valid payload and trims surrounding whitespace', () => {
    const result = validateContact({
      name: '  Eka Reviewer  ',
      email: '  reviewer@company.com  ',
      subject: '  AI Engineer Role  ',
      message: '  We would like to discuss a backend and AI engineering opportunity with our team.  ',
    })

    assert.deepEqual(result.errors, {})
    assert.equal(result.values.name, 'Eka Reviewer')
    assert.equal(result.values.email, 'reviewer@company.com')
    assert.equal(result.values.subject, 'AI Engineer Role')
  })

  it('flags empty or short inputs across all required fields', () => {
    const result = validateContact({
      name: 'A',
      email: 'not-an-email',
      subject: 'Hi',
      message: 'Too short',
    })

    assert.equal(result.errors.name, true)
    assert.equal(result.errors.email, true)
    assert.equal(result.errors.subject, true)
    assert.equal(result.errors.message, true)
  })

  it('rejects oversized field values beyond allowed bounds', () => {
    const result = validateContact({
      name: 'x'.repeat(101),
      email: `${'a'.repeat(195)}@test.com`,
      subject: 's'.repeat(151),
      message: 'm'.repeat(5001),
    })

    assert.equal(result.errors.name, true)
    assert.equal(result.errors.email, true)
    assert.equal(result.errors.subject, true)
    assert.equal(result.errors.message, true)
  })

  it('keeps minimum fill duration positive for anti-spam timing', () => {
    assert.ok(MIN_FILL_MS >= 2000)
  })
})

describe('isAllowedContactEndpoint', () => {
  it('allows valid HTTPS endpoints in production', () => {
    assert.equal(isAllowedContactEndpoint('https://formspree.io/f/example', 'production'), true)
  })

  it('rejects insecure HTTP and non-HTTP protocols in production', () => {
    assert.equal(isAllowedContactEndpoint('http://example.com/hook', 'production'), false)
    assert.equal(isAllowedContactEndpoint('http://localhost:8080/hook', 'production'), false)
    assert.equal(isAllowedContactEndpoint('file:///etc/passwd', 'production'), false)
    assert.equal(isAllowedContactEndpoint('not-a-url', 'production'), false)
  })

  it('allows localhost HTTP only in non-production environments', () => {
    assert.equal(isAllowedContactEndpoint('http://localhost:4000/hook', 'development'), true)
    assert.equal(isAllowedContactEndpoint('http://127.0.0.1:4000/hook', 'test'), true)
    assert.equal(isAllowedContactEndpoint('http://internal.corp/hook', 'development'), false)
  })
})
