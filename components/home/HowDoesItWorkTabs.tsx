"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

const DESKTOP_LOCK_TRIGGER_TOP_TOLERANCE_PX = 12;
const MOBILE_LOCK_TRIGGER_TOP_TOLERANCE_PX = 24;
const WHEEL_STEP_COOLDOWN_MS = 480;
const WHEEL_DELTA_LOCK_THRESHOLD = 50;
const TOUCH_STEP_LOCK_THRESHOLD = 28;
const LOCK_EXIT_NUDGE_PX = 8;
const LOCK_INTERSECTION_GUARD_PX = 80;
const GIF_SLIDE_OFFSET_PX = 10;

type Props = {
  lang: Lang;
  sectionId?: string;
};

export function HowDoesItWorkTabs({ lang, sectionId = "how-does-it-work" }: Props) {
  const content = getTranslations(lang).home.sections.howDoesItWork;
  const gifs = siteData.images.howDoesItWork.gifs;
  const tabs = useMemo(
    () =>
      content.tabs.map((tab, index) => ({
        ...tab,
        gifUrl: gifs[index] ?? gifs[0],
      })),
    [content.tabs, gifs],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isLockedRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const wheelLockedRef = useRef(false);
  const lastReleaseDirectionRef = useRef<1 | -1 | 0>(0);
  const savedOverflowRef = useRef<{ html: string; body: string; overscroll: string }>({
    html: "",
    body: "",
    overscroll: "",
  });
  const touchStartYRef = useRef<number | null>(null);
  const touchCurrentYRef = useRef<number | null>(null);
  const touchAccumRef = useRef(0);
  const touchDirRef = useRef<1 | -1 | 0>(0);
  const wheelAccumRef = useRef(0);
  const wheelDirRef = useRef<1 | -1 | 0>(0);
  const lastScrollYRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const prevActiveIndexRef = useRef(0);
  const firstAnimationRenderRef = useRef(true);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const gifsRef = useRef<Array<HTMLImageElement | null>>([]);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const stepRef = useRef<HTMLParagraphElement | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasCompletedLastTabRef = useRef(false);
  const preloadedGifUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (activeIndex >= Math.max(0, tabs.length - 1)) {
      hasCompletedLastTabRef.current = true;
    }
  }, [activeIndex, tabs.length]);

  useEffect(() => {
    for (const tab of tabs) {
      if (preloadedGifUrlsRef.current.has(tab.gifUrl)) continue;
      preloadedGifUrlsRef.current.add(tab.gifUrl);
      const image = new window.Image();
      image.decoding = "async";
      image.src = tab.gifUrl;
    }
  }, [tabs]);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lastIndex = Math.max(0, tabs.length - 1);
    const nextIndex = Math.max(0, Math.min(lastIndex, activeIndex));
    const previousIndex = Math.max(0, Math.min(lastIndex, prevActiveIndexRef.current));
    const panels = panelsRef.current;
    const gifs = gifsRef.current;
    const navTabs = tabsRef.current;
    const stepLabel = stepRef.current;

    const syncInstantStates = () => {
      panels.forEach((panel, index) => {
        if (!panel) return;
        const isActive = index === nextIndex;
        gsap.set(panel, {
          autoAlpha: isActive ? 1 : 0,
          yPercent: 0,
          x: 0,
          zIndex: isActive ? 3 : 1,
          pointerEvents: isActive ? "auto" : "none",
          clearProps: "scale,filter",
        });
      });

      gifs.forEach((gif, index) => {
        if (!gif) return;
        const isActive = index === nextIndex;
        gsap.set(gif, {
          x: 0,
          y: 0,
          scale: 1,
          zIndex: isActive ? 3 : 1,
          visibility: isActive ? "visible" : "hidden",
          pointerEvents: isActive ? "auto" : "none",
          clearProps: "opacity,filter,xPercent,yPercent",
        });
      });

      navTabs.forEach((tab, index) => {
        if (!tab) return;
        gsap.set(tab, {
          autoAlpha: index === nextIndex ? 1 : 0.42,
          x: 0,
          clearProps: "filter",
        });
      });

      if (stepLabel) {
        gsap.set(stepLabel, {
          autoAlpha: 1,
          yPercent: 0,
          clearProps: "filter",
        });
      }
    };

    if (firstAnimationRenderRef.current) {
      firstAnimationRenderRef.current = false;
      syncInstantStates();
      prevActiveIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
      return;
    }

    if (previousIndex === nextIndex) {
      syncInstantStates();
      isTransitioningRef.current = false;
      return;
    }

    const outgoingPanel = panels[previousIndex];
    const incomingPanel = panels[nextIndex];
    const outgoingGif = gifs[previousIndex];
    const incomingGif = gifs[nextIndex];
    const outgoingTab = navTabs[previousIndex];
    const incomingTab = navTabs[nextIndex];

    if (!outgoingPanel || !incomingPanel || !outgoingGif || !incomingGif) {
      syncInstantStates();
      prevActiveIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
      return;
    }

    if (reducedMotion) {
      syncInstantStates();
      prevActiveIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
      return;
    }

    const direction = directionRef.current;
    transitionTimelineRef.current?.kill();

    const incomingItems = Array.from(incomingPanel.querySelectorAll<HTMLElement>(".how-work-item"));
    const outgoingItems = Array.from(outgoingPanel.querySelectorAll<HTMLElement>(".how-work-item"));
    const slideOffset = direction > 0 ? 14 : -14;
    const gifSlideOffset = direction > 0 ? GIF_SLIDE_OFFSET_PX : -GIF_SLIDE_OFFSET_PX;

    gsap.set(incomingPanel, {
      autoAlpha: 1,
      yPercent: slideOffset,
      zIndex: 4,
      pointerEvents: "none",
    });
    gsap.set(outgoingPanel, {
      autoAlpha: 1,
      yPercent: 0,
      zIndex: 3,
      pointerEvents: "none",
    });

    gsap.set(incomingGif, {
      x: 0,
      y: gifSlideOffset,
      scale: 1.06,
      zIndex: 4,
      visibility: "visible",
      pointerEvents: "none",
    });
    gsap.set(outgoingGif, {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 3,
      visibility: "visible",
      pointerEvents: "none",
    });

    if (incomingTab) {
      gsap.set(incomingTab, {
        autoAlpha: 0.45,
        x: direction > 0 ? 18 : -18,
      });
    }

    let didFinalize = false;
    const finalizeTransition = () => {
      if (didFinalize) return;
      didFinalize = true;
      syncInstantStates();
      prevActiveIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
    };

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: finalizeTransition,
      onInterrupt: finalizeTransition,
    });

    transitionTimelineRef.current = timeline;

    if (layoutRef.current) {
      timeline.fromTo(layoutRef.current, { y: direction > 0 ? 6 : -6 }, { y: 0, duration: 0.58 }, 0);
    }

    if (outgoingTab) {
      timeline.to(
        outgoingTab,
        {
          autoAlpha: 0.42,
          x: direction > 0 ? -14 : 14,
          duration: 0.26,
          ease: "power2.out",
        },
        0,
      );
    }

    if (incomingTab) {
      timeline.to(
        incomingTab,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.38,
        },
        0.06,
      );
    }

    timeline.to(
      outgoingPanel,
      {
        autoAlpha: 0,
        yPercent: -slideOffset * 0.7,
        duration: 0.34,
        ease: "sine.inOut",
      },
      0,
    );

    timeline.to(
      outgoingGif,
      {
        y: -gifSlideOffset,
        scale: 0.94,
        duration: 0.36,
        ease: "sine.inOut",
      },
      0.03,
    );

    timeline.to(
      incomingPanel,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.52,
      },
      0.1,
    );

    timeline.to(
      incomingGif,
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.52,
      },
      0.12,
    );

    if (outgoingItems.length > 0) {
      timeline.to(
        outgoingItems,
        {
          autoAlpha: 0,
          y: direction > 0 ? -24 : 24,
          duration: 0.18,
          stagger: 0.02,
          ease: "power2.in",
        },
        0,
      );
    }

    if (incomingItems.length > 0) {
      timeline.fromTo(
        incomingItems,
        {
          autoAlpha: 0,
          y: direction > 0 ? 26 : -26,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.2,
      );
    }

    if (stepLabel) {
      timeline.fromTo(
        stepLabel,
        {
          autoAlpha: 0,
          yPercent: direction > 0 ? 70 : -70,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.42,
        },
        0.12,
      );
    }

    return () => {
      transitionTimelineRef.current?.kill();
      finalizeTransition();
    };
  }, [activeIndex, tabs.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const hostSection = root.closest(".how-work-section") as HTMLElement | null;
    if (!hostSection) return;
    const lastIndex = Math.max(0, tabs.length - 1);
    lastScrollYRef.current = window.scrollY;

    const isMobileLayout = () => window.matchMedia("(max-width: 743px)").matches;
    const isTabletCoarse = () =>
      window.matchMedia("(min-width: 744px) and (max-width: 1366px) and (any-pointer: coarse)").matches;
    const isLockMode = () => true;
    const getTolerance = () =>
      isMobileLayout() || isTabletCoarse() ? MOBILE_LOCK_TRIGGER_TOP_TOLERANCE_PX : DESKTOP_LOCK_TRIGGER_TOP_TOLERANCE_PX;
    const getTouchStepThreshold = () => (isMobileLayout() ? 38 : isTabletCoarse() ? 34 : TOUCH_STEP_LOCK_THRESHOLD);

    const getViewportBounds = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const siteHeader = document.querySelector<HTMLElement>("[data-site-header]");
      const headerHeight = siteHeader ? Math.round(siteHeader.getBoundingClientRect().height) : 0;
      const top = Math.max(0, headerHeight);
      const bottom = Math.max(top + 1, viewportHeight);
      return { top, bottom };
    };

    const getSectionAnchorTop = () => {
      const bounds = getViewportBounds();
      const sectionTop = hostSection.getBoundingClientRect().top + window.scrollY;
      return Math.max(0, Math.round(sectionTop - bounds.top));
    };

    const isSectionTopAligned = () => {
      const bounds = getViewportBounds();
      const rect = hostSection.getBoundingClientRect();
      return Math.abs(rect.top - bounds.top) <= getTolerance();
    };

    const getAdjacentSectionAnchorTop = () => {
      let sibling = hostSection.nextElementSibling;
      while (sibling) {
        if (sibling instanceof HTMLElement && sibling.tagName === "SECTION") {
          const bounds = getViewportBounds();
          const siblingTop = sibling.getBoundingClientRect().top + window.scrollY;
          return Math.max(0, Math.round(siblingTop - bounds.top));
        }
        sibling = sibling.nextElementSibling;
      }
      return null;
    };

    const shouldInitiateLock = (direction: 1 | -1) => {
      if (hasCompletedLastTabRef.current) return false;
      if (direction < 0) return false;
      if (isSectionTopAligned()) return true;

      const bounds = getViewportBounds();
      const rect = hostSection.getBoundingClientRect();
      const intersectsLockBand =
        rect.top <= bounds.top + getTolerance() &&
        rect.bottom > bounds.top + LOCK_INTERSECTION_GUARD_PX &&
        rect.top < bounds.bottom - LOCK_INTERSECTION_GUARD_PX;
      if (!intersectsLockBand) return false;

      const current = activeIndexRef.current;
      return current < lastIndex;
    };

    const freezeScroll = () => {
      if (isLockedRef.current) return;
      const html = document.documentElement;
      const body = document.body;

      savedOverflowRef.current = {
        html: html.style.overflowY,
        body: body.style.overflowY,
        overscroll: body.style.overscrollBehaviorY,
      };

      html.style.overflowY = "hidden";
      body.style.overflowY = "hidden";
      body.style.overscrollBehaviorY = "none";
      isLockedRef.current = true;
    };

    const unfreezeScroll = () => {
      if (!isLockedRef.current) return;
      const html = document.documentElement;
      const body = document.body;
      html.style.overflowY = savedOverflowRef.current.html;
      body.style.overflowY = savedOverflowRef.current.body;
      body.style.overscrollBehaviorY = savedOverflowRef.current.overscroll;
      isLockedRef.current = false;
    };

    const releaseLock = (direction: 1 | -1) => {
      const anchor = getSectionAnchorTop();
      const fallbackDownTarget = anchor + hostSection.getBoundingClientRect().height + LOCK_EXIT_NUDGE_PX;
      const nextSectionAnchor = getAdjacentSectionAnchorTop();
      unfreezeScroll();
      lastReleaseDirectionRef.current = direction;
      wheelAccumRef.current = 0;
      wheelDirRef.current = 0;
      touchAccumRef.current = 0;
      touchDirRef.current = 0;
      touchStartYRef.current = null;
      touchCurrentYRef.current = null;

      window.scrollTo({
        top: direction > 0 ? (nextSectionAnchor ?? fallbackDownTarget) : Math.max(0, anchor - LOCK_EXIT_NUDGE_PX),
        behavior: "auto",
      });
    };

    const engageLock = (anchorTop: number) => {
      freezeScroll();
      lastReleaseDirectionRef.current = 0;
      wheelAccumRef.current = 0;
      wheelDirRef.current = 0;
      touchAccumRef.current = 0;
      touchDirRef.current = 0;
      if (Math.abs(window.scrollY - anchorTop) > 1) {
        window.scrollTo({ top: anchorTop, behavior: "auto" });
      }
    };

    const moveStep = (direction: 1 | -1) => {
      const current = activeIndexRef.current;
      const next = Math.max(0, Math.min(lastIndex, current + direction));
      if (next === current) return false;
      directionRef.current = direction;
      isTransitioningRef.current = true;
      setActiveIndex(next);
      activeIndexRef.current = next;
      if (next >= lastIndex) {
        hasCompletedLastTabRef.current = true;
      }
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (!isLockMode()) return;
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaY);
      if (delta < 2) return;

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      if (!isLockedRef.current) {
        const sameDirectionAfterRelease =
          lastReleaseDirectionRef.current !== 0 && direction === lastReleaseDirectionRef.current;
        if (sameDirectionAfterRelease) return;

        if (shouldInitiateLock(direction)) {
          event.preventDefault();
          engageLock(getSectionAnchorTop());
        }
      }

      if (!isLockedRef.current) return;
      event.preventDefault();
      if (wheelLockedRef.current || isTransitioningRef.current) return;

      if (wheelDirRef.current !== direction) {
        wheelDirRef.current = direction;
        wheelAccumRef.current = 0;
      }

      wheelAccumRef.current += Math.abs(event.deltaY);
      if (wheelAccumRef.current < WHEEL_DELTA_LOCK_THRESHOLD) return;
      wheelAccumRef.current = 0;

      const atBoundary =
        (direction > 0 && activeIndexRef.current === lastIndex) ||
        (direction < 0 && activeIndexRef.current === 0);
      if (atBoundary) {
        releaseLock(direction);
        return;
      }

      const moved = moveStep(direction);
      if (!moved) return;

      wheelLockedRef.current = true;
      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, WHEEL_STEP_COOLDOWN_MS);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      touchStartYRef.current = event.touches[0].clientY;
      touchCurrentYRef.current = touchStartYRef.current;
      touchAccumRef.current = 0;
      touchDirRef.current = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isLockMode()) return;
      if (touchStartYRef.current === null || event.touches.length === 0) return;

      const currentY = event.touches[0].clientY;
      const previousY = touchCurrentYRef.current ?? currentY;
      const stepDelta = Math.abs(previousY - currentY);
      const totalDelta = Math.abs(touchStartYRef.current - currentY);
      touchCurrentYRef.current = currentY;
      if (totalDelta <= 8) return;

      const direction: 1 | -1 = touchStartYRef.current > currentY ? 1 : -1;
      if (!isLockedRef.current && shouldInitiateLock(direction)) {
        event.preventDefault();
        engageLock(getSectionAnchorTop());
      }
      if (!isLockedRef.current) return;

      event.preventDefault();
      if (isTransitioningRef.current || wheelLockedRef.current || stepDelta < 2) return;

      if (touchDirRef.current !== direction) {
        touchDirRef.current = direction;
        touchAccumRef.current = 0;
      }
      touchAccumRef.current += stepDelta;
      if (touchAccumRef.current < getTouchStepThreshold()) return;
      touchAccumRef.current = 0;

      const atBoundary =
        (direction > 0 && activeIndexRef.current === lastIndex) ||
        (direction < 0 && activeIndexRef.current === 0);
      if (atBoundary) {
        releaseLock(direction);
        return;
      }

      moveStep(direction);
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchCurrentYRef.current = null;
      touchAccumRef.current = 0;
      touchDirRef.current = 0;
    };

    const onScroll = () => {
      if (!isLockMode()) {
        unfreezeScroll();
        lastScrollYRef.current = window.scrollY;
        return;
      }

      if (isLockedRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const previousY = lastScrollYRef.current;
      const direction: 1 | -1 | 0 = currentY > previousY ? 1 : currentY < previousY ? -1 : 0;
      lastScrollYRef.current = currentY;
      if (direction === 0) return;
      if (direction < 0) return;

      const sameDirectionAfterRelease =
        lastReleaseDirectionRef.current !== 0 && direction === lastReleaseDirectionRef.current;
      if (sameDirectionAfterRelease) return;
      if (hasCompletedLastTabRef.current) return;

      const current = activeIndexRef.current;
      const needsLock = current < lastIndex;
      if (!needsLock) return;

      if (shouldInitiateLock(direction)) {
        engageLock(getSectionAnchorTop());
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    hostSection.addEventListener("touchstart", onTouchStart, { passive: true });
    hostSection.addEventListener("touchmove", onTouchMove, { passive: false });
    hostSection.addEventListener("touchend", onTouchEnd);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unfreezeScroll();
      window.removeEventListener("wheel", onWheel, { capture: true });
      hostSection.removeEventListener("touchstart", onTouchStart);
      hostSection.removeEventListener("touchmove", onTouchMove);
      hostSection.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, [tabs.length]);

  const goTo = (index: number) => {
    const current = activeIndexRef.current;
    const clamped = Math.max(0, Math.min(tabs.length - 1, index));
    if (clamped === current) return;
    directionRef.current = clamped > current ? 1 : -1;
    isTransitioningRef.current = true;
    setActiveIndex(clamped);
    activeIndexRef.current = clamped;
    if (clamped >= Math.max(0, tabs.length - 1)) {
      hasCompletedLastTabRef.current = true;
    }
  };

  return (
    <section id={sectionId} className="how-work-section scroll-mt-28 py-0 text-mist">
      <div ref={rootRef} className="how-work-root" data-how-tabs data-active-index={activeIndex} data-how-wheel-zone>
        <div className="how-work-card">
          <div aria-hidden="true" className="how-work-grid"></div>
          <div className="how-work-content">
            <h2 className="how-work-title">
              <span className="how-work-title-accent">{content.titleAccent}</span>
              <span> {content.title}</span>
            </h2>
            <div className="how-work-step-wrap" aria-hidden="true">
              <p ref={stepRef} className="how-work-step" data-how-step>
                {tabs[activeIndex]?.step ?? "01"}
              </p>
            </div>

            <div ref={layoutRef} className="how-work-layout">
              <div className="how-work-left" data-how-panels-wrap>
                {tabs.map((tab, index) => (
                  <div
                    key={`${tab.label}-${index}`}
                    id={`${sectionId}-panel-${index}`}
                    ref={(node) => {
                      panelsRef.current[index] = node;
                    }}
                    className={`how-work-panel ${index === activeIndex ? "is-active" : ""}`}
                    data-how-panel
                    aria-hidden={index === activeIndex ? "false" : "true"}
                  >
                    {tab.cards.map((card) => (
                      <article key={`${tab.label}-${card.label}`} className={`how-work-item ${card.tone === "warning" ? "is-warning" : "is-success"}`}>
                        <p className="how-work-item-label">{card.label}</p>
                        <p className="how-work-item-text">{card.text}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>

              <div className="how-work-phone" aria-live="polite">
                <div className="how-work-screen" aria-hidden="true">
                  {tabs.map((tab, index) => (
                    <img
                      key={`${tab.label}-gif`}
                      ref={(node) => {
                        gifsRef.current[index] = node;
                      }}
                      src={tab.gifUrl}
                      alt={tab.gifAlt}
                      loading="eager"
                      decoding="async"
                      fetchPriority={index === activeIndex ? "high" : "auto"}
                      className={`how-work-gif ${index === activeIndex ? "is-active" : ""}`}
                      data-how-gif
                    />
                  ))}
                </div>

                <img src={siteData.images.howDoesItWork.mockup} alt="" className="how-work-mockup" aria-hidden="true" />
              </div>

              <div className="how-work-right">
                <div className="how-work-tab-list" role="tablist" aria-label={content.tabsAriaLabel}>
                  {tabs.map((tab, index) => (
                    <button
                      key={`${tab.label}-tab`}
                      id={`${sectionId}-tab-${index}`}
                      type="button"
                      role="tab"
                      ref={(node) => {
                        tabsRef.current[index] = node;
                      }}
                      className="how-work-tab"
                      data-how-tab
                      data-step={tab.step}
                      data-active={index === activeIndex ? "true" : "false"}
                      aria-selected={index === activeIndex ? "true" : "false"}
                      aria-controls={`${sectionId}-panel-${index}`}
                      tabIndex={index === activeIndex ? 0 : -1}
                      onClick={() => goTo(index)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
