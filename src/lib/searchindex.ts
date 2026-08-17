import { docsPages } from './nav';
import { t, type Locale } from '../i18n/ui';

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

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

export async function searchIndex(locale: Locale) {
  const pages = await docsPages(locale);

  return pages.map(page => {
    const parts = (page.entry.body ?? '').split(/^## +(.+)$/m);
    const sections = [];
    for (let i = 1; i < parts.length; i += 2) {
      const content = plain(parts[i + 1] ?? '');
      if (content) sections.push({ title: parts[i].trim(), anchor: slugify(parts[i]), content });
    }
    return {
      slug: page.slug,
      title: page.entry.data.title,
      description: page.entry.data.description,
      section: t(locale, `section.${page.entry.data.section}` as const),
      translated: page.translated,
      intro: plain(parts[0] ?? ''),
      sections,
    };
  });
}

export function jsonResponse(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
