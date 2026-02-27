import type { PolicyContent } from "@/content/policies";

type Props = {
  content: PolicyContent;
  homeHref: string;
  tocLabel?: string;
  backLabel?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export function PolicyDocument({
  content,
  homeHref,
  tocLabel = "Mundarija",
  backLabel = "Bosh sahifaga qaytish",
  contactEmail = "info@tikoncha.uz",
  contactPhone = "+998 97 270 70 07",
}: Props) {
  return (
    <section className="min-h-screen bg-[#090b10] py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 rounded-2xl border border-[#2b2b31] bg-[#11141b] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-100">{tocLabel}</h2>
              <nav className="space-y-1">
                {content.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2.5 text-sm text-[#b7bec9] transition-colors hover:bg-white/10 hover:text-gray-100"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <div className="mb-8 rounded-3xl border border-[#2b2b31] bg-gradient-to-br from-secondary/20 via-secondary/10 to-[#121821] p-8 lg:p-12">
              <h1 className="text-3xl font-bold text-gray-100 lg:text-4xl">{content.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-[#c7cdd7]">{content.intro}</p>
            </div>

            <div className="mb-8 lg:hidden">
              <details className="overflow-hidden rounded-2xl border border-[#2b2b31] bg-[#11141b] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-gray-100">{tocLabel}</summary>
                <nav className="space-y-1 px-6 pb-4">
                  {content.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-lg px-3 py-2.5 text-sm text-[#b7bec9] transition-colors hover:bg-white/10 hover:text-gray-100"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </details>
            </div>

            <div className="space-y-6">
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-2xl border border-[#2b2b31] bg-[#12161f] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] lg:p-8"
                >
                  <h2 className="text-xl font-bold text-gray-100 lg:text-2xl">{section.title}</h2>
                  {section.description && <p className="mt-4 leading-relaxed text-[#c7cdd7]">{section.description}</p>}
                  {section.items && section.items.length > 0 && (
                    <ul className="mt-4 list-disc space-y-3 pl-5">
                      {section.items.map((item) => (
                        <li key={item} className="leading-relaxed text-[#b7bec9]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <div className="mt-4 rounded-xl border-l-4 border-secondary bg-secondary/15 p-4">
                      <p className="text-sm italic leading-relaxed text-[#d6dfd8]">{section.note}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 p-8 text-white">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xl font-bold">{contactEmail}</p>
                  <p className="mt-1 text-sm text-white/85">{contactPhone}</p>
                </div>
                <a
                  href={homeHref}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  {backLabel}
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
