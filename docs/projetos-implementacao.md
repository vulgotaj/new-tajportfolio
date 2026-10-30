# Projetos — conteúdo aprovado e plano de implementação

Registro de 2026-10-30, consolidado a pedido do proprietário no chat “Definir conteúdo de projetos” (`01a17574-9570-7051-a11b-b549be260bdd`). O pedido posterior autorizou a implementação: os cinco projetos estão no catálogo da aplicação. Os registros da preparação documental abaixo preservam seu contexto histórico.

## Implementação — 2026-10-30

O proprietário confirmou neste chat que pizzaUP é integralmente seu e que desenvolve BarberHub com um amigo, tendo atuado no frontend, backend e integrações. Essas contribuições foram registradas em PT/EN, sem atribuir autoria integral do BarberHub. As pendências de contribuição descritas na preparação abaixo estão resolvidas.

Os dois itens estão publicados no catálogo local, nas posições 4 e 5, com `developmentStatus: "in-development"`, `demoStatus: "unverified"` e sem demo. Imagens aprovadas copiadas para `public/projects/` com SHA-256 idêntico aos originais. O slide mantém os três primeiros e exibe o estado traduzido somente nos dois novos, usando Jost, texto preto/branco e contorno neutro dos tokens existentes. Não foram acrescentadas dependências ou rotas.

A verificação desta implementação está em [projetos-desenvolvimento-verificacao.md](projetos-desenvolvimento-verificacao.md). As verificações históricas do fim deste documento se referem apenas à preparação documental.

## Decisões e estado de publicação

| Ordem | ID estável | Nome | Situação no portfólio | Estado de desenvolvimento informado |
| --- | --- | --- | --- | --- |
| 1 | `devcontrole` | DevControle | Já presente no catálogo publicado | Não adicionar rótulo novo. |
| 2 | `fast-motors` | Fast Motors | Já presente no catálogo publicado | Não adicionar rótulo novo. |
| 3 | `today-movies` | Today Movies | Já presente no catálogo publicado | Não adicionar rótulo novo. |
| 4 | `pizzaup` | pizzaUP | Incluído no catálogo publicado | Em desenvolvimento / In development |
| 5 | `barberhub` | BarberHub | Incluído no catálogo publicado | Em desenvolvimento / In development |

Manter os cinco na mesma seção e nessa ordem, sem separar os projetos em desenvolvimento em outra coleção. Nenhum destaque adicional foi solicitado. Preservar os IDs existentes e não marcar os três primeiros como “concluídos” por inferência.

O [catálogo da aplicação](../src/content/projects/catalog.json) é a fonte executável dos cinco projetos. Ele contém descrição, categoria, tecnologias, alt, problema, solução e contribuição em PT/EN. Preservar os textos e decisões posteriores registrados no [editorial](conteudo.md#projetos-definidos-em-outro-chat), incluindo a omissão de HTML/CSS básicos nas listas de apresentação. Não substituir esses ajustes por versões anteriores do chat ou pelo catálogo histórico dos mockups.

O proprietário confirmou em outro chat a contribuição completa nos três primeiros aplicativos. Na implementação, confirmou separadamente autoria integral no pizzaUP e desenvolvimento do BarberHub com um amigo, atuando no frontend, backend e integrações. BarberHub pertence à organização T-J-Labs; não atribuir autoria integral, trabalho para cliente, origem acadêmica ou resultados comerciais que não tenham sido informados.

## Imagens aprovadas

O proprietário forneceu e escolheu todas as imagens abaixo. Os originais editoriais estão preservados no repositório; a futura implementação não depende da pasta Downloads.

| Projeto | Arquivo fornecido | Original editorial | Destino na aplicação |
| --- | --- | --- | --- |
| DevControle | Workspace moderno com Dev Controle.png | [devcontrole.png](design/projects/devcontrole.png) | `public/projects/devcontrole.png` — existente |
| Fast Motors | Estação Fast Motors em Foco.png | [fast-motors.png](design/projects/fast-motors.png) | `public/projects/fast-motors.png` — existente |
| Today Movies | Noite de Cinema na Estação de Trabalho.png | [today-movies.png](design/projects/today-movies.png) | `public/projects/today-movies.png` — existente |
| pizzaUP | Painel pizzaUP em workspace cinematográfico.png | [pizzaup.png](design/projects/pizzaup.png) | `public/projects/pizzaup.png` — copiar na implementação |
| BarberHub | Painel BarberHub em Estúdio Moderno.png | [barberhub.png](design/projects/barberhub.png) | `public/projects/barberhub.png` — copiar na implementação |

As três imagens editoriais existentes coincidem por SHA-256 com os arquivos fornecidos. As duas novas cópias foram conferidas em 2026-10-30:

| Arquivo | Dimensões | SHA-256 |
| --- | --- | --- |
| `pizzaup.png` | 1672 × 941 | `B38A4A0D8064A296102B42C40B20C03CEA829D3F2DDC9709AC73C2DDCD74A235` |
| `barberhub.png` | 1536 × 1024 | `1938E53F0DEA8583FFB47D647206ACEB6B10913CFB0F0C9E37190F0B94D237F0` |

As imagens são apresentações visuais escolhidas pelo proprietário, não evidência de dados reais, disponibilidade da aplicação ou funcionamento de cada recurso mostrado. Preservar os originais. Aplicar os comportamentos de imagem já existentes na seção; não redesenhar os mockups nesta entrega.

## Conteúdo dos novos projetos

### pizzaUP

- ID: `pizzaup`; ordem: `4`.
- Nome: `pizzaUP`, preservando a capitalização.
- Status PT: **Em desenvolvimento**.
- Status EN: **In development**.
- Categoria PT: **Aplicação full stack · Gestão de pizzaria**.
- Categoria EN: **Full-stack application · Pizzeria management**.
- Repositório: <https://github.com/vulgotaj/pizzaUP>.
- Demonstração: não fornecida; omitir a ação.
- Imagem pública futura: `/projects/pizzaup.png`.

Descrição PT aprovada no chat:

> Sistema para gerenciar o cardápio e os pedidos de uma pizzaria. Reúne um painel administrativo para cadastrar produtos com imagens, organizar categorias e acompanhar pedidos, integrado a uma API com autenticação e controle de acesso por perfil.

Descrição EN:

> A system for managing a pizzeria’s menu and orders. It combines an admin dashboard for adding products with images, organizing categories, and tracking orders with an API featuring authentication and role-based access control.

Tecnologias para apresentação, na ordem registrada: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Node.js, Express, Prisma, PostgreSQL e Cloudinary. São tecnologias do projeto apresentado; não adicionar essas dependências ao portfólio.

Alt PT:

> Notebook exibindo o painel de produtos do pizzaUP, com fotos de pizzas em uma interface escura.

Alt EN:

> Laptop displaying the pizzaUP product dashboard, with pizza photos in a dark interface.

Estado observado no repositório: painel administrativo web, produtos com imagens, categorias, consulta e finalização de pedidos; API com cadastro/autenticação, papéis e operações de pedidos. O aplicativo para garçons faz parte da visão futura. Essas observações são de leitura do código e da documentação, sem execução dos fluxos.

O [README](https://github.com/vulgotaj/pizzaUP/blob/main/README.md) inclui o frontend atual. O [documento de contexto](https://github.com/vulgotaj/pizzaUP/blob/main/CONTEXTO_PROJETO.md) ainda contém trechos anteriores à implementação web e limitações conhecidas da API. Não apresentar o produto como completo ou o aplicativo mobile como entregue.

Proposta editorial para os campos internos exigidos pelo catálogo, derivada da descrição sem acrescentar funcionalidades:

- Problema PT: “Organizar o cardápio e o acompanhamento de pedidos de uma pizzaria.”
- Problema EN: “Organize a pizzeria’s menu and order tracking.”
- Solução PT: “Um painel administrativo integrado a uma API para gerenciar produtos, categorias e pedidos.”
- Solução EN: “An admin dashboard connected to an API for managing products, categories, and orders.”
- Contribuição pessoal confirmada na implementação: “Projeto de minha autoria integral.” / “This project is entirely my own work.”

### BarberHub

- ID: `barberhub`; ordem: `5`.
- Nome: `BarberHub`.
- Status PT: **Em desenvolvimento**.
- Status EN: **In development**.
- Categoria PT: **Plataforma SaaS · Gestão de barbearias**.
- Categoria EN: **SaaS platform · Barbershop management**.
- Repositório: <https://github.com/T-J-Labs/barberhub>.
- Demonstração: não fornecida; omitir a ação.
- Imagem pública futura: `/projects/barberhub.png`.

Descrição PT aprovada no chat:

> Plataforma em desenvolvimento para organizar a rotina de barbearias e facilitar o agendamento online. O frontend apresenta jornadas para clientes, barbeiros e administradores, com catálogo de estabelecimentos, agenda e painéis de gestão em modo demonstrativo.

Descrição EN:

> A platform in development to help barbershops manage daily operations and offer online booking. The frontend features demo journeys for customers, barbers, and administrators, including a barbershop directory, scheduling, and management dashboards.

Tecnologias para apresentação: Next.js, React, TypeScript, Tailwind CSS, Java, Spring Boot, Spring Security, Spring Data JPA e PostgreSQL. A stack do backend existe no repositório; a lista não significa que as jornadas do frontend já estejam integradas.

Alt PT:

> Notebook exibindo o painel demonstrativo do BarberHub, com indicadores de gestão e agenda de atendimentos em uma interface escura.

Alt EN:

> Laptop displaying the BarberHub demo dashboard, with management metrics and an appointment schedule in a dark interface.

Estado observado: interfaces e jornadas demonstrativas locais, com dados simulados, para clientes, barbeiros e administração; catálogo e perfis públicos, agenda e painéis. Integração operacional com o backend, autenticação real e reservas reais permanecem pendentes. A imagem também identifica dados demonstrativos; não apresentar os números como resultado de uma barbearia real.

O [README](https://github.com/T-J-Labs/barberhub/blob/main/README.md), o [roadmap de integração](https://github.com/T-J-Labs/barberhub/blob/main/docs/integration/ROADMAP.md) e o [contrato OpenAPI](https://github.com/T-J-Labs/barberhub/blob/main/docs/api/openapi.yaml) registram esses limites. A descrição refere-se ao estado consultado neste chat; revalidar antes da publicação caso o desenvolvimento avance. Este plano do portfólio não autoriza executar entregas no BarberHub.

Proposta editorial para os campos internos do catálogo:

- Problema PT: “Organizar a rotina das barbearias e facilitar o acesso ao agendamento online.”
- Problema EN: “Organize barbershop operations and make online booking easier to access.”
- Solução PT: “Interfaces demonstrativas para clientes, barbeiros e administradores, com catálogo, agenda e painéis de gestão.”
- Solução EN: “Demo interfaces for customers, barbers, and administrators, with a directory, scheduling, and management dashboards.”
- Contribuição pessoal confirmada na implementação: “Desenvolvo o projeto com um amigo, atuando no frontend, backend e integrações.” / “I am developing the project with a friend, working on the frontend, backend, and integrations.”

## Plano de implementação original — executado

1. Estender o modelo em `src/content/projects/validate.ts` com um estado de desenvolvimento. Proposta mínima: `developmentStatus?: "in-development"`. Ausência mantém os itens existentes sem rótulo; não criar automaticamente estados “concluído” ou “em produção”. Validar valores desconhecidos.
2. Propagar esse campo no leitor `src/content/projects/read.ts`, sem expor metadados internos. `published` continua sendo visibilidade editorial; `demoStatus` continua sendo verificação do link. Nenhum deles representa maturidade do projeto.
3. Adicionar em `src/i18n/pt.json` e `src/i18n/en.json` o rótulo de desenvolvimento, seguindo a fronteira tipada de traduções existente. Categoria, descrição, alt e campos editoriais permanecem nos dados dos projetos.
4. Renderizar o rótulo em `src/components/projects-section.tsx` quando presente. Ele deve ser textual, legível nos dois temas e perceptível sem depender apenas de cor. Preservar slide, previews e ações já aprovados; aplicar a skill `frontend-design` na implementação visual.
5. Copiar as duas imagens editoriais para os destinos públicos e conferir integridade. Manter o enquadramento coerente com os previews existentes e conferir as duas proporções, sem distorção.
6. Acrescentar os dados no catálogo com `order: 4/5`, `featured: false`, `developmentStatus: "in-development"`, sem demo e com `demoStatus: "unverified"`. A publicação precisa respeitar os campos obrigatórios atuais, conforme a pendência abaixo.
7. Ampliar testes de conteúdo e os cenários de projetos para os cinco itens, status localizado, ações realmente disponíveis e navegação até o quinto. Atualizar documentação de verificação somente com resultados executados.

Não alterar a arquitetura, instalar bibliotecas, criar páginas individuais, filtros, integrações, backend ou componentes de administração para este conteúdo. A seção continua usando o slide existente; requisitos completos em [F02](features/projetos.md) e [ADR-007](adr/0007-slide-nativo-de-projetos.md).

## Pendências editoriais e links da preparação original

- O catálogo atual exige `personalContribution.pt/en` para publicar. A contribuição nos dois novos projetos ainda precisa ser informada pelo proprietário. É possível preparar os itens como rascunhos (`published: false`) enquanto faltar essa informação; não publicar uma declaração inventada nem enfraquecer a validação para contornar a pendência.
- O contexto de curso, cliente ou desenvolvimento independente não foi informado neste chat. Não acrescentar esses rótulos. Para BarberHub, confirmar o escopo da participação antes de atribuir frontend, backend ou autoria completa ao proprietário.
- Não há URL de demonstração fornecida para pizzaUP ou BarberHub. Exibir apenas GitHub nesses itens, sem botão desabilitado ou placeholder público.
- As demos dos três primeiros foram verificadas em outro chat em 2026-10-26, conforme o [registro existente](projetos-verificacao.md#limites-e-pendências). A consulta inicial deste chat não as acessou pela ferramenta web; isso não invalida aquela evidência nem equivale a uma nova verificação. Preservar os URLs e revalidar antes de uma nova publicação quando aplicável.
- Os textos descrevem o estado dos repositórios consultados. Não há testes funcionais dos projetos externos realizados por esta documentação; não prometer reservas, autenticação, segurança multi-tenant ou fluxos completos sem evidência.

## Critérios de aceite para a futura implementação

- Cinco itens, na ordem definida, quando todos cumprirem os requisitos de publicação; até lá, rascunhos ficam fora da página pública.
- pizzaUP e BarberHub exibem “Em desenvolvimento” em `/pt` e “In development” em `/en`; os três primeiros mantêm a apresentação atual.
- O rótulo de desenvolvimento não depende de `published`, da presença de demo ou de `demoStatus`.
- Descrições, categorias, tecnologias, imagens e alts correspondem a este registro e ao catálogo vigente; nenhuma atribuição de autoria foi inventada.
- Os dois novos itens têm ação GitHub válida e não têm ação de demonstração. Os três primeiros mantêm as ações configuradas conforme a política vigente.
- Anterior/próximo, teclado, Home/End, toque/arrasto e extremos alcançam o quinto item; a troca de idioma preserva `#project-pizzaup` e `#project-barberhub`.
- Conferir PT/EN × claro/escuro × celular/tablet/desktop, além de foco visível, movimento reduzido, quebra das tecnologias longas e carregamento das imagens. Testes de links não devem autenticar ou enviar mensagens.
- Executar os scripts existentes de conteúdo, tipos, lint, testes, build e E2E de projetos. Registrar comandos, resultados e limites sem reaproveitar resultados históricos como evidência de código novo.

## Verificação desta atualização documental — 2026-10-30

- `npm run validate:content`: passou, com os três projetos publicados existentes, seis serviços e quatro contatos. Não valida os dois itens futuros, ainda documentados fora do catálogo.
- `npm run typecheck`: passou.
- `npm run lint`: passou sem avisos.
- `npm test`: dez testes passaram.
- `npm run build`: passou; `/pt` e `/en` pré-gerados.
- Conferidos os 96 links locais por caminho de arquivo nos cinco documentos atualizados; essa conferência não valida âncoras nem destinos externos. Sem espaços ao fim das linhas.
- Os cinco originais editoriais coincidem por SHA-256 com os anexos do proprietário; as duas novas cópias têm dimensões e hashes registrados acima.
- E2E, revisão visual, teclado e movimento reduzido não foram repetidos: esta entrega altera somente documentação e duas imagens editoriais fora da aplicação. A matriz visual e os comportamentos de cinco itens continuam como aceite futuro, sem declaração de verificação antecipada.

Os arquivos da aplicação continuam não rastreados no Git, como na inspeção inicial. Não houve staging, commit, alteração de dependências ou mudança intencional em código da aplicação. Artefatos gerados pelas verificações seguem as exclusões existentes do repositório.

## Retomada

Ler este documento, `AGENTS.md`, [estado atual](estado-atual.md), [F02](features/projetos.md), a [verificação da implementação](projetos-desenvolvimento-verificacao.md) e o catálogo vigente. Os cinco projetos já estão implementados. As contribuições foram confirmadas pelo proprietário e registradas no catálogo. Não há URL de demo fornecida para os dois novos.
