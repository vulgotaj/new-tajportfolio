import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.origin}/${locale}`,
    alternates: { languages: { "pt-BR": `${site.origin}/pt`, en: `${site.origin}/en` } },
  }));
}
