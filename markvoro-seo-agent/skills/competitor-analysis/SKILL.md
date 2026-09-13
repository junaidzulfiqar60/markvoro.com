---
name: competitor-analysis
description: Compare MARKVORO against named competitors on rankings, content coverage, technical health, and site structure.
---

# Competitor Analysis

## When to use

As part of `full-audit` step 10, or standalone to feed `content-plan`.

## Precondition

Read [../../config/competitors.md](../../config/competitors.md) first. If
it's empty, **stop** — tell the user no competitors are configured and ask
them to add at least one before this skill can run. Never invent a
competitor name or URL to have something to analyze.

## Profile fields (per competitor)

Record every field below for each competitor. Only fill in a field from
a real source (the crawl, on-site content, GSC/keyword-research output);
otherwise write `unavailable` — never estimate:

| Field | Source |
| --- | --- |
| Competitor | name, from `../../config/competitors.md` |
| Domain | from `../../config/competitors.md` |
| Main services | observed from their crawled pages/nav/service pages |
| Ranking keywords | only if a real rank-tracking source exists — `unavailable` otherwise |
| Content topics | observed from their crawled blog/service page titles and headings |
| Top pages | only if a real traffic/rank source exists — otherwise list pages that look most developed (depth, internal links) and label this as a proxy, not actual "top pages" |
| Backlink profile | requires a backlink tool this agent doesn't have access to — `unavailable` unless a real source is wired up |
| Content gaps | topics/services they cover that MARKVORO's site does not, per `../../lib/data.ts` / `../../lib/blogData.ts` |
| Keyword gaps | queries/topics they appear to target (from crawled titles/headings) that don't map to any MARKVORO page or GSC query — feeds [keyword-research](../keyword-research/SKILL.md) |
| UX strengths | observed from the crawl (clear nav, strong internal linking, fast pages if PageSpeed is run against them) |
| UX weaknesses | observed the same way |
| SEO weaknesses | observed technical/on-page issues from the crawl (missing titles/meta, thin content, broken links, missing schema) |
| MARKVORO opportunity | the concrete, actionable gap this creates for MARKVORO — always tied to a specific field above, never a generic claim |

## Method

1. For each competitor in `../../config/competitors.md`, crawl their public
   pages with `npm run crawl -- --url=<competitor-url>` (same crawler used
   for MARKVORO — see [technical-seo](../technical-seo/SKILL.md)), scoped
   to reasonable rate limits per
   [../../config/guardrails.md](../../config/guardrails.md).
2. Fill in the profile fields table above from that crawl plus MARKVORO's
   own content/GSC data. Compare: pages/services they cover that MARKVORO
   doesn't (feeds [keyword-research](../keyword-research/SKILL.md)'s
   content-gap input), content depth on shared topics, technical basics
   (titles, schema, Core Web Vitals if measurable), internal
   linking/site structure.
3. Do not estimate their traffic, rankings, or backlinks without a real
   data source — if you only have crawl data, mark those fields
   `unavailable` and limit findings to what a crawl can actually show
   (on-page/technical), not rank/traffic claims.

## Output

`../../data/competitors/<date>-<competitor>.md` — the profile fields table
above, plus findings in the Issue Format from
[../../config/seo-rules.md](../../config/seo-rules.md), framed as
gaps/opportunities for MARKVORO rather than a review of the competitor.
