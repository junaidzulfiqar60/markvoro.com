import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group relative block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-glow">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" />

        <span className="relative inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-cyan">
          {post.category}
        </span>

        <h3 className="relative mt-4 font-display text-lg font-semibold leading-snug text-white">
          {post.title}
        </h3>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>

        <div className="relative mt-6 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition-colors group-hover:text-white">
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
