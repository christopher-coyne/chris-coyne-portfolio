/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        background: "var(--paper)",
        "background-secondary": "var(--tile)",
        foreground: "var(--ink)",
        "foreground-muted": "var(--ink-soft)",
        "foreground-faint": "var(--ink-faint)",
        border: "var(--line)",
        "border-soft": "var(--line-soft)",
        accent: "var(--accent)",
        primary: "var(--ink)",
        "primary-hover": "var(--accent)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
