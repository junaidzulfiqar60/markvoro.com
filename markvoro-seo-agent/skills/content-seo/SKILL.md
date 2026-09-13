---
name: content-seo
description: Evaluate and plan content quality, depth, freshness, and E-E-A-T signals for MARKVORO's blog and service pages.
---

# Content SEO

## When to use

As part of `content-plan` (new content) or `full-audit`/`optimize-page`
(existing content review).

## What to check on existing content

- **Depth vs. intent** — does the page actually answer what the mapped
  keyword cluster is asking, or just mention it in passing?
- **Freshness** — blog posts (`../../lib/blogData.ts` / DB-backed via
  `getBlogPosts()`) with dated claims or stale examples; flag for a refresh
  pass, don't rewrite unprompted.
- **E-E-A-T signals** — does the piece show real experience/expertise
  (MARKVORO's own case studies, portfolio work in `../../lib/data.ts`'s
  `webProjects`), or is it generic? Prefer citing MARKVORO's actual work
  over invented examples.
- **Duplication/cannibalization** — two pages competing for the same
  keyword cluster; recommend a merge or differentiation, don't just flag it.
- **Readability/structure** — matches `components/blog/BlogContent.tsx`'s
  plain-text convention (blank line = paragraph, `## ` = subheading); no
  markdown syntax that renderer won't parse.

## What to produce for new content

A brief per planned piece, covering every field below. Where a field
depends on data this agent doesn't have (e.g. no real search-intent
signal beyond query shape), mark it `unavailable` rather than guessing:

| Field | Source |
| --- | --- |
| Keyword | target cluster from [keyword-research](../keyword-research/SKILL.md) |
| Search intent | from the same keyword-research categorization |
| Target audience | who at a prospective client this piece is for (matched to `../../config/brand.md` services/markets) |
| Recommended URL | proposed slug, following `../../config/seo-rules.md` conventions |
| Title | draft title tag |
| H1 | draft H1 (may differ slightly from Title) |
| Outline | H2/H3 structure, MARKVORO-specific angle, not generic industry filler |
| Questions to answer | question-based queries this piece should directly answer (from keyword-research's Question-based category or real GSC queries) |
| Entities/topics | related concepts/services the piece should mention, grounded in `../../config/brand.md` and `../../lib/data.ts` |
| Internal links | pages to link to/from (coordinate with [internal-linking](../internal-linking/SKILL.md)) |
| External references | only real, citable sources — never invented ones |
| CTA | which MARKVORO service/contact action this piece should drive toward |
| Schema | which `../../lib/seo.ts` JSON-LD helper applies (e.g. `blogPostingJsonLd`), per [schema](../schema/SKILL.md) |
| Word-count guidance | a range justified by depth-vs-intent (competitor/content-gap findings if available), not an arbitrary number |

Never fabricate statistics, client results, or case studies — pull real
ones from `../../lib/data.ts`/DB or ask the user for source material.

## Output

`../../data/audits/<date>-content-<page>.md` for reviews (findings in the
Issue Format from [../../config/seo-rules.md](../../config/seo-rules.md)),
`../../data/keywords/<date>-content-briefs.md` for new-content briefs (also
feeds the [content-plan](../../workflows/content-plan.md) workflow output).
