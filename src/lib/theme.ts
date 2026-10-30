export const themeStorageKey = "taj-theme";
export const themePreferences = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof themePreferences)[number];

export function isThemePreference(value: unknown): value is ThemePreference {
  return themePreferences.some((preference) => preference === value);
}

export function getThemePreference(): ThemePreference {
  const value = document.documentElement.dataset.themePreference;
  return isThemePreference(value) ? value : "system";
}

export function getEffectiveTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const dark = preference === "dark" || (preference === "system" && Boolean(window.matchMedia?.("(prefers-color-scheme: dark)").matches));
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.themePreference = preference;
}

export function setThemePreference(preference: ThemePreference) {
  applyTheme(preference);
  try {
    if (preference === "system") localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, preference);
  } catch {
    // Keep the in-page choice usable when storage is blocked.
  }
  window.dispatchEvent(new Event("taj-theme-change"));
}

export function subscribeToTheme(onChange: () => void) {
  const query = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (getThemePreference() === "system") applyTheme("system");
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    applyTheme(isThemePreference(event.newValue) ? event.newValue : "system");
    onChange();
  };
  query?.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("taj-theme-change", onChange);
  return () => {
    query?.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("taj-theme-change", onChange);
  };
}
