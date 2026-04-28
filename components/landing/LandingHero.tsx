"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Lang } from "@/lib/i18n/config";
import { siteData, type AppTranslations } from "@/lib/site-data";
import { LeadForm } from "@/components/landing/LeadForm";

type Props = {
  lang: Lang;
  t: AppTranslations;
};

export function LandingHero({ lang, t }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const floatTweens: gsap.core.Tween[] = [];
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const chip = root.querySelector<HTMLElement>("[data-landing-chip]");
      const title = root.querySelector<HTMLElement>("[data-landing-title]");
      const subtitle = root.querySelector<HTMLElement>("[data-landing-subtitle]");
      const form = root.querySelector<HTMLElement>("[data-landing-form]");
      const image = root.querySelector<HTMLElement>("[data-landing-image]");
      const socialIcons = Array.from(root.querySelectorAll<HTMLElement>("[data-landing-social]"));

      const startFloatingSocials = () => {
        socialIcons.forEach((icon, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveY = 14 + (index % 4) * 3;
          const moveX = 8 + (index % 3) * 2;
          const duration = 1.45 + (index % 3) * 0.22;

          floatTweens.push(
            gsap.to(icon, {
              y: -moveY * direction,
              duration,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.08,
            }),
            gsap.to(icon, {
              x: moveX * direction,
              duration: duration * 1.35,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.05,
            }),
          );
        });
      };

      if (!prefersReducedMotion && chip && title && subtitle && form && image && socialIcons.length > 0) {
        gsap
          .timeline({ defaults: { duration: 0.6, ease: "power2.out" } })
          .from(chip, { y: 10, autoAlpha: 0 })
          .from(title, { y: 20, autoAlpha: 0 }, "-=0.3")
          .from(subtitle, { y: 14, autoAlpha: 0 }, "-=0.35")
          .from(form, { y: 14, autoAlpha: 0 }, "-=0.35")
          .from(image, { x: 18, autoAlpha: 0 }, "-=0.45")
          .from(socialIcons, { scale: 0.9, autoAlpha: 0, stagger: 0.05 }, "-=0.35")
          .add(startFloatingSocials);
      } else {
        gsap.set([chip, title, subtitle, form, image, ...socialIcons].filter(Boolean), { autoAlpha: 1 });
        startFloatingSocials();
      }
    }, root);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        floatTweens.forEach((tween) => {
          if (visible) tween.play();
          else tween.pause();
        });
      },
      { threshold: 0, rootMargin: "100px" },
    );
    visibilityObserver.observe(root);

    return () => {
      visibilityObserver.disconnect();
      context.revert();
    };
  }, [lang]);

  return (
    <>
      <link rel="preload" as="image" href={siteData.images.hero.image} fetchPriority="high" />
      <section
        ref={rootRef}
        className="relative overflow-visible pb-16 pt-6 text-mist md:pb-24 md:pt-8 xl:pt-10"
      >
        <div className="mx-auto grid w-full max-w-[1360px] gap-16 xl:min-h-[720px] xl:grid-cols-[1fr_633px] xl:items-center xl:gap-10">
          <div className="space-y-8">
            <span
              className="inline-flex items-center gap-1.5 rounded-[24px] bg-white/10 px-2.5 py-2 text-sm font-normal leading-[18px] text-white/95"
              data-landing-chip
            >
              <img src={siteData.images.hero.guaranteedIcon} alt="" className="size-5" width="20" height="20" decoding="async" />
              {t.landing.hero.chipLabel}
            </span>

            <div className="space-y-4">
              <h1
                className="max-w-[662px] text-[32px] font-bold leading-[1.1] text-white sm:text-[40px] md:text-[62px]"
                data-landing-title
              >
                <span className="block">{t.landing.hero.title}</span>
                {t.landing.hero.titleAccent && (
                  <span className="block text-secondary">{t.landing.hero.titleAccent}</span>
                )}
              </h1>
              <p
                className="max-w-[594px] text-lg leading-[1.8] text-white/90 md:text-[20px]"
                data-landing-subtitle
              >
                {t.landing.hero.subtitle}
              </p>
            </div>

            <div data-landing-form>
              <LeadForm t={t.landing.form} />
            </div>
          </div>

          <div
            className="relative mx-auto h-[360px] w-full max-w-[633px] sm:h-[430px] lg:h-[488px]"
            data-landing-image
          >
            <div className="absolute inset-0 overflow-hidden rounded-[42px] bg-black/35 shadow-[0_32px_80px_rgba(0,0,0,0.45)] lg:rounded-[62px]">
              <img
                src={siteData.images.hero.image}
                alt={t.layout.aria.heroImageAlt}
                className="size-full object-cover object-center"
                width="1400"
                height="1089"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <img src={siteData.images.hero.instagramIcon} alt="" width="98" height="98" decoding="async" className="absolute left-[8%] top-[-9%] size-[92px] rotate-[-19deg] sm:size-[98px]" data-landing-social />
            <img src={siteData.images.hero.facebookIcon} alt="" width="67" height="67" decoding="async" className="absolute right-[7%] top-[-2%] size-[66px] rotate-[18deg] opacity-70 sm:size-[67px]" data-landing-social />
            <img src={siteData.images.hero.tikTokIcon} alt="" width="88" height="88" decoding="async" className="absolute right-[-2%] top-[31%] size-[84px] rotate-[15deg] sm:size-[88px]" data-landing-social />
            <img src={siteData.images.hero.youtubeIcon} alt="" width="81" height="81" decoding="async" className="absolute bottom-[16%] right-[17%] size-[78px] rotate-[17deg] sm:size-[81px]" data-landing-social />
            <img src={siteData.images.hero.snapchatIcon} alt="" width="77" height="77" decoding="async" className="absolute bottom-[16%] left-[6%] size-[74px] rotate-[-20deg] opacity-60 sm:size-[77px]" data-landing-social />
            <img src={siteData.images.hero.twitchIcon} alt="" width="67" height="67" decoding="async" className="absolute left-[-3%] top-[30%] size-[64px] rotate-[22deg] opacity-50 sm:size-[67px]" data-landing-social />
          </div>
        </div>
      </section>
    </>
  );
}
