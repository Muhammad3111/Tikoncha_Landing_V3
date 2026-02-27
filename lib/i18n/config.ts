export const LANGUAGES = ["uz", "ru", "en"] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "uz";

export const NON_DEFAULT_LANGUAGES = LANGUAGES.filter(
  (l): l is Exclude<Lang, typeof DEFAULT_LANG> => l !== DEFAULT_LANG
);
