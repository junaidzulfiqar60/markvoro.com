# MARKVORO — Grow Beyond Limits

A premium, dark, multicolor-gradient frontend website for MARKVORO, a digital
marketing, web development and AI automation agency. Built with **Next.js
(App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer
Motion**, and **Lucide React** icons.

This is a **frontend-only** project — there is no backend, database,
authentication, or payment processing. The contact form validates input in
the browser and shows a success state, but does not submit anywhere.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
Markvoro/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx           # Assembles all sections into the homepage
│   └── globals.css        # Tailwind layers + design system utilities
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky/blur navbar with mobile menu
│   │   └── Footer.tsx      # Footer with logo, links, socials
│   ├── sections/           # One component per homepage section
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── Services.tsx
│   │   ├── AIAgents.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Process.tsx
│   │   ├── WebShowcase.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Contact.tsx
│   └── ui/                 # Reusable building blocks
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── ServiceCard.tsx
│       ├── AgentCard.tsx
│       ├── Counter.tsx
│       ├── Reveal.tsx
│       └── GlowBackground.tsx
├── lib/
│   ├── data.ts              # All editable site content (see below)
│   └── utils.ts
├── public/
│   └── logo.jpeg            # MARKVORO logo (used in navbar + footer)
├── tailwind.config.ts        # Brand colors, gradients, animations
└── package.json
```

## Where to Update Content

Almost all editable text lives in **[`lib/data.ts`](lib/data.ts)** — you
generally do not need to touch component files to update copy.

| What to change | Where |
| --- | --- |
| Phone, email, WhatsApp number | `contactInfo` in `lib/data.ts` |
| Services & feature tags | `services` in `lib/data.ts` |
| AI agent cards | `aiAgents` in `lib/data.ts` |
| "Why Choose Us" blocks | `whyChooseUs` in `lib/data.ts` |
| Process/timeline steps | `processSteps` in `lib/data.ts` |
| **Placeholder website showcase projects** | `webProjects` in `lib/data.ts` — replace `title`, `category`, and `tags` with real project details once you have live sites/screenshots to show |
| Stats/counters | `stats` in `lib/data.ts` |
| **Placeholder testimonials** | `testimonials` in `lib/data.ts` — replace `quote`, `name`, and `business` with real client testimonials as they come in |
| FAQ questions/answers | `faqs` in `lib/data.ts` |
| Footer link columns | `footerServices`, `footerAISolutions`, `navLinks` in `lib/data.ts` |
| Contact form service dropdown | `serviceOptions` in `lib/data.ts` |
| Logo | Replace `public/logo.jpeg` (keep the same filename, or update the `src` in `components/layout/Navbar.tsx` and `components/layout/Footer.tsx`) |
| Social media links | `socials` array in `components/layout/Footer.tsx` |
| Brand colors / gradients | `tailwind.config.ts` (`colors.brand`, `backgroundImage`) |

## Notes on Placeholder Content

- **Testimonials** (`lib/data.ts` → `testimonials`) are clearly sample
  content and labeled "Sample Testimonial" in the UI. Swap them for real
  client quotes once available.
- **Website showcase projects** (`lib/data.ts` → `webProjects`) use styled
  browser-window mockups with category icons rather than real screenshots.
  Replace with real project names/screenshots once client sites are live.
- **Statistics** intentionally avoid fabricated client/revenue numbers and
  instead describe agency capabilities (e.g. "24/7 AI Availability", "10+
  Digital Services"). Update `stats` in `lib/data.ts` once you have real,
  verifiable metrics to report.
- The **contact form** is frontend-only: it validates fields client-side and
  shows a success confirmation, but does not send data anywhere. Connect it
  to a form backend (e.g. an API route, Formspree, or a serverless function)
  when you're ready to accept real submissions.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## License

Proprietary — © 2026 MARKVORO. All Rights Reserved.
