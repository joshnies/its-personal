import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const logs = defineCollection({
  loader: glob({ base: "./src/content/logs", pattern: "**/*.{md,mdx}" }),
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
      layout: z.string(),
      cover: image(),
      items: z.array(
        z.object({
          image: image(),
          caption: z.string(),
        }),
      ),
    }),
});

export const collections = { logs, projects };

