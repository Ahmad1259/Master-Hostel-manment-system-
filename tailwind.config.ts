import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF9F6", // Warm architectural ivory/stone
          subtle: "#F4F3EE",
          surface: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#18181B", // Deep charcoal slate
          muted: "#71717A",
          faint: "#A1A1AA",
        },
        border: {
          DEFAULT: "#E4E4E7", // Neutral zinc 1px rule
          strong: "#D4D4D8",
        },
        brass: {
          DEFAULT: "#B58544", // Antique Brass primary accent
          light: "#F7F2EB",
          hover: "#9E743A",
          dark: "#7A5726",
        },
        olive: {
          DEFAULT: "#1B4332", // Deep Olive botanical accent
          light: "#E8F0EC",
          hover: "#2D6A4F",
        },
        status: {
          vacant: "#2563EB",
          partial: "#D97706",
          occupied: "#15803D",
          unpaid: "#DC2626",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "Traditional Arabic", "Tahoma", "sans-serif"],
      },
      fontSize: {
        // Strict 4-Tier Operational Typography Scale (+ 1 Micro Monospace Token)
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.03em" }],       // 11px
        caption: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.02em" }],    // 12px
        body: ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],        // 14px
        subhead: ["1.125rem", { lineHeight: "1.625rem", letterSpacing: "-0.01em" }],  // 18px
        title: ["1.75rem", { lineHeight: "2.125rem", letterSpacing: "-0.025em" }],    // 28px
      },
      spacing: {
        // Strict 8px/4px layout rhythm tokens
        "1": "0.25rem", // 4px
        "2": "0.5rem",  // 8px
        "3": "0.75rem", // 12px
        "4": "1rem",    // 16px
        "6": "1.5rem",  // 24px
        "8": "2rem",    // 32px
        "12": "3rem",   // 48px
        "16": "4rem",   // 64px
      },
    },
  },
  plugins: [],
};

export default config;
