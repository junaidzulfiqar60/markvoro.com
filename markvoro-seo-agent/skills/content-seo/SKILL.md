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

- A brief per planned piece: target keyword cluster (from
  `keyword-research`), search intent, angle that's specific to MARKVORO
  (not generic industry filler), suggested outline, internal links to
  include (coordinate with [internal-linking](../internal-linking/SKILL.md)).
- Never fabricate statistics, client results, or case studies — pull real
  ones from `../../lib/data.ts`/DB or ask the user for source material.

## Output

`../../data/audits/<date>-content-<page>.md` for reviews (findings in the
Issue Format from [../../config/seo-rules.md](../../config/seo-rules.md)),
`../../data/keywords/<date>-content-briefs.md` for new-content briefs (also
feeds the [content-plan](../../workflows/content-plan.md) workflow output).
