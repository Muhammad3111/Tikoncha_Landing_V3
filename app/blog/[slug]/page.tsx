import { StaticRedirectPage } from "@/components/common/StaticRedirectPage";
import { getAllBlogSlugs } from "@/content/blog";
import { localizedPath } from "@/lib/i18n/utils";
import { defaultLang } from "@/lib/routing";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogDetailRedirectPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  return <StaticRedirectPage to={localizedPath(defaultLang, `/blog/${slug}`)} />;
}
