"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";

const DESKTOP_LOCK_TRIGGER_TOP_TOLERANCE_PX = 12;
const MOBILE_LOCK_TRIGGER_TOP_TOLERANCE_PX = 24;
const WHEEL_STEP_COOLDOWN_MS = 560;
const WHEEL_DELTA_LOCK_THRESHOLD = 50;
const TOUCH_STEP_LOCK_THRESHOLD = 28;
const LOCK_EXIT_NUDGE_PX = 8;
const LOCK_INTERSECTION_GUARD_PX = 80;
const CARD_COLLAPSE_DURATION_MS = 720;
const CARD_EXPAND_DURATION_MS = 560;
const CARD_COLLAPSE_DURATION_S = CARD_COLLAPSE_DURATION_MS / 1000;
const CARD_EXPAND_DURATION_S = CARD_EXPAND_DURATION_MS / 1000;
const CARD_STEP_LOCK_DURATION_MS = CARD_COLLAPSE_DURATION_MS + 40;
const CARD_EXIT_RELEASE_DELAY_MS = 620;

type CardTransitionSnapshot = {
  height: number;
  minHeight: number;
  maxHeight: number;
  marginTop: number;
  fadeStates: Array<{
    element: HTMLElement;
    opacity: number;
  }>;
};

export type SlideItem = {
  title: string;
  description: string;
  descriptionAccent?: string;
  source?: string;
  sourceHref?: string;
  imageUrl: string;
  imageAlt: string;
  highlight?: string;
  quote?: string;
  sourceInQuote?: boolean;
  hideSource?: boolean;
  value?: string;
  bodyHeight?: number;
  cardHeight?: number;
  sourceWidth?: number;
  descriptionSize?: number;
  leftImageUrl?: string;
  leftImageAlt?: string;
  rightImageUrl?: string;
  rightImageAlt?: string;
  cardClassName?: string;
};

type Props = {
  sectionId?: string;
  title?: string;
  titleAccent?: string;
  accentFirst?: boolean;
  subtitle?: string;
  slides?: SlideItem[];
  titleLineImageUrl: string;
  sliderAriaLabel?: string;
  dotsAriaLabel?: string;
  slideAriaSuffix?: string;
  sourceLabel?: string;
  sectionClassName?: string;
  variantClassName?: string;
};

const splitDescriptionByAccent = (slide: SlideItem) => {
  if (!slide.descriptionAccent) return null;
  const index = slide.description.indexOf(slide.descriptionAccent);
  if (index < 0) return null;
  return {
    before: slide.description.slice(0, index),
    accent: slide.descriptionAccent,
    after: slide.description.slice(index + slide.descriptionAccent.length),
  };
};

const splitDescriptionLines = (description: string) =>
  description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export function StackedSliderSection({
  sectionId = "slider-section",
  title = "",
  titleAccent = "",
  accentFirst = false,
  subtitle = "",
  slides = [],
  titleLineImageUrl,
  sliderAriaLabel = "Statistika slideri",
  dotsAriaLabel = "Slides navigation",
  slideAriaSuffix = "slaydi",
  sourceLabel = "Manba:",
  sectionClassName = "",
  variantClassName = "",
}: Props) {
  const [collapsedCount, setCollapsedCount] = useState(0);
  const collapsedCountRef = useRef(0);
  const [manualExpandedIndex, setManualExpandedIndex] = useState<number | null>(null);
  const manualExpandedIndexRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
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
  const releaseTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const pendingCardSnapshotsRef = useRef<Map<number, CardTransitionSnapshot>>(new Map());
  const isNotEnoughVariant = variantClassName.split(" ").includes("is-not-enough");
  const maxCollapsedCount = slides.length;
  const isManualExpandedMode = manualExpandedIndex !== null && collapsedCount >= maxCollapsedCount;
  const activeVisibleIndex = Math.min(Math.max(collapsedCount, 0), Math.max(slides.length - 1, 0));

  const renderedSlides = useMemo(
    () =>
      slides.map((slide, index) => {
        const descriptionParts = splitDescriptionByAccent(slide);
        const isNotEnoughOutroCard = slide.cardClassName?.split(" ").includes("is-not-enough-outro") ?? false;
        const shouldRenderDescriptionLines = isNotEnoughVariant && !isNotEnoughOutroCard;
        const descriptionLines = shouldRenderDescriptionLines ? splitDescriptionLines(slide.description) : [];

        return { slide, index, descriptionParts, descriptionLines };
      }),
    [slides, isNotEnoughVariant],
  );

  useEffect(() => {
    collapsedCountRef.current = collapsedCount;
  }, [collapsedCount]);

  useEffect(() => {
    manualExpandedIndexRef.current = manualExpandedIndex;
  }, [manualExpandedIndex]);

  const captureCardSnapshots = useCallback(
    (indices: number[]) => {
      if (typeof window === "undefined") return;
      const snapshots = pendingCardSnapshotsRef.current;
      const uniqueIndices = [...new Set(indices)];

      uniqueIndices.forEach((index) => {
        if (index < 0 || index >= slides.length) return;
        const card = cardRefs.current[index];
        if (!card) return;
        const computedStyle = window.getComputedStyle(card);
        const currentHeight = card.getBoundingClientRect().height;
        const currentMinHeight = Number.parseFloat(computedStyle.minHeight);
        const currentMaxHeight = Number.parseFloat(computedStyle.maxHeight);
        const fadeStates = Array.from(card.children)
          .filter(
            (node): node is HTMLElement =>
              node instanceof HTMLElement && !node.classList.contains("problem-collapsed-toggle"),
          )
          .map((element) => ({
            element,
            opacity: Number.parseFloat(window.getComputedStyle(element).opacity) || 0,
          }));

        snapshots.set(index, {
          height: currentHeight,
          minHeight: Number.isFinite(currentMinHeight) ? currentMinHeight : currentHeight,
          maxHeight: Number.isFinite(currentMaxHeight) ? currentMaxHeight : currentHeight,
          marginTop: Number.parseFloat(computedStyle.marginTop) || 0,
          fadeStates,
        });
      });
    },
    [slides.length],
  );

  useLayoutEffect(() => {
    const snapshots = pendingCardSnapshotsRef.current;
    if (snapshots.size === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    snapshots.forEach((snapshot, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const targetHeight = card.getBoundingClientRect().height;
      const targetMinHeightRaw = Number.parseFloat(window.getComputedStyle(card).minHeight);
      const targetMaxHeightRaw = Number.parseFloat(window.getComputedStyle(card).maxHeight);
      const targetMinHeight = Number.isFinite(targetMinHeightRaw) ? targetMinHeightRaw : targetHeight;
      const targetMaxHeight = Number.isFinite(targetMaxHeightRaw) ? targetMaxHeightRaw : targetHeight;
      const targetMarginTop = Number.parseFloat(window.getComputedStyle(card).marginTop) || 0;
      const fadeTargets = snapshot.fadeStates.map((state) => state.element);
      const isCollapsing = targetHeight < snapshot.height;
      const stepDuration = isCollapsing ? CARD_COLLAPSE_DURATION_S : CARD_EXPAND_DURATION_S;

      gsap.killTweensOf(card);
      if (fadeTargets.length > 0) {
        gsap.killTweensOf(fadeTargets);
      }

      if (prefersReducedMotion) {
        gsap.set(card, { clearProps: "height,minHeight,maxHeight,marginTop" });
        snapshot.fadeStates.forEach(({ element }) => {
          if (card.contains(element)) {
            gsap.set(element, { clearProps: "opacity" });
          }
        });
        return;
      }

      gsap.set(card, {
        height: snapshot.height,
        minHeight: snapshot.minHeight,
        maxHeight: snapshot.maxHeight,
        marginTop: snapshot.marginTop,
      });
      gsap.to(card, {
        height: targetHeight,
        minHeight: targetMinHeight,
        maxHeight: targetMaxHeight,
        marginTop: targetMarginTop,
        duration: stepDuration,
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(card, { clearProps: "height,minHeight,maxHeight,marginTop" });
        },
      });

      snapshot.fadeStates.forEach(({ element, opacity }) => {
        if (!card.contains(element)) return;
        const targetOpacity = Number.parseFloat(window.getComputedStyle(element).opacity) || 0;
        gsap.set(element, { opacity });
        gsap.to(element, {
          opacity: targetOpacity,
          duration: isCollapsing ? 0.28 : 0.24,
          ease: "power1.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(element, { clearProps: "opacity" });
          },
        });
      });
    });

    snapshots.clear();
  }, [collapsedCount, manualExpandedIndex, maxCollapsedCount]);

  useEffect(() => {
    const hostSection = sectionRef.current;
    if (!hostSection || slides.length === 0) return;

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

    const isSectionTopAligned = () => {
      const bounds = getViewportBounds();
      const rect = hostSection.getBoundingClientRect();
      return Math.abs(rect.top - bounds.top) <= getTolerance();
    };

    const shouldInitiateLock = (direction: 1 | -1) => {
      if (direction < 0) return false;
      const bounds = getViewportBounds();
      const rect = hostSection.getBoundingClientRect();
      if (isSectionTopAligned()) return true;

      const viewportBand = Math.max(
        LOCK_INTERSECTION_GUARD_PX,
        Math.min(180, Math.round((bounds.bottom - bounds.top) * 0.2)),
      );
      const intersectsLockBand =
        rect.top <= bounds.top + getTolerance() &&
        rect.bottom > bounds.top + viewportBand &&
        rect.top < bounds.bottom - viewportBand;
      if (!intersectsLockBand) return false;

      const current = collapsedCountRef.current;
      return current < maxCollapsedCount || manualExpandedIndexRef.current !== null;
    };

    const clearReleaseTimer = () => {
      if (releaseTimerRef.current === null) return;
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
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

    const releaseLock = (direction: 1 | -1, delay = 0) => {
      const anchor = getSectionAnchorTop();
      const fallbackDownTarget = anchor + hostSection.getBoundingClientRect().height + LOCK_EXIT_NUDGE_PX;
      const nextSectionAnchor = getAdjacentSectionAnchorTop();
      const targetTop =
        direction > 0 ? (nextSectionAnchor ?? fallbackDownTarget) : Math.max(0, anchor - LOCK_EXIT_NUDGE_PX);

      const performRelease = () => {
        unfreezeScroll();
        lastReleaseDirectionRef.current = direction;
        wheelAccumRef.current = 0;
        wheelDirRef.current = 0;
        touchAccumRef.current = 0;
        touchDirRef.current = 0;
        touchStartYRef.current = null;
        touchCurrentYRef.current = null;

        window.scrollTo({ top: targetTop, behavior: "auto" });
      };

      clearReleaseTimer();
      if (delay <= 0) {
        performRelease();
        return;
      }

      releaseTimerRef.current = window.setTimeout(() => {
        releaseTimerRef.current = null;
        performRelease();
      }, delay);
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
      const hasManualExpanded = manualExpandedIndexRef.current !== null;
      if (hasManualExpanded && direction > 0) {
        const expandedIndex = manualExpandedIndexRef.current;
        if (expandedIndex !== null) {
          captureCardSnapshots([expandedIndex]);
        }

        isTransitioningRef.current = true;
        setManualExpandedIndex(null);
        manualExpandedIndexRef.current = null;
        setCollapsedCount(maxCollapsedCount);
        collapsedCountRef.current = maxCollapsedCount;
        window.setTimeout(() => {
          isTransitioningRef.current = false;
        }, CARD_STEP_LOCK_DURATION_MS);
        return true;
      }

      const current = collapsedCountRef.current;
      if (direction > 0) {
        const next = Math.min(maxCollapsedCount, current + 1);
        if (next === current) return false;

        captureCardSnapshots([current]);

        isTransitioningRef.current = true;
        setCollapsedCount(next);
        collapsedCountRef.current = next;
        window.setTimeout(() => {
          isTransitioningRef.current = false;
        }, CARD_STEP_LOCK_DURATION_MS);

        if (next === maxCollapsedCount) {
          releaseLock(1, CARD_EXIT_RELEASE_DELAY_MS);
        }
        return true;
      }

      const next = Math.max(0, current - 1);
      if (next === current) return false;

      captureCardSnapshots([next]);

      isTransitioningRef.current = true;
      setCollapsedCount(next);
      collapsedCountRef.current = next;
      window.setTimeout(() => {
        isTransitioningRef.current = false;
      }, CARD_STEP_LOCK_DURATION_MS);
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (!isLockMode()) return;
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaY);
      if (delta < 2) return;

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      if (!isLockedRef.current) {
        const target = event.target instanceof Node ? event.target : null;
        const isWheelInsideSection = target ? hostSection.contains(target) : false;
        const current = collapsedCountRef.current;
        const canLockOnDown = direction > 0 && (current < maxCollapsedCount || manualExpandedIndexRef.current !== null);
        const sameDirectionAfterRelease =
          lastReleaseDirectionRef.current !== 0 && direction === lastReleaseDirectionRef.current;
        if (sameDirectionAfterRelease && !isWheelInsideSection) return;

        if (isWheelInsideSection && canLockOnDown) {
          event.preventDefault();
          engageLock(getSectionAnchorTop());
        } else if (shouldInitiateLock(direction)) {
          event.preventDefault();
          engageLock(getSectionAnchorTop());
        }
      }

      if (!isLockedRef.current) return;
      event.preventDefault();
      if (wheelLockedRef.current || isTransitioningRef.current) return;

      if (direction < 0) {
        releaseLock(-1);
        return;
      }

      if (wheelDirRef.current !== direction) {
        wheelDirRef.current = direction;
        wheelAccumRef.current = 0;
      }

      wheelAccumRef.current += Math.abs(event.deltaY);
      if (wheelAccumRef.current < WHEEL_DELTA_LOCK_THRESHOLD) return;
      wheelAccumRef.current = 0;

      const current = collapsedCountRef.current;
      const hasManualExpanded = manualExpandedIndexRef.current !== null;
      const atBoundary =
        (direction > 0 && current >= maxCollapsedCount && !hasManualExpanded) || (direction < 0 && current <= 0);
      if (atBoundary) {
        releaseLock(direction);
        return;
      }

      const moved = moveStep(direction);
      if (!moved) return;

      wheelLockedRef.current = true;
      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, Math.max(WHEEL_STEP_COOLDOWN_MS, CARD_STEP_LOCK_DURATION_MS));
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

      if (direction < 0) {
        releaseLock(-1);
        return;
      }

      if (touchDirRef.current !== direction) {
        touchDirRef.current = direction;
        touchAccumRef.current = 0;
      }
      touchAccumRef.current += stepDelta;
      if (touchAccumRef.current < getTouchStepThreshold()) return;
      touchAccumRef.current = 0;

      const current = collapsedCountRef.current;
      const hasManualExpanded = manualExpandedIndexRef.current !== null;
      const atBoundary =
        (direction > 0 && current >= maxCollapsedCount && !hasManualExpanded) || (direction < 0 && current <= 0);
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

      const current = collapsedCountRef.current;
      const needsLock = current < maxCollapsedCount || manualExpandedIndexRef.current !== null;
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
      clearReleaseTimer();
      unfreezeScroll();
      window.removeEventListener("wheel", onWheel, { capture: true });
      hostSection.removeEventListener("touchstart", onTouchStart);
      hostSection.removeEventListener("touchmove", onTouchMove);
      hostSection.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, [captureCardSnapshots, maxCollapsedCount, sectionId, slides.length]);

  const handleCollapsedCardOpenByIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, Math.max(slides.length - 1, 0)));
    const sameSelection = manualExpandedIndexRef.current === clamped && collapsedCountRef.current >= maxCollapsedCount;
    if (sameSelection) return;

    captureCardSnapshots(Array.from({ length: slides.length }, (_, i) => i));

    setCollapsedCount(maxCollapsedCount);
    collapsedCountRef.current = maxCollapsedCount;
    setManualExpandedIndex(clamped);
    manualExpandedIndexRef.current = clamped;
  };

  useEffect(
    () => () => {
      pendingCardSnapshotsRef.current.clear();
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.killTweensOf(card);
        gsap.set(card, { clearProps: "height,minHeight,maxHeight,marginTop" });
        const fadeTargets = Array.from(card.children).filter(
          (node) => !(node instanceof HTMLElement && node.classList.contains("problem-collapsed-toggle")),
        );
        if (fadeTargets.length > 0) {
          gsap.killTweensOf(fadeTargets);
          gsap.set(fadeTargets, { clearProps: "opacity" });
        }
      });
    },
    [],
  );

  return (
    <section ref={sectionRef} id={sectionId} className={`problem-section scroll-mt-28 text-mist ${sectionClassName}`}>
      <div className="problem-inner">
        <div className={`problem-root ${variantClassName}`} data-problem-slider>
          <div className="slider-title-wrap">
            <h2 className="problem-title">
              {accentFirst ? (
                <>
                  <span className="problem-accent">
                    {titleAccent}
                    <img src={titleLineImageUrl} alt="" className="problem-title-line" />
                  </span>
                  <span> {title}</span>
                </>
              ) : (
                <>
                  <span>{title} </span>
                  <span className="problem-accent">
                    {titleAccent}
                    <img src={titleLineImageUrl} alt="" className="problem-title-line" />
                  </span>
                </>
              )}
            </h2>
            <p className="problem-title-subtitle">{subtitle}</p>
          </div>

          <div className="slider-layout" data-slider-scroll-zone>
            <div
              className="slider-container focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB022]"
              aria-label={sliderAriaLabel}
              data-dots-aria-label={dotsAriaLabel}
              data-slide-aria-suffix={slideAriaSuffix}
              tabIndex={0}
            >
              <div className="slider-track">
                {renderedSlides.map(({ slide, index, descriptionParts, descriptionLines }) => {
                  const isCollapsed = isManualExpandedMode ? index !== manualExpandedIndex : index < collapsedCount;
                  const isActive = isManualExpandedMode ? index === manualExpandedIndex : index === activeVisibleIndex;
                  return (
                    <article
                      key={`${slide.title}-${index}`}
                      id={`${sectionId}-slide-${index}`}
                      ref={(node) => {
                        cardRefs.current[index] = node;
                      }}
                      className={`problem-card ${slide.cardClassName ?? ""}`}
                      data-slider-slide
                      data-active={isActive ? "true" : "false"}
                      data-collapsed={isCollapsed ? "true" : "false"}
                      style={
                        {
                          ["--stack-i" as string]: index,
                          ["--body-h" as string]: `${slide.bodyHeight ?? 252}px`,
                          ["--source-w" as string]: `${slide.sourceWidth ?? 320}px`,
                          ["--desc-size" as string]: `${slide.descriptionSize ?? 16}px`,
                          ...(slide.cardHeight ? { ["--card-height" as string]: `${slide.cardHeight}px` } : {}),
                        } as CSSProperties
                      }
                    >
                      <button
                        type="button"
                        className="problem-collapsed-toggle"
                        tabIndex={isCollapsed ? 0 : -1}
                        aria-label={`${slide.title} kartasini ochish`}
                        onClick={() => handleCollapsedCardOpenByIndex(index)}
                      >
                        <span className="problem-collapsed-title-text">{slide.title}</span>
                      </button>

                      <div aria-hidden="true" className="problem-math"></div>
                      <div aria-hidden="true" className="problem-effect"></div>

                      <img src={slide.imageUrl} alt={slide.imageAlt} className="problem-image slider-card-image" />
                      {slide.leftImageUrl && (
                        <img src={slide.leftImageUrl} alt={slide.leftImageAlt ?? ""} className="problem-side-image is-left" />
                      )}
                      {slide.rightImageUrl && (
                        <img src={slide.rightImageUrl} alt={slide.rightImageAlt ?? ""} className="problem-side-image is-right" />
                      )}

                      <div className="problem-body slider-card-body">
                        <div className="problem-copy-head">
                          <p className="problem-kicker">{slide.title}</p>
                          {slide.value && <p className="problem-value">{slide.value}</p>}
                          {slide.highlight && <p className="problem-highlight">{slide.highlight}</p>}
                        </div>

                        <div className="problem-copy-foot">
                          {descriptionLines.length > 1 ? (
                            <div className="problem-description-group">
                              {descriptionLines.map((line) => (
                                <p key={line} className="problem-description">
                                  {line}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="problem-description">
                              {descriptionParts ? (
                                <>
                                  {descriptionParts.before}
                                  <span className="problem-description-accent">{descriptionParts.accent}</span>
                                  {descriptionParts.after}
                                </>
                              ) : (
                                slide.description
                              )}
                            </p>
                          )}

                          {slide.quote && (
                            <div className={`problem-quote-box ${slide.sourceInQuote ? "is-source-card" : ""}`}>
                              <p className="problem-quote">{slide.quote}</p>
                              {slide.sourceInQuote && !slide.hideSource && slide.source && slide.sourceHref && (
                                <div className="problem-source-chip problem-source-chip-in-quote">
                                  <span className="problem-source-label">{sourceLabel}</span>
                                  <a href={slide.sourceHref} target="_blank" rel="noreferrer" className="problem-source-link">
                                    <span>{slide.source}</span>
                                    <svg viewBox="0 0 24 24" className="problem-source-icon" aria-hidden="true">
                                      <path
                                        d="M14 5h5v5M10 14L19 5M19 13v4a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}

                          {!slide.hideSource && slide.source && slide.sourceHref && (
                            <div className={`problem-source-chip ${slide.sourceInQuote ? "is-hidden" : ""}`}>
                              <span className="problem-source-label">{sourceLabel}</span>
                              <a href={slide.sourceHref} target="_blank" rel="noreferrer" className="problem-source-link">
                                <span>{slide.source}</span>
                                <svg viewBox="0 0 24 24" className="problem-source-icon" aria-hidden="true">
                                  <path
                                    d="M14 5h5v5M10 14L19 5M19 13v4a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
