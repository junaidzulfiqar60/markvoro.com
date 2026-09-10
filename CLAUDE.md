# CLAUDE.md

This file gives Claude Code guidance for working in this repository.

## Project

MARKVORO — a marketing website and admin backend for a digital marketing,
web development and AI automation agency. Premium dark UI with a multicolor
gradient system inspired by the MARKVORO logo (blue, cyan, green, purple,
pink, orange).

The site has a full backend: PostgreSQL via Prisma, a custom JWT-based admin
auth system, an admin dashboard for managing leads/inquiries/content, Resend
for transactional email, and Cloudinary for image uploads. See
[README.md](README.md) for full setup and API documentation.

## Tech Stack

- Framework: Next.js 14 (App Router) + React 18 + TypeScript
- Styling: Tailwind CSS (custom `brand` color palette + gradient utilities in `app/globals.css`)
- Animation: Framer Motion
- Icons: Lucide React
- Database: PostgreSQL via Prisma ORM
- Auth: custom JWT (bcryptjs + jose) via `middleware.ts` + httpOnly cookie — not NextAuth
- Validation: Zod
- Email: Resend
- File uploads: Cloudinary
- Charts (admin dashboard): Recharts
- Package manager: npm

## Commands

```bash
# install dependencies
npm install

# database
npx prisma migrate dev   # apply schema changes locally
npx prisma db seed       # seed the first admin user + sample services
npx prisma studio        # browse the database

# run dev server
npm run dev

# build for production
npm run build
npm run start

# lint
npm run lint
```

## Structure

- `app/page.tsx` — assembles all homepage sections; fetches Services/Portfolio/Testimonials/Blog from the DB (falls back to `lib/data.ts`/`lib/blogData.ts` static arrays if a table is empty).
- `app/layout.tsx` — fonts (Inter/Sora), metadata, global CSS import.
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` — public blog listing + article pages (DB-backed via `lib/content.ts`, static fallback in `lib/blogData.ts`).
- `app/api/` — public API routes (`contact`, `service-inquiry`, `ai-inquiry`, `newsletter/*`, `services`, `portfolio`, `testimonials`, `blog`) and `app/api/admin/` (auth + CRUD, all behind `requireAdmin`).
- `app/admin/login/` — public admin login page.
- `app/admin/(dashboard)/` — authenticated admin dashboard route group (overview, leads, ai-inquiries, service-inquiries, portfolio, testimonials, services, blog, newsletter, settings).
- `middleware.ts` — guards `/admin/*` and `/api/admin/*` (except `/admin/login`).
- `components/layout/` — `Navbar.tsx`, `Footer.tsx`.
- `components/sections/` — one component per homepage section (Hero, Services, AIAgents, Process, BlogPreview, Contact, etc.).
- `components/ui/` — reusable primitives (`Button`, `Modal`, `SectionHeading`, `ServiceCard`, `AgentCard`, `Counter`, `Reveal`, `GlowBackground`).
- `components/blog/` — `BlogCard.tsx` (listing/preview card), `BlogContent.tsx` (renders the plain-text article body — blank line = paragraph, `## ` prefix = subheading; no markdown library, no `dangerouslySetInnerHTML`).
- `components/forms/` — public inquiry modals (`AIAgentInquiryModal`, `ServiceInquiryModal`).
- `components/admin/` — admin dashboard building blocks (`AdminShell`, `DataTable`, `FilterBar`, `StatusBadge`, `ConfirmDialog`, `StatCard`, `MonthlyChart`, `ImageUploader`).
- `lib/data.ts` — static fallback site copy (services, AI agents, testimonials, FAQ, contact info, nav links). Prefer editing here for content not yet migrated to the DB.
- `lib/blogData.ts` — static fallback blog articles, same role as `lib/data.ts` but for `/blog`.
- `lib/content.ts` — DB-backed content getters (`getServices`, `getPortfolioProjects`, `getTestimonials`, `getBlogPosts`, `getBlogPost`), each falling back to the static arrays above when its table is empty/unreachable.
- `lib/auth.ts` / `lib/auth-server.ts` — session signing/verification (Edge-safe core + Node-only server helpers, split because `middleware.ts` runs on the Edge runtime and can't use bcrypt or `next/headers`).
- `lib/prisma.ts`, `lib/validations.ts`, `lib/email.ts`, `lib/emailTemplates.ts`, `lib/cloudinary.ts`, `lib/rateLimit.ts`, `lib/iconMap.ts`, `lib/seo.ts` — backend/SEO infrastructure.
- `prisma/schema.prisma`, `prisma/seed.ts` — database schema and seed script.
- `public/logo.jpeg` — MARKVORO logo, used in Navbar, Footer, and the admin login/sidebar.

See [README.md](README.md) for the full content-editing map and API reference.

## Conventions

- Public form submissions are validated with Zod (`lib/validations.ts`) on both client and server; API routes never leak raw DB errors to the client.
- Content lives in `lib/data.ts` as a static fallback — `services`, `webProjects` (portfolio) and `testimonials` are DB-backed and admin-editable via `/admin/*`; the homepage falls back to `lib/data.ts` only when the corresponding table is empty.
- Section components live in `components/sections/`, one file per homepage section, composed in `app/page.tsx`.
- Reusable visual primitives (cards, headings, buttons, scroll-reveal wrapper, modal) live in `components/ui/` — reuse them instead of duplicating markup.
- Brand colors/gradients/animations are centralized in `tailwind.config.ts` (`colors.brand`, `backgroundImage`, `keyframes`) and `app/globals.css` (`.text-gradient`, `.glass`, `.gradient-border`, `.btn-primary`/`.btn-secondary`/`.btn-green`). The admin dashboard reuses these same tokens rather than a generic admin template.
- Prisma enum `@map()` only renames the DB storage label, not the JS-side value — `lib/validations.ts` exports `*_TO_ENUM`/`*_FROM_ENUM` lookup maps to bridge human-readable labels (used in Zod schemas/UI) and actual Prisma enum keys. Always go through these maps when writing/reading `category`/`agentType` fields.

## Notes

- Backend added 2026-09-03 (Postgres/Prisma, custom JWT admin auth, Resend email, Cloudinary uploads) — see README for full architecture and API reference.
- Don't add further unrequested backend systems (new auth providers, DB providers, third-party integrations) without being explicitly asked.
- Full build initialized 2026-09-02.
