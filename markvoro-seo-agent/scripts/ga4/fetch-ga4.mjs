// Pulls GA4 organic-traffic data (users, sessions, engagement, conversions)
// broken down by landing page, country, device, and traffic source — for
// the reporting skill's "Organic Traffic" / "Top Pages" sections. All rows
// are pre-filtered to the Organic Search channel, so "sessions"/"users"
// here mean organic sessions/organic users. Requires
// GOOGLE_APPLICATION_CREDENTIALS and GA4_PROPERTY_ID in .env — see
// ../../.env.example.
//
// Usage:
//   npm run ga4                    # last 28 days, single period
//   npm run ga4 -- --compare       # last 7 days vs. previous 7 days
//                                   # (weekly-monitor's regression check)
//   npm run ga4 -- --compare=28    # last 28 days vs. previous 28 days
//                                   # (monthly-report's period-over-period)

import "dotenv/config";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data", "reports");

const compareArg = process.argv.find((a) => a === "--compare" || a.startsWith("--compare="));
const compare = Boolean(compareArg);
const compareDays = compareArg?.includes("=") ? Number(compareArg.split("=")[1]) : 7;
if (compare && (!Number.isInteger(compareDays) || compareDays < 1)) {
  console.error(`--compare period must be a positive integer of days, got "${compareArg}".`);
  process.exit(1);
}

const propertyId = process.env.GA4_PROPERTY_ID;
if (!propertyId) {
  console.error("GA4_PROPERTY_ID is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS is not set — see .env.example. Nothing to fetch.");
  process.exit(1);
}

const DIMENSIONS = [
  { name: "landingPagePlusQueryString" },
  { name: "country" },
  { name: "deviceCategory" },
  { name: "sessionSource" },
];
const METRICS = [
  { name: "totalUsers" },
  { name: "sessions" },
  { name: "engagedSessions" },
  { name: "engagementRate" },
  { name: "conversions" },
];
const ORGANIC_FILTER = {
  filter: {
    fieldName: "sessionDefaultChannelGroup",
    stringFilter: { value: "Organic Search" },
  },
};

function rowToRecord(row, extra) {
  return {
    ...extra,
    landingPage: row.dimensionValues?.[0]?.value,
    country: row.dimensionValues?.[1]?.value,
    device: row.dimensionValues?.[2]?.value,
    trafficSource: row.dimensionValues?.[3]?.value,
    organicUsers: Number(row.metricValues?.[0]?.value ?? 0),
    organicSessions: Number(row.metricValues?.[1]?.value ?? 0),
    engagedSessions: Number(row.metricValues?.[2]?.value ?? 0),
    engagementRate: Number(row.metricValues?.[3]?.value ?? 0),
    conversions: Number(row.metricValues?.[4]?.value ?? 0),
  };
}

async function runSinglePeriod(client) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
    dimensions: DIMENSIONS,
    metrics: METRICS,
    dimensionFilter: ORGANIC_FILTER,
    limit: 5000,
  });
  return (response.rows ?? []).map((row) => rowToRecord(row));
}

async function runComparePeriods(client, days) {
  // Two named ranges in one request — GA4 appends an implicit "dateRange"
  // dimension (values "date_range_0"/"date_range_1", in request order)
  // after the requested dimensions, so both periods come back pre-aligned
  // for a like-for-like diff instead of two separate report shapes. This
  // implicit dimension must NOT also be listed in `dimensions` — the API
  // rejects that with "Field dateRange is not a dimension".
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      { startDate: `${days}daysAgo`, endDate: "today", name: "lastPeriod" },
      { startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo`, name: "previousPeriod" },
    ],
    dimensions: DIMENSIONS,
    metrics: METRICS,
    dimensionFilter: ORGANIC_FILTER,
    limit: 5000,
  });

  return (response.rows ?? []).map((row) => {
    const periodValue = row.dimensionValues?.[DIMENSIONS.length]?.value;
    const period = periodValue === "date_range_0" ? "lastPeriod" : "previousPeriod";
    return rowToRecord(row, { period });
  });
}

async function main() {
  const client = new BetaAnalyticsDataClient();
  const date = new Date().toISOString().slice(0, 10);

  if (compare) {
    const rows = await runComparePeriods(client, compareDays);
    const outPath = path.join(DATA_DIR, `${date}-ga4-compare-${compareDays}d.json`);
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(
      outPath,
      JSON.stringify(
        {
          propertyId,
          channel: "Organic Search",
          periodDays: compareDays,
          periods: {
            lastPeriod: `${compareDays}daysAgo:today`,
            previousPeriod: `${compareDays * 2}daysAgo:${compareDays + 1}daysAgo`,
          },
          rows,
        },
        null,
        2
      )
    );
    console.log(
      `Wrote ${rows.length} row(s) (last ${compareDays} days vs. previous ${compareDays} days) to ${outPath}`
    );
    return;
  }

  const rows = await runSinglePeriod(client);
  await mkdir(DATA_DIR, { recursive: true });
  const outPath = path.join(DATA_DIR, `${date}-ga4.json`);
  await writeFile(
    outPath,
    JSON.stringify(
      { propertyId, range: "28daysAgo:today", channel: "Organic Search", rows },
      null,
      2
    )
  );
  console.log(`Wrote ${rows.length} row(s) to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
