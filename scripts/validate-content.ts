import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { validateProjectCatalog, validateTranslations } from "../src/content/projects/validate.ts";
import { services } from "../src/data/services.ts";
import { contacts } from "../src/data/contacts.ts";
import { validateContacts } from "../src/lib/contacts.ts";
import { resume } from "../src/data/resume.ts";
import { site } from "../src/data/site.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const readJson = (path: string): unknown => JSON.parse(readFileSync(resolve(root, path), "utf8").replace(/^\uFEFF/, ""));
validateTranslations(readJson("src/i18n/pt.json"), readJson("src/i18n/en.json"));
const catalogPath = resolve(root, "src/content/projects/catalog.json");
const catalog = readJson("src/content/projects/catalog.json");
validateProjectCatalog(catalog);
const { projects } = catalog;
for (const project of projects) {
  const image = project.image.startsWith("/")
    ? resolve(root, "public", project.image.slice(1))
    : resolve(dirname(catalogPath), project.image);
  const withinRoot = relative(root, image);
  if (withinRoot.startsWith("..") || isAbsolute(withinRoot) || !existsSync(image)) throw new Error(`projects.${project.id}.image: arquivo local ausente ou fora do repositório`);
  if (project.published && withinRoot.replaceAll("\\", "/").startsWith("docs/")) throw new Error(`projects.${project.id}.image: mover a mídia publicada para assets da aplicação`);
}
const serviceIds = new Set<string>();
for (const service of services) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.id) || serviceIds.has(service.id)) throw new Error(`services.${service.id}: identificador inválido ou duplicado`);
  serviceIds.add(service.id);
}
const serviceCopy = (locale: "pt" | "en") => Object.fromEntries(services.map((service) => [service.id, { title: service.title[locale], description: service.description[locale] }]));
validateTranslations(serviceCopy("pt"), serviceCopy("en"), "services");
validateContacts(contacts);
if (!/^\/cv\/[a-z0-9-]+\.pdf$/.test(resume.href)) throw new Error("resume.href: caminho de PDF inválido");
const resumeFile = readFileSync(resolve(root, "public", resume.href.slice(1)));
if (resumeFile.subarray(0, 5).toString() !== "%PDF-" || !resumeFile.subarray(-1024).includes("%%EOF")) throw new Error("resume.href: arquivo PDF inválido");
const origin = new URL(site.origin);
if (origin.protocol !== "https:" || origin.origin !== site.origin || origin.username || origin.password) throw new Error("site.origin: usar uma origem HTTPS sem caminho ou credenciais");
for (const asset of ["favicon.ico", "icon.svg", "apple-touch-icon.png", "og/pt.png", "og/en.png"]) {
  if (!existsSync(resolve(root, "public", asset))) throw new Error(`site: recurso de marca ausente: ${asset}`);
}
console.log(`Conteúdo válido: PT/EN, ${projects.length} projetos (${projects.filter((project) => project.published).length} publicados), ${services.length} serviços e ${contacts.length} contatos.`);
