import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { LandingHero } from "@/components/landing/LandingHero";
import {
  ProblemSlider,
  ConsequencesSlider,
  NotEnoughSlider,
  WorldSolutionSlider,
} from "@/components/home/SliderSections";
import { HowDoesItWorkTabs } from "@/components/home/HowDoesItWorkTabs";
import { AboutTikonchaSection } from "@/components/home/AboutTikonchaSection";
import { buildMetadata } from "@/lib/seo";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";
import { getTranslations } from "@/lib/i18n/utils";

type Params = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return localizedStaticParams;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const meta = buildMetadata(activeLang, "landing", "/landing");
  return {
    ...meta,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

export default async function LocalizedLandingPage({ params }: { params: Params }) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const t = getTranslations(activeLang);

  return (
    <SiteShell lang={activeLang} routePath="/landing" landingTheme>
      <LandingHero lang={activeLang} t={t} />
      <ProblemSlider lang={activeLang} />
      <ConsequencesSlider lang={activeLang} />
      <WorldSolutionSlider lang={activeLang} />
      <NotEnoughSlider lang={activeLang} />
      <HowDoesItWorkTabs lang={activeLang} />
      <AboutTikonchaSection lang={activeLang} />
    </SiteShell>
  );
}
