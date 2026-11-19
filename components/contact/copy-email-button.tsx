'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@/lib/icons'

type CopyEmailButtonProps = {
  email: string
  copyLabel: string
  copiedLabel: string
}

export function CopyEmailButton({ email, copyLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      // Fallback: prompt selection via temporary textarea
      const el = document.createElement('textarea')
      el.value = email
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-input bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-elevated active:translate-y-px"
    >
      {copied ? <CheckIcon className="size-4 text-success" /> : <CopyIcon className="size-4" />}
      <span>{copied ? copiedLabel : copyLabel}</span>
    </button>
  )
}
