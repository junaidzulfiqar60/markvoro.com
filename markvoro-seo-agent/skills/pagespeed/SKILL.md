---
name: pagespeed
description: Audit Core Web Vitals and page performance for MARKVORO using PageSpeed Insights, and turn findings into prioritized fixes.
---

# PageSpeed

## When to use

As part of `full-audit` step 8, or `weekly-monitor` to catch regressions.

## Method

1. Run `npm run pagespeed` (see `../../scripts/pagespeed/`) against the
   homepage and the highest-priority pages (services, top blog posts) —
   both mobile and desktop strategy.
2. Read the real Core Web Vitals returned (LCP, INP/TBT, CLS) and the
   opportunities/diagnostics PageSpeed Insights reports — don't guess at
   scores.
3. Translate each opportunity into a concrete fix in this codebase (e.g. a
   specific unoptimized image in `../../public/`, a render-blocking
   resource, missing `next/image` usage) rather than repeating PageSpeed's
   generic wording.
4. For `weekly-monitor`, compare against the previous run's numbers (from
   `../../data/audits/`) and only flag material regressions, not noise.

## Output

`../../data/audits/<date>-pagespeed.md` — findings in the Issue Format from
[../../config/seo-rules.md](../../config/seo-rules.md), with the measured
score/metric as the Evidence field (never an assumed score).
