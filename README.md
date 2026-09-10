# MARKVORO — Grow Beyond Limits

A premium, dark, multicolor-gradient website and admin backend for
MARKVORO, a digital marketing, web development and AI automation agency.
Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind
CSS**, **Framer Motion**, **Prisma/PostgreSQL**, and **Lucide React** icons.

The site is fully functional end-to-end: public forms save real leads to a
database, send email notifications, and a secured admin dashboard lets you
manage everything — leads, AI agent inquiries, service inquiries, services,
portfolio projects, testimonials, and newsletter subscribers.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL
- Custom JWT admin auth (`bcryptjs` + `jose`), no third-party auth provider
- [Zod](https://zod.dev/) for validation
- [Resend](https://resend.com/) for transactional email
- [Cloudinary](https://cloudinary.com/) for image uploads
- [Recharts](https://recharts.org/) for the admin dashboard chart

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (any provider — Railway, Neon, Supabase, Vercel Postgres, local) |
| `AUTH_SECRET` | Long random string used to sign admin session JWTs (e.g. `openssl rand -hex 32`) |
| `RESEND_API_KEY` | Resend API key — email sending is skipped (logged, not fatal) if unset |
| `EMAIL_FROM` | Sender address for outgoing email, e.g. `MARKVORO <notifications@yourdomain.com>` |
| `ADMIN_EMAIL` | Mailbox that receives lead/inquiry notifications |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary credentials — uploads return a 503 until these are set |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Used only by `prisma/seed.ts` to create the first dashboard login |

### 3. Set up the database

```bash
npx prisma migrate dev --name init   # creates tables from prisma/schema.prisma
npx prisma db seed                    # creates the first admin user + sample services
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) for
the dashboard (sign in with `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD`).

### 5. Build for production

```bash
npm run build
npm run start
```

`npm install` runs `prisma generate` automatically via `postinstall`. Before
deploying a schema change, run `npx prisma migrate deploy` against the
production database.

## Admin Dashboard

- **Login**: `/admin/login` → redirects to `/admin/dashboard` on success.
- **Roles**: `SUPER_ADMIN` / `ADMIN` / `EDITOR`. Editors can view and update status/notes on leads and inquiries; `ADMIN`+ is required to delete records or create/edit/delete Services, Portfolio, and Testimonials.
- **Pages**: Overview (real DB counts + monthly activity chart), Leads, AI Inquiries, Service Inquiries, Portfolio, Testimonials, Services, Newsletter (with CSV export), Settings (your own profile photo/name/password).
- All `/admin/*` pages and `/api/admin/*` routes are protected by `middleware.ts`; unauthenticated visitors are redirected to `/admin/login`.

## Email Setup

Create a free account at [resend.com](https://resend.com), generate an API
key, and set `RESEND_API_KEY` + `EMAIL_FROM`. Until you verify your own
sending domain with Resend, you can send from their shared testing domain.
If `RESEND_API_KEY` is unset, the app logs a warning and skips sending —
form submissions still save to the database successfully.

## Image Upload Setup

Create a free account at [cloudinary.com](https://cloudinary.com) and set
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
Until configured, the upload endpoint returns a clear 503 error and every
admin form still accepts a manually-pasted image URL as a fallback.

## Project Structure

```
Markvoro/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, metadata
│   ├── page.tsx                    # Homepage — fetches Services/Portfolio/Testimonials from the DB
│   ├── globals.css                 # Tailwind layers + design system utilities
│   ├── api/                        # Public API routes
│   │   ├── contact/route.ts
│   │   ├── service-inquiry/route.ts
│   │   ├── ai-inquiry/route.ts
│   │   ├── newsletter/{subscribe,unsubscribe}/route.ts
│   │   ├── services/route.ts
│   │   ├── portfolio/route.ts
│   │   ├── testimonials/route.ts
│   │   ├── blog/route.ts
│   │   └── admin/                  # Admin API routes (all behind requireAdmin)
│   │       ├── login|logout|me/route.ts
│   │       ├── dashboard/route.ts
│   │       ├── leads/[route.ts, [id]/route.ts]
│   │       ├── ai-inquiries/[...]
│   │       ├── service-inquiries/[...]
│   │       ├── services|portfolio|testimonials/[...]
│   │       ├── blog/[route.ts, [id]/route.ts]
│   │       ├── newsletter/[...]
│   │       └── upload/route.ts
│   ├── blog/
│   │   ├── page.tsx                # /blog listing — DB-backed, falls back to lib/blogData.ts
│   │   └── [slug]/page.tsx         # /blog/<slug> article page — metadata + BlogPosting JSON-LD
│   └── admin/
│       ├── login/page.tsx
│       └── (dashboard)/            # Auth-required route group
│           ├── layout.tsx
│           ├── dashboard/page.tsx
│           ├── leads/page.tsx
│           ├── ai-inquiries/page.tsx
│           ├── service-inquiries/page.tsx
│           ├── portfolio/page.tsx
│           ├── testimonials/page.tsx
│           ├── services/page.tsx
│           ├── blog/page.tsx
│           ├── newsletter/page.tsx
│           └── settings/page.tsx
├── components/
│   ├── layout/          Navbar.tsx, Footer.tsx
│   ├── sections/         One component per homepage section (incl. BlogPreview.tsx)
│   ├── ui/                Button, Modal, SectionHeading, ServiceCard, AgentCard, Counter, Reveal, GlowBackground
│   ├── blog/               BlogCard.tsx, BlogContent.tsx
│   ├── forms/              AIAgentInquiryModal.tsx, ServiceInquiryModal.tsx
│   └── admin/                AdminShell, DataTable, FilterBar, StatusBadge, ConfirmDialog, StatCard, MonthlyChart, ImageUploader
├── lib/
│   ├── data.ts              # Static fallback content
│   ├── blogData.ts          # Static fallback blog articles
│   ├── content.ts           # DB-backed content with static fallback (Services/Portfolio/Testimonials/Blog)
│   ├── auth.ts / auth-server.ts
│   ├── prisma.ts, validations.ts, email.ts, emailTemplates.ts, cloudinary.ts, rateLimit.ts, http.ts, iconMap.ts, utils.ts, seo.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── middleware.ts
├── public/logo.jpeg
├── tailwind.config.ts
└── package.json
```

## Where to Update Content

| What to change | Where |
| --- | --- |
| Phone, email, WhatsApp number | `contactInfo` in `lib/data.ts` |
| Services, Portfolio, Testimonials | `/admin/services`, `/admin/portfolio`, `/admin/testimonials` — homepage reads from the DB, falling back to `lib/data.ts` only when a table is empty |
| Blog articles | `/admin/blog` — `/blog` reads from the DB, falling back to `lib/blogData.ts` only when the table is empty. Article body is plain text: blank line = new paragraph, a line starting with `## ` = a subheading. |
| AI agent showcase cards | `aiAgents` in `lib/data.ts` (static — not yet admin-managed) |
| "Why Choose Us" blocks / Process steps / FAQ | `whyChooseUs` / `processSteps` / `faqs` in `lib/data.ts` |
| Stats/counters | `stats` in `lib/data.ts` |
| Footer link columns, nav links | `footerServices`, `footerAISolutions`, `navLinks` in `lib/data.ts` |
| Contact/inquiry form service dropdown | `serviceOptions` in `lib/data.ts` |
| Logo | Replace `public/logo.jpeg` |
| Social media links | `socials` array in `components/layout/Footer.tsx` |
| Brand colors / gradients | `tailwind.config.ts` (`colors.brand`, `backgroundImage`) |

## API Reference

### Public

| Method | Path | Body | Notes |
| --- | --- | --- | --- |
| POST | `/api/contact` | `{name, email, phone, business?, service, message}` | Rate limited 5/10min/IP. Saves a `ContactLead`, sends admin + customer emails. |
| POST | `/api/service-inquiry` | `{name, email, phone, businessName?, service, budget?, projectDetails}` | Rate limited 5/10min/IP. |
| POST | `/api/ai-inquiry` | `{fullName, email, phone, businessName?, industry, agentType, currentProcess?, businessProblem, estimatedMonthlyCustomers?, preferredCommunication, message?}` | Rate limited 5/10min/IP. |
| POST | `/api/newsletter/subscribe` | `{email}` | Rate limited 10/10min/IP. Re-activates a previously unsubscribed email. |
| POST | `/api/newsletter/unsubscribe` | `{email}` | Rate limited 10/10min/IP. Always returns success (doesn't leak subscriber existence). |
| GET | `/api/services` | — | Active services, ordered. |
| GET | `/api/portfolio` | — | Published portfolio projects. |
| GET | `/api/testimonials` | — | Published testimonials. |
| GET | `/api/blog` | — | Published blog posts, newest first. |

### Admin (require an authenticated session cookie; role noted where stricter than `EDITOR`)

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/admin/login` | `{email, password}`. Rate limited 5/15min/IP. |
| POST | `/api/admin/logout` | Clears the session cookie. |
| GET/PATCH | `/api/admin/me` | Own profile — name, profile image, password change. |
| GET | `/api/admin/dashboard` | Real counts, recent items, 6-month activity chart data. |
| GET/PATCH/DELETE | `/api/admin/leads`, `/api/admin/ai-inquiries`, `/api/admin/service-inquiries` (+ `/[id]`) | List supports `?status&q&page&pageSize` (and `agentType`/`service` where relevant). PATCH updates `{status?, notes?}`. DELETE requires `ADMIN`+. |
| GET/POST/PATCH/DELETE | `/api/admin/services`, `/api/admin/portfolio`, `/api/admin/testimonials`, `/api/admin/blog` (+ `/[id]`) | Full CRUD. Create/update/delete require `ADMIN`+. |
| GET/PATCH/DELETE | `/api/admin/newsletter` (+ `/[id]`) | List-only (no admin-created subscribers); PATCH toggles status. |
| POST | `/api/admin/upload` | `multipart/form-data` with `file` + `folder` (`portfolio`\|`testimonials`\|`profile`\|`blog`). Returns 503 if Cloudinary isn't configured. |

Every route validates input with Zod, never returns raw database errors, and
rate limiting is a best-effort in-memory implementation (per-instance, not
shared across concurrent serverless instances) — sufficient for a
single-deployment hobby-tier site.

## Notes on Placeholder Content

- `webProjects`, `testimonials`, `stats` in `lib/data.ts` and the articles in
  `lib/blogData.ts` remain as fallback content shown only when the
  corresponding database table is empty. Add real content via the admin
  dashboard to replace them.
- `aiAgents` (the showcase cards, not the inquiry leads) and `stats` are not
  yet admin-managed — edit `lib/data.ts` directly for those.

## License

Proprietary — © 2026 MARKVORO. All Rights Reserved.
