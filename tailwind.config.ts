import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#050510",
          navy: "#0a0a1a",
          panel: "#0d0d20",
          border: "#1e1e38",
        },
        brand: {
          blue: "#2f6ff0",
          cyan: "#22d3ee",
          green: "#22c55e",
          purple: "#8b5cf6",
          pink: "#ec4899",
          orange: "#f97316",
          yellow: "#facc15",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #f97316 0%, #ec4899 25%, #8b5cf6 50%, #2f6ff0 75%, #22d3ee 90%, #22c55e 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(236,72,153,0.15), rgba(139,92,246,0.15), rgba(47,111,240,0.15), rgba(34,211,238,0.15), rgba(34,197,94,0.15))",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(139,92,246,0.45)",
        "glow-cyan": "0 0 60px -10px rgba(34,211,238,0.45)",
        "glow-pink": "0 0 60px -10px rgba(236,72,153,0.45)",
        "glow-green": "0 0 60px -10px rgba(34,197,94,0.55)",
        card: "0 8px 30px rgba(0,0,0,0.45)",
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 1.5s infinite",
        "spin-slow": "spin 12s linear infinite",
        "spin-slower": "spin 22s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 30s linear infinite",
        "border-spin": "border-spin 4s linear infinite",
        "hud-scan": "hud-scan 3.5s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-spin": {
          "100%": { transform: "rotate(360deg)" },
        },
        "hud-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
    },
  },
  plugins: [],
};
export default config;
