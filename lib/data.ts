import {
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Smartphone,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Automations", href: "/automations" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  number: string;
  // Icon *name* (a key in lib/iconMap.ts's ICON_MAP), not a component
  // reference — this type is passed from server components down into
  // client components (ServiceCard), and React Server Components cannot
  // serialize function values across that boundary.
  icon: string;
  name: string;
  description: string;
  features: string[];
  // Slug of a matching /services/<slug> deep-dive page, when one exists —
  // renders a "Learn more" link on the card. Undefined for services without
  // a dedicated page yet.
  slug?: string;
};

export const services: Service[] = [
  {
    number: "01",
    icon: "Share2",
    name: "Social Media Marketing",
    description:
      "Build a powerful social media presence with strategic content, community engagement, content planning and high-performing campaigns.",
    features: [
      "Instagram Marketing",
      "Facebook Marketing",
      "TikTok Marketing",
      "Content Strategy",
      "Community Management",
      "Reels & Short-Form Content",
    ],
    slug: "social-media-marketing",
  },
  {
    number: "02",
    icon: "Megaphone",
    name: "Meta & Google Ads",
    description:
      "Performance-driven paid advertising campaigns engineered to reach the right audience and convert them into customers.",
    features: [
      "Facebook Ads",
      "Instagram Ads",
      "Google Search Ads",
      "Display Ads",
      "YouTube Ads",
      "Conversion Tracking",
      "Campaign Optimization",
    ],
    slug: "paid-advertising",
  },
  {
    number: "03",
    icon: "Search",
    name: "Search Engine Optimization",
    description:
      "Rank higher, get discovered and drive consistent organic traffic with technical, local and content-driven SEO.",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Google Business Optimization",
      "Link Building",
    ],
    slug: "seo",
  },
  {
    number: "04",
    icon: "PenTool",
    name: "Content Marketing",
    description:
      "Compelling content that informs, engages and converts — crafted for every stage of your customer journey.",
    features: [
      "Blog Writing",
      "Copywriting",
      "Social Media Content",
      "Video Scripts",
      "AI Content Production",
      "Content Strategy",
    ],
  },
  {
    number: "05",
    icon: "Palette",
    name: "Branding & Creative Design",
    description:
      "Distinct, premium visual identities that make your business instantly recognizable across every channel.",
    features: [
      "Logo Design",
      "Brand Identity",
      "Social Media Graphics",
      "Advertising Creatives",
      "Brand Guidelines",
      "Marketing Materials",
    ],
  },
  {
    number: "06",
    icon: "Code2",
    name: "Website Design & Development",
    description:
      "Fast, modern and conversion-focused websites built to turn visitors into loyal customers.",
    features: [
      "Business Websites",
      "Landing Pages",
      "E-Commerce Websites",
      "Portfolio Websites",
      "Responsive Design",
      "Speed Optimization",
    ],
    slug: "web-development",
  },
  {
    number: "07",
    icon: "Mail",
    name: "Email Marketing",
    description:
      "Automated email journeys that nurture leads, retain customers and drive repeat revenue.",
    features: [
      "Email Campaigns",
      "Newsletter Design",
      "Email Automation",
      "Lead Nurturing",
      "Customer Retention",
      "Audience Segmentation",
    ],
    slug: "email-marketing",
  },
  {
    number: "08",
    icon: "Users",
    name: "Affiliate Marketing",
    description:
      "Scalable partner and affiliate programs that extend your reach and reward performance.",
    features: [
      "Affiliate Program Setup",
      "Partner Management",
      "Performance Tracking",
      "Commission Systems",
    ],
  },
  {
    number: "09",
    icon: "Star",
    name: "Influencer Marketing",
    description:
      "Connect with the right voices to build authentic trust and awareness for your brand.",
    features: [
      "Influencer Research",
      "Outreach",
      "Campaign Management",
      "UGC Content",
      "Performance Tracking",
    ],
  },
  {
    number: "10",
    icon: "Sparkles",
    name: "AI Content Creation",
    description:
      "Scale your content production using cutting-edge AI tools for video, image, voice and copy.",
    features: [
      "AI Video Generation",
      "AI Image Creation",
      "AI Advertising Creatives",
      "AI Voiceovers",
      "AI-Powered Content Production",
    ],
  },
];

export type AIAgent = {
  icon: LucideIcon;
  name: string;
  description: string;
  features?: string[];
};

export const aiAgents: AIAgent[] = [
  {
    icon: TrendingUp,
    name: "AI Sales Agent",
    description:
      "An intelligent AI agent that responds to leads, qualifies potential customers, follows up automatically and helps move prospects toward a sale.",
    features: [
      "Instant Lead Response",
      "Lead Qualification",
      "Automated Follow-Ups",
      "Customer Conversations",
      "Sales Assistance",
    ],
  },
  {
    icon: MessageCircle,
    name: "AI Customer Support Agent",
    description:
      "Provide instant customer support 24/7 using an AI agent trained on your business information.",
    features: [
      "24/7 Customer Support",
      "FAQ Responses",
      "Multi-Language Support",
      "Human Escalation",
      "Customer Assistance",
    ],
  },
  {
    icon: CalendarCheck,
    name: "AI Booking Agent",
    description:
      "Automate appointment and booking requests while keeping your business available around the clock.",
    features: [
      "Appointment Booking",
      "Availability Checking",
      "Automated Confirmations",
      "Reminders",
      "Calendar Integration UI",
    ],
  },
  {
    icon: Smartphone,
    name: "AI WhatsApp Agent",
    description:
      "Turn WhatsApp into an intelligent business assistant that can respond to customers, capture leads and automate conversations.",
    features: [
      "Automated WhatsApp Replies",
      "Lead Collection",
      "Customer Support",
      "Follow-Up Messages",
      "Sales Conversations",
    ],
  },
  {
    icon: UserCheck,
    name: "AI Receptionist",
    description:
      "A digital receptionist designed to handle incoming customer inquiries and direct them to the right information or team.",
  },
  {
    icon: Workflow,
    name: "AI Business Automation Agent",
    description:
      "Custom AI automation systems designed around your business workflow.",
    features: [
      "Workflow Automation",
      "Lead Management",
      "CRM Integration UI",
      "Data Processing",
      "Task Automation",
    ],
  },
];

export const whyChooseUs = [
  {
    number: "01",
    title: "Strategy First",
    description:
      "We start with understanding your business, customers, competitors and goals before creating a growth strategy.",
  },
  {
    number: "02",
    title: "Creative Thinking",
    description:
      "We combine creative ideas with modern technology to create marketing that captures attention.",
  },
  {
    number: "03",
    title: "Data Driven",
    description:
      "Every campaign and strategy is measured, tested and continuously optimized using real performance data.",
  },
  {
    number: "04",
    title: "Future Ready",
    description:
      "From AI agents to business automation, we help your business take advantage of modern technology.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, audience, competitors and goals.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "Build a customized digital growth and technology strategy.",
  },
  {
    number: "03",
    title: "Build & Execute",
    description:
      "Launch campaigns, websites, AI agents, content and digital experiences.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description: "Analyze performance, improve results and scale what works.",
  },
];

export type WebProject = {
  category: string;
  title: string;
  tags: string[];
  gradient: string;
};

export const webProjects: WebProject[] = [
  {
    category: "E-Commerce",
    title: "Modern Storefront",
    tags: ["Shopify-style UI", "Fast Checkout UX", "Mobile First"],
    gradient: "from-brand-orange via-brand-pink to-brand-purple",
  },
  {
    category: "Restaurant",
    title: "Fine Dining Experience",
    tags: ["Online Menu", "Reservation UI", "Brand Storytelling"],
    gradient: "from-brand-pink via-brand-purple to-brand-blue",
  },
  {
    category: "Corporate Business",
    title: "Enterprise Presence",
    tags: ["Corporate Identity", "Service Pages", "Lead Capture"],
    gradient: "from-brand-blue via-brand-cyan to-brand-green",
  },
  {
    category: "Personal Brand",
    title: "Creator Portfolio",
    tags: ["Personal Branding", "Content Showcase", "Booking Integration"],
    gradient: "from-brand-green via-brand-cyan to-brand-purple",
  },
];

export const stats = [
  { value: "24/7", label: "AI Agent Availability" },
  { value: "10+", label: "Digital Services Offered" },
  { value: "6", label: "Multi-Channel Marketing Platforms" },
  { value: "100%", label: "Custom Growth Strategies" },
];

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "MARKVORO completely transformed how we approach digital marketing. Their strategy-first approach and creative execution helped us build a much stronger online presence.",
    name: "Sample Client",
    business: "E-Commerce Brand",
    rating: 5,
  },
  {
    quote:
      "The AI agent MARKVORO built for us now handles our customer inquiries around the clock. It feels like we hired an entire extra team.",
    name: "Sample Client",
    business: "Local Service Business",
    rating: 5,
  },
  {
    quote:
      "From branding to our new website, everything MARKVORO delivered felt premium, modern and exactly aligned with our vision.",
    name: "Sample Client",
    business: "Hospitality Brand",
    rating: 5,
  },
  {
    quote:
      "Their team is data-driven, creative and genuinely invested in our growth. Highly recommend MARKVORO to any ambitious business.",
    name: "Sample Client",
    business: "Corporate Services",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "What services does MARKVORO provide?",
    answer:
      "MARKVORO offers a full suite of digital solutions including social media marketing, Meta & Google Ads, SEO, content marketing, branding, website design & development, email marketing, affiliate & influencer marketing, and AI agent development.",
  },
  {
    question: "Can you manage our social media?",
    answer:
      "Yes. We handle strategy, content creation, community management and campaign planning across Instagram, Facebook, TikTok and more.",
  },
  {
    question: "Do you run Facebook and Google ads?",
    answer:
      "Absolutely. We build, launch and optimize paid campaigns across Meta and Google, including search, display and YouTube advertising, with full conversion tracking.",
  },
  {
    question: "Can MARKVORO build a website for my business?",
    answer:
      "Yes. We design and develop fast, modern, responsive websites — from business sites and landing pages to full e-commerce experiences.",
  },
  {
    question: "What is an AI agent?",
    answer:
      "An AI agent is an intelligent digital assistant trained on your business information that can respond to leads, answer customer questions, book appointments and automate repetitive tasks around the clock.",
  },
  {
    question: "Can you build a custom AI agent for my business?",
    answer:
      "Yes. We design AI agents tailored to your workflow — sales, support, booking, WhatsApp or full business automation.",
  },
  {
    question: "Can an AI agent work on WhatsApp?",
    answer:
      "Yes. Our AI WhatsApp agents can respond to customers, capture leads and automate conversations directly inside WhatsApp.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Timelines vary based on scope, but most business websites and landing pages are completed within a few weeks from discovery to launch.",
  },
  {
    question: "Do you work with businesses outside Pakistan?",
    answer:
      "Yes. MARKVORO works with ambitious businesses globally, delivering remote-friendly digital marketing, web development and AI automation services.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply reach out through our contact form, WhatsApp or email. We'll schedule a discovery call to understand your business and recommend the right growth strategy.",
  },
];

export const contactInfo = {
  phone: "+92 318 4340349",
  email: "markvoro08@gmail.com",
  whatsapp: "+923184340349",
};

export const serviceOptions = [
  "Social Media Marketing",
  "Meta & Google Ads",
  "SEO",
  "Website Development",
  "Branding",
  "Email Marketing",
  "AI Content Creation",
  "AI Agent Development",
  "Business Automation",
  "Other",
];

export const footerServices = [
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Paid Advertising", href: "/services/paid-advertising" },
  { label: "SEO", href: "/services/seo" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Branding", href: "/solutions" },
  { label: "Email Marketing", href: "/services/email-marketing" },
];

export const footerAISolutions = [
  { label: "AI Sales Agents", href: "/services/ai-agents" },
  { label: "AI Support Agents", href: "/services/ai-agents" },
  { label: "AI WhatsApp Agents", href: "/services/ai-agents" },
  { label: "AI Booking Agents", href: "/services/ai-agents" },
  { label: "Business Automation", href: "/automations" },
];

export type Industry = {
  name: string;
  useCase: string;
  description: string;
};

export const industries: Industry[] = [
  {
    name: "Real Estate",
    useCase: "Instant enquiry qualification",
    description:
      "An AI agent responds to portal, WhatsApp and website enquiries in seconds, qualifies budget, area and timeline, then books the viewing directly into your calendar.",
  },
  {
    name: "Restaurants & Hospitality",
    useCase: "Reservations & menu questions",
    description:
      "A chat and WhatsApp agent takes reservations, answers menu and allergen questions, and confirms large-party bookings while your team stays focused on service.",
  },
  {
    name: "E-Commerce",
    useCase: "Order support & recovery",
    description:
      "Order status, returns and sizing questions are resolved instantly from your store data, and abandoned checkouts trigger a personalised WhatsApp or email recovery sequence.",
  },
  {
    name: "Professional Services",
    useCase: "Consultation scheduling",
    description:
      "New enquiries for agencies, consultants and firms are triaged by service type, qualified against your criteria, and scheduled with the right person automatically.",
  },
  {
    name: "Healthcare & Clinics",
    useCase: "Appointments & reminders",
    description:
      "Scheduling, rescheduling and reminder sequences run automatically, reducing no-shows and taking routine questions off your front desk's phone line.",
  },
  {
    name: "Education",
    useCase: "Admissions & student support",
    description:
      "Course, fee and admission questions are answered around the clock, applications are tracked automatically, and follow-up is never missed.",
  },
  {
    name: "Home Services",
    useCase: "Missed-call recovery & dispatch",
    description:
      "Every missed call triggers an instant WhatsApp message that captures the job, quotes a starting range and books the visit — before the customer calls a competitor.",
  },
  {
    name: "Local Businesses",
    useCase: "Booking & customer support",
    description:
      "Salons, gyms, clinics and retail shops get a 24/7 agent that answers common questions, books appointments and captures leads outside business hours.",
  },
];

export type CaseStudy = {
  industry: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  before: string[];
  after: string[];
};

// Illustrative reference builds — describe representative architectures and
// the operational change they produce, not results from a named client.
export const caseStudies: CaseStudy[] = [
  {
    industry: "Real Estate",
    title: "AI Lead Qualification System",
    problem:
      "Enquiries arrived from a website form, a property portal and WhatsApp. They were handled manually during office hours, so response times stretched into the next working day.",
    solution:
      "A single AI agent now receives every enquiry regardless of channel, asks the qualifying questions a sales team would ask, scores the lead and books qualified prospects straight into a viewing slot.",
    outcome:
      "Every enquiry gets an immediate, contextual reply. Qualified leads reach the calendar without a human touch.",
    before: ["Three unconnected inboxes", "Replies during office hours only", "Manual scoring by memory"],
    after: ["One agent across every channel", "Immediate first response, 24/7", "Consistent scoring criteria"],
  },
  {
    industry: "E-Commerce",
    title: "Support Deflection & Order Assistant",
    problem:
      "Order status, returns and sizing questions made up most of the support queue, and abandoned checkouts had no recovery flow at all.",
    solution:
      "An AI agent trained on store policies and live order data answers routine questions instantly and hands off to a human the moment a conversation needs one, while abandoned carts trigger an automated recovery sequence.",
    outcome:
      "Repeat questions are resolved without a ticket, and abandoned checkouts get a real second chance to convert.",
    before: ["Support queue full of repeat questions", "No cart-recovery flow", "Manual order lookups"],
    after: ["Routine questions answered instantly", "Automated recovery sequence", "Escalation only when it matters"],
  },
  {
    industry: "Home Services",
    title: "WhatsApp Reception & Dispatch Flow",
    problem:
      "Missed calls during jobs meant missed business, and quoting a job required a callback and a back-and-forth before anything was booked.",
    solution:
      "A WhatsApp AI receptionist captures job details on first contact, prices against a rate card and books the visit — with a missed-call trigger that texts the customer automatically.",
    outcome: "Fewer missed jobs, faster quoting, and a booked visit before the customer looks elsewhere.",
    before: ["Missed calls, missed jobs", "Manual quoting by phone", "No after-hours coverage"],
    after: ["Every missed call gets an instant reply", "Instant starting-price quotes", "Booking captured 24/7"],
  },
];

export type PricingTier = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    tagline: "One focused service or agent",
    description:
      "A single, well-defined engagement done properly — one marketing service or one AI agent, one channel, one clean integration.",
    features: [
      "One service or one AI agent",
      "One primary channel",
      "Content or knowledge-base setup",
      "Up to two integrations",
      "Launch support",
    ],
  },
  {
    name: "Growth",
    tagline: "Multi-channel marketing + AI",
    description:
      "Connected marketing and AI systems working together — the right fit once one channel or one bottleneck isn't enough anymore.",
    features: [
      "Multiple marketing services",
      "AI agents across channels",
      "Lead capture & qualification",
      "Monthly reporting & optimisation",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    tagline: "Full growth partnership",
    description:
      "An embedded growth team: marketing, web, branding and AI automation running as one connected operating system for your business.",
    features: [
      "Full-funnel marketing & content",
      "Custom multi-agent AI systems",
      "Business process automation",
      "Dedicated account strategist",
      "Continuous optimisation cycle",
    ],
  },
];

export type AutomationStep = {
  label: string;
  detail: string;
};

export const automationSteps: AutomationStep[] = [
  { label: "Trigger", detail: "A form, message or missed call starts the workflow." },
  { label: "AI Reasoning", detail: "The agent reads intent and decides the next action." },
  { label: "System of Record", detail: "Contact, lead and conversation data is written and kept accurate." },
  { label: "Output Channels", detail: "Email, WhatsApp, calendar and your team are updated automatically." },
];

export const automationOutcomes = [
  { value: "< 3s", label: "Trigger to first reply" },
  { value: "24/7", label: "Coverage, no added headcount" },
  { value: "0", label: "Forgotten follow-ups" },
  { value: "Full", label: "Trace on every run" },
];
