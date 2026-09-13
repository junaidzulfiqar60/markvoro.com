-- MARKVORO SEO agent — Supabase/Postgres schema.
--
-- Design only: no Supabase project is provisioned or connected yet (see
-- ../config/database.md and ../.env.example). Every script in ../scripts
-- still reads/writes ../data/*.md /*.json today; nothing here is live.
-- Each table's comment names the skill/script whose output it's meant to
-- store, so the shapes stay grounded in what this agent actually produces
-- instead of a speculative redesign.
--
-- Apply with the Supabase SQL editor, or `supabase db push` /
-- `psql "$DATABASE_URL" -f db/schema.sql` once a project exists.

create extension if not exists pgcrypto;

-- ==========================================================================
-- projects
-- One row per site this agent manages. Currently just markvoro.com, but
-- every other table is scoped by project_id rather than hardcoding one
-- site, since a competitor's crawled data also needs a home.
-- ==========================================================================
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  site_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================================================
-- websites
-- A crawlable domain under a project: MARKVORO's own site, or a named
-- competitor from ../config/competitors.md. is_own_site lets pages/
-- rankings queries filter to MARKVORO-only or include competitors.
-- ==========================================================================
create table websites (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  domain text not null,
  is_own_site boolean not null default false,
  created_at timestamptz not null default now(),
  unique (project_id, domain)
);

-- ==========================================================================
-- pages
-- One row per URL, refreshed by scripts/crawl/crawl.mjs. Mirrors that
-- script's per-page fields exactly — see skills/technical-seo,
-- skills/on-page-seo.
-- ==========================================================================
create table pages (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references websites(id) on delete cascade,
  url text not null,
  status int,
  title text,
  title_length int,
  meta_description text,
  meta_description_length int,
  canonical text,
  h1_count int,
  images_missing_alt_count int,
  internal_link_count int,
  is_orphan boolean not null default false,
  last_crawled_at timestamptz,
  created_at timestamptz not null default now(),
  unique (website_id, url)
);

-- ==========================================================================
-- keyword_clusters
-- Groups of related keywords (topic/service line), per keyword-research's
-- clustering step.
-- ==========================================================================
create table keyword_clusters (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- keywords
-- One row per researched keyword. Columns mirror the data-fields table in
-- skills/keyword-research/SKILL.md exactly. search_volume/
-- keyword_difficulty/cpc are nullable and MUST stay null when no real
-- source backs them — see config/seo-rules.md's "never invent" rule; the
-- application layer must not write a guessed number here.
-- ==========================================================================
create table keywords (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  cluster_id uuid references keyword_clusters(id) on delete set null,
  keyword text not null,
  -- Primary/Secondary/Long-tail/Commercial/Transactional/Informational/
  -- Local/Branded/Question-based — a keyword can carry more than one.
  categories text[] not null default '{}',
  search_intent text,
  search_volume int,
  keyword_difficulty numeric,
  cpc numeric,
  serp_characteristics text,
  competition text,
  business_value text,
  target_page_id uuid references pages(id) on delete set null,
  content_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, keyword)
);

-- ==========================================================================
-- competitors
-- One row per named competitor from ../config/competitors.md. Columns
-- mirror skills/competitor-analysis/SKILL.md's profile-fields table.
-- ranking_keywords/backlink_profile stay null until a real rank-tracking
-- or backlink tool is connected — never filled with a guess.
-- ==========================================================================
create table competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  website_id uuid references websites(id) on delete set null,
  name text not null,
  domain text not null,
  main_services text[],
  ranking_keywords text[],
  content_topics text[],
  top_pages text[],
  backlink_profile jsonb,
  content_gaps text,
  keyword_gaps text,
  ux_strengths text,
  ux_weaknesses text,
  seo_weaknesses text,
  markvoro_opportunity text,
  last_analyzed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (project_id, domain)
);

-- ==========================================================================
-- seo_issues
-- Every finding any skill produces, in the Issue Format from
-- ../config/seo-rules.md. impact/implementation_instructions/
-- validation_method are included alongside the originally-specified
-- columns because the Issue Format requires all seven fields — without
-- them this table can't fully replace the Markdown findings it tracks.
-- ==========================================================================
create table seo_issues (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  page_id uuid references pages(id) on delete set null,
  url text not null,
  issue text not null,
  -- which skill found it: technical-seo, on-page-seo, content-seo,
  -- local-seo, schema, pagespeed, internal-linking, competitor-analysis
  category text not null,
  severity text not null check (severity in ('Critical', 'High', 'Medium', 'Low')),
  evidence text not null,
  impact text,
  recommendation text not null,
  implementation_instructions text,
  validation_method text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'fixed', 'wont_fix')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- ==========================================================================
-- seo_tasks
-- Actionable work items derived from an issue, tracked through
-- ../config/guardrails.md's "Code changes" branch/PR/approval procedure.
-- ==========================================================================
create table seo_tasks (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references seo_issues(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'pr_open', 'approved', 'done', 'rejected')),
  priority text check (priority in ('Critical', 'High', 'Medium', 'Low')),
  branch_name text,
  pr_url text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ==========================================================================
-- content_briefs
-- One row per planned content piece. Columns mirror the brief template in
-- skills/content-seo/SKILL.md exactly.
-- ==========================================================================
create table content_briefs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  keyword_id uuid references keywords(id) on delete set null,
  search_intent text,
  target_audience text,
  recommended_url text,
  title text,
  h1 text,
  outline text,
  questions_to_answer text[],
  entities_topics text[],
  internal_links text[],
  external_references text[],
  cta text,
  schema_type text, -- which lib/seo.ts helper applies, e.g. blogPostingJsonLd
  word_count_guidance text,
  status text not null default 'draft' check (status in ('draft', 'approved', 'written', 'published')),
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- content
-- Published/live content pieces, once a brief becomes real content.
-- ==========================================================================
create table content (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  brief_id uuid references content_briefs(id) on delete set null,
  page_id uuid references pages(id) on delete set null,
  title text not null,
  slug text,
  content_type text, -- service page, blog post, landing page, FAQ entry
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- rankings
-- Point-in-time keyword position checks — from npm run gsc (source='gsc')
-- or manually supplied by the user (source='manual'; see
-- data/keywords/2026-09-13-keywords.md for a real example of the latter).
-- ==========================================================================
create table rankings (
  id uuid primary key default gen_random_uuid(),
  keyword_id uuid not null references keywords(id) on delete cascade,
  page_id uuid references pages(id) on delete set null,
  position numeric,
  source text not null check (source in ('gsc', 'manual', 'other')),
  checked_at timestamptz not null default now()
);

-- ==========================================================================
-- gsc_data
-- Raw rows from scripts/gsc/fetch-search-console.mjs — mirrors that
-- script's output (query/page/country/device/search_appearance +
-- clicks/impressions/ctr/position), plus period for --compare runs.
-- ==========================================================================
create table gsc_data (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  period text, -- 'lastPeriod'/'previousPeriod' for --compare runs, null otherwise
  query text,
  page text,
  country text,
  device text,
  search_appearance text,
  clicks int,
  impressions int,
  ctr numeric,
  position numeric,
  fetched_at timestamptz not null default now()
);

-- ==========================================================================
-- ga4_data
-- Raw rows from scripts/ga4/fetch-ga4.mjs — mirrors that script's output,
-- always pre-filtered to the Organic Search channel.
-- ==========================================================================
create table ga4_data (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  period text, -- 'lastPeriod'/'previousPeriod' for --compare runs, null otherwise
  landing_page text,
  country text,
  device text,
  traffic_source text,
  organic_users int,
  organic_sessions int,
  engaged_sessions int,
  engagement_rate numeric,
  conversions numeric,
  fetched_at timestamptz not null default now()
);

-- ==========================================================================
-- backlinks
-- No backlink-data source is wired up yet (see skills/schema/SKILL.md and
-- competitors.backlink_profile above) — this table stays empty until a
-- real backlink tool is connected. Never populate it with invented data.
-- ==========================================================================
create table backlinks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  source_url text not null,
  target_url text not null,
  anchor_text text,
  domain_authority numeric,
  discovered_at timestamptz,
  lost_at timestamptz,
  status text default 'active' check (status in ('active', 'lost')),
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- reports
-- Output of skills/reporting/SKILL.md — weekly-monitor / monthly-report.
-- ==========================================================================
create table reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  report_type text not null check (report_type in ('weekly', 'monthly')),
  period_start date not null,
  period_end date not null,
  file_path text, -- e.g. data/reports/<date>-report.md, if also kept as a file
  content text,   -- full report body, if stored directly
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- agent_runs
-- Audit trail: one row per workflow run (full-audit, weekly-monitor,
-- keyword-research, etc.) so the agent can answer "when did we last check
-- this" without re-reading every file in data/ — e.g. "this problem was
-- identified last month and has now been fixed" via seo_issues.status.
-- ==========================================================================
create table agent_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  -- full-audit, weekly-monitor, monthly-report, keyword-research,
  -- optimize-page, content-plan
  workflow_name text not null,
  status text not null default 'running' check (status in ('running', 'completed', 'failed')),
  summary text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

-- Indexes for the lookups every skill/workflow does repeatedly.
create index on pages (website_id);
create index on keywords (project_id);
create index on keywords (target_page_id);
create index on seo_issues (project_id, status);
create index on seo_issues (page_id);
create index on rankings (keyword_id, checked_at desc);
create index on gsc_data (project_id, period_start, period_end);
create index on ga4_data (project_id, period_start, period_end);
create index on agent_runs (project_id, workflow_name, started_at desc);
