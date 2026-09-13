---
description: Pull fresh keyword clusters/gaps for MARKVORO from real Search Console data
argument-hint: [topic or seed keyword]
---

Run `markvoro-seo-agent/workflows/keyword-research.md` end to end.

Seed/topic focus: `$ARGUMENTS` if given, otherwise cover whatever the
current Search Console pull surfaces broadly.

Every field this workflow can't back with real Search Console/crawl/
competitor data must be marked `unavailable` — never invented (see
`markvoro-seo-agent/config/seo-rules.md`).
