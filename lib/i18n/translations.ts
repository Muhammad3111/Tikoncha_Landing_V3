import type { Lang } from "./config";

type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
};

type SliderSlide = {
  title: string;
  description: string;
  descriptionAccent?: string;
  source?: string;
  sourceHref?: string;
  imageAlt: string;
  highlight?: string;
  quote?: string;
  sourceInQuote?: boolean;
  hideSource?: boolean;
  value?: string;
  bodyHeight?: number;
  cardHeight?: number;
  sourceWidth?: number;
  descriptionSize?: number;
  leftImageAlt?: string;
  rightImageAlt?: string;
  cardClassName?: string;
};

type SliderSectionContent = {
  title: string;
  titleAccent: string;
  subtitle: string;
  sliderAriaLabel: string;
  dotsAriaLabel: string;
  slideAriaSuffix: string;
  sourceLabel: string;
  accentFirst?: boolean;
  slides: SliderSlide[];
};

type HowDoesItWorkInfoCard = {
  label: string;
  text: string;
  tone: "warning" | "success";
};

type HowDoesItWorkTab = {
  label: string;
  step: string;
  gifAlt: string;
  cards: HowDoesItWorkInfoCard[];
};

type HowDoesItWorkContent = {
  title: string;
  titleAccent: string;
  tabsAriaLabel: string;
  tabs: HowDoesItWorkTab[];
};

type AboutTikonchaContent = {
  title: string;
  titleAccent: string;
  description: string;
  playMarketLabel: string;
  appStoreLabel: string;
  videoLabel: string;
  imageAlt: string;
};

export type AppTranslations = {
  layout: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    nav: {
      issue: string;
      consequences: string;
      leadingCountries: string;
      about: string;
      team: string;
    };
    footer: {
      tagline: string;
      companyTitle: string;
      contactTitle: string;
      companyLinks: {
        features: string;
        subscription: string;
        about: string;
        team: string;
      };
      location: string;
      phone: string;
      email: string;
      privacyPolicy: string;
      terms: string;
      copyright: string;
    };
    languageSwitcherLabel: string;
    languages: Record<Lang, string>;
    aria: {
      openMenu: string;
      closeMenu: string;
      closeVideo: string;
      socialLinks: string;
      videoFallback: string;
      heroImageAlt: string;
    };
  };
  home: {
    meta: PageMeta;
    hero: {
      title: string;
      titleAccent: string;
      subtitle: string;
      chipLabel: string;
      playMarketLabel: string;
      appStoreLabel: string;
      videoLabel: string;
    };
    sections: {
      problem: SliderSectionContent;
      consequences: SliderSectionContent;
      worldSolution: SliderSectionContent;
      notEnough: SliderSectionContent;
      howDoesItWork: HowDoesItWorkContent;
      aboutTikoncha: AboutTikonchaContent;
    };
  };
  blog: {
    meta: PageMeta;
    heading: string;
    body: string;
  };
  account: {
    meta: PageMeta;
    heading: string;
    body: string;
  };
  privacy: {
    meta: PageMeta;
    heading: string;
    body: string;
  };
  team: {
    meta: PageMeta;
    heading: string;
    subtitle: string;
  };
};

import { uzTranslations } from "./translations/uz";
import { ruTranslations } from "./translations/ru";
import { enTranslations } from "./translations/en";

export const translations: Record<Lang, AppTranslations> = {
  "uz": uzTranslations,
  "ru": ruTranslations,
  "en": enTranslations
};
