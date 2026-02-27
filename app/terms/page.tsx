import type { Metadata } from "next";
import { getPolicyUiByLang, getTermsPolicyByLang } from "@/content/policies";
import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { defaultLang } from "@/lib/routing";
import { localizedPath } from "@/lib/i18n/utils";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildCommonSchemas } from "@/lib/structured-data";

const pageContent = getTermsPolicyByLang(defaultLang);
const pageUi = getPolicyUiByLang(defaultLang);

export const metadata: Metadata = buildMetadata("uz", "terms", "/terms", {
  title: pageContent.title,
  description: pageContent.intro,
  keywords: pageUi.termsKeywords,
});

export default function TermsPage() {
  return (
    <SiteShell lang={defaultLang} routePath="/terms" landingTheme>
      <StructuredData data={buildCommonSchemas(defaultLang, pageContent.title, pageContent.intro, "/terms")} />
      <PolicyDocument
        content={pageContent}
        homeHref={localizedPath(defaultLang)}
        tocLabel={pageUi.tocLabel}
        backLabel={pageUi.backLabel}
      />
    </SiteShell>
  );
}
