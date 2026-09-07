import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch } from "../lib/api";

interface Appointment {
  id: string;
  service: string;
  scheduledAt: string;
  durationMinutes: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  customer: { name: string | null; phone: string | null; email: string | null };
}

export function Appointments() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  function load() {
    if (!clientId) return;
    apiFetch<Appointment[]>(`/clients/${clientId}/appointments`).then(setAppointments);
  }

  useEffect(load, [clientId]);

  async function updateStatus(id: string, status: Appointment["status"]) {
    if (!clientId) return;
    await apiFetch(`/clients/${clientId}/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Appointments</h1>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>Service</th>
              <th>Customer</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="num" style={{ color: "var(--text)" }}>
                  {new Date(a.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td>{a.service}</td>
                <td>{a.customer.name || a.customer.phone || a.customer.email || "—"}</td>
                <td>{a.durationMinutes} min</td>
                <td>
                  <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value as Appointment["status"])}>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">
                  No appointments yet — the AI agent books these once a customer picks an open slot.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
