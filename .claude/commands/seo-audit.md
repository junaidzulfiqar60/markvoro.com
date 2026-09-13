---
description: Run the full MARKVORO SEO audit (crawl through 30/60/90-day roadmap)
argument-hint: [url]
---

Run `markvoro-seo-agent/workflows/full-audit.md` end to end.

Target: `$ARGUMENTS` if given, otherwise the default in
`markvoro-seo-agent/.env` (`CRAWL_BASE_URL`, normally
`https://www.markvoro.com`).

Read `markvoro-seo-agent/config/guardrails.md` first. This workflow
produces an audit and a roadmap in `markvoro-seo-agent/data/reports/` —
it does not implement anything or touch `../app`/`../lib`/`../components`.
