# Optimize Page

For improving one specific existing page (a service page, the homepage, a
blog post) rather than running a full audit.

## Steps

1. Identify the target page and its intended keyword cluster — pull from
   the latest `../data/keywords/` output, or run
   [keyword-research](keyword-research.md) first if none is fresh.
2. Run against that page:
   - [on-page-seo](../skills/on-page-seo/SKILL.md) — title, meta,
     headings, slug, alt text, keyword placement.
   - [content-seo](../skills/content-seo/SKILL.md) — depth vs. intent,
     E-E-A-T, freshness.
   - [schema](../skills/schema/SKILL.md) — is the right structured data
     present.
   - [internal-linking](../skills/internal-linking/SKILL.md) — inbound/
     outbound links for this page.
3. Merge into one proposal for this page, each finding in the Issue Format
   (`../config/seo-rules.md`), sorted by Priority.
4. **Stop for approval.** Present the proposal; do not touch
   `../app`/`../lib`/`../components` until the user approves specific
   items.
5. Once approved, implement via the "Code changes" procedure in
   [../config/guardrails.md](../config/guardrails.md) — smallest safe
   change, branch, PR, wait for human approval before merge/deploy.
6. Validate each change using its Validation Method.

## Output

`../data/audits/<date>-onpage-<page>.md` (and the corresponding
`-content-`/`-schema-`/`-internal-linking-` files if those skills ran).
