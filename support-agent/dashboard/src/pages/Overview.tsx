import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch } from "../lib/api";

interface OverviewData {
  totalConversations: number;
  openConversations: number;
  totalLeads: number;
  newLeads: number;
  kbDocuments: number;
  openTickets: number;
  upcomingAppointments: number;
  recentConversations: Array<{
    id: string;
    platform: string;
    status: string;
    mode: string;
    customer: { name: string | null; phone: string | null };
  }>;
}

interface PlatformClient {
  id: string;
  businessName: string;
  plan: string;
  status: string;
  _count: { conversations: number; leads: number };
}

export function Overview() {
  const { user } = useAuth();
  const [data, setData] = useState<OverviewData | null>(null);
  const [platformClients, setPlatformClients] = useState<PlatformClient[] | null>(null);

  useEffect(() => {
    if (user?.role === "SUPER_ADMIN") {
      apiFetch<PlatformClient[]>("/platform/clients").then(setPlatformClients);
      return;
    }
    if (user?.clientId) {
      apiFetch<OverviewData>(`/clients/${user.clientId}/dashboard/overview`).then(setData);
    }
  }, [user]);

  if (user?.role === "SUPER_ADMIN") {
    return (
      <div>
        <div className="page-head">
          <h1>MARKVORO Platform</h1>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Conversations</th>
                <th>Leads</th>
              </tr>
            </thead>
            <tbody>
              {platformClients?.map((c) => (
                <tr key={c.id}>
                  <td style={{ color: "var(--text)" }}>{c.businessName}</td>
                  <td>{c.plan}</td>
                  <td>
                    <span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span>
                  </td>
                  <td>{c._count.conversations}</td>
                  <td>{c._count.leads}</td>
                </tr>
              ))}
              {platformClients?.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No clients yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-head">
        <h1>Overview</h1>
      </div>
      {data && (
        <>
          <div className="stat-grid">
            <div className="card stat-card">
              <div className="label">Open conversations</div>
              <div className="value">{data.openConversations}</div>
            </div>
            <div className="card stat-card">
              <div className="label">Total conversations</div>
              <div className="value">{data.totalConversations}</div>
            </div>
            <div className="card stat-card">
              <div className="label">New leads</div>
              <div className="value">{data.newLeads}</div>
            </div>
            <div className="card stat-card">
              <div className="label">Total leads</div>
              <div className="value">{data.totalLeads}</div>
            </div>
            <div className="card stat-card">
              <div className="label">KB documents</div>
              <div className="value">{data.kbDocuments}</div>
            </div>
            <div className="card stat-card">
              <div className="label">Open tickets</div>
              <div className="value">{data.openTickets}</div>
            </div>
            <div className="card stat-card">
              <div className="label">Upcoming appointments</div>
              <div className="value">{data.upcomingAppointments}</div>
            </div>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: 14, fontSize: 14 }}>Recent conversations</h3>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Platform</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentConversations.map((c) => (
                  <tr key={c.id}>
                    <td style={{ color: "var(--text)" }}>{c.customer.name || c.customer.phone || "Anonymous"}</td>
                    <td>{c.platform}</td>
                    <td>
                      <span className={`pill ${c.mode.toLowerCase()}`}>{c.mode}</span>
                    </td>
                    <td>
                      <span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
                {data.recentConversations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty-state">
                      No conversations yet — share your widget or WhatsApp number to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
