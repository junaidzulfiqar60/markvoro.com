"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { ICON_NAMES } from "@/lib/iconMap";

type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: string;
  features: string[];
  featured: boolean;
  active: boolean;
  order: number;
};

const CATEGORIES = ["Digital Marketing", "Web Development", "Branding", "AI Solutions"];

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  icon: ICON_NAMES[0],
  category: CATEGORIES[0],
  features: "",
  featured: false,
  active: true,
  order: 0,
};

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setItems(data.services || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setError(null);
    setCreating(true);
  };

  const openEdit = (s: Service) => {
    setForm({
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      icon: s.icon,
      category: s.category,
      features: s.features.join(", "),
      featured: s.featured,
      active: s.active,
      order: s.order,
    });
    setEditing(s);
    setError(null);
    setCreating(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      order: Number(form.order),
    };
    try {
      const res = await fetch(editing ? `/api/admin/services/${editing.id}` : "/api/admin/services", {
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
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    load();
  };

  const columns: Column<Service>[] = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "order", label: "Order" },
    {
      key: "active",
      label: "Status",
      render: (row) => (
        <span className={row.active ? "text-brand-green" : "text-white/40"}>
          {row.active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-sm text-white/50">Services displayed on the homepage.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <DataTable columns={columns} rows={items} loading={loading} onRowClick={openEdit} emptyMessage="No services yet." />

      <Modal open={creating} onClose={() => setCreating(false)} title={editing ? "Edit Service" : "New Service"}>
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Icon</label>
              <select
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              >
                {ICON_NAMES.map((name) => (
                  <option key={name} value={name} className="bg-base-panel">
                    {name}
                  </option>
                ))}
              </select>
            </div>
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
              <label className="mb-1.5 block text-xs font-medium text-white/60">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Features (comma separated)</label>
            <input
              value={form.features}
              onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
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
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              Active
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
                Delete Service
              </button>
            )}
            <Button variant="primary" loading={saving} onClick={save} className="ml-auto text-sm">
              {editing ? "Save Changes" : "Create Service"}
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
        title="Delete this service?"
        description="This will permanently remove it from the homepage."
      />
    </div>
  );
}
