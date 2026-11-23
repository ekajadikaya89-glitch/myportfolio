import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

export function ProofStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-label={dict.proofStrip.regionLabel} className="border-t border-border bg-card/50">
      <div className="container-page py-6 md:py-7">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dict.proofStrip.items.map((item) => (
            <li key={`${item.label}-${item.value}`}>
              <Link
                href={localePath(locale, item.href)}
                className="group flex min-h-11 flex-col justify-between gap-1 rounded-lg border border-border bg-background px-4 py-3.5 transition-colors hover:border-input hover:bg-elevated active:translate-y-px"
              >
                <span className="font-mono text-[11px] font-medium text-brand">{item.label}</span>
                <p className="text-sm font-semibold tracking-tight text-foreground group-hover:underline underline-offset-4">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
