export interface WidgetMessage {
  id: string;
  sender: "CUSTOMER" | "AI" | "HUMAN_AGENT";
  content: string;
  createdAt: string;
}

const SESSION_KEY = "markvoro_widget_session_id";

export function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Private browsing / storage blocked — fall back to an in-memory session for this page load.
    return crypto.randomUUID();
  }
}

export class WidgetApi {
  constructor(
    private readonly apiBase: string,
    private readonly widgetKey: string,
  ) {}

  async getHistory(sessionId: string): Promise<{ messages: WidgetMessage[]; mode?: string }> {
    const res = await fetch(
      `${this.apiBase}/api/v1/widget/${this.widgetKey}/messages?sessionId=${encodeURIComponent(sessionId)}`,
    );
    if (!res.ok) return { messages: [] };
    return res.json();
  }

  async sendMessage(sessionId: string, text: string): Promise<{ replyText: string | null; handedOff: boolean }> {
    const res = await fetch(`${this.apiBase}/api/v1/widget/${this.widgetKey}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, text }),
    });
    if (!res.ok) {
      throw new Error(res.status === 429 ? "Too many messages — please wait a moment." : "Message failed to send.");
    }
    return res.json();
  }
}
