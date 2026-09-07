"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  clientName: string | null;
  projectUrl: string | null;
  thumbnail: string | null;
  images: string[];
  technologies: string[];
  featured: boolean;
  published: boolean;
  order: number;
};

const CATEGORIES = ["Website Development", "Digital Marketing", "Branding", "AI Automation", "AI Agents"];

const emptyForm = {
  title: "",
  slug: "",
  category: CATEGORIES[0],
  shortDescription: "",
  fullDescription: "",
  clientName: "",
  projectUrl: "",
  thumbnail: "",
  technologies: "",
  featured: false,
  published: true,
  order: 0,
};

export default function PortfolioPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => setItems(data.projects || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setError(null);
    setCreating(true);
  };

  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      clientName: project.clientName || "",
      projectUrl: project.projectUrl || "",
      thumbnail: project.thumbnail || "",
      technologies: project.technologies.join(", "),
      featured: project.featured,
      published: project.published,
      order: project.order,
    });
    setEditing(project);
    setError(null);
    setCreating(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      images: form.thumbnail ? [form.thumbnail] : [],
    };
    try {
      const res = await fetch(editing ? `/api/admin/portfolio/${editing.id}` : "/api/admin/portfolio", {
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
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    load();
  };

  const columns: Column<Project>[] = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "published",
      label: "Status",
      render: (row) => (
        <span className={row.published ? "text-brand-green" : "text-white/40"}>
          {row.published ? "Published" : "Draft"}
        </span>
      ),
    },
    { key: "featured", label: "Featured", render: (row) => (row.featured ? "Yes" : "—") },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-white/50">Showcase projects displayed on the homepage.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      <DataTable columns={columns} rows={items} loading={loading} onRowClick={openEdit} emptyMessage="No portfolio projects yet." />

      <Modal open={creating} onClose={() => setCreating(false)} title={editing ? "Edit Project" : "New Project"}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-base-panel">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Client Name</label>
              <input
                value={form.clientName}
                onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Short Description</label>
            <input
              value={form.shortDescription}
              onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Full Description</label>
            <textarea
              rows={3}
              value={form.fullDescription}
              onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Project URL</label>
              <input
                value={form.projectUrl}
                onChange={(e) => setForm((f) => ({ ...f, projectUrl: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Technologies (comma separated)</label>
              <input
                value={form.technologies}
                onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Thumbnail</label>
            <ImageUploader
              value={form.thumbnail}
              onChange={(url) => setForm((f) => ({ ...f, thumbnail: url }))}
              folder="portfolio"
            />
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
                Delete Project
              </button>
            )}
            <Button variant="primary" loading={saving} onClick={save} className="ml-auto text-sm">
              {editing ? "Save Changes" : "Create Project"}
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
        title="Delete this project?"
        description="This will permanently remove it from the portfolio."
      />
    </div>
  );
}
