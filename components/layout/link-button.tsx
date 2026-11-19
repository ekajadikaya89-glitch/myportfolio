import Link from 'next/link'
import { cn } from '@/lib/utils'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0'

const variants = {
  primary: 'bg-foreground text-background hover:opacity-90',
  secondary: 'border border-input bg-card text-foreground hover:bg-elevated',
  ghost: 'text-muted-foreground hover:bg-elevated hover:text-foreground',
} as const

type LinkButtonProps = {
  href: string
  variant?: keyof typeof variants
  external?: boolean
  download?: boolean | string
  className?: string
  children: React.ReactNode
}

export function LinkButton({ href, variant = 'primary', external, download, className, children }: LinkButtonProps) {
  const classes = cn(base, variants[variant], className)

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
