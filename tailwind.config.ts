import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ONE dominant accent color: Deep Emerald Green (#059669)
        accent: {
          DEFAULT: "#059669",
          hover: "#047857",
          subtle: "#ECFDF5",
          border: "#A7F3D0",
          dark: "#064E3B",
        },
        // Lyndor luxury aesthetic palette
        lyndor: {
          cream: "#FBF8F1",
          sand: "#F4EFEA",
          dark: "#0C0C0C",
          darkCard: "#141414",
          muted: "#5D6C7B",
          borderLight: "rgba(12, 12, 12, 0.08)",
          borderDark: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          '"Cormorant Garamond"',
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          '"Plus Jakarta Sans"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        arabic: [
          '"Noto Sans Arabic"',
          "Tahoma",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
