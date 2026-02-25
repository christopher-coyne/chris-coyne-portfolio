/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "var(--color-bg)",
        "background-secondary": "var(--color-bg-secondary)",
        foreground: "var(--color-text)",
        "foreground-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
