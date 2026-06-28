import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string().optional(),
  esTagline: z.string().optional(),
  esDescription: z.string().optional(),
  type: z.enum(['saas', 'ecommerce', 'studio', 'platform']),
  status: z.enum(['live', 'beta', 'building', 'archived']),
  order: z.number(),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional(),
  stack: z.array(z.string()),
  metrics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  highlights: z.array(z.string()),
  esHighlights: z.array(z.string()).optional(),
  publishedAt: z.coerce.date(),
});

const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects/en' }),
  schema: projectSchema,
});

const projectsEs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects/es' }),
  schema: projectSchema,
});

export const collections = { projectsEn, projectsEs };
