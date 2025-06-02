import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

const designs = defineCollection({
  loader: glob({ base: "./src/content/designs", pattern: "**/*.{yaml,yml}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.number(),
      cover: image(),
      items: z.array(
        z.object({
          image: image(),
          caption: z.string(),
        }),
      ),
    }),
});

export const collections = { articles, designs };
