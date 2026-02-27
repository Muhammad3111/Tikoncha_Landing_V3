import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/layout/SiteShell";
import { LandingPage } from "@/components/home/LandingPage";
import { StructuredData } from "@/components/layout/StructuredData";
import { buildHomeSchemas } from "@/lib/structured-data";
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
  return buildMetadata(activeLang, "home", "/");
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);

  return (
    <SiteShell lang={activeLang} routePath="/" landingTheme>
      <StructuredData data={buildHomeSchemas(activeLang)} />
      <LandingPage lang={activeLang} />
    </SiteShell>
  );
}
