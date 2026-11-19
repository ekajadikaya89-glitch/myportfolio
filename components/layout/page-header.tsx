import { Reveal } from './reveal'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50">
      <div className="container-page flex flex-col gap-5 pb-12 pt-12 md:pb-16 md:pt-20">
        <Reveal>
          <p className="font-mono text-xs font-medium text-brand">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.04}>
          <h1 className="max-w-4xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] text-balance-tight">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </header>
  )
}
