"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { BLOG_CATEGORY_OPTIONS } from "@/lib/validations";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  metaTitle: string | null;
  metaDescription: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: BLOG_CATEGORY_OPTIONS[0] as string,
  tags: "",
  author: "MARKVORO Team",
  metaTitle: "",
  metaDescription: "",
  featured: false,
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogAdminPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => setItems(data.posts || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setError(null);
    setCreating(true);
  };

  const openEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      category: post.category,
      tags: post.tags.join(", "),
      author: post.author,
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      featured: post.featured,
      published: post.published,
    });
    setEditing(post);
    setError(null);
    setCreating(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to save.");
        return;
      }
      setCreating(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    load();
  };

  const columns: Column<BlogPost>[] = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "publishedAt",
      label: "Published",
      render: (row) => new Date(row.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      key: "published",
      label: "Status",
      render: (row) => (
        <span className={row.published ? "text-brand-green" : "text-white/40"}>
          {row.published ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Blog</h1>
          <p className="mt-1 text-sm text-white/50">Articles shown at /blog and on the homepage.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Add Post
        </button>
      </div>

      <DataTable columns={columns} rows={items} loading={loading} onRowClick={openEdit} emptyMessage="No blog posts yet." />

      <Modal open={creating} onClose={() => setCreating(false)} title={editing ? "Edit Post" : "New Post"}>
        <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Title</label>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: editing ? f.slug : slugify(title) }));
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Content — separate paragraphs with a blank line. Start a line with &quot;## &quot; for a subheading.
            </label>
            <textarea
              rows={10}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Cover Image</label>
            <ImageUploader
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
              folder="blog"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              >
                {BLOG_CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-base-panel">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Author</label>
              <input
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Meta Title <span className="text-white/30">(optional — defaults to Title)</span>
              </label>
              <input
                value={form.metaTitle}
                onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Meta Description <span className="text-white/30">(optional — defaults to Excerpt)</span>
              </label>
              <input
                value={form.metaDescription}
                onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
          </div>

          {error && <p className="text-sm text-brand-pink">{error}</p>}

          <div className="flex justify-between pt-2">
            {editing && (
              <button
                type="button"
                onClick={() => setConfirmDeleteId(editing.id)}
                className="text-sm text-brand-pink hover:underline"
              >
                Delete Post
              </button>
            )}
            <Button variant="primary" loading={saving} onClick={save} className="ml-auto text-sm">
              {editing ? "Save Changes" : "Publish Post"}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) {
            remove(confirmDeleteId);
            setCreating(false);
          }
        }}
        title="Delete this post?"
        description="This will permanently remove it from the blog."
      />
    </div>
  );
}
