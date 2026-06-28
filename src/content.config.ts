import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    tagline: z.string(),
    type: z.enum(['saas', 'ecommerce', 'studio', 'platform']),
    status: z.enum(['live', 'beta', 'building', 'archived']),
    order: z.number(),
    featured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    stack: z.array(z.string()),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    highlights: z.array(z.string()),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { projects };
