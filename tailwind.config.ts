import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F8FA",
        surface: "#FFFFFF",
        line: "#E4E7EC",
        ink: "#0B0F17",
        muted: "#475569",
        faint: "#6B7280",
        accent: "#FF5A1F",
        "accent-light": "#FF7A45",
        "accent-deep": "#B8380F",
        "accent-soft": "#FFF1EA",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
