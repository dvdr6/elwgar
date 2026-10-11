"use client";

import { useLanguage } from "@/lib/i18n";

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="uslugi" className="px-5 py-24 md:px-10 md:py-32">
      {/* section head */}
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            [ {t.services.label} ]
          </p>
          <h2 className="mt-3 text-5xl font-black uppercase tracking-tight md:text-7xl">
            {t.services.title}
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
          01 → 04
        </p>
      </div>

      {/* rows */}
      <ul className="border-t-2 border-black">
        {t.services.items.map((s) => (
          <li
            key={s.no}
            className="group grid gap-4 border-b border-black/20 py-8 transition-colors duration-300 hover:bg-black hover:text-white md:grid-cols-[80px_1fr_auto] md:items-center md:gap-8 md:py-10"
          >
            <span className="font-mono text-sm text-black/40 transition-colors group-hover:text-white/60 md:pl-2">
              /{s.no}
            </span>

            <div className="max-w-2xl">
              <h3 className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-2 leading-snug text-black/60 transition-colors group-hover:text-white/70 md:text-lg">
                {s.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:max-w-[220px] md:justify-end md:pr-2">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors group-hover:border-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
