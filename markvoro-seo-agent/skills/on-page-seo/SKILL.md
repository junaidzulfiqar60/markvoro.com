---
name: on-page-seo
description: Optimize title tags, meta descriptions, headings, URL slugs, image alt text, and keyword placement on individual MARKVORO pages.
---

# On-Page SEO

## When to use

As part of `optimize-page` or `full-audit`, for a specific page or set of
pages (homepage sections in `../../app/page.tsx`, service pages, blog posts
in `../../app/blog/[slug]/page.tsx`).

## Checklist (limits from `../../config/seo-rules.md`)

- **Title tag** — one per page, within the length rule, includes the
  primary keyword near the front, matches what's in page `metadata` exports.
- **Meta description** — one per page, within the length rule, written as
  a pitch a human would click, not a keyword list.
- **Headings** — exactly one `<h1>`; logical `h2`/`h3` nesting; headings
  describe content, don't just repeat the title.
- **URL slug** — lowercase, hyphenated, short, matches the primary keyword
  for that page; never change a live slug without a redirect plan (that's a
  `technical-seo` concern too).
- **Image alt text** — every non-decorative `<img>` (including in
  `components/blog/BlogContent.tsx` output) has descriptive alt text; no
  keyword stuffing.
- **Keyword placement** — primary keyword appears naturally in the title,
  first paragraph, and at least one heading; no unnatural repetition.

## Method

1. Take the target page(s) from the calling workflow (or the
   `keyword-research` output for keyword→page mapping).
2. Read the page's current metadata/content from the main repo.
3. Score each checklist item; note the specific fix needed (not just
   "improve meta description" — write the actual replacement text).
4. Write the proposal to `../../data/audits/<date>-onpage-<page>.md`, each
   finding in the Issue Format from
   [../../config/seo-rules.md](../../config/seo-rules.md). Do not edit
   files in `../../app/` directly — per
   [../../config/guardrails.md](../../config/guardrails.md), site content
   changes need explicit user approval, then follow the "Code changes"
   branch/PR procedure before being applied.
