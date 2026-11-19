import { Reveal } from '@/components/layout/reveal'

type Principle = { title: string; text: string }

type PhilosophyProps = {
  eyebrow: string
  title: string
  principles: Principle[]
}

export function Philosophy({ eyebrow, title, principles }: PhilosophyProps) {
  return (
    <section aria-labelledby="philosophy-title" className="border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16">
        <Reveal className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs font-medium text-brand">{eyebrow}</p>
          <h2
            id="philosophy-title"
            className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-balance-tight"
          >
            {title}
          </h2>
        </Reveal>

        <ol className="divide-y divide-border border-y border-border">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="grid gap-2 py-6 sm:grid-cols-[56px_1fr] sm:gap-6"
            >
              <span className="font-mono text-sm font-medium text-brand">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{principle.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
