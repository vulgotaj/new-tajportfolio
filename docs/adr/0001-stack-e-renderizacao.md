# ADR-001 — Stack e renderização

- Status: aceito.
- Data: 2026-10-24.
- Origem: escolha explícita do usuário por Next.js e Tailwind; TypeScript e fronteiras de renderização consolidados no contrato operacional.

## Contexto

O portfólio apresenta conteúdo público em dois idiomas, com design responsivo e interações pontuais. A arquitetura inicial considerou Astro; o usuário definiu Next.js e Tailwind. Precisamos manter essa escolha compatível com simplicidade e conteúdo pré-gerado.

## Decisão

Usar Next.js com App Router, TypeScript estrito e Tailwind CSS em uma única aplicação. Priorizar geração antecipada das páginas informativas e reservar Client Components para comportamentos que exigem interação ou APIs do navegador.

Usar tokens semânticos compartilhados para os temas, sem definir paleta ou biblioteca de animações neste ADR. A versão de cada ferramenta será fixada na fundação, sem assumir que versões futuras sejam automaticamente compatíveis.

## Alternativas consideradas

- **Astro:** adequado a conteúdo e interações localizadas; não foi a stack escolhida pelo usuário.
- **Aplicação React inteiramente no cliente:** possível, mas não oferece benefício identificado que justifique tornar a apresentação principal dependente de execução no navegador.
- **Renderização dinâmica de toda página:** desnecessária para conteúdo versionado que muda por publicação.
- **CSS nativo como abordagem principal:** substituído pela escolha explícita de Tailwind; propriedades customizadas continuam úteis para tokens.

## Consequências

- Conteúdo informativo pode permanecer separado do estado das interações; evitar marcar toda a árvore como cliente.
- Atualizar conteúdo local requer novo build/publicação.
- A existência de Server Components não prova que uma página foi pré-gerada: verificar o resultado do build.
- Revisão de 2026-10-25: o contato passou a usar links externos, conforme [ADR-005](0005-contato-por-links.md). Não há mais exigência de runtime para processar mensagens; avaliar a forma de publicação estática na fundação.

## Revisão

Reavaliar a estratégia de renderização se surgirem dados personalizados ou atualização em tempo real. Reavaliar a stack apenas diante de restrição concreta ou mudança de direção do usuário, não por preferência de um agente.

## Referências técnicas

- [Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- [Geração antecipada de rotas](https://nextjs.org/docs/app/api-reference/functions/generate-static-params).
- [Tokens no Tailwind](https://tailwindcss.com/docs/theme).
