"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGUAGES, type Lang } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/utils";
import { siteData, type AppTranslations } from "@/lib/site-data";

type Props = {
  lang: Lang;
  routePath?: string;
  t: AppTranslations;
};

type NavKey = "issue" | "consequences" | "leadingCountries" | "about" | "team";

const TABLET_MEDIA_QUERY =
  "(max-width: 743px), (min-width: 744px) and (max-width: 1366px) and (any-pointer: coarse)";

const normalizePath = (path: string): string => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

export function SiteHeader({ lang, routePath = "/", t }: Props) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const languageSwitcherRef = useRef<HTMLDetailsElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<NavKey | null>(null);

  const homePath = localizedPath(lang);
  const homePathWithSlash = homePath.endsWith("/") ? homePath : `${homePath}/`;
  const teamPath = localizedPath(lang, "/team");
  const phoneLink = `tel:${t.layout.footer.phone.replace(/\s+/g, "")}`;

  const navItems = useMemo(
    () => [
      { key: "issue" as const, href: `${homePathWithSlash}#problem`, label: t.layout.nav.issue, sectionId: "problem" },
      {
        key: "consequences" as const,
        href: `${homePathWithSlash}#consequences`,
        label: t.layout.nav.consequences,
        sectionId: "consequences",
      },
      {
        key: "leadingCountries" as const,
        href: `${homePathWithSlash}#countries`,
        label: t.layout.nav.leadingCountries,
        sectionId: "countries",
      },
      { key: "about" as const, href: `${homePathWithSlash}#about`, label: t.layout.nav.about, sectionId: "about" },
      { key: "team" as const, href: teamPath, label: t.layout.nav.team, sectionId: undefined },
    ],
    [homePathWithSlash, teamPath, t.layout.nav.about, t.layout.nav.consequences, t.layout.nav.issue, t.layout.nav.leadingCountries, t.layout.nav.team],
  );

  const closeLanguageSwitcher = () => {
    if (languageSwitcherRef.current) {
      languageSwitcherRef.current.open = false;
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("site-menu-open", menuOpen);
    return () => {
      document.body.classList.remove("site-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const query = window.matchMedia(TABLET_MEDIA_QUERY);
    const onChange = () => {
      if (!query.matches) {
        setMenuOpen(false);
      }
    };

    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (menuOpen && headerRef.current && !headerRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (languageSwitcherRef.current?.open && !languageSwitcherRef.current.contains(target)) {
        closeLanguageSwitcher();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        closeLanguageSwitcher();
      }
    };

    document.addEventListener("click", onDocClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sectionByKey = new Map<NavKey, HTMLElement>();

    navItems.forEach((item) => {
      if (!item.sectionId) return;
      const section = document.getElementById(item.sectionId);
      if (section) sectionByKey.set(item.key, section);
    });

    const resolveHomeActiveKey = (): NavKey | null => {
      if (sectionByKey.size === 0) return null;

      const headerHeight = Math.round(headerRef.current?.getBoundingClientRect().height ?? 72);
      const offset = headerHeight + 24;
      let keyPassedTop: NavKey | null = null;
      let maxTop = Number.NEGATIVE_INFINITY;

      sectionByKey.forEach((section, key) => {
        const top = section.getBoundingClientRect().top;
        if (top <= offset && top > maxTop) {
          maxTop = top;
          keyPassedTop = key;
        }
      });

      return keyPassedTop;
    };

    const syncActiveLink = () => {
      const currentPath = normalizePath(pathname || window.location.pathname);
      const normalizedHomePath = normalizePath(homePath);
      const normalizedTeamPath = normalizePath(teamPath);

      if (currentPath === normalizedTeamPath) {
        setActiveNavKey("team");
        return;
      }

      if (currentPath !== normalizedHomePath) {
        setActiveNavKey(null);
        return;
      }

      setActiveNavKey(resolveHomeActiveKey());
    };

    let frameId = 0;
    const requestSync = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        syncActiveLink();
      });
    };

    syncActiveLink();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("hashchange", syncActiveLink);
    window.addEventListener("popstate", syncActiveLink);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("hashchange", syncActiveLink);
      window.removeEventListener("popstate", syncActiveLink);
    };
  }, [homePath, navItems, pathname, teamPath]);

  const toggleMenu = () => {
    setMenuOpen((value) => !value);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number],
  ) => {
    setMenuOpen(false);
    closeLanguageSwitcher();

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!item.sectionId) {
      window.requestAnimationFrame(() => setActiveNavKey(item.key));
      return;
    }

    const currentPath = normalizePath(pathname || window.location.pathname);
    const normalizedHomePath = normalizePath(homePath);
    if (currentPath !== normalizedHomePath) {
      window.requestAnimationFrame(() => setActiveNavKey(item.key));
      return;
    }

    const targetSection = document.getElementById(item.sectionId);
    if (!targetSection) {
      window.requestAnimationFrame(() => setActiveNavKey(item.key));
      return;
    }

    event.preventDefault();

    window.requestAnimationFrame(() => {
      const headerHeight = Math.round(headerRef.current?.getBoundingClientRect().height ?? 72);
      const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
      const targetTop = Math.max(0, Math.round(sectionTop - headerHeight));
      const nextUrl = `${window.location.pathname}${window.location.search}#${item.sectionId}`;
      window.history.pushState(null, "", nextUrl);
      window.scrollTo({ top: targetTop, behavior: "auto" });
      setActiveNavKey(item.key);
    });
  };

  return (
    <header
      ref={headerRef}
      data-site-header
      data-home-path={homePath}
      data-team-path={teamPath}
      data-menu-open={menuOpen ? "true" : "false"}
      className={`sticky top-0 z-40 text-mist transition-colors duration-200${stuck ? " is-stuck" : ""}`}
    >
      <div className="site-header-bar mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between px-5 lg:px-6">
        <Link href={homePath} className="inline-flex items-center">
          <img
            src={siteData.images.logo}
            alt={t.layout.siteName}
            className="h-9 w-auto"
            width="728"
            height="144"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="site-header-desktop-nav hidden items-center gap-11 text-[16px] font-medium text-mist/95 lg:flex">
            {navItems.map((item) => {
              const isActive = activeNavKey === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`site-header-link whitespace-nowrap transition hover:text-secondary${isActive ? " is-active" : ""}`}
                  data-site-nav-link
                  data-nav-key={item.key}
                  data-section-id={item.sectionId}
                  aria-current={
                    isActive ? (item.key === "team" ? "page" : "location") : undefined
                  }
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="site-header-desktop-divider hidden h-5 w-px bg-white/20 lg:block"></div>

          <details ref={languageSwitcherRef} className="group relative">
            <summary
              className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-mist/95"
              aria-label={t.layout.languageSwitcherLabel}
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" aria-hidden="true">
                <circle cx="12" cy="12" r="9" strokeWidth="1.8"></circle>
                <path d="M3 12h18M12 3c2.8 2.7 2.8 15.3 0 18M12 3c-2.8 2.7-2.8 15.3 0 18" strokeWidth="1.4"></path>
              </svg>
              <span>{lang.toUpperCase()}</span>
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 fill-none stroke-current transition group-open:rotate-180"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </summary>

            <ul className="absolute right-0 top-8 min-w-28 rounded-xl border border-white/15 bg-[#111318] p-1.5 shadow-xl">
              {LANGUAGES.map((locale) => (
                <li key={locale}>
                  <Link
                    href={localizedPath(locale, routePath)}
                    title={t.layout.languages[locale]}
                    className={`block rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      locale === lang ? "bg-secondary text-primary" : "text-mist/90 hover:bg-white/10"
                    }`}
                    onClick={closeLanguageSwitcher}
                  >
                    {locale.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <button
            type="button"
            className="site-header-menu"
            data-site-menu-toggle
            data-label-open={t.layout.aria.openMenu}
            data-label-close={t.layout.aria.closeMenu}
            aria-label={menuOpen ? t.layout.aria.closeMenu : t.layout.aria.openMenu}
            aria-expanded={menuOpen}
            aria-controls="site-tablet-menu"
            onClick={toggleMenu}
          >
            <svg className="site-header-menu-glyph site-header-menu-glyph--burger" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
            <svg className="site-header-menu-glyph site-header-menu-glyph--close" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
          </button>
        </div>
      </div>

      <div id="site-tablet-menu" className="site-header-panel" data-site-menu-panel aria-hidden={!menuOpen}>
        <div className="site-header-panel-inner">
          <nav className="site-header-panel-nav" aria-label={t.layout.nav.issue}>
            {navItems.map((item) => {
              const isActive = activeNavKey === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`site-header-panel-link${isActive ? " is-active" : ""}`}
                  data-site-menu-link
                  data-site-nav-link
                  data-nav-key={item.key}
                  data-section-id={item.sectionId}
                  aria-current={
                    isActive ? (item.key === "team" ? "page" : "location") : undefined
                  }
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <section className="site-header-panel-contact" aria-label={t.layout.footer.contactTitle}>
            <p className="site-header-panel-contact-title">{t.layout.footer.contactTitle}</p>
            <a href={phoneLink} className="site-header-panel-phone" data-site-menu-link onClick={closeMenu}>
              {t.layout.footer.phone}
            </a>

            <div className="site-header-panel-socials">
              <a
                href={siteData.constants.instagramUrl}
                className="site-header-panel-social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                data-site-menu-link
              >
                <img src={siteData.images.footer.instagramIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
              </a>
              <a
                href={siteData.constants.telegramUrl}
                className="site-header-panel-social-link"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
                data-site-menu-link
              >
                <img src={siteData.images.footer.telegramIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
              </a>
            </div>

            <div className="site-header-panel-store-row">
              <a
                href={siteData.constants.playMarketUrl}
                className="site-header-panel-store-link"
                target="_blank"
                rel="noopener noreferrer"
                data-site-menu-link
              >
                <img src={siteData.images.hero.playMarketIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
                <span>{t.home.hero.playMarketLabel}</span>
              </a>
              <a href={siteData.constants.appStoreUrl} className="site-header-panel-store-link" data-site-menu-link>
                <img src={siteData.images.hero.appStoreIcon} alt="" width="24" height="24" loading="lazy" decoding="async" />
                <span>{t.home.hero.appStoreLabel}</span>
              </a>
            </div>
          </section>

          <div className="site-header-panel-bottom">
            <p>{t.layout.footer.copyright}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
