// Pulls GA4 organic-traffic data by landing page for the reporting skill's
// "Organic Traffic" / "Top Pages" sections. Requires
// GOOGLE_APPLICATION_CREDENTIALS and GA4_PROPERTY_ID in .env — see
// ../../.env.example.
//
// Usage: npm run ga4

import "dotenv/config";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "reports");

const propertyId = process.env.GA4_PROPERTY_ID;
if (!propertyId) {
  console.error("GA4_PROPERTY_ID is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}

async function main() {
  const client = new BetaAnalyticsDataClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
    dimensions: [{ name: "landingPagePlusQueryString" }, { name: "sessionDefaultChannelGroup" }],
    metrics: [
      { name: "sessions" },
      { name: "engagedSessions" },
      { name: "conversions" },
      { name: "engagementRate" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "sessionDefaultChannelGroup",
        stringFilter: { value: "Organic Search" },
      },
    },
    limit: 1000,
  });

  const rows = (response.rows ?? []).map((row) => ({
    landingPage: row.dimensionValues?.[0]?.value,
    channel: row.dimensionValues?.[1]?.value,
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
    engagedSessions: Number(row.metricValues?.[1]?.value ?? 0),
    conversions: Number(row.metricValues?.[2]?.value ?? 0),
    engagementRate: Number(row.metricValues?.[3]?.value ?? 0),
  }));

  await mkdir(DATA_DIR, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const outPath = path.join(DATA_DIR, `${date}-ga4.json`);
  await writeFile(outPath, JSON.stringify({ propertyId, range: "28daysAgo:today", rows }, null, 2));
  console.log(`Wrote ${rows.length} row(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
