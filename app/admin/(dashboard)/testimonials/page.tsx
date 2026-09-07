"use client";

import { useEffect, useState } from "react";
import { Plus, Star } from "lucide-react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type Testimonial = {
  id: string;
  clientName: string;
  clientCompany: string;
  clientImage: string | null;
  testimonial: string;
  rating: number;
  featured: boolean;
  published: boolean;
};

const emptyForm = {
  clientName: "",
  clientCompany: "",
  clientImage: "",
  testimonial: "",
  rating: 5,
  featured: false,
  published: true,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => setItems(data.testimonials || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setError(null);
    setCreating(true);
  };

  const openEdit = (t: Testimonial) => {
    setForm({
      clientName: t.clientName,
      clientCompany: t.clientCompany,
      clientImage: t.clientImage || "",
      testimonial: t.testimonial,
      rating: t.rating,
      featured: t.featured,
      published: t.published,
    });
    setEditing(t);
    setError(null);
    setCreating(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    load();
  };

  const columns: Column<Testimonial>[] = [
    { key: "clientName", label: "Client" },
    { key: "clientCompany", label: "Company" },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <span className="flex items-center gap-0.5">
          {Array.from({ length: row.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
          ))}
        </span>
      ),
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
          <h1 className="font-display text-2xl font-bold text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-white/50">Client feedback displayed on the homepage.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      <DataTable columns={columns} rows={items} loading={loading} onRowClick={openEdit} emptyMessage="No testimonials yet." />

      <Modal open={creating} onClose={() => setCreating(false)} title={editing ? "Edit Testimonial" : "New Testimonial"}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Client Name</label>
              <input
                value={form.clientName}
                onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Company</label>
              <input
                value={form.clientCompany}
                onChange={(e) => setForm((f) => ({ ...f, clientCompany: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Testimonial</label>
            <textarea
              rows={3}
              value={form.testimonial}
              onChange={(e) => setForm((f) => ({ ...f, testimonial: e.target.value }))}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="bg-base-panel">
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Client Photo</label>
            <ImageUploader
              value={form.clientImage}
              onChange={(url) => setForm((f) => ({ ...f, clientImage: url }))}
              folder="testimonials"
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
                Delete Testimonial
              </button>
            )}
            <Button variant="primary" loading={saving} onClick={save} className="ml-auto text-sm">
              {editing ? "Save Changes" : "Create Testimonial"}
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
        title="Delete this testimonial?"
        description="This will permanently remove it from the homepage."
      />
    </div>
  );
}
