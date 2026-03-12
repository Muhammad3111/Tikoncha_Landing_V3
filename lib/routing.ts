import { notFound } from "next/navigation";
import { DEFAULT_LANG, LANGUAGES, type Lang } from "@/lib/i18n/config";
import { isSupportedLang } from "@/lib/i18n/utils";

export const localizedStaticParams = LANGUAGES.map((lang) => ({ lang }));

export const resolveRouteLang = (value: string | undefined): Lang => {
  if (!isSupportedLang(value)) {
    notFound();
  }
  return value;
};

export const defaultLang = DEFAULT_LANG;
