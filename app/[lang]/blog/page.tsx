import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { blogUiLabels, getBlogPosts } from "@/content/blog";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";

type Params = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return localizedStaticParams;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  return buildMetadata(activeLang, "blog", "/blog");
}

export default async function LocalizedBlogPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const labels = blogUiLabels[activeLang];
  const posts = getBlogPosts(activeLang);

  return (
    <SiteShell lang={activeLang} routePath="/blog" landingTheme>
      <section className="pb-4 pt-7 text-mist">
        <div className="grid items-center gap-8 xl:grid-cols-[1fr_620px]">
          <div>
            <span className="hero-chip flex w-fit items-center gap-1.5 rounded-[24px] bg-white/10 px-2.5 py-2 text-sm font-normal leading-[18px] text-white/95 mx-auto md:mx-0">
              <img
                src="/images/blog/newspaper.png"
                alt=""
                className="size-5"
                width="20"
                height="20"
                decoding="async"
              />
              Tikoncha maqolalar
            </span>
            <div className="mt-6 space-y-4 md:mt-4">
              <h1 className="hero-title max-w-[662px] whitespace-pre-line text-[44px] font-bold leading-[1.05] text-white md:text-[62px]">
                {labels.title}
              </h1>
              <p className="hero-subtitle max-w-[594px] whitespace-pre-line text-lg leading-[1.8] text-white/90 md:text-[20px]">
                {labels.subtitle}
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[16/9] w-full max-w-[720px]">
            <div className="absolute inset-0 overflow-hidden rounded-[42px] bg-black/35 shadow-[0_32px_80px_rgba(0,0,0,0.45)] lg:rounded-[62px]">
              <img
                src="/images/blog/blog_image_16x9.png"
                alt="Tikoncha blog hero cover"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        <BlogIndexClient
          lang={activeLang}
          posts={posts}
          allCategoriesLabel={labels.allCategories}
          filterLabel={labels.filterLabel}
          searchPlaceholder={labels.searchPlaceholder}
          readMoreLabel={labels.readMoreLabel}
          readMinutesLabel={labels.readMinutesLabel}
          resultsLabel={labels.resultsLabel}
          clearSearchLabel={labels.clearSearchLabel}
        />
      </section>
    </SiteShell>
  );
}
