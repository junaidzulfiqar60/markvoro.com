---
name: internal-linking
description: Improve internal link architecture — anchor text, orphan pages, and hub/spoke structure across MARKVORO's pages.
---

# Internal Linking

## When to use

As part of `full-audit` step 6, or `optimize-page`/`content-plan` when
adding or rewriting a page.

## Checklist

- **Orphan pages** — any indexable page (from `../../app/sitemap.ts`) with
  zero internal inbound links found in the crawl.
- **Hub/spoke structure** — service pages and pillar blog content should
  link down to supporting/cluster content, and cluster content should link
  back up; check this against the clusters from
  [keyword-research](../keyword-research/SKILL.md).
- **Anchor text** — descriptive and varied, never "click here"/"read more"
  (per [../../config/seo-rules.md](../../config/seo-rules.md)); no two
  links to different pages using identical anchor text.
- **Link depth** — important pages (services, high-intent blog posts)
  reachable within 2–3 clicks from the homepage.
- **Broken/redirected internal links** — links pointing at a URL that now
  redirects or 404s; update to the final destination.

## Method

1. Use the crawl's internal-link graph (`npm run crawl`, see
   [technical-seo](../technical-seo/SKILL.md)) to find orphans and count
   inbound links per page.
2. Cross-reference against keyword clusters to spot missing hub↔spoke
   links.
3. For each gap, propose the specific source page, target page, and anchor
   text — not just "add more internal links."

## Output

`../../data/audits/<date>-internal-linking.md` — findings in the Issue
Format from [../../config/seo-rules.md](../../config/seo-rules.md).
