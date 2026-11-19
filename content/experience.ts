import type { ExperienceEntry } from '@/types/content'

/**
 * Verified professional experience timeline and 2026 programs.
 * Feeds /experience, /resume, and the Grounded Portfolio Explorer.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'snoba',
    kind: 'role',
    title: {
      en: 'Information Technology Programmer (Contract, Remote)',
      id: 'Information Technology Programmer (Kontrak, Remote)',
    },
    organization: 'Snoba Indonesia',
    period: 'Dec 2025 - Present',
    summary: {
      en: 'End-to-end development of web and mobile business applications using Laravel and Flutter, from requirements and data modeling to deployment and ongoing maintenance.',
      id: 'Pengembangan menyeluruh aplikasi bisnis web dan mobile menggunakan Laravel dan Flutter, mulai dari kebutuhan dan pemodelan data hingga deployment dan pemeliharaan berkelanjutan.',
    },
    responsibilities: {
      en: [
        'Designing and developing web-based business applications with Laravel.',
        'Building multi-outlet inventory, warehouse, and operational management systems.',
        'Developing Flutter mobile features and backend API integrations.',
        'Implementing business-specific workflows and transactional data integrity.',
        'Maintaining, improving, and deploying production software systems.',
      ],
      id: [
        'Merancang dan mengembangkan aplikasi bisnis berbasis web dengan Laravel.',
        'Membangun sistem inventaris multi-outlet, gudang, dan manajemen operasional.',
        'Mengembangkan fitur mobile Flutter serta integrasi API backend.',
        'Mengimplementasikan alur kerja bisnis dan integritas data transaksional.',
        'Memelihara, meningkatkan, dan melakukan deployment sistem produksi.',
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
    id: 'imp-studio',
    kind: 'role',
    title: {
      en: 'Full Stack Engineer & Software Engineer (Contract / Freelance, Remote)',
      id: 'Full Stack Engineer & Software Engineer (Kontrak / Freelance, Remote)',
    },
    organization: 'IMP Studio',
    period: 'Nov 2025 - Jul 2026',
    summary: {
      en: 'Delivered full-stack web features and software engineering work across Laravel and Next.js engagements (Full Stack Engineer Nov 2025 - Jul 2026; Software Engineer Jan 2026 - Jul 2026).',
      id: 'Mengerjakan pengembangan full-stack dan rekayasa perangkat lunak menggunakan Laravel dan Next.js (Full Stack Engineer Nov 2025 - Jul 2026; Software Engineer Jan 2026 - Jul 2026).',
    },
    responsibilities: {
      en: [
        'Building full-stack web applications and backend services using Laravel and Next.js.',
        'Implementing frontend interfaces, API integrations, and production feature iterations.',
        'Collaborating remotely across concurrent contract and freelance software engineering deliverables.',
      ],
      id: [
        'Membangun aplikasi web full-stack dan layanan backend menggunakan Laravel dan Next.js.',
        'Mengimplementasikan antarmuka frontend, integrasi API, dan iterasi fitur produksi.',
        'Berkolaborasi secara remote pada pengembangan perangkat lunak kontrak dan freelance.',
      ],
    },
  },
  {
    id: 'gamelab-indonesia',
    kind: 'role',
    title: {
      en: 'Course Instructor / Programming Trainer (On-site)',
      id: 'Course Instructor / Trainer Pemrograman (On-site)',
    },
    organization: 'Gamelab Indonesia (PT. Educa Sisfomedia Indonesia)',
    period: 'May 2022 - Jun 2025',
    summary: {
      en: 'Trained aspiring developers and students in web programming (Laravel, PHP) through structured curriculum modules, real-world project design, live instruction, and code reviews in Salatiga.',
      id: 'Melatih pelajar dan calon developer dalam pemrograman web (Laravel, PHP) melalui penyusunan modul kurikulum, desain proyek praktik, pengajaran langsung, dan code review di Salatiga.',
    },
    responsibilities: {
      en: [
        'Designing practical software project briefs for program participants.',
        'Authoring structured programming learning modules (Laravel, PHP, and web fundamentals).',
        'Conducting code reviews, technical assessments, and project grading.',
        'Teaching programming through live webinars and on-site classroom sessions.',
      ],
      id: [
        'Membuat desain proyek praktik perangkat lunak untuk peserta pelatihan.',
        'Menyusun materi dan modul pembelajaran pemrograman (Laravel, PHP, dan fundamental web).',
        'Melakukan code review, asesmen teknis, evaluasi, dan penilaian tugas peserta.',
        'Mengajar peserta melalui webinar daring maupun kelas luring.',
      ],
    },
  },
  {
    id: 'smartindo-blockchain',
    kind: 'role',
    title: { en: 'Blockchain Developer', id: 'Blockchain Developer' },
    organization: 'PT. Smartindo Mitra Teknologi',
    period: 'Mar 2022 - May 2022',
    summary: {
      en: 'Built, tested, and integrated Solidity smart contracts with React and Next.js web applications in Salatiga.',
      id: 'Membangun, menguji, dan mengintegrasikan smart contract Solidity dengan aplikasi web React dan Next.js di Salatiga.',
    },
    responsibilities: {
      en: [
        'Writing smart contracts in Solidity.',
        'Testing and compiling smart contracts using Hardhat.',
        'Integrating React and Next.js frontends with on-chain smart contract data.',
        'Handling web and smart contract deployment workflows.',
      ],
      id: [
        'Membuat smart contract menggunakan Solidity.',
        'Melakukan pengujian dan build smart contract menggunakan Hardhat.',
        'Mengintegrasikan frontend React dan Next.js dengan data backend smart contract.',
        'Melakukan proses deployment aplikasi.',
      ],
    },
  },
  {
    id: 'teknologi-kartu-indonesia',
    kind: 'role',
    title: { en: 'Mobile Developer (Contract)', id: 'Mobile Developer (Kontrak)' },
    organization: 'PT. Teknologi Kartu Indonesia',
    period: 'May 2021 - Dec 2021',
    summary: {
      en: 'Developed cross-platform mobile interfaces with Angular and Ionic, connecting frontend screens to backend APIs and managing app releases.',
      id: 'Mengembangkan antarmuka aplikasi mobile lintas platform dengan Angular dan Ionic, menghubungkan frontend ke API backend, dan menangani rilis aplikasi.',
    },
    responsibilities: {
      en: [
        'Designing and implementing mobile UI screens using Angular and Ionic.',
        'Integrating mobile frontend workflows with backend REST APIs.',
        'Managing mobile application builds, issue tracking in Jira, and deployment.',
      ],
      id: [
        'Merancang tampilan antarmuka pengguna aplikasi mobile dengan Angular dan Ionic.',
        'Melakukan integrasi frontend mobile dengan API backend.',
        'Melakukan deployment aplikasi mobile serta pelacakan tugas di Jira.',
      ],
    },
  },
  {
    id: 'tekno-innova-solusindo',
    kind: 'role',
    title: { en: 'Web Developer (Freelance)', id: 'Web Developer (Freelance)' },
    organization: 'PT. TEKNO INNOVA SOLUSINDO',
    period: 'Feb 2021 - May 2021',
    summary: {
      en: 'Built and deployed responsive web landing pages verified across screen resolutions.',
      id: 'Membangun dan merilis halaman landing web responsif yang teruji di berbagai resolusi layar.',
    },
    responsibilities: {
      en: [
        'Building responsive web landing page layouts.',
        'Testing visual consistency across desktop and mobile screen resolutions.',
        'Deploying finished web pages to production hosting.',
      ],
      id: [
        'Membuat tampilan halaman landing web yang responsif.',
        'Melakukan pengujian tampilan di berbagai resolusi layar.',
        'Melakukan deployment aplikasi web ke produksi.',
      ],
    },
  },
  {
    id: 'earlier-it-operations',
    kind: 'role',
    title: {
      en: 'IT Operations, Systems Administration & Technical Support',
      id: 'Operasional TI, Administrasi Sistem & Technical Support',
    },
    organization: 'Telkom Indonesia, PT. Mitrasoft Infonet, SMA Negeri 1 Bringin, PT. Elektrodata Sistem Integrasi',
    period: 'Aug 2007 - Feb 2021',
    summary: {
      en: 'Over 13 years of enterprise IT support, help desk operations, and institutional information system administration prior to transitioning full-time into software engineering.',
      id: 'Lebih dari 13 tahun pengalaman di dukungan TI enterprise, operasional help desk, dan pengelolaan sistem informasi institusi sebelum berfokus penuh pada rekayasa perangkat lunak.',
    },
    responsibilities: {
      en: [
        'SMA Negeri 1 Bringin (Staff TU, Apr 2015 - Feb 2021): managed DAPODIK, PMP, e-Raport, KIP administration, and student data verification.',
        'PT. Mitrasoft Infonet (IT Customer Support, Jul 2013 - Feb 2015): resolved internal and external Telkom product incidents via phone, email, and remote troubleshooting.',
        'Telkom Indonesia (IT Help Desk Support, Aug 2008 - Jul 2013): resolved internal and external Telkom application issues across Jakarta operations.',
        'PT. Elektrodata Sistem Integrasi (IT Technical Support, Aug 2007 - Aug 2008): installed and maintained CCTV, fingerprint, voice recording, and security systems.',
      ],
      id: [
        'SMA Negeri 1 Bringin (Staff TU, Apr 2015 - Feb 2021): mengelola aplikasi DAPODIK, PMP, e-Raport, pengajuan KIP, serta verifikasi dan validasi data peserta didik.',
        'PT. Mitrasoft Infonet (IT Customer Support, Jul 2013 - Feb 2015): menangani keluhan aplikasi produk Telkom via telepon dan email serta troubleshooting remote.',
        'Telkom Indonesia (IT Help Desk Support, Agu 2008 - Jul 2013): menyelesaikan kendala aplikasi internal maupun eksternal pengguna Telkom di Jakarta.',
        'PT. Elektrodata Sistem Integrasi (IT Technical Support, Agu 2007 - Agu 2008): instalasi, troubleshooting, dan pemeliharaan sistem CCTV, fingerprint, voice recording, dan keamanan.',
      ],
    },
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
