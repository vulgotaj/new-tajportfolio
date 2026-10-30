import { Brand } from "@/components/brand";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ name, copy }: { name: string; copy: Dictionary["footer"] }) {
  return (
    <footer className="site-footer">
      <div className="section-container footer-container" data-enter="fade">
        <a href="#intro" aria-label={copy.backToTop}><Brand decorative /></a>
        <p>{name}</p>
      </div>
    </footer>
  );
}
