import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { StructuredData } from "@/components/layout/StructuredData";
import { ProductsSection } from "@/components/products/ProductsSection";
import { TelegramRedirect } from "@/components/products/TelegramRedirect";
import { buildMetadata } from "@/lib/seo";
import { buildCommonSchemas } from "@/lib/structured-data";
import { localizedStaticParams, resolveRouteLang } from "@/lib/routing";
import { getTranslations } from "@/lib/i18n/utils";

type Params = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return localizedStaticParams;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  return buildMetadata(activeLang, "products", "/products");
}

export default async function LocalizedProductsPage({ params }: { params: Params }) {
  const { lang } = await params;
  const activeLang = resolveRouteLang(lang);
  const meta = getTranslations(activeLang).products.meta;

  return (
    <SiteShell lang={activeLang} routePath="/products" landingTheme>
      <StructuredData data={buildCommonSchemas(activeLang, meta.title, meta.description, "/products")} />
      <TelegramRedirect />
      <ProductsSection lang={activeLang} />
    </SiteShell>
  );
}
