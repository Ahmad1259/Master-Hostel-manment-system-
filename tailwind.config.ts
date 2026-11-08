import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ONE dominant accent color: Deep Emerald Green (#059669) - Rule 11
        accent: {
          DEFAULT: "#059669",
          hover: "#047857",
          subtle: "#ECFDF5",
          border: "#A7F3D0",
          dark: "#064E3B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
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
