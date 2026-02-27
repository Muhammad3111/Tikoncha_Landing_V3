import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/layout/SiteShell";
import { LandingPage } from "@/components/home/LandingPage";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildHomeSchemas } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata("uz", "home", "/");

export default function HomePage() {
  return (
    <SiteShell lang="uz" routePath="/" landingTheme>
      <StructuredData data={buildHomeSchemas("uz")} />
      <LandingPage lang="uz" />
    </SiteShell>
  );
}
