"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const CONSENT_KEY = "elwgar-consent";
const LOGGED_KEY = "elwgar-visit-logged";

/**
 * Cookie consent. The site itself sets no tracking cookies — the banner only
 * gates the anonymous visit logging (IP + language) in Supabase.
 * Accept → one visit row per browser session. Decline → nothing is logged.
 */
export default function CookieBanner() {
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = window.localStorage.getItem(CONSENT_KEY);
    if (state === "accepted") {
      logVisit(lang);
    } else if (state !== "declined") {
      setVisible(true);
    }
    // log once per session even if the language changes later
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logVisit(currentLang: string) {
    if (window.sessionStorage.getItem(LOGGED_KEY)) return;
    window.sessionStorage.setItem(LOGGED_KEY, "1");
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consent: true,
        path: window.location.pathname,
        lang: currentLang,
      }),
    })
      .then((res) => {
        // Failed insert (e.g. missing table/key)? Clear the flag so it
        // retries instead of silently swallowing this session forever.
        if (!res.ok) window.sessionStorage.removeItem(LOGGED_KEY);
      })
      .catch(() => window.sessionStorage.removeItem(LOGGED_KEY));
  }

  function decide(accepted: boolean) {
    window.localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
    if (accepted) logVisit(lang);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookie.title}
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-white bg-black text-white"
    >
      <div
        className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
            [ {t.cookie.title} ]
          </p>
          <p className="mt-1 text-sm leading-snug text-white/90">
            {t.cookie.desc}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(true)}
            className="flex-1 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5 md:flex-none md:py-2.5"
          >
            {t.cookie.accept}
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            className="flex-1 border border-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-black md:flex-none md:py-2.5"
          >
            {t.cookie.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
