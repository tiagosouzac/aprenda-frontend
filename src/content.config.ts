import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z
      .object({
        titleBefore: z.string(),
        titleAccent: z.string(),
        titleAfter: z.string(),
      })
      .optional(),
  }),
});

export const collections = { lessons };
