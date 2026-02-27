import type { Metadata } from "next";
import { getPolicyUiByLang, getPrivacyPolicyByLang } from "@/content/policies";
import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { defaultLang } from "@/lib/routing";
import { localizedPath } from "@/lib/i18n/utils";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildCommonSchemas } from "@/lib/structured-data";

const pageContent = getPrivacyPolicyByLang(defaultLang);
const pageUi = getPolicyUiByLang(defaultLang);

export const metadata: Metadata = buildMetadata("uz", "privacyPolicy", "/privacy-policy", {
  title: pageContent.title,
  description: pageContent.intro,
  keywords: pageUi.privacyKeywords,
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell lang={defaultLang} routePath="/privacy-policy" landingTheme>
      <StructuredData data={buildCommonSchemas(defaultLang, pageContent.title, pageContent.intro, "/privacy-policy")} />
      <PolicyDocument
        content={pageContent}
        homeHref={localizedPath(defaultLang)}
        tocLabel={pageUi.tocLabel}
        backLabel={pageUi.backLabel}
      />
    </SiteShell>
  );
}
