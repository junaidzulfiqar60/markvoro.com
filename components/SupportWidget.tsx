import Script from "next/script";

// Public by design: a widgetKey only identifies which client's chat config
// to load (like a site ID) and carries no privileged access — the same
// value is visible in this page's rendered HTML either way.
const SUPPORT_AGENT_API = "https://markvoro-support-agent.up.railway.app";
const SUPPORT_WIDGET_KEY = "cmtu8vqvj0002s9eqg1nk6uzc";

export function SupportWidget() {
  return (
    <Script
      src={`${SUPPORT_AGENT_API}/widget.js`}
      data-client={SUPPORT_WIDGET_KEY}
      data-api={SUPPORT_AGENT_API}
      data-name="MARKVORO"
      data-accent-from="#8b5cf6"
      data-accent-to="#22d3ee"
      strategy="afterInteractive"
    />
  );
}
