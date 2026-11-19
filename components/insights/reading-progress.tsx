'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress({ label }: { label: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId = 0

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }
      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable))
      setProgress(ratio)
    }

    const onScroll = () => {
      window.cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="no-print fixed left-0 right-0 top-16 z-40 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full w-full origin-left bg-brand transition-transform duration-75 motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
