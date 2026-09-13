// Pulls Search Console performance for the keyword-research and reporting
// skills: queries, pages, countries, and devices in one combined report,
// plus search-appearance types in a separate report (the Search Console
// API rejects combining the searchAppearance dimension with others).
// Metrics on every row: clicks, impressions, CTR, average position.
// Requires GOOGLE_APPLICATION_CREDENTIALS (a service account with
// access to the property) and GSC_SITE_URL in .env — see ../../.env.example.
//
// Usage:
//   npm run gsc                    # last 28 days, single period
//   npm run gsc -- --compare       # last 7 days vs. previous 7 days
//                                   # (weekly-monitor's regression check)
//   npm run gsc -- --compare=28    # last 28 days vs. previous 28 days
//                                   # (monthly-report's period-over-period)

import "dotenv/config";
import { google } from "googleapis";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "keywords");

const compareArg = process.argv.find((a) => a === "--compare" || a.startsWith("--compare="));
const compare = Boolean(compareArg);
const compareDays = compareArg?.includes("=") ? Number(compareArg.split("=")[1]) : 7;
if (compare && (!Number.isInteger(compareDays) || compareDays < 1)) {
  console.error(`--compare period must be a positive integer of days, got "${compareArg}".`);
  process.exit(1);
}

const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) {
  console.error("GSC_SITE_URL is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}

const fmt = (d) => d.toISOString().slice(0, 10);

async function queryAnalytics(searchconsole, startDate, endDate, dimensions) {
  const { data } = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit: 5000 },
  });
  return data.rows ?? [];
}

async function fetchPeriod(searchconsole, start, end, extra) {
  // query/page/country/device can be combined in one request.
  const mainRows = await queryAnalytics(searchconsole, start, end, [
    "query",
    "page",
    "country",
    "device",
  ]);
  const rows = mainRows.map((row) => ({
    ...extra,
    query: row.keys?.[0],
    page: row.keys?.[1],
    country: row.keys?.[2],
    device: row.keys?.[3],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  // searchAppearance cannot be combined with other dimensions — separate call.
  const appearanceRows = await queryAnalytics(searchconsole, start, end, ["searchAppearance"]);
  const searchAppearance = appearanceRows.map((row) => ({
    ...extra,
    searchAppearance: row.keys?.[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  return { rows, searchAppearance };
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const today = new Date();

  if (compare) {
    const daysAgo = (n) => {
      const d = new Date(today);
      d.setDate(d.getDate() - n);
      return d;
    };
    const lastStart = fmt(daysAgo(compareDays));
    const lastEnd = fmt(today);
    const prevStart = fmt(daysAgo(compareDays * 2));
    const prevEnd = fmt(daysAgo(compareDays + 1));

    const last = await fetchPeriod(searchconsole, lastStart, lastEnd, { period: "lastPeriod" });
    const previous = await fetchPeriod(searchconsole, prevStart, prevEnd, {
      period: "previousPeriod",
    });

    await mkdir(DATA_DIR, { recursive: true });
    const date = fmt(today);
    const outPath = path.join(DATA_DIR, `${date}-gsc-compare-${compareDays}d.json`);
    await writeFile(
      outPath,
      JSON.stringify(
        {
          siteUrl,
          periodDays: compareDays,
          periods: {
            lastPeriod: { start: lastStart, end: lastEnd },
            previousPeriod: { start: prevStart, end: prevEnd },
          },
          rows: [...last.rows, ...previous.rows],
          searchAppearance: [...last.searchAppearance, ...previous.searchAppearance],
        },
        null,
        2
      )
    );
    console.log(
      `Wrote ${last.rows.length + previous.rows.length} row(s) (last ${compareDays} days vs. previous ${compareDays} days) to ${outPath}`
    );
    return;
  }

  const endDate = today;
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 28);
  const start = fmt(startDate);
  const end = fmt(endDate);

  const { rows, searchAppearance } = await fetchPeriod(searchconsole, start, end, {});

  await mkdir(DATA_DIR, { recursive: true });
  const date = end;
  const outPath = path.join(DATA_DIR, `${date}-gsc.json`);
  await writeFile(
    outPath,
    JSON.stringify({ siteUrl, range: { start, end }, rows, searchAppearance }, null, 2)
  );
  console.log(`Wrote ${rows.length} row(s) and ${searchAppearance.length} search-appearance row(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
