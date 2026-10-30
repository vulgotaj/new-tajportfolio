"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary } from "@/i18n/dictionaries";
import { languageNames, type Locale } from "@/i18n/locales";

export function HeaderSettings({ locale, copy }: { locale: Locale; copy: Pick<Dictionary, "language" | "theme"> }) {
  const languagePanel = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && languagePanel.current && !languagePanel.current.contains(event.target)) {
        languagePanel.current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function closeOnEscape(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !(event.target instanceof Element)) return;
    const panel = event.target.closest("details");
    if (panel?.open) {
      panel.open = false;
      panel.querySelector("summary")?.focus();
    }
  }

  return (
    <div className="header-settings" onKeyDown={closeOnEscape}>
      <details ref={languagePanel} className="settings-disclosure">
        <summary role="button" className="settings-trigger" aria-label={`${locale.toUpperCase()} — ${copy.language}: ${languageNames[locale]}`}>
          <span aria-hidden="true">{locale.toUpperCase()}</span>
        </summary>
        <div className="settings-panel">
          <LanguageSwitcher locale={locale} label={copy.language} />
        </div>
      </details>
      <ThemeToggle labels={copy.theme} onToggle={() => {
        if (languagePanel.current) languagePanel.current.open = false;
      }} />
    </div>
  );
}
