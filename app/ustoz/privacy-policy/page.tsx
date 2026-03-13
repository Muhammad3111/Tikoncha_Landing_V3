import { StaticRedirectPage } from "@/components/common/StaticRedirectPage";
import { localizedPath } from "@/lib/i18n/utils";
import { defaultLang } from "@/lib/routing";

export default function UstozPrivacyPolicyRedirectPage() {
  return <StaticRedirectPage to={localizedPath(defaultLang, "/ustoz/privacy-policy")} />;
}
