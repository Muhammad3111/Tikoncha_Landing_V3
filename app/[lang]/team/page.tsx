import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { TeamSection } from "@/components/team/TeamSection";
import { buildMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildTeamSchemas } from "@/lib/structured-data";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";

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
  return buildMetadata(activeLang, "team", "/team");
}

export default async function LocalizedTeamPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);

  return (
    <SiteShell lang={activeLang} routePath="/team" landingTheme>
      <StructuredData data={buildTeamSchemas(activeLang)} />
      <TeamSection lang={activeLang} headingLevel="h1" />
    </SiteShell>
  );
}
