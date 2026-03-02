import { APP_STORE_URL, INSTAGRAM_URL, PLAY_MARKET_URL, TELEGRAM_URL, VIDEO_STREAM_URL } from "@/lib/constants";
import { DEFAULT_LANG, LANGUAGES, NON_DEFAULT_LANGUAGES, type Lang } from "@/lib/i18n/config";
import { translations as i18nTranslations } from "@/lib/i18n/translations";

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

const imageUsage: Record<string, SectionImageUsage> = {
  hero: {
    imageImports: [
      { variable: "heroImageUrl", importPath: "../assets/images/herosection/Image.webp?url" },
      { variable: "appStoreIconUrl", importPath: "../assets/images/herosection/app-store.svg?url" },
      { variable: "facebookIconUrl", importPath: "../assets/images/herosection/Facebook.svg?url" },
      { variable: "guaranteedIconUrl", importPath: "../assets/images/herosection/guaranteed.svg?url" },
      { variable: "instagramIconUrl", importPath: "../assets/images/herosection/Instagram.svg?url" },
      { variable: "playMarketIconUrl", importPath: "../assets/images/herosection/play-market.svg?url" },
      { variable: "playIconUrl", importPath: "../assets/images/herosection/play.svg?url" },
      { variable: "snapchatIconUrl", importPath: "../assets/images/herosection/Snapchat.svg?url" },
      { variable: "tikTokIconUrl", importPath: "../assets/images/herosection/TikTok.svg?url" },
      { variable: "twitchIconUrl", importPath: "../assets/images/herosection/Twitch.svg?url" },
      { variable: "youtubeIconUrl", importPath: "../assets/images/herosection/Youtube.svg?url" },
    ],
  },
  problem: {
    imageImports: [
      { variable: "barChartImageUrl", importPath: "../assets/images/problemsection/Bar-Chart.webp?url" },
      { variable: "clepsydraImageUrl", importPath: "../assets/images/problemsection/Clepsydra.webp?url" },
      {
        variable: "phoneScrollingImageUrl",
        importPath: "../assets/images/problemsection/Phone-Scrolling.webp?url",
      },
      { variable: "puppetImageUrl", importPath: "../assets/images/problemsection/Puppet.webp?url" },
      {
        variable: "socialMediaAppImageUrl",
        importPath: "../assets/images/problemsection/Social-media-app.webp?url",
      },
      { variable: "titleLineImageUrl", importPath: "../assets/images/problemsection/titleline.svg?url" },
    ],
    slideOrder: [
      { variable: "puppetImageUrl", importPath: "../assets/images/problemsection/Puppet.webp?url" },
      {
        variable: "socialMediaAppImageUrl",
        importPath: "../assets/images/problemsection/Social-media-app.webp?url",
      },
      { variable: "clepsydraImageUrl", importPath: "../assets/images/problemsection/Clepsydra.webp?url" },
      {
        variable: "phoneScrollingImageUrl",
        importPath: "../assets/images/problemsection/Phone-Scrolling.webp?url",
      },
      { variable: "barChartImageUrl", importPath: "../assets/images/problemsection/Bar-Chart.webp?url" },
    ],
  },
  consequences: {
    imageImports: [
      {
        variable: "blindfoldedImageUrl",
        importPath: "../assets/images/oqibatlar-jiddiy/Blindfolded-Person.webp?url",
      },
      { variable: "clownImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Clown.webp?url" },
      { variable: "tensionImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Tension.webp?url" },
      { variable: "puppetImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Puppet.webp?url" },
      { variable: "sleepImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Sleep.webp?url" },
      { variable: "titleLineImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/title-line.svg?url" },
    ],
    slideOrder: [
      { variable: "puppetImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Puppet.webp?url" },
      { variable: "sleepImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Sleep.webp?url" },
      { variable: "tensionImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Tension.webp?url" },
      { variable: "clownImageUrl", importPath: "../assets/images/oqibatlar-jiddiy/Clown.webp?url" },
      {
        variable: "blindfoldedImageUrl",
        importPath: "../assets/images/oqibatlar-jiddiy/Blindfolded-Person.webp?url",
      },
    ],
  },
  worldSolution: {
    imageImports: [
      { variable: "chinaImageUrl", importPath: "../assets/images/world-solution/china.webp?url" },
      { variable: "europeImageUrl", importPath: "../assets/images/world-solution/europe.webp?url" },
      { variable: "londonImageUrl", importPath: "../assets/images/world-solution/london.webp?url" },
      { variable: "parisImageUrl", importPath: "../assets/images/world-solution/Paris.webp?url" },
      { variable: "titleLineImageUrl", importPath: "../assets/images/world-solution/line.svg?url" },
      { variable: "usaImageUrl", importPath: "../assets/images/world-solution/usa.webp?url" },
    ],
    slideOrder: [
      { variable: "usaImageUrl", importPath: "../assets/images/world-solution/usa.webp?url" },
      { variable: "parisImageUrl", importPath: "../assets/images/world-solution/Paris.webp?url" },
      { variable: "chinaImageUrl", importPath: "../assets/images/world-solution/china.webp?url" },
      { variable: "londonImageUrl", importPath: "../assets/images/world-solution/london.webp?url" },
      { variable: "europeImageUrl", importPath: "../assets/images/world-solution/europe.webp?url" },
    ],
  },
  notEnough: {
    imageImports: [
      { variable: "blockedImageUrl", importPath: "../assets/images/not-enough/Blocked.webp?url" },
      { variable: "illustrationImageUrl", importPath: "../assets/images/not-enough/Illustrations.webp?url" },
      { variable: "leftSideImageUrl", importPath: "../assets/images/not-enough/image-left.webp?url" },
      { variable: "rightSideImageUrl", importPath: "../assets/images/not-enough/image-right.webp?url" },
      { variable: "noInternetImageUrl", importPath: "../assets/images/not-enough/No-Internet.webp?url" },
      { variable: "phoneStandImageUrl", importPath: "../assets/images/not-enough/Phone-Stand.webp?url" },
      { variable: "titleLineImageUrl", importPath: "../assets/images/not-enough/line.svg?url" },
    ],
    slideOrder: [
      { variable: "blockedImageUrl", importPath: "../assets/images/not-enough/Blocked.webp?url" },
      { variable: "noInternetImageUrl", importPath: "../assets/images/not-enough/No-Internet.webp?url" },
      { variable: "phoneStandImageUrl", importPath: "../assets/images/not-enough/Phone-Stand.webp?url" },
      { variable: "illustrationImageUrl", importPath: "../assets/images/not-enough/Illustrations.webp?url" },
    ],
    sideImages: {
      left: "../assets/images/not-enough/image-left.webp?url",
      right: "../assets/images/not-enough/image-right.webp?url",
    },
  },
  howDoesItWork: {
    imageImports: [
      { variable: "statistikGifUrl", importPath: "../assets/images/how-does-it-work/aniq-statistika.gif?url" },
      { variable: "focusGifUrl", importPath: "../assets/images/how-does-it-work/diqqatni-jamlash.gif?url" },
      {
        variable: "locationGifUrl",
        importPath: "../assets/images/how-does-it-work/joylashuv-xavfsizlik.gif?url",
      },
      {
        variable: "phoneMockupImageUrl",
        importPath: "../assets/images/how-does-it-work/samsung_s25_ultra_mockup_gif.png?url",
      },
      { variable: "timeGifUrl", importPath: "../assets/images/how-does-it-work/vaqt-boshqarish.gif?url" },
      {
        variable: "protectionGifUrl",
        importPath: "../assets/images/how-does-it-work/zararli-ilovalardan.gif?url",
      },
    ],
    gifOrder: [
      { variable: "focusGifUrl", importPath: "../assets/images/how-does-it-work/diqqatni-jamlash.gif?url" },
      {
        variable: "locationGifUrl",
        importPath: "../assets/images/how-does-it-work/joylashuv-xavfsizlik.gif?url",
      },
      { variable: "timeGifUrl", importPath: "../assets/images/how-does-it-work/vaqt-boshqarish.gif?url" },
      { variable: "statistikGifUrl", importPath: "../assets/images/how-does-it-work/aniq-statistika.gif?url" },
      {
        variable: "protectionGifUrl",
        importPath: "../assets/images/how-does-it-work/zararli-ilovalardan.gif?url",
      },
    ],
    mockup: "../assets/images/how-does-it-work/samsung_s25_ultra_mockup_gif.png?url",
  },
  about: {
    imageImports: [
      { variable: "appStoreIconUrl", importPath: "../assets/images/herosection/app-store.svg?url" },
      { variable: "mascotImageUrl", importPath: "../assets/images/herosection/Illustrations.webp?url" },
      { variable: "playIconUrl", importPath: "../assets/images/herosection/play.svg?url" },
      { variable: "playMarketIconUrl", importPath: "../assets/images/herosection/play-market.svg?url" },
    ],
  },
  team: {
    imageImports: [
      { variable: "member01ImageUrl", importPath: "../assets/images/team/member-01.webp?url" },
      { variable: "member02ImageUrl", importPath: "../assets/images/team/member-02.webp?url" },
      { variable: "member03ImageUrl", importPath: "../assets/images/team/member-03.webp?url" },
      { variable: "member04ImageUrl", importPath: "../assets/images/team/member-04.webp?url" },
      { variable: "member05ImageUrl", importPath: "../assets/images/team/member-05.webp?url" },
      { variable: "member06ImageUrl", importPath: "../assets/images/team/member-06.webp?url" },
      { variable: "member07ImageUrl", importPath: "../assets/images/team/member-07.webp?url" },
      { variable: "member08ImageUrl", importPath: "../assets/images/team/member-08.webp?url" },
      { variable: "member09ImageUrl", importPath: "../assets/images/team/member-09.webp?url" },
      { variable: "member10ImageUrl", importPath: "../assets/images/team/member-10.webp?url" },
      { variable: "titleUnderlineUrl", importPath: "../assets/images/team/title-underline.svg?url" },
    ],
  },
  footer: {
    imageImports: [
      { variable: "callIconUrl", importPath: "../assets/images/footer/Call-Ringing.svg?url" },
      { variable: "emailIconUrl", importPath: "../assets/images/footer/email.svg?url" },
      { variable: "instagramIconUrl", importPath: "../assets/images/footer/Instagram.svg?url" },
      { variable: "locationIconUrl", importPath: "../assets/images/footer/Location.svg?url" },
      { variable: "telegramIconUrl", importPath: "../assets/images/footer/Telegram.svg?url" },
    ],
  },
};
const translations = i18nTranslations;

const seoByLang = LANGUAGES.reduce(
  (acc, lang) => {
    const current = translations[lang];
    acc[lang] = {
      layout: {
        defaultTitle: current.layout.defaultTitle,
        defaultDescription: current.layout.defaultDescription,
      },
      homeMeta: current.home.meta,
      teamMeta: current.team.meta,
      privacyMeta: current.privacy.meta,
    };
    return acc;
  },
  {} as Record<
    Lang,
    {
      layout: { defaultTitle: string; defaultDescription: string };
      homeMeta: { title: string; description: string; keywords?: string };
      teamMeta: { title: string; description: string; keywords?: string };
      privacyMeta: { title: string; description: string; keywords?: string };
    }
  >,
);

const seoByLangTyped = seoByLang as Record<
  Lang,
  {
    layout: { defaultTitle: string; defaultDescription: string };
    homeMeta: { title: string; description: string; keywords?: string };
    teamMeta: { title: string; description: string; keywords?: string };
    privacyMeta: { title: string; description: string; keywords?: string };
  }
>;

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
  seoByLang: seoByLangTyped,
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
