import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch, ApiError } from "../lib/api";

interface KbDocument {
  id: string;
  title: string;
  sourceType: string;
  status: "PROCESSING" | "READY" | "FAILED";
  createdAt: string;
}

export function KnowledgeBase() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [docs, setDocs] = useState<KbDocument[]>([]);
  const [mode, setMode] = useState<"faq" | "url">("faq");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function load() {
    if (!clientId) return;
    apiFetch<KbDocument[]>(`/clients/${clientId}/knowledge-base/documents`).then(setDocs);
  }

  useEffect(load, [clientId]);
  useEffect(() => {
    const interval = setInterval(load, 4000); // pick up PROCESSING -> READY without a manual refresh
    return () => clearInterval(interval);
  }, [clientId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    setError(null);
    setSubmitting(true);
    try {
      await apiFetch(`/clients/${clientId}/knowledge-base/documents`, {
        method: "POST",
        body: JSON.stringify(
          mode === "faq" ? { title, sourceType: "faq", text } : { title, sourceType: "url", url },
        ),
      });
      setTitle("");
      setText("");
      setUrl("");
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!clientId) return;
    await apiFetch(`/clients/${clientId}/knowledge-base/documents/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Knowledge Base</h1>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="tabs">
          <button className={mode === "faq" ? "active" : ""} onClick={() => setMode("faq")}>
            Paste text / FAQ
          </button>
          <button className={mode === "url" ? "active" : ""} onClick={() => setMode("url")}>
            From URL
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          {mode === "faq" ? (
            <div className="field">
              <label htmlFor="text">Content</label>
              <textarea
                id="text"
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Q: ... A: ... — or any business info, pricing, policies, hours."
                required
              />
            </div>
          ) : (
            <div className="field">
              <label htmlFor="url">Page URL</label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/faq"
                required
              />
            </div>
          )}
          {error && <div className="error-text">{error}</div>}
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? "Adding…" : "Add to knowledge base"}
          </button>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td style={{ color: "var(--text)" }}>{d.title}</td>
                <td>{d.sourceType}</td>
                <td>
                  <span className={`pill ${d.status === "READY" ? "converted" : d.status === "FAILED" ? "lost" : "new"}`}>
                    {d.status}
                  </span>
                </td>
                <td>
                  <button className="btn small" onClick={() => remove(d.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">
                  No documents yet — add your FAQs, pricing, or policies so the AI can answer from them.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
