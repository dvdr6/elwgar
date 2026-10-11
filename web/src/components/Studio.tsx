"use client";

import { useLanguage } from "@/lib/i18n";

export default function Studio() {
  const { t } = useLanguage();

  return (
    <section id="studio" className="border-y-2 border-black bg-black px-5 py-24 text-white md:px-10 md:py-32">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            [ {t.studio.label} ]
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
            {t.studio.title}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-snug text-white/70">
            {t.studio.p1}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-snug text-white/70">
            {t.studio.p2}
          </p>
        </div>

        {/* vertical white master logo — approved on black */}
        <div className="hidden shrink-0 lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo_vertical_white.svg"
            alt="ELWGAR"
            className="w-44"
          />
        </div>
      </div>

      <dl className="mt-16 grid gap-px border border-white/25 bg-white/25 sm:grid-cols-3">
        {t.studio.stats.map((s) => (
          <div key={s.k} className="bg-black p-6">
            <dt className="sr-only">{s.v}</dt>
            <dd className="font-mono text-4xl font-medium tracking-tight">
              {s.k}
            </dd>
            <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              {s.v}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
