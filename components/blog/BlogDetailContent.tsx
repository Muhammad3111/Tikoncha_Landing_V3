import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import type { BlogPost } from "@/content/blog";
import { formatBlogDate } from "@/lib/blog-date";
import { BlogToc } from "@/components/blog/BlogToc";

type Props = {
  lang: Lang;
  post: BlogPost;
  relatedPosts: BlogPost[];
  labels: {
    readMinutesLabel: string;
    articleTocHeading: string;
    backToBlogLabel: string;
    relatedHeading: string;
    readMoreLabel: string;
  };
};

const toAnchorId = (value: string, index: number): string =>
  `${index + 1}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export function BlogDetailContent({ lang, post, relatedPosts, labels }: Props) {
  const sectionAnchors = post.sections.map((section, index) => ({
    ...section,
    id: toAnchorId(section.heading, index),
  }));

  return (
    <section className="pb-20 pt-8">
      <Link
        href={localizedPath(lang, "/blog")}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/85 transition hover:border-white/35"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {labels.backToBlogLabel}
      </Link>

      <header className="mt-5">
        <h1 className="mx-auto max-w-[960px] text-center text-3xl font-semibold leading-tight text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
          <span className="rounded-full bg-brand/20 px-3 py-1 text-brand-soft">{post.categoryLabel}</span>
          <span>{formatBlogDate(lang, post.publishedAt, "long")}</span>
          <span>{post.readMinutes} {labels.readMinutesLabel}</span>
        </div>
      </header>

      <div className="mt-7 aspect-[16/9] w-full overflow-hidden rounded-[36px] border border-white/10 bg-black/30 shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
        <img
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <BlogToc
          sections={sectionAnchors.map(({ id, heading }) => ({ id, heading }))}
          heading={labels.articleTocHeading}
        />

        <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-8">
          {sectionAnchors.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="space-y-4 pb-8 text-[15px] leading-7 text-white/80 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{labels.relatedHeading}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedPosts.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
              <Link href={localizedPath(lang, `/blog/${item.slug}`)} className="block">
                <div className="m-3 mb-0 overflow-hidden rounded-[22px]">
                  <img src={item.coverImageUrl} alt={item.coverImageAlt} className="h-44 w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    {labels.readMoreLabel}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
