# Eka Prasetyo Personal Portfolio

Personal engineering portfolio for **Eka Prasetyo** (AI Engineer & Full-Stack Developer, Indonesia), built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Motion, and Shiki.

## Key Engineering Highlights

- **Bilingual App Router (`/[locale]`)**: English (`en`, default) and Indonesian (`id`) with locale persistence via `NEXT_LOCALE` cookie and `proxy.ts` redirect handling.
- **Grounded Portfolio Explorer (`app/api/assistant/route.ts` + `lib/assistant.ts`)**: Recruiter & engineering Q&A grounded strictly in verified portfolio records, with prompt-injection defense, clickable citations, and an inspectable retrieval trace. Runs out of the box via deterministic grounded retrieval and optionally upgrades to LLM RAG synthesis when `GEMINI_API_KEY` or `OPENAI_API_KEY` is configured on the server.
- **Dynamic Open Graph Previews (`next/og`)**: Automatic `1200x630` PNG social preview cards for localized pages and every project case study.
- **Centralized Content Data (`content/`)**: Projects, skills, experience, verified achievements with certificate evidence links, bilingual technical articles (AI Engineering & Backend/Database), and site config live in typed TypeScript modules.
- **Hardened Contact Endpoint (`app/api/contact/route.ts`)**: Server-side validation, monotonic duration anti-spam check, non-autofill honeypot, bounded IP rate limiting, HTTPS endpoint validation, and dynamic runtime configuration detection.

## Routes

- `/[locale]` (Home + Grounded Portfolio Explorer)
- `/[locale]/about`
- `/[locale]/skills`
- `/[locale]/projects` and `/[locale]/projects/[slug]`
- `/[locale]/experience`
- `/[locale]/achievements`
- `/[locale]/insights` and `/[locale]/insights/[slug]`
- `/[locale]/contact`
- `/[locale]/resume` (printable summary / PDF export)
- `/api/contact`, `/api/assistant`, `/sitemap.xml`, and `/robots.txt`

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Quality Checks

```bash
pnpm run typecheck
pnpm test
pnpm build
```

## Environment Variables

See `.env.example` for all supported variables:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical domain for SEO metadata, `sitemap.xml`, and `robots.txt` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public (optional) | Displays email with 1-click copy on Contact, plus Footer & Resume |
| `NEXT_PUBLIC_CALENDAR_URL` | Public (optional) | Displays direct call booking card (e.g. Cal.com) on Contact |
| `NEXT_PUBLIC_RESUME_FILE` | Public (optional) | Static file path in `/public` for direct download instead of `/resume` |
| `CONTACT_FORM_ENDPOINT` | Server-only | HTTPS endpoint (e.g. Formspree) receiving validated contact submissions |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | Server-only (optional) | Upgrades `/api/assistant` to LLM-synthesized RAG with automatic fallback |

## Deployment (Vercel)

1. Push to `main` on GitHub (`ekajadikaya89-glitch/myportfolio`).
2. Import in Vercel and configure environment variables in Project Settings -> Environment Variables.
3. Deploy. Strict TypeScript checks run on every production build.
