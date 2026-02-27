import type { Metadata } from "next";
import { siteData } from "@/lib/site-data";
import type { Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";

type MetaPage = "home" | "team" | "terms" | "privacyPolicy";

type MetaSource = {
  title: string;
  description: string;
  keywords?: string;
};

type MetadataOverrides = Partial<MetaSource>;

const ogLocaleMap: Record<Lang, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

const getMetaSource = (lang: Lang, page: MetaPage): MetaSource => {
  const data = siteData.seoByLang[lang];

  if (page === "home") return data.homeMeta;
  if (page === "team") return data.teamMeta;

  return data.privacyMeta;
};

export const buildMetadata = (
  lang: Lang,
  page: MetaPage,
  routePath: string,
  overrides: MetadataOverrides = {},
): Metadata => {
  const source = {
    ...getMetaSource(lang, page),
    ...overrides,
  };
  const canonicalPath = localizedPath(lang, routePath);

  return {
    title: source.title,
    description: source.description,
    keywords: source.keywords,
    metadataBase: new URL(siteData.siteUrl),
    alternates: {
      canonical: canonicalPath,
      languages: {
        uz: localizedPath("uz", routePath),
        ru: localizedPath("ru", routePath),
        en: localizedPath("en", routePath),
        "x-default": localizedPath("uz", routePath),
      },
    },
    openGraph: {
      type: "website",
      title: source.title,
      description: source.description,
      url: canonicalPath,
      siteName: siteData.translations[lang].layout.siteName,
      locale: ogLocaleMap[lang],
      images: [
        {
          url: siteData.images.ogImage,
          width: 1200,
          height: 630,
          alt: source.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: source.title,
      description: source.description,
      images: [siteData.images.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
};
