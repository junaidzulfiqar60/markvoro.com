# Full Audit

The canonical end-to-end SEO workflow for MARKVORO. Read
[../config/guardrails.md](../config/guardrails.md) before starting —
nothing here authorizes publishing, deploying, or deleting anything without
explicit approval.

## Steps

1. **Crawl website** — `npm run crawl` against `https://www.markvoro.com`
   (or the URL the user gives you). Output feeds every step below.
2. **Analyze technical SEO** — [technical-seo](../skills/technical-seo/SKILL.md).
3. **Analyze indexing** — sitemap coverage, robots rules, canonical
   correctness (part of the technical-seo skill's checklist).
4. **Analyze metadata** — titles, meta descriptions, headings, slugs —
   [on-page-seo](../skills/on-page-seo/SKILL.md).
5. **Analyze content** — [content-seo](../skills/content-seo/SKILL.md).
6. **Analyze internal links** — [internal-linking](../skills/internal-linking/SKILL.md).
7. **Analyze schema** — [schema](../skills/schema/SKILL.md).
8. **Analyze performance** — `npm run pagespeed` —
   [pagespeed](../skills/pagespeed/SKILL.md).
9. **Research keywords** — `npm run gsc` —
   [keyword-research](../skills/keyword-research/SKILL.md).
10. **Analyze competitors** — [competitor-analysis](../skills/competitor-analysis/SKILL.md)
    (skip with a note if `../config/competitors.md` is still empty).
11. **Identify content gaps** — cross-reference step 9's keyword clusters
    against step 10's competitor coverage and step 5's content review.
12. **Create prioritized recommendations** — merge every finding from
    steps 2–11 into one list, each in the Issue Format
    (`../config/seo-rules.md`), sorted by Priority.
13. **Implement approved changes** — only after the user has reviewed step
    12's list and approved specific items; follow the "Code changes"
    procedure in [../config/guardrails.md](../config/guardrails.md)
    (branch → PR → human approval → deploy).
14. **Validate changes** — run each approved fix's Validation Method.
15. **Monitor results** — the next `weekly-monitor` run checks these
    haven't regressed and starts tracking any measurable movement.
16. **Generate report** — [reporting](../skills/reporting/SKILL.md), using
    every step's output; write to `../data/reports/<date>-report.md`.

## Output

- Per-step findings in `../data/audits/`, `../data/keywords/`,
  `../data/competitors/` (dated files).
- One consolidated report in `../data/reports/`.
