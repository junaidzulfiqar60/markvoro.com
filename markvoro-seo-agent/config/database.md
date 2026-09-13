# Database (Supabase/Postgres)

**Status: schema designed, not provisioned.** No Supabase project exists
yet and no script or skill reads/writes it. Every script in `../scripts/`
still writes to `../data/*.md`/`*.json` today — that stays true until the
user provisions a project and this doc is updated to say otherwise. Don't
assume a `db_op`-style write happened just because this file exists.

## Why

The original architecture (see the diagram that kicked off this
subproject) calls for a persistent SEO database instead of flat files, so
the agent can answer things like "this problem was identified last month
and has now been fixed" by checking `seo_issues.status`/`resolved_at`
instead of re-reading every dated file in `data/`.

## Tables

Full DDL: [`../db/schema.sql`](../db/schema.sql). Sixteen tables, each
grounded in an existing skill or script's real output shape rather than a
speculative redesign:

| Table | Populated from |
| --- | --- |
| `projects` | One row for MARKVORO (and, later, any other site this agent manages). |
| `websites` | MARKVORO's own domain plus each competitor domain from `competitors.md`. |
| `pages` | `scripts/crawl/crawl.mjs` |
| `keyword_clusters` | [keyword-research](../skills/keyword-research/SKILL.md) clustering step |
| `keywords` | [keyword-research](../skills/keyword-research/SKILL.md)'s data-fields table |
| `competitors` | [competitor-analysis](../skills/competitor-analysis/SKILL.md)'s profile-fields table |
| `seo_issues` | Every skill's Issue Format output ([seo-rules.md](seo-rules.md)) |
| `seo_tasks` | The branch/PR procedure in [guardrails.md](guardrails.md) |
| `content_briefs` | [content-seo](../skills/content-seo/SKILL.md)'s brief template |
| `content` | Published pieces once a brief is written |
| `rankings` | `scripts/gsc/` or user-supplied position data |
| `gsc_data` | `scripts/gsc/fetch-search-console.mjs` |
| `ga4_data` | `scripts/ga4/fetch-ga4.mjs` |
| `backlinks` | No source connected yet — stays empty, never fabricated |
| `reports` | [reporting](../skills/reporting/SKILL.md) output |
| `agent_runs` | One row per workflow run (audit trail) |

## Rules

- Never invent a row. Every write mirrors real output from a script or a
  skill's actual finding — same anti-fabrication rule as everywhere else
  in this agent (see [guardrails.md](guardrails.md)).
- Nullable metric columns (`search_volume`, `keyword_difficulty`, `cpc`,
  `ranking_keywords`, `backlink_profile`, etc.) stay `null` when no real
  source backs them. Never write a guessed number to make a column look
  filled in.
- `seo_issues.severity` reuses the Priority levels from
  [seo-rules.md](seo-rules.md) (`Critical`/`High`/`Medium`/`Low`) — don't
  invent new severity labels.
- Credentials (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) belong only in
  `.env` — see [guardrails.md](guardrails.md)'s data-handling rules, same
  as the Google credentials already in use.

## Next steps (not started)

1. User provisions a Supabase project and runs `db/schema.sql` against it.
2. `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` added to `.env` (see
   `.env.example`).
3. Add `@supabase/supabase-js` as a dependency and update
   `scripts/crawl/`, `scripts/gsc/`, `scripts/ga4/`, `scripts/pagespeed/`
   to write to the matching tables above (in addition to, or instead of,
   `data/*.json` — the user should decide which once a project exists).
4. Update the skills whose Method steps currently say "write to
   `data/...`" once the write path actually changes.

Nothing in this list happens automatically — each step needs its own
explicit go-ahead once a real project exists, per
[guardrails.md](guardrails.md)'s code-changes procedure.
