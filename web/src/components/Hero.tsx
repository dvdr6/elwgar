"use client";

import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="start"
      className="relative flex min-h-screen min-h-svh flex-col justify-between overflow-hidden px-5 pt-24 md:px-10 md:pt-28"
    >
      {/* kicker */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
        <span className="inline-block h-3 w-3 bg-black" aria-hidden />
        <span>{t.hero.kicker}</span>
      </div>

      {/* headline + mark */}
      <div className="relative my-10 flex-1">
        <h1 className="max-w-[14ch] text-[clamp(2.25rem,10vw,10rem)] font-black uppercase leading-[0.92] tracking-tight">
          {t.hero.line1}
          <br />
          <span className="text-outline">{t.hero.line2}</span>
          <br />
          {t.hero.line3}
        </h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo.svg"
          alt=""
          aria-hidden
          className="absolute right-0 top-1/2 hidden w-[26vw] max-w-[340px] -translate-y-1/2 lg:block"
        />
      </div>

      {/* sub + CTA + meta */}
      <div className="flex flex-col gap-8 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="text-lg leading-snug text-black/70">{t.hero.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform hover:-translate-y-0.5"
            >
              {t.hero.cta1}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 border border-black px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black/60 md:flex-col md:items-end md:gap-1.5 md:flex-nowrap">
          {t.hero.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
          <li className="font-bold text-black">
            The Monochrome Company™
          </li>
        </ul>
      </div>
    </section>
  );
}
