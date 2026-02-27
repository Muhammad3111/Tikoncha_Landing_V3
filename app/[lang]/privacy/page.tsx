import { redirect } from "next/navigation";
import { localizedPath } from "@/lib/i18n/utils";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";

type Params = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return localizedStaticParams;
}

export default async function LocalizedPrivacyRedirectPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  redirect(localizedPath(activeLang, "/privacy-policy"));
}
