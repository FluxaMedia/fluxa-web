import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const SECTIONS = ['Start', 'How it works', 'Core workflows', 'Operations', 'Reference'] as const;

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(SECTIONS),
    icon: z.string().default('file-text'),
    order: z.number().default(99),
    badges: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
