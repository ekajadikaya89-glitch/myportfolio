import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/layout/providers'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/navigation/site-header'
import { siteConfig } from '@/content/site'
import { isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { getResumeLink } from '@/lib/resume'
import { buildMetadata, personJsonLd } from '@/lib/seo'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata({ locale }),
    title: { default: dict.meta.siteTitle, template: `%s | ${siteConfig.name}` },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    keywords: [
      'Eka Prasetyo',
      'AI Engineer',
      'Full-Stack Developer',
      'Software Architect',
      'Flutter Developer',
      'Next.js',
      'Laravel',
      'Indonesia',
    ],
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090b' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
  colorScheme: 'dark light',
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const resume = getResumeLink(locale)

  const navItems = [
    { href: '/', label: dict.nav.home },
    { href: '/about', label: dict.nav.about },
    { href: '/skills', label: dict.nav.expertise },
    { href: '/projects', label: dict.nav.projects },
    { href: '/experience', label: dict.nav.experience },
    { href: '/insights', label: dict.nav.insights },
    { href: '/contact', label: dict.nav.contact },
  ].map((item) => ({ ...item, href: localePath(locale, item.href) }))

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${ibmPlexMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(locale)).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {dict.nav.skipToContent}
          </a>
          <div className="no-print">
            <SiteHeader
              locale={locale}
              items={navItems}
              resumeHref={resume.href}
              resumeIsFile={resume.isFile}
              commandCopy={dict.command}
              labels={{
                resume: dict.nav.resume,
                letsTalk: dict.nav.letsTalk,
                menu: dict.nav.menu,
                close: dict.nav.close,
                openMenu: dict.nav.openMenu,
                closeMenu: dict.nav.closeMenu,
                primary: dict.nav.primary,
                theme: dict.theme.toggle,
                language: dict.language.label,
              }}
            />
          </div>
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </Providers>
        {process.env.VERCEL === '1' ? <Analytics /> : null}
      </body>
    </html>
  )
}
