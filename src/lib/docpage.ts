import { docsPages } from './nav';
import { lastUpdated } from './gitdate';
import { DEFAULT_LOCALE, type Locale } from '../i18n/ui';

export const docFile = (locale: Locale, slug: string) => `src/content/docs/${locale}/${slug}.md`;

export async function docPaths(locale: Locale) {
  const pages = await docsPages(locale);

  return pages.map((page, i) => {
    const file = docFile(page.translated ? locale : DEFAULT_LOCALE, page.slug);
    const updated = lastUpdated(file);
    const outdated =
      page.translated &&
      locale !== DEFAULT_LOCALE &&
      updated < lastUpdated(docFile(DEFAULT_LOCALE, page.slug));

    return {
      params: { slug: page.slug },
      props: {
        entry: page.entry,
        slug: page.slug,
        locale,
        translated: page.translated,
        outdated,
        updated,
        editPath: file,
        prev: pages[i - 1],
        next: pages[i + 1],
      },
    };
  });
}
