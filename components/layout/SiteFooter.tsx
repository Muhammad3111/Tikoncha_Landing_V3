import Link from "next/link";
import { type Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import { siteData, type AppTranslations } from "@/lib/site-data";

type Props = {
  lang: Lang;
  t: AppTranslations;
};

export function SiteFooter({ lang, t }: Props) {
  const homePath = localizedPath(lang);
  const privacyPath = localizedPath(lang, "/privacy-policy");
  const termsPath = localizedPath(lang, "/terms");
  const teamPath = localizedPath(lang, "/team");
  const problemPath = `${homePath}#problem`;
  const consequencesPath = `${homePath}#consequences`;
  const aboutPath = `${homePath}#about`;
  const phoneLink = `tel:${t.layout.footer.phone.replace(/\s+/g, "")}`;
  const emailLink = `mailto:${t.layout.footer.email}`;

  return (
    <footer className="site-footer text-white">
      <div className="site-footer__inner mx-auto w-full max-w-[1360px] px-5 lg:px-6">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href={homePath} className="site-footer__logo-link" aria-label={t.layout.siteName}>
              <img
                src={siteData.images.logo}
                alt={t.layout.siteName}
                className="site-footer__logo"
                width="728"
                height="144"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="site-footer__tagline">{t.layout.footer.tagline}</p>

            <div className="site-footer__socials" aria-label={t.layout.aria.socialLinks}>
              <a
                href={siteData.constants.instagramUrl}
                className="site-footer__social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={siteData.images.footer.instagramIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
              </a>
              <a
                href={siteData.constants.telegramUrl}
                className="site-footer__social-link"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={siteData.images.footer.telegramIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>

          <div className="site-footer__section site-footer__section--company">
            <h2 className="site-footer__heading">{t.layout.footer.companyTitle}</h2>
            <ul className="site-footer__list">
              <li>
                <a href={problemPath} className="site-footer__link">
                  {t.layout.nav.issue}
                </a>
              </li>
              <li>
                <a href={consequencesPath} className="site-footer__link">
                  {t.layout.nav.consequences}
                </a>
              </li>
              <li>
                <a href={aboutPath} className="site-footer__link">
                  {t.layout.nav.about}
                </a>
              </li>
              <li>
                <Link href={teamPath} className="site-footer__link">
                  {t.layout.nav.team}
                </Link>
              </li>
            </ul>
          </div>

          <div className="site-footer__section site-footer__section--contact">
            <h2 className="site-footer__heading">{t.layout.footer.contactTitle}</h2>
            <ul className="site-footer__list site-footer__list--contact">
              <li className="site-footer__contact-item">
                <img src={siteData.images.footer.locationIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
                <span>{t.layout.footer.location}</span>
              </li>
              <li className="site-footer__contact-item">
                <img src={siteData.images.footer.callIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
                <a href={phoneLink} className="site-footer__link">
                  {t.layout.footer.phone}
                </a>
              </li>
              <li className="site-footer__contact-item">
                <img src={siteData.images.footer.emailIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
                <a href={emailLink} className="site-footer__link">
                  {t.layout.footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{t.layout.footer.copyright}</p>
          <div className="site-footer__bottom-links">
            <Link href={privacyPath} className="site-footer__link">
              {t.layout.footer.privacyPolicy}
            </Link>
            <Link href={termsPath} className="site-footer__link">
              {t.layout.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
