import { ImageResponse } from 'next/og'
import { isLocale } from '@/i18n/config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Eka Prasetyo | AI Engineer & Full-Stack Developer'

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isId = isLocale(locale) && locale === 'id'

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '10px',
                border: '2px solid #5E6673',
                backgroundColor: '#171A20',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700,
              }}
            >
              <span>EP</span>
              <span style={{ width: '32px', height: '3px', backgroundColor: '#38BDF8', marginTop: '2px' }} />
            </div>
            <span style={{ fontSize: '26px', fontWeight: 600 }}>Eka Prasetyo</span>
          </div>
          <span style={{ fontSize: '18px', color: '#38BDF8', letterSpacing: '0.04em' }}>
            INDONESIA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
          <div style={{ fontSize: '58px', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            {isId
              ? 'AI Engineer & Full-Stack Developer'
              : 'AI Engineer & Full-Stack Developer'}
          </div>
          <div style={{ fontSize: '26px', color: '#9BA1AD', lineHeight: 1.4 }}>
            {isId
              ? 'Membangun sistem AI produksi, aplikasi web & mobile yang skalabel, dan arsitektur perangkat lunak yang andal.'
              : 'Building production AI systems, scalable web & mobile applications, and dependable software architecture.'}
          </div>
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
          <span>LLM &amp; Agents · Next.js · FastAPI · Laravel · Go · Flutter</span>
          <span style={{ color: '#F5F6F7' }}>github.com/eka0789</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
