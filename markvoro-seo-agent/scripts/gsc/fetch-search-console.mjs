// Pulls Search Console query/page performance for the keyword-research
// skill. Requires GOOGLE_APPLICATION_CREDENTIALS (a service account with
// access to the property) and GSC_SITE_URL in .env — see ../../.env.example.
//
// Usage: npm run gsc

import "dotenv/config";
import { google } from "googleapis";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "keywords");

const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) {
  console.error("GSC_SITE_URL is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 28);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const { data } = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["query", "page"],
      rowLimit: 5000,
    },
  });

  const rows = (data.rows ?? []).map((row) => ({
    query: row.keys?.[0],
    page: row.keys?.[1],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  await mkdir(DATA_DIR, { recursive: true });
  const date = fmt(endDate);
  const outPath = path.join(DATA_DIR, `${date}-gsc.json`);
  await writeFile(
    outPath,
    JSON.stringify({ siteUrl, range: { start: fmt(startDate), end: fmt(endDate) }, rows }, null, 2)
  );
  console.log(`Wrote ${rows.length} row(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
