import type { MetadataRoute } from "next";
import { LANGUAGES, type Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

export const dynamic = "force-static";

const INDEXABLE_ROUTES = ["/", "/team", "/privacy-policy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LANGUAGES.flatMap((lang) =>
    INDEXABLE_ROUTES.map((route) => ({
      url: `${siteData.siteUrl}${localizedPath(lang as Lang, route)}`,
      lastModified: now,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.7,
    })),
  );
}
