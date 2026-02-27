import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { Hero } from "@/components/home/Hero";
import { ProblemSlider, ConsequencesSlider, NotEnoughSlider, WorldSolutionSlider } from "@/components/home/SliderSections";
import { HowDoesItWorkTabs } from "@/components/home/HowDoesItWorkTabs";
import { AboutTikonchaSection } from "@/components/home/AboutTikonchaSection";

type Props = {
  lang: Lang;
};

export function LandingPage({ lang }: Props) {
  const t = getTranslations(lang);

  return (
    <>
      <Hero key={`hero-${lang}`} lang={lang} t={t} />
      <ProblemSlider lang={lang} />
      <ConsequencesSlider lang={lang} />
      <WorldSolutionSlider lang={lang} />
      <NotEnoughSlider lang={lang} />
      <HowDoesItWorkTabs lang={lang} />
      <AboutTikonchaSection lang={lang} />
    </>
  );
}
