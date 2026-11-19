'use client'

import { useState } from 'react'
import { PauseIcon, PlayIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

type TickerControls = {
  regionLabel: string
  pause: string
  play: string
  pausedLabel: string
  pauseShort: string
  playShort: string
}

export function TechTicker({ items, controls }: { items: string[]; controls: TickerControls }) {
  const [paused, setPaused] = useState(false)

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        'flex shrink-0 items-center gap-8 pr-8 motion-safe:animate-ticker group-hover/ticker:ticker-paused',
        paused && 'ticker-paused',
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 whitespace-nowrap font-mono text-xs font-medium text-muted-foreground"
        >
          <span>{item}</span>
          <span className="inline-block size-1.5 bg-brand" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      role="region"
      aria-label={controls.regionLabel}
      className="group/ticker border-y border-border bg-card"
    >
      <div className="container-page flex items-center gap-4 py-2">
        <div className="flex min-w-0 flex-1 overflow-hidden">
          {row(false)}
          {row(true)}
        </div>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? controls.play : controls.pause}
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
        >
          {paused ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
          <span>{paused ? controls.playShort : controls.pauseShort}</span>
        </button>
      </div>
    </div>
  )
}
