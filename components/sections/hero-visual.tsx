const layers = [
  {
    index: '01',
    name: 'Client Interfaces',
    stack: 'Next.js · TypeScript · Flutter',
    detail: 'Responsive web apps & mobile BLE clients',
    accent: false,
  },
  {
    index: '02',
    name: 'Application & API Services',
    stack: 'Laravel · FastAPI · Go',
    detail: 'Validated REST contracts & domain boundaries',
    accent: false,
  },
  {
    index: '03',
    name: 'AI & Agent Orchestration',
    stack: 'LLM APIs · RAG · LangGraph',
    detail: 'Structured outputs, tool guards & review gates',
    accent: true,
  },
  {
    index: '04',
    name: 'Storage & Messaging',
    stack: 'PostgreSQL · MySQL · Redis · RabbitMQ',
    detail: 'ACID ledgers, row locks & durable event queues',
    accent: false,
  },
] as const

export function HeroVisual({ caption }: { caption: string }) {
  return (
    <figure className="w-full rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
        <span className="font-mono text-xs font-medium text-muted-foreground">SYSTEM TOPOLOGY</span>
        <span className="font-mono text-xs text-brand">4 LAYERS</span>
      </div>

      <ol className="flex flex-col" aria-hidden="true">
        {layers.map((layer, index) => (
          <li key={layer.index} className="relative">
            {index > 0 ? (
              <div className="flex items-center pl-5 py-1.5">
                <span className="block h-3.5 w-px bg-input" />
              </div>
            ) : null}
            <div
              className={
                layer.accent
                  ? 'rounded-lg border border-brand bg-elevated px-4 py-3.5'
                  : 'rounded-lg border border-border bg-background px-4 py-3.5'
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-foreground">{layer.name}</span>
                <span className="font-mono text-xs text-brand">{layer.index}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{layer.stack}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{layer.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="mt-5 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}
