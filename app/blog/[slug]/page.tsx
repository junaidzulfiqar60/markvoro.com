import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingJsonLd } from "@/lib/seo";
import { getBlogPost, getBlogPosts } from "@/lib/content";

export const revalidate = 60;

// Maps a blog category to the most relevant /services/<slug> deep-dive page,
// so every article links back into the service funnel it's about.
const CATEGORY_TO_SERVICE_SLUG: Record<string, string> = {
  SEO: "seo",
  "Web Development": "web-development",
  "Digital Marketing": "social-media-marketing",
  "Paid Advertising": "paid-advertising",
  "AI & Automation": "ai-agents",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  const serviceSlug = CATEGORY_TO_SERVICE_SLUG[post.category];

  return (
    <>
      <Navbar />
      <main>
        <JsonLd
          data={blogPostingJsonLd({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            author: post.author,
            publishedAt: post.publishedAt,
            coverImage: post.coverImage,
          })}
        />

        <section className="relative overflow-hidden pt-40 pb-16 sm:pt-44">
          <div className="absolute inset-0 -z-10 bg-base-black" />
          <div className="pointer-events-none absolute inset-0 -z-10 hud-grid" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[140px]" />

          <div className="section-padding container-max relative mx-auto max-w-3xl text-center">
            <span className="badge-pill mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-widest">{post.category}</span>
            </span>
            <h1 className="mx-auto mt-6 text-balance font-display text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center justify-center gap-5 text-sm text-white/45">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </section>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <article className="relative py-12 sm:py-16">
          <div className="section-padding container-max mx-auto max-w-3xl">
            {post.coverImage && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              </div>
            )}

            <BlogContent content={post.content} />

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {serviceSlug && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                <p className="text-sm text-white/60">
                  Want help with {post.category}?{" "}
                  <Link href={`/services/${serviceSlug}`} className="font-semibold text-brand-cyan hover:text-white">
                    See how we can help →
                  </Link>
                </p>
              </div>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="relative py-16 sm:py-20">
            <div className="section-padding container-max">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">More from the blog</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
