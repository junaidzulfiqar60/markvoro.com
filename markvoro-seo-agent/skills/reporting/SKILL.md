---
name: reporting
description: Compile audit, keyword, competitor, and performance data into stakeholder-ready SEO reports for MARKVORO.
---

# Reporting

## When to use

`weekly-monitor` (lightweight) and `monthly-report` (full) both end here.
Also usable standalone once enough `data/` output exists to report on.

## Required sections

Every report must contain, in this order:

1. Executive Summary
2. Technical SEO
3. Indexing
4. Keywords
5. Organic Traffic
6. Top Pages
7. Content
8. Competitors
9. Internal Links
10. Schema
11. Performance
12. Problems
13. Opportunities
14. Recommended Actions
15. Completed Actions
16. Next Steps

## Method

1. Pull every relevant file from `../../data/audits/`, `../../data/keywords/`,
   `../../data/competitors/`, and prior reports in `../../data/reports/`
   for the period being reported on. `../../scripts/gsc/` output gives
   queries, clicks, impressions, CTR, and average position per page,
   country, and device, plus a separate search-appearance breakdown —
   use these for the Keywords, Organic Traffic, and Top Pages sections
   instead of estimating.
2. For each section, report only what the underlying data actually
   supports. If a section has no data for this period (e.g. no competitor
   run happened), say "No data collected this period" — don't pad it.
3. **Never claim an SEO improvement unless it's supported by data** — a
   "Completed Action" is only listed once its Validation Method (from the
   Issue Format, [../../config/seo-rules.md](../../config/seo-rules.md))
   has actually been checked, not just implemented.
4. Recommended Actions are sorted by Priority (Critical → Low, per
   `../../config/seo-rules.md`).

## Output

`../../data/reports/<date>-report.md` (weekly) or
`../../data/reports/<year>-<month>-report.md` (monthly).
