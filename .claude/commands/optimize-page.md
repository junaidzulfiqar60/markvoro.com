---
description: Produce an on-page/content/schema/internal-linking proposal for one MARKVORO page
argument-hint: <page url>
---

Run `markvoro-seo-agent/workflows/optimize-page.md` end to end for the
page at `$ARGUMENTS`.

If no URL is given, ask for one — this workflow targets a single existing
page, not the whole site (use `/seo-audit` for that).

This workflow stops for approval before touching
`../app`/`../lib`/`../components`; it only writes a proposal into
`markvoro-seo-agent/data/audits/` until the user approves specific items.
