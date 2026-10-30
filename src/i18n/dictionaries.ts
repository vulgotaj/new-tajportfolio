import pt from "./pt.json";
import en from "./en.json";
import type { Locale } from "./locales";

export type Dictionary = typeof pt;
const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
