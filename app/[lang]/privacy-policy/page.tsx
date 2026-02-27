import type { Metadata } from "next";
import { getPolicyUiByLang, getPrivacyPolicyByLang } from "@/content/policies";
import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";
import { localizedPath } from "@/lib/i18n/utils";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildCommonSchemas } from "@/lib/structured-data";

type Params = Promise<{ lang: string }>;

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
  const pageContent = getPrivacyPolicyByLang(activeLang);
  const pageUi = getPolicyUiByLang(activeLang);

  return buildMetadata(activeLang, "privacyPolicy", "/privacy-policy", {
    title: pageContent.title,
    description: pageContent.intro,
    keywords: pageUi.privacyKeywords,
  });
}

export default async function LocalizedPrivacyPolicyPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const pageContent = getPrivacyPolicyByLang(activeLang);
  const pageUi = getPolicyUiByLang(activeLang);

  return (
    <SiteShell lang={activeLang} routePath="/privacy-policy" landingTheme>
      <StructuredData data={buildCommonSchemas(activeLang, pageContent.title, pageContent.intro, "/privacy-policy")} />
      <PolicyDocument
        content={pageContent}
        homeHref={localizedPath(activeLang)}
        tocLabel={pageUi.tocLabel}
        backLabel={pageUi.backLabel}
      />
    </SiteShell>
  );
}
