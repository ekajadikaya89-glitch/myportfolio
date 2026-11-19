import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  id?: string
  className?: string
  action?: React.ReactNode
}

export function SectionHeading({ eyebrow, title, description, id, className, action }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <Reveal className="flex max-w-2xl flex-col gap-3">
        <p className="font-mono text-xs font-medium text-brand">{eyebrow}</p>
        <h2 id={id} className="text-[clamp(1.75rem,3.4vw,2.85rem)] font-semibold leading-[1.12] text-balance-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </Reveal>
      {action ? <Reveal delay={0.06}>{action}</Reveal> : null}
    </div>
  )
}
