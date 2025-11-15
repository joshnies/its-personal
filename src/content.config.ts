import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{yaml,yml}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      summary: z.string(),
      pubDate: z.coerce.date(),
      cover: image(),
      items: z.array(
        z.object({
          image: image(),
          caption: z.string(),
        }),
      ),
    }),
});

export const collections = { articles, projects };

