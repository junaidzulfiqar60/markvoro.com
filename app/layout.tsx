import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// HUD/telemetry accents — status pills, eyebrow labels, agent runtime readouts.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MARKVORO — Digital Marketing & AI Automation Agency in Pakistan",
    template: "%s — MARKVORO",
  },
  description:
    "MARKVORO is a digital marketing agency in Pakistan offering SEO, social media marketing, Google & Facebook ads, web development and AI agent development — helping ambitious businesses grow through strategy, creativity and intelligent technology.",
  keywords: [
    "digital marketing agency Pakistan",
    "SEO agency Pakistan",
    "social media marketing agency Pakistan",
    "web development company Pakistan",
    "AI automation agency Pakistan",
    "AI agent development company Pakistan",
    "Google Ads agency Pakistan",
    "Facebook advertising agency Pakistan",
    "MARKVORO",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    siteName: "MARKVORO",
    title: "MARKVORO — Digital Marketing & AI Automation Agency in Pakistan",
    description:
      "Powerful digital marketing, creative technology, intelligent AI agents and high-performance websites for ambitious businesses.",
    images: ["/logo.jpeg"],
    type: "website",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "MARKVORO — Digital Marketing & AI Automation Agency in Pakistan",
    description:
      "Powerful digital marketing, creative technology, intelligent AI agents and high-performance websites for ambitious businesses.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
