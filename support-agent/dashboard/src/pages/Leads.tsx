import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch } from "../lib/api";

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  requirement: string;
  score: number;
  status: "NEW" | "QUALIFIED" | "CONVERTED" | "LOST";
  source: string;
  createdAt: string;
}

const STATUSES: Lead["status"][] = ["NEW", "QUALIFIED", "CONVERTED", "LOST"];

export function Leads() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>("");

  function load() {
    if (!clientId) return;
    apiFetch<Lead[]>(`/clients/${clientId}/leads${filter ? `?status=${filter}` : ""}`).then(setLeads);
  }

  useEffect(load, [clientId, filter]);

  async function updateStatus(leadId: string, status: Lead["status"]) {
    if (!clientId) return;
    await apiFetch(`/clients/${clientId}/leads/${leadId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Leads</h1>
      </div>
      <div className="tabs">
        <button className={filter === "" ? "active" : ""} onClick={() => setFilter("")}>
          All
        </button>
        {STATUSES.map((s) => (
          <button key={s} className={filter === s ? "active" : ""} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Requirement</th>
              <th>Score</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td style={{ color: "var(--text)" }}>{lead.name}</td>
                <td>{[lead.phone, lead.email].filter(Boolean).join(" · ") || "—"}</td>
                <td style={{ maxWidth: 320 }}>{lead.requirement}</td>
                <td>{lead.score}</td>
                <td>{lead.source}</td>
                <td>
                  <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">
                  No leads yet — the AI agent captures these automatically during conversations.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
