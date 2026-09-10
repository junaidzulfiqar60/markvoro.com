import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD, kept as one
// component so the two never drift out of sync. `items` excludes the
// current page's own trailing entry — pass the full trail including Home.
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="section-padding container-max relative pt-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-white/40">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3 w-3 text-white/20" />}
              {isLast ? (
                <span className="font-medium text-white/70" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
