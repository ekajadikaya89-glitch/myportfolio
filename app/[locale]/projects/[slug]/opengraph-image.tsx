import { ImageResponse } from 'next/og'
import { getProject } from '@/content/projects'
import { isLocale } from '@/i18n/config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const resolvedLocale = isLocale(locale) ? locale : 'en'
  const project = getProject(slug)

  const title = project?.name ?? 'Selected Project'
  const category = project ? project.categoryLabel[resolvedLocale] : 'Software Engineering'
  const summary = project
    ? project.summary[resolvedLocale]
    : 'Architecture case study by Eka Prasetyo.'
  const stack = project ? project.stack.slice(0, 6).join(' · ') : 'Next.js · TypeScript'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08090B',
          color: '#F5F6F7',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '22px', fontWeight: 600 }}>Eka Prasetyo / Case Study</span>
          <span style={{ fontSize: '18px', color: '#38BDF8' }}>{category}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
          <div style={{ fontSize: '60px', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em' }}>
            {title}
          </div>
          <div style={{ fontSize: '25px', color: '#9BA1AD', lineHeight: 1.4 }}>{summary}</div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #232730',
            paddingTop: '24px',
            fontSize: '19px',
            color: '#9BA1AD',
          }}
        >
          <span>{stack}</span>
          <span style={{ color: '#F5F6F7' }}>EP</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
