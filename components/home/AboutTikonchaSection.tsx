import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

type Props = {
  lang: Lang;
  sectionId?: string;
};

export function AboutTikonchaSection({ lang, sectionId = "about" }: Props) {
  const content = getTranslations(lang).home.sections.aboutTikoncha;

  return (
    <section id={sectionId} className="about-cta-section scroll-mt-28">
      <div className="about-cta-card">
        <div className="about-cta-copy">
          <h2 className="about-cta-title">
            <span>{content.title}</span>
            <span className="about-cta-title-accent">{content.titleAccent}</span>
          </h2>

          <p className="about-cta-description">{content.description}</p>

          <div className="about-cta-actions">
            <a href={siteData.constants.playMarketUrl} className="about-cta-action">
              <img src={siteData.images.about.playMarketIcon} alt="" />
              <span>{content.playMarketLabel}</span>
            </a>
            <a href={siteData.constants.appStoreUrl} className="about-cta-action">
              <img src={siteData.images.about.appStoreIcon} alt="" />
              <span>{content.appStoreLabel}</span>
            </a>
            <button
              type="button"
              className="about-cta-action"
              data-video-modal-trigger
              data-video-src={siteData.constants.videoStreamUrl}
              aria-label={content.videoLabel}
            >
              <img src={siteData.images.about.playIcon} alt="" />
              <span>{content.videoLabel}</span>
            </button>
          </div>
        </div>

        <div className="about-cta-visual" aria-hidden="true">
          <span className="about-cta-visual-glow"></span>
          <img src={siteData.images.about.mascot} alt="" className="about-cta-illustration" width="900" height="1096" />
        </div>
      </div>
    </section>
  );
}
