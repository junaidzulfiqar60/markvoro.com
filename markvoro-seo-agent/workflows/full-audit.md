# Full SEO Audit

The canonical end-to-end SEO workflow for MARKVORO. Read
[../config/guardrails.md](../config/guardrails.md) before starting —
nothing here authorizes publishing, deploying, or deleting anything
without explicit approval. This workflow produces an audit and a
roadmap; implementing any fix is a separate step (see the end of this
file).

## Input

Website URL. Defaults to `https://www.markvoro.com`
(`CRAWL_BASE_URL` in `.env`); pass `--url=<url>` to `npm run crawl` to
audit a different site (e.g. a competitor, via
[competitor-analysis](../skills/competitor-analysis/SKILL.md)).

## Steps

1. **Crawl website** — `npm run crawl` (or `-- --url=<url>` for the input
   above). Every step below reads this one run's output.
2. **Collect all accessible URLs** — the sitemap-derived URL list `npm run
   crawl` already resolves and crawls (falls back to the homepage alone if
   no sitemap is reachable).
3. **Check HTTP status codes** — each page's `status` field from the
   crawl. [technical-seo](../skills/technical-seo/SKILL.md).
4. **Check indexability** — each page's `isIndexable`/`blockedByRobots`/
   `metaRobots` fields (computed from status, `noindex`, robots.txt, and
   non-self canonical). [technical-seo](../skills/technical-seo/SKILL.md).
5. **Check robots.txt** — the crawl's `robotsTxt` block (fetched content
   + parsed `Disallow` rules). [technical-seo](../skills/technical-seo/SKILL.md).
6. **Check sitemap** — `../app/sitemap.ts` output vs. what actually got
   crawled; per `../config/seo-rules.md`, the sitemap should contain only
   indexable, canonical URLs. [technical-seo](../skills/technical-seo/SKILL.md).
7. **Analyze titles** — `title`/`titleLength` per page.
   [on-page-seo](../skills/on-page-seo/SKILL.md).
8. **Analyze meta descriptions** — `metaDescription`/
   `metaDescriptionLength` per page. [on-page-seo](../skills/on-page-seo/SKILL.md).
9. **Analyze headings** — `h1Count`/`h1s` per page.
   [on-page-seo](../skills/on-page-seo/SKILL.md).
10. **Analyze canonical URLs** — `canonical` per page, cross-checked
    against step 4's indexability. [technical-seo](../skills/technical-seo/SKILL.md).
11. **Analyze internal links** — `internalLinkCount`/`isOrphan` per page.
    [internal-linking](../skills/internal-linking/SKILL.md).
12. **Analyze schema** — `schemaTypes` found per page, checked against the
    required-types table in [schema](../skills/schema/SKILL.md).
13. **Analyze images** — `imageCount`/`imagesMissingAltCount` per page.
    [on-page-seo](../skills/on-page-seo/SKILL.md).
14. **Analyze page speed** — `npm run pagespeed` on the homepage + top
    pages. [pagespeed](../skills/pagespeed/SKILL.md).
15. **Analyze content quality** — `wordCount` per page as a structural
    proxy, plus freshness/E-E-A-T/duplication review.
    [content-seo](../skills/content-seo/SKILL.md).
16. **Research target keywords** — `npm run gsc` (or `-- --compare=28` if
    this audit runs alongside a `monthly-report`).
    [keyword-research](../skills/keyword-research/SKILL.md).
17. **Analyze competitors** — [competitor-analysis](../skills/competitor-analysis/SKILL.md),
    crawling each domain in `../config/competitors.md` with the same `npm
    run crawl -- --url=`. Skip with a note if that file is still empty —
    never invent a competitor.
18. **Compare keyword gaps** — cross-reference step 16's keyword clusters
    against step 17's competitor coverage and step 15's content review.
19. **Create prioritized issues** — merge every finding from steps 3–18
    into the Issue Format (`../config/seo-rules.md`), sorted by Priority.
20. **Create SEO roadmap** — group step 19's issues into a 30/60/90-day
    plan (see Output below), sequenced by Priority and by realistic effort
    (a Critical fix that's a one-line change comes before a Medium one
    that needs a new page built).

## Output

Write `../data/reports/<date>-full-audit.md` with these sections, in
order:

1. **Executive summary** — what changed since the last full-audit (if
   any), and the two or three things that matter most this cycle.
2. **Technical score** — the share of crawled pages passing the
   technical-seo checklist (status 200, indexable, no robots.txt block,
   correct canonical, present in sitemap). State it as `<pass>/<total>
   pages (<percent>%)`, never a bare score with no basis — this is this
   agent's own checklist pass rate, not an external tool's authority
   score.
3. **On-page score** — same approach for the on-page-seo checklist
   (title/meta within length limits, exactly one H1, alt text on
   non-decorative images).
4. **Content score** — same approach for content-seo's checks that are
   actually measurable structurally (meets a reasonable word-count floor
   for its content type, no duplicate title/H1 across pages); qualitative
   items (E-E-A-T, freshness) are reported as findings, not folded into
   the number.
5. **Keyword opportunities** — from step 16/18, keywords with real
   search-console signal (impressions/position) and no matching page, or
   a page ranking below page 1 for a keyword it should own.
6. **Competitor gaps** — from step 17/18, framed as opportunities per
   [competitor-analysis](../skills/competitor-analysis/SKILL.md)'s output
   convention (never a competitor teardown for its own sake).
7. **Critical issues** — every Priority: Critical finding from step 19,
   in full Issue Format.
8. **Recommended fixes** — the rest of step 19's findings, High → Low.
9. **Content roadmap** — from step 20, which pieces/refreshes to write
   and in what order — feeds [content-plan](content-plan.md) if the user
   wants to run it next.
10. **30/60/90-day plan** — step 20's issues and roadmap items grouped
    into three horizons. 30 days: Critical/High issues fixable now. 60
    days: Medium issues plus the highest-priority content roadmap items.
    90 days: the rest, plus anything gated on something outside this
    agent's control (e.g. waiting on real backlink/volume data).

## After this workflow

This workflow ends at the roadmap — it does not implement anything.
Turning an approved item into an actual code change follows
[optimize-page.md](optimize-page.md) (on-page fixes) or
[content-plan.md](content-plan.md) (new/refreshed content), each gated by
the "Code changes" procedure in
[../config/guardrails.md](../config/guardrails.md) (branch → PR → human
approval). [weekly-monitor.md](weekly-monitor.md) then watches that
nothing regresses and tracks any measurable movement.
