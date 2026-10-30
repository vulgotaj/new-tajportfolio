import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeScript } from "@/components/theme-script";
import { Opening } from "@/components/opening";
import { OpeningScript } from "@/components/opening-script";
import { PageMotion } from "@/components/page-motion";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";
import { site } from "@/data/site";
import "../globals.css";

const jost = localFont({
  src: "../../assets/fonts/jost-latin-wght-normal.woff2",
  variable: "--font-jost",
  display: "swap",
  weight: "100 900",
  style: "normal",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).metadata;
  return {
    ...copy,
    metadataBase: new URL(site.origin),
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      ...copy, type: "website", siteName: site.name, url: `/${lang}`,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images: [{ url: `/og/${lang}.png`, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: { card: "summary_large_image", ...copy, images: [`/og/${lang}.png`] },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "16x16 32x32" }, { url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={jost.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <OpeningScript />
      </head>
      <body className="font-sans antialiased">
        <Opening />
        <PageMotion>{children}</PageMotion>
      </body>
    </html>
  );
}
