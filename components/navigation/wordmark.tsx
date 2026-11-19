import Link from 'next/link'

export function Wordmark({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg pr-1 transition-opacity active:opacity-80"
      aria-label="Eka Prasetyo, Home"
    >
      <span
        aria-hidden="true"
        className="relative flex size-8 items-center justify-center rounded-md border border-input bg-elevated font-mono text-xs font-semibold tracking-tight text-foreground"
      >
        <span className="absolute inset-x-1.5 bottom-1 h-0.5 bg-brand" />
        EP
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">Eka Prasetyo</span>
    </Link>
  )
}
