# Monthly Report

The full stakeholder report. Aggregates a month of `weekly-monitor` runs
plus a `full-audit` if one ran that month.

## Steps

1. Gather every file written to `../data/audits/`, `../data/keywords/`,
   `../data/competitors/`, and `../data/reports/` (weekly reports) for the
   month.
2. `npm run gsc -- --compare=28` and `npm run ga4 -- --compare=28` — last
   28 days vs. previous 28 days, for a real period-over-period read on
   the Keywords/Organic Traffic/Top Pages sections instead of eyeballing
   separate weekly files.
3. Run the [reporting](../skills/reporting/SKILL.md) skill over all of it,
   producing every required section (Executive Summary through Next
   Steps).
4. "Completed Actions" only lists items whose Validation Method was
   actually re-checked this month — not everything that was merged.
5. "Next Steps" carries forward anything still open from
   `full-audit`/`optimize-page`/`content-plan` output that hasn't been
   approved or implemented yet.

## Output

`../data/reports/<year>-<month>-report.md`.
