import Link from 'next/link'
import { Wordmark } from '@/components/navigation/wordmark'
import { siteConfig } from '@/content/site'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { ExternalLinkIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/lib/icons'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: '/about', label: dict.nav.about },
    { href: '/skills', label: dict.nav.expertise },
    { href: '/projects', label: dict.nav.projects },
    { href: '/experience', label: dict.nav.experience },
    { href: '/achievements', label: dict.nav.achievements },
    { href: '/insights', label: dict.nav.insights },
    { href: '/resume', label: dict.nav.resume },
    { href: '/contact', label: dict.nav.contact },
  ]

  return (
    <footer className="no-print border-t border-border bg-background">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div className="flex max-w-sm flex-col gap-3">
          <Wordmark href={localePath(locale, '/')} />
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.footer.navigate}>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{dict.footer.navigate}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localePath(locale, link.href)}
                  className="inline-flex min-h-11 items-center rounded-md text-muted-foreground transition-colors hover:text-foreground active:translate-y-px"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{dict.footer.connect}</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md text-muted-foreground transition-colors hover:text-foreground active:translate-y-px"
              >
                <GitHubIcon className="size-4 shrink-0" />
                <span>github.com/{siteConfig.githubHandle}</span>
                <ExternalLinkIcon className="size-3.5 shrink-0 opacity-70" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md text-muted-foreground transition-colors hover:text-foreground active:translate-y-px"
              >
                <LinkedInIcon className="size-4 shrink-0" />
                <span>LinkedIn</span>
                <ExternalLinkIcon className="size-3.5 shrink-0 opacity-70" />
              </a>
            </li>
            {siteConfig.email ? (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md text-muted-foreground transition-colors hover:text-foreground active:translate-y-px"
                >
                  <MailIcon className="size-4 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
