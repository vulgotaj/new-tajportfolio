export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const languageNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};
