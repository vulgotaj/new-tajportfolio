import type { Locale } from "../../i18n/locales.ts";
import { validateProjectCatalog, type Project, type Localized } from "./validate.ts";

export type PublishedProject = Project & {
  published: true;
  category: Localized;
  description: Localized;
  imageAlt: Localized;
  problem: Localized;
  solution: Localized;
  personalContribution: Localized;
};

export type PublicProject = {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  imageAlt: string;
  problem: string;
  solution: string;
  personalContribution: string;
  technologies: string[];
  repository?: string;
  demo?: string;
  developmentStatus?: Project["developmentStatus"];
};

export function getPublishedProjects(value: unknown, locale: Locale): PublicProject[] {
  validateProjectCatalog(value);
  // Validation above guarantees every localized field for published items.
  return value.projects.filter((project): project is PublishedProject => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.id.localeCompare(b.id, "en"))
    .map((project) => ({
      id: project.id,
      title: project.title,
      image: project.image,
      category: project.category[locale],
      description: project.description[locale],
      imageAlt: project.imageAlt[locale],
      problem: project.problem[locale],
      solution: project.solution[locale],
      personalContribution: project.personalContribution[locale],
      technologies: project.technologies,
      ...(project.developmentStatus ? { developmentStatus: project.developmentStatus } : {}),
      ...(project.repository ? { repository: project.repository } : {}),
      ...(project.demo && project.demoStatus === "verified" ? { demo: project.demo } : {}),
    }));
}
