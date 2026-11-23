'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from '@/lib/icons'
import { l } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { ProjectScreenshot } from '@/types/content'

type Props = {
  screenshots: ProjectScreenshot[]
  locale: Locale
  labels: {
    heading: string
    note: string
    openLightbox: string
    closeLightbox: string
    prevShot: string
    nextShot: string
  }
}

export function ScreenshotGallery({ screenshots, locale, labels }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const total = screenshots.length
  const activeShot = activeIndex !== null ? screenshots[activeIndex] : null

  useEffect(() => {
    if (activeIndex === null) {
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus()
        lastTriggerRef.current = null
      }
      return
    }

    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 20)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveIndex(null)
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
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
      } else if (event.key === 'ArrowRight' && total > 1) {
        event.preventDefault()
        setActiveIndex((current) => (current === null ? 0 : (current + 1) % total))
      } else if (event.key === 'ArrowLeft' && total > 1) {
        event.preventDefault()
        setActiveIndex((current) => (current === null ? 0 : (current - 1 + total) % total))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, total])

  return (
    <section aria-labelledby="interface-gallery">
      <h2 id="interface-gallery" className="mb-2 text-2xl font-semibold tracking-tight">
        {labels.heading}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">{labels.note}</p>

      <ul className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((shot, index) => {
          const isLead = total === 3 && index === 0
          const alt = l(shot.alt, locale)
          const caption = l(shot.caption, locale)

          return (
            <li key={shot.src} className={cn(isLead && 'sm:col-span-2')}>
              <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  aria-label={`${labels.openLightbox}: ${caption}`}
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget
                    setActiveIndex(index)
                  }}
                  className="group relative block w-full overflow-hidden border-b border-border bg-background text-left"
                >
                  <img
                    src={shot.src}
                    alt={alt}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-md border border-input bg-background/90 text-foreground opacity-90 transition-opacity group-hover:opacity-100"
                  >
                    <ExpandIcon className="size-4" />
                  </span>
                </button>
                <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  {caption}
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>

      {activeShot !== null && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={l(activeShot.caption, locale)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            ref={dialogRef}
            className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <p className="font-mono text-xs text-muted-foreground">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                {total > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label={labels.prevShot}
                      onClick={() => setActiveIndex((activeIndex - 1 + total) % total)}
                      className="inline-flex size-11 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                    >
                      <ChevronLeftIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={labels.nextShot}
                      onClick={() => setActiveIndex((activeIndex + 1) % total)}
                      className="inline-flex size-11 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                    >
                      <ChevronRightIcon className="size-4" />
                    </button>
                  </>
                ) : null}
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={labels.closeLightbox}
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-elevated active:translate-y-px"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-background p-2 sm:p-4">
              <img
                src={activeShot.src}
                alt={l(activeShot.alt, locale)}
                width={1440}
                height={900}
                className="mx-auto max-h-[72dvh] w-auto max-w-full rounded-md border border-border object-contain"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
              {l(activeShot.caption, locale)}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
