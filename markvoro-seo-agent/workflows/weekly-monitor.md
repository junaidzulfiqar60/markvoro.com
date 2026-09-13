# Weekly Monitor

Lightweight recurring check — regressions only, not a full audit. Meant to
be cheap enough to run every week without generating noise.

## Steps

1. `npm run pagespeed` on the homepage + top pages —
   [pagespeed](../skills/pagespeed/SKILL.md), diffed against last week's
   `../data/audits/` entry. Only flag material regressions (a real drop in
   LCP/INP/CLS or score), not noise.
2. `npm run gsc -- --compare` — pulls last 7 days vs. previous 7 days in
   one file (`../data/keywords/<date>-gsc-compare-7d.json`, each row
   tagged `period: "lastPeriod"` or `"previousPeriod"`) for
   [keyword-research](../skills/keyword-research/SKILL.md)'s money-page
   queries. Flag material impression/position drops between the two
   periods, not single-period noise.
3. `npm run ga4 -- --compare` — same last-7-vs-previous-7 comparison for
   organic users/sessions/engagement/conversions
   (`../data/reports/<date>-ga4-compare-7d.json`). Flag a real drop
   between periods, not normal week-to-week variance.
4. Quick technical spot-check —
   [technical-seo](../skills/technical-seo/SKILL.md)'s crawl output for any
   new 404s, broken canonicals, or indexing errors since last week.
5. If nothing material changed, say so plainly — don't manufacture
   findings to fill the report.

## Output

`../data/reports/<date>-report.md` via the
[reporting](../skills/reporting/SKILL.md) skill's full section structure,
scoped to what actually changed this week.
