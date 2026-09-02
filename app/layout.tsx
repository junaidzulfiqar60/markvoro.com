import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
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

export const metadata: Metadata = {
  title: "MARKVORO — Grow Beyond Limits",
  description:
    "MARKVORO is a premium digital marketing, web development and AI automation agency helping ambitious businesses grow through strategy, creativity and intelligent technology.",
  keywords: [
    "digital marketing agency",
    "AI automation",
    "AI agents",
    "web development",
    "SEO",
    "Meta Ads",
    "Google Ads",
    "MARKVORO",
  ],
  icons: {
    icon: "/logo.jpeg",
  },
  openGraph: {
    title: "MARKVORO — Grow Beyond Limits",
    description:
      "Powerful digital marketing, creative technology, intelligent AI agents and high-performance websites for ambitious businesses.",
    images: ["/logo.jpeg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
