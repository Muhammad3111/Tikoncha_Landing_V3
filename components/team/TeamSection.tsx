import { teamMembers } from "@/content/team";
import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

type Props = {
  lang: Lang;
  sectionId?: string;
  headingLevel?: "h1" | "h2";
};

export function TeamSection({ lang, sectionId = "team", headingLevel = "h1" }: Props) {
  const content = getTranslations(lang).team;
  const HeadingTag = headingLevel;
  const railMembers = [...teamMembers, ...teamMembers];

  return (
    <section id={sectionId} className="team-section scroll-mt-28">
      <header className="team-section__title-block">
        <HeadingTag className="team-section__title">{content.heading}</HeadingTag>
        <img src={siteData.images.team.titleUnderline} alt="" className="team-section__underline" width="321" height="4" />
        <p className="team-section__subtitle">{content.subtitle}</p>
      </header>

      <ul className="team-section__grid">
        {teamMembers.map((member, index) => (
          <li key={member.slug} id={member.slug} className="team-card">
            <div className="team-card__avatar-wrap">
              <img
                src={siteData.images.team.members[member.imageKey as keyof typeof siteData.images.team.members]}
                alt={`${member.name} — ${member.role[lang]}, ${member.project[lang]}`}
                className={`team-card__avatar ${member.avatarClassName ?? ""}`}
                width="84"
                height="84"
                loading={index < 5 ? "eager" : "lazy"}
              />
            </div>
            <div className="team-card__copy">
              <p className="team-card__name">{member.name}</p>
              <p className="team-card__role">{member.role[lang]}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="team-section__rails" aria-hidden="true">
        <div className="team-section__rail team-section__rail--top">
          {railMembers.map((member, index) => (
            <article key={`top-${member.slug}-${index}`} className="team-card team-card--rail">
              <div className="team-card__avatar-wrap">
                <img
                  src={siteData.images.team.members[member.imageKey as keyof typeof siteData.images.team.members]}
                  alt=""
                  className={`team-card__avatar ${member.avatarClassName ?? ""}`}
                  width="84"
                  height="84"
                  loading="lazy"
                />
              </div>
              <div className="team-card__copy">
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role[lang]}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team-section__rail team-section__rail--bottom">
          {railMembers.map((member, index) => (
            <article key={`bottom-${member.slug}-${index}`} className="team-card team-card--rail">
              <div className="team-card__avatar-wrap">
                <img
                  src={siteData.images.team.members[member.imageKey as keyof typeof siteData.images.team.members]}
                  alt=""
                  className={`team-card__avatar ${member.avatarClassName ?? ""}`}
                  width="84"
                  height="84"
                  loading="lazy"
                />
              </div>
              <div className="team-card__copy">
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
