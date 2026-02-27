import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { TeamSection } from "@/components/team/TeamSection";
import { buildMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildTeamSchemas } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("uz", "team", "/team");

export default function TeamPage() {
  return (
    <SiteShell lang="uz" routePath="/team" landingTheme>
      <StructuredData data={buildTeamSchemas("uz")} />
      <TeamSection lang="uz" headingLevel="h1" />
    </SiteShell>
  );
}
