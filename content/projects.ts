import type { Project, ProjectCategory } from '@/types/content'

export const projectCategories: ProjectCategory[] = [
  'ai',
  'saas',
  'web',
  'mobile',
  'erp',
  'fintech',
  'devtools',
]

/**
 * Portfolio projects. Add new entries here; pages, filters, sitemap, and
 * resume update automatically. Never add metrics that are not verified.
 */
export const projects: Project[] = [
  {
    slug: 'hajjtrack-ecosystem',
    name: 'HajjTrack Ecosystem',
    categories: ['mobile', 'saas'],
    categoryLabel: { en: 'IoT / Mobile / Connected Systems', id: 'IoT / Mobile / Sistem Terhubung' },
    status: 'in-development',
    featured: true,
    summary: {
      en: 'A connected technology ecosystem designed to support Hajj and Umrah operations through integrated software and hardware components.',
      id: 'Ekosistem teknologi terhubung yang dirancang untuk mendukung operasional Haji dan Umrah melalui integrasi perangkat lunak dan perangkat keras.',
    },
    problem: {
      en: 'Pilgrims, families, and organizers need dependable ways to stay connected and coordinated in crowded environments where conventional apps alone are not enough.',
      id: 'Jamaah, keluarga, dan penyelenggara membutuhkan cara yang andal untuk tetap terhubung dan terkoordinasi di lingkungan yang sangat padat, di mana aplikasi biasa saja tidak cukup.',
    },
    solution: {
      en: 'An ecosystem that combines BLE-enabled hardware, a Flutter mobile application, and a backend platform so devices, people, and organizers share one connected system.',
      id: 'Ekosistem yang menggabungkan perangkat keras berbasis BLE, aplikasi mobile Flutter, dan platform backend sehingga perangkat, orang, dan penyelenggara terhubung dalam satu sistem.',
    },
    contribution: {
      en: 'System integration across hardware and software: backend architecture, mobile application development, BLE communication, and real-time data flow between components.',
      id: 'Integrasi sistem lintas perangkat keras dan perangkat lunak: arsitektur backend, pengembangan aplikasi mobile, komunikasi BLE, dan aliran data real-time antar komponen.',
    },
    highlights: {
      en: ['IoT integration', 'BLE technology', 'Backend architecture', 'Mobile application development', 'Real-time communication', 'System integration'],
      id: ['Integrasi IoT', 'Teknologi BLE', 'Arsitektur backend', 'Pengembangan aplikasi mobile', 'Komunikasi real-time', 'Integrasi sistem'],
    },
    stack: ['Flutter', 'Dart', 'BLE', 'IoT', 'REST API', 'Real-time messaging'],
    image: '/projects/hajjtrack.svg',
    imageAlt: {
      en: 'HajjTrack Ecosystem architecture diagram linking BLE field beacons, Flutter mobile client, REST API gateway, and organizer coordination',
      id: 'Diagram arsitektur HajjTrack Ecosystem yang menghubungkan beacon BLE, klien mobile Flutter, API gateway REST, dan koordinasi penyelenggara',
    },
    links: { repo: 'https://github.com/eka0789/HajjTrackEcosystem' },
    recognition: {
      en: 'Selected for the Infinity Squad / Infinity Rise 2026 incubation program (Top 10).',
      id: 'Terpilih dalam program inkubasi Infinity Squad / Infinity Rise 2026 (Top 10).',
    },
  },
  {
    slug: 'devflow-ai',
    name: 'DevFlow AI',
    categories: ['ai', 'devtools', 'saas'],
    categoryLabel: { en: 'AI / Developer Productivity / SaaS', id: 'AI / Produktivitas Developer / SaaS' },
    status: 'in-development',
    featured: true,
    summary: {
      en: 'A software engineering workspace integrating LLM agents across task planning, code generation, and pull request workflows.',
      id: 'Workspace rekayasa perangkat lunak yang mengintegrasikan agen LLM untuk perencanaan tugas, pembuatan kode, dan alur pull request.',
    },
    problem: {
      en: 'Engineering work is fragmented across issue trackers, repositories, AI chat tools, and planning documents, so context is constantly lost between them.',
      id: 'Pekerjaan engineering tersebar di issue tracker, repositori, alat chat AI, dan dokumen perencanaan sehingga konteks terus hilang di antara semuanya.',
    },
    solution: {
      en: 'A single workspace where AI agents help plan tasks, generate code, and move work through pull request and sprint workflows with the repository as the source of truth.',
      id: 'Satu workspace di mana agen AI membantu merencanakan tugas, menghasilkan kode, dan menjalankan alur pull request serta sprint dengan repositori sebagai sumber kebenaran.',
    },
    contribution: {
      en: 'Product definition and architecture: agent orchestration design, GitHub integration strategy, and a Firebase + Cloud Run service architecture.',
      id: 'Definisi produk dan arsitektur: desain orkestrasi agen, strategi integrasi GitHub, serta arsitektur layanan Firebase + Cloud Run.',
    },
    highlights: {
      en: ['AI engineering assistant', 'Agent orchestration', 'GitHub integration', 'Firebase and Cloud Run architecture'],
      id: ['Asisten AI engineering', 'Orkestrasi agen', 'Integrasi GitHub', 'Arsitektur Firebase dan Cloud Run'],
    },
    features: [
      { label: { en: 'AI engineering assistant', id: 'Asisten AI engineering' }, state: 'planned' },
      { label: { en: 'GitHub integration', id: 'Integrasi GitHub' }, state: 'planned' },
      { label: { en: 'AI task planning', id: 'Perencanaan tugas dengan AI' }, state: 'planned' },
      { label: { en: 'Code generation', id: 'Pembuatan kode' }, state: 'planned' },
      { label: { en: 'Pull request workflows', id: 'Alur kerja pull request' }, state: 'planned' },
      { label: { en: 'Sprint management', id: 'Manajemen sprint' }, state: 'planned' },
      { label: { en: 'Agent orchestration', id: 'Orkestrasi agen' }, state: 'planned' },
    ],
    featuresNote: {
      en: 'DevFlow AI is in active development. The scope below is the planned product surface; items will be marked as implemented once they ship.',
      id: 'DevFlow AI sedang dalam pengembangan aktif. Cakupan di bawah adalah rencana produk; item akan ditandai sudah diimplementasikan setelah dirilis.',
    },
    stack: ['TypeScript', 'Next.js', 'Firebase', 'Cloud Run', 'LLM APIs', 'GitHub API'],
    image: '/projects/devflow-ai.svg',
    imageAlt: {
      en: 'DevFlow AI architecture schematic showing repository context, agent workflow engine, pull request review gate, Cloud Run workers, and Firebase persistence',
      id: 'Diagram arsitektur DevFlow AI yang menampilkan konteks repositori, mesin orkestrasi agen, gerbang ulasan PR, worker Cloud Run, dan penyimpanan Firebase',
    },
    links: {},
  },
  {
    slug: 'gettsee-wims',
    name: 'Gettsee WIMS',
    categories: ['erp', 'saas'],
    categoryLabel: { en: 'Enterprise / ERP / Inventory', id: 'Enterprise / ERP / Inventaris' },
    status: 'client-work',
    featured: true,
    summary: {
      en: 'An integrated inventory and warehouse management solution supporting operational workflows, stock movements, purchasing, and outlet management.',
      id: 'Solusi manajemen inventaris dan gudang terintegrasi yang mendukung alur operasional, pergerakan stok, pembelian, dan manajemen outlet.',
    },
    problem: {
      en: 'Multi-outlet operations struggle to keep stock accurate when purchasing, transfers, and sales happen across warehouses and outlets at the same time.',
      id: 'Operasional multi-outlet kesulitan menjaga akurasi stok ketika pembelian, transfer, dan penjualan terjadi bersamaan di berbagai gudang dan outlet.',
    },
    solution: {
      en: 'A warehouse and inventory system where every stock movement is a recorded, traceable transaction tied to purchasing, transfers, and outlet operations.',
      id: 'Sistem gudang dan inventaris di mana setiap pergerakan stok adalah transaksi yang tercatat dan dapat ditelusuri, terhubung dengan pembelian, transfer, dan operasional outlet.',
    },
    contribution: {
      en: 'Designed inventory workflows and data models, implemented stock transfer and purchasing modules, and enforced transaction integrity on stock movements.',
      id: 'Merancang alur dan model data inventaris, mengimplementasikan modul transfer stok dan pembelian, serta menjaga integritas transaksi pada pergerakan stok.',
    },
    highlights: {
      en: ['Inventory management', 'Warehouse workflows', 'Purchase management', 'Stock transfers', 'Transaction integrity', 'Business process automation'],
      id: ['Manajemen inventaris', 'Alur kerja gudang', 'Manajemen pembelian', 'Transfer stok', 'Integritas transaksi', 'Otomasi proses bisnis'],
    },
    stack: ['Laravel', 'PHP', 'MySQL', 'REST API'],
    image: '/projects/gettsee-wims.svg',
    imageAlt: {
      en: 'Gettsee WIMS architecture diagram showing purchase orders, transfers, and adjustments flowing through an atomic append-only MySQL stock ledger to multi-outlet POS',
      id: 'Diagram arsitektur Gettsee WIMS yang menampilkan pembelian, transfer, dan penyesuaian melalui ledger stok atomik MySQL ke POS multi-outlet',
    },
    links: {},
  },
  {
    slug: 'nara',
    name: 'NARA',
    categories: ['ai', 'mobile'],
    categoryLabel: { en: 'AI / Mobile Application', id: 'AI / Aplikasi Mobile' },
    status: 'concept',
    featured: true,
    summary: {
      en: 'A smartphone companion concept unifying everyday mobile tasks through conversational AI and OS integrations.',
      id: 'Konsep asisten smartphone yang menyatukan aktivitas mobile sehari-hari melalui AI percakapan dan integrasi sistem operasi.',
    },
    problem: {
      en: 'Everyday tasks are scattered across many apps, and switching between them adds friction to simple goals.',
      id: 'Tugas sehari-hari tersebar di banyak aplikasi, dan berpindah-pindah di antaranya menambah hambatan untuk tujuan yang sederhana.',
    },
    solution: {
      en: 'A conversational assistant that sits on top of mobile capabilities, combining on-device and cloud AI to interpret intent and act across integrations.',
      id: 'Asisten percakapan yang berjalan di atas kapabilitas mobile, menggabungkan AI di perangkat dan cloud untuk menafsirkan maksud dan bertindak lintas integrasi.',
    },
    contribution: {
      en: 'Concept and architecture for a hybrid AI assistant, Flutter application structure, and Firebase-backed services.',
      id: 'Konsep dan arsitektur asisten AI hibrida, struktur aplikasi Flutter, serta layanan berbasis Firebase.',
    },
    highlights: {
      en: ['Flutter', 'Firebase', 'Voice assistant concept', 'Hybrid AI architecture', 'Mobile integrations', 'Personal AI assistant'],
      id: ['Flutter', 'Firebase', 'Konsep asisten suara', 'Arsitektur AI hibrida', 'Integrasi mobile', 'Asisten AI pribadi'],
    },
    stack: ['Flutter', 'Dart', 'Firebase', 'LLM APIs'],
    image: '/projects/nara.svg',
    imageAlt: {
      en: 'NARA concept architecture diagram connecting Flutter voice and text input through a hybrid intent router to fast on-device actions and cloud LLM orchestration',
      id: 'Diagram arsitektur konsep NARA yang menghubungkan input suara dan teks Flutter melalui router intent hibrida ke eksekusi lokal dan orkestrasi LLM cloud',
    },
    links: {},
  },
  {
    slug: 'kyro-printing',
    name: 'Kyro Printing',
    categories: ['erp', 'saas'],
    categoryLabel: { en: 'SaaS / ERP / Inventory', id: 'SaaS / ERP / Inventaris' },
    status: 'client-work',
    summary: {
      en: 'An inventory and order management solution designed to support printing business operations.',
      id: 'Solusi manajemen inventaris dan pesanan yang dirancang untuk mendukung operasional bisnis percetakan.',
    },
    problem: {
      en: 'Printing businesses must reserve materials for incoming orders while keeping stock accurate across concurrent jobs.',
      id: 'Bisnis percetakan harus mereservasi bahan untuk pesanan masuk sambil menjaga akurasi stok di tengah pekerjaan yang berjalan bersamaan.',
    },
    solution: {
      en: 'An order-driven inventory system with stock reservation, so materials are allocated to orders consistently from intake to completion.',
      id: 'Sistem inventaris berbasis pesanan dengan reservasi stok, sehingga bahan dialokasikan ke pesanan secara konsisten dari penerimaan hingga selesai.',
    },
    contribution: {
      en: 'Order processing and stock reservation logic, transaction consistency for inventory operations, and multi-tenant design considerations.',
      id: 'Logika pemrosesan pesanan dan reservasi stok, konsistensi transaksi pada operasi inventaris, serta pertimbangan desain multi-tenant.',
    },
    highlights: {
      en: ['Inventory control', 'Order processing', 'Stock reservation', 'Multi-tenant considerations', 'Transaction consistency', 'Business workflow management'],
      id: ['Kontrol inventaris', 'Pemrosesan pesanan', 'Reservasi stok', 'Pertimbangan multi-tenant', 'Konsistensi transaksi', 'Manajemen alur bisnis'],
    },
    stack: ['Laravel', 'PHP', 'MySQL'],
    image: '/projects/kyro-printing.svg',
    imageAlt: {
      en: 'Kyro Printing workflow diagram illustrating print order intake, atomic material reservation lock, fulfillment commit, and multi-tenant scope',
      id: 'Diagram alur kerja Kyro Printing yang menampilkan penerimaan pesanan cetak, kunci reservasi bahan atomik, eksekusi pemenuhan, dan cakupan multi-tenant',
    },
    links: {},
  },
  {
    slug: 'aktifkoding',
    name: 'AktifKoding',
    categories: ['devtools', 'web'],
    categoryLabel: { en: 'Developer Tools / Web Platform', id: 'Developer Tools / Platform Web' },
    status: 'live',
    summary: {
      en: 'A developer-focused platform bringing software development tools, resources, and productivity utilities into one place.',
      id: 'Platform untuk developer yang menghadirkan alat pengembangan, sumber belajar, dan utilitas produktivitas dalam satu tempat.',
    },
    problem: {
      en: 'Developers spend time hunting for reliable tools and resources spread across many websites.',
      id: 'Developer menghabiskan waktu mencari alat dan sumber daya yang andal yang tersebar di banyak situs.',
    },
    solution: {
      en: 'A curated directory and utility hub for developers, built on a modern web stack with room for community-oriented features.',
      id: 'Direktori dan pusat utilitas yang dikurasi untuk developer, dibangun dengan stack web modern dan siap untuk fitur berbasis komunitas.',
    },
    contribution: {
      en: 'End-to-end build: Next.js web architecture, Supabase data layer, and the developer tools directory experience.',
      id: 'Pembangunan menyeluruh: arsitektur web Next.js, lapisan data Supabase, dan pengalaman direktori developer tools.',
    },
    highlights: {
      en: ['Next.js', 'Supabase', 'Developer tools directory', 'Community-oriented features', 'Web architecture'],
      id: ['Next.js', 'Supabase', 'Direktori developer tools', 'Fitur berbasis komunitas', 'Arsitektur web'],
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'],
    image: '/projects/aktifkoding.svg',
    imageAlt: {
      en: 'AktifKoding platform architecture diagram showing Next.js tool directory, productivity utilities, community resources, and Supabase PostgreSQL layer',
      id: 'Diagram arsitektur platform AktifKoding yang menampilkan direktori alat Next.js, utilitas produktivitas, sumber daya komunitas, dan lapisan Supabase PostgreSQL',
    },
    links: { live: 'https://www.aktifkoding.biz.id/' },
  },
  {
    slug: 'ruangkumpul',
    name: 'RuangKumpul',
    categories: ['web'],
    categoryLabel: { en: 'Community / Digital Platform', id: 'Komunitas / Platform Digital' },
    status: 'live',
    summary: {
      en: 'A digital platform unifying tools, community interactions, and curated digital resources.',
      id: 'Platform digital yang menyatukan alat, interaksi komunitas, dan sumber daya digital yang bermanfaat.',
    },
    problem: {
      en: 'Communities often rely on disconnected channels for discussions, resources, and tools.',
      id: 'Komunitas sering mengandalkan kanal yang terpisah-pisah untuk diskusi, sumber daya, dan alat.',
    },
    solution: {
      en: 'A shared digital space that brings community interactions and resources into a single ecosystem.',
      id: 'Ruang digital bersama yang menyatukan interaksi komunitas dan sumber daya dalam satu ekosistem.',
    },
    contribution: {
      en: 'Community platform architecture on Next.js and Supabase, and the overall digital ecosystem design.',
      id: 'Arsitektur platform komunitas dengan Next.js dan Supabase, serta desain ekosistem digital secara keseluruhan.',
    },
    highlights: {
      en: ['Next.js', 'Supabase', 'Community architecture', 'Digital ecosystem'],
      id: ['Next.js', 'Supabase', 'Arsitektur komunitas', 'Ekosistem digital'],
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    image: '/projects/ruangkumpul.svg',
    imageAlt: {
      en: 'RuangKumpul ecosystem schematic connecting shared tools, curated knowledge, and community discussion channels on Next.js and Supabase',
      id: 'Diagram ekosistem RuangKumpul yang menghubungkan alat bersama, pengetahuan terkurasi, dan kanal diskusi komunitas di Next.js dan Supabase',
    },
    links: { live: 'https://ruangkumpul.my.id/' },
  },
  {
    slug: 'jasait',
    name: 'JasaIT',
    categories: ['web'],
    categoryLabel: { en: 'Service Platform / Business Web', id: 'Platform Layanan / Situs Bisnis' },
    status: 'live',
    summary: {
      en: 'A digital service platform for presenting IT services, consultation, and technology solutions.',
      id: 'Platform layanan digital untuk menampilkan jasa IT, konsultasi, dan solusi teknologi.',
    },
    problem: {
      en: 'Businesses looking for IT help need a clear, trustworthy way to evaluate available services and start a conversation.',
      id: 'Bisnis yang membutuhkan bantuan IT memerlukan cara yang jelas dan terpercaya untuk menilai layanan yang tersedia dan memulai komunikasi.',
    },
    solution: {
      en: 'A business-oriented website that presents services clearly and guides visitors toward technical consultation.',
      id: 'Situs berorientasi bisnis yang menampilkan layanan dengan jelas dan mengarahkan pengunjung ke konsultasi teknis.',
    },
    contribution: {
      en: 'Web development, service information architecture, and conversion-focused UX for customer acquisition.',
      id: 'Pengembangan web, arsitektur informasi layanan, dan UX yang berfokus pada konversi untuk akuisisi pelanggan.',
    },
    highlights: {
      en: ['Web development', 'Service presentation', 'Business-oriented UX', 'Customer acquisition'],
      id: ['Pengembangan web', 'Presentasi layanan', 'UX berorientasi bisnis', 'Akuisisi pelanggan'],
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/jasait.svg',
    imageAlt: {
      en: 'JasaIT platform architecture diagram showing service catalog, business solution framing, and consultation scoping workflow built with Next.js',
      id: 'Diagram arsitektur platform JasaIT yang menampilkan katalog layanan, penyusunan solusi bisnis, dan alur konsultasi yang dibangun dengan Next.js',
    },
    links: { live: 'https://www.jasait.my.id/' },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export const featuredProjects = projects.filter((project) => project.featured)
