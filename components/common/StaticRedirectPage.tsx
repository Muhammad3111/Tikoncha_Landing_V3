"use client";

import { useEffect } from "react";

type Props = {
  to: string;
};

export function StaticRedirectPage({ to }: Props) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-[720px] flex-col items-center justify-center gap-4 px-6 text-center text-mist">
      <p className="text-base font-medium">Sahifa yo&apos;naltirilmoqda...</p>
      <a href={to} className="text-sm text-secondary underline underline-offset-2">
        Avtomatik o&apos;tmasa shu havolani bosing
      </a>
    </main>
  );
}
