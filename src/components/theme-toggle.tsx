"use client";

import { useSyncExternalStore } from "react";
import { BsCircleHalf } from "react-icons/bs";
import type { Dictionary } from "@/i18n/dictionaries";
import { getEffectiveTheme, setThemePreference, subscribeToTheme } from "@/lib/theme";

export function ThemeToggle({ labels, onToggle }: { labels: Dictionary["theme"]; onToggle?: () => void }) {
  const theme = useSyncExternalStore(subscribeToTheme, getEffectiveTheme, () => "light" as const);
  const action = theme === "dark" ? labels.toLight : labels.toDark;
  return (
    <button type="button" className="settings-trigger theme-toggle" aria-label={action} title={action}
      onClick={() => {
        setThemePreference(getEffectiveTheme() === "dark" ? "light" : "dark");
        onToggle?.();
      }}>
      <BsCircleHalf size={20} aria-hidden="true" focusable="false" />
    </button>
  );
}
