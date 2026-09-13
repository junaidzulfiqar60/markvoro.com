---
name: keyword-research
description: Discover, cluster, and prioritize keywords for MARKVORO's services and blog content using Search Console data and on-site content as seeds.
---

# Keyword Research

## When to use

Before planning new content (feeds `content-plan`), before rewriting a
page's on-page SEO (feeds `optimize-page`), or on its own via the
`keyword-research` workflow.

## Seed sources

- Existing service names/descriptions in `../../lib/data.ts` and any
  DB-backed services (`getServices()` in `../../lib/content.ts`).
- Existing blog topics in `../../lib/blogData.ts` / DB-backed posts.
- Actual queries MARKVORO already ranks for or gets impressions on, from
  `npm run gsc` (`../../scripts/gsc/`) — this is real data, not a guess.
- Gaps surfaced by the [competitor-analysis](../competitor-analysis/SKILL.md)
  skill.

## Method

1. Pull the latest Search Console query/page report via `npm run gsc`.
2. Group queries by intent (informational, commercial, navigational,
   transactional) and by topic/service line.
3. Map each cluster to an existing page, or flag it as a candidate for a
   new page/post.
4. Prioritize using only data you actually have: current impressions,
   current position, and business relevance (does it map to a real
   MARKVORO service?). Do **not** fabricate search-volume or
   keyword-difficulty numbers — those require a paid keyword tool this
   agent doesn't have access to yet; if asked for them, say so instead of
   inventing a figure.
5. Write results to `../../data/keywords/<date>-keywords.md`: cluster,
   sample queries, current best-ranking page (if any), recommended action
   (optimize existing page / write new page / no action). Where a cluster
   surfaces a real problem (e.g. a high-impression query with no ranking
   page), record it in the Issue Format from
   [../../config/seo-rules.md](../../config/seo-rules.md).

## Output feeds

- [content-plan](../../workflows/content-plan.md) workflow
- [optimize-page](../../workflows/optimize-page.md) workflow
