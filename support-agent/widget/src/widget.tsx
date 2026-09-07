import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { ChatWidget } from "./ChatWidget";
import { WIDGET_CSS } from "./styles";

function init() {
  const scripts = document.querySelectorAll<HTMLScriptElement>("script[data-client]");
  const script = scripts[scripts.length - 1]; // the widget's own <script> tag
  if (!script) {
    // eslint-disable-next-line no-console
    console.error("[markvoro-widget] Add data-client=\"<widgetKey>\" to the script tag.");
    return;
  }

  const widgetKey = script.dataset.client!;
  const apiBase = script.dataset.api || "http://localhost:4000";
  const businessName = script.dataset.name || undefined;
  const accentFrom = script.dataset.accentFrom || undefined;
  const accentTo = script.dataset.accentTo || undefined;

  const host = document.createElement("div");
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = WIDGET_CSS;
  shadow.appendChild(style);

  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  createRoot(mountPoint).render(
    createElement(ChatWidget, { apiBase, widgetKey, businessName, accentFrom, accentTo }),
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
