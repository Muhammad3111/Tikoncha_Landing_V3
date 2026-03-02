"use client";

import { useMemo, type CSSProperties } from "react";

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
  const isNotEnoughVariant = variantClassName.split(" ").includes("is-not-enough");

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

  return (
    <section id={sectionId} className={`problem-section scroll-mt-28 text-mist ${sectionClassName}`}>
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
              <div
                className="slider-track"
                style={
                  {
                    ["--stack-shift-steps" as string]: 0,
                  } as CSSProperties
                }
              >
                {renderedSlides.map(({ slide, index, descriptionParts, descriptionLines }) => {
                  const hasSource = !slide.hideSource && !!slide.source && !!slide.sourceHref;
                  const isWorldQuoteMobileCard = sectionId === "countries" && !!slide.quote && !!slide.sourceInQuote;

                  return (
                    <article
                      key={`${slide.title}-${index}`}
                      id={`${sectionId}-slide-${index}`}
                      className={`problem-card ${slide.cardClassName ?? ""}`}
                      data-slider-slide
                      data-active={index === 0 ? "true" : "false"}
                      data-collapsed="false"
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
                      <div aria-hidden="true" className="problem-math"></div>
                      <div aria-hidden="true" className="problem-effect"></div>

                      <img
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        className="problem-image slider-card-image"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />

                      {slide.leftImageUrl && (
                        <img
                          src={slide.leftImageUrl}
                          alt={slide.leftImageAlt ?? ""}
                          className="problem-side-image is-left"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      )}

                      {slide.rightImageUrl && (
                        <img
                          src={slide.rightImageUrl}
                          alt={slide.rightImageAlt ?? ""}
                          className="problem-side-image is-right"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
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

                          {hasSource && (
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

                      {isWorldQuoteMobileCard && slide.quote && (
                        <div className="problem-world-mobile-desc">
                          <p className="problem-world-mobile-quote">{slide.quote}</p>
                          {hasSource && (
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

                      {hasSource && !isWorldQuoteMobileCard && (
                        <div className="problem-source-chip problem-source-chip-mobile">
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
