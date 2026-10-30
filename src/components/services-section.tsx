import type { IconType } from "react-icons";
import { BsWindow, BsCart3, BsBarChartLine, BsFileEarmarkText, BsPencilSquare, BsTools } from "react-icons/bs";
import type { Service, ServiceIcon } from "@/data/services";
import type { Dictionary } from "@/i18n/dictionaries";

const icons: Record<ServiceIcon, IconType> = {
  website: BsWindow,
  store: BsCart3,
  dashboard: BsBarChartLine,
  landing: BsFileEarmarkText,
  redesign: BsPencilSquare,
  maintenance: BsTools,
};

export function ServicesSection({ services, copy }: {
  services: readonly (Pick<Service, "id" | "icon"> & { title: string; description: string })[];
  copy: Dictionary["services"];
}) {
  if (!services.length) return null;
  return (
    <section id="services" className="services-section" aria-labelledby="services-title" tabIndex={-1}>
      <div className="section-container">
        <h2 id="services-title" className="section-title" data-enter="rise">{copy.title}</h2>
        <p className="section-description">{copy.description}</p>
        <ul className="services-grid" aria-labelledby="services-title">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.id} className="service-entry" data-enter="rise">
                <article className="service-card" aria-labelledby={`service-${service.id}`}>
                  <Icon className="service-icon" size={44} aria-hidden="true" focusable="false" />
                  <h3 id={`service-${service.id}`}>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
