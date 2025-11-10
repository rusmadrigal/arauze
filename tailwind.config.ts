import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 clave para que funcione el toggle agregando .dark al <html>
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          500: "#2F66D5",
          600: "#2552AD",
          700: "#1D3E82",
        },
        surface: "#F5F7FA",
      },
      boxShadow: {
        card: "0 6px 20px rgba(16,24,40,.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    },
  },
  plugins: [],
};

export default config;
