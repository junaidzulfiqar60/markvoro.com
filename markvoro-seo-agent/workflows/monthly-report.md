# Monthly Report

The full stakeholder report. Aggregates a month of `weekly-monitor` runs
plus a `full-audit` if one ran that month.

## Steps

1. Gather every file written to `../data/audits/`, `../data/keywords/`,
   `../data/competitors/`, and `../data/reports/` (weekly reports) for the
   month.
2. Run the [reporting](../skills/reporting/SKILL.md) skill over all of it,
   producing every required section (Executive Summary through Next
   Steps).
3. "Completed Actions" only lists items whose Validation Method was
   actually re-checked this month — not everything that was merged.
4. "Next Steps" carries forward anything still open from
   `full-audit`/`optimize-page`/`content-plan` output that hasn't been
   approved or implemented yet.

## Output

`../data/reports/<year>-<month>-report.md`.
