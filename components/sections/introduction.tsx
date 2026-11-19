import { Reveal } from '@/components/layout/reveal'
import type { Dictionary } from '@/i18n/get-dictionary'

export function Introduction({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="intro-title" className="container-page py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <Reveal className="flex flex-col gap-3">
          <p className="font-mono text-xs font-medium text-brand">{dict.intro.eyebrow}</p>
          <h2 id="intro-title" className="text-[clamp(1.75rem,3.4vw,2.85rem)] font-semibold leading-[1.12] text-balance-tight">
            {dict.intro.title}
          </h2>
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal delay={0.04} className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">{dict.intro.p1}</p>
            <p>{dict.intro.p2}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-4 text-sm font-medium text-muted-foreground">{dict.intro.lifecycleLabel}</p>
            <ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {dict.intro.lifecycle.map((step, index) => (
                <li key={step} className="flex flex-col gap-1.5 border-t border-border pt-3">
                  <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
