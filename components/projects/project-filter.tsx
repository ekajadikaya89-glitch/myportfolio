'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types/content'

type FilterableItem = { slug: string; categories: ProjectCategory[]; node: React.ReactNode }

type ProjectFilterProps = {
  items: FilterableItem[]
  categories: { id: ProjectCategory; label: string }[]
  labels: { all: string; filter: string; empty: string; emptyHint: string; resetFilter: string }
}

export function ProjectFilter({ items, categories, labels }: ProjectFilterProps) {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')
  const visible = active === 'all' ? items : items.filter((item) => item.categories.includes(active))
  const options = [{ id: 'all' as const, label: labels.all }, ...categories]

  const countFor = (id: ProjectCategory | 'all') =>
    id === 'all' ? items.length : items.filter((item) => item.categories.includes(id)).length

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label={labels.filter} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 pb-1 sm:w-auto sm:flex-wrap sm:pb-0">
          {options.map((option) => {
            const selected = active === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(option.id)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-sm font-medium transition-colors active:translate-y-px',
                  selected
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-input bg-card text-foreground hover:bg-elevated',
                )}
              >
                <span>{option.label}</span>
                <span className={cn('font-mono text-xs', selected ? 'text-background' : 'text-muted-foreground')}>
                  {countFor(option.id)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} / {items.length}
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-input bg-card px-6 py-16 text-center">
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-semibold text-foreground">{labels.empty}</p>
            <p className="text-sm text-muted-foreground">{labels.emptyHint}</p>
          </div>
          <button
            type="button"
            onClick={() => setActive('all')}
            className="inline-flex min-h-11 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px"
          >
            {labels.resetFilter}
          </button>
        </div>
      ) : (
        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.22 }}
              >
                {item.node}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
