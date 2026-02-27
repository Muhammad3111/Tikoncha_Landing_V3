import type { ReactNode } from "react";
import { type Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VideoModalManager } from "@/components/layout/VideoModalManager";
import { CursorTrail } from "@/components/layout/CursorTrail";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { LandingBackground } from "@/components/layout/LandingBackground";

type Props = {
  lang: Lang;
  routePath: string;
  landingTheme?: boolean;
  children: ReactNode;
};

export function SiteShell({ lang, routePath, landingTheme = false, children }: Props) {
  const t = getTranslations(lang);

  return (
    <div className={landingTheme ? "landing-theme-shell" : undefined}>
      <HtmlLangSync lang={lang} />

      {landingTheme && <LandingBackground />}

      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <SiteHeader lang={lang} routePath={routePath} t={t} />
      <CursorTrail />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1360px] px-5 lg:px-6">
        {children}
      </main>
      <SiteFooter lang={lang} t={t} />

      <VideoModalManager />
    </div>
  );
}
