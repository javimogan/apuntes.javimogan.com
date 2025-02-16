import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import moment from 'moment-timezone';
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		draft: z.boolean().optional(),
		hidden: z.boolean().optional(),
		// Transform string to Date object
		pubDate: z.preprocess((arg:any) => moment(arg, "DD/MM/YYYY HH:mm").tz("Europe/Madrid").toDate(), z.date()),
		updatedDate: z.preprocess((arg:any) => moment(arg, "DD/MM/YYYY HH:mm").tz("Europe/Madrid").toDate(), z.date()).optional(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog };
