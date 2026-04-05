export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja';

export const locales: Locale[] = ['zh-CN','zh-TW' , 'en', 'ja'];

export const defaultLocale: Locale = 'ja'; // 如果你想默认日文；不想的话可保留 'en'

// Map common language tags to our supported locales
const langMap: Record<string, Locale> = {
  // Simplified Chinese
  'zh-CN': 'zh-CN',
  zh: 'zh-CN',
  'zh-Hans': 'zh-CN',

  // Traditional Chinese
  'zh-TW': 'zh-TW',
  'zh-HK': 'zh-TW',
  'zh-Hant': 'zh-TW',
  // Japanese
  ja: 'ja',
  'ja-JP': 'ja',

  // English
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
};

export function normalizeLocale(tag: string): Locale {
  console.log('[normalizeLocale] Input tag:', tag);

  // Extract a clean language tag
  const cleanTag =
    tag.match(/^[a-zA-Z]{2,3}(-[a-zA-Z]{2,4})?/)?.[0] || tag;
  console.log('[normalizeLocale] Cleaned tag:', cleanTag);

  // 1. Exact match
  const exact = locales.find(
    (l) => l.toLowerCase() === cleanTag.toLowerCase()
  );
  if (exact) {
    console.log('[normalizeLocale] Found exact match:', exact);
    return exact;
  }

  // 2. Full tag in langMap
  if (langMap[cleanTag]) {
    console.log('[normalizeLocale] Found in langMap:', langMap[cleanTag]);
    return langMap[cleanTag];
  }

  // 3. Base language (e.g. ja-JP → ja)
  const base = cleanTag.split('-')[0];
  if (langMap[base]) {
    console.log('[normalizeLocale] Found base in langMap:', langMap[base]);
    return langMap[base];
  }

  console.log('[normalizeLocale] No match found, returning default:', defaultLocale);
  return defaultLocale;
}
