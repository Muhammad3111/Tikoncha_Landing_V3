import { teamMembers } from "@/content/team";
import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

type Props = {
  lang: Lang;
  sectionId?: string;
  headingLevel?: "h1" | "h2";
};

const DIGRAPH_MAP: Record<string, string> = {
  "o'": "ў",
  "g'": "ғ",
  sh: "ш",
  ch: "ч",
  ya: "я",
  yo: "ё",
  yu: "ю",
  ye: "е",
  zh: "ж",
  ts: "ц",
  ng: "нг",
};

const CHAR_MAP: Record<string, string> = {
  a: "а",
  b: "б",
  c: "с",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "ҳ",
  i: "и",
  j: "ж",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "қ",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  w: "в",
  x: "х",
  y: "й",
  z: "з",
};

const applyCase = (mapped: string, original: string): string => {
  if (original.toUpperCase() === original && original.toLowerCase() !== original) {
    return mapped.toUpperCase();
  }
  const first = original.charAt(0);
  if (first.toUpperCase() === first && first.toLowerCase() !== first) {
    return mapped.charAt(0).toUpperCase() + mapped.slice(1);
  }
  return mapped;
};

const toCyrillic = (value: string): string => {
  const normalized = value.replace(/[ʻ’‘`]/g, "'");
  const lower = normalized.toLowerCase();
  let result = "";

  for (let index = 0; index < normalized.length; ) {
    const digraph = lower.slice(index, index + 2);
    if (DIGRAPH_MAP[digraph]) {
      const originalChunk = normalized.slice(index, index + 2);
      result += applyCase(DIGRAPH_MAP[digraph], originalChunk);
      index += 2;
      continue;
    }

    const char = lower.charAt(index);
    const originalChar = normalized.charAt(index);
    if (CHAR_MAP[char]) {
      result += applyCase(CHAR_MAP[char], originalChar);
    } else {
      result += originalChar;
    }
    index += 1;
  }

  return result;
};

const getTeamDisplayName = (value: string, lang: Lang): string => {
  if (lang !== "ru") return value;
  return toCyrillic(value);
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
                alt={`${getTeamDisplayName(member.name, lang)} — ${member.role[lang]}, ${member.project[lang]}`}
                className={`team-card__avatar ${member.avatarClassName ?? ""}`}
                width="84"
                height="84"
                loading={index < 5 ? "eager" : "lazy"}
              />
            </div>
            <div className="team-card__copy">
              <p className="team-card__name">{getTeamDisplayName(member.name, lang)}</p>
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
                <p className="team-card__name">{getTeamDisplayName(member.name, lang)}</p>
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
                <p className="team-card__name">{getTeamDisplayName(member.name, lang)}</p>
                <p className="team-card__role">{member.role[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
