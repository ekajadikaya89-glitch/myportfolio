import { codeToHtml } from 'shiki'

export async function CodeBlock({ code, lang, caption }: { code: string; lang: string; caption?: string }) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: 'light',
  })

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs font-medium text-muted-foreground">{lang}</span>
      </div>
      <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />
      {caption ? (
        <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
