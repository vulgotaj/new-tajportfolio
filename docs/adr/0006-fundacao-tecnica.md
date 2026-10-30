# ADR-006 — Ferramentas, fonte, conteúdo e tema da fundação

- Status: adotado na implementação da fundação, conforme o pedido de resolver escolhas rotineiras.
- Data: 2026-10-25.

## Contexto

A entrega atual prepara a aplicação executável e os controles, preservando os materiais de design/editorial. Não inclui as seções finais. ADRs 001, 002 e 005 continuam vigentes; a política de idiomas foi consolidada no ADR-003.

## Decisão

- Fixar Next.js 16.4.3, React/React DOM 19.3.1, TypeScript 5.9.3 e Tailwind/PostCSS 4.3.3, com lockfile npm. Usar Node 24 LTS, permitindo também 22.18+. A linha TypeScript 5.9 está dentro do intervalo suportado pelo typescript-eslint instalado. ESLint 9.39.5 e configuração Next 16.4.3 formam o conjunto compatível sem overrides de peers.
- ESLint 9 já chegou ao fim da manutenção; é uma limitação conhecida do conjunto. `eslint-plugin-react@7.37.5`, transitivo da configuração Next atual, declara suporte até ESLint 9. Não forçar ESLint 10 nem substituir a configuração recomendada por regras incompletas só para trocar a versão. Revisar quando os peers forem atualizados.
- Servir um único WOFF2 variável Jost normal Latin (100–900), distribuído por Fontsource 5.3.0, com licença OFL preservada. `next/font/local` cuida de preload, CSS e `display: swap`. Não depender de download de fontes no build.
- Usar JSON para o catálogo e dicionários, TypeScript para perfil e validação. O catálogo preserva os dados reais dos mockups como rascunhos, sem migração duplicada das mídias ainda não usadas. Validação de traduções e catálogo executa antes de todo build; testes Node cobrem publicação incompleta e destinos inseguros. Sem MDX, CMS ou biblioteca de schema para esses dados pequenos.
- Resolver tema com tokens CSS e script síncrono no head. A fundação usou rádio com três escolhas; por revisão explícita do proprietário, o header passou a alternar diretamente entre claro e escuro, sem seletor. O script aplica a preferência antes da hidratação; `useSyncExternalStore` mantém o controle coerente com o tema efetivo no DOM e eventos do sistema/armazenamento. Não usar context/provider de negócio. Armazenamento bloqueado permite escolha durante a página atual, sem prometer persistência.
- Manter `next build` e `next start` como fluxo local de produção. As duas páginas são pré-geradas e o redirect de raiz é de configuração, sem endpoint ou renderização dinâmica de conteúdo. Não escolher provedor de hospedagem nesta entrega. A exportação `output: export` não suporta o redirect do Next; um host estático precisa implementar a regra antes de habilitar essa saída. As logos e a fonte são estáticas; fotos e otimização de imagens serão avaliadas quando houver seções que as utilizem.
- Usar testes Node para regras editoriais e Playwright/Chromium como dependência de desenvolvimento para riscos de navegação e tema; não instalar biblioteca de animações.

## Alternativas

Google Fonts durante o build introduziria download externo desnecessário. Uma biblioteca de tema/i18n ou schema acrescentaria abstrações sem necessidade identificada. Renderizar toda a página como cliente impediria aproveitar a apresentação inicial estática. Exportar imediatamente exigiria escolher a configuração de hospedagem e substituir o redirect atual.

## Consequências e revisão

O build não depende de Google Fonts, CMS ou API editorial. Dados incompletos ficam fora da apresentação pública. Não declarar que o portfólio completo está pronto: as seções, destinos sociais, currículo e revisão de conteúdo permanecem pendentes. A escolha de hospedagem pode ajustar a saída do build e tornar os URLs de metadados absolutos.

Revisar versões em conjunto com seus peers; atualizar o linter quando o ecossistema declarar compatibilidade. Reavaliar o formato editorial se conteúdo rico ou edição fora do Git tornarem-se requisitos reais. Não expandir esta decisão para uma biblioteca de animações.

## Referências consultadas

Revisão na entrega seguinte (apresentação inicial): adotar import estático e `next/image` para a foto aprovada do hero, com preload e `sizes` que consideram a escala do recorte. Não criar pipeline próprio de imagens neste estágio. Os PNGs originais são preservados e partículas usam SVGs estáticos existentes. O otimizador padrão é oferecido pelo Next no fluxo atual de execução; publicação por exportação estática exigirá loader ou geração antecipada de variantes, além do redirect no host. Essa escolha não adiciona backend separado nem define provedor de hospedagem.

- [Instalação e requisitos do Next.js](https://nextjs.org/docs/app/getting-started/installation).
- [Tailwind com Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
- [Fonte local otimizada](https://nextjs.org/docs/app/api-reference/components/font#local-fonts).
- [Licença Jost](https://github.com/google/fonts/blob/main/ofl/jost/OFL.txt).
- [Exportação estática e limitações](https://nextjs.org/docs/app/guides/static-exports).
- [Ciclo de suporte do ESLint](https://eslint.org/version-support/).
- Peers e versões conferidos no registro npm e nos manifests instalados, sem `--force` ou `--legacy-peer-deps`.
