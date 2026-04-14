"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import type { BlogPost } from "@/content/blog";
import { formatBlogDate } from "@/lib/blog-date";

type Props = {
  lang: Lang;
  posts: BlogPost[];
  allCategoriesLabel: string;
  filterLabel: string;
  searchPlaceholder: string;
  readMoreLabel: string;
  readMinutesLabel: string;
  resultsLabel: string;
  clearSearchLabel: string;
};

export function BlogIndexClient({
  lang,
  posts,
  allCategoriesLabel,
  filterLabel,
  searchPlaceholder,
  readMoreLabel,
  readMinutesLabel,
  resultsLabel,
  clearSearchLabel,
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.categoryKey));
    return [
      { key: "all", label: allCategoriesLabel },
      ...Array.from(unique).map((key) => ({
        key,
        label: posts.find((post) => post.categoryKey === key)?.categoryLabel ?? key,
      })),
    ];
  }, [allCategoriesLabel, posts]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const byCategory = category === "all" || post.categoryKey === category;
        if (!byCategory) return false;
        if (!normalizedQuery) return true;
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery) ||
          post.categoryLabel.toLowerCase().includes(normalizedQuery)
        );
      }),
    [category, normalizedQuery, posts],
  );

  return (
    <section className="mt-8 pb-20">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white/85">{filterLabel}</span>
            {categories.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setCategory(item.key)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === item.key
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-white/15 text-white/75 hover:border-white/30 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-2 lg:max-w-[360px]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              className="h-11 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/45 focus:border-brand focus:outline-none"
              placeholder={searchPlaceholder}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/80 transition hover:border-white/40"
              >
                {clearSearchLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-white/65">
        {filteredPosts.length} {resultsLabel}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(20,41,25,0.65)_0%,rgba(34,36,34,0.8)_55%,rgba(26,51,32,0.85)_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            <Link href={localizedPath(lang, `/blog/${post.slug}`)} className="block h-full">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] m-3 mb-0">
                <img
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4 md:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="rounded-full bg-brand/20 px-2.5 py-1 text-brand-soft">{post.categoryLabel}</span>
                  <span>{formatBlogDate(lang, post.publishedAt, "short")}</span>
                  <span>{post.readMinutes} {readMinutesLabel}</span>
                </div>

                <h3 className="text-xl font-semibold leading-tight text-white">{post.title}</h3>
                <p className="mt-3 max-h-[72px] overflow-hidden text-sm leading-6 text-white/75">{post.excerpt}</p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {readMoreLabel}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
