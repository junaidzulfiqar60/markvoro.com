import {
  Share2,
  Megaphone,
  Search,
  PenTool,
  Palette,
  Code2,
  Mail,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Smartphone,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "About", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  number: string;
  icon: LucideIcon;
  name: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    number: "01",
    icon: Share2,
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
  },
  {
    number: "02",
    icon: Megaphone,
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
  },
  {
    number: "03",
    icon: Search,
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
  },
  {
    number: "04",
    icon: PenTool,
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
    icon: Palette,
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
    icon: Code2,
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
  },
  {
    number: "07",
    icon: Mail,
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
  },
  {
    number: "08",
    icon: Users,
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
    icon: Star,
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
    icon: Sparkles,
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
  phone: "+92 310 7139610",
  email: "markvoro08@gmail.com",
  whatsapp: "+923107139610",
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
  "Social Media Marketing",
  "Paid Advertising",
  "SEO",
  "Web Development",
  "Branding",
  "Email Marketing",
];

export const footerAISolutions = [
  "AI Sales Agents",
  "AI Support Agents",
  "AI WhatsApp Agents",
  "AI Booking Agents",
  "Business Automation",
];
