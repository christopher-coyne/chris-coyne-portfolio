import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-l1": "#EAE7FF",
        "primary-d1": "#22202F",
      },
      // Customizing spacing (margins, paddings)
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
    },
  },
  plugins: [],
};
export default config;
