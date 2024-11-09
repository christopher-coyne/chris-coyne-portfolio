/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "night", "winter"], // night and winter
  },
};

// darkMode: ['class', '[data-theme="night"]']
