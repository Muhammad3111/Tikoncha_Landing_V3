"use client";

import { useEffect } from "react";
import { PARENT_APP_STORE_URL, PARENT_PLAY_STORE_URL } from "@/lib/constants";

export function TelegramRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("source") !== "telegram") return;

    const ua = window.navigator.userAgent || "";
    const isAndroid = /android/i.test(ua);
    const isIOS = /iphone|ipad|ipod/i.test(ua);

    if (isAndroid) {
      window.location.replace(PARENT_PLAY_STORE_URL);
    } else if (isIOS) {
      window.location.replace(PARENT_APP_STORE_URL);
    }
  }, []);

  return null;
}
