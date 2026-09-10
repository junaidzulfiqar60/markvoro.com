export type ServiceInclude = { title: string; description: string };
export type ServiceFaq = { question: string; answer: string };

export type ServicePageContent = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  icon: string;
  includes: ServiceInclude[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
};

// Six SEO-targeted deep-dive pages, one per service the homepage's
// `services` grid already advertises. Content is specific to each service —
// no filler, no duplicated FAQs across pages — and every page cross-links
// back to /solutions, /contact and its related services.
export const servicePages: ServicePageContent[] = [
  {
    slug: "seo",
    name: "Search Engine Optimization",
    eyebrow: "SEO Services",
    h1: "SEO Services in Pakistan Built for Rankings That Convert",
    metaTitle: "SEO Services in Pakistan",
    metaDescription:
      "MARKVORO is an SEO agency in Pakistan helping businesses rank higher on Google with technical SEO, on-page optimization, local SEO and content-driven link building.",
    primaryKeyword: "SEO services Pakistan",
    secondaryKeywords: ["SEO agency Pakistan", "technical SEO", "local SEO Pakistan", "on-page SEO"],
    intro:
      "MARKVORO provides SEO services in Pakistan for businesses that want consistent, compounding organic traffic — not a one-time ranking spike. As an SEO agency, we combine technical fixes, on-page optimization, local SEO and content-driven link building into one connected strategy built around how your customers actually search.",
    icon: "Search",
    includes: [
      {
        title: "Technical SEO Audits",
        description:
          "Site speed, crawlability, indexing, mobile usability and Core Web Vitals — the foundation every ranking strategy depends on.",
      },
      {
        title: "On-Page SEO",
        description:
          "Title tags, meta descriptions, heading structure, internal linking and content optimized around real search intent.",
      },
      {
        title: "Local SEO & Google Business",
        description:
          "Google Business Profile optimization and local search visibility for businesses that serve a specific city or region.",
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "Commercially relevant keyword mapping — prioritizing terms your customers actually use, not just high-volume vanity terms.",
      },
      {
        title: "Content-Driven Link Building",
        description:
          "Earning authority through genuinely useful content and outreach, never spammy or purchased links.",
      },
      {
        title: "Monthly Reporting",
        description:
          "Clear reporting on rankings, organic traffic and technical health, so you always know what's working.",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results in Pakistan?",
        answer:
          "Most businesses start seeing measurable movement in rankings and organic traffic within 3–4 months, with compounding gains after 6+ months. Timelines depend on your site's starting condition, competition and how consistently content and technical fixes are shipped.",
      },
      {
        question: "Do you offer local SEO for a specific city in Pakistan?",
        answer:
          "Yes. We optimize Google Business Profiles and local landing pages so businesses show up for city- and area-specific searches, not just national ones.",
      },
      {
        question: "Is SEO better than Google Ads for my business?",
        answer:
          "They solve different problems — SEO builds compounding, long-term organic visibility, while Google Ads (see our paid advertising services) delivers immediate traffic. Most of our clients run both together for the fastest, most sustainable growth.",
      },
      {
        question: "Do you guarantee first-page Google rankings?",
        answer:
          "No credible SEO agency can guarantee specific rankings — Google's algorithm isn't controlled by anyone we work with. What we do guarantee is a technically sound site, a real content and link-building strategy, and transparent monthly reporting on progress.",
      },
    ],
    relatedSlugs: ["paid-advertising", "web-development"],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    eyebrow: "Social Media Marketing",
    h1: "Social Media Marketing Agency in Pakistan",
    metaTitle: "Social Media Marketing Agency in Pakistan",
    metaDescription:
      "MARKVORO is a social media marketing agency in Pakistan managing Instagram, Facebook and TikTok — strategy, content, community management and performance reporting.",
    primaryKeyword: "social media marketing agency Pakistan",
    secondaryKeywords: ["Instagram marketing Pakistan", "Facebook marketing", "TikTok marketing", "content strategy"],
    intro:
      "MARKVORO is a social media marketing agency in Pakistan managing Instagram, Facebook and TikTok presence end-to-end — strategy, content production, community management and performance reporting — so your brand shows up consistently and converts followers into customers.",
    icon: "Share2",
    includes: [
      {
        title: "Platform Strategy",
        description:
          "A content and growth plan built around where your specific customers actually spend time — not a generic posting calendar.",
      },
      {
        title: "Content Production",
        description:
          "Reels, short-form video, carousels and static posts produced to your brand's visual identity.",
      },
      {
        title: "Community Management",
        description:
          "Comments, DMs and engagement handled promptly, keeping your audience active and your brand responsive.",
      },
      {
        title: "Paid Social Boosting",
        description:
          "Organic content amplified with targeted paid promotion when it's working — full campaigns live under our paid advertising service.",
      },
      {
        title: "Performance Reporting",
        description:
          "Reach, engagement, follower growth and link clicks tracked monthly against real goals.",
      },
    ],
    faqs: [
      {
        question: "Which social platforms does MARKVORO manage?",
        answer:
          "We manage Instagram, Facebook and TikTok as core platforms, with LinkedIn and YouTube available for B2B and video-heavy brands. Platform mix is chosen based on where your customers actually are.",
      },
      {
        question: "Do you also run paid social ads, or only organic content?",
        answer:
          "Both. Social media marketing covers strategy, content and community management; paid campaigns on Meta and Google are handled under our dedicated paid advertising service, and the two are usually run together for the best results.",
      },
      {
        question: "How often will you post on our accounts?",
        answer:
          "Posting frequency is set per platform and goal during onboarding — typically 3–5 feed posts and daily Stories/Reels activity for an active brand, adjusted to what the content calendar and budget support.",
      },
    ],
    relatedSlugs: ["paid-advertising", "ai-agents"],
  },
  {
    slug: "web-development",
    name: "Website Design & Development",
    eyebrow: "Web Development",
    h1: "Web Development Company in Pakistan",
    metaTitle: "Web Development Company in Pakistan",
    metaDescription:
      "MARKVORO is a website development company in Pakistan building fast, modern, conversion-focused business websites, landing pages and e-commerce stores.",
    primaryKeyword: "web development company Pakistan",
    secondaryKeywords: ["website development Pakistan", "business website design", "e-commerce website Pakistan"],
    intro:
      "MARKVORO is a web development company in Pakistan building fast, modern, conversion-focused websites — from business sites and landing pages to full e-commerce stores — engineered to turn visitors into customers, not just look good.",
    icon: "Code2",
    includes: [
      {
        title: "Business & Corporate Websites",
        description:
          "Clean, fast, credible websites that represent your business properly and make it easy for customers to take action.",
      },
      {
        title: "Landing Pages",
        description:
          "Focused, high-converting pages built for a specific campaign, offer or ad audience.",
      },
      {
        title: "E-Commerce Websites",
        description:
          "Online stores with fast checkout UX, product management and mobile-first design.",
      },
      {
        title: "Speed & Core Web Vitals Optimization",
        description:
          "Image optimization, lean JavaScript and modern hosting practices so pages load fast on every device.",
      },
      {
        title: "Responsive, Mobile-First Design",
        description:
          "Every build is designed and tested across mobile, tablet and desktop before launch.",
      },
      {
        title: "Admin Dashboards & Lead Capture",
        description:
          "Optional custom admin dashboards so you can manage leads, content and inquiries without touching code.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer:
          "Most business websites and landing pages are completed within a few weeks from discovery to launch, depending on scope. E-commerce builds and custom admin dashboards take longer — we'll give you a firm timeline after a short discovery call.",
      },
      {
        question: "Will my website be optimized for SEO?",
        answer:
          "Yes — every site we build follows on-page SEO fundamentals (clean heading structure, fast load times, proper metadata) from day one. For ongoing ranking work, see our dedicated SEO services.",
      },
      {
        question: "Can you redesign an existing website instead of building from scratch?",
        answer:
          "Yes. We regularly redesign existing sites — refreshing the design and technology while preserving what's already working for SEO and conversions.",
      },
    ],
    relatedSlugs: ["seo", "ai-agents"],
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    eyebrow: "Email Marketing",
    h1: "Email Marketing Services That Nurture and Retain Customers",
    metaTitle: "Email Marketing Services",
    metaDescription:
      "MARKVORO builds email marketing campaigns and automation sequences that nurture leads, retain customers and drive repeat revenue for growing businesses.",
    primaryKeyword: "email marketing agency Pakistan",
    secondaryKeywords: ["email marketing automation", "newsletter design", "lead nurturing"],
    intro:
      "MARKVORO builds email marketing systems that do more than send newsletters — automated journeys that nurture new leads, welcome new customers and bring past customers back, turning your email list into a real, repeatable revenue channel.",
    icon: "Mail",
    includes: [
      {
        title: "Email Campaign Design",
        description:
          "On-brand campaign templates designed for readability and click-through, not generic newsletter layouts.",
      },
      {
        title: "Automation Sequences",
        description:
          "Welcome series, abandoned-checkout recovery and post-purchase flows that run without manual work.",
      },
      {
        title: "Lead Nurturing",
        description:
          "Structured follow-up sequences that move new leads toward a decision instead of going cold.",
      },
      {
        title: "Audience Segmentation",
        description:
          "Lists segmented by behavior and interest so every email is relevant to the person receiving it.",
      },
      {
        title: "Reporting & Optimization",
        description:
          "Open rates, click rates and conversions tracked and improved campaign over campaign.",
      },
    ],
    faqs: [
      {
        question: "What email platforms do you work with?",
        answer:
          "We work with the major email platforms businesses already use, and can also recommend one if you're starting fresh — the strategy and content matter more than the specific tool.",
      },
      {
        question: "Can email marketing work alongside AI agents?",
        answer:
          "Yes — leads captured by an AI sales or WhatsApp agent can feed directly into an email nurture sequence, so no lead goes cold between first contact and a human follow-up. See our AI agent services for that side of the system.",
      },
    ],
    relatedSlugs: ["ai-agents", "social-media-marketing"],
  },
  {
    slug: "paid-advertising",
    name: "Meta & Google Ads",
    eyebrow: "Paid Advertising",
    h1: "Facebook & Google Ads Agency in Pakistan",
    metaTitle: "Facebook & Google Ads Agency in Pakistan",
    metaDescription:
      "MARKVORO is a Facebook advertising and Google Ads agency in Pakistan running performance-driven paid campaigns with full conversion tracking.",
    primaryKeyword: "Facebook advertising agency Pakistan",
    secondaryKeywords: ["Google Ads agency Pakistan", "Meta ads", "paid advertising Pakistan", "conversion tracking"],
    intro:
      "MARKVORO is a Facebook advertising and Google Ads agency in Pakistan running performance-driven paid campaigns engineered to reach the right audience and convert them into customers — with full conversion tracking so every rupee spent is accountable.",
    icon: "Megaphone",
    includes: [
      {
        title: "Facebook & Instagram Ads",
        description:
          "Audience research, creative testing and campaign structures built around your actual funnel, not boosted posts.",
      },
      {
        title: "Google Search Ads",
        description:
          "Capturing high-intent searches with tightly matched keywords, ad copy and landing pages.",
      },
      {
        title: "Display & YouTube Ads",
        description:
          "Broader-reach and retargeting campaigns that keep your brand in front of past visitors.",
      },
      {
        title: "Conversion Tracking Setup",
        description:
          "Pixels, tags and events configured correctly so reported results reflect real leads and sales.",
      },
      {
        title: "Campaign Optimization",
        description:
          "Ongoing bid, audience and creative optimization based on real performance data, not guesswork.",
      },
    ],
    faqs: [
      {
        question: "What's the minimum ad budget you recommend?",
        answer:
          "It depends on your industry and goals — we'll recommend a realistic starting budget during discovery based on your market and what a meaningful test actually requires, rather than a one-size-fits-all number.",
      },
      {
        question: "Should I run Facebook Ads or Google Ads first?",
        answer:
          "Google Ads captures people already searching for what you offer, while Facebook and Instagram Ads build awareness and demand. Many of our clients run both, but if budget is limited, we'll recommend the one that matches your current stage of demand.",
      },
      {
        question: "Do you handle the ad creative too?",
        answer:
          "Yes — ad creative is produced as part of the campaign, and can be paired with our social media marketing and branding services for a fully consistent look across organic and paid.",
      },
    ],
    relatedSlugs: ["social-media-marketing", "seo"],
  },
  {
    slug: "ai-agents",
    name: "AI Agent Development & Business Automation",
    eyebrow: "AI Automation",
    h1: "AI Automation Agency in Pakistan — Custom AI Agents for Business",
    metaTitle: "AI Automation Agency in Pakistan",
    metaDescription:
      "MARKVORO is an AI automation agency in Pakistan and AI agent development company building custom AI sales, support, WhatsApp and booking agents for real businesses.",
    primaryKeyword: "AI automation agency Pakistan",
    secondaryKeywords: [
      "AI agent development company Pakistan",
      "AI customer support agent Pakistan",
      "business automation",
      "AI WhatsApp agent",
    ],
    intro:
      "MARKVORO is an AI automation agency in Pakistan and AI agent development company building custom AI agents trained on your business — its services, tone and customers — so leads get an instant response and repetitive work runs without added headcount.",
    icon: "Workflow",
    includes: [
      {
        title: "AI Sales Agents",
        description:
          "Instant lead response, qualification and automated follow-up so no enquiry goes cold overnight.",
      },
      {
        title: "AI Customer Support Agents",
        description:
          "24/7 support trained on your FAQs and policies, with clean escalation to a human when a conversation needs one.",
      },
      {
        title: "AI WhatsApp Agents",
        description:
          "Automated WhatsApp replies, lead capture and follow-up — see it explained in detail on our AI agents page.",
      },
      {
        title: "AI Booking Agents",
        description:
          "Appointment scheduling, availability checks, reminders and confirmations handled automatically.",
      },
      {
        title: "Business Process Automation",
        description:
          "Custom workflows connecting forms, WhatsApp, your CRM and calendar — see how the pipeline works on our automations page.",
      },
    ],
    faqs: [
      {
        question: "What is an AI agent, exactly?",
        answer:
          "An AI agent is an intelligent digital assistant trained on your business information that can respond to leads, answer customer questions, book appointments and automate repetitive tasks — on your website, WhatsApp or other channels, around the clock.",
      },
      {
        question: "Can an AI customer support agent work on WhatsApp in Pakistan?",
        answer:
          "Yes. Our AI WhatsApp agents can respond to customers, capture leads and automate conversations directly inside WhatsApp — the channel most customers in Pakistan already use.",
      },
      {
        question: "How is this different from a basic chatbot?",
        answer:
          "A scripted chatbot follows fixed decision trees. Our AI agents are trained on your actual business data and can reason through varied, real conversations — qualifying leads, answering nuanced questions and handing off to a human only when it genuinely needs one.",
      },
      {
        question: "Can you build a custom AI agent for our specific workflow?",
        answer:
          "Yes — every MARKVORO agent is custom-built around your services, tone and tools rather than a generic template. Tell us your workflow on a discovery call and we'll scope the right agent for it.",
      },
    ],
    relatedSlugs: ["web-development", "email-marketing"],
  },
];

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((s) => s.slug === slug);
}
