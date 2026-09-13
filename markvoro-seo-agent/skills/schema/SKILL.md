---
name: schema
description: Design, validate, and extend JSON-LD structured data for MARKVORO pages, built on the helpers in lib/seo.ts.
---

# Schema

## When to use

As part of `full-audit` step 7, or whenever a new page type needs
structured data.

## Existing helpers — reuse these, don't duplicate

`../../lib/seo.ts` already exports:

- `organizationJsonLd()` — sitewide `Organization`, referenced by everything
  else via `@id`.
- `websiteJsonLd()` — `WebSite`.
- `breadcrumbJsonLd(items)` — `BreadcrumbList`.
- `faqJsonLd(items)` — `FAQPage`.
- `blogPostingJsonLd(options)` / `blogJsonLd()` — blog schema.
- `serviceJsonLd(options)` — `Service`.

A new schema need should extend this file with a new function following
the same pattern (real data in, `@id` references to `organizationJsonLd()`
where applicable), not a one-off JSON-LD block inlined in a page component.

## Checklist

- Every page that should emit schema does (services → `Service`, blog
  posts → `BlogPosting`, pages with real Q&A content → `FAQPage`,
  non-homepage pages → `BreadcrumbList`).
- No fabricated fields — `AggregateRating`/`Review` schema requires real
  reviews (see [../../config/guardrails.md](../../config/guardrails.md):
  never create fake reviews), `LocalBusiness`/address requires a verified
  address (see [local-seo](../local-seo/SKILL.md) — none exists yet).
- Validate shape against schema.org's spec for that type before proposing
  it (this agent has no Rich Results Test API access — check structurally,
  and tell the user to spot-check in Google's Rich Results Test before
  shipping).

## Output

`../../data/audits/<date>-schema.md` — gaps/fixes in the Issue Format from
[../../config/seo-rules.md](../../config/seo-rules.md), each with the
actual proposed addition to `../../lib/seo.ts` (not just "add FAQ schema").
Implementation follows the "Code changes" procedure in
[../../config/guardrails.md](../../config/guardrails.md).
