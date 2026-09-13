# Weekly Monitor

Lightweight recurring check — regressions and opportunities from the last
7 days vs. the previous 7 days, not a full audit. Meant to run every
Monday, cheap enough to not generate noise. Read
[../config/guardrails.md](../config/guardrails.md) first — nothing here
authorizes publishing, deploying, or submitting anything automatically.

## Steps

1. **Pull Search Console data** — `npm run gsc -- --compare` (last 7 days
   vs. previous 7 days in one file,
   `../data/keywords/<date>-gsc-compare-7d.json`; each row tagged
   `period: "lastPeriod"` or `"previousPeriod"`).
   [keyword-research](../skills/keyword-research/SKILL.md).
2. **Pull GA4 data** — `npm run ga4 -- --compare` (same last-7-vs-
   previous-7 comparison for organic users/sessions/engagement/
   conversions, `../data/reports/<date>-ga4-compare-7d.json`).
3. **Compare previous period** — group both files' rows by their key
   (`query` for Search Console, `landingPagePlusQueryString` for GA4) and
   diff `lastPeriod` against `previousPeriod` values. This diff feeds
   every step below — don't re-fetch per step.
4. **Find ranking gains** — from step 3's Search Console diff, queries
   whose `position` (lower is better) improved materially between
   periods. [keyword-research](../skills/keyword-research/SKILL.md).
5. **Find ranking losses** — same diff, queries whose `position` got
   materially worse. Flag any that moved off page 1 (position > 10).
6. **Find new keywords** — queries with impressions in `lastPeriod` but
   none in `previousPeriod` — a first appearance in Search Console this
   week.
7. **Find declining pages** — group step 3's Search Console rows by
   `page` (cross-checked against GA4's `landingPagePlusQueryString`) and
   flag pages with a material clicks/impressions/organic-sessions drop
   between periods.
8. **Find indexing problems** — `npm run crawl`, then check each page's
   `isIndexable`/`blockedByRobots`/`status`/`canonical` fields.
   [technical-seo](../skills/technical-seo/SKILL.md).
9. **Find new technical issues** — diff this crawl against last week's
   `../data/audits/<date>-crawl-<host>.json`: new 404s, new
   `blockedByRobots`/`noindex`, broken canonicals, or `robotsTxt` changes
   that weren't there last week.
   [technical-seo](../skills/technical-seo/SKILL.md).
10. **Identify content opportunities** — cross-reference step 6/7's
    keyword and page signal against the crawl's `wordCount` and existing
    coverage: real-impression queries with no matching page, or a
    declining page that may need a content refresh.
    [content-seo](../skills/content-seo/SKILL.md).
11. **Generate recommendations** — every finding from steps 4-10, in the
    Issue Format (`../config/seo-rules.md`), sorted by Priority. If a
    step found nothing material, it contributes no recommendation —
    never invent one to fill the report.
12. **Generate weekly report** —
    [reporting](../skills/reporting/SKILL.md) skill, scoped to this
    week's actual data (its Method #2: "No data collected this period"
    instead of padding a section with nothing to say).

## Output

`../data/reports/<date>-report.md` via
[reporting](../skills/reporting/SKILL.md)'s full section structure. If
nothing material changed in steps 4-10, say so plainly in the Executive
Summary and Problems/Opportunities sections rather than manufacturing
findings to fill the report.
