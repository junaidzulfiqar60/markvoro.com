# Brand & business profile

Source of truth for facts every skill should use instead of guessing. If a
skill needs a fact not listed here, ask the user rather than inventing it.

## Identity

- **Brand:** MARKVORO
- **Business:** Digital marketing, web development, and AI automation agency
- **Website:** https://www.markvoro.com (`SITE_URL` in `../lib/seo.ts`)
- **Positioning:** Premium, dark-UI, sci-fi/agentic-HUD aesthetic — helping
  ambitious businesses grow through strategy, creativity, and intelligent
  technology (per `organizationJsonLd()` description in `../lib/seo.ts`).
- **Brand colors:** multicolor gradient system — blue, cyan, green, purple,
  pink, orange (see `../tailwind.config.ts` `colors.brand`).

## Core services

- SEO
- Digital Marketing
- Social Media Marketing
- Email Marketing
- Website Development
- AI Agents
- AI Automation

These map to the DB-backed/static service list in `../lib/data.ts` and
`getServices()` — check there for current names/slugs/descriptions before
writing copy, don't restate this list verbatim as page content.

## Markets

- **Primary:** Pakistan (`areaServed: "PK"` in `organizationJsonLd()`)
- **Secondary:** International

Keyword research and content should serve Pakistan-specific intent first;
international queries are a secondary lens, not the default.

## Contact / NAP (see `../lib/seo.ts`)

- Email: `markvoro08@gmail.com`
- Phone: `+92-318-4340349`
- Socials: Instagram (`markvoro610`), Facebook, TikTok (`markvoro.digital`)
- **No street address in the codebase yet** — don't fabricate one; see
  [local-seo](../skills/local-seo/SKILL.md).

## Voice

Confident, technical, benefit-led — MARKVORO sells outcomes (growth, leads,
automation ROI) to business owners/marketing leads, not generic "we do SEO"
copy. Prefer concrete, MARKVORO-specific examples (real portfolio work in
`../lib/data.ts`'s `webProjects`) over generic industry filler.
