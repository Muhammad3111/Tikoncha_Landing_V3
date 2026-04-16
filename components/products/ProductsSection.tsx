import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";
import { siteData } from "@/lib/site-data";

type Props = {
  lang: Lang;
};

const STORE_LINKS = {
  studentPlay: "https://play.google.com/store/apps/details?id=uz.tikoncha.student",
  parentPlay: "https://play.google.com/store/apps/details?id=uz.tikoncha.parent",
  parentAppStore: "https://apps.apple.com/au/app/tikoncha-parent/id6756965935",
  teacherPlay: "https://play.google.com/store/apps/details?id=uz.tikoncha.ustoz",
  teacherAppStore: "https://apps.apple.com/uz/app/ustoz-tikoncha/id6760545820",
  adminPanel: "https://maktab.tikoncha.uz",
  telegramAdmin: "https://t.me/tikoncha_admin",
} as const;

const APP_ICONS = {
  student:
    "https://play-lh.googleusercontent.com/h0W-M6CkW6eVebEb9yhMDeP1Qe7S6NezAPIc9etvmatGuTo7WyDfZMe6gacUcYqgfGGNyNpeVwndy4jWun1QtA=w240-h480-rw",
  parent:
    "https://play-lh.googleusercontent.com/A-lLZhFOyy0ikm3JoHN526F2pB8Rw1InZFp9RO-6u8HL2AY-bm35MkHt8a-qwaup4l6qFV4VHe0wsttjWC8W6FM=w240-h480-rw",
  teacher:
    "https://play-lh.googleusercontent.com/FHWD9SgvoBflHz1bRJj-2PinWUcIGnlfPHEy5TfvUPGJ8RYXQnaIzPDWSk52DPc5LJr6U90AWPL6lHGnG71fA7s=w240-h480-rw",
  admin: "https://img.icons8.com/?id=40734&format=png&size=96",
} as const;

const EXTERNAL_LINK_ICON = "https://img.icons8.com/?id=82787&format=png&size=96&color=ffffff";

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const STORE_BUTTON_CLASS =
  "inline-flex h-[40px] sm:h-[44px] shrink-0 items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-[32px] bg-[rgba(255,255,255,0.2)] pl-3 pr-4 sm:pl-4 sm:pr-6 py-2 sm:py-2.5 text-[12px] sm:text-[14px] font-medium leading-[18px] text-white transition-colors duration-200 hover:bg-[rgba(255,255,255,0.28)]";

type StoreButtonProps = {
  href: string;
  label: string;
  iconSrc: string;
};

function StoreButton({ href, label, iconSrc }: StoreButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={STORE_BUTTON_CLASS}>
      <img src={iconSrc} alt="" className="size-6" width="24" height="24" decoding="async" />
      <span>{label}</span>
    </a>
  );
}

export function ProductsSection({ lang }: Props) {
  const t = getTranslations(lang).products;

  const cards = [
    {
      key: "student" as const,
      iconImage: APP_ICONS.student,
      title: t.items.student.title,
      description: t.items.student.description,
      buttons: (
        <StoreButton
          href={STORE_LINKS.studentPlay}
          label={t.storeLabels.googlePlay}
          iconSrc={siteData.images.hero.playMarketIcon}
        />
      ),
    },
    {
      key: "parent" as const,
      iconImage: APP_ICONS.parent,
      title: t.items.parent.title,
      description: t.items.parent.description,
      buttons: (
        <>
          <StoreButton
            href={STORE_LINKS.parentPlay}
            label={t.storeLabels.googlePlay}
            iconSrc={siteData.images.hero.playMarketIcon}
          />
          <StoreButton
            href={STORE_LINKS.parentAppStore}
            label={t.storeLabels.appStore}
            iconSrc={siteData.images.hero.appStoreIcon}
          />
        </>
      ),
    },
    {
      key: "teacher" as const,
      iconImage: APP_ICONS.teacher,
      title: t.items.teacher.title,
      description: t.items.teacher.description,
      buttons: (
        <>
          <StoreButton
            href={STORE_LINKS.teacherPlay}
            label={t.storeLabels.googlePlay}
            iconSrc={siteData.images.hero.playMarketIcon}
          />
          <StoreButton
            href={STORE_LINKS.teacherAppStore}
            label={t.storeLabels.appStore}
            iconSrc={siteData.images.hero.appStoreIcon}
          />
        </>
      ),
    },
    {
      key: "admin" as const,
      iconImage: APP_ICONS.admin,
      title: t.items.admin.title,
      description: t.items.admin.description,
      buttons: (
        <StoreButton
          href={STORE_LINKS.adminPanel}
          label={t.storeLabels.openPanel}
          iconSrc={EXTERNAL_LINK_ICON}
        />
      ),
      footer: (
        <p className="mt-4 flex items-center gap-2 text-xs text-white/55">
          <InfoIcon />
          <span>
            {t.adminNote}{" "}
            <a
              href={STORE_LINKS.telegramAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-secondary underline-offset-2 hover:underline"
            >
              {t.adminNoteLinkLabel}
            </a>
          </span>
        </p>
      ),
    },
  ];

  return (
    <section className="pb-16 pt-10 text-mist lg:pb-24 lg:pt-14">
      <header className="mx-auto max-w-[860px] text-center">
        <h1 className="text-[34px] font-bold leading-[1.1] text-white sm:text-[44px]">
          {t.heading} <span className="text-secondary">{t.headingAccent}</span>
        </h1>
        <p className="mt-4 text-base leading-7 text-white/75 sm:text-[18px]">{t.subtitle}</p>
      </header>

      <div className="mx-auto mt-10 grid w-full max-w-[1040px] gap-6 sm:mt-12 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.key}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(165deg,rgba(20,41,25,0.34)_0%,rgba(20,24,30,0.78)_55%,rgba(15,18,23,0.92)_100%)] p-6 shadow-[0_18px_42px_rgba(0,0,0,0.32)] sm:p-7"
          >
            <div className="flex items-center gap-4">
              <img
                src={card.iconImage}
                alt=""
                className="size-12 shrink-0 rounded-2xl object-cover"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <h2 className="text-lg font-semibold text-white sm:text-xl">{card.title}</h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/70 sm:text-[15px]">{card.description}</p>

            <div className="mt-6 flex flex-nowrap gap-2 sm:gap-2.5">{card.buttons}</div>

            {card.footer}
          </article>
        ))}
      </div>
    </section>
  );
}
