# SEO principles & house rules

Every skill in `../skills/` must follow these. If a skill's own SKILL.md
seems to conflict with this file, this file wins.

## Principles

- Analyze search intent before targeting a keyword — don't map a keyword to
  a page just because it contains the term.
- Prefer useful content over keyword stuffing.
- Use natural language; write for the reader first, the algorithm second.
- Build topical authority — cluster related content, don't scatter
  one-off pages.
- Optimize for humans first, then crawlers/schema.
- Follow Google Search's own guidelines (helpful-content, spam policies) as
  the tiebreaker whenever a tactic's status is unclear.
- Use real data whenever it's available (Search Console, GA4, PageSpeed,
  the actual crawl) instead of estimating.
- **Clearly distinguish measured data from assumptions** in every finding
  and report — label estimates as estimates.
- **Never invent search volume, rankings, organic traffic, or backlinks.**
  If a number isn't backed by a real API response or crawl result, don't
  put a number there — say the data isn't available.

## Issue format

Every finding produced by any skill or workflow — in `data/audits/`,
`data/keywords/`, `data/competitors/`, or a report — uses this shape:

```
### <short title>

- **Issue:** what's wrong
- **Evidence:** the concrete data that shows it (crawl output, GSC row,
  PageSpeed score, file/line) — not an assertion without a source
- **Impact:** what it costs (rankings, indexing, conversions, UX) and how
  confident that estimate is
- **Priority:** Critical | High | Medium | Low
- **Recommended fix:** the specific change, not a generic suggestion
- **Implementation instructions:** concrete enough that Claude Code (or a
  developer) can execute it directly — file paths, exact copy, exact tags
- **Validation method:** how to confirm the fix worked (re-crawl check,
  PageSpeed re-run, Search Console query, manual check)
```

## On-page limits

- Title tag: 50–60 characters, primary keyword near the front.
- Meta description: 140–160 characters, written to earn a click, not a
  keyword list.
- Exactly one `<h1>` per page; logical `h2`/`h3` nesting.
- URL slugs: lowercase, hyphenated, short, keyword-relevant; never change a
  live slug without a redirect plan.
- Every non-decorative image has descriptive alt text; no keyword stuffing
  in alt text.
- Internal link anchor text is descriptive; never "click here"/"read more".
- New/changed structured data reuses and extends the helpers in
  `../lib/seo.ts` rather than duplicating ad-hoc JSON-LD elsewhere.
- Redirects for permanent moves are 301s; no redirect chains longer than
  one hop.
- Sitemap (`../app/sitemap.ts`) contains only indexable, canonical URLs.

## Priority levels

- **Critical** — blocks indexing/crawling, or breaks a page (broken build,
  404 on a live route, missing canonical causing duplicate indexing).
- **High** — materially hurts rankings or conversions (missing title/meta,
  poor Core Web Vitals, thin content on a money page).
- **Medium** — real but bounded impact (suboptimal internal linking,
  minor schema gaps).
- **Low** — polish (alt-text wording, minor slug improvements).
