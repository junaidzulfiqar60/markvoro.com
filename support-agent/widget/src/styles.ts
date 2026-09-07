// Inlined (not an external .css import) so the whole widget ships as one <script> file
// and never depends on the host page's stylesheet — see vite.config.ts's iife build.
export const WIDGET_CSS = `
:host, .mkv-root { all: initial; }
.mkv-root {
  position: fixed; bottom: 20px; right: 20px; z-index: 2147483000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
}
.mkv-bubble-toggle {
  width: 56px; height: 56px; border-radius: 999px; border: none; cursor: pointer;
  font-size: 22px; color: #fff; box-shadow: 0 6px 20px rgba(0,0,0,.25);
  display: flex; align-items: center; justify-content: center;
  transition: transform .15s ease;
}
.mkv-bubble-toggle:hover { transform: scale(1.06); }
.mkv-panel {
  width: 340px; max-width: calc(100vw - 40px); height: 480px; max-height: calc(100vh - 120px);
  background: #ffffff; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,.2);
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid rgba(0,0,0,.06);
}
.mkv-header {
  padding: 14px 16px; color: #fff; font-weight: 700; font-size: 14px;
  display: flex; align-items: center; justify-content: space-between;
}
.mkv-close { background: rgba(255,255,255,.2); border: none; color: #fff; width: 26px; height: 26px; border-radius: 8px; cursor: pointer; font-size: 12px; }
.mkv-messages { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; background: #f7f7f9; }
.mkv-empty { color: #8a8c96; font-size: 13px; text-align: center; margin-top: 20px; }
.mkv-bubble { max-width: 82%; padding: 9px 12px; border-radius: 12px; font-size: 13.5px; line-height: 1.45; white-space: pre-wrap; word-break: break-word; }
.mkv-customer { align-self: flex-end; background: #14151a; color: #fff; border-bottom-right-radius: 3px; }
.mkv-ai, .mkv-human_agent { align-self: flex-start; background: #fff; color: #14151a; border: 1px solid #e2e4ea; border-bottom-left-radius: 3px; }
.mkv-typing { opacity: .5; font-weight: 700; letter-spacing: 2px; }
.mkv-error { padding: 8px 14px; font-size: 12px; color: #b91c1c; background: #fef2f2; }
.mkv-input-row { display: flex; gap: 8px; padding: 10px; border-top: 1px solid #e2e4ea; background: #fff; }
.mkv-input-row input { flex: 1; border: 1px solid #e2e4ea; border-radius: 10px; padding: 9px 11px; font-size: 13.5px; outline: none; }
.mkv-input-row input:focus { border-color: #a78bfa; }
.mkv-input-row button { border: none; background: #14151a; color: #fff; width: 36px; border-radius: 10px; cursor: pointer; font-size: 14px; }
.mkv-input-row button:disabled { opacity: .4; cursor: not-allowed; }
.mkv-footer { text-align: center; font-size: 10.5px; color: #a3a5b0; padding: 6px 0 8px; background: #fff; }
@media (prefers-reduced-motion: reduce) { .mkv-bubble-toggle { transition: none; } }
`;
