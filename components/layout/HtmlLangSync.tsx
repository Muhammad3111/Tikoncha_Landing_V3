"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
};

export function HtmlLangSync({ lang }: Props) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
