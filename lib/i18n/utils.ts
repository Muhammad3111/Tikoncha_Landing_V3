import { DEFAULT_LANG, LANGUAGES, type Lang } from "./config";
import { translations, type AppTranslations } from "./translations";

const languageSet = new Set<string>(LANGUAGES);

function trimSlashes(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}

export function isSupportedLang(value: string | undefined): value is Lang {
  return typeof value === "string" && languageSet.has(value);
}

export function resolveLang(value: string | undefined): Lang {
  return isSupportedLang(value) ? value : DEFAULT_LANG;
}

export function getTranslations(lang: Lang): AppTranslations {
  return translations[lang];
}

export function localizedPath(lang: Lang, path: string = "/"): string {
  const normalizedPath = path === "/" ? "" : trimSlashes(path);

  if (lang === DEFAULT_LANG) {
    return normalizedPath ? `/${normalizedPath}` : "/";
  }

  return normalizedPath ? `/${lang}/${normalizedPath}` : `/${lang}`;
}
