"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Lang } from "@/lib/i18n/config";
import { siteData, type AppTranslations } from "@/lib/site-data";

type Props = {
  lang: Lang;
  t: AppTranslations;
  sectionId?: string;
};

export function Hero({ lang, t, sectionId = "hero" }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroRoot = rootRef.current;
    if (!heroRoot) return;

    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const chip = heroRoot.querySelector<HTMLElement>("[data-hero-chip]");
      const title = heroRoot.querySelector<HTMLElement>("[data-hero-title]");
      const subtitle = heroRoot.querySelector<HTMLElement>("[data-hero-subtitle]");
      const actions = heroRoot.querySelector<HTMLElement>("[data-hero-actions]");
      const image = heroRoot.querySelector<HTMLElement>("[data-hero-image]");
      const socialIcons = Array.from(heroRoot.querySelectorAll<HTMLElement>("[data-hero-social]"));

      const startFloatingSocials = () => {
        socialIcons.forEach((icon, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveY = 14 + (index % 4) * 3;
          const moveX = 8 + (index % 3) * 2;
          const duration = 1.45 + (index % 3) * 0.22;

          gsap.to(icon, {
            y: -moveY * direction,
            duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.08,
          });
          gsap.to(icon, {
            x: moveX * direction,
            duration: duration * 1.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.05,
          });
        });
      };

      if (!prefersReducedMotion && chip && title && subtitle && actions && image && socialIcons.length > 0) {
        gsap
          .timeline({ defaults: { duration: 0.6, ease: "power2.out" } })
          .from(chip, { y: 10, autoAlpha: 0 })
          .from(title, { y: 20, autoAlpha: 0 }, "-=0.3")
          .from(subtitle, { y: 14, autoAlpha: 0 }, "-=0.35")
          .from(actions, { y: 10, autoAlpha: 0 }, "-=0.35")
          .from(image, { x: 18, autoAlpha: 0 }, "-=0.45")
          .from(socialIcons, { scale: 0.9, autoAlpha: 0, stagger: 0.05 }, "-=0.35")
          .add(startFloatingSocials);
      } else {
        gsap.set([chip, title, subtitle, actions, image, ...socialIcons].filter(Boolean), { autoAlpha: 1 });
        startFloatingSocials();
      }

      fallbackTimer = setTimeout(() => {
        if (!actions) return;
        const opacity = Number.parseFloat(window.getComputedStyle(actions).opacity);
        if (opacity < 0.99) {
          actions.style.opacity = "1";
          actions.style.transform = "none";
        }
      }, 1400);
    }, heroRoot);

    return () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      context.revert();
    };
  }, [lang]);

  const heroActionClass =
    "inline-flex h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[32px] bg-[rgba(255,255,255,0.2)] pl-4 pr-6 py-2.5 text-[14px] font-medium leading-[18px] text-white transition-colors duration-200 hover:bg-[rgba(255,255,255,0.2)]";

  return (
    <>
      <section
        id={sectionId}
        ref={rootRef}
        data-hero-root
        className="relative overflow-visible pb-16 pt-6 text-mist md:pb-24 md:pt-8 xl:pb-0 xl:pt-0"
      >
        <div className="hero-shell mx-auto grid w-full max-w-[1360px] gap-10 xl:min-h-[720px] xl:grid-cols-[1fr_633px] xl:items-center">
          <div className="hero-copy space-y-8">
            <span
              className="hero-chip inline-flex items-center gap-1.5 rounded-[24px] bg-white/10 px-2.5 py-2 text-sm font-normal leading-[18px] text-white/95"
              data-hero-chip
            >
              <img src={siteData.images.hero.guaranteedIcon} alt="" className="size-5" />
              {t.home.hero.chipLabel}
            </span>

            <div className="space-y-4">
              <h1
                className="hero-title max-w-[662px] text-[44px] font-bold leading-[1.05] text-white md:text-[62px]"
                data-hero-title
              >
                <span>{t.home.hero.title}</span>
                <span className="block text-secondary">{t.home.hero.titleAccent}</span>
              </h1>
              <p className="hero-subtitle max-w-[594px] text-lg leading-[1.8] text-white/90 md:text-[20px]" data-hero-subtitle>
                {t.home.hero.subtitle}
              </p>
            </div>

            <div className="hero-actions relative z-10 flex flex-wrap items-center gap-3" data-hero-actions>
              <a
                href={siteData.constants.playMarketUrl}
                className={heroActionClass}
              >
                <img src={siteData.images.hero.playMarketIcon} alt="" className="size-6" />
                <span>{t.home.hero.playMarketLabel}</span>
              </a>
              <a
                href={siteData.constants.appStoreUrl}
                className={heroActionClass}
              >
                <img src={siteData.images.hero.appStoreIcon} alt="" className="size-6" />
                <span>{t.home.hero.appStoreLabel}</span>
              </a>
              <button
                type="button"
                className={heroActionClass}
                data-video-modal-trigger
                data-video-src={siteData.constants.videoStreamUrl}
                aria-label={t.home.hero.videoLabel}
              >
                <img src={siteData.images.hero.playIcon} alt="" className="size-6" />
                <span>{t.home.hero.videoLabel}</span>
              </button>
            </div>
          </div>

          <div className="hero-image relative mx-auto h-[360px] w-full max-w-[633px] sm:h-[430px] lg:h-[488px]" data-hero-image>
            <div className="absolute inset-0 overflow-hidden rounded-[42px] bg-black/35 shadow-[0_32px_80px_rgba(0,0,0,0.45)] lg:rounded-[62px]">
              <img
                src={siteData.images.hero.image}
                alt={t.layout.aria.heroImageAlt}
                className="size-full object-cover object-center"
                width="1400"
                height="1089"
              />
            </div>

            <img src={siteData.images.hero.instagramIcon} alt="" className="absolute left-[8%] top-[-9%] size-[92px] rotate-[-19deg] sm:size-[98px]" data-hero-social />
            <img src={siteData.images.hero.facebookIcon} alt="" className="absolute right-[7%] top-[-2%] size-[66px] rotate-[18deg] opacity-70 sm:size-[67px]" data-hero-social />
            <img src={siteData.images.hero.tikTokIcon} alt="" className="absolute right-[-2%] top-[31%] size-[84px] rotate-[15deg] sm:size-[88px]" data-hero-social />
            <img src={siteData.images.hero.youtubeIcon} alt="" className="absolute bottom-[16%] right-[17%] size-[78px] rotate-[17deg] sm:size-[81px]" data-hero-social />
            <img src={siteData.images.hero.snapchatIcon} alt="" className="absolute bottom-[16%] left-[6%] size-[74px] rotate-[-20deg] opacity-60 sm:size-[77px]" data-hero-social />
            <img src={siteData.images.hero.twitchIcon} alt="" className="absolute left-[-3%] top-[30%] size-[64px] rotate-[22deg] opacity-50 sm:size-[67px]" data-hero-social />
          </div>
        </div>
      </section>
    </>
  );
}
