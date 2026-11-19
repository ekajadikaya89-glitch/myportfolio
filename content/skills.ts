import type { Localized, SkillGroup } from '@/types/content'

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    icon: 'ai',
    title: { en: 'AI Engineering', id: 'AI Engineering' },
    description: {
      en: 'LLM integrations with retrieval, structured outputs, agent workflows, and validation guardrails.',
      id: 'Integrasi LLM dengan retrieval, structured output, alur agen, dan guardrail validasi.',
    },
    items: [
      { name: 'LLM Integration' },
      { name: 'Prompt Engineering' },
      { name: 'RAG' },
      { name: 'AI Agents' },
      { name: 'LangChain' },
      { name: 'LangGraph' },
      { name: 'Embeddings' },
      { name: 'Vector Databases' },
      { name: 'AI API Integration' },
      { name: 'Workflow Automation' },
    ],
  },
  {
    id: 'backend',
    icon: 'server',
    title: { en: 'Backend Engineering', id: 'Backend Engineering' },
    description: {
      en: 'APIs and services with validated inputs, explicit module boundaries, and consistent error handling.',
      id: 'API dan layanan dengan validasi input, batas modul yang jelas, dan penanganan error yang konsisten.',
    },
    items: [
      { name: 'Laravel' },
      { name: 'FastAPI' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Go' },
      { name: 'Gin' },
      { name: 'Echo' },
      { name: 'Fiber' },
      { name: 'REST API' },
      { name: 'WebSockets' },
    ],
  },
  {
    id: 'frontend',
    icon: 'layout',
    title: { en: 'Frontend Engineering', id: 'Frontend Engineering' },
    description: {
      en: 'Component-driven, accessible, and responsive web applications built for real usage.',
      id: 'Aplikasi web berbasis komponen yang aksesibel dan responsif untuk penggunaan nyata.',
    },
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Responsive UI' },
      { name: 'Component Architecture' },
    ],
  },
  {
    id: 'languages',
    icon: 'code',
    title: { en: 'Programming Languages', id: 'Bahasa Pemrograman' },
    description: {
      en: 'Core languages used across web platforms, backend services, mobile apps, and AI tooling.',
      id: 'Bahasa utama yang digunakan untuk platform web, layanan backend, aplikasi mobile, dan AI.',
    },
    items: [
      { name: 'PHP' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Dart' },
      { name: 'Python' },
      { name: 'Go' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'mobile',
    icon: 'smartphone',
    title: { en: 'Mobile Development', id: 'Pengembangan Mobile' },
    description: {
      en: 'Cross-platform Flutter applications with Firebase services and native device integrations.',
      id: 'Aplikasi Flutter lintas platform dengan layanan Firebase dan integrasi perangkat native.',
    },
    items: [
      { name: 'Flutter' },
      { name: 'Dart' },
      { name: 'Firebase' },
      { name: 'Android Development' },
      { name: 'State Management' },
      { name: 'Native Integrations' },
    ],
  },
  {
    id: 'databases',
    icon: 'database',
    title: { en: 'Databases', id: 'Basis Data' },
    description: {
      en: 'Relational and document stores modeled for ACID integrity, indexing, and predictable queries.',
      id: 'Basis data relasional dan dokumen yang dimodelkan untuk integritas ACID, indexing, dan performa query.',
    },
    items: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQL Server' },
      { name: 'MongoDB' },
      { name: 'Firebase Firestore' },
      { name: 'Supabase' },
      { name: 'Redis' },
    ],
  },
  {
    id: 'messaging',
    icon: 'workflow',
    title: { en: 'Messaging & Distributed Systems', id: 'Messaging & Sistem Terdistribusi' },
    description: {
      en: 'Asynchronous processing, queues, and event-driven communication between services.',
      id: 'Pemrosesan asinkron, antrean, dan komunikasi berbasis event antar layanan.',
    },
    items: [
      { name: 'RabbitMQ' },
      { name: 'Apache Kafka' },
      { name: 'Redis' },
      { name: 'MQTT' },
      { name: 'Event-Driven Architecture' },
      { name: 'Background Jobs' },
    ],
  },
  {
    id: 'devops',
    icon: 'cloud',
    title: { en: 'Infrastructure & DevOps', id: 'Infrastruktur & DevOps' },
    description: {
      en: 'Containerized deployments and automated delivery pipelines from commit to production.',
      id: 'Deployment berbasis container dan pipeline delivery otomatis dari commit hingga produksi.',
    },
    items: [
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'Linux' },
      { name: 'Nginx' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD' },
      { name: 'Vercel' },
      { name: 'Firebase' },
      { name: 'Cloud Deployment' },
    ],
  },
  {
    id: 'practices',
    icon: 'shield',
    title: { en: 'Engineering Practices', id: 'Praktik Engineering' },
    description: {
      en: 'Disciplines that keep production codebases secure, testable, and maintainable.',
      id: 'Praktik yang menjaga basis kode produksi tetap aman, teruji, dan mudah dirawat.',
    },
    items: [
      { name: 'Clean Architecture' },
      { name: 'SOLID Principles' },
      { name: 'Domain-Driven Design' },
      { name: 'Design Patterns' },
      { name: 'Database Optimization' },
      { name: 'API Design' },
      { name: 'Automated Testing' },
      { name: 'Secure Coding' },
      { name: 'System Design' },
    ],
  },
]

export const expertiseAreas: {
  id: string
  tier: 'lead' | 'supporting'
  icon: string
  title: Localized
  description: Localized
  deliverables: Localized<string[]>
  cta: Localized
  href: string
}[] = [
  {
    id: 'ai',
    tier: 'lead',
    icon: 'ai',
    title: { en: 'AI Engineering', id: 'AI Engineering' },
    description: {
      en: 'LLM integration, retrieval-augmented generation, structured outputs, agent orchestration, and workflow automation with explicit guardrails.',
      id: 'Integrasi LLM, retrieval-augmented generation, structured output, orkestrasi agen, dan otomasi alur kerja dengan guardrail yang jelas.',
    },
    deliverables: {
      en: ['Provider-agnostic LLM wrappers', 'RAG indexing & retrieval pipelines', 'LangGraph stateful agent workflows'],
      id: ['Abstraksi provider LLM yang fleksibel', 'Pipeline indexing & retrieval RAG', 'Alur kerja agen berbasis graf LangGraph'],
    },
    cta: { en: 'Inspect AI stack', id: 'Lihat stack AI' },
    href: '/skills#ai',
  },
  {
    id: 'fullstack',
    tier: 'lead',
    icon: 'layers',
    title: { en: 'Full-Stack Development', id: 'Full-Stack Development' },
    description: {
      en: 'Web applications, backend APIs, SaaS products, and enterprise inventory systems engineered from schema design to deployment.',
      id: 'Aplikasi web, API backend, produk SaaS, dan sistem inventaris enterprise yang dibangun dari desain skema hingga deployment.',
    },
    deliverables: {
      en: ['Next.js & TypeScript interfaces', 'Laravel, FastAPI & Go REST services', 'Transactional ERP & warehouse flows'],
      id: ['Antarmuka Next.js & TypeScript', 'Layanan REST Laravel, FastAPI & Go', 'Alur ERP & gudang transaksional'],
    },
    cta: { en: 'Inspect full-stack tools', id: 'Lihat stack full-stack' },
    href: '/skills#backend',
  },
  {
    id: 'mobile',
    tier: 'supporting',
    icon: 'smartphone',
    title: { en: 'Mobile Engineering', id: 'Mobile Engineering' },
    description: {
      en: 'Flutter applications, Firebase backends, BLE hardware communication, and maintainable feature-first mobile architecture.',
      id: 'Aplikasi Flutter, backend Firebase, komunikasi perangkat BLE, dan arsitektur mobile yang mudah dirawat.',
    },
    deliverables: {
      en: ['Cross-platform Flutter & Dart', 'BLE & real-time telemetry sync'],
      id: ['Flutter & Dart lintas platform', 'Sinkronisasi BLE & telemetri real-time'],
    },
    cta: { en: 'Inspect mobile stack', id: 'Lihat stack mobile' },
    href: '/skills#mobile',
  },
  {
    id: 'architecture',
    tier: 'supporting',
    icon: 'network',
    title: { en: 'Software Architecture', id: 'Arsitektur Perangkat Lunak' },
    description: {
      en: 'System design, database transaction integrity, asynchronous messaging with RabbitMQ and Kafka, Dockerized infrastructure, and CI/CD.',
      id: 'Desain sistem, integritas transaksi basis data, messaging asinkron dengan RabbitMQ dan Kafka, infrastruktur Docker, dan CI/CD.',
    },
    deliverables: {
      en: ['ACID inventory & ledger modeling', 'Docker, Nginx & GitHub Actions'],
      id: ['Pemodelan inventaris & ledger ACID', 'Docker, Nginx & GitHub Actions'],
    },
    cta: { en: 'Inspect infrastructure stack', id: 'Lihat stack infrastruktur' },
    href: '/skills#messaging',
  },
]

export const professionalInterests: Localized<string[]> = {
  en: [
    'Artificial Intelligence',
    'Large Language Models',
    'Software Architecture',
    'Distributed Systems',
    'SaaS Product Development',
    'Enterprise Software',
    'Mobile Applications',
    'Developer Tools',
    'Cloud Infrastructure',
    'Technical Education',
  ],
  id: [
    'Kecerdasan Buatan',
    'Large Language Models',
    'Arsitektur Perangkat Lunak',
    'Sistem Terdistribusi',
    'Pengembangan Produk SaaS',
    'Perangkat Lunak Enterprise',
    'Aplikasi Mobile',
    'Developer Tools',
    'Infrastruktur Cloud',
    'Edukasi Teknis',
  ],
}

export const education = {
  gpa: '3.72 / 4.00',
}
