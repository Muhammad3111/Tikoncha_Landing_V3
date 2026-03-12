import type { Lang } from "@/lib/i18n/config";

const localeByLang: Record<Lang, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

const uzMonths = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
] as const;

const parseIsoDate = (
  dateValue: string,
): { year: number; monthIndex: number; day: number } | null => {
  const [yearRaw, monthRaw, dayRaw] = dateValue.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return { year, monthIndex: month - 1, day };
};

export const formatBlogDate = (
  lang: Lang,
  dateValue: string,
  month: "short" | "long" = "long",
): string => {
  const parsed = parseIsoDate(dateValue);
  if (!parsed) return dateValue;

  if (lang === "uz") {
    return `${parsed.day} ${uzMonths[parsed.monthIndex]} ${parsed.year}`;
  }

  const date = new Date(Date.UTC(parsed.year, parsed.monthIndex, parsed.day));

  return new Intl.DateTimeFormat(localeByLang[lang], {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

