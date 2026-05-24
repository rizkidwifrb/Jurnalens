import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#080b10",
        foreground: "#e8edf4",
        muted: "#9aa7b7",
        panel: "rgba(18, 24, 33, 0.72)",
        border: "rgba(156, 175, 205, 0.16)",
        accent: "#8bd3ff",
        lime: "#b9f27c",
        rose: "#ff89a8"
      },
      boxShadow: {
        glow: "0 18px 80px rgba(139, 211, 255, 0.16)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
