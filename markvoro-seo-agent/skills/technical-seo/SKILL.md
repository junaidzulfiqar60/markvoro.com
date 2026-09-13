---
name: technical-seo
description: Audit and fix crawlability, indexing, and site-health issues (robots.txt, sitemap.xml, canonicals, redirects, broken links, HTTPS/mobile consistency) for markvoro.com.
---

# Technical SEO

## When to use

At the start of a `full-audit`, before any keyword or content work — a page
that can't be crawled or indexed correctly makes every other optimization
moot. Also run standalone after a deploy that changes routing (new
`app/` routes, redirects, or `app/sitemap.ts`).

## Checklist

- **Sitemap** — every indexable, canonical URL is in `../../app/sitemap.ts`'s
  output; no noindex'd, redirected, or duplicate URLs in it.
- **Robots** — `robots.txt` (or Next's `app/robots.ts` if present) doesn't
  block anything it shouldn't, and doesn't allow crawling of `/admin/*` or
  `/api/*`.
- **Canonicals** — every page sets a self-referencing canonical via
  `absoluteUrl()` from `../../lib/seo.ts`; paginated/query-param variants
  canonicalize to the clean URL.
- **Redirects** — no redirect chains (>1 hop), no redirect loops, moved
  content uses 301s.
- **Broken links / 404s** — internal links resolve; external links used in
  content aren't dead (report, don't auto-fix).
- **HTTPS/www consistency** — one canonical host (`https://www.markvoro.com`
  per `SITE_URL` in `../../lib/seo.ts`); no mixed-content warnings.
- **Mobile** — viewport meta present, no layout that breaks under the
  `resize_window` mobile preset.
- **Structured data validity** — delegate the actual JSON-LD shape to the
  [schema](../schema/SKILL.md) skill; this checklist only confirms every
  page that should emit schema does.

## Method

1. Run `npm run crawl` (see `../../scripts/crawl/`) against
   `https://www.markvoro.com` (or a staging/preview URL if given one).
2. Cross-check the crawl output against the checklist above.
3. Classify each finding: broken (blocks indexing/crawling) vs. suboptimal
   (works, but not ideal).
4. Write findings to `../../data/audits/<date>-technical.md`, each as an
   entry in the Issue Format defined in
   [../../config/seo-rules.md](../../config/seo-rules.md). Do not edit site
   source as part of this skill; implementation follows the "Code changes"
   procedure in
   [../../config/guardrails.md](../../config/guardrails.md) once the user
   approves a fix.
