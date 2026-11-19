# Eka Prasetyo Personal Portfolio

Personal engineering portfolio for **Eka Prasetyo** (AI Engineer & Full-Stack Developer, Indonesia), built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Motion, and Shiki.

## Architecture

- **Bilingual App Router (`/[locale]`)**: English (`en`, default) and Indonesian (`id`) with locale persistence via `NEXT_LOCALE` cookie and `proxy.ts` redirect handling.
- **Server-First Components**: Pages and content sections render on the server; client components are limited to interactive controls (navigation drawer, theme toggle, language switcher, discipline ticker pause/play, project category filter, and contact form).
- **Centralized Content Data (`content/`)**: Projects, skills, experience, achievements, articles, and site settings live in typed TypeScript modules so content updates require no layout changes and can later migrate to Supabase or a CMS.
- **Architectural Visuals (`public/projects/*.svg`)**: Self-hosted 1600x1000 vector schematics depicting each system's architecture without external CDN dependencies.
- **Contact Endpoint (`app/api/contact/route.ts`)**: Server-side payload validation, honeypot + fill-time spam filtering, bounded in-memory IP rate limiting, HTTPS endpoint validation, and honest `503 not-configured` reporting when `CONTACT_FORM_ENDPOINT` is unset.

## Routes

- `/[locale]` (Home)
- `/[locale]/about`
- `/[locale]/skills`
- `/[locale]/projects` and `/[locale]/projects/[slug]`
- `/[locale]/experience`
- `/[locale]/achievements`
- `/[locale]/insights` and `/[locale]/insights/[slug]`
- `/[locale]/contact`
- `/[locale]/resume` (printable summary / PDF export)
- `/sitemap.xml` and `/robots.txt`

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
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public (optional) | Displays a direct email link on Contact, Footer, and Resume |
| `NEXT_PUBLIC_RESUME_FILE` | Public (optional) | Static file path in `/public` for direct download instead of `/resume` |
| `CONTACT_FORM_ENDPOINT` | Server-only (optional) | HTTPS endpoint that receives validated contact form submissions |

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the repository in Vercel (Next.js preset is detected automatically).
3. Configure environment variables (`NEXT_PUBLIC_SITE_URL`, and optionally `CONTACT_FORM_ENDPOINT`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_RESUME_FILE`).
4. Deploy. Production builds run `next build` with strict TypeScript verification enabled.
