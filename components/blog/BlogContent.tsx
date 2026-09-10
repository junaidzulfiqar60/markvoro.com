import Link from "next/link";
import { Fragment } from "react";

// Renders admin-authored plain-text content into styled blocks. Blocks are
// separated by a blank line; a block starting with "## " renders as an H2,
// everything else as a paragraph. No markdown library / HTML injection —
// content only ever reaches the DOM as React text nodes.
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
    const [, label, href] = match;
    return (
      <Link
        key={`${keyPrefix}-${i}`}
        href={href}
        className="font-semibold text-brand-cyan underline decoration-brand-cyan/30 underline-offset-4 transition-colors hover:text-white"
      >
        {label}
      </Link>
    );
  });
}

export default function BlogContent({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 font-display text-xl font-bold text-white sm:text-2xl">
              {renderInline(block.slice(3), `h-${i}`)}
            </h2>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-white/65">
            {renderInline(block, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}
