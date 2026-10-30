export type ContactChannel = "linkedin" | "github" | "email" | "instagram" | "whatsapp";
export type Contact = { id: ContactChannel; href: string };

const profileHosts = {
  linkedin: { hosts: ["linkedin.com", "www.linkedin.com"], path: /^\/in\/[a-z0-9_-]+\/?$/i },
  github: { hosts: ["github.com", "www.github.com"], path: /^\/[a-z0-9-]+\/?$/i },
  instagram: { hosts: ["instagram.com", "www.instagram.com"], path: /^\/[a-z0-9._]+\/?$/i },
};

export function validateContacts(value: unknown): asserts value is readonly Contact[] {
  if (!Array.isArray(value)) throw new Error("contacts: esperado array");
  const ids = new Set<string>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || !("id" in entry) || !("href" in entry)) throw new Error("contacts: canal sem identificador ou destino");
    const { id, href } = entry;
    if (typeof id !== "string" || !["linkedin", "github", "email", "instagram", "whatsapp"].includes(id) || ids.has(id)) throw new Error("contacts: canal inválido ou duplicado");
    ids.add(id);
    if (typeof href !== "string" || /[\u0000-\u0020\u007f]|%0[ad]/i.test(href)) throw new Error(`contacts.${id}: destino inválido`);
    if (id === "email") {
      if (!/^mailto:[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(href)) throw new Error("contacts.email: usar mailto com um endereço, sem parâmetros");
      continue;
    }
    let url: URL;
    try { url = new URL(href); } catch { throw new Error(`contacts.${id}: URL inválida`); }
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash) throw new Error(`contacts.${id}: usar HTTPS sem credenciais ou parâmetros`);
    if (id === "whatsapp") {
      if (url.hostname !== "wa.me" || !/^\/[1-9]\d{7,14}$/.test(url.pathname)) throw new Error("contacts.whatsapp: usar wa.me com número internacional, somente dígitos");
    } else {
      const profile = profileHosts[id as keyof typeof profileHosts];
      if (!profile.hosts.includes(url.hostname) || !profile.path.test(url.pathname)) throw new Error(`contacts.${id}: domínio ou perfil inválido`);
    }
  }
}
