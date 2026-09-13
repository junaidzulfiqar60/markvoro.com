# Keyword Research

Standalone version of full-audit steps 9 + 11, for when you just need
fresh keyword data (e.g. before writing a specific piece of content).

## Steps

1. `npm run gsc` — pull current Search Console query/page data.
2. Run [keyword-research](../skills/keyword-research/SKILL.md): cluster by
   intent/topic, map to existing pages, flag gaps.
3. If competitor context exists (`../config/competitors.md` is non-empty),
   cross-reference with [competitor-analysis](../skills/competitor-analysis/SKILL.md)
   output for gaps MARKVORO doesn't cover at all.
4. Write `../data/keywords/<date>-keywords.md`.

## Output feeds

[content-plan](content-plan.md), [optimize-page](optimize-page.md).
