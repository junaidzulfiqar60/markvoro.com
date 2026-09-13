---
name: on-page-seo
description: Optimize title tags, meta descriptions, headings, URL slugs, image alt text, and keyword placement on individual MARKVORO pages.
---

# On-Page SEO

## When to use

As part of `optimize-page` or `full-audit`, for a specific page or set of
pages (homepage sections in `../../app/page.tsx`, service pages, blog posts
in `../../app/blog/[slug]/page.tsx`).

## Fields to analyze (per target page)

- URL
- Title
- Meta description
- H1
- H2/H3 structure
- Primary keyword
- Secondary keywords
- Search intent
- Content depth
- Internal links
- External references
- Images
- Alt text
- Schema
- CTA
- Conversion intent

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
2. Read the page's current metadata/content from the main repo and fill in
   every field above from what's actually there — don't skip a field, mark
   it "none present" if genuinely absent (e.g. no schema on the page).
3. Score each checklist item against `../../config/seo-rules.md` limits.
4. Do **not** rewrite content unnecessarily — preserve useful existing
   copy, internal links, and structure. Only flag and touch what's
   actually broken, thin, or missing; a page that already meets a
   checklist item gets no finding for it.
5. For every real issue found, write it up with all six of:
   - **Current state** — the actual existing text/markup, verbatim.
   - **Problem** — what's wrong and why it matters for SEO.
   - **Recommendation** — the fix, in plain terms.
   - **Exact replacement** — the literal replacement text/markup to use,
     not a paraphrase of the idea (e.g. the full new title tag, not
     "make the title more specific").
   - **Reason** — why this exact replacement, grounded in the checklist
     rule or real data (GSC query, crawl finding) that justifies it.
   - **Expected SEO benefit** — the concrete, plausible effect (e.g.
     "primary keyword now appears in title and H1, matching top queries
     this page already gets impressions for per GSC") — never a
     fabricated number.
6. Write the proposal to `../../data/audits/<date>-onpage-<page>.md`, each
   finding also expressed in the Issue Format from
   [../../config/seo-rules.md](../../config/seo-rules.md). Do not edit
   files in `../../app/` directly — per
   [../../config/guardrails.md](../../config/guardrails.md), site content
   changes need explicit user approval, then follow the "Code changes"
   branch/PR procedure before being applied.
