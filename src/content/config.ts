import { defineCollection } from "astro:content";
import { z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean(),
  }),
});

export const collections = { blog };
