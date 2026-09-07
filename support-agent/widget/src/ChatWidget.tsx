import { useEffect, useRef, useState } from "react";
import { WidgetApi, WidgetMessage, getSessionId } from "./api";

interface Props {
  apiBase: string;
  widgetKey: string;
  businessName?: string;
  accentFrom?: string;
  accentTo?: string;
}

export function ChatWidget({
  apiBase,
  widgetKey,
  businessName = "Chat with us",
  accentFrom = "#3b82f6",
  accentTo = "#a78bfa",
}: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const api = useRef(new WidgetApi(apiBase, widgetKey)).current;
  const sessionId = useRef(getSessionId()).current;

  useEffect(() => {
    if (!open) return;
    api.getHistory(sessionId).then((res) => setMessages(res.messages));
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, sender: "CUSTOMER", content: text, createdAt: new Date().toISOString() },
    ]);
    setSending(true);
    try {
      const result = await api.sendMessage(sessionId, text);
      if (result.replyText) {
        setMessages((prev) => [
          ...prev,
          { id: `reply-${Date.now()}`, sender: "AI", content: result.replyText!, createdAt: new Date().toISOString() },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mkv-root">
      {open && (
        <div className="mkv-panel">
          <div className="mkv-header" style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}>
            <span>{businessName}</span>
            <button className="mkv-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="mkv-messages" ref={scrollRef}>
            {messages.length === 0 && <p className="mkv-empty">Hi! Ask us anything — we usually reply instantly.</p>}
            {messages.map((m) => (
              <div key={m.id} className={`mkv-bubble mkv-${m.sender.toLowerCase()}`}>
                {m.content}
              </div>
            ))}
            {sending && <div className="mkv-bubble mkv-ai mkv-typing">···</div>}
          </div>
          {error && <div className="mkv-error">{error}</div>}
          <div className="mkv-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message…"
              aria-label="Message"
            />
            <button onClick={handleSend} disabled={sending || !input.trim()} aria-label="Send">
              ➤
            </button>
          </div>
          <div className="mkv-footer">Powered by MARKVORO</div>
        </div>
      )}
      <button
        className="mkv-bubble-toggle"
        style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
