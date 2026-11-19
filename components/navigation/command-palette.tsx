'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { achievements } from '@/content/achievements'
import { projects } from '@/content/projects'
import { siteConfig } from '@/content/site'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import {
  AiGraphIcon,
  AwardIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileDocIcon,
  LayersIcon,
  SearchIcon,
  SunIcon,
} from '@/lib/icons'
import { l } from '@/lib/localize'
import { cn } from '@/lib/utils'

type CommandGroup = 'actions' | 'projects' | 'certificates' | 'pages'

type CommandItem = {
  id: string
  group: CommandGroup
  title: string
  subtitle?: string
  keywords: string
  external?: boolean
  icon: 'explorer' | 'download' | 'resume' | 'copy' | 'theme' | 'page' | 'project' | 'cert'
  run: () => void
}

type Props = {
  locale: Locale
  navItems: { href: string; label: string }[]
  resumeHref: string
  resumeIsFile: boolean
  copy: Dictionary['command']
}

function CommandIcon({ icon }: { icon: CommandItem['icon'] }) {
  switch (icon) {
    case 'explorer':
      return <AiGraphIcon className="size-4 shrink-0 text-brand" />
    case 'download':
      return <DownloadIcon className="size-4 shrink-0 text-brand" />
    case 'resume':
      return <FileDocIcon className="size-4 shrink-0 text-muted-foreground" />
    case 'copy':
      return <CopyIcon className="size-4 shrink-0 text-muted-foreground" />
    case 'theme':
      return <SunIcon className="size-4 shrink-0 text-muted-foreground" />
    case 'project':
      return <LayersIcon className="size-4 shrink-0 text-brand" />
    case 'cert':
      return <AwardIcon className="size-4 shrink-0 text-brand" />
    default:
      return <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
  }
}

export function CommandPalette({ locale, navItems, resumeHref, resumeIsFile, copy }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasOpenRef = useRef(false)

  const closePalette = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const items = useMemo<CommandItem[]>(() => {
    const otherLocale: Locale = locale === 'en' ? 'id' : 'en'
    const switchedPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`)

    const list: CommandItem[] = [
      {
        id: 'action:explorer',
        group: 'actions',
        title: copy.openExplorer,
        subtitle: 'RAG / Grounded Q&A',
        keywords: 'ai explorer rag assistant question tanya jawab recruiter',
        icon: 'explorer',
        run: () => {
          closePalette()
          router.push(`${localePath(locale, '/')}#explorer`)
        },
      },
      {
        id: 'action:resume-pdf',
        group: 'actions',
        title: copy.downloadResume,
        subtitle: resumeIsFile ? 'PDF · ATS-friendly' : '/resume',
        keywords: 'cv resume pdf download unduh ats',
        icon: 'download',
        run: () => {
          closePalette()
          if (resumeIsFile) {
            const link = document.createElement('a')
            link.href = resumeHref
            link.download = 'Eka-Prasetyo-Resume.pdf'
            document.body.appendChild(link)
            link.click()
            link.remove()
          } else {
            router.push(resumeHref)
          }
        },
      },
      {
        id: 'action:resume-web',
        group: 'actions',
        title: copy.webResume,
        subtitle: localePath(locale, '/resume'),
        keywords: 'resume web print cv pengalaman',
        icon: 'resume',
        run: () => {
          closePalette()
          router.push(localePath(locale, '/resume'))
        },
      },
    ]

    if (siteConfig.email) {
      const email = siteConfig.email
      list.push({
        id: 'action:copy-email',
        group: 'actions',
        title: copiedEmail ? copy.emailCopied : copy.copyEmail,
        subtitle: email,
        keywords: `email mail contact copy salin ${email}`,
        icon: 'copy',
        run: () => {
          void navigator.clipboard?.writeText(email)
          setCopiedEmail(true)
          window.setTimeout(() => {
            setCopiedEmail(false)
            closePalette()
          }, 900)
        },
      })
    }

    list.push(
      {
        id: 'action:theme',
        group: 'actions',
        title: copy.toggleTheme,
        subtitle: resolvedTheme === 'light' ? 'Dark' : 'Light',
        keywords: 'theme dark light tema gelap terang',
        icon: 'theme',
        run: () => {
          setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
          closePalette()
        },
      },
      {
        id: 'action:locale',
        group: 'actions',
        title: copy.switchLanguage,
        subtitle: otherLocale.toUpperCase(),
        keywords: 'language bahasa english indonesian en id locale',
        icon: 'page',
        run: () => {
          closePalette()
          router.push(switchedPath || `/${otherLocale}`)
        },
      },
    )

    for (const achievement of achievements) {
      if (!achievement.evidenceUrl) continue
      const url = achievement.evidenceUrl
      list.push({
        id: `cert:${achievement.id}`,
        group: 'certificates',
        title: `${l(achievement.recognition, locale)}: ${achievement.event}`,
        subtitle: achievement.year,
        keywords: `certificate sertifikat award juara hackathon ${achievement.event} ${achievement.year}`,
        external: true,
        icon: 'cert',
        run: () => {
          closePalette()
          window.open(url, '_blank', 'noopener,noreferrer')
        },
      })
    }

    for (const project of projects) {
      list.push({
        id: `project:${project.slug}`,
        group: 'projects',
        title: project.name,
        subtitle: project.stack.slice(0, 4).join(' · '),
        keywords: `${project.name} ${project.slug} ${project.categoryLabel.en} ${project.categoryLabel.id} ${project.stack.join(' ')}`,
        icon: 'project',
        run: () => {
          closePalette()
          router.push(localePath(locale, `/projects/${project.slug}`))
        },
      })
    }

    for (const item of navItems) {
      list.push({
        id: `page:${item.href}`,
        group: 'pages',
        title: item.label,
        subtitle: item.href,
        keywords: `${item.label} ${item.href} page halaman`,
        icon: 'page',
        run: () => {
          closePalette()
          router.push(item.href)
        },
      })
    }

    list.push({
      id: 'page:achievements',
      group: 'pages',
      title: locale === 'id' ? 'Pencapaian' : 'Achievements',
      subtitle: localePath(locale, '/achievements'),
      keywords: 'achievements pencapaian awards sertifikat hackathon',
      icon: 'cert',
      run: () => {
        closePalette()
        router.push(localePath(locale, '/achievements'))
      },
    })

    return list
  }, [closePalette, copiedEmail, copy, locale, navItems, pathname, resolvedTheme, resumeHref, resumeIsFile, router, setTheme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    const terms = q.split(/\s+/).filter(Boolean)
    return items.filter((item) => {
      const haystack = `${item.title} ${item.subtitle ?? ''} ${item.keywords}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [items, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const onGlobalKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onGlobalKey)
    return () => window.removeEventListener('keydown', onGlobalKey)
  }, [])

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
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePalette()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((current) => (filtered.length > 0 ? (current + 1) % filtered.length : 0))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) => (filtered.length > 0 ? (current - 1 + filtered.length) % filtered.length : 0))
      } else if (event.key === 'Enter' && filtered[activeIndex]) {
        event.preventDefault()
        filtered[activeIndex].run()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, closePalette, filtered, open])

  const groupedOrder: CommandGroup[] = ['actions', 'projects', 'certificates', 'pages']

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={copy.triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-input bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground active:translate-y-px"
      >
        <SearchIcon className="size-4 shrink-0" />
        <kbd className="hidden whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline">
          Ctrl K
        </kbd>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialogLabel}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 px-4 pt-[10dvh] backdrop-blur-sm"
          onClick={closePalette}
        >
          <div
            className="flex max-h-[75dvh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                className="min-h-9 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                aria-label={copy.close}
                onClick={closePalette}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-2" role="listbox" aria-label={copy.dialogLabel}>
              {filtered.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">{copy.empty}</p>
              ) : (
                groupedOrder.map((group) => {
                  const groupItems = filtered.filter((item) => item.group === group)
                  if (groupItems.length === 0) return null
                  return (
                    <div key={group} className="mb-2 last:mb-0">
                      <p className="px-3 py-1.5 font-mono text-[11px] font-medium text-brand">
                        {copy.groups[group]}
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {groupItems.map((item) => {
                          const flatIndex = filtered.indexOf(item)
                          const selected = flatIndex === activeIndex
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={selected}
                                onMouseEnter={() => setActiveIndex(flatIndex)}
                                onClick={item.run}
                                className={cn(
                                  'flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                  selected
                                    ? 'bg-elevated text-foreground'
                                    : 'text-muted-foreground hover:bg-elevated hover:text-foreground',
                                )}
                              >
                                <span className="flex min-w-0 items-center gap-2.5">
                                  {item.id === 'action:copy-email' && copiedEmail ? (
                                    <CheckIcon className="size-4 shrink-0 text-success" />
                                  ) : (
                                    <CommandIcon icon={item.icon} />
                                  )}
                                  <span className="truncate font-medium text-foreground">{item.title}</span>
                                </span>
                                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                  {item.subtitle ? <span className="hidden sm:inline">{item.subtitle}</span> : null}
                                  {item.external ? <ExternalLinkIcon className="size-3.5" /> : null}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })
              )}
            </div>

            <div className="border-t border-border bg-background/60 px-4 py-2.5 text-xs text-muted-foreground">
              {copy.hint}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
