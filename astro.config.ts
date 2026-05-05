import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { moduleRedirects } from "./src/data/modules";
import { transformerCodeTitle } from "./src/lib/shiki-code-title";

// https://astro.build/config
export default defineConfig({
  // update this when the production domain is defined
  site: "https://tiagosouzac.github.io",
  base: "/aprenda-frontend",

  redirects: moduleRedirects,

  markdown: {
    shikiConfig: {
      transformers: [transformerCodeTitle],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap()],
});
