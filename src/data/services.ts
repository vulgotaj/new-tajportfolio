import type { Locale } from "@/i18n/locales";

export type ServiceIcon = "website" | "store" | "dashboard" | "landing" | "redesign" | "maintenance";
export type Service = {
  id: string;
  icon: ServiceIcon;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

// Source and order: docs/conteudo.md.
export const services: readonly Service[] = [
  {
    id: "business-websites", icon: "website",
    title: { pt: "Sites institucionais", en: "Business websites" },
    description: {
      pt: "Crio sites para apresentar sua empresa e seus serviços, seguindo a identidade do negócio. A navegação é clara e o conteúdo se adapta a diferentes telas.",
      en: "I build websites that present your business and services in keeping with your brand. Navigation is clear, and the content adapts to different screen sizes.",
    },
  },
  {
    id: "online-stores", icon: "store",
    title: { pt: "Lojas virtuais", en: "Online stores" },
    description: {
      pt: "Desenvolvo lojas virtuais para apresentar produtos e orientar a compra. Defino as funcionalidades e integrações de acordo com o que o negócio precisa.",
      en: "I develop online stores that present products and guide customers through their purchase. Features and integrations depend on what the business needs.",
    },
  },
  {
    id: "web-applications", icon: "dashboard",
    title: { pt: "Sistemas e dashboards", en: "Web applications and dashboards" },
    description: {
      pt: "Crio sistemas e dashboards para organizar informações e acompanhar atividades, com funcionalidades voltadas aos processos do dia a dia do negócio.",
      en: "I build web applications and dashboards to organize information and track activities, with features that support everyday business processes.",
    },
  },
  {
    id: "landing-pages", icon: "landing",
    title: { pt: "Landing pages", en: "Landing pages" },
    description: {
      pt: "Crio páginas para apresentar um produto, serviço ou campanha, com texto direto e uma ação principal para o visitante.",
      en: "I create pages that present a product, service, or campaign, with concise copy and one main action for visitors to take.",
    },
  },
  {
    id: "website-redesign", icon: "redesign",
    title: { pt: "Redesign e modernização", en: "Website redesign and modernization" },
    description: {
      pt: "Atualizo o visual de sites e ajusto a navegação e a adaptação a diferentes telas. Mantenho o que já funciona e reviso os pontos que dificultam o uso.",
      en: "I update how websites look, adjust navigation, and improve layouts across screen sizes. I keep what works and address the parts that are difficult to use.",
    },
  },
  {
    id: "website-maintenance", icon: "maintenance",
    title: { pt: "Manutenção e evolução", en: "Website maintenance and improvements" },
    description: {
      pt: "Faço ajustes, adiciono páginas e melhoro sites existentes. O escopo é combinado conforme a necessidade de cada projeto.",
      en: "I make adjustments, add pages, and improve existing websites. The scope is agreed on according to what each project needs.",
    },
  },
];
