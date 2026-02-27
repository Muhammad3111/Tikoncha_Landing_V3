import type { Lang } from "@/lib/i18n/config";

type LocalizedText = Record<Lang, string>;

export type TeamMemberProfile = {
    slug: string;
    name: string;
    role: LocalizedText;
    project: LocalizedText;
    imageKey: string;
    avatarClassName?: string;
};

type TeamStructuredDataParams = {
    lang: Lang;
    siteName: string;
    teamPageUrl: string;
    organizationUrl: string;
};

export const teamMembers: TeamMemberProfile[] = [
    {
        slug: "saidburxon-shuxratov",
        name: "Saidburxon Shuxratov",
        role: {
            uz: "Asoschi va CEO",
            ru: "Основатель и CEO",
            en: "Founder & CEO",
        },
        project: {
            uz: "Tikoncha platforma strategiyasi",
            ru: "Стратегия платформы Tikoncha",
            en: "Tikoncha platform strategy",
        },
        imageKey: "member-01",
    },
    {
        slug: "saidburxon-umarxonov",
        name: "Saidburxon Umarxonov",
        role: {
            uz: "Loyiha Menejeri",
            ru: "Проектный менеджер",
            en: "Project Manager",
        },
        project: {
            uz: "Tikoncha product delivery",
            ru: "Product delivery Tikoncha",
            en: "Tikoncha product delivery",
        },
        imageKey: "member-07",
    },
    {
        slug: "ibroximjon-odilov",
        name: "Ibroximjon Odilov",
        role: {
            uz: "Senior Android Dasturchi",
            ru: "Senior Android разработчик",
            en: "Senior Android Developer",
        },
        project: {
            uz: "Tikoncha Android ilovasi",
            ru: "Android-приложение Tikoncha",
            en: "Tikoncha Android app",
        },
        imageKey: "member-02",
    },
    {
        slug: "komiljon-xamidjonov",
        name: "Komiljon Xamidjonov",
        role: {
            uz: "Senior Backend Dasturchi",
            ru: "Senior Backend разработчик",
            en: "Senior Backend Developer",
        },
        project: {
            uz: "Tikoncha API va backend",
            ru: "API и backend Tikoncha",
            en: "Tikoncha API and backend",
        },
        imageKey: "member-03",
    },
    {
        slug: "abdurahim-sharipov",
        name: "Abdurahim Sharipov",
        role: {
            uz: "Android Dasturchi",
            ru: "Android разработчик",
            en: "Android Developer",
        },
        project: {
            uz: "Tikoncha Android ilovasi",
            ru: "Android-приложение Tikoncha",
            en: "Tikoncha Android app",
        },
        imageKey: "member-04",
    },
    {
        slug: "muhammad-karimov",
        name: "Muhammad Karimov",
        role: {
            uz: "Frontend Veb Dasturchi",
            ru: "Frontend веб-разработчик",
            en: "Frontend Web Developer",
        },
        project: {
            uz: "Tikoncha web platformasi",
            ru: "Веб-платформа Tikoncha",
            en: "Tikoncha web platform",
        },
        imageKey: "member-08",
    },
    {
        slug: "jamshid-murtazoyev",
        name: "Jamshid Murtazoyev",
        role: {
            uz: "QA Engineer",
            ru: "QA Engineer",
            en: "QA Engineer",
        },
        project: {
            uz: "Tikoncha sifat nazorati",
            ru: "Контроль качества Tikoncha",
            en: "Tikoncha quality assurance",
        },
        imageKey: "member-05",
    },
    {
        slug: "diyorbek-aliyev",
        name: "Diyorbek Aliyev",
        role: {
            uz: "QA Engineer",
            ru: "QA Engineer",
            en: "QA Engineer",
        },
        project: {
            uz: "Tikoncha sifat nazorati",
            ru: "Контроль качества Tikoncha",
            en: "Tikoncha quality assurance",
        },
        imageKey: "member-10",
    },
    {
        slug: "abrorbek-ibroximov",
        name: "Abrorbek Ibroximov",
        role: {
            uz: "Senior UI/UX Dizayner",
            ru: "Senior UI/UX дизайнер",
            en: "Senior UI/UX Designer",
        },
        project: {
            uz: "Tikoncha UX tizimi",
            ru: "UX-система Tikoncha",
            en: "Tikoncha UX system",
        },
        imageKey: "member-06",
    },
    {
        slug: "ali-umirov",
        name: "Ali Umirov",
        role: {
            uz: "UI/UX Dizayner",
            ru: "UI/UX дизайнер",
            en: "UI/UX Designer",
        },
        project: {
            uz: "Tikoncha mobil UI dizayni",
            ru: "Мобильный UI-дизайн Tikoncha",
            en: "Tikoncha mobile UI design",
        },
        imageKey: "member-09",
        avatarClassName: "team-card__avatar--offset-down",
    },
];

export function createTeamStructuredData({
    lang,
    siteName,
    teamPageUrl,
    organizationUrl,
}: TeamStructuredDataParams): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${siteName} Team`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: teamMembers.length,
        itemListElement: teamMembers.map((member, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Person",
                name: member.name,
                jobTitle: member.role[lang],
                description: `${member.project[lang]}.`,
                knowsAbout: [member.project[lang]],
                worksFor: {
                    "@type": "Organization",
                    name: siteName,
                    url: organizationUrl,
                },
                url: `${teamPageUrl}#${member.slug}`,
            },
        })),
    };
}
