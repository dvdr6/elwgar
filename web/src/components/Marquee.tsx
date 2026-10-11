"use client";

import { useLanguage } from "@/lib/i18n";
import Wordmark from "@/components/Wordmark";
import type { ReactNode } from "react";

function withTrademark(item: string): ReactNode {
  const idx = item.indexOf("ELWGAR");
  if (idx === -1) return item;
  return (
    <>
      {item.slice(0, idx)}
      <Wordmark />
      {item.slice(idx + "ELWGAR".length)}
    </>
  );
}

export default function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="overflow-hidden border-y-2 border-black bg-black py-4 text-white">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 text-2xl font-black uppercase tracking-tight md:text-4xl"
          >
            {withTrademark(item)}
            <span className="inline-block h-3 w-3 bg-white" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
