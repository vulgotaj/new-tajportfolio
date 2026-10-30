"use client";

import type { MouseEvent } from "react";
import { languageNames, locales, type Locale } from "@/i18n/locales";

function preserveLocation(event: MouseEvent<HTMLAnchorElement>, locale: Locale) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const destination = new URL(event.currentTarget.href);
  const segments = window.location.pathname.split("/");
  segments[1] = locale;
  destination.pathname = segments.join("/");
  destination.search = window.location.search;
  destination.hash = window.location.hash;
  // Native links still work without JavaScript; stable section ids carry across locales.
  event.currentTarget.href = destination.href;
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  return (
    <nav aria-label={label}>
      <div className="flex flex-col gap-1">
        {locales.map((language) => (
          <a key={language} href={`/${language}`} lang={language === "pt" ? "pt-BR" : "en"}
            hrefLang={language === "pt" ? "pt-BR" : "en"}
            aria-current={language === locale ? "page" : undefined}
            onClick={(event) => preserveLocation(event, language)}
            className="flex min-h-11 items-center px-3 py-2 text-sm font-medium aria-[current=page]:bg-accent aria-[current=page]:text-on-accent">
            {languageNames[language]}
          </a>
        ))}
      </div>
    </nav>
  );
}
