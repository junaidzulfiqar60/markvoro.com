# Weekly Monitor

Lightweight recurring check — regressions only, not a full audit. Meant to
be cheap enough to run every week without generating noise.

## Steps

1. `npm run pagespeed` on the homepage + top pages —
   [pagespeed](../skills/pagespeed/SKILL.md), diffed against last week's
   `../data/audits/` entry. Only flag material regressions (a real drop in
   LCP/INP/CLS or score), not noise.
2. `npm run gsc` — [keyword-research](../skills/keyword-research/SKILL.md)'s
   data pull, diffed against last week for material impression/position
   drops on money-page queries.
3. `npm run ga4` — spot-check organic sessions/conversions for anomalies
   (sudden drop, not normal week-to-week variance).
4. Quick technical spot-check —
   [technical-seo](../skills/technical-seo/SKILL.md)'s crawl output for any
   new 404s, broken canonicals, or indexing errors since last week.
5. If nothing material changed, say so plainly — don't manufacture
   findings to fill the report.

## Output

`../data/reports/<date>-report.md` via the
[reporting](../skills/reporting/SKILL.md) skill's full section structure,
scoped to what actually changed this week.
