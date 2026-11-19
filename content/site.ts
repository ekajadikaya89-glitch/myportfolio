function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:3000'
}

export const siteConfig = {
  name: 'Eka Prasetyo',
  shortName: 'EP',
  url: resolveSiteUrl().replace(/\/$/, ''),
  location: 'Indonesia',
  github: 'https://github.com/eka0789',
  githubHandle: 'eka0789',
  linkedin: 'https://www.linkedin.com/in/eka-prasetyo/',
  /** Public contact email. Set NEXT_PUBLIC_CONTACT_EMAIL to display it with 1-click copy. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
  /** Optional scheduling link (e.g. https://cal.com/your-handle). Set NEXT_PUBLIC_CALENDAR_URL to display it. */
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL?.trim() || null,
  /**
   * Path to a resume file inside /public (e.g. "/resume/eka-prasetyo.pdf").
   * When null, the resume CTA opens the printable resume page instead.
   */
  resumeFile: process.env.NEXT_PUBLIC_RESUME_FILE?.trim() || null,
} as const
