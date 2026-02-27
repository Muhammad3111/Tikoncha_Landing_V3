import type { Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";
import { createTeamStructuredData } from "@/content/team";

export const buildCommonSchemas = (lang: Lang, pageTitle: string, pageDescription: string, routePath: string) => {
  const t = siteData.translations[lang];
  const pageUrl = `${siteData.siteUrl}${localizedPath(lang, routePath)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: t.layout.siteName,
      url: siteData.siteUrl,
      logo: `${siteData.siteUrl}${siteData.images.logo}`,
      sameAs: [siteData.constants.instagramUrl, siteData.constants.telegramUrl, siteData.constants.playMarketUrl],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: t.layout.footer.phone,
          email: t.layout.footer.email,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: t.layout.siteName,
      url: siteData.siteUrl,
      inLanguage: lang,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      description: pageDescription,
      url: pageUrl,
      inLanguage: lang,
    },
  ];
};

export const buildHomeSchemas = (lang: Lang) => {
  const t = siteData.translations[lang];
  const meta = siteData.seoByLang[lang].homeMeta;
  const baseSchemas = buildCommonSchemas(lang, meta.title, meta.description, "/");
  const pageUrl = `${siteData.siteUrl}${localizedPath(lang, "/")}`;

  return [
    ...baseSchemas,
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: t.layout.siteName,
      applicationCategory: "EducationApplication",
      operatingSystem: "Android, iOS",
      inLanguage: lang,
      url: pageUrl,
      description: meta.description,
      image: `${siteData.siteUrl}${siteData.images.ogImage}`,
      publisher: {
        "@type": "Organization",
        name: t.layout.siteName,
        url: siteData.siteUrl,
      },
    },
  ];
};

export const buildTeamSchemas = (lang: Lang) => {
  const meta = siteData.seoByLang[lang].teamMeta;
  const baseSchemas = buildCommonSchemas(lang, meta.title, meta.description, "/team");
  const t = siteData.translations[lang];
  const teamPageUrl = `${siteData.siteUrl}${localizedPath(lang, "/team")}`;

  return [
    ...baseSchemas,
    createTeamStructuredData({
      lang,
      siteName: t.layout.siteName,
      teamPageUrl,
      organizationUrl: `${siteData.siteUrl}/`,
    }),
  ];
};
