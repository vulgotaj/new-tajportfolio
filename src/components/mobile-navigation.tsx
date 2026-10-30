"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { BsList } from "react-icons/bs";
import type { Dictionary } from "@/i18n/dictionaries";

export function MobileNavigation({ copy, items }: {
  copy: Dictionary["navigation"]; items: readonly { href: string; label: string }[];
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function escape(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !menu.current?.open) return;
    menu.current.open = false;
    menu.current.querySelector("summary")?.focus();
  }

  return (
    <details ref={menu} className="settings-disclosure mobile-navigation" onKeyDown={escape}>
      <summary role="button" className="settings-trigger" aria-label={copy.menu}>
        <BsList size={20} aria-hidden="true" focusable="false" />
      </summary>
      <nav className="settings-panel flex flex-col gap-1" aria-label={copy.label}
        onClick={(event) => { if ((event.target as Element).closest("a") && menu.current) menu.current.open = false; }}>
        {items.map((item) => <a key={item.href} className="flex min-h-11 items-center px-3 py-2 text-sm" href={item.href}>{item.label}</a>)}
      </nav>
    </details>
  );
}
