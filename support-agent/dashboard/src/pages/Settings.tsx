import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch, ApiError } from "../lib/api";

interface ChannelStatus {
  whatsapp: { connected: boolean; displayPhoneNumber?: string };
  messenger: { connected: boolean; pageName?: string };
  instagram: { connected: boolean; username?: string };
}

function ChannelCard({
  title,
  connected,
  label,
  fields,
  onConnect,
  onDisconnect,
}: {
  title: string;
  connected: boolean;
  label?: string;
  fields: { name: string; placeholder: string }[];
  onConnect: (values: Record<string, string>) => Promise<void>;
  onDisconnect: () => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await onConnect(values);
      setValues({});
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to connect.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: connected ? 0 : 14 }}>
        <h3 style={{ fontSize: 15 }}>{title}</h3>
        <span className={`pill ${connected ? "converted" : "lost"}`}>{connected ? "Connected" : "Not connected"}</span>
      </div>
      {connected ? (
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{label}</span>
          <button
            className="btn small"
            onClick={async () => {
              setBusy(true);
              await onDisconnect();
              setBusy(false);
            }}
            disabled={busy}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div className="field" key={f.name}>
              <input
                placeholder={f.placeholder}
                value={values[f.name] || ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                required
              />
            </div>
          ))}
          {error && <div className="error-text">{error}</div>}
          <button className="btn primary small" type="submit" disabled={busy}>
            {busy ? "Connecting…" : "Connect"}
          </button>
        </form>
      )}
    </div>
  );
}

export function Settings() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [status, setStatus] = useState<ChannelStatus | null>(null);

  function load() {
    if (!clientId) return;
    apiFetch<ChannelStatus>(`/clients/${clientId}/channels`).then(setStatus);
  }

  useEffect(load, [clientId]);

  if (!clientId) {
    return (
      <div>
        <div className="page-head">
          <h1>Settings</h1>
        </div>
        <p style={{ color: "var(--text-dim)" }}>Channel settings are per-client — sign in as a Client Admin to manage them.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-head">
        <h1>Settings</h1>
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 20, maxWidth: 640 }}>
        Connect additional channels here. Credentials come from your Meta App (WhatsApp Cloud API /
        Messenger / Instagram) — see the support-agent README for the webhook URLs to register.
      </p>

      {status && (
        <>
          <ChannelCard
            title="WhatsApp"
            connected={status.whatsapp.connected}
            label={status.whatsapp.displayPhoneNumber}
            fields={[
              { name: "phoneNumberId", placeholder: "Phone Number ID" },
              { name: "wabaId", placeholder: "WhatsApp Business Account ID" },
              { name: "accessToken", placeholder: "Access Token" },
              { name: "displayPhoneNumber", placeholder: "Display phone number (optional)" },
            ]}
            onConnect={async (v) => {
              await apiFetch(`/clients/${clientId}/channels/whatsapp`, { method: "POST", body: JSON.stringify(v) });
              load();
            }}
            onDisconnect={async () => {
              await apiFetch(`/clients/${clientId}/channels/whatsapp`, { method: "DELETE" });
              load();
            }}
          />
          <ChannelCard
            title="Messenger"
            connected={status.messenger.connected}
            label={status.messenger.pageName}
            fields={[
              { name: "pageId", placeholder: "Facebook Page ID" },
              { name: "accessToken", placeholder: "Page Access Token" },
              { name: "pageName", placeholder: "Page name (optional)" },
            ]}
            onConnect={async (v) => {
              await apiFetch(`/clients/${clientId}/channels/messenger`, { method: "POST", body: JSON.stringify(v) });
              load();
            }}
            onDisconnect={async () => {
              await apiFetch(`/clients/${clientId}/channels/messenger`, { method: "DELETE" });
              load();
            }}
          />
          <ChannelCard
            title="Instagram"
            connected={status.instagram.connected}
            label={status.instagram.username}
            fields={[
              { name: "igBusinessId", placeholder: "Instagram Business Account ID" },
              { name: "accessToken", placeholder: "Access Token" },
              { name: "username", placeholder: "Username (optional)" },
            ]}
            onConnect={async (v) => {
              await apiFetch(`/clients/${clientId}/channels/instagram`, { method: "POST", body: JSON.stringify(v) });
              load();
            }}
            onDisconnect={async () => {
              await apiFetch(`/clients/${clientId}/channels/instagram`, { method: "DELETE" });
              load();
            }}
          />
        </>
      )}
    </div>
  );
}
