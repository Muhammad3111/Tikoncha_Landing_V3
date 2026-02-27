import type { Lang } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/utils";

type Props = {
  lang: Lang;
  type: "blog" | "account";
};

export function PlaceholderPage({ lang, type }: Props) {
  const t = getTranslations(lang)[type];

  return (
    <section className="flex min-h-[55vh] items-center justify-center py-20">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white shadow-[0_18px_42px_rgba(0,0,0,0.25)]">
        <h1 className="text-4xl font-semibold leading-tight">{t.heading}</h1>
        <p className="mt-5 text-lg leading-relaxed text-white/80">{t.body}</p>
      </div>
    </section>
  );
}
