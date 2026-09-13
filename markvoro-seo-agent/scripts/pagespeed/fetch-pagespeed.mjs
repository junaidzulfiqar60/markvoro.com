// Runs Google PageSpeed Insights (mobile + desktop) for each URL in
// PAGESPEED_URLS, for the pagespeed skill. PAGESPEED_API_KEY is optional
// but recommended — see ../../.env.example.
//
// Usage: npm run pagespeed

import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "audits");

const urls = (process.env.PAGESPEED_URLS ?? "https://www.markvoro.com")
  .split(",")
  .map((u) => u.trim())
  .filter(Boolean);
const apiKey = process.env.PAGESPEED_API_KEY;
const strategies = ["mobile", "desktop"];
const categories = ["performance", "seo", "accessibility", "best-practices"];

function extractMetrics(result) {
  const audits = result?.lighthouseResult?.audits ?? {};
  const categoriesScore = result?.lighthouseResult?.categories ?? {};
  return {
    scores: Object.fromEntries(
      Object.entries(categoriesScore).map(([key, val]) => [key, val.score])
    ),
    coreWebVitals: {
      lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
      cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
      inp: audits["interaction-to-next-paint"]?.displayValue ?? null,
      tbt: audits["total-blocking-time"]?.displayValue ?? null,
    },
    opportunities: Object.values(audits)
      .filter((a) => a.details?.type === "opportunity" && a.score !== null && a.score < 1)
      .map((a) => ({ id: a.id, title: a.title, displayValue: a.displayValue })),
  };
}

async function runOne(url, strategy) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  for (const c of categories) endpoint.searchParams.append("category", c);
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  const res = await fetch(endpoint.toString());
  if (!res.ok) {
    return { url, strategy, error: `PageSpeed API returned ${res.status}` };
  }
  const json = await res.json();
  return { url, strategy, ...extractMetrics(json) };
}

async function main() {
  if (!apiKey) {
    console.warn("PAGESPEED_API_KEY is not set — requests will run at the low unauthenticated quota.");
  }

  const results = [];
  for (const url of urls) {
    for (const strategy of strategies) {
      console.log(`Running PageSpeed Insights: ${url} (${strategy}) ...`);
      results.push(await runOne(url, strategy));
    }
  }

  await mkdir(DATA_DIR, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const outPath = path.join(DATA_DIR, `${date}-pagespeed.json`);
  await writeFile(outPath, JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2));
  console.log(`Wrote ${results.length} result(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
