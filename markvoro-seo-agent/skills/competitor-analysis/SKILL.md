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

## Method

1. For each competitor in `../../config/competitors.md`, crawl their public
   pages with `npm run crawl -- --url=<competitor-url>` (same crawler used
   for MARKVORO — see [technical-seo](../technical-seo/SKILL.md)), scoped
   to reasonable rate limits per
   [../../config/guardrails.md](../../config/guardrails.md).
2. Compare: pages/services they rank for that MARKVORO doesn't (feeds
   [keyword-research](../keyword-research/SKILL.md)'s content-gap input),
   content depth on shared topics, technical basics (titles, schema,
   Core Web Vitals if measurable), internal linking/site structure.
3. Do not estimate their traffic, rankings, or backlinks without a real
   data source — if you only have crawl data, say so and limit findings to
   what a crawl can actually show (on-page/technical), not rank/traffic
   claims.

## Output

`../../data/competitors/<date>-<competitor>.md` — findings in the Issue
Format from [../../config/seo-rules.md](../../config/seo-rules.md), framed
as gaps/opportunities for MARKVORO rather than a review of the competitor.
