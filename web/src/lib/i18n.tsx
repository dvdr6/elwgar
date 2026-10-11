"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pl" | "en";

/* ------------------------------------------------------------------ */
/* Dictionary — PL is the primary language                             */
/* ------------------------------------------------------------------ */

const dict = {
  pl: {
    meta: {
      title: "ELWGAR — Międzynarodowe Studio Wizualne",
      description:
        "ELWGAR to międzynarodowe studio wizualne. Identyfikacje wizualne i strony internetowe. Nasza marka: czerń + biel. Twoja: dowolna.",
    },
    nav: {
      services: "Usługi",
      portfolio: "Portfolio",
      studio: "Studio",
      contact: "Kontakt",
    },
    hero: {
      kicker: "Międzynarodowe studio wizualne",
      line1: "ROBIMY",
      line2: "MARKI",
      line3: "NIEPOWTARZALNE.",
      sub: "Identyfikacja wizualna i strony internetowe — z Gdańska dla całego świata. Monochromatyczna jest nasza marka; Twoją projektujemy dokładnie tak, jak jej potrzebujesz.",
      cta1: "Zobacz portfolio",
      cta2: "Napisz do nas",
      meta: ["EST. 2026", "GDAŃSK / ŚWIAT", "CZERŃ + BIEL"],
    },
    marquee: [
      "IDENTYFIKACJA WIZUALNA",
      "STRONY INTERNETOWE",
      "LOGO + BRANDBOOK",
      "SOCIAL MEDIA + DRUK",
      "ELWGAR VISUAL STUDIO",
    ],
    services: {
      label: "Usługi",
      title: "Co robimy",
      items: [
        {
          no: "01",
          title: "Identyfikacja wizualna",
          desc: "Kompletne systemy identyfikacji: znak, typografia, paleta kolorów, zasady. Marka spójna wszędzie — od awatara po billboard.",
          tags: ["Logo", "System wizualny", "Key visual"],
        },
        {
          no: "02",
          title: "Strony internetowe",
          desc: "Projektujemy i budujemy szybkie, nowoczesne strony — od landing page’ów po rozbudowane serwisy. Design i wdrożenie w jednym miejscu.",
          tags: ["Web design", "Next.js", "E-commerce"],
        },
        {
          no: "03",
          title: "Logo + brandbook",
          desc: "Znak, który wytrzyma lata, wraz z pełną instrukcją użycia. Dokładnie taki brandbook stosujemy sami — na tej właśnie stronie.",
          tags: ["Znak", "Księga znaku", "Materiały wzorcowe"],
        },
        {
          no: "04",
          title: "Social media + druk",
          desc: "Posty, stories, wizytówki, plakaty, opakowania. Wszystko, czym Twoja marka posługuje się na co dzień — jednym głosem i w Twoich kolorach.",
          tags: ["Social media", "Druk", "Prezentacje"],
        },
      ],
    },
    portfolio: {
      label: "Portfolio",
      title: "Wybrane projekty",
      note: "* Projekty poglądowe — pełne portfolio już wkrótce.",
      visit: "Zobacz projekt",
    },
    studio: {
      label: "Studio",
      title: "Nasza marka jest czarno-biała. Twoja może być dowolna.",
      p1: "ELWGAR to międzynarodowe studio wizualne. Nasza własna marka jest monochromatyczna z wyboru — to znak dyscypliny, a nie ograniczenie. Z klientami pracujemy inaczej: Ty mówisz, czego potrzebujesz, my to projektujemy.",
      p2: "Pracujemy z markami, które chcą być rozpoznawane, a nie tylko widziane. Pełny kolor, delikatny pastel albo surowa czerń — decyduje Twoja marka, nie nasza estetyka. Od pierwszego szkicu po ostatnią linijkę kodu.",
      stats: [
        { k: "04", v: "obszary specjalizacji" },
        { k: "02", v: "kolory własnej marki" },
        { k: "24h", v: "odpowiedź na brief" },
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Porozmawiajmy o Twojej marce.",
      sub: "Wyślij brief — odpowiadamy w ciągu 24 godzin. PL lub EN, jak wolisz.",
      name: "Imię i nazwisko",
      namePh: "Jan Kowalski",
      email: "Adres e-mail",
      emailPh: "jan@twojamarka.pl",
      message: "Wiadomość",
      messagePh: "Opowiedz nam o swoim projekcie…",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      success: "Wiadomość wysłana. Odezwiemy się w ciągu 24 godzin.",
      error: "Coś poszło nie tak. Spróbuj ponownie albo napisz bezpośrednio:",
      direct: "Wolisz napisać bezpośrednio?",
      emailAddr: "hello@elwgar.com",
    },
    footer: {
      tag: "Międzynarodowe studio wizualne. Nasza marka: czerń + biel.",
      nav: "Nawigacja",
      socials: "Media",
      rights: "Wszelkie prawa zastrzeżone.",
    },
    cookie: {
      title: "Ciasteczka",
      desc: "Używamy wyłącznie niezbędnych plików cookie. Za Twoją zgodą zapisujemy anonimowe statystyki odwiedzin (adres IP i język), które pomagają nam rozwijać tę stronę.",
      accept: "Zgadzam się",
      decline: "Tylko niezbędne",
    },
  },

  en: {
    meta: {
      title: "ELWGAR — International Visual Studio",
      description:
        "ELWGAR is an international visual studio. Visual identities and websites. Our brand: black + white. Yours: anything.",
    },
    nav: {
      services: "Services",
      portfolio: "Work",
      studio: "Studio",
      contact: "Contact",
    },
    hero: {
      kicker: "International visual studio",
      line1: "WE MAKE",
      line2: "BRANDS",
      line3: "UNMISTAKABLE.",
      sub: "Visual identities and websites — from Gdańsk to the world. Our brand is monochrome; yours gets exactly what it needs.",
      cta1: "See the work",
      cta2: "Get in touch",
      meta: ["EST. 2026", "GDAŃSK / WORLD", "BLACK + WHITE"],
    },
    marquee: [
      "VISUAL IDENTITY",
      "WEBSITES",
      "LOGO + BRANDBOOK",
      "SOCIAL + PRINT",
      "ELWGAR VISUAL STUDIO",
    ],
    services: {
      label: "Services",
      title: "What we do",
      items: [
        {
          no: "01",
          title: "Visual identity",
          desc: "Complete identity systems: mark, typography, colour palette, rules. A brand that stays consistent everywhere — from avatar to billboard.",
          tags: ["Logo", "Visual system", "Key visual"],
        },
        {
          no: "02",
          title: "Websites",
          desc: "We design and build fast, modern websites — from landing pages to full platforms. Design and development under one roof.",
          tags: ["Web design", "Next.js", "E-commerce"],
        },
        {
          no: "03",
          title: "Logo + brandbook",
          desc: "A mark built to last, delivered with its complete usage guide. The exact brandbook we follow ourselves — on this very site.",
          tags: ["Mark", "Logo guide", "Master files"],
        },
        {
          no: "04",
          title: "Social media + print",
          desc: "Posts, stories, business cards, posters, packaging. Everything your brand speaks with daily — one voice, in your colours.",
          tags: ["Social media", "Print", "Decks"],
        },
      ],
    },
    portfolio: {
      label: "Work",
      title: "Selected projects",
      note: "* Placeholder projects — full portfolio coming soon.",
      visit: "View project",
    },
    studio: {
      label: "Studio",
      title: "Our brand is black and white. Yours can be anything.",
      p1: "ELWGAR is an international visual studio. Our own brand is monochrome by choice — a mark of discipline, not a limit. With clients it works the other way around: you tell us what you need, we design it.",
      p2: "We work with brands that want to be recognised, not just noticed. Full colour, soft pastels or stark black — your brand decides, not our taste. From the first sketch to the last line of code.",
      stats: [
        { k: "04", v: "areas of practice" },
        { k: "02", v: "colours of our own brand" },
        { k: "24h", v: "brief response time" },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's talk about your brand.",
      sub: "Send us a brief — we reply within 24 hours. PL or EN, up to you.",
      name: "Full name",
      namePh: "John Smith",
      email: "Email address",
      emailPh: "john@yourbrand.com",
      message: "Message",
      messagePh: "Tell us about your project…",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. We'll get back within 24 hours.",
      error: "Something went wrong. Try again or write to us directly:",
      direct: "Prefer writing directly?",
      emailAddr: "hello@elwgar.com",
    },
    footer: {
      tag: "International visual studio. Our brand: black + white.",
      nav: "Navigate",
      socials: "Socials",
      rights: "All rights reserved.",
    },
    cookie: {
      title: "Cookies",
      desc: "We use strictly necessary cookies only. With your consent we store anonymous visit statistics (IP address and language) that help us improve this site.",
      accept: "Accept",
      decline: "Essential only",
    },
  },
} as const;

export type Dict = (typeof dict)["pl"];

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LangCtx>({
  lang: "pl",
  setLang: () => {},
  t: dict.pl,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pl");

  useEffect(() => {
    const saved = window.localStorage.getItem("elwgar-lang");
    if (saved === "pl" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("elwgar-lang", l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: dict[lang] as Dict }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
