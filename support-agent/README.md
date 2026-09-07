# MARKVORO AI Customer Support Agent

A separate, multi-tenant product from the markvoro.com marketing site (see
`../CLAUDE.md` for that project). This is the sellable AI support agent
described in the blueprint: NestJS backend, an embeddable web chat widget,
and an admin dashboard. Own database, own deploy, own repo folder.

## What's built

- **Backend** (`backend/`) — NestJS + Prisma + Postgres/pgvector.
  - Multi-tenant data model (`Client`, `AdminUser`, `Customer`, `Conversation`,
    `Message`, `Lead`, `SupportTicket`, `Appointment`,
    `KnowledgeBaseDocument`/`KbChunk`) with row-level tenant scoping enforced
    in every service method.
  - JWT auth with 5 roles (`SUPER_ADMIN`, `CLIENT_ADMIN`, `SUPPORT_MANAGER`,
    `SUPPORT_AGENT`, `SALES_AGENT`).
  - AI orchestrator: provider-agnostic (`AnthropicProvider` default,
    `OpenAiProvider` swappable per-client, and automatically used as a
    resilience fallback if the primary provider errors), RAG over pgvector
    with a keyword-search fallback when no embedding key is set.
  - Six agent tools: `capture_lead`, `handoff_to_human`, `check_availability`
    + `book_appointment` (against a per-client weekly `businessHours` config,
    defaulting to 9–6 if unset), `check_order_status` (pluggable
    `OrderAdapter` — Shopify implemented, gracefully says "not connected" for
    unconfigured clients instead of guessing), `create_support_ticket`.
  - Knowledge base ingestion: paste text/FAQ, or fetch-and-strip a URL.
  - Channels: **Web widget** (fully live) plus **WhatsApp Cloud API /
    Messenger / Instagram** webhook adapters — code-complete (signature
    verification, tenant resolution, send/receive) but need your own Meta
    App credentials to actually go live (see below). Per-client channel
    tokens are encrypted at rest (AES-256-GCM via `ENCRYPTION_KEY`).
- **Widget** (`widget/`) — embeddable chat bubble, built as a single IIFE
  script that mounts into a Shadow DOM so it can't collide with a client
  site's CSS. `<script src=".../widget.js" data-client="<widgetKey>" data-api="...">`.
- **Dashboard** (`dashboard/`) — Vite/React admin app: login, Overview
  (stats incl. open tickets / upcoming appointments), Inbox (live
  conversations, human takeover/return-to-AI), Leads, Tickets, Appointments,
  Knowledge Base, and Settings (connect WhatsApp/Messenger/Instagram
  credentials per client).

## Running it locally

Each app is independent — three terminals (or use the ports below):

```bash
# 1. Backend (port 4000)
cd support-agent/backend
npm install
cp .env.example .env   # fill in DATABASE_URL at minimum
npx prisma migrate dev
npx tsx prisma/seed.ts # creates a Super Admin + a demo "Real Estate" tenant
npm run dev

# 2. Dashboard (port 5174)
cd support-agent/dashboard
npm install
npm run dev

# 3. Widget (port 5173, dev preview only)
cd support-agent/widget
npm install
npm run dev
```

The seed script prints a Super Admin login and a demo Client Admin login
(`admin@demo-realestate.markvoro.com` / `demo-password-123`) plus that demo
client's `widgetKey` — use it to sign into the dashboard and to test the
widget locally (put it in `widget/index.html`'s `data-client` attribute).

> Note: on Windows, `nest start --watch`'s child-process compiler sometimes
> doesn't surface stdout in some shells. If `npm run dev` in `backend/`
> seems to hang with no "listening" log, `npm run build && node dist/src/main.js`
> is a reliable fallback — it's the same app, just without the file watcher.

## What you need to supply to go live

- **`ANTHROPIC_API_KEY`** (backend `.env`) — without it, the agent replies
  with a graceful "not set up yet" fallback instead of crashing.
- **`OPENAI_API_KEY`** (backend `.env`) — used both as the automatic fallback
  chat provider if Anthropic errors, and for knowledge-base embeddings (real
  semantic search). Without it, KB search still works via a keyword-match
  fallback, just less smart.
- **`ENCRYPTION_KEY`** (backend `.env`) — encrypts stored WhatsApp/Messenger/
  Instagram access tokens. Falls back to `AUTH_SECRET` if unset; set a real,
  separate value before any production deploy.
- To go live on **WhatsApp / Messenger / Instagram**: register a Meta App,
  add the WhatsApp/Messenger/Instagram products, set `META_APP_SECRET` and
  `META_VERIFY_TOKEN` in backend `.env`, register these webhook URLs in the
  Meta App dashboard once deployed —
  `https://<your-domain>/api/v1/webhooks/{whatsapp,messenger,instagram}` —
  then connect each client's own phone number / Page / IG account under
  their dashboard's **Settings** page (credentials are entered per-client,
  not app-wide; embedded OAuth signup is a future upgrade, this is manual
  paste-your-token for now).
- To enable `check_order_status` for a client: populate their `Client.orderSystem`
  JSON column (`{"provider":"shopify","shopDomain":"...","accessTokenEnc":"..."}`,
  encrypted the same way channel tokens are) — no dashboard UI for this yet,
  it's a direct DB/API write until a client actually needs it.
- A **production Postgres with the `vector` extension** — the dev database
  provisioned for this (Railway project `markvoro-support-agent`) is a fine
  starting point; a `pgvector/pgvector` image or any Postgres 15+ with the
  extension available works.

## Explicitly out of scope so far (Phase 3, per the blueprint)

- Self-serve client signup, subscription billing, usage-based overages.
- PDF/DOCX knowledge-base upload (currently: paste text/FAQ, or a URL).
- Meta Embedded Signup OAuth flow (channels are connected via manual
  paste-your-credentials in Settings for now).
- Super Admin platform-wide analytics beyond the basic client list.
- White-label / Enterprise-tier features.

See `../` for the full 20-section blueprint (architecture, cost model,
pricing, sales scripts) this implements the first two phases of.
