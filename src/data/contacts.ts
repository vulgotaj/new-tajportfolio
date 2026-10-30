import type { Contact } from "../lib/contacts.ts";

// Authorized by the owner in this conversation. Brazil's +55 was inferred for DDD 21.
// Instagram stays absent until the owner supplies a profile.
export const contacts: readonly Contact[] = [
  { id: "linkedin", href: "https://www.linkedin.com/in/feltajima" },
  { id: "github", href: "https://github.com/vulgotaj" },
  { id: "email", href: "mailto:felipebtajima05@gmail.com" },
  { id: "whatsapp", href: "https://wa.me/5521982076692" },
];
