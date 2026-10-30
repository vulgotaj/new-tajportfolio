import { Brand } from "@/components/brand";
import { HeaderSettings } from "@/components/header-settings";
import { MobileNavigation } from "@/components/mobile-navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export function SiteHeader({ locale, copy, hasProjects, hasContact }: { locale: Locale; copy: Dictionary; hasProjects: boolean; hasContact: boolean }) {
  const items = [
    { href: "#intro", label: copy.navigation.home },
    ...(hasProjects ? [{ href: "#projects", label: copy.projects.navigation }] : []),
    { href: "#about", label: copy.about.title },
    { href: "#services", label: copy.services.navigation },
    ...(hasContact ? [{ href: "#contact", label: copy.contact.navigation }] : []),
  ];
  return (
    <header className="site-header">
      <a className="skip-link" href="#intro">{copy.navigation.skip}</a>
      <div className="header-container" data-enter="fade">
        <a href="#intro" aria-label={copy.navigation.home}><Brand /></a>
        <nav className="primary-navigation" aria-label={copy.navigation.label}>
          {items.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <HeaderSettings locale={locale} copy={{ language: copy.language, theme: copy.theme }} />
          <MobileNavigation copy={copy.navigation} items={items} />
        </div>
      </div>
    </header>
  );
}
