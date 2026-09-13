# Guardrails

Safety rules for this agent. These override any workflow step that seems to
suggest otherwise.

## Never

- Delete pages automatically.
- Delete content automatically.
- Change live URLs/slugs without explicit user approval (and a redirect
  plan — see `../config/seo-rules.md`).
- Create mass doorway pages (near-duplicate pages targeting minor keyword
  variants).
- Keyword stuff.
- Generate spam or low-value filler content.
- Buy backlinks, or recommend doing so.
- Create fake reviews, testimonials, or case studies. Content in
  `../lib/data.ts`'s testimonials and portfolio must be real.
- Attempt to manipulate rankings outside legitimate on-site/content/
  technical SEO (e.g. link schemes, cloaking, hidden text).
- Publish, post, or deploy anything automatically without explicit
  approval — this includes submitting URLs/sitemaps to Search Console,
  Google Business Profile changes, and any write action against a
  third-party API.
- Deploy destructive or unreviewed changes to production.
- Fabricate search volume, rankings, traffic, or backlink data — see the
  measured-vs-assumption rule in `../config/seo-rules.md`. If a workflow
  can't get real data (missing API credentials, empty
  `../config/competitors.md`), stop and say so rather than filling the gap
  with invented numbers.

## What can change automatically vs. what needs approval

This is the permission ceiling — the outermost boundary of what this agent
may ever do without a human in the loop. Individual workflows are free to
be *stricter* than this (e.g.
[optimize-page.md](../workflows/optimize-page.md) currently pauses for
approval before touching `../app`/`../lib`/`../components` at all, which is
a tighter house policy layered on top of this baseline, not a
contradiction of it).

**Automatically allowed** (still via the branch → PR → human-approval-
before-merge procedure below — "automatic" means Claude can propose these
without a separate go-ahead to start, not that they skip review):

- SEO metadata (titles, meta descriptions)
- `../app/robots.ts`
- `../app/sitemap.ts`
- Structured data / schema
- Alt text
- Internal links
- SEO documentation (this agent's own `skills/`/`workflows/`/`config/`
  files)
- Content drafts (not publishing them)
- GitHub branches
- SEO reports (`data/reports/`)

**Approval required** (stop and ask before doing any of this, not just
before merging):

- URL/slug changes
- Redirects
- Page deletion
- Major content rewrites
- Navigation changes
- Database changes
- Production deployment

**Never automatically** — see the "Never" list above; those items aren't
gated by approval, they're simply not something this agent does.

## Code changes

When a recommendation requires changing site code (`../app`, `../lib`,
`../components`):

1. Inspect the current implementation first — don't propose a fix without
   reading the actual file.
2. Explain the problem in the Issue Format (`../config/seo-rules.md`).
3. Make the smallest safe change that fixes it — no unrelated refactors.
4. Run validation relevant to the change (lint/build/typecheck as
   applicable — see `../README.md`/`../package.json` in the main repo).
5. Check the build succeeds.
6. Check the routes affected by the change still render correctly.
7. Put the change on a branch and open a PR — never commit directly to the
   production branch.
8. Wait for explicit human approval before that PR is merged or deployed.
   Never merge or trigger a production deploy yourself.

## GitHub permissions

The explicit permission model for this agent's access to the main
MARKVORO repository — the human-approval gate the "Code changes"
procedure above implements:

**Can do:**

- Read the repository
- Analyze code
- Create a branch
- Modify SEO-related files (on that branch, per the "Code changes"
  procedure above)
- Create a pull request
- Run tests
- Run a build
- Analyze errors

**Cannot do, under any circumstance, without a separate explicit
instruction from the user at the time:**

- Delete the repository
- Merge a PR into the production branch
- Deploy to production automatically
- Delete major pages
- Change DNS

If a task seems to require one of the "cannot" actions, stop and tell the
user it needs to be done by them (or with their explicit, in-the-moment
approval) instead of finding a workaround.

## Data handling

- Credentials for Search Console / GA4 / PageSpeed Insights / Supabase
  live only in `.env` (git-ignored). Never print them into a report or
  commit them.
- `data/` holds real business data (queries, traffic, competitor info).
  It's git-ignored by default — if the user wants to commit some of it,
  check contents for anything sensitive first.
- Crawling: respect `robots.txt` and reasonable rate limits, both for
  markvoro.com and for any competitor site named in
  `../config/competitors.md`. Never crawl a competitor's site aggressively
  enough that it could look like abuse.
