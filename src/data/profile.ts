import type { Locale } from "@/i18n/locales";

// Source: docs/conteudo.md. Biography and technologies remain open to editorial refinement.
export const profile = {
  name: "Felipe Tajima",
  role: {
    pt: "Desenvolvedor Full-Stack",
    en: "Full-Stack Developer",
  } satisfies Record<Locale, string>,
  biography: {
    pt: [
      "Sou Felipe Tajima, desenvolvedor Full-Stack. Construo aplicações web completas, funcionais e responsivas com Next.js, TypeScript e Express.",
      "Uso IA para ganhar produtividade no desenvolvimento, com apoio à análise e à refatoração do código. Aplico conceitos de engenharia de software, como a separação de responsabilidades, para que cada parte do código tenha uma função clara. Reviso o que é gerado para identificar erros e entender como a solução funciona.",
    ],
    en: [
      "I'm Felipe Tajima, a Full-Stack Developer. I build complete, functional, responsive web applications with Next.js, TypeScript, and Express.",
      "I use AI to work more productively, with help analyzing and refactoring code. I apply software engineering principles such as separation of concerns so that each part of the code has a clear purpose. I review the generated code to identify errors and understand how the solution works.",
    ],
  } satisfies Record<Locale, string[]>,
  technologies: ["TypeScript", "Next.js", "React.js", "Node.js", "Express.js", "Tailwind CSS", "SASS", "Prisma ORM", "MongoDB", "Firebase"],
};
