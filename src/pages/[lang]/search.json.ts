import type { APIRoute } from 'astro';
import { searchIndex, jsonResponse } from '../../lib/searchindex';
import { localeList, DEFAULT_LOCALE, type Locale } from '../../i18n/ui';

export function getStaticPaths() {
  return localeList
    .filter(code => code !== DEFAULT_LOCALE)
    .map(lang => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) =>
  jsonResponse(await searchIndex(params.lang as Locale));
