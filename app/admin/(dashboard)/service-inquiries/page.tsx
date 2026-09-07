"use client";

import { useEffect, useState } from "react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import FilterBar from "@/components/admin/FilterBar";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string | null;
  service: string;
  budget: string | null;
  projectDetails: string;
  status: string;
  notes: string | null;
  createdAt: string;
};

const STATUS_OPTIONS = ["NEW", "CONTACTED", "IN_PROGRESS", "QUALIFIED", "CONVERTED", "CLOSED"];

export default function ServiceInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: "20" });
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    fetch(`/api/admin/service-inquiries?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      load();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const openItem = (item: Inquiry) => {
    setSelected(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || "");
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/service-inquiries/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      });
      if (res.ok) {
        setSelected(null);
        load();
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/service-inquiries/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    setSelected(null);
    load();
  };

  const columns: Column<Inquiry>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "service", label: "Service" },
    { key: "budget", label: "Budget", render: (row) => row.budget || "—" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Service Inquiries</h1>
        <p className="mt-1 text-sm text-white/50">Quote requests from the Services section.</p>
      </div>

      <FilterBar q={q} onQChange={setQ} status={status} onStatusChange={setStatus} statusOptions={STATUS_OPTIONS} />

      <DataTable
        columns={columns}
        rows={items}
        loading={loading}
        onRowClick={openItem}
        page={page}
        pageSize={20}
        total={total}
        onPageChange={setPage}
        emptyMessage="No service inquiries yet."
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Service Inquiry">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-white/40">Name</p>
                <p className="text-white">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Email</p>
                <p className="text-white">{selected.email}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Phone</p>
                <p className="text-white">{selected.phone}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Business</p>
                <p className="text-white">{selected.businessName || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Service</p>
                <p className="text-white">{selected.service}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Budget</p>
                <p className="text-white">{selected.budget || "—"}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40">Project Details</p>
              <p className="mt-1 text-sm text-white/80">{selected.projectDetails}</p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-base-panel">
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Internal Notes</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(selected.id)}
                className="text-sm text-brand-pink hover:underline"
              >
                Delete
              </button>
              <Button variant="primary" loading={saving} onClick={save} className="text-sm">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => confirmDeleteId && remove(confirmDeleteId)}
        title="Delete this inquiry?"
        description="This will permanently remove the inquiry and its notes."
      />
    </div>
  );
}
