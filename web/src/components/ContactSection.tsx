"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection({ email }: { email: string }) {
  const { t, lang } = useLanguage();
  const displayEmail = email || t.contact.emailAddr;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border-b border-black/25 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-black/30 focus:border-black";
  const labelCls =
    "font-mono text-[11px] uppercase tracking-[0.25em] text-black/50";

  return (
    <section id="kontakt" className="px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        {/* left — pitch */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            [ {t.contact.label} ]
          </p>
          <h2 className="mt-3 text-[2.5rem] font-black uppercase leading-[0.98] tracking-tight md:max-w-[12ch] md:text-7xl">
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-snug text-black/60">
            {t.contact.sub}
          </p>

          <div className="mt-10">
            <p className={labelCls}>{t.contact.direct}</p>
            <a
              href={`mailto:${displayEmail}`}
              className="mt-2 inline-block text-2xl font-extrabold uppercase tracking-tight underline decoration-2 underline-offset-8 hover:opacity-60 md:text-3xl"
            >
              {displayEmail}
            </a>
          </div>
        </div>

        {/* right — form */}
        <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
          {/* honeypot — invisible to humans */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            maxLength={200}
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className={labelCls}>{t.contact.name}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={120}
              placeholder={t.contact.namePh}
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>{t.contact.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder={t.contact.emailPh}
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>{t.contact.message}</label>
            <textarea
              id="message"
              name="message"
              required
              minLength={3}
              maxLength={4000}
              rows={5}
              placeholder={t.contact.messagePh}
              className={`${inputCls} resize-none`}
            />
          </div>

          {status === "success" ? (
            <div className="border-2 border-black bg-black p-5 text-white" role="status">
              <p className="font-bold uppercase tracking-[0.1em]">
                ✓ {t.contact.success}
              </p>
            </div>
          ) : (
            <>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-3 bg-black px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-50 md:w-auto"
              >
                {status === "sending" ? t.contact.sending : t.contact.send}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {status === "error" && (
                <p className="font-mono text-xs uppercase tracking-[0.1em]" role="alert">
                  {t.contact.error}{" "}
                  <a href={`mailto:${displayEmail}`} className="underline">
                    {displayEmail}
                  </a>
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
