'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALE_COOKIE, locales, localeNames, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

function swapLocale(pathname: string, target: Locale) {
  const segments = pathname.split('/')
  segments[1] = target
  return segments.join('/') || `/${target}`
}

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
}

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname()

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-11 items-center rounded-lg border border-input bg-card p-1 text-xs font-medium"
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <Link
            key={code}
            href={swapLocale(pathname, code)}
            hrefLang={code}
            lang={code}
            scroll={false}
            onClick={() => persistLocale(code)}
            aria-current={active ? 'true' : undefined}
            aria-label={localeNames[code]}
            className={cn(
              'inline-flex h-full min-w-10 items-center justify-center rounded-md px-2.5 font-mono text-xs uppercase transition-colors active:translate-y-px',
              active
                ? 'bg-foreground font-semibold text-background'
                : 'text-muted-foreground hover:bg-elevated hover:text-foreground',
            )}
          >
            {code}
          </Link>
        )
      })}
    </div>
  )
}
