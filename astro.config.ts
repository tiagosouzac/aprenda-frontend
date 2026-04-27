import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { course } from "./src/data/course";

const moduleRedirects = Object.fromEntries(
  course
    .filter((m) => m.lessons.length > 0)
    .map((m) => [m.rootHref, m.lessons[0].href]),
);

// https://astro.build/config
export default defineConfig({
  // update this when the production domain is defined
  site: "https://aprenda-frontend.dev",

  redirects: moduleRedirects,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap()],
});
