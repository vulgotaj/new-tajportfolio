import { locales, type Locale } from "../../i18n/locales.ts";

export type Localized = Record<Locale, string>;
export type Project = {
  id: string;
  title: string;
  order: number;
  published: boolean;
  featured: boolean;
  image: string;
  technologies: string[];
  category?: Localized | null;
  description?: Localized | null;
  imageAlt?: Localized | null;
  problem?: Localized | null;
  solution?: Localized | null;
  personalContribution?: Localized | null;
  repository?: string | null;
  demo?: string | null;
  demoStatus: "verified" | "unverified";
  developmentStatus?: "in-development";
};
export type ProjectCatalog = { projects: Project[] };

function object(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${path}: esperado objeto`);
  return value as Record<string, unknown>;
}

function text(value: unknown, path: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${path}: texto obrigatório ausente`);
}

function localized(value: unknown, path: string) {
  const entries = object(value, path);
  for (const locale of locales) text(entries[locale], `${path}.${locale}`);
}

export function validateTranslations(reference: unknown, translated: unknown, path = "translations") {
  const source = object(reference, path);
  const target = object(translated, path);
  for (const [key, value] of Object.entries(source)) {
    const field = `${path}.${key}`;
    if (typeof value === "string") {
      text(value, `${field} (pt)`);
      text(target[key], `${field} (en)`);
    } else validateTranslations(value, target[key], field);
  }
  for (const key of Object.keys(target)) {
    if (!(key in source)) throw new Error(`${path}.${key}: chave sem equivalente em português`);
  }
}

export function validateProjectCatalog(value: unknown): asserts value is ProjectCatalog {
  const catalog = object(value, "catalog");
  if (!Array.isArray(catalog.projects)) throw new Error("catalog.projects: esperado array");
  const ids = new Set<string>();
  for (const [index, entry] of catalog.projects.entries()) {
    const project = object(entry, `projects[${index}]`);
    const path = `projects.${String(project.id ?? index)}`;
    text(project.id, `${path}.id`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) throw new Error(`${path}.id: inválido ou duplicado`);
    ids.add(project.id);
    text(project.title, `${path}.title`);
    if (!Number.isInteger(project.order) || Number(project.order) < 0) throw new Error(`${path}.order: esperado inteiro não negativo`);
    for (const field of ["published", "featured"]) {
      if (typeof project[field] !== "boolean") throw new Error(`${path}.${field}: esperado booleano`);
    }
    if (!Array.isArray(project.technologies) || !project.technologies.length) throw new Error(`${path}.technologies: lista vazia`);
    project.technologies.forEach((technology, i) => text(technology, `${path}.technologies[${i}]`));
    text(project.image, `${path}.image`);
    if (/^[a-z]+:/i.test(project.image) || project.image.startsWith("//")) throw new Error(`${path}.image: esperado arquivo local`);
    if (project.published && !/^\/projects\/[a-z0-9/-]+\.(png|jpe?g|webp|avif)$/i.test(project.image)) throw new Error(`${path}.image: usar arquivo público em /projects/`);
    for (const field of ["category", "description", "imageAlt", "problem", "solution", "personalContribution"]) {
      if (project.published || project[field] != null) localized(project[field], `${path}.${field}`);
    }
    if (project.demoStatus !== "verified" && project.demoStatus !== "unverified") throw new Error(`${path}.demoStatus: inválido`);
    if (project.developmentStatus !== undefined && project.developmentStatus !== "in-development") throw new Error(`${path}.developmentStatus: inválido`);
    for (const field of ["repository", "demo"]) {
      if (project[field] == null) continue;
      text(project[field], `${path}.${field}`);
      let url: URL;
      try { url = new URL(project[field]); } catch { throw new Error(`${path}.${field}: URL inválida`); }
      if (url.protocol !== "https:" || url.username || url.password) throw new Error(`${path}.${field}: usar HTTPS sem credenciais`);
    }
  }
}
