import type { ExperienceEntry } from '@/types/content'

/**
 * Experience timeline. Add `period` on roles only once verified by the owner.
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
    id: 'indonesia-web3-hackathon',
    kind: 'program',
    title: { en: 'Hackathon Builder: AI & Web3 Track', id: 'Peserta Hackathon: Jalur AI & Web3' },
    organization: 'Indonesia Web3 Hackathon 2026 (Binance Academy, BNB Chain, Coinvestasi)',
    period: 'Nov 2026',
    summary: {
      en: 'Designed, built, and submitted a project combining Artificial Intelligence (AI) and Web3 capabilities within the hackathon program.',
      id: 'Merancang, membangun, dan mengirimkan proyek yang memadukan kapabilitas Artificial Intelligence (AI) dan Web3 dalam rangkaian hackathon.',
    },
    responsibilities: {
      en: [
        'Prototyping and delivering an end-to-end AI and Web3 submission under hackathon time constraints.',
        'Documenting architecture and demonstrating working capabilities for final evaluation.',
      ],
      id: [
        'Membuat prototipe dan menyelesaikan proyek AI dan Web3 secara menyeluruh dalam batas waktu hackathon.',
        'Mendokumentasikan arsitektur dan mendemonstrasikan fitur berjalan untuk penilaian akhir.',
      ],
    },
  },
  {
    id: 'digital-entrepreneurship',
    kind: 'program',
    title: { en: '3rd Place Winner & Finalist', id: 'Juara 3 & Finalis' },
    organization: 'Digital Entrepreneurship Challenge & Incubation 2026 (BPKH RI & Universitas Indonesia)',
    period: 'Oct 2026',
    summary: {
      en: 'Awarded 3rd Place in the Digital Entrepreneurship Challenge & Incubation 2026 focused on building sustainable digital products.',
      id: 'Meraih Juara 3 dalam Digital Entrepreneurship Challenge & Incubation 2026 yang berfokus pada pembangunan produk digital berkelanjutan.',
    },
    responsibilities: {
      en: ['Developing, validating, and presenting a digital product architecture during challenge and incubation sessions.'],
      id: ['Mengembangkan, memvalidasi, dan mempresentasikan arsitektur produk digital dalam sesi tantangan dan inkubasi.'],
    },
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
]
