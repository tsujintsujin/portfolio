import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBF7F0",
        "bg-alt": "#F5EFE3",
        surface: "#FFFFFF",
        ink: "#2B2118",
        muted: "#5B4D3F",
        faint: "#7A6B54",
        line: "#E8DFD0",
        accent: "#F2542D",
        "accent-deep": "#C23D1A",
        "accent-light": "#FF8B62",
        "accent-soft": "#FCE5DA",
        secondary: "#3DAE7A",
        "secondary-deep": "#257A4B",
        "secondary-soft": "#E3F3EA",
        success: "#257A4B",
        error: "#C4292F",
        "error-soft": "#FBE3E1",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
