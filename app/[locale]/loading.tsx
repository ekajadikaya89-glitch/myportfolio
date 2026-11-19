export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="container-page flex min-h-[50dvh] flex-col justify-center gap-6 py-20"
    >
      <p className="font-mono text-xs font-medium text-brand">Loading page content...</p>
      <div className="flex max-w-2xl flex-col gap-3" aria-hidden="true">
        <div className="h-9 w-3/4 rounded-md bg-elevated" />
        <div className="h-5 w-full rounded-md bg-card" />
        <div className="h-5 w-5/6 rounded-md bg-card" />
      </div>
    </section>
  )
}
