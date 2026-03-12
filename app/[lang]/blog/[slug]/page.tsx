import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import {
  blogUiLabels,
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/content/blog";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return localizedStaticParams.flatMap(({ lang }) =>
    slugs.map((slug) => ({
      lang,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const activeLang = resolveRouteLang(lang);
  const post = getBlogPostBySlug(activeLang, slug);

  if (!post) {
    return buildMetadata(activeLang, "blog", "/blog");
  }

  return buildMetadata(activeLang, "blog", `/blog/${slug}`, {
    title: `${post.title} | Tikoncha`,
    description: post.excerpt,
  });
}

export default async function LocalizedBlogDetailPage({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;
  const activeLang = resolveRouteLang(lang);
  const post = getBlogPostBySlug(activeLang, slug);
  if (!post) {
    notFound();
  }

  const labels = blogUiLabels[activeLang];
  const relatedPosts = getRelatedBlogPosts(activeLang, post.slug, 3);

  return (
    <SiteShell lang={activeLang} routePath={`/blog/${slug}`} landingTheme>
      <BlogDetailContent
        lang={activeLang}
        post={post}
        relatedPosts={relatedPosts}
        labels={{
          readMinutesLabel: labels.readMinutesLabel,
          articleTocHeading: labels.articleTocHeading,
          backToBlogLabel: labels.backToBlogLabel,
          relatedHeading: labels.relatedHeading,
          readMoreLabel: labels.readMoreLabel,
        }}
      />
    </SiteShell>
  );
}
