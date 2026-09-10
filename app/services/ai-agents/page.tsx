import type { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { getServicePage } from "@/lib/servicePages";

const data = getServicePage("ai-agents")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `/services/${data.slug}` },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `/services/${data.slug}`,
  },
};

export default function AiAgentsServicePage() {
  return <ServicePageTemplate data={data} />;
}
