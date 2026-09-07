import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch } from "../lib/api";

interface Ticket {
  id: string;
  ticketNumber: string;
  description: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  customer: { name: string | null; phone: string | null; email: string | null };
  assignedTo: { name: string } | null;
  createdAt: string;
}

const STATUSES: Ticket["status"][] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export function Tickets() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string>("");

  function load() {
    if (!clientId) return;
    apiFetch<Ticket[]>(`/clients/${clientId}/tickets${filter ? `?status=${filter}` : ""}`).then(setTickets);
  }

  useEffect(load, [clientId, filter]);

  async function updateStatus(ticketId: string, status: Ticket["status"]) {
    if (!clientId) return;
    await apiFetch(`/clients/${clientId}/tickets/${ticketId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Tickets</h1>
      </div>
      <div className="tabs">
        <button className={filter === "" ? "active" : ""} onClick={() => setFilter("")}>
          All
        </button>
        {STATUSES.map((s) => (
          <button key={s} className={filter === s ? "active" : ""} onClick={() => setFilter(s)}>
            {s.replace("_", " ")}
          </button>
        ))}
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Customer</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td style={{ color: "var(--text)" }}>{t.ticketNumber}</td>
                <td>{t.customer.name || t.customer.phone || t.customer.email || "—"}</td>
                <td style={{ maxWidth: 320 }}>{t.description}</td>
                <td>
                  <span className={`pill ${t.priority === "URGENT" || t.priority === "HIGH" ? "escalated" : "new"}`}>
                    {t.priority}
                  </span>
                </td>
                <td>{t.assignedTo?.name || "Unassigned"}</td>
                <td>
                  <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value as Ticket["status"])}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">
                  No tickets yet — the AI agent opens these when it can't resolve something itself.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
