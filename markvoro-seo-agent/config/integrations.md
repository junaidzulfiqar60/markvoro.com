# Integrations roadmap

The order the user intends to connect real data sources/tools in. This
records intent — it doesn't mean a Phase 2/3 tool is available. Don't
reference Ahrefs/Semrush/Screaming Frog/a dashboard/Slack/etc. as if it's
live until this file (and the relevant skill) says otherwise.

## Phase 1 — start here

| Tool | Status | Where |
| --- | --- | --- |
| Claude Code | Connected — this agent | [../CLAUDE.md](../CLAUDE.md) |
| GitHub | Permission model defined (read/branch/PR only, no merge/deploy) | [guardrails.md](guardrails.md#github-permissions) |
| Google Search Console | Script written, needs real credentials | [../scripts/gsc/fetch-search-console.mjs](../scripts/gsc/fetch-search-console.mjs), [../.env.example](../.env.example) |
| GA4 | Script written, needs real credentials | [../scripts/ga4/fetch-ga4.mjs](../scripts/ga4/fetch-ga4.mjs), [../.env.example](../.env.example) |
| PageSpeed Insights | Script written, works without a key at a lower quota | [../scripts/pagespeed/](../scripts/pagespeed/), [../.env.example](../.env.example) |
| Web search/crawling | Implemented — this agent's own crawler | [../scripts/crawl/crawl.mjs](../scripts/crawl/crawl.mjs) |

Phase 1 needs nothing beyond what's already in this repo except real
credentials in `.env` — see [../.env.example](../.env.example) and each
script's header comment for exactly which variable it needs.

## Phase 2 — add once Phase 1 is producing real reports

| Tool | Status | Fills the gap in |
| --- | --- | --- |
| Ahrefs **or** Semrush (pick one) | Not connected | Every field currently marked `unavailable` for lack of a paid keyword tool: search volume, keyword difficulty, CPC in [keyword-research](../skills/keyword-research/SKILL.md)'s data-fields table; ranking keywords, backlink profile in [competitor-analysis](../skills/competitor-analysis/SKILL.md)'s profile-fields table |
| Screaming Frog | Not connected | Larger/JS-rendered crawls than `crawl.mjs`'s sitemap-based fetch handles — complements it, doesn't replace it, for [technical-seo](../skills/technical-seo/SKILL.md) |
| Supabase | Schema designed, not provisioned | Persistent store instead of flat `data/` files — see [database.md](database.md) |

## Phase 3 — add once Phase 1+2 are running reliably

| Tool | Status | Purpose |
| --- | --- | --- |
| Scheduled automation | Not started | Runs [weekly-monitor](../workflows/weekly-monitor.md)/[monthly-report](../workflows/monthly-report.md) on a real cadence instead of the user invoking Claude Code manually |
| SEO dashboard | Not started | A UI over Supabase's data (once Phase 2's Supabase step is done) instead of reading dated files under `data/reports/` |
| Slack/WhatsApp/email reporting | Not started | Delivers report output to the user instead of leaving it only in `data/reports/` |

## Rules

- This file records intent, not authorization. Per `../CLAUDE.md`'s note
  not to add unrequested backend systems/integrations, implement a
  specific Phase 2/3 item only when the user explicitly asks for that one
  — not because it's next on this list.
- Once a Phase 2/3 tool is actually connected, update the relevant skill's
  data-fields table (keyword-research, competitor-analysis) to cite it as
  a real source instead of `unavailable`, and update
  [database.md](database.md)'s "Next steps" if Supabase moves.
- Any Phase 3 item that sends something externally (Slack/WhatsApp/email,
  or a scheduled run whose output could be published/forwarded somewhere)
  stays subject to [guardrails.md](guardrails.md) — sending/publishing
  never happens automatically, scheduled or not, without explicit
  approval at the time.
- Credentials for any newly connected tool live only in `.env`, per
  [guardrails.md](guardrails.md)'s data-handling rules.
