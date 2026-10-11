"use client";

import { useLanguage } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

/* Monochrome placeholder tiles — each theme is pure CSS, no images needed. */
function TileArt({ project }: { project: Project }) {
  const letter = project.title.charAt(0);

  const letterEl = (cls: string) => (
    <span
      aria-hidden
      className={`tile-grow select-none font-black leading-none tracking-tighter ${cls}`}
    >
      {letter}
    </span>
  );

  switch (project.theme) {
    case "invert":
      return (
        <div className="flex h-full w-full items-center justify-center bg-black">
          {letterEl("text-[22vw] text-white md:text-[10rem]")}
        </div>
      );
    case "invert2":
      return (
        <div className="flex h-full w-full items-center justify-center bg-white">
          {letterEl("text-outline text-[22vw] text-black md:text-[10rem]")}
        </div>
      );
    case "stripes":
      return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0 18px, rgba(255,255,255,0.25) 18px 20px)",
            }}
          />
          {letterEl("text-[22vw] text-white md:text-[10rem]")}
        </div>
      );
    case "grid":
      return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.14) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {letterEl("text-[22vw] text-black md:text-[10rem]")}
        </div>
      );
    case "mark2":
      return (
        <div className="flex h-full w-full items-center justify-center bg-white">
          <div className="flex h-3/5 w-3/5 items-center justify-center border-2 border-black">
            {letterEl("text-[16vw] text-black md:text-[8rem]")}
          </div>
        </div>
      );
    case "mark":
    default:
      return (
        <div className="flex h-full w-full items-center justify-center bg-white">
          {letterEl("text-[22vw] text-black md:text-[10rem]")}
        </div>
      );
  }
}

export default function Portfolio({
  projects,
  fromSupabase,
}: {
  projects: Project[];
  fromSupabase: boolean;
}) {
  const { t, lang } = useLanguage();

  return (
    <section id="portfolio" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            [ {t.portfolio.label} ]
          </p>
          <h2 className="mt-3 text-5xl font-black uppercase tracking-tight md:text-7xl">
            {t.portfolio.title}
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
          {String(projects.length).padStart(2, "0")} ↗
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href ?? "#kontakt"}
              {...(p.href
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="tile group block border border-black/15 hover:border-black"
              aria-label={`${p.title} — ${lang === "pl" ? p.category_pl : p.category_en}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-black">
                {p.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.image_url}
                    alt={p.title}
                    loading="lazy"
                    className="tile-grow h-full w-full object-cover grayscale"
                  />
                ) : (
                  <TileArt project={p} />
                )}
              </div>
              <div className="flex items-center justify-between border-t border-black/15 px-4 py-3 group-hover:border-black">
                <div>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight">
                    {p.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-black/50">
                    {lang === "pl" ? p.category_pl : p.category_en} — {p.year}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {!fromSupabase && (
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-black/40">
          {t.portfolio.note}
        </p>
      )}
    </section>
  );
}
