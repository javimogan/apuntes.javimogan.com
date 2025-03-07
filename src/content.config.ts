
import { docsSchema } from "@astrojs/starlight/schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { defineCollection, z } from 'astro:content';
import moment from 'moment-timezone';
const docs = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: docsLoader(),
	// Type-check frontmatter using a schema
	schema: docsSchema(),
	// schema: z.object({
	// 	...docsSchema(),
		// lastUpdate: z.preprocess((arg:any) => moment(arg, "DD-MM-YYYY HH:mm").tz("Europe/Madrid").toDate(), z.date()).optional(),
	// }),
});

export const collections = { docs };
// import { defineCollection, z } from "astro:content";
// import { docsLoader } from "@astrojs/starlight/loaders";
// import { docsSchema } from "@astrojs/starlight/schema";
// import moment from "moment-timezone";

// export const collections = {
//   docs: defineCollection({
//     loader: docsLoader(),
//     schema: docsSchema({
//       extend: z.object({
//         lastUpdated: z.string()
//       }),
//     }),
//   }),
// };

// ...z.object({
// 	lastUpdate: z.preprocess((arg:any) => moment(arg, "DD-MM-YYYY HH:mm").tz("Europe/Madrid").toDate(), z.date()).optional(),

// }),