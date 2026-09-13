# Monthly Report

The full stakeholder report. Aggregates a month of `weekly-monitor` runs
plus a `full-audit` if one ran that month. Opens with the scorecard below,
then the full section structure from
[reporting](../skills/reporting/SKILL.md).

## Steps

1. Gather every file written to `../data/audits/`, `../data/keywords/`,
   `../data/competitors/`, and `../data/reports/` (weekly reports) for the
   month.
2. `npm run gsc -- --compare=28` and `npm run ga4 -- --compare=28` — last
   28 days vs. previous 28 days, for a real period-over-period read on
   the scorecard and the Keywords/Organic Traffic/Top Pages sections
   instead of eyeballing separate weekly files.
3. Compute the scorecard (below) from that comparison data plus this
   month's open Issue Format findings.
4. Run the [reporting](../skills/reporting/SKILL.md) skill over all of it,
   producing every required section (Executive Summary through Next
   Steps).
5. "Completed Actions" only lists items whose Validation Method was
   actually re-checked this month — not everything that was merged.
6. "Next Steps" carries forward anything still open from
   `full-audit`/`optimize-page`/`content-plan` output that hasn't been
   approved or implemented yet.

## Scorecard

Every report opens with this compact block before the detailed sections.
Each line traces to a specific field in this month's `--compare=28`
output or a real Issue Format finding — never a hand-waved number:

```
MARKVORO
MONTHLY SEO REPORT — <Month Year>

Organic Traffic
<previousPeriod total> → <lastPeriod total> (<% change>)

Organic Clicks
<previousPeriod total> → <lastPeriod total> (<% change>)

Impressions
<previousPeriod total> → <lastPeriod total> (<% change>)

Average Position
<previousPeriod avg> → <lastPeriod avg>

Keywords
<previousPeriod count> → <lastPeriod count>

Top 10 Keywords
<previousPeriod count> → <lastPeriod count>

Top Performing Pages
<ranked list>

Lost Rankings
<list, or "None this period">

Technical Issues
Critical: <count>
High: <count>
Medium: <count>

Content Opportunities
<count>

Next Month Priorities
1. <highest-priority open item>
2. ...
3. ...
4. ...
5. ...
```

| Line | Source |
| --- | --- |
| Organic Traffic | `../data/reports/<date>-ga4-compare-28d.json`: sum `organicSessions` across all rows, grouped by `period`; % change = (lastPeriod − previousPeriod) / previousPeriod. |
| Organic Clicks | `../data/keywords/<date>-gsc-compare-28d.json`: sum `clicks` across `rows`, grouped by `period`. |
| Impressions | same file: sum `impressions` across `rows`, grouped by `period`. |
| Average Position | same file: impressions-weighted average `position` across `rows`, grouped by `period` (state it's impressions-weighted — this agent's own calculation, not a Search Console total). |
| Keywords | same file: count of distinct `query` values with `impressions > 0`, grouped by `period`. |
| Top 10 Keywords | same file: count of distinct `query` values with `position <= 10`, grouped by `period`. |
| Top Performing Pages | same file: `rows` for `period: "lastPeriod"` grouped by `page`, summed `clicks`, top 5 descending. |
| Lost Rankings | queries with `position <= 10` in `previousPeriod` and `position > 10` (or no rows) in `lastPeriod` — same definition as [weekly-monitor](weekly-monitor.md) step 5, run against the 28-day window instead of 7. |
| Technical Issues | count of this month's still-open Issue Format findings (from `full-audit`/`weekly-monitor` runs in `../data/audits/` and `../data/reports/`) by `Priority`, Critical/High/Medium only — Low-priority findings stay in the detailed report, not the scorecard. |
| Content Opportunities | count of [keyword-research](../skills/keyword-research/SKILL.md)/[content-seo](../skills/content-seo/SKILL.md) findings this month recommending a new page/post or a content refresh — a count of real findings, not an estimate. |
| Next Month Priorities | the top 5 items from the most recent `full-audit`'s 30/60/90-day plan (or this month's aggregated recommendations if no `full-audit` ran), ordered by Priority then by realistic effort. |

If this is the first month a metric has real history for (e.g. Search
Console/GA4 was only just connected, so there's no real `previousPeriod`),
write "insufficient historical data" for that line instead of a
percentage or arrow built on a zero/empty baseline.

## Output

`../data/reports/<year>-<month>-report.md`, scorecard first, then the
full section structure from [reporting](../skills/reporting/SKILL.md).
