import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { contacts } from "@/data/contacts";
import { validateContacts } from "@/lib/contacts";
import { profile } from "@/data/profile";
import { services } from "@/data/services";
import catalog from "@/content/projects/catalog.json";
import { getPublishedProjects } from "@/content/projects/read";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang);
  const projects = getPublishedProjects(catalog, lang);
  validateContacts(contacts);
  return (
    <>
      <SiteHeader locale={lang} copy={copy} hasProjects={projects.length > 0} hasContact={contacts.length > 0} />
      <main id="foundation">
        <div className="intro-shell">
          <Hero locale={lang} copy={copy.hero} hasProjects={projects.length > 0} />
        </div>
        <ProjectsSection projects={projects} copy={copy.projects} />
        <AboutSection biography={profile.biography[lang]} technologies={profile.technologies} copy={copy.about} />
        <ServicesSection services={services.map(({ id, icon, title, description }) => ({ id, icon, title: title[lang], description: description[lang] }))} copy={copy.services} />
        <ContactSection contacts={contacts} copy={copy.contact} />
      </main>
      <SiteFooter name={profile.name} copy={copy.footer} />
    </>
  );
}
