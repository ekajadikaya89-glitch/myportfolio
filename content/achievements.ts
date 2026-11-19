import type { Achievement } from '@/types/content'

/** Add `evidenceUrl` only when a verifiable public link exists. */
export const achievements: Achievement[] = [
  {
    id: 'digital-entrepreneurship-2026',
    title: { en: 'Top 3 Recognition', id: 'Pengakuan Top 3' },
    event: 'Digital Entrepreneurship Challenge and Incubation 2026',
    year: '2026',
    recognition: { en: 'Top 3', id: 'Top 3' },
    description: {
      en: 'Recognized among the top three participants of a digital entrepreneurship challenge and incubation program focused on building digital products.',
      id: 'Diakui sebagai salah satu dari tiga peserta terbaik dalam program tantangan dan inkubasi kewirausahaan digital yang berfokus pada pembangunan produk digital.',
    },
  },
  {
    id: 'infinity-rise-2026',
    title: { en: 'Top 10 Incubation Participant', id: 'Peserta Inkubasi Top 10' },
    event: 'Infinity Squad / Infinity Rise 2026',
    year: '2026',
    recognition: { en: 'Top 10', id: 'Top 10' },
    description: {
      en: 'HajjTrack Ecosystem was selected into the Top 10 of the Infinity Squad / Infinity Rise 2026 incubation program.',
      id: 'HajjTrack Ecosystem terpilih masuk Top 10 dalam program inkubasi Infinity Squad / Infinity Rise 2026.',
    },
    relatedProject: 'hajjtrack-ecosystem',
  },
]
