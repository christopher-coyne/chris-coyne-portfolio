import { defineCollection, z } from "astro:content";

const dataCollection = defineCollection({
  type: "data",
  schema: z.any(),
});

export const collections = {
  data: dataCollection,
};

export interface ProjectIdea {
  title: string;
  description: string;
  difficulty: string;
}

export interface ProjectData {
  all_project_ideas: {
    [category: string]: ProjectIdea[];
  };
}
