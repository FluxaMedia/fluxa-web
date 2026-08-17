import type { APIRoute } from 'astro';
import { docsNav } from '../lib/nav';

const slugify = (t: string) =>
  t.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

function plain(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^:::.*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const groups = await docsNav();
  const pages = groups.flatMap(g => g.items).map(entry => {
    const body = entry.body ?? '';
    const parts = body.split(/^## +(.+)$/m);
    const sections = [];
    for (let i = 1; i < parts.length; i += 2) {
      const content = plain(parts[i + 1] ?? '');
      if (content) sections.push({ title: parts[i].trim(), anchor: slugify(parts[i]), content });
    }
    return {
      slug: entry.id,
      title: entry.data.title,
      description: entry.data.description,
      section: entry.data.section,
      intro: plain(parts[0] ?? ''),
      sections,
    };
  });

  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
};
