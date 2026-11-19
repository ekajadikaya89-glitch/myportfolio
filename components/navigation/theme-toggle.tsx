'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@/lib/icons'

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="inline-flex size-11 items-center justify-center rounded-lg border border-input bg-card text-foreground transition-colors hover:bg-elevated active:translate-y-px"
      aria-label={label}
      title={label}
    >
      <SunIcon className="hidden size-4 dark:block" />
      <MoonIcon className="size-4 dark:hidden" />
    </button>
  )
}
