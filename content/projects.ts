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
 * Portfolio projects. Add new entries here; pages, filters, sitemap, assistant
 * corpus, and resume update automatically. Never add unverified metrics.
 */
export const projects: Project[] = [
  {
    slug: 'devflow-ai',
    name: 'DevFlow AI',
    categories: ['ai', 'devtools', 'saas'],
    categoryLabel: { en: 'AI / Developer Productivity / SaaS', id: 'AI / Produktivitas Developer / SaaS' },
    status: 'in-development',
    featured: true,
    summary: {
      en: 'A personal software engineering workspace with a 7-agent planning registry, agile scrum state machine, GitHub integration, and isolated Docker AI code execution.',
      id: 'Workspace rekayasa perangkat lunak dengan 7 agen perencanaan, state machine agile scrum, integrasi GitHub, dan eksekusi kode AI di container Docker terisolasi.',
    },
    problem: {
      en: 'Engineering work is fragmented across issue trackers, repositories, AI chat tools, and planning documents, so context is lost and unreviewed AI edits create risk.',
      id: 'Pekerjaan engineering tersebar di issue tracker, repositori, alat chat AI, dan dokumen perencanaan sehingga konteks hilang dan perubahan AI tanpa ulasan menimbulkan risiko.',
    },
    solution: {
      en: 'A monorepo workspace (Express + TypeScript API, React 18 client, shared Zod contracts) where 7 specialized agents produce draft PRDs and backlogs for human approval, run tests inside restricted Docker containers, and open draft PRs on GitHub.',
      id: 'Workspace monorepo (API Express + TypeScript, klien React 18, kontrak Zod bersama) di mana 7 agen menghasilkan draf PRD dan backlog untuk persetujuan manusia, menjalankan tes di container Docker terisolasi, lalu membuka draft PR di GitHub.',
    },
    contribution: {
      en: 'End-to-end architecture and implementation: multi-agent workflow drafts, dependency-checked Scrum state machine, SSE streaming chat with token tracking, HMAC-verified webhooks, and Docker-sandboxed PR execution.',
      id: 'Arsitektur dan implementasi menyeluruh: alur draf multi-agen, state machine Scrum dengan deteksi siklus dependensi, chat streaming SSE dengan pelacakan token, webhook bertanda tangan HMAC, dan eksekusi PR terisolasi Docker.',
    },
    highlights: {
      en: [
        '7-agent planning registry with human approval gates',
        'Agile Scrum board & centralized state machine',
        'Docker-isolated AI code execution & draft PRs',
        'Encrypted GitHub PAT & HMAC webhook verification',
        'SSE streaming AI chat with token usage tracking',
        'Multi-member RBAC workspaces & JSON portability',
      ],
      id: [
        'Registri 7 agen perencanaan dengan gerbang persetujuan manusia',
        'Papan Agile Scrum & state machine terpusat',
        'Eksekusi kode AI terisolasi Docker & draft PR',
        'PAT GitHub terenkripsi & verifikasi webhook HMAC',
        'Chat AI streaming SSE dengan pelacakan penggunaan token',
        'Workspace RBAC multi-anggota & ekspor-impor JSON',
      ],
    },
    features: [
      { label: { en: '7-agent planning workflows (draft-first approval)', id: 'Alur perencanaan 7 agen (persetujuan draf)' }, state: 'implemented' },
      { label: { en: 'Agile Scrum backlog, sprints & Kanban state machine', id: 'Backlog Agile Scrum, sprint & state machine Kanban' }, state: 'implemented' },
      { label: { en: 'GitHub repo integration, webhooks & audit-logged PRs', id: 'Integrasi repo GitHub, webhook & PR dengan log audit' }, state: 'implemented' },
      { label: { en: 'Docker-sandboxed AI code execution pipeline', id: 'Pipeline eksekusi kode AI terisolasi Docker' }, state: 'implemented' },
      { label: { en: 'Streaming SSE AI chat with OpenAI-compatible providers', id: 'Chat AI streaming SSE kompatibel OpenAI' }, state: 'implemented' },
      { label: { en: 'Hosted Firebase & Cloud Run multi-tenant deployment', id: 'Deployment cloud multi-tenant Firebase & Cloud Run' }, state: 'planned' },
    ],
    featuresNote: {
      en: 'Core API, web workspace, multi-agent planning, GitHub PR pipeline, and automated tests are implemented in the public repository. Managed Firebase / Cloud Run hosting is planned next.',
      id: 'API inti, workspace web, perencanaan multi-agen, pipeline PR GitHub, dan tes otomatis sudah diimplementasikan di repositori publik. Hosting terkelola Firebase / Cloud Run direncanakan berikutnya.',
    },
    stack: ['TypeScript', 'React 18', 'Express', 'Node.js SQLite', 'Zod', 'Docker', 'GitHub API', 'LLM APIs'],
    image: '/projects/devflow-ai.svg',
    imageAlt: {
      en: 'DevFlow AI architecture schematic showing repository context, agent workflow engine, pull request review gate, execution workers, and persistence',
      id: 'Diagram arsitektur DevFlow AI yang menampilkan konteks repositori, mesin orkestrasi agen, gerbang ulasan PR, worker eksekusi, dan penyimpanan',
    },
    links: { repo: 'https://github.com/eka0789/devflow-ai' },
  },
  {
    slug: 'industrialvision-ai',
    name: 'IndustrialVision AI',
    categories: ['ai', 'saas', 'web'],
    categoryLabel: { en: 'Computer Vision / AI / FastAPI', id: 'Computer Vision / AI / FastAPI' },
    status: 'in-development',
    featured: true,
    summary: {
      en: 'A computer-vision visual inspection platform for manufacturing quality control integrating model management, real-time WebSocket feeds, operator workflows, and evidence logging.',
      id: 'Platform inspeksi visual berbasis computer vision untuk kendali mutu manufaktur yang mengintegrasikan manajemen model, feed WebSocket real-time, alur operator, dan pencatatan bukti.',
    },
    problem: {
      en: 'Manufacturing quality teams need traceable visual inspection decisions where every pass, fail, or review flag carries clear model rationale and audit evidence.',
      id: 'Tim mutu manufaktur membutuhkan keputusan inspeksi visual yang dapat ditelusuri, di mana setiap status pass, fail, atau review disertai alasan model dan bukti audit yang jelas.',
    },
    solution: {
      en: 'A full-stack inspection platform pairing a Python 3.13 / FastAPI inference and model registry backend with a role-aware React 19 + TypeScript console streaming live inspection events over WebSockets.',
      id: 'Platform inspeksi full-stack yang memadukan backend FastAPI Python 3.13 untuk inferensi dan registri model dengan konsol React 19 + TypeScript berbasis peran yang mengalirkan event inspeksi via WebSocket.',
    },
    contribution: {
      en: 'Full-stack architecture across FastAPI REST/WebSocket APIs, PostgreSQL 16 / SQLite persistence, model registry, WCAG 2.1 AA operator console, Docker Compose stack, and contract/integration testing.',
      id: 'Arsitektur full-stack mencakup API REST/WebSocket FastAPI, persistensi PostgreSQL 16 / SQLite, registri model, konsol operator WCAG 2.1 AA, Docker Compose, serta pengujian kontrak dan integrasi.',
    },
    highlights: {
      en: [
        'FastAPI Python 3.13 REST & WebSocket backend',
        'React 19 + TypeScript operator QC console',
        'Structured inspection outcomes (PASS/FAIL/REVIEW/ERROR)',
        'Camera station fleet & AI model version registry',
        'PostgreSQL 16 / SQLite evidence audit logging',
        'Docker Compose stack with automated API/UI tests',
      ],
      id: [
        'Backend REST & WebSocket FastAPI Python 3.13',
        'Konsol QC operator React 19 + TypeScript',
        'Keputusan inspeksi terstruktur (PASS/FAIL/REVIEW/ERROR)',
        'Manajemen stasiun kamera & registri versi model AI',
        'Pencatatan bukti audit PostgreSQL 16 / SQLite',
        'Stack Docker Compose dengan pengujian API/UI otomatis',
      ],
    },
    stack: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Docker Compose'],
    image: '/projects/industrialvision-ai.svg',
    imageAlt: {
      en: 'IndustrialVision AI architecture diagram connecting station image capture, FastAPI Python vision inference and model registry, live WebSocket feed, React 19 operator console, and PostgreSQL evidence logging',
      id: 'Diagram arsitektur IndustrialVision AI yang menghubungkan pengambilan gambar stasiun, inferensi visi FastAPI Python dan registri model, feed WebSocket real-time, konsol React 19, dan log bukti PostgreSQL',
    },
    links: { repo: 'https://github.com/eka0789/industrialvision-ai-platform' },
  },
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
    status: 'in-development',
    summary: {
      en: 'A bilingual Flutter and Firebase smartphone companion unifying hybrid on-device/cloud AI commands, tasks, Kanban boards, hierarchical notes, and habit tracking.',
      id: 'Aplikasi pendamping smartphone bilingual berbasis Flutter dan Firebase yang menyatukan perintah AI hibrida (lokal/cloud), tugas, papan Kanban, catatan bertingkat, dan pelacak kebiasaan.',
    },
    problem: {
      en: 'Everyday personal tasks, notes, reminders, and habits are scattered across separate apps, adding friction to simple daily actions.',
      id: 'Tugas harian, catatan, pengingat, dan kebiasaan tersebar di banyak aplikasi terpisah sehingga menambah hambatan untuk aktivitas sederhana.',
    },
    solution: {
      en: 'A Flutter Android app with a hybrid AI assistant that executes natural commands offline on-device and optionally connects to Gemini Cloud AI, paired with Kanban tasks, sub-page notes, and Firestore rules.',
      id: 'Aplikasi Android Flutter dengan asisten AI hibrida yang mengeksekusi perintah natural secara offline di perangkat dan opsional terhubung ke Gemini Cloud AI, dilengkapi tugas Kanban, catatan sub-halaman, dan aturan Firestore.',
    },
    contribution: {
      en: 'Full Flutter application architecture, hybrid offline/Gemini AI command router, notification rescheduling, hierarchical markdown notes, and Firebase Firestore rules.',
      id: 'Arsitektur aplikasi Flutter menyeluruh, router perintah AI hibrida offline/Gemini, penjadwalan ulang notifikasi, catatan markdown bertingkat, dan aturan keamanan Firestore.',
    },
    highlights: {
      en: [
        'Hybrid offline on-device + optional Gemini Cloud AI',
        'Tasks with list/Kanban board view & reminders',
        'Hierarchical sub-page notes & markdown checklists',
        'Habit tracker & bilingual EN/ID mobile UX',
        'Flutter + Firebase Firestore security rules',
      ],
      id: [
        'AI hibrida offline di perangkat + opsional Gemini Cloud',
        'Tugas dengan tampilan list/Kanban & pengingat otomatis',
        'Catatan sub-halaman bertingkat & checklist markdown',
        'Pelacak kebiasaan & antarmuka mobile bilingual EN/ID',
        'Flutter + aturan keamanan Firebase Firestore',
      ],
    },
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Gemini API'],
    image: '/projects/nara.svg',
    imageAlt: {
      en: 'NARA architecture diagram connecting Flutter voice and text input through a hybrid intent router to fast on-device actions and cloud LLM orchestration',
      id: 'Diagram arsitektur NARA yang menghubungkan input suara dan teks Flutter melalui router intent hibrida ke eksekusi lokal dan orkestrasi LLM cloud',
    },
    links: { repo: 'https://github.com/eka0789/NARA' },
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
    links: {
      live: 'https://ruangkumpul.my.id/',
      repo: 'https://github.com/eka0789/ruangkumpul',
    },
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
  {
    slug: 'aktifkoding',
    name: 'AktifKoding',
    categories: ['devtools', 'web'],
    categoryLabel: { en: 'Developer Tools / Web Platform', id: 'Developer Tools / Platform Web' },
    status: 'in-development',
    summary: {
      en: 'A developer-focused platform bringing software development tools, resources, and productivity utilities into one place.',
      id: 'Platform untuk developer yang menghadirkan alat pengembangan, sumber belajar, dan utilitas produktivitas dalam satu tempat.',
    },
    problem: {
      en: 'Developers spend time hunting for reliable tools and resources spread across many websites.',
      id: 'Developer menghabiskan waktu mencari alat dan sumber daya yang andal yang tersebar di banyak situs.',
    },
    solution: {
      en: 'A curated directory and utility hub for developers, built on Next.js and Supabase with room for community-oriented features.',
      id: 'Direktori dan pusat utilitas yang dikurasi untuk developer, dibangun dengan Next.js dan Supabase dan siap untuk fitur berbasis komunitas.',
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
    links: {
      live: 'https://www.aktifkoding.biz.id/',
      repo: 'https://github.com/eka0789/alltools',
    },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export const featuredProjects = projects.filter((project) => project.featured)
