import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types/content'

const tone: Record<ProjectStatus, string> = {
  live: 'bg-success',
  'in-development': 'bg-brand',
  concept: 'bg-warning',
  'client-work': 'bg-muted-foreground',
}

export function StatusBadge({ status, label, className }: { status: ProjectStatus; label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-input bg-background px-2.5 py-1 font-mono text-xs font-medium text-foreground',
        className,
      )}
    >
      <span className={cn('size-2 shrink-0 rounded-full', tone[status])} aria-hidden="true" />
      {label}
    </span>
  )
}
