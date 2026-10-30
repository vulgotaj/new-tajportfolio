import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateProjectCatalog, validateTranslations } from "../src/content/projects/validate.ts";
import { getPublishedProjects } from "../src/content/projects/read.ts";
import { contacts } from "../src/data/contacts.ts";
import { validateContacts } from "../src/lib/contacts.ts";

const catalog: unknown = JSON.parse(readFileSync(new URL("../src/content/projects/catalog.json", import.meta.url), "utf8").replace(/^\uFEFF/, ""));
validateProjectCatalog(catalog);

test("publica o catálogo real na ordem definida com contribuição confirmada", () => {
  assert.doesNotThrow(() => validateProjectCatalog(catalog));
  assert.deepEqual(catalog.projects.map((project) => project.id), ["devcontrole", "fast-motors", "today-movies", "pizzaup", "barberhub"]);
  assert.ok(catalog.projects.every((project) => project.published));
  assert.equal(getPublishedProjects(catalog, "pt")[0]?.personalContribution, "Desenvolvi a aplicação completa.");
  assert.equal(getPublishedProjects(catalog, "pt")[3]?.personalContribution, "Projeto de minha autoria integral.");
  assert.equal(getPublishedProjects(catalog, "pt")[4]?.personalContribution, "Desenvolvo o projeto com um amigo, atuando no frontend, backend e integrações.");
  assert.deepEqual(getPublishedProjects(catalog, "pt").map((project) => project.demo), [
    "https://dev-control-wheat.vercel.app/", "https://fastmotors.vercel.app/", "https://today-movies.vercel.app/",
    undefined, undefined,
  ]);
});

test("impede publicação acidental de projeto com conteúdo obrigatório pendente", () => {
  const edited = structuredClone(catalog);
  const project = edited.projects[0]!;
  project.published = true;
  project.problem = null;
  assert.throws(() => validateProjectCatalog(edited), /devcontrole.problem/);
  project.problem = { pt: "Problema", en: "Problem" };
  project.solution = { pt: "Solução", en: "Solution" };
  project.personalContribution = null;
  assert.throws(() => validateProjectCatalog(edited), /devcontrole.personalContribution/);
});

test("filtra rascunhos e ordena destaque, ordem e id sem alterar o catálogo", () => {
  const edited = structuredClone(catalog);
  edited.projects[0]!.order = 1;
  edited.projects[1]!.order = 1;
  edited.projects[2]!.featured = true;
  assert.deepEqual(getPublishedProjects(edited, "en").map((project) => project.id), ["today-movies", "devcontrole", "fast-motors", "pizzaup", "barberhub"]);
  edited.projects[0]!.published = false;
  edited.projects[0]!.personalContribution = null;
  assert.deepEqual(getPublishedProjects(edited, "pt").map((project) => project.id), ["today-movies", "fast-motors", "pizzaup", "barberhub"]);
  assert.equal(edited.projects[0]!.id, "devcontrole");
});

test("coleções vazias e unitárias são válidas; demonstração não verificada é omitida", () => {
  assert.deepEqual(getPublishedProjects({ projects: [] }, "pt"), []);
  const project = structuredClone(catalog.projects[0]!);
  project.demoStatus = "unverified";
  const projects = getPublishedProjects({ projects: [project] }, "en");
  assert.equal(projects.length, 1);
  assert.equal(projects[0]?.demo, undefined);
  assert.equal(projects[0]?.personalContribution, "I developed the complete application.");
  assert.ok(!("sourceThread" in projects[0]!) && !("published" in projects[0]!));
});

test("publicação rejeita mídia fora do diretório público e tradução incompleta", () => {
  const edited = structuredClone(catalog);
  edited.projects[0]!.image = "../../../docs/design/projects/devcontrole.png";
  assert.throws(() => validateProjectCatalog(edited), /devcontrole.image/);
  edited.projects[0]!.image = "/projects/devcontrole.png";
  edited.projects[0]!.personalContribution = { pt: "Desenvolvi a aplicação completa.", en: "" };
  assert.throws(() => validateProjectCatalog(edited), /devcontrole.personalContribution.en/);
});

test("rejeita protocolos executáveis e identificadores duplicados mesmo em rascunhos", () => {
  const edited = structuredClone(catalog);
  edited.projects[0]!.repository = "javascript:alert(1)";
  assert.throws(() => validateProjectCatalog(edited), /devcontrole.repository/);
  edited.projects[0]!.repository = catalog.projects[0]!.repository;
  edited.projects[1]!.id = edited.projects[0]!.id;
  assert.throws(() => validateProjectCatalog(edited), /id: inválido ou duplicado/);
});

test("identifica tradução obrigatória ausente ou vazia, sem fallback silencioso", () => {
  assert.throws(() => validateTranslations({ theme: { label: "Tema" } }, { theme: {} }), /theme.label/);
  assert.throws(() => validateTranslations({ theme: { label: "Tema" } }, { theme: { label: " " } }), /theme.label/);
});

test("estado de desenvolvimento é opcional, validado e independente da demo e publicação", () => {
  for (const locale of ["pt", "en"] as const) {
    const projects = getPublishedProjects(catalog, locale);
    assert.ok(projects.slice(0, 3).every((project) => project.developmentStatus === undefined));
    assert.deepEqual(projects.slice(3).map((project) => project.developmentStatus), ["in-development", "in-development"]);
    assert.ok(projects.slice(3).every((project) => project.repository && project.demo === undefined));
    assert.ok(projects.slice(3).every((project) => project.imageAlt && project.description && project.personalContribution));
  }
  const edited = structuredClone(catalog);
  const project = edited.projects[3]!;
  project.demo = "https://example.com/preview";
  project.demoStatus = "verified";
  assert.equal(getPublishedProjects(edited, "pt")[3]?.developmentStatus, "in-development");
  assert.equal(getPublishedProjects(edited, "pt")[3]?.demo, project.demo);
  project.published = false;
  project.personalContribution = null;
  assert.equal(getPublishedProjects(edited, "pt").some((entry) => entry.id === project.id), false);
  const invalid = { projects: [{ ...project, developmentStatus: "finished" }] };
  assert.throws(() => validateProjectCatalog(invalid), /pizzaup.developmentStatus/);
  invalid.projects[0]!.developmentStatus = "";
  assert.throws(() => validateProjectCatalog(invalid), /pizzaup.developmentStatus/);
});

test("contatos publicam somente os quatro destinos fornecidos, com WhatsApp internacional", () => {
  assert.doesNotThrow(() => validateContacts(contacts));
  assert.deepEqual(contacts, [
    { id: "linkedin", href: "https://www.linkedin.com/in/feltajima" },
    { id: "github", href: "https://github.com/vulgotaj" },
    { id: "email", href: "mailto:felipebtajima05@gmail.com" },
    { id: "whatsapp", href: "https://wa.me/5521982076692" },
  ]);
  assert.doesNotThrow(() => validateContacts([]));
});

test("contatos rejeitam domínio falso, protocolo executável, credenciais e duplicação", () => {
  for (const href of ["javascript:alert(1)", "http://github.com/vulgotaj", "https://github.com.evil.example/vulgotaj", "https://user:secret@github.com/vulgotaj", "https://github.com:444/vulgotaj", "https://github.com/vulgotaj?redirect=elsewhere"]) {
    assert.throws(() => validateContacts([{ id: "github", href }]), /contacts.github/);
  }
  assert.throws(() => validateContacts([contacts[0], contacts[0]]), /duplicado/);
  assert.throws(() => validateContacts([{ id: "unknown", href: "https://example.com" }]), /canal inválido/);
});

test("e-mail não aceita parâmetros ou injeção; WhatsApp exige número sem mensagem automática", () => {
  for (const href of ["mailto:person@example.com?subject=hello", "mailto:person@example.com%0d%0abcc:other@example.com", "mailto:person@example.com#fragment", "mailto:person@example.com\n"]) {
    assert.throws(() => validateContacts([{ id: "email", href }]), /contacts.email/);
  }
  for (const href of ["https://wa.me/21982076692?text=hello", "https://wa.me/+5521982076692", "https://wa.me/phone", "https://wa.me.evil.example/5521982076692"]) {
    assert.throws(() => validateContacts([{ id: "whatsapp", href }]), /contacts.whatsapp/);
  }
});
