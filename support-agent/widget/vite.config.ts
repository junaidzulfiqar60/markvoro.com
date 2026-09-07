import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds to a single embeddable script: <script src=".../widget.js" data-client="..." data-api="..."></script>
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/widget.tsx",
      name: "MarkvoroSupportWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
    cssCodeSplit: false,
  },
  server: { port: 5173 },
});
