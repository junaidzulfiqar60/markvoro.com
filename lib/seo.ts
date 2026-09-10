export const SITE_URL = "https://www.markvoro.com";
export const SITE_NAME = "MARKVORO";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

// Sitewide Organization schema — one legal/brand entity referenced by every
// page's more specific schema (Service, WebSite publisher, etc). No street
// address is included because none exists in the codebase; fabricating one
// would violate structured-data guidelines. Add `address`/`geo` once a
// verified business address is available.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.jpeg"),
    image: absoluteUrl("/logo.jpeg"),
    description:
      "MARKVORO is a digital marketing, web development and AI automation agency helping ambitious businesses grow through strategy, creativity and intelligent technology.",
    email: "markvoro08@gmail.com",
    telephone: "+92-318-4340349",
    areaServed: "PK",
    sameAs: [
      "https://www.instagram.com/markvoro610",
      "https://www.facebook.com/share/1EXm8bCUVd/",
      "https://tiktok.com/@markvoro.digital",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export type BreadcrumbItem = { label: string; href: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: absoluteUrl(`/services/${options.slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
  };
}
