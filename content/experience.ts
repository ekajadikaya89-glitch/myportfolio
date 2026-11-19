import type { ExperienceEntry } from '@/types/content'

/**
 * Experience timeline. Add `period` (e.g. "2023 to Present") only once verified.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'snoba',
    kind: 'role',
    title: { en: 'Software Developer / Solo Developer', id: 'Software Developer / Solo Developer' },
    organization: 'Snoba Indonesia',
    summary: {
      en: 'End-to-end development of web-based business applications, from requirements and data modeling to delivery and ongoing improvement.',
      id: 'Pengembangan menyeluruh aplikasi bisnis berbasis web, mulai dari kebutuhan dan pemodelan data hingga deployment dan peningkatan berkelanjutan.',
    },
    responsibilities: {
      en: [
        'Designing and developing web-based business applications.',
        'Building inventory and operational management systems.',
        'Implementing backend services and application integrations.',
        'Developing business-specific workflows.',
        'Maintaining and improving existing software systems.',
        'Supporting application delivery and deployment.',
      ],
      id: [
        'Merancang dan mengembangkan aplikasi bisnis berbasis web.',
        'Membangun sistem inventaris dan manajemen operasional.',
        'Mengimplementasikan layanan backend dan integrasi aplikasi.',
        'Mengembangkan alur kerja yang spesifik untuk kebutuhan bisnis.',
        'Memelihara dan meningkatkan sistem perangkat lunak yang sudah ada.',
        'Mendukung proses rilis dan deployment aplikasi.',
      ],
    },
    projects: [
      'Indonesia Equine',
      'Gaya Batik Unggul Inventory',
      'Kyro Printing Inventory',
      'Gettsee POS / WIMS',
      'Survey Sushi Rame',
    ],
  },
  {
    id: 'infinity-rise',
    kind: 'program',
    title: { en: 'Incubation Participant: HajjTrack Ecosystem', id: 'Peserta Inkubasi: HajjTrack Ecosystem' },
    organization: 'Infinity Squad / Infinity Rise 2026',
    period: '2026',
    summary: {
      en: 'Developed the HajjTrack Ecosystem as part of an incubation program, reaching the Top 10.',
      id: 'Mengembangkan HajjTrack Ecosystem sebagai bagian dari program inkubasi dan masuk Top 10.',
    },
    responsibilities: {
      en: [
        'Designing an ecosystem that integrates IoT hardware, BLE, mobile, and backend services.',
        'Building the product architecture and validating the concept within the program.',
      ],
      id: [
        'Merancang ekosistem yang mengintegrasikan perangkat IoT, BLE, mobile, dan layanan backend.',
        'Membangun arsitektur produk dan memvalidasi konsep dalam program.',
      ],
    },
  },
  {
    id: 'digital-entrepreneurship',
    kind: 'program',
    title: { en: 'Participant (Top 3)', id: 'Peserta (Top 3)' },
    organization: 'Digital Entrepreneurship Challenge and Incubation 2026',
    period: '2026',
    summary: {
      en: 'Recognized in the Top 3 of a digital entrepreneurship challenge and incubation program.',
      id: 'Meraih posisi Top 3 dalam program tantangan dan inkubasi kewirausahaan digital.',
    },
    responsibilities: {
      en: ['Developing and presenting a digital product within the challenge and incubation program.'],
      id: ['Mengembangkan dan mempresentasikan produk digital dalam program tantangan dan inkubasi.'],
    },
  },
]
