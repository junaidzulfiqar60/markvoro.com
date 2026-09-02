# CLAUDE.md

This file gives Claude Code guidance for working in this repository.

## Project

MARKVORO — a frontend-only marketing website for a digital marketing, web
development and AI automation agency. Premium dark UI with a multicolor
gradient system inspired by the MARKVORO logo (blue, cyan, green, purple,
pink, orange).

There is intentionally no backend, database, auth, or payment integration.
The contact form is client-side only (validation + success state, no
submission).

## Tech Stack

- Framework: Next.js 14 (App Router) + React 18 + TypeScript
- Styling: Tailwind CSS (custom `brand` color palette + gradient utilities in `app/globals.css`)
- Animation: Framer Motion
- Icons: Lucide React
- Package manager: npm

## Commands

```bash
# install dependencies
npm install

# run dev server
npm run dev

# build for production
npm run build
npm run start

# lint
npm run lint
```

## Structure

- `app/page.tsx` — assembles all homepage sections in order.
- `app/layout.tsx` — fonts (Inter/Sora), metadata, global CSS import.
- `components/layout/` — `Navbar.tsx`, `Footer.tsx`.
- `components/sections/` — one component per homepage section (Hero, Services, AIAgents, Process, Contact, etc.).
- `components/ui/` — reusable primitives (`Button`, `SectionHeading`, `ServiceCard`, `AgentCard`, `Counter`, `Reveal`, `GlowBackground`).
- `lib/data.ts` — nearly all site copy (services, AI agents, testimonials, FAQ, contact info, nav links). Prefer editing here over hardcoding text in components.
- `public/logo.jpeg` — MARKVORO logo, used in Navbar and Footer.

See [README.md](README.md) for the full content-editing map (which field in `lib/data.ts` maps to which section).

## Conventions

- Content lives in `lib/data.ts`, not inline in components — new copy/services/agents should be added there and mapped through existing card components.
- Section components live in `components/sections/`, one file per homepage section, composed in `app/page.tsx`.
- Reusable visual primitives (cards, headings, buttons, scroll-reveal wrapper) live in `components/ui/` — reuse them instead of duplicating markup.
- Brand colors/gradients/animations are centralized in `tailwind.config.ts` (`colors.brand`, `backgroundImage`, `keyframes`) and `app/globals.css` (`.text-gradient`, `.glass`, `.gradient-border`, `.btn-primary`/`.btn-secondary`).
- Placeholder content (testimonials, showcase projects, stats) is clearly commented in `lib/data.ts` and the README — do not present it as real client data.

## Notes

- Frontend-only by design — do not add a backend/API/database unless explicitly asked.
- Full build initialized 2026-09-02.
