import { getCollection } from 'astro:content';
import { SECTIONS } from '../content.config';

export type DocEntry = Awaited<ReturnType<typeof getCollection<'docs'>>>[number];

export async function docsNav() {
  const entries = (await getCollection('docs')).filter(e => !e.data.draft);
  return SECTIONS.map(section => ({
    section,
    items: entries
      .filter(e => e.data.section === section)
      .sort((a, b) => a.data.order - b.data.order),
  })).filter(group => group.items.length > 0);
}

export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
