import { defineConfig } from "astro/config";
import remark from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  integrations: [remark()],
});
