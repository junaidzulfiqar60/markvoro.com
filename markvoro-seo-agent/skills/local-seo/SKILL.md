---
name: local-seo
description: Improve local/regional search visibility for MARKVORO, a Pakistan-based agency — NAP consistency, Google Business Profile, local schema, and local keyword targeting.
---

# Local SEO

## When to use

As part of `full-audit`, or standalone when targeting Pakistan-specific
search terms (e.g. "digital marketing agency Lahore/Karachi/Islamabad").

## Ground truth (don't deviate from these without the user confirming a change)

From `../../lib/seo.ts`'s `organizationJsonLd()`:

- Email: `markvoro08@gmail.com`
- Phone: `+92-318-4340349`
- Area served: `PK` (Pakistan)
- Socials: Instagram (`markvoro610`), Facebook, TikTok (`markvoro.digital`)
- **No street address exists in the codebase.** The existing code comment
  in `lib/seo.ts` explicitly says not to fabricate one. This blocks a full
  `LocalBusiness` schema (which expects a `PostalAddress`) — flag this as a
  gap, ask the user for a real, verifiable address before adding one,
  never invent a placeholder.

## Checklist

- **NAP consistency** — Name/Address/Phone identical everywhere it appears
  (site footer, schema, any directory listings the user has). Since there's
  no address yet, this reduces to name + phone + email consistency for now.
- **Google Business Profile** — this agent has no API access to GBP; if
  the user has a profile, ask them to export/share current data rather
  than guessing at its state.
- **Local schema** — once a verified address exists, extend
  `organizationJsonLd()` in `../../lib/seo.ts` with `address`/`geo` (see
  the [schema](../schema/SKILL.md) skill) rather than creating a separate
  ad-hoc schema block.
- **Local keyword targeting** — city/region modifiers on service pages
  where it's natural (not stuffed), informed by `keyword-research` output
  filtered to geo-modified queries.

## Output

`../../data/audits/<date>-local.md` — gaps found (Issue Format from
[../../config/seo-rules.md](../../config/seo-rules.md)), and what's blocked
pending real business data from the user.
