"use client";

import { useLanguage } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/settings";
import Wordmark from "@/components/Wordmark";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();

  const email = settings.contact_email || t.contact.emailAddr;
  const socials = [
    { name: "Instagram", href: settings.instagram_url },
    { name: "Behance", href: settings.behance_url },
    { name: "LinkedIn", href: settings.linkedin_url },
  ];

  return (
    <footer className="border-t-2 border-black bg-black text-white">
      <div className="grid gap-12 px-5 py-16 md:grid-cols-[1fr_auto_auto_auto] md:gap-20 md:px-10">
        {/* brand block */}
        <div className="max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo_3.svg" alt="ELWGAR Visual Studio" className="h-12" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
            The Monochrome Company™
          </p>
          <p className="mt-4 text-sm leading-snug text-white/60">{t.footer.tag}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            {t.footer.nav}
          </h3>
          <ul className="mt-4 space-y-2 text-sm font-bold uppercase tracking-[0.1em]">
            <li><a className="hover:opacity-60" href="#uslugi">{t.nav.services}</a></li>
            <li><a className="hover:opacity-60" href="#portfolio">{t.nav.portfolio}</a></li>
            <li><a className="hover:opacity-60" href="#studio">{t.nav.studio}</a></li>
            <li><a className="hover:opacity-60" href="#kontakt">{t.nav.contact}</a></li>
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            {t.footer.socials}
          </h3>
          <ul className="mt-4 space-y-2 text-sm font-bold uppercase tracking-[0.1em]">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  className="inline-flex items-center gap-1 hover:opacity-60"
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {s.name} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            {t.nav.contact}
          </h3>
          <a
            href={`mailto:${email}`}
            className="mt-4 block text-sm font-bold uppercase tracking-[0.1em] hover:opacity-60"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/20 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
        <span>
          © {new Date().getFullYear()} <Wordmark /> Visual Studio
        </span>
        <span>{t.footer.rights}</span>
        <span>PL / EN</span>
      </div>
    </footer>
  );
}
