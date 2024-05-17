import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import markdown from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), markdown()],
});
