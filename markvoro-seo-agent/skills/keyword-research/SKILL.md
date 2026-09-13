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
  Each row carries query, page, country, device, clicks, impressions,
  CTR, and average position; a separate `searchAppearance` array (rich
  results, AMP, etc.) is included too — use country/device splits to spot
  a keyword that performs differently on mobile vs. desktop, or in
  Pakistan vs. international traffic, before recommending a fix.
- Gaps surfaced by the [competitor-analysis](../competitor-analysis/SKILL.md)
  skill.

## Categories

Every keyword found must be tagged with at least one of these categories
(a keyword can carry more than one, e.g. "AI automation agency Pakistan"
is both Local and Commercial):

- Primary
- Secondary
- Long-tail
- Commercial
- Transactional
- Informational
- Local
- Branded
- Question-based

## Data fields

For each keyword, record every field below. If a value isn't available
from a source this agent actually has (GSC, the live crawl, on-site
content), write `unavailable` — never estimate or invent it:

| Field | Source |
| --- | --- |
| Keyword | the query text itself |
| Search intent | inferred from SERP/query shape (informational, commercial, transactional, navigational) |
| Search volume | requires a paid keyword-volume tool this agent doesn't have access to — mark `unavailable` unless a real source is wired up |
| Keyword difficulty | same — `unavailable` unless a real source is wired up |
| CPC | same — `unavailable` unless a real source is wired up |
| SERP characteristics | only if directly observed (e.g. via a live SERP check); otherwise `unavailable` |
| Competition | from [competitor-analysis](../competitor-analysis/SKILL.md) findings if any exist, else `unavailable` |
| Business value | judged from mapping to a real MARKVORO service/page in `config/brand.md` |
| Target page | existing URL, or "candidate: new page/post" |
| Content type | e.g. service page, blog post, landing page, FAQ entry |

## Method

1. Pull the latest Search Console query/page report via `npm run gsc`.
2. Categorize every query using the list above, and fill in the data
   fields table for each — marking anything not backed by a real source
   as `unavailable` rather than guessing.
3. Group queries by intent and by topic/service line.
4. Map each cluster to an existing page, or flag it as a candidate for a
   new page/post (Target page / Content type fields).
5. Prioritize using: business value, search intent, ranking feasibility
   (current position/impressions from GSC — a query already near page 1
   is higher-feasibility than one with zero visibility), topical
   relevance to a real MARKVORO service, and competition (only where
   actually known). Do **not** fabricate search-volume, keyword-difficulty,
   or CPC numbers — those require a paid keyword tool this agent doesn't
   have access to yet; if asked for them, say so and mark `unavailable`
   instead of inventing a figure.
6. Write results to `../../data/keywords/<date>-keywords.md` as a table
   with all data fields above, plus the recommended action (optimize
   existing page / write new page / no action). Where a cluster surfaces
   a real problem (e.g. a high-impression query with no ranking page),
   also record it in the Issue Format from
   [../../config/seo-rules.md](../../config/seo-rules.md).

## Output feeds

- [content-plan](../../workflows/content-plan.md) workflow
- [optimize-page](../../workflows/optimize-page.md) workflow
