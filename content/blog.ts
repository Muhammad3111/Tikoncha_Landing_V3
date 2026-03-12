import blogPostsData from "@/content/blog-posts.json";
import type { Lang } from "@/lib/i18n/config";

type LocalizedText = Record<Lang, string>;

export type BlogCategoryKey =
  | "digital-habits"
  | "screen-time"
  | "focus"
  | "parenting"
  | "sleep";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  categoryKey: BlogCategoryKey;
  categoryLabel: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  coverImageUrl: string;
  coverImageAlt: string;
  sections: BlogSection[];
};

type BlogPostTemplate = {
  slug: string;
  categoryKey: BlogCategoryKey;
  title: LocalizedText;
  excerpt: LocalizedText;
  coverImageUrl: string;
  coverImageAlt: LocalizedText;
  publishedAt: string;
  readMinutes: number;
  sections: Record<Lang, BlogSection[]>;
};

const categoryLabels: Record<Lang, Record<BlogCategoryKey, string>> = {
  uz: {
    "digital-habits": "Raqamli odatlar",
    "screen-time": "Ekran vaqti",
    focus: "Fokus",
    parenting: "Ota-ona nazorati",
    sleep: "Uyqu",
  },
  ru: {
    "digital-habits": "Цифровые привычки",
    "screen-time": "Экранное время",
    focus: "Фокус",
    parenting: "Родительский контроль",
    sleep: "Сон",
  },
  en: {
    "digital-habits": "Digital habits",
    "screen-time": "Screen time",
    focus: "Focus",
    parenting: "Parental control",
    sleep: "Sleep",
  },
};

export const blogUiLabels: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    allCategories: string;
    searchPlaceholder: string;
    filterLabel: string;
    readMoreLabel: string;
    readMinutesLabel: string;
    resultsLabel: string;
    clearSearchLabel: string;
    articleTocHeading: string;
    backToBlogLabel: string;
    relatedHeading: string;
  }
> = {
  uz: {
    title: "Tikoncha\nmaqolalar",
    subtitle:
      "Tikoncha ilovasi, ota-ona nazorati va\nbolalarning sog'lom raqamli odatlari bo'yicha\namaliy maqolalar.",
    allCategories: "Barchasi",
    searchPlaceholder: "Maqola qidirish...",
    filterLabel: "Filter:",
    readMoreLabel: "Batafsil o'qish",
    readMinutesLabel: "daq o'qish",
    resultsLabel: "ta maqola",
    clearSearchLabel: "Tozalash",
    articleTocHeading: "Ushbu maqolada",
    backToBlogLabel: "Blogga qaytish",
    relatedHeading: "O'xshash maqolalar",
  },
  ru: {
    title: "Статьи Tikoncha",
    subtitle:
      "Практические статьи о приложении Tikoncha, родительском контроле и здоровых цифровых привычках детей.",
    allCategories: "Все",
    searchPlaceholder: "Поиск по статьям...",
    filterLabel: "Фильтр:",
    readMoreLabel: "Читать полностью",
    readMinutesLabel: "мин чтения",
    resultsLabel: "статей",
    clearSearchLabel: "Очистить",
    articleTocHeading: "В этой статье",
    backToBlogLabel: "Назад в блог",
    relatedHeading: "Похожие статьи",
  },
  en: {
    title: "Tikoncha articles",
    subtitle:
      "Practical articles about Tikoncha, parental control, and healthy digital habits for children.",
    allCategories: "All",
    searchPlaceholder: "Search articles...",
    filterLabel: "Filter:",
    readMoreLabel: "Read article",
    readMinutesLabel: "min read",
    resultsLabel: "articles",
    clearSearchLabel: "Clear",
    articleTocHeading: "In this article",
    backToBlogLabel: "Back to blog",
    relatedHeading: "Related articles",
  },
};

const blogPosts = blogPostsData as BlogPostTemplate[];

export const getBlogCategoryLabel = (lang: Lang, key: BlogCategoryKey): string =>
  categoryLabels[lang][key];

export const getBlogPosts = (lang: Lang): BlogPost[] =>
  blogPosts.map((post) => ({
    slug: post.slug,
    categoryKey: post.categoryKey,
    categoryLabel: getBlogCategoryLabel(lang, post.categoryKey),
    title: post.title[lang],
    excerpt: post.excerpt[lang],
    publishedAt: post.publishedAt,
    readMinutes: post.readMinutes,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt[lang],
    sections: post.sections[lang],
  }));

export const getBlogPostBySlug = (lang: Lang, slug: string): BlogPost | undefined =>
  getBlogPosts(lang).find((post) => post.slug === slug);

export const getAllBlogSlugs = (): string[] => blogPosts.map((post) => post.slug);

export const getRelatedBlogPosts = (lang: Lang, slug: string, limit = 3): BlogPost[] => {
  const posts = getBlogPosts(lang);
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, limit);

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.categoryKey === current.categoryKey,
  );
  const remainder = posts.filter(
    (post) => post.slug !== slug && post.categoryKey !== current.categoryKey,
  );

  return [...sameCategory, ...remainder].slice(0, limit);
};
