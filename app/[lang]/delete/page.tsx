import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { StructuredData } from "@/components/layout/StructuredData";
import { DeleteAccountForm } from "@/components/delete/DeleteAccountForm";
import { buildCommonSchemas } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";
import type { Lang } from "@/lib/i18n/config";

type Params = Promise<{ lang: string }>;

const deleteMetaByLang: Record<Lang, { title: string; description: string }> = {
  uz: {
    title: "Hisobni o'chirish | Tikoncha",
    description: "Telefon va OTP orqali Tikoncha hisobingizni o'chirish sahifasi.",
  },
  ru: {
    title: "Удаление аккаунта | Tikoncha",
    description: "Страница удаления аккаунта Tikoncha через телефон и OTP-код.",
  },
  en: {
    title: "Delete Account | Tikoncha",
    description: "Delete your Tikoncha account using your phone and OTP code.",
  },
};

export async function generateStaticParams() {
  return localizedStaticParams;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const meta = deleteMetaByLang[activeLang];

  return buildMetadata(activeLang, "privacyPolicy", "/delete", {
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedDeletePage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const meta = deleteMetaByLang[activeLang];

  return (
    <SiteShell lang={activeLang} routePath="/delete" landingTheme>
      <StructuredData data={buildCommonSchemas(activeLang, meta.title, meta.description, "/delete")} />
      <DeleteAccountForm lang={activeLang} />
    </SiteShell>
  );
}
