import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { blogJsonLd } from "@/lib/seo";
import { getBlogPosts } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on digital marketing, web development, SEO and AI automation for businesses in Pakistan — from the MARKVORO team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main>
        <JsonLd data={blogJsonLd()} />
        <PageHero
          eyebrow="MARKVORO Blog"
          title={
            <>
              Ideas to help you <span className="text-gradient">grow beyond limits.</span>
            </>
          }
          description="Practical guides on marketing, websites and AI automation for businesses in Pakistan — no fluff, no guarantees we can't back up."
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

        <section className="relative py-16 sm:py-20">
          <div className="section-padding container-max">
            {posts.length === 0 ? (
              <p className="text-center text-white/50">New articles are on the way — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
