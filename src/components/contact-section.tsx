import type { IconType } from "react-icons";
import { BsLinkedin, BsGithub, BsEnvelope, BsInstagram, BsWhatsapp } from "react-icons/bs";
import type { Contact, ContactChannel } from "@/lib/contacts";
import type { Dictionary } from "@/i18n/dictionaries";

const icons: Record<ContactChannel, IconType> = {
  linkedin: BsLinkedin,
  github: BsGithub,
  email: BsEnvelope,
  instagram: BsInstagram,
  whatsapp: BsWhatsapp,
};

export function ContactSection({ contacts, copy }: { contacts: readonly Contact[]; copy: Dictionary["contact"] }) {
  if (!contacts.length) return null;
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="section-container contact-layout">
        <div data-enter="rise">
          <h2 id="contact-title" className="section-title contact-title">{copy.title}</h2>
          <p className="section-description">{copy.description}</p>
        </div>
        <ul className="contact-links" aria-labelledby="contact-title" data-enter="rise">
          {contacts.map((contact) => {
            const email = contact.id === "email";
            const address = email ? contact.href.slice("mailto:".length) : undefined;
            const Icon = icons[contact.id];
            return (
              <li key={contact.id}>
                <a href={contact.href} target={email ? undefined : "_blank"} rel={email ? undefined : "noopener noreferrer"}
                  aria-label={email ? undefined : `${copy.channels[contact.id]} (${copy.newTab})`}>
                  <span className="contact-icon">
                    <Icon size={24} aria-hidden="true" focusable="false" />
                  </span>
                  <span className="contact-label">{copy.channels[contact.id]}</span>
                  {address && <span className="contact-address">{address.split("@")[0]}@<wbr />{address.split("@")[1]}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
