import type { MetadataRoute } from "next";
import { LANGUAGES, type Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";
import { getAllBlogSlugs } from "@/content/blog";

export const dynamic = "force-static";

const INDEXABLE_ROUTES = [
  "/",
  "/team",
  "/products",
  "/privacy-policy",
  "/terms",
  "/blog",
  "/ustoz/privacy-policy",
  "/delete",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`);

  return LANGUAGES.flatMap((lang) =>
    [...INDEXABLE_ROUTES, ...blogRoutes].map((route) => {
      const isHome = route === "/";
      const isBlogPost = route.startsWith("/blog/");
      return {
        url: `${siteData.siteUrl}${localizedPath(lang as Lang, route)}`,
        lastModified: now,
        changeFrequency: isHome ? "weekly" : isBlogPost ? "monthly" : "yearly",
        priority: isHome ? 1 : isBlogPost ? 0.8 : 0.7,
      };
    }),
  );
}
