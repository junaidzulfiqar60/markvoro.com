// Crawls a site's sitemap and reports per-page technical/on-page facts,
// plus a site-level robots.txt check. Used by the technical-seo,
// on-page-seo, internal-linking, schema, content-seo, and
// competitor-analysis skills, and by workflows/full-audit.md steps 2-7 and
// 11-13, 15. See ../../CLAUDE.md.
//
// Usage:
//   npm run crawl                       # crawls CRAWL_BASE_URL from .env
//   npm run crawl -- --url=https://competitor.com

import "dotenv/config";
import * as cheerio from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "audits");

const urlArg = process.argv.find((a) => a.startsWith("--url="));
const baseUrl = (urlArg ? urlArg.slice("--url=".length) : process.env.CRAWL_BASE_URL) ??
  "https://www.markvoro.com";
const origin = new URL(baseUrl).origin;

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "markvoro-seo-agent/0.1 (+https://www.markvoro.com)" } });
  return { status: res.status, ok: res.ok, text: res.ok ? await res.text() : "" };
}

async function getRobotsTxt() {
  const robotsUrl = new URL("/robots.txt", origin).toString();
  const { status, ok, text } = await fetchText(robotsUrl);
  if (!ok) return { url: robotsUrl, status, found: false, disallowedPaths: [] };

  // Simplified parse: collects Disallow paths under any "User-agent: *"
  // group. Doesn't handle Allow overrides, wildcards, or agent-specific
  // groups — good enough to flag an obviously-blocked path, not a
  // replacement for a real robots.txt validator.
  const disallowedPaths = [];
  let inWildcardGroup = false;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.split("#")[0].trim();
    if (!line) continue;
    const [rawField, ...rest] = line.split(":");
    const field = rawField.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (field === "user-agent") {
      inWildcardGroup = value === "*";
    } else if (field === "disallow" && inWildcardGroup && value) {
      disallowedPaths.push(value);
    }
  }
  return { url: robotsUrl, status, found: true, disallowedPaths };
}

function isDisallowedByRobots(url, disallowedPaths) {
  const pathname = new URL(url).pathname;
  return disallowedPaths.some((rule) => pathname.startsWith(rule));
}

async function getSitemapUrls() {
  const candidates = [new URL("/sitemap.xml", origin).toString()];
  for (const sitemapUrl of candidates) {
    const { ok, text } = await fetchText(sitemapUrl);
    if (!ok) continue;
    const $ = cheerio.load(text, { xmlMode: true });
    const urls = $("url > loc").map((_, el) => $(el).text().trim()).get();
    if (urls.length) return urls;
  }
  // Fall back to just the homepage if no sitemap is reachable.
  return [origin + "/"];
}

async function crawlPage(url) {
  const { status, ok, text } = await fetchText(url);
  if (!ok) return { url, status, error: `fetch failed with status ${status}` };

  const $ = cheerio.load(text);
  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() ?? null;
  const canonical = $('link[rel="canonical"]').attr("href") ?? null;
  const metaRobots = $('meta[name="robots"]').attr("content")?.trim().toLowerCase() ?? null;
  const h1s = $("h1").map((_, el) => $(el).text().trim()).get();
  const imagesMissingAlt = $("img")
    .filter((_, el) => !$(el).attr("alt")?.trim())
    .map((_, el) => $(el).attr("src") ?? "(no src)")
    .get();
  const imageCount = $("img").length;
  const internalLinks = $("a[href]")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter((href) => href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:"))
    .map((href) => {
      try {
        return new URL(href, url).toString();
      } catch {
        return null;
      }
    })
    .filter((abs) => abs && new URL(abs).origin === origin);

  // JSON-LD types present, for the schema skill — collects "@type" from
  // every ld+json block, including nested @graph arrays. Malformed JSON is
  // skipped rather than failing the whole page crawl.
  const schemaTypes = new Set();
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).contents().text());
      const nodes = Array.isArray(parsed) ? parsed : parsed["@graph"] ? parsed["@graph"] : [parsed];
      for (const node of nodes) {
        const type = node?.["@type"];
        if (Array.isArray(type)) type.forEach((t) => schemaTypes.add(t));
        else if (type) schemaTypes.add(type);
      }
    } catch {
      // malformed JSON-LD is itself a finding for the schema skill to raise
    }
  });

  // Rough word count from visible body text — a structural proxy for
  // content-seo's depth-vs-intent check, not a quality judgment on its own.
  const bodyText = $("body").clone().find("script, style, noscript").remove().end().text();
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  return {
    url,
    status,
    title,
    titleLength: title.length,
    metaDescription,
    metaDescriptionLength: metaDescription?.length ?? 0,
    canonical,
    metaRobots,
    h1Count: h1s.length,
    h1s,
    imageCount,
    imagesMissingAltCount: imagesMissingAlt.length,
    imagesMissingAlt,
    internalLinkCount: internalLinks.length,
    internalLinks,
    schemaTypes: [...schemaTypes],
    wordCount,
  };
}

async function main() {
  const robotsTxt = await getRobotsTxt();
  const urls = await getSitemapUrls();
  console.log(`Crawling ${urls.length} URL(s) from ${origin} ...`);

  const pages = [];
  for (const url of urls) {
    try {
      pages.push(await crawlPage(url));
    } catch (err) {
      pages.push({ url, error: String(err) });
    }
  }

  // Orphan detection: pages never linked to internally by any other crawled
  // page. Normalize via `new URL(...).toString()` so a bare origin (from the
  // sitemap) matches a link resolved to "origin/" — otherwise the homepage
  // false-positives as an orphan.
  const normalize = (u) => new URL(u).toString();
  const linkedTo = new Set(pages.flatMap((p) => (p.internalLinks ?? []).map(normalize)));
  const homepage = normalize(origin);
  for (const page of pages) {
    page.isOrphan = !linkedTo.has(normalize(page.url)) && normalize(page.url) !== homepage;

    if (page.error) continue;
    const blockedByRobots = isDisallowedByRobots(page.url, robotsTxt.disallowedPaths);
    const noindex = page.metaRobots?.includes("noindex") ?? false;
    const canonicalizedElsewhere = Boolean(page.canonical) && normalize(page.canonical) !== normalize(page.url);
    page.blockedByRobots = blockedByRobots;
    page.isIndexable = page.status === 200 && !noindex && !blockedByRobots && !canonicalizedElsewhere;
  }

  await mkdir(DATA_DIR, { recursive: true });
  const host = new URL(origin).hostname;
  const date = new Date().toISOString().slice(0, 10);
  const outPath = path.join(DATA_DIR, `${date}-crawl-${host}.json`);
  await writeFile(
    outPath,
    JSON.stringify({ origin, crawledAt: new Date().toISOString(), robotsTxt, pages }, null, 2)
  );
  console.log(`Wrote ${pages.length} page(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
