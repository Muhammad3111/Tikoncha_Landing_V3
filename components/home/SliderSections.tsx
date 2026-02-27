import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";
import { StackedSliderSection, type SlideItem } from "@/components/home/StackedSliderSection";

type Props = {
  lang: Lang;
};

const mapSlides = (slides: SlideItem[], images: string[]) =>
  slides.map((slide, index) => ({
    ...slide,
    imageUrl: images[index] ?? images[0] ?? "",
  }));

export function ProblemSlider({ lang }: Props) {
  const content = getTranslations(lang).home.sections.problem;
  return (
    <StackedSliderSection
      sectionId="problem"
      title={content.title}
      titleAccent={content.titleAccent}
      subtitle={content.subtitle}
      slides={mapSlides(content.slides as SlideItem[], siteData.images.problem.slides)}
      titleLineImageUrl={siteData.images.problem.titleLine}
      sliderAriaLabel={content.sliderAriaLabel}
      dotsAriaLabel={content.dotsAriaLabel}
      slideAriaSuffix={content.slideAriaSuffix}
      sourceLabel={content.sourceLabel}
    />
  );
}

export function ConsequencesSlider({ lang }: Props) {
  const content = getTranslations(lang).home.sections.consequences;
  return (
    <StackedSliderSection
      sectionId="consequences"
      title={content.title}
      titleAccent={content.titleAccent}
      subtitle={content.subtitle}
      slides={mapSlides(content.slides as SlideItem[], siteData.images.consequences.slides)}
      titleLineImageUrl={siteData.images.consequences.titleLine}
      sliderAriaLabel={content.sliderAriaLabel}
      dotsAriaLabel={content.dotsAriaLabel}
      slideAriaSuffix={content.slideAriaSuffix}
      sourceLabel={content.sourceLabel}
      variantClassName="is-consequences"
    />
  );
}

export function WorldSolutionSlider({ lang }: Props) {
  const content = getTranslations(lang).home.sections.worldSolution;
  return (
    <StackedSliderSection
      sectionId="countries"
      title={content.title}
      titleAccent={content.titleAccent}
      accentFirst={Boolean(content.accentFirst)}
      subtitle={content.subtitle}
      slides={mapSlides(content.slides as SlideItem[], siteData.images.worldSolution.slides)}
      titleLineImageUrl={siteData.images.worldSolution.titleLine}
      sliderAriaLabel={content.sliderAriaLabel}
      dotsAriaLabel={content.dotsAriaLabel}
      slideAriaSuffix={content.slideAriaSuffix}
      sourceLabel={content.sourceLabel}
      variantClassName="is-world-solution"
    />
  );
}

export function NotEnoughSlider({ lang }: Props) {
  const content = getTranslations(lang).home.sections.notEnough;
  const slides = mapSlides(content.slides as SlideItem[], siteData.images.notEnough.slides).map((slide, index) => ({
    ...slide,
    leftImageUrl: index === 3 ? siteData.images.notEnough.sideImages.left : undefined,
    rightImageUrl: index === 3 ? siteData.images.notEnough.sideImages.right : undefined,
  }));

  return (
    <StackedSliderSection
      sectionId="not-enough"
      title={content.title}
      titleAccent={content.titleAccent}
      subtitle={content.subtitle}
      slides={slides}
      titleLineImageUrl={siteData.images.notEnough.titleLine}
      sliderAriaLabel={content.sliderAriaLabel}
      dotsAriaLabel={content.dotsAriaLabel}
      slideAriaSuffix={content.slideAriaSuffix}
      sourceLabel={content.sourceLabel}
      variantClassName="is-not-enough"
    />
  );
}
