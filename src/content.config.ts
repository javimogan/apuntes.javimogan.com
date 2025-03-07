
import { docsSchema } from "@astrojs/starlight/schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { defineCollection, z } from 'astro:content';
const docs = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: docsLoader(),
	// Type-check frontmatter using a schema
	schema: docsSchema({
		extend: z.object({
			id: z.string().optional(),
		})
	})
});

export const collections = { docs };