import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { buildCommonSchemas } from "@/lib/structured-data";
import { localizedPath } from "@/lib/i18n/utils";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";
import { getPolicyUiByLang } from "@/content/policies";
import { getUstozPrivacyPolicyByLang } from "@/content/ustoz-policy";

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
  const pageContent = getUstozPrivacyPolicyByLang(activeLang);
  const pageUi = getPolicyUiByLang(activeLang);

  return buildMetadata(activeLang, "privacyPolicy", "/ustoz/privacy-policy", {
    title: pageContent.title,
    description: pageContent.intro,
    keywords: pageUi.privacyKeywords,
  });
}

export default async function LocalizedUstozPrivacyPolicyPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const pageContent = getUstozPrivacyPolicyByLang(activeLang);
  const pageUi = getPolicyUiByLang(activeLang);

  return (
    <SiteShell lang={activeLang} routePath="/ustoz/privacy-policy" landingTheme>
      <StructuredData
        data={buildCommonSchemas(
          activeLang,
          pageContent.title,
          pageContent.intro,
          "/ustoz/privacy-policy",
        )}
      />
      <PolicyDocument
        content={pageContent}
        homeHref={localizedPath(activeLang)}
        tocLabel={pageUi.tocLabel}
        backLabel={pageUi.backLabel}
      />
    </SiteShell>
  );
}
