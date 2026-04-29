import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().positive(),
    hero: z
      .object({
        titleBefore: z.string(),
        titleAccent: z.string(),
        titleAfter: z.string(),
      })
      .optional(),
    quiz: z
      .array(
        z.object({
          question: z.string(),
          options: z.array(z.string()).min(2),
          correct: z.number().int().nonnegative(),
        }),
      )
      .optional(),
    comingSoon: z.boolean().optional(),
  }),
});

export const collections = { lessons };
