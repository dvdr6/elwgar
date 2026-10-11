"use client";

import { useLanguage, type Lang } from "@/lib/i18n";
import Wordmark from "@/components/Wordmark";

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  const link =
    "uppercase tracking-[0.2em] text-xs font-medium hover:opacity-50 transition-opacity";

  const langBtn = (l: Lang) =>
    `px-2 py-1 text-xs font-mono uppercase transition-colors ${
      lang === l
        ? "bg-white text-black"
        : "text-white hover:outline hover:outline-1 hover:outline-white"
    }`;

  return (
    <header className="header-blend fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">{/* Logo — white master file, inverted by the blend mode */}
        <a href="#start" className="flex items-center gap-3" aria-label="ELWGAR — start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo_4.svg" alt="ELWGAR" className="h-9 w-9" />
          <Wordmark className="hidden text-sm font-extrabold uppercase tracking-[0.35em] sm:block" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className={link} href="#uslugi">{t.nav.services}</a>
          <a className={link} href="#portfolio">{t.nav.portfolio}</a>
          <a className={link} href="#studio">{t.nav.studio}</a>
          <a className={link} href="#kontakt">{t.nav.contact}</a>
        </nav>

        {/* Language switch */}
        <div
          className="flex items-center border border-white font-mono"
          role="group"
          aria-label="Language / Język"
        >
          <button
            type="button"
            className={langBtn("pl")}
            onClick={() => setLang("pl")}
            aria-pressed={lang === "pl"}
          >
            PL
          </button>
          <span className="h-4 w-px bg-white" aria-hidden />
          <button
            type="button"
            className={langBtn("en")}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
