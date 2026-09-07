"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import FilterBar from "@/components/admin/FilterBar";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type Subscriber = {
  id: string;
  email: string;
  status: string;
  subscribedAt: string;
};

const STATUS_OPTIONS = ["ACTIVE", "UNSUBSCRIBED"];

function toCsv(rows: Subscriber[]): string {
  const header = "Email,Status,Subscribed At";
  const lines = rows.map((r) => {
    const email = r.email.includes(",") ? `"${r.email}"` : r.email;
    return `${email},${r.status},${new Date(r.subscribedAt).toISOString()}`;
  });
  return [header, ...lines].join("\n");
}

export default function NewsletterPage() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: "50" });
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    fetch(`/api/admin/newsletter?${params}`)
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

  const toggleStatus = async (row: Subscriber) => {
    const nextStatus = row.status === "ACTIVE" ? "UNSUBSCRIBED" : "ACTIVE";
    await fetch(`/api/admin/newsletter/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    load();
  };

  const exportCsv = () => {
    const csv = toCsv(items);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const columns: Column<Subscriber>[] = [
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "subscribedAt", label: "Subscribed", render: (row) => new Date(row.subscribedAt).toLocaleDateString() },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleStatus(row);
            }}
            className="text-brand-cyan hover:underline"
          >
            {row.status === "ACTIVE" ? "Unsubscribe" : "Reactivate"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDeleteId(row.id);
            }}
            className="text-brand-pink hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Newsletter</h1>
          <p className="mt-1 text-sm text-white/50">Subscribers collected from the website.</p>
        </div>
        <button type="button" onClick={exportCsv} className="btn-secondary text-sm">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <FilterBar q={q} onQChange={setQ} status={status} onStatusChange={setStatus} statusOptions={STATUS_OPTIONS} />

      <DataTable
        columns={columns}
        rows={items}
        loading={loading}
        page={page}
        pageSize={50}
        total={total}
        onPageChange={setPage}
        emptyMessage="No subscribers yet."
      />

      <ConfirmDialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) return remove(confirmDeleteId);
        }}
        title="Remove this subscriber?"
        description="This will permanently delete the subscriber record."
      />
    </div>
  );
}
