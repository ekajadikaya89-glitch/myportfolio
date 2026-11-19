'use client'

import { PrinterIcon } from '@/lib/icons'

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:translate-y-px"
    >
      <PrinterIcon className="size-4" />
      {label}
    </button>
  )
}
