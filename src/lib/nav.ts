import { getCollection } from 'astro:content';
import { SECTIONS } from '../content.config';
import { DEFAULT_LOCALE, isLocale, type Locale } from '../i18n/ui';

export type DocEntry = Awaited<ReturnType<typeof getCollection<'docs'>>>[number];

export const localeOf = (entry: DocEntry): Locale => {
  const prefix = entry.id.split('/')[0];
  return isLocale(prefix) ? prefix : DEFAULT_LOCALE;
};

export const slugOf = (entry: DocEntry) => entry.id.split('/').slice(1).join('/');

export type NavItem = {
  slug: string;
  entry: DocEntry;
  translated: boolean;
};

export async function docsPages(locale: Locale): Promise<NavItem[]> {
  const all = (await getCollection('docs')).filter(e => !e.data.draft);
  const base = all.filter(e => localeOf(e) === DEFAULT_LOCALE);
  const translated = new Map(
    all.filter(e => localeOf(e) === locale).map(e => [slugOf(e), e])
  );

  return base
    .map(fallback => {
      const slug = slugOf(fallback);
      const match = translated.get(slug);
      return { slug, entry: match ?? fallback, translated: Boolean(match) };
    })
    .sort((a, b) => {
      const sa = SECTIONS.indexOf(a.entry.data.section);
      const sb = SECTIONS.indexOf(b.entry.data.section);
      return sa === sb ? a.entry.data.order - b.entry.data.order : sa - sb;
    });
}

export async function docsNav(locale: Locale) {
  const pages = await docsPages(locale);
  return SECTIONS.map(section => ({
    section,
    items: pages.filter(p => p.entry.data.section === section),
  })).filter(group => group.items.length > 0);
}

export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}

export function localePath(locale: Locale, path: string) {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

export function docUrl(locale: Locale, slug: string) {
  return url(localePath(locale, `/docs/${slug}`));
}
