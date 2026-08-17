export const DEFAULT_LOCALE = 'en';

export const LOCALES = {
  en: { label: 'English', dir: 'ltr' },
  tr: { label: 'Türkçe', dir: 'ltr' },
} as const;

export type Locale = keyof typeof LOCALES;

export const localeList = Object.keys(LOCALES) as Locale[];

export const isLocale = (value: string): value is Locale => value in LOCALES;

const strings = {
  en: {
    'docs.title': 'Fluxa Docs',
    'docs.tagline': 'Guides and reference',
    'docs.search': 'Search docs...',
    'docs.searchLabel': 'Search documentation',
    'docs.noMatches': 'No matches',
    'docs.noMatchesHint': 'Try a shorter or different term.',
    'docs.onThisPage': 'On this page',
    'docs.updated': 'Updated',
    'docs.previous': 'Previous',
    'docs.next': 'Next',
    'docs.useful': 'Was this page useful?',
    'docs.usefulSub': 'Report outdated steps, missing screenshots, or unclear wording.',
    'docs.edit': 'Edit this page',
    'docs.report': 'Report an issue',
    'docs.untranslatedTitle': 'Not translated yet',
    'docs.untranslatedBody': 'This page is only available in English. Translations are welcome.',
    'docs.outdatedTitle': 'Translation may be outdated',
    'docs.outdatedBody': 'The English version changed after this translation was last updated.',
    'docs.helpTranslate': 'Help translate this page',
    'nav.features': 'Features',
    'nav.download': 'Download',
    'nav.docs': 'Docs',
    'nav.account': 'Account',
    'nav.menu': 'Open site menu',
    'nav.toggleDocs': 'Toggle documentation menu',
    'nav.language': 'Language',
    'section.start': 'Start',
    'section.how-it-works': 'How it works',
    'section.core-workflows': 'Core workflows',
    'section.operations': 'Operations',
    'section.reference': 'Reference',
  },
  tr: {
    'docs.title': 'Fluxa Dokümanlar',
    'docs.tagline': 'Rehberler ve başvuru',
    'docs.search': 'Dokümanlarda ara...',
    'docs.searchLabel': 'Dokümanlarda ara',
    'docs.noMatches': 'Sonuç yok',
    'docs.noMatchesHint': 'Daha kısa veya farklı bir terim deneyin.',
    'docs.onThisPage': 'Bu sayfada',
    'docs.updated': 'Güncellendi',
    'docs.previous': 'Önceki',
    'docs.next': 'Sonraki',
    'docs.useful': 'Bu sayfa işine yaradı mı?',
    'docs.usefulSub': 'Eskimiş adımları, eksik görselleri veya anlaşılmayan ifadeleri bildir.',
    'docs.edit': 'Bu sayfayı düzenle',
    'docs.report': 'Sorun bildir',
    'docs.untranslatedTitle': 'Henüz çevrilmedi',
    'docs.untranslatedBody': 'Bu sayfa şu an yalnızca İngilizce. Çeviri katkılarına açığız.',
    'docs.outdatedTitle': 'Çeviri eskimiş olabilir',
    'docs.outdatedBody': 'İngilizce sürüm, bu çeviri son güncellendikten sonra değişti.',
    'docs.helpTranslate': 'Bu sayfayı çevirmeye yardım et',
    'nav.features': 'Özellikler',
    'nav.download': 'İndir',
    'nav.docs': 'Dokümanlar',
    'nav.account': 'Hesap',
    'nav.menu': 'Menüyü aç',
    'nav.toggleDocs': 'Doküman menüsünü aç/kapat',
    'nav.language': 'Dil',
    'section.start': 'Başlangıç',
    'section.how-it-works': 'Nasıl çalışır',
    'section.core-workflows': 'Temel akışlar',
    'section.operations': 'İşletim',
    'section.reference': 'Başvuru',
  },
} as const;

export type StringKey = keyof (typeof strings)['en'];

export function t(locale: Locale, key: StringKey): string {
  return (strings[locale] as Record<string, string>)[key] ?? strings[DEFAULT_LOCALE][key];
}
