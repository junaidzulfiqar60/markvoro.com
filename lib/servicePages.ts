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
  // Two short paragraphs on how MARKVORO actually delivers this specific
  // service — methodology, not the generic 4-step Process section shared
  // across every page.
  approach: string[];
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
    metaTitle: "SEO Services in Pakistan for Long-Term Rankings",
    metaDescription:
      "MARKVORO is an SEO agency in Pakistan helping businesses rank higher on Google with technical SEO, on-page optimization, local SEO and link building.",
    primaryKeyword: "SEO services Pakistan",
    secondaryKeywords: ["SEO agency Pakistan", "technical SEO", "local SEO Pakistan", "on-page SEO"],
    intro:
      "MARKVORO provides SEO services in Pakistan for businesses that want consistent, compounding organic traffic — not a one-time ranking spike. As an SEO agency, we combine technical fixes, on-page optimization, local SEO and content-driven link building into one connected strategy built around how your customers actually search.",
    approach: [
      "Every SEO engagement starts with a real technical and content audit of your site — not a templated checklist. We map where you're currently losing visibility (crawl errors, thin pages, missing internal links) against where your actual customers are searching, so the roadmap targets the pages that can realistically move first.",
      "From there we work in monthly cycles: technical fixes ship first because they unblock everything else, on-page and content work follows once the foundation is clean, and local SEO and link building compound in the background. You get a live view of what changed and why, not a black-box retainer.",
    ],
    icon: "Search",
    includes: [
      {
        title: "Technical SEO Audits",
        description:
          "Site speed, crawlability, indexing, mobile usability and Core Web Vitals — the foundation every ranking strategy depends on. We fix what's actually blocking rankings first — broken indexing, slow load times, duplicate content — before spending budget on anything else.",
      },
      {
        title: "On-Page SEO",
        description:
          "Title tags, meta descriptions, heading structure, internal linking and content optimized around real search intent. Every page is optimized around the specific intent behind its target keyword, not a generic template applied sitewide.",
      },
      {
        title: "Local SEO & Google Business",
        description:
          "Google Business Profile optimization and local search visibility for businesses that serve a specific city or region. We keep your business name, address and category information consistent everywhere it appears online, since inconsistency quietly costs local rankings.",
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "Commercially relevant keyword mapping — prioritizing terms your customers actually use, not just high-volume vanity terms. Each keyword is mapped to search intent and a specific page, so traffic that lands actually matches what you sell.",
      },
      {
        title: "Content-Driven Link Building",
        description:
          "Earning authority through genuinely useful content and outreach, never spammy or purchased links. We only pursue links that a real editor would publish on their own judgment — nothing purchased, nothing automated.",
      },
      {
        title: "Monthly Reporting",
        description:
          "Clear reporting on rankings, organic traffic and technical health, so you always know what's working. You'll always know which fixes shipped, which are in progress, and what moved as a result.",
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
      {
        question: "What does an SEO audit from MARKVORO actually check?",
        answer:
          "A full technical crawl (indexability, status codes, Core Web Vitals), an on-page review (titles, meta descriptions, heading structure, internal linking) and a content review against real search intent — the same checklist we use internally, not a generic template.",
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
      "MARKVORO is a social media marketing agency managing Instagram, Facebook and TikTok — strategy, content, community management and reporting.",
    primaryKeyword: "social media marketing agency Pakistan",
    secondaryKeywords: ["Instagram marketing Pakistan", "Facebook marketing", "TikTok marketing", "content strategy"],
    intro:
      "MARKVORO is a social media marketing agency in Pakistan managing Instagram, Facebook and TikTok presence end-to-end — strategy, content production, community management and performance reporting — so your brand shows up consistently and converts followers into customers.",
    approach: [
      "We start by figuring out which platform actually carries weight for your specific audience — a home services brand and a fashion label don't need the same channel mix, and spreading a small team's attention across five platforms usually means none of them get done properly. The strategy names two or three platforms and commits to them.",
      "Content gets planned in monthly batches around real dates — launches, promotions, seasonal moments — rather than improvised week to week, and every post is reviewed against your brand identity before it goes live, not published on autopilot.",
    ],
    icon: "Share2",
    includes: [
      {
        title: "Platform Strategy",
        description:
          "A content and growth plan built around where your specific customers actually spend time — not a generic posting calendar. We'd rather run one platform well than five platforms half-heartedly.",
      },
      {
        title: "Content Production",
        description:
          "Reels, short-form video, carousels and static posts produced to your brand's visual identity. Every asset follows your existing brand identity — colors, tone, visual style — instead of looking like generic stock content.",
      },
      {
        title: "Community Management",
        description:
          "Comments, DMs and engagement handled promptly, keeping your audience active and your brand responsive. Replies go out within business hours, not days later once the moment for a response has passed.",
      },
      {
        title: "Paid Social Boosting",
        description:
          "Organic content amplified with targeted paid promotion when it's working — full campaigns live under our paid advertising service. We only boost content that's already proving itself organically, rather than paying to promote something unproven.",
      },
      {
        title: "Performance Reporting",
        description:
          "Reach, engagement, follower growth and link clicks tracked monthly against real goals. You'll see exactly which content formats and topics are actually driving engagement, not just vanity follower counts.",
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
      {
        question: "Do you write the captions and content ourselves, or do we provide it?",
        answer:
          "We handle strategy, captions and visual content end-to-end based on your brand guidelines and goals — you review and approve before anything goes live, and can supply your own photos or footage any time you have them.",
      },
    ],
    relatedSlugs: ["paid-advertising", "ai-agents"],
  },
  {
    slug: "web-development",
    name: "Website Design & Development",
    eyebrow: "Web Development",
    h1: "Web Development Company in Pakistan",
    metaTitle: "Web Development Company Serving All of Pakistan",
    metaDescription:
      "MARKVORO is a website development company in Pakistan building fast, modern, conversion-focused business websites, landing pages and e-commerce stores.",
    primaryKeyword: "web development company Pakistan",
    secondaryKeywords: ["website development Pakistan", "business website design", "e-commerce website Pakistan"],
    intro:
      "MARKVORO is a web development company in Pakistan building fast, modern, conversion-focused websites — from business sites and landing pages to full e-commerce stores — engineered to turn visitors into customers, not just look good.",
    approach: [
      "Every build starts with a short discovery call to scope pages, functionality and content needs properly — not a generic 'how many pages' quote. We map the actual user journey (how a visitor finds you, what they need to see, what action you want them to take) before any design work starts.",
      "Design and development happen in stages with real checkpoints — wireframe, design, build, review — so you're never seeing the final product for the first time at launch. Every site ships mobile-tested, with clean on-page SEO fundamentals in place from day one, not bolted on afterward.",
    ],
    icon: "Code2",
    includes: [
      {
        title: "Business & Corporate Websites",
        description:
          "Clean, fast, credible websites that represent your business properly and make it easy for customers to take action. Built around the specific actions you want visitors to take, not a generic template with your logo swapped in.",
      },
      {
        title: "Landing Pages",
        description:
          "Focused, high-converting pages built for a specific campaign, offer or ad audience. Designed to convert one specific audience toward one specific action, without the distraction of a full site's navigation.",
      },
      {
        title: "E-Commerce Websites",
        description:
          "Online stores with fast checkout UX, product management and mobile-first design. Includes the practical details that actually affect conversion — clear shipping and return information, fast page loads, a checkout that doesn't lose customers halfway through.",
      },
      {
        title: "Speed & Core Web Vitals Optimization",
        description:
          "Image optimization, lean JavaScript and modern hosting practices so pages load fast on every device. A slow site loses visitors and search visibility both, so this isn't an optional add-on — it's part of every build.",
      },
      {
        title: "Responsive, Mobile-First Design",
        description:
          "Every build is designed and tested across mobile, tablet and desktop before launch. Most traffic in Pakistan is mobile-first, so mobile is the primary design target, not an afterthought scaled down from desktop.",
      },
      {
        title: "Admin Dashboards & Lead Capture",
        description:
          "Optional custom admin dashboards so you can manage leads, content and inquiries without touching code. Built only when you actually need to manage content or leads yourself — not added by default to every project.",
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
      {
        question: "Do you provide hosting, or do we need our own?",
        answer:
          "We can set up and manage hosting for you, or work with hosting you already have — either way, we'll make sure the site is deployed on infrastructure that supports the speed and uptime the build was designed for.",
      },
    ],
    relatedSlugs: ["seo", "ai-agents"],
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    eyebrow: "Email Marketing",
    h1: "Email Marketing Services That Nurture and Retain Customers",
    metaTitle: "Email Marketing Services for Growing Businesses",
    metaDescription:
      "MARKVORO builds email marketing campaigns and automation sequences that nurture leads, retain customers and drive repeat revenue for growing businesses.",
    primaryKeyword: "email marketing agency Pakistan",
    secondaryKeywords: ["email marketing automation", "newsletter design", "lead nurturing"],
    intro:
      "MARKVORO builds email marketing systems that do more than send newsletters — automated journeys that nurture new leads, welcome new customers and bring past customers back, turning your email list into a real, repeatable revenue channel.",
    approach: [
      "We treat your email list as a revenue channel, not a broadcast list — every sequence is built around a specific moment in the customer relationship: a new subscriber, an abandoned checkout, a customer who hasn't ordered in months. Generic monthly newsletters rarely earn their place in an inbox; a well-timed, relevant email almost always does.",
      "Setup starts with mapping the actual customer journey your business already has, then building the two or three automations that will earn the most return before adding more. Campaigns are tested and refined against real open, click and conversion data — not guessed at and left running unchanged.",
    ],
    icon: "Mail",
    includes: [
      {
        title: "Email Campaign Design",
        description:
          "On-brand campaign templates designed for readability and click-through, not generic newsletter layouts. Templates are built once, tested for deliverability and readability across inboxes, then reused and refined rather than redesigned from scratch every send.",
      },
      {
        title: "Automation Sequences",
        description:
          "Welcome series, abandoned-checkout recovery and post-purchase flows that run without manual work. Each sequence is scoped to a specific trigger and goal — welcoming a new subscriber is a different job than recovering an abandoned cart, and the copy reflects that.",
      },
      {
        title: "Lead Nurturing",
        description:
          "Structured follow-up sequences that move new leads toward a decision instead of going cold. New leads that aren't ready to buy yet get a structured sequence that stays useful and relevant, instead of a hard sales pitch that gets ignored.",
      },
      {
        title: "Audience Segmentation",
        description:
          "Lists segmented by behavior and interest so every email is relevant to the person receiving it. A customer who bought last week and one who's never purchased shouldn't get the same email — segmentation is what makes that possible.",
      },
      {
        title: "Reporting & Optimization",
        description:
          "Open rates, click rates and conversions tracked and improved campaign over campaign. We look past open rates to what actually matters — clicks, replies and revenue attributable to each campaign.",
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
      {
        question: "How do you build our first email list if we're starting from zero?",
        answer:
          "We set up proper opt-in capture on your website and any active campaigns, then build the welcome and nurture sequences that turn new subscribers into an engaged list — growth compounds from there rather than starting with a purchased or scraped list, which we don't use.",
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
    approach: [
      "Every campaign starts with matching the platform to where your buyer actually is in their decision — Google Search Ads for people already looking for what you offer, Meta ads for building awareness and demand before that search happens. We don't default to one platform because it's easier to manage.",
      "Conversion tracking gets set up correctly before any real budget moves, because a campaign is only as good as your ability to measure what it actually produced. From there, budgets shift toward what's proving out and away from what isn't — reviewed against real performance data on a regular cycle, not left running unchanged for months.",
    ],
    icon: "Megaphone",
    includes: [
      {
        title: "Facebook & Instagram Ads",
        description:
          "Audience research, creative testing and campaign structures built around your actual funnel, not boosted posts. Creative is tested in small batches first, so budget scales into what's actually working rather than a single untested campaign.",
      },
      {
        title: "Google Search Ads",
        description:
          "Capturing high-intent searches with tightly matched keywords, ad copy and landing pages. Keywords are matched tightly to intent, so your budget reaches people close to a decision instead of broad, unqualified traffic.",
      },
      {
        title: "Display & YouTube Ads",
        description:
          "Broader-reach and retargeting campaigns that keep your brand in front of past visitors. Used to stay in front of people who've already shown interest, rather than as a first-touch acquisition channel on their own.",
      },
      {
        title: "Conversion Tracking Setup",
        description:
          "Pixels, tags and events configured correctly so reported results reflect real leads and sales. Without this in place first, every other optimization decision downstream is a guess, not a measurement.",
      },
      {
        title: "Campaign Optimization",
        description:
          "Ongoing bid, audience and creative optimization based on real performance data, not guesswork. Adjustments are made against real cost-per-result data on a set cadence, not reactively every time a number moves.",
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
      {
        question: "How soon will we see results from paid ads?",
        answer:
          "Google Search Ads can start driving qualified traffic within days of launch since they capture existing demand; Meta campaigns typically need one to two weeks of real spend data before we can optimize meaningfully. Either way, we'll show you what's actually happening in the account, not a projected result.",
      },
    ],
    relatedSlugs: ["social-media-marketing", "seo"],
  },
  {
    slug: "ai-agents",
    name: "AI Agent Development & Business Automation",
    eyebrow: "AI Automation",
    h1: "AI Automation Agency in Pakistan — Custom AI Agents for Business",
    metaTitle: "AI Automation Agency in Pakistan for Business",
    metaDescription:
      "MARKVORO is an AI automation agency in Pakistan building custom AI sales, support, WhatsApp and booking agents for real Pakistani businesses to run on.",
    primaryKeyword: "AI automation agency Pakistan",
    secondaryKeywords: [
      "AI agent development company Pakistan",
      "AI customer support agent Pakistan",
      "business automation",
      "AI WhatsApp agent",
    ],
    intro:
      "MARKVORO is an AI automation agency in Pakistan and AI agent development company building custom AI agents trained on your business — its services, tone and customers — so leads get an instant response and repetitive work runs without added headcount.",
    approach: [
      "Every AI agent starts with the same question: what specific, repetitive part of your customer interaction is costing you the most time or the most missed opportunities right now? We build one well-trained agent around that bottleneck first — instant lead response, WhatsApp support, booking — rather than trying to automate your entire customer journey on day one.",
      "The agent is trained on your actual business information — services, pricing structure, policies, tone — and given clear boundaries on what it can decide versus when it hands off to a person. You can see exactly what it's doing and interrupt or adjust it at any point; it's not a black box running unsupervised.",
    ],
    icon: "Workflow",
    includes: [
      {
        title: "AI Sales Agents",
        description:
          "Instant lead response, qualification and automated follow-up so no enquiry goes cold overnight. A lead that messages at midnight gets a real, relevant reply immediately instead of waiting until your team is back online the next morning.",
      },
      {
        title: "AI Customer Support Agents",
        description:
          "24/7 support trained on your FAQs and policies, with clean escalation to a human when a conversation needs one. It handles the repetitive questions correctly and consistently, freeing your team's attention for the conversations that genuinely need a person's judgment.",
      },
      {
        title: "AI WhatsApp Agents",
        description:
          "Automated WhatsApp replies, lead capture and follow-up — see it explained in detail on our AI agents page. Built for the channel Pakistani customers already default to, rather than requiring them to switch to a separate chat widget or app.",
      },
      {
        title: "AI Booking Agents",
        description:
          "Appointment scheduling, availability checks, reminders and confirmations handled automatically. Availability, confirmations and reminders run automatically, cutting down on the back-and-forth that usually happens before a booking is actually locked in.",
      },
      {
        title: "Business Process Automation",
        description:
          "Custom workflows connecting forms, WhatsApp, your CRM and calendar — see how the pipeline works on our automations page. Connects the tools you already use so information moves between them without anyone re-typing it.",
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
      {
        question: "How long does it take to launch our first AI agent?",
        answer:
          "Most single-agent builds (one channel, one clear job — sales response, support, or booking) launch within two to four weeks from discovery to going live, depending on how much business information there is to train it on and how many systems it needs to connect to.",
      },
    ],
    relatedSlugs: ["web-development", "email-marketing"],
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    eyebrow: "Content Marketing",
    h1: "Content That Moves People Through Your Funnel, Not Just Fills a Calendar",
    metaTitle: "Content Marketing Agency Serving All of Pakistan",
    metaDescription:
      "MARKVORO is a content marketing agency in Pakistan producing blog writing, copywriting, social content and video scripts that inform, engage and convert.",
    primaryKeyword: "content marketing agency Pakistan",
    secondaryKeywords: ["blog writing services", "copywriting agency Pakistan", "content strategy", "AI content production"],
    intro:
      "MARKVORO is a content marketing agency in Pakistan producing blog writing, copywriting, social content, video scripts and AI-assisted production — content built around what your business actually needs it to do, not a calendar to keep full.",
    approach: [
      "Every content engagement starts by mapping what your business actually needs content to do — build search visibility, warm up leads before a sales conversation, or support paid campaigns with real creative — instead of producing generic blog posts because a content calendar says to. We look at what's already working, or not, across your site and social channels before adding anything new.",
      "From there we work in a monthly production cycle: a content calendar built around real dates and goals, drafts reviewed against your brand voice before anything publishes, and performance checked against what each piece was actually meant to do — rankings, leads or engagement — not just impressions.",
    ],
    icon: "PenTool",
    includes: [
      {
        title: "Blog Writing",
        description:
          "Search-intent-driven articles that bring in organic traffic and support your SEO strategy. Every post is written around a real keyword and a real reader question, not published just to keep a content calendar full.",
      },
      {
        title: "Copywriting",
        description:
          "Website copy, ad copy and sales pages written to convert, not just read well. Copy is written around the specific action you want a reader to take next, not generic brand messaging.",
      },
      {
        title: "Social Media Content",
        description:
          "Captions, carousels and short-form scripts that match your brand voice across every platform. Produced to plug directly into your social media marketing calendar, not as a separate, disconnected workstream.",
      },
      {
        title: "Video Scripts",
        description:
          "Scripts for Reels, YouTube and ad creative, written to hold attention from the first few seconds. Structured around how people actually watch short-form video, not written to be read rather than watched.",
      },
      {
        title: "AI Content Production",
        description:
          "AI-assisted drafting and production for scale, always reviewed by a person before anything publishes. AI speeds up first drafts and production; a person still reviews everything before it represents your brand.",
      },
      {
        title: "Content Strategy",
        description:
          "A content plan built around your actual funnel stages and goals, not a generic posting calendar. Every piece is mapped to a stage of your funnel, so content has a clear job instead of existing for its own sake.",
      },
    ],
    faqs: [
      {
        question: "What does a content marketing agency actually deliver?",
        answer:
          "Blog posts, website and ad copy, social content, video scripts and an overall content strategy — built around what your business specifically needs, whether that's organic traffic, warmer leads, or better-converting ad creative. You'll see a real content calendar and real drafts, not a vague retainer.",
      },
      {
        question: "How is this different from just hiring a freelance writer?",
        answer:
          "A freelance writer produces individual pieces; MARKVORO runs content as one coordinated system tied to your SEO, social and paid strategy — so a blog post is written to also support a keyword your SEO work is targeting, and social captions match what's running in paid campaigns.",
      },
      {
        question: "Does MARKVORO write the content or just plan it?",
        answer:
          "Both — we handle strategy and production end-to-end, including AI-assisted drafting for scale, with every piece reviewed by a person before it goes live. You approve content before it publishes, and can provide your own source material or expertise any time you have it.",
      },
    ],
    relatedSlugs: ["social-media-marketing", "seo"],
  },
  {
    slug: "branding-creative-design",
    name: "Branding & Creative Design",
    eyebrow: "Branding & Creative Design",
    h1: "A Visual Identity Built to Be Instantly Recognizable",
    metaTitle: "Branding & Creative Design Agency in Pakistan",
    metaDescription:
      "MARKVORO is a branding and creative design agency in Pakistan building logos, brand identities, guidelines and creative assets that work across every channel.",
    primaryKeyword: "branding & creative design agency Pakistan",
    secondaryKeywords: ["logo design Pakistan", "brand identity design", "brand guidelines", "creative design agency"],
    intro:
      "MARKVORO is a branding and creative design agency in Pakistan building visual identities — logos, brand systems, guidelines and creative assets — that make a business instantly recognizable across its website, ads, social channels and everything in between.",
    approach: [
      "We start by figuring out whether you need a full identity built from scratch or a focused refresh of what already exists — most businesses don't need to reinvent everything, and treating a simple update like a full rebrand wastes budget and creates unnecessary inconsistency along the way.",
      "Every identity is designed to actually be used, not just look good in a presentation deck: logo variations for different placements, a clear color and type system, and guidelines your team (or ours) can apply consistently across ads, social posts and the website — so the identity holds together everywhere it appears, not just on the page it was designed on.",
    ],
    icon: "Palette",
    includes: [
      {
        title: "Logo Design",
        description:
          "A primary logo plus the variations (icon-only, horizontal, dark/light) a real business actually needs across different placements. Delivered in the file formats your website, print and social channels each require, not a single flat image.",
      },
      {
        title: "Brand Identity",
        description:
          "Color palette, typography and visual style built to be distinct in your specific market, not a template with your name on it. The system is built to hold up as your business adds new channels and formats over time, not just the first few assets.",
      },
      {
        title: "Social Media Graphics",
        description:
          "Templates and one-off graphics that keep your feed visually consistent without redesigning from zero every post. Built to plug directly into your social media marketing calendar, not as a disconnected design request.",
      },
      {
        title: "Advertising Creatives",
        description:
          "Ad creative for Meta and Google campaigns that carries the same identity as your organic content. Designed alongside your paid advertising strategy, so creative and targeting are never working from different playbooks.",
      },
      {
        title: "Brand Guidelines",
        description:
          "A practical reference document — logo usage, colors, type, tone — so your identity stays consistent as your team or agency partners grow. Written to actually be followed, not a 40-page PDF nobody opens after week one.",
      },
      {
        title: "Marketing Materials",
        description:
          "Brochures, presentation decks, signage and other offline or sales-facing materials designed to match your digital identity. Keeps your business looking like one consistent brand across every touchpoint, online and off.",
      },
    ],
    faqs: [
      {
        question: "Do I need a full rebrand or just updated creative assets?",
        answer:
          "It depends on what's actually not working — a logo and color system that's still solid but lacks supporting assets needs a different scope than an identity that no longer represents the business. We'll tell you honestly which one your business needs during discovery, rather than defaulting to the larger (and more expensive) option.",
      },
      {
        question: "Will my new branding tie into my ads and website?",
        answer:
          "Yes — every identity is built to carry through to paid ad creative, social content and web design, and we coordinate directly with those teams (or yours) so the look stays consistent everywhere it shows up, not just in the initial logo file.",
      },
      {
        question: "What do I need to provide to get started?",
        answer:
          "A short discovery call covering your business, audience and any existing brand assets is usually enough to start — if you have past creative, competitor references, or a rough idea of the direction you like, that helps, but none of it is required upfront.",
      },
    ],
    relatedSlugs: ["web-development", "social-media-marketing"],
  },
  {
    slug: "ai-content-creation",
    name: "AI Content Creation",
    eyebrow: "AI Content Creation",
    h1: "Scale Content Production Without Scaling Headcount",
    metaTitle: "AI Content Creation Services in Pakistan",
    metaDescription:
      "MARKVORO delivers AI content creation services in Pakistan — AI video, image and voiceover production plus AI-powered advertising creatives, human-reviewed.",
    primaryKeyword: "AI content creation services Pakistan",
    secondaryKeywords: ["AI video generation", "AI image creation", "AI voiceovers", "AI advertising creatives"],
    intro:
      "MARKVORO delivers AI content creation services in Pakistan — AI-generated video, image and voiceover production, plus AI-assisted advertising creatives — built to scale how much content your business can produce without scaling your team, with every piece reviewed by a person before it goes live.",
    approach: [
      "We use AI tools to speed up production, not to replace judgment — every AI-generated video, image or voiceover is produced against your actual brand guidelines and reviewed by a person before it ships, the same standard we hold any other creative work to. The goal is more usable output per week, not more unreviewed output.",
      "This is a distinct service from our AI agents: AI content creation produces the video, image, ad and voiceover assets your marketing runs on, while AI agents are customer-facing automation that responds to leads and support conversations. Businesses often use both, but they solve different problems, are scoped separately, and show up as two different line items on any proposal — never bundled together to inflate a single deliverable.",
    ],
    icon: "Sparkles",
    includes: [
      {
        title: "AI Video Generation",
        description:
          "Short-form video and ad creative produced with AI tools, scripted and reviewed to match your brand voice before publishing. Used to increase output for formats like Reels and ad creative without a full production crew for every piece.",
      },
      {
        title: "AI Image Creation",
        description:
          "Product shots, ad visuals and social graphics generated and refined for a specific use case, not generic stock replacements. Every image is checked against your actual brand identity before it's approved for use.",
      },
      {
        title: "AI Advertising Creatives",
        description:
          "Ad variations produced faster for testing across Meta and Google campaigns, so more creative directions get tested without a proportional increase in production cost.",
      },
      {
        title: "AI Voiceovers",
        description:
          "Voiceover tracks for video and ad content, produced in the tone and language your audience expects, reviewed for accuracy before use.",
      },
      {
        title: "AI-Powered Content Production",
        description:
          "AI used across the broader content workflow — drafting, ideation, first-pass production — to increase how much your content and social teams can ship, always with a human final review before anything publishes.",
      },
    ],
    faqs: [
      {
        question: "Is this different from the AI agents on your other page?",
        answer:
          "Yes — AI content creation produces marketing assets (video, image, voiceover, ad creative) that your team uses in campaigns. AI agents are customer-facing automation that responds to leads and support conversations directly. See our AI agents page for that service.",
      },
      {
        question: "Does AI content still get reviewed by a person?",
        answer:
          "Always. AI speeds up production and first drafts, but every asset is reviewed against your brand guidelines by a person before it publishes — nothing goes live unchecked.",
      },
      {
        question: "What formats can be produced?",
        answer:
          "Short-form video, static and animated images, ad creative variations and voiceover tracks — scoped to whatever your campaigns and content calendar actually need, not a fixed content package.",
      },
    ],
    relatedSlugs: ["ai-agents", "content-marketing"],
  },
  {
    slug: "affiliate-marketing",
    name: "Affiliate Marketing",
    eyebrow: "Affiliate Marketing",
    h1: "Partner and Affiliate Programs Built to Scale With Performance",
    metaTitle: "Affiliate Marketing Program Management Pakistan",
    metaDescription:
      "MARKVORO builds and manages affiliate and partner programs in Pakistan — program setup, partner management, performance tracking and commission systems.",
    primaryKeyword: "affiliate marketing agency Pakistan",
    secondaryKeywords: ["affiliate program management", "partner marketing Pakistan", "commission tracking"],
    intro:
      "MARKVORO builds and manages affiliate and partner marketing programs for businesses that already have a customer base and want a structured, performance-based way to extend their reach — program setup, partner recruitment, performance tracking and commission management, run as one system rather than a loose list of referral deals.",
    approach: [
      "We start by checking that an affiliate program is actually the right fit before building one — it works best for businesses with a proven product, a repeatable sale, and existing traction, not as a first growth channel for something unproven. If that's not where you are yet, we'll say so rather than sell you a program that won't produce results.",
      "Once it's the right fit, we set up clear program terms and commission structures, recruit and vet partners who genuinely match your audience, and put tracking in place so every referred sale is attributed correctly — then manage the relationship on an ongoing basis so partners stay active instead of signing up once and going quiet.",
    ],
    icon: "Users",
    includes: [
      {
        title: "Affiliate Program Setup",
        description:
          "Commission structure, program terms and tracking infrastructure set up correctly from day one. We scope the program around what your margins can actually support, not a generic commission percentage copied from another industry.",
      },
      {
        title: "Partner Management",
        description:
          "Recruiting and managing affiliates who genuinely match your audience, not just anyone willing to sign up. Ongoing relationship management keeps active partners engaged instead of a list of sign-ups that never actually promote you.",
      },
      {
        title: "Performance Tracking",
        description:
          "Every referred visit, lead and sale tracked and attributed to the right partner, so payouts and results are never a guessing game.",
      },
      {
        title: "Commission Systems",
        description:
          "Payout structures and tracking set up to be transparent and reliable for your partners, which is what keeps good affiliates actively promoting you instead of moving on to a program that pays out more predictably.",
      },
    ],
    faqs: [
      {
        question: "Do I need existing customers before starting an affiliate program?",
        answer:
          "Yes, generally — affiliate marketing works best once you have a proven product and a repeatable sale that partners can confidently promote. If you're still validating your offer, we'll usually recommend a different channel first and revisit affiliate marketing once you have that traction.",
      },
      {
        question: "How are commissions tracked and paid?",
        answer:
          "We set up tracking so every referred visit, lead or sale is correctly attributed to the partner who sent it, with a clear, agreed payout structure and schedule — so both you and your partners always know exactly what's owed and why.",
      },
      {
        question: "How is this different from influencer marketing?",
        answer:
          "Affiliate marketing is performance-based — partners earn a commission tied directly to sales or leads they generate. Influencer marketing is typically a paid or gifted partnership focused on awareness and reach rather than a direct commission structure. See our influencer marketing services for that side of partner-driven growth.",
      },
    ],
    relatedSlugs: ["influencer-marketing", "social-media-marketing"],
  },
  {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    eyebrow: "Influencer Marketing",
    h1: "Connect With the Voices Your Customers Already Trust",
    metaTitle: "Influencer Marketing Agency in Pakistan",
    metaDescription:
      "MARKVORO is an influencer marketing agency in Pakistan handling influencer research, outreach, campaign management, UGC content and performance tracking.",
    primaryKeyword: "influencer marketing agency Pakistan",
    secondaryKeywords: ["influencer outreach Pakistan", "UGC content", "creator partnerships"],
    intro:
      "MARKVORO is an influencer marketing agency in Pakistan connecting brands with the creators their customers already follow and trust — influencer research, outreach, campaign management and UGC content, run as a coordinated campaign rather than a handful of one-off paid posts.",
    approach: [
      "We start with your audience, not a list of the biggest names in a category — the right influencer for a business is whoever their specific customers actually trust and pay attention to, which is often a smaller, more engaged creator rather than the account with the largest follower count. Fit and audience overlap matter more than reach alone.",
      "Campaigns are planned around a clear goal — awareness, launch buzz, or ongoing UGC supply for your other channels — and we handle outreach, briefing and coordination so creators represent your brand accurately without producing content that feels like a scripted ad read. The content produced doesn't have to live only on the creator's account either — with the right agreement in place, it becomes reusable material for your own paid and organic channels long after the original post.",
    ],
    icon: "Star",
    includes: [
      {
        title: "Influencer Research",
        description:
          "Identifying creators whose actual audience overlaps with your customers, not just accounts with a large follower count. We look at engagement quality and audience fit before follower count, since a smaller, well-matched creator often converts better.",
      },
      {
        title: "Outreach",
        description:
          "Direct, professional outreach and negotiation, so partnerships start on clear terms both sides understand from the outset.",
      },
      {
        title: "Campaign Management",
        description:
          "Briefing, coordination and timeline management across every creator in a campaign, so content goes live on schedule and stays on message.",
      },
      {
        title: "UGC Content",
        description:
          "Authentic, creator-produced content that can be repurposed across your own paid and organic social channels, not locked to the creator's account alone.",
      },
      {
        title: "Performance Tracking",
        description:
          "Reach, engagement and conversion tracked per creator and per campaign, so future partnerships are based on what actually worked, not a guess.",
      },
    ],
    faqs: [
      {
        question: "How do you find the right influencers for my business?",
        answer:
          "We start from your actual audience and look for creators whose followers genuinely overlap with your customers — prioritizing engagement quality and audience fit over raw follower count, since a smaller, well-matched creator usually converts better than a broad, mismatched one.",
      },
      {
        question: "Is this only for consumer brands?",
        answer:
          "It's most common for consumer and lifestyle brands, but it also works for service businesses with the right creator fit — local businesses, hospitality and professional services have all used creator partnerships effectively when the audience match is genuine.",
      },
      {
        question: "How is influencer content measured?",
        answer:
          "We track reach, engagement and conversions per creator and per campaign, so you know which partnerships are actually driving results — not just impressions — and can double down on what's working for future campaigns.",
      },
    ],
    relatedSlugs: ["paid-advertising", "affiliate-marketing"],
  },
];

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((s) => s.slug === slug);
}
