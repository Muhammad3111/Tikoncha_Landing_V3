import projectExport from "@/PROJECT_FULL_EXPORT.json";
import { APP_STORE_URL, INSTAGRAM_URL, PLAY_MARKET_URL, TELEGRAM_URL, VIDEO_STREAM_URL } from "@/lib/constants";
import { DEFAULT_LANG, LANGUAGES, NON_DEFAULT_LANGUAGES, type Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";

type ImageUsageEntry = {
  variable: string;
  importPath: string;
};

type SectionImageUsage = {
  imageImports?: ImageUsageEntry[];
  slideOrder?: ImageUsageEntry[];
  gifOrder?: ImageUsageEntry[];
  sideImages?: {
    left?: string;
    right?: string;
  };
  mockup?: string;
};

const SITE_URL = "https://tikoncha.uz";

const imageUsage = projectExport.sections.imageUsage as Record<string, SectionImageUsage>;
const seoByLang = projectExport.seo.byLang as Record<
  Lang,
  {
    layout: { defaultTitle: string; defaultDescription: string };
    homeMeta: { title: string; description: string; keywords?: string };
    teamMeta: { title: string; description: string; keywords?: string };
    privacyMeta: { title: string; description: string; keywords?: string };
  }
>;

const translations = projectExport.texts.translations as Record<Lang, ReturnType<typeof getTranslations>>;

const convertImportPathToPublic = (importPath: string): string =>
  importPath.replace(/^\.\.\/assets\/images\//, "/images/").replace(/\?url$/, "");

const getSectionImageMap = (section: string): Record<string, string> => {
  const sectionConfig = imageUsage[section];
  const imports = sectionConfig?.imageImports ?? [];
  return imports.reduce<Record<string, string>>((acc, item) => {
    acc[item.variable] = convertImportPathToPublic(item.importPath);
    return acc;
  }, {});
};

const getSectionOrderedImages = (section: string, key: "slideOrder" | "gifOrder"): string[] => {
  const sectionConfig = imageUsage[section];
  const list = sectionConfig?.[key] ?? [];
  return list.map((item) => convertImportPathToPublic(item.importPath));
};

const getSectionSideImages = (section: string): { left?: string; right?: string } => {
  const sideImages = imageUsage[section]?.sideImages;
  if (!sideImages) return {};
  return {
    left: sideImages.left ? convertImportPathToPublic(sideImages.left) : undefined,
    right: sideImages.right ? convertImportPathToPublic(sideImages.right) : undefined,
  };
};

const getSectionMockup = (section: string): string | undefined => {
  const mockup = imageUsage[section]?.mockup;
  return mockup ? convertImportPathToPublic(mockup) : undefined;
};

const heroImages = getSectionImageMap("hero");
const footerImages = getSectionImageMap("footer");
const aboutImages = getSectionImageMap("about");
const teamImages = getSectionImageMap("team");

export const siteData = {
  siteUrl: SITE_URL,
  defaultLang: DEFAULT_LANG,
  langs: LANGUAGES,
  nonDefaultLangs: NON_DEFAULT_LANGUAGES,
  translations,
  seoByLang,
  constants: {
    playMarketUrl: PLAY_MARKET_URL,
    appStoreUrl: APP_STORE_URL,
    videoStreamUrl: VIDEO_STREAM_URL,
    instagramUrl: INSTAGRAM_URL,
    telegramUrl: TELEGRAM_URL,
  },
  images: {
    logo: "/logo.png",
    ogImage: "/og-image.jpg",
    hero: {
      image: heroImages.heroImageUrl,
      appStoreIcon: heroImages.appStoreIconUrl,
      facebookIcon: heroImages.facebookIconUrl,
      guaranteedIcon: heroImages.guaranteedIconUrl,
      instagramIcon: heroImages.instagramIconUrl,
      playMarketIcon: heroImages.playMarketIconUrl,
      playIcon: heroImages.playIconUrl,
      snapchatIcon: heroImages.snapchatIconUrl,
      tikTokIcon: heroImages.tikTokIconUrl,
      twitchIcon: heroImages.twitchIconUrl,
      youtubeIcon: heroImages.youtubeIconUrl,
    },
    problem: {
      titleLine: getSectionImageMap("problem").titleLineImageUrl,
      slides: getSectionOrderedImages("problem", "slideOrder"),
    },
    consequences: {
      titleLine: getSectionImageMap("consequences").titleLineImageUrl,
      slides: getSectionOrderedImages("consequences", "slideOrder"),
    },
    worldSolution: {
      titleLine: getSectionImageMap("worldSolution").titleLineImageUrl,
      slides: getSectionOrderedImages("worldSolution", "slideOrder"),
    },
    notEnough: {
      titleLine: getSectionImageMap("notEnough").titleLineImageUrl,
      slides: getSectionOrderedImages("notEnough", "slideOrder"),
      sideImages: getSectionSideImages("notEnough"),
    },
    howDoesItWork: {
      mockup: getSectionMockup("howDoesItWork"),
      gifs: getSectionOrderedImages("howDoesItWork", "gifOrder"),
    },
    about: {
      appStoreIcon: aboutImages.appStoreIconUrl,
      mascot: aboutImages.mascotImageUrl,
      playIcon: aboutImages.playIconUrl,
      playMarketIcon: aboutImages.playMarketIconUrl,
    },
    team: {
      titleUnderline: teamImages.titleUnderlineUrl,
      members: {
        "member-01": teamImages.member01ImageUrl,
        "member-02": teamImages.member02ImageUrl,
        "member-03": teamImages.member03ImageUrl,
        "member-04": teamImages.member04ImageUrl,
        "member-05": teamImages.member05ImageUrl,
        "member-06": teamImages.member06ImageUrl,
        "member-07": teamImages.member07ImageUrl,
        "member-08": teamImages.member08ImageUrl,
        "member-09": teamImages.member09ImageUrl,
        "member-10": teamImages.member10ImageUrl,
      },
    },
    footer: {
      callIcon: footerImages.callIconUrl,
      emailIcon: footerImages.emailIconUrl,
      instagramIcon: footerImages.instagramIconUrl,
      locationIcon: footerImages.locationIconUrl,
      telegramIcon: footerImages.telegramIconUrl,
    },
  },
};

export type AppTranslations = (typeof siteData.translations)[Lang];
