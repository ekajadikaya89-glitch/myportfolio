'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { CloseIcon, FileDocIcon, MenuIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { CommandPalette } from './command-palette'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { Wordmark } from './wordmark'

export type NavItem = { href: string; label: string }

type SiteHeaderProps = {
  locale: Locale
  items: NavItem[]
  resumeHref: string
  resumeIsFile: boolean
  commandCopy: Dictionary['command']
  labels: {
    resume: string
    letsTalk: string
    menu: string
    close: string
    openMenu: string
    closeMenu: string
    primary: string
    theme: string
    language: string
  }
}

export function SiteHeader({ locale, items, resumeHref, resumeIsFile, commandCopy, labels }: SiteHeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        triggerRef.current?.focus()
        wasOpenRef.current = false
      }
      return
    }

    wasOpenRef.current = true
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      firstFocusable?.focus()
    }, 30)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const isActive = (href: string) =>
    href === localePath(locale, '/') ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200',
        scrolled || open
          ? 'border-border bg-background/90 backdrop-blur-md'
          : 'border-transparent bg-background',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Wordmark href={localePath(locale, '/')} />

        <nav aria-label={labels.primary} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {items.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-2.5 text-sm transition-colors active:translate-y-px',
                      active
                        ? 'font-semibold text-foreground'
                        : 'text-muted-foreground hover:bg-elevated hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 bottom-1.5 h-0.5 bg-brand"
                      />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <CommandPalette
            locale={locale}
            navItems={items}
            resumeHref={resumeHref}
            resumeIsFile={resumeIsFile}
            copy={commandCopy}
            onBeforeOpen={() => setOpen(false)}
          />
          <div className="hidden items-center gap-2 sm:flex">
            <LocaleSwitcher locale={locale} label={labels.language} />
            <ThemeToggle label={labels.theme} />
            <a
              href={resumeHref}
              {...(resumeIsFile ? { download: 'Eka-Prasetyo-Resume.pdf' } : {})}
              className="hidden h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-input bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px lg:inline-flex"
            >
              <FileDocIcon className="size-4 shrink-0" />
              {labels.resume}
            </a>
          </div>
          <Link
            href={localePath(locale, '/contact')}
            className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px md:inline-flex"
          >
            {labels.letsTalk}
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-input bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
            <span>{open ? labels.close : labels.menu}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={drawerRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={labels.primary}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-border bg-background xl:hidden"
          >
            <nav aria-label={labels.primary} className="container-page flex flex-col gap-7 py-6">
              <ul className="flex flex-col">
                {items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex min-h-13 items-center justify-between border-b border-border py-3.5 text-xl tracking-tight transition-colors active:bg-elevated',
                          active ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <span>{item.label}</span>
                        {active ? <span className="h-2 w-2 bg-brand" aria-hidden="true" /> : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <LocaleSwitcher locale={locale} label={labels.language} />
                <ThemeToggle label={labels.theme} />
              </div>
              <div className="grid gap-3 pb-6 sm:grid-cols-2">
                <Link
                  href={localePath(locale, '/contact')}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px"
                >
                  {labels.letsTalk}
                </Link>
                <a
                  href={resumeHref}
                  {...(resumeIsFile ? { download: 'Eka-Prasetyo-Resume.pdf' } : {})}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-card text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                >
                  <FileDocIcon className="size-4" />
                  {labels.resume}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
