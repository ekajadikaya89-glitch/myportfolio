/**
 * Compact, self-hosted technical mark badges for the skills matrix.
 * Uses `currentColor` tokens so contrast stays WCAG AA compliant in both
 * light and dark themes without external CDN requests.
 */
const monoCodes: Record<string, string> = {
  PHP: 'PHP',
  JavaScript: 'JS',
  TypeScript: 'TS',
  Dart: 'DT',
  Python: 'PY',
  Go: 'GO',
  SQL: 'SQL',
  React: 'RX',
  'Next.js': 'NX',
  'Tailwind CSS': 'TW',
  Laravel: 'LV',
  FastAPI: 'FA',
  'Node.js': 'ND',
  'Express.js': 'EX',
  Gin: 'GN',
  Echo: 'EC',
  Fiber: 'FB',
  Flutter: 'FL',
  Firebase: 'FB',
  'Android Development': 'AD',
  PostgreSQL: 'PG',
  MySQL: 'MY',
  'SQL Server': 'MS',
  MongoDB: 'MG',
  'Firebase Firestore': 'FS',
  Supabase: 'SB',
  Redis: 'RD',
  LangChain: 'LC',
  LangGraph: 'LG',
  Docker: 'DK',
  'Docker Compose': 'DC',
  Linux: 'LX',
  Nginx: 'NG',
  'GitHub Actions': 'GA',
  Vercel: 'VC',
  RabbitMQ: 'MQ',
  'Apache Kafka': 'KF',
  MQTT: 'MT',
}

export function TechMark({ name }: { name: string }) {
  const code = monoCodes[name]
  if (!code) {
    return <span className="inline-block size-1.5 shrink-0 bg-brand" aria-hidden="true" />
  }
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 min-w-6 items-center justify-center rounded-sm bg-elevated px-1 font-mono text-[10px] font-semibold tracking-tight text-muted-foreground"
    >
      {code}
    </span>
  )
}
