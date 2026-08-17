import type { APIRoute } from 'astro';
import { searchIndex, jsonResponse } from '../lib/searchindex';
import { DEFAULT_LOCALE } from '../i18n/ui';

export const GET: APIRoute = async () => jsonResponse(await searchIndex(DEFAULT_LOCALE));
