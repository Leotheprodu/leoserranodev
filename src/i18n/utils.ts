import { en } from './en';
import { es } from './es';
import { languages, defaultLanguage, type Language, type Dictionary, supportedLanguages } from './types';

const dictionaries: Record<Language, Dictionary> = { en, es };

export function getDictionary(lang: Language = defaultLanguage): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLanguage];
}

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (supportedLanguages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLanguage;
}

export function getLocalizedPath(path: string, targetLang: Language): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  let basePath = cleanPath;
  if (basePath === '/es' || basePath === '/es/') {
    basePath = '/';
  } else if (basePath.startsWith('/es/')) {
    basePath = basePath.slice(3);
  } else if (basePath.startsWith('/es')) {
    basePath = basePath.slice(3) || '/';
  }

  if (targetLang === defaultLanguage) {
    return basePath;
  }
  if (basePath === '/') {
    return `/${targetLang}/`;
  }
  return `/${targetLang}${basePath}`;
}

export function useTranslations(lang: Language = defaultLanguage) {
  const dict = getDictionary(lang);
  return function t(key: keyof Dictionary | string): string {
    const keys = (key as string).split('.');
    let value: any = dict;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key as string;
      }
    }
    return typeof value === 'string' ? value : (key as string);
  };
}

export type { Language, Dictionary };
export { defaultLanguage, supportedLanguages, languages };
