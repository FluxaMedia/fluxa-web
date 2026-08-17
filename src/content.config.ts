import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const SECTIONS = ['start', 'how-it-works', 'core-workflows', 'operations', 'reference'] as const;

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

const home = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    buttons: z.array(z.object({ label: z.string(), href: z.string(), primary: z.boolean().default(false) })).default([]),
    shotTitle: z.string().default('Fluxa Home'),
  }),
});

export const collections = { docs, home };
