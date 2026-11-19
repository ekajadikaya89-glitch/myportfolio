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
  /** Public contact email. Set NEXT_PUBLIC_CONTACT_EMAIL to display it. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  /**
   * Path to a resume file inside /public (e.g. "/resume/eka-prasetyo.pdf").
   * When null, the resume CTA opens the printable resume page instead.
   */
  resumeFile: process.env.NEXT_PUBLIC_RESUME_FILE || null,
} as const
