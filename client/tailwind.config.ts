import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class"],
  // Projet actuellement basé sur CSS “className=...”. On évite Tailwind preflight
  // pour ne pas casser les styles existants.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--foreground)",
        primary: { DEFAULT: "var(--accent)", foreground: "#ffffff" },
        destructive: { DEFAULT: "var(--danger)", foreground: "#ffffff" },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

