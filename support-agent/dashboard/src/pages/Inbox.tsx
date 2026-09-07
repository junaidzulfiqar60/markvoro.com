import { useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/auth";
import { apiFetch } from "../lib/api";

interface ConversationSummary {
  id: string;
  platform: string;
  mode: "AI" | "HUMAN";
  status: string;
  customer: { name: string | null; phone: string | null };
  messages: Array<{ content: string }>;
}

interface Message {
  id: string;
  sender: "CUSTOMER" | "AI" | "HUMAN_AGENT";
  content: string;
  createdAt: string;
}

export function Inbox() {
  const { user } = useAuth();
  const clientId = user?.clientId;
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function loadConversations() {
    if (!clientId) return;
    apiFetch<ConversationSummary[]>(`/clients/${clientId}/conversations`).then(setConversations);
  }

  useEffect(loadConversations, [clientId]);

  useEffect(() => {
    if (!clientId || !selectedId) return;
    apiFetch<{ messages: Message[] }>(`/clients/${clientId}/conversations/${selectedId}/messages`).then((res) =>
      setMessages(res.messages),
    );
  }, [clientId, selectedId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const selected = conversations.find((c) => c.id === selectedId);

  async function sendReply() {
    if (!clientId || !selectedId || !reply.trim()) return;
    setSending(true);
    try {
      await apiFetch(`/clients/${clientId}/conversations/${selectedId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: reply.trim() }),
      });
      setReply("");
      const res = await apiFetch<{ messages: Message[] }>(
        `/clients/${clientId}/conversations/${selectedId}/messages`,
      );
      setMessages(res.messages);
    } finally {
      setSending(false);
    }
  }

  async function takeOver() {
    if (!clientId || !selectedId || !user) return;
    await apiFetch(`/clients/${clientId}/conversations/${selectedId}/assign`, {
      method: "POST",
      body: JSON.stringify({ agentId: user.id }),
    });
    loadConversations();
  }

  async function returnToAi() {
    if (!clientId || !selectedId) return;
    await apiFetch(`/clients/${clientId}/conversations/${selectedId}/reopen-to-ai`, { method: "PATCH" });
    loadConversations();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Inbox</h1>
      </div>
      <div className="inbox-layout">
        <div className="conv-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conv-item ${c.id === selectedId ? "active" : ""}`}
              onClick={() => setSelectedId(c.id)}
            >
              <div className="name">{c.customer.name || c.customer.phone || "Anonymous"}</div>
              <div className="snippet">{c.messages[0]?.content || "No messages yet"}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                <span className={`pill ${c.mode.toLowerCase()}`}>{c.mode}</span>
                <span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span>
              </div>
            </div>
          ))}
          {conversations.length === 0 && <div className="empty-state">No conversations yet.</div>}
        </div>

        <div className="thread-panel">
          {!selected && <div className="empty-state">Select a conversation to view it.</div>}
          {selected && (
            <>
              <div className="thread-header">
                <div>
                  <strong>{selected.customer.name || selected.customer.phone || "Anonymous"}</strong>{" "}
                  <span style={{ color: "var(--text-dim)", fontSize: 12 }}>· {selected.platform}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {selected.mode === "AI" ? (
                    <button className="btn small" onClick={takeOver}>
                      Take over
                    </button>
                  ) : (
                    <button className="btn small" onClick={returnToAi}>
                      Return to AI
                    </button>
                  )}
                </div>
              </div>
              <div className="thread-messages" ref={scrollRef}>
                {messages.map((m) => (
                  <div key={m.id} className={`msg ${m.sender.toLowerCase()}`}>
                    <div className="meta">{m.sender.replace("_", " ")}</div>
                    {m.content}
                  </div>
                ))}
              </div>
              <div className="thread-input">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  placeholder="Reply as a human agent…"
                />
                <button className="btn primary" onClick={sendReply} disabled={sending || !reply.trim()}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
