# Estado atual e ponto de retomada

Atualizado em 2026-10-30 com os cinco projetos, o download do currículo e a preparação de pré-produção. Este é o ponto de entrada para retomar o trabalho sem depender do histórico do chat. Os detalhes continuam nos documentos vinculados; este resumo não substitui o [contrato operacional](../AGENTS.md), a [arquitetura](architecture.md) ou os [ADRs](adr/README.md). A [próxima retomada](#próxima-retomada) resume o estado aprovado; a [retomada anterior](#retomada-em-outro-chat) foi preservada como histórico.

## Documentação e higiene do repositório — atualização de 2026-10-30

O README foi reorganizado para apresentação no GitHub, com funcionalidades, stack, execução, scripts, manutenção de conteúdo e fluxo de deploy. Seus 21 links locais foram conferidos. A revisão dos arquivos rastreados identificou `next-env.d.ts`, gerado pelo Next.js: removido somente do índice e incluído no `.gitignore`, junto de `.vercel/`. Dependências, builds, resultados de testes, arquivos `.env` e cache do TypeScript já estavam ignorados. Estudos de design e mídias referenciadas pela documentação foram preservados.

Validação: tipos, lint, 11 testes Node e build com validação de conteúdo passaram. A suíte Chromium executou 172 cenários: 171 passaram na primeira execução; o cenário de abertura PT/claro/768 falhou ao consultar os paths antes da montagem do SVG e passou na repetição isolada com `--last-failed`. Essa instabilidade de sincronização do teste permanece registrada; não houve alteração no teste ou na animação. Outros navegadores e dispositivos físicos não foram verificados nesta revisão.

## Ícone da aba — atualização de 2026-10-30

A pedido do proprietário, o favicon passou da letra T para a logo completa preta. SVG e ICO usam o export aprovado sobre branco para manter contraste na aba escura, sem alterar traçados ou espaçamento. O SVG importado nos metadados recebe hash de conteúdo; o script de marca preserva essa escolha ao regenerar os arquivos. O ícone Apple e as imagens sociais permanecem como estavam.

Validação deste ajuste: tipos, lint, conteúdo, build, 11 testes Node e os três cenários Chromium de publicação passaram. Os HTMLs pré-gerados de PT/EN apontam ao SVG com hash, e os paths foram comparados com o export preto aprovado. O ICO de 32 px foi inspecionado visualmente. A suíte completa e os demais navegadores não foram repetidos nessa alteração restrita ao favicon.

## Pré-produção — atualização de 2026-10-30

Correções da auditoria autorizadas: origem `https://felipetajima.vercel.app`, metadados absolutos e localizados, favicon/ícone Apple/imagens sociais com a marca aprovada, sitemap/robots, nomes acessíveis de idioma/e-mail, CSP e demais cabeçalhos defensivos. Fotos pessoais usam qualidade 60 e AVIF/WebP, com sizes ajustados e originais intactos. O proprietário confirmou manter a abertura em 2,5 s; não encurtar por causa do resultado de laboratório.

Os rótulos curtos já presentes no código, “Baixar CV” / “Download CV (PT-BR)”, foram preservados; o teste de download foi sincronizado com eles.

Decisões no [ADR-011](adr/0011-preparacao-para-publicacao.md), processo em [publicação](publicacao.md) e resultados na [verificação](pre-producao-verificacao.md). O endereço ainda é usado pelo portfólio antigo; nenhum push/deploy ou troca de implantação foi realizado nesta etapa.

Tipos, lint, conteúdo, build e 11 testes Node passaram; 172 cenários Chromium distintos foram aprovados entre a execução completa (160) e a reexecução dos 12 afetados por uma expectativa antiga do texto do CV. Axe não apontou violações nas 12 variantes; Lighthouse passou de SEO 83 para 100 e desempenho mobile de 87 para 89–91 (última execução 91), com LCP de 3,2–3,4 s e CLS 0. O custo da abertura permanece conforme a escolha de 2,5 s. As métricas são locais, sem certificação de desempenho em campo.

O fechamento versiona o aplicativo e as correções na branch local `codex/pre-producao`, sem artefatos gerados ou segredos. A revisão e o commit local não substituem a validação do preview e a futura troca na Vercel.

## Currículo — atualização de 2026-10-30

O hero agora oferece “Baixar Currículo” / “Download Résumé (PT-BR)”, substituindo “Ver projetos”. O PDF em português fornecido pelo proprietário foi publicado sem edição em `public/cv/`, com caminho/idioma centralizados em `src/data/resume.ts`. Download por link HTML funciona sem JavaScript; a indicação de projetos com seta foi mantida. Versão inglesa ainda não fornecida e identificada explicitamente como PT-BR na página inglesa. Detalhes e hash em [F07](features/curriculo.md).

Validação desta entrega: tipos, lint, validação de conteúdo/PDF, build, 11 testes Node e 62 cenários Chromium de fundação, interações e projetos passaram. O download foi conferido por teclado nas 12 combinações PT/EN × claro/escuro × 360/768/1440 px e sem JavaScript, comparando os bytes recebidos com o arquivo publicado. Toque, foco/hover, movimento reduzido, acesso a projetos e ausência de transbordamento permanecem cobertos; as capturas dessa matriz foram inspecionadas. Suíte completa, Safari/Firefox e dispositivos físicos não foram executados nesta alteração.

## Imagens — atualização de 2026-10-30

A pedido do proprietário, fotos do hero/Sobre mim e previews dos projetos agora iniciam coloridos. Hover com mouse aplica preto e branco; ao sair, voltam às cores originais. No celular/toque, permanecem coloridos. Mantidos CSS compartilhado, transição de 350 ms e troca imediata com movimento reduzido, sem editar os arquivos das imagens. A [especificação das fotografias](design/photos/README.md#preto-e-branco-e-interação) registra o comportamento vigente; mockups e relatórios anteriores preservam o histórico do efeito inverso.

Validação: tipos, lint, conteúdo, build e 11 testes Node passaram. Dos 71 cenários Chromium de fundação, Sobre mim e projetos, 59 passaram inicialmente; os 12 restantes encontraram uma expectativa antiga da lista de tecnologias, anterior a esta alteração visual. A expectativa foi sincronizada com `src/data/profile.ts`, sem modificar conteúdo, e os 15 cenários de Sobre mim passaram na reexecução. Assim, os 71 cenários distintos foram aprovados entre as duas execuções; a suíte completa não foi repetida. Capturas e checagem adicional do filtro cobriram PT/EN × claro/escuro × 360/768/1440 px, com hover no desktop e toque em celular/tablet. Teclado e movimento reduzido foram cobertos pelos cenários existentes. Sem validação em dispositivos físicos, Safari ou Firefox.

## Conteúdo de projetos — atualização de 2026-10-30

O catálogo publica cinco projetos, nesta ordem: DevControle, Fast Motors, Today Movies, pizzaUP e BarberHub. Os dois últimos exibem “Em desenvolvimento” / “In development”, com imagens aprovadas, descrições, tecnologias e GitHub. O [registro de implementação](projetos-implementacao.md) preserva o conteúdo aprovado e o plano original; os resultados executados estão na [verificação](projetos-desenvolvimento-verificacao.md).

Os originais estão em `docs/design/projects/`, e as cópias públicas em `public/projects/` têm os mesmos hashes. O proprietário confirmou autoria integral no pizzaUP e desenvolvimento do BarberHub com um amigo, atuando no frontend, backend e integrações. Contribuições traduzidas registradas sem enfraquecer a validação. Não há URL de demonstração fornecida para esses dois; a interface apresenta somente GitHub. O estado de desenvolvimento é opcional e independente da visibilidade editorial e da verificação de demo.

Validação desta inclusão: conteúdo, tipos, lint, build e 11 testes Node passaram; 19 cenários de projetos passaram, com inspeção visual em PT/EN × claro/escuro × 360/768/1440 px. A suíte completa teve 168 de 169 cenários aprovados: uma comparação exata de posição no teste existente de pausa das partículas oscilou cerca de 0,00001 px e passou nas três repetições isoladas. Detalhes e limites na [verificação atual](projetos-desenvolvimento-verificacao.md).

## Entregas realizadas

| Área | Estado implementado | Referência |
| --- | --- | --- |
| Fundação | Next.js App Router, TypeScript estrito, Tailwind, scripts de desenvolvimento/tipos/lint/conteúdo/testes/build e páginas pré-geradas. Jost variável local com licença OFL. | [ADR-006](adr/0006-fundacao-tecnica.md), [verificação](fundacao-verificacao.md) |
| Idiomas e temas | `/pt` e `/en`, português padrão, traduções tipadas e metadados localizados. Tema inicial do sistema, escolha manual persistida e aplicação antes da hidratação. | [Idiomas](features/idiomas.md), [temas](features/temas.md) |
| Header e hero | Navegação responsiva, idioma em painel compacto e tema por alternância direta. Hero de entrada com nome/função, foto do costão v2 e campo contínuo de partículas animadas, com pausa e versão estática acessível. | [Apresentação](features/apresentacao-e-navegacao.md), [verificação](apresentacao-verificacao.md) |
| Projetos | Cinco itens; pizzaUP e BarberHub com estado de desenvolvimento traduzido e GitHub. Os três anteriores preservam suas demos. Slide nativo com botões, teclado, toque, arrasto e restauração da posição. | [ADR-007](adr/0007-slide-nativo-de-projetos.md), [verificação atual](projetos-desenvolvimento-verificacao.md), [histórico](projetos-verificacao.md) |
| Sobre mim | Biografia PT/EN, dez tecnologias pessoais e foto da floresta v2. Conteúdo separado da apresentação. | [Editorial](conteudo.md), [verificação](sobre-verificacao.md) |
| Serviços | Seis ofertas em cards, uma/duas/três colunas, com ícones, título e descrição. | [Feature](features/sobre-mim-e-servicos.md), [verificação](servicos-verificacao.md) |
| Contato e rodapé | LinkedIn, GitHub, e-mail e WhatsApp autorizados. Rodapé com logo e nome na mesma linha, além de retorno ao início. | [Feature](features/contato.md), [verificação](contato-verificacao.md) |
| Ícones e feedback | React Icons/Bootstrap com licenças preservadas. Hovers de maior contraste, foco visível, resposta ao toque e movimento reduzido. | [Tokens](design/tokens.md#estados-de-interação), [movimento](design/motion.md#refino-de-hover-implementado) |
| Abertura | `</>` → expansão → `<TAJ/>` → página, com SVG mestre e Motion; 2,5 s, uma vez por sessão da aba, omissão com movimento reduzido e liberação independente em até 3 s. | [F08](features/abertura.md), [ADR-009](adr/0009-abertura-por-sessao.md), [verificação](abertura-verificacao.md) |
| Movimento das seções | Aprovado pelo proprietário: entrada de baixo para cima, opacidade 0 → 1 em 900 ms, sem zoom ou recorte. Hero coordenado com a abertura e cards observados separadamente, inclusive pelo menu. | [ADR-010](adr/0010-movimento-das-secoes.md), [verificação](movimento-verificacao.md) |

## Refinamentos confirmados pelo proprietário

- Em 2026-10-26, o proprietário aprovou o resultado final das entradas: começar transparente, subir suavemente e chegar totalmente visível, sem zoom. Manter 900 ms nas seções, até 24 px de deslocamento e execução uma vez por montagem. O hero usa até 750 ms/16 px durante a saída da abertura; header e rodapé usam opacidade. A abertura permanece em 2,5 s, uma vez por sessão da aba, com limite independente de 3 s.
- Tema alterna diretamente no botão, sem seletor. Idioma usa uma lista compacta e mantém query/âncora e tema ao trocar de rota.
- O proprietário desenvolveu os três aplicativos completos; essa contribuição foi registrada no catálogo, sem inventar contexto profissional, de curso ou colaboração. As demonstrações foram verificadas em 2026-10-26.
- Projetos não têm a área “Sobre o projeto”. GitHub usa ícone e botão com contorno; a demonstração usa ação preenchida. A barra de rolagem visual foi ocultada, mantendo os controles e a rolagem nativa.
- Serviços se chama somente “Serviços” / “Services”. Os links “Conversar” foram removidos dos cards.
- O nome do hero fica centralizado no celular. Sua indicação de projetos inclui a seta inteira mesmo nas alturas menores verificadas.
- Projetos ficam centralizados nas paradas de celular/tablet, incluindo os extremos, botões, teclado, resize, recarga e troca de idioma. Desktop mantém mais de um projeto visível.
- Contatos usam duas colunas equilibradas, com ícones e textos centralizados; os ícones são maiores e os rótulos menores no celular.
- Hover dos contatos depende do ícone ou dos textos visíveis do item. Os espaços vazios da coluna não ativam o destaque; o foco por teclado continua disponível.
- Partículas do hero receberam raios cerca de 70% maiores. Após novo pedido de contraste, as opacidades passaram a 54–76% no claro (cinza escuro próximo do preto) e 18–33% no escuro; saudação e indicação de projetos usam um token de texto próprio para preservar leitura. Mantidos os 209 pontos por tema, posições, movimento e controles. Valores em [tokens](design/tokens.md).
- Logo e nome do rodapé ficam na mesma linha; com texto ampliado, o nome pode quebrar no próprio espaço sem sobrepor a marca.
- Fotos pessoais e previews começam coloridos e ficam em preto e branco somente em hover compatível; no celular e no toque permanecem coloridos. Revisão aprovada em 2026-10-30; transição de 350 ms, imediata com movimento reduzido. Arquivos originais, traçados e espaçamento da marca permanecem preservados.

## Onde alterar cada responsabilidade

| Necessidade | Origem |
| --- | --- |
| Composição e metadados | `src/app/[lang]/page.tsx` e `layout.tsx` |
| Apresentação/interações | `src/components/`; manter interações como fronteiras locais de cliente |
| Tokens, responsividade e estados visuais | `src/app/globals.css` |
| Perfil, biografia e tecnologias | `src/data/profile.ts`, derivados do [editorial](conteudo.md) |
| Serviços e contatos | `src/data/services.ts`, `src/data/contacts.ts`; validação em `src/lib/contacts.ts` |
| Catálogo de projetos | `src/content/projects/catalog.json`, leitura e validação no mesmo diretório |
| Traduções | `src/i18n/pt.json`, `en.json` e fronteiras tipadas |
| Movimento das partículas | `src/components/hero-particles.tsx`, com Motion mini e SVGs em `public/decoration/`; [ADR-008](adr/0008-motion-e-particulas.md) |
| Abertura e marca | `src/components/opening*.tsx` e `public/brand/taj-wordmark.svg`; [ADR-009](adr/0009-abertura-por-sessao.md) |
| Entradas das seções | `src/components/page-motion.tsx`, atributos `data-enter` e tokens `--entrance-*` no CSS; [ADR-010](adr/0010-movimento-das-secoes.md) |
| Referências finais | [Mockups](design/photos/mockups/README.md); são estudos históricos, com revisões posteriores descritas acima |

Versões e comandos executáveis estão no [README](../README.md) e no manifesto/lockfile. Não reproduzir versões aqui nem tratar PNGs de estudo como capturas atuais da aplicação.

## Evidência de validação disponível

Após o pedido explícito de aparecer de baixo para cima e começar transparente, as entradas passaram a opacidade 0 → 1 com deslocamento vertical, sem zoom, mantendo 900 ms e abertura em 2,5 s. Tipos, lint, validação de conteúdo, dez testes Node, build e os 22 cenários de movimento passaram, incluindo o novo cenário de transparência inicial, subida e vários frames intermediários. A suíte completa, agora com 168 cenários, não foi repetida nesse ajuste.

No refino solicitado após entradas pouco perceptíveis, tipos, lint, validação de conteúdo, dez testes Node, build e a suíte completa de 167 testes Chromium passaram. As entradas passaram a 900 ms, sem recorte, com preparação fora da tela e serviços por card. Os 21 cenários de movimento incluem menu → serviços → último card, rolagem gradual sem salto/queda de opacidade e retorno à aba. O caminho pelo menu também foi conferido na prévia estreita do aplicativo. A abertura foi preservada em 2,5 s; detalhes em [verificação do movimento](movimento-verificacao.md).

Na entrega das entradas das seções, tipos, lint, validação de conteúdo, build, dez testes Node e a suíte completa de 164 testes Chromium passaram. Os 18 cenários novos exigem movimento entre frames, execução única, preservação de layout, navegação/foco, movimento reduzido e falhas na matriz PT/EN × claro/escuro × 360/768/1440 px. A normalização do token CSS de ms para s foi detectada, corrigida e validada novamente. A prévia de desenvolvimento também mostrou interpolação de 600 ms e restauração dos estilos, sem erros de página; detalhes em [verificação do movimento](movimento-verificacao.md).

No ajuste solicitado para 2,5 segundos, tipos, lint, validação de conteúdo, build, dez testes Node e os 23 cenários Chromium da abertura passaram novamente. Todas as fases receberam o mesmo fator de tempo, mantendo o ritmo; o limite independente passou a 3 segundos. A suíte completa de 146 cenários não foi repetida nesse ajuste restrito.

Na entrega da abertura, tipos, lint, validação de conteúdo, build, dez testes Node e a suíte completa de 146 testes Chromium passaram. Os 23 cenários novos verificam sequência em frames reais, duração, sessão da aba, matriz PT/EN × claro/escuro × 360/768/1440 px, foco, âncoras e falhas. Os testes existentes de teclado/toque agora aguardam a liberação da abertura. A prévia de desenvolvimento IPv4 também completou a sequência sem erros de página. Alcance e limitações em [verificação da abertura](abertura-verificacao.md).

Antes da animação, em 2026-10-26, a revisão de hover passou por tipos, lint, build, dez testes Node e a suíte completa de 108 testes Chromium. Após restringir a área de hover dos contatos, os mesmos scripts e os 21 cenários de contato/interações foram reexecutados com sucesso, sem repetir as demais seções naquele ajuste localizado.

Na entrega das partículas, tipos, lint, build, dez testes Node e a suíte completa de 123 testes Chromium passaram. Os 15 cenários novos cobrem movimento real das camadas, geometria dos SVGs, pausa/retomada por teclado, visibilidade da área, preferência reduzida alterada durante a visita, troca de tema e ausência de JavaScript. A regressão de ausência de `matchMedia` foi detectada, corrigida e validada novamente na execução completa. `/pt` e `/en` também responderam 200 no servidor de desenvolvimento em `localhost:3000`, com três camadas em movimento e sem erros na página.

No refino posterior de tamanho/visibilidade dos pontos, tipos, lint, build, dez testes Node e os 15 cenários Chromium das partículas passaram novamente, com comparação visual de antes/depois e a matriz PT/EN × claro/escuro × celular/tablet/desktop. As demais seções não foram reexecutadas nesse ajuste restrito aos SVGs.

No pedido seguinte de mais opacidade e cinza escuro no tema claro, tipos, lint, build, dez testes Node e 21 testes Chromium de partículas/interações passaram. A leitura do hero recebeu um token secundário próprio e contorno de sombra nos caracteres; as ações têm superfície do tema. A matriz dos dois idiomas/temas/três larguras foi conferida novamente, sem repetir as demais seções.

A cobertura inclui PT/EN, claro/escuro, 360/768/1440 px, teclado, preferência do sistema, tema persistido, movimento reduzido, slide e navegação por fragmento. Também há cenários sem JavaScript, armazenamento indisponível e texto ampliado; ver o alcance exato nos relatórios por etapa. Testes de contato verificam destinos e nomes sem abrir conversas nem enviar mensagens.

Não há validação em Safari, Firefox, leitores de tela ou dispositivos físicos. A suíte atual tem dez testes Node e 168 de navegador; os 22 das entradas, os 23 da abertura, os 15 das partículas e os 21 de contato/interações são subconjuntos da suíte de navegador, não totais adicionais. A última execução completa cobriu 167 cenários antes da adição do caso de entrada transparente; a execução específica posterior cobriu os 22 de movimento. A visibilidade da aba foi exercitada por evento simulado em headless. Capturas/traces são artefatos ignorados em `test-results/`.

Na consolidação documental anterior, links locais foram conferidos e tipos, lint, os dez testes Node e build foram reexecutados com sucesso, sem alterar a aplicação ou repetir o navegador. A entrega das partículas é posterior e tem a validação completa descrita acima.

## Próxima etapa e pendências

O proprietário escolheu Motion para a abertura e solicitou movimento contínuo no hero. `motion@14.6.0` foi instalado com versão fixa, peers compatíveis e licenças preservadas; `motion/react-mini` controla três camadas de partículas, com pausa por botão, pausa fora do hero ou com a aba inativa e versão estática para movimento reduzido/sem JavaScript. Decisão no [ADR-008](adr/0008-motion-e-particulas.md). A abertura usa a mesma dependência, com a sequência de `motion/react`, conforme [ADR-009](adr/0009-abertura-por-sessao.md).

Após a prévia continuar mostrando partículas claras, a inspeção da própria aba confirmou a diferença: `localhost:3000` estava apontando para outra instância e `127.0.0.1:3000` para este repositório. A prévia foi restaurada no endereço IPv4 explícito, agora usado por `npm run dev`. SVGs passaram a imports estáticos com hash para atualizar o recurso quando seu conteúdo muda, e os testes verificam pixels escuros renderizados, além da geometria. A geração automática de regras do Next foi desativada para preservar o `AGENTS.md` do proprietário.

Essa correção passou por tipos, lint, build, dez testes Node e 15 testes Chromium das partículas. A aparência foi confirmada também no navegador da aplicação, no endereço IPv4 explícito, e a prévia correta foi deixada aberta no tema claro. As outras instâncias locais foram preservadas; não houve novo ajuste de opacidade nem implementação da abertura.

A abertura foi implementada com a sequência `</>` → expansão → `<TAJ/>` → página, paths aprovados e cores do tema. Após a implementação inicial, o proprietário ampliou a duração para 2,5 s, com limite de segurança de 3 s, mantendo uma vez por sessão da aba. Movimento reduzido, sessão indisponível e hidratação tardia omitem a sequência; âncoras e foco são preservados. [F08](features/abertura.md) contém os critérios e [ADR-009](adr/0009-abertura-por-sessao.md) explica a liberação independente. A abertura não depende das imagens nem adiciona uma segunda entrada do hero.

Hover CSS, slide nativo, partículas e seções existentes foram preservados na entrega da abertura.

Antes da revisão editorial, o proprietário solicitou as animações do restante da página e aprovou o resultado final nesta conversa. As entradas usam Motion mini, começam transparentes fora da tela e revelam o conteúdo com subida suave, sem substituir hovers/rolagem. Foco, movimento reduzido e falhas liberam a apresentação estática. A próxima etapa prevista é revisar os textos e contatos em PT/EN, mediante novo pedido; detalhes em [movimento](design/motion.md) e [verificação](movimento-verificacao.md).

Currículo em português disponível no hero desde 2026-10-30, com identificação PT-BR na página inglesa. Instagram ainda não existe e fica omitido. O endereço `https://felipetajima.vercel.app` foi autorizado para a futura publicação na Vercel; a troca do portfólio antigo ainda não foi executada. Revisão final nos demais navegadores e revisão editorial da lista de tecnologias continuam pendentes. Firebase é apenas uma tecnologia pessoal listada. A compatibilidade dos plugins de ESLint 9 precisa ser acompanhada antes de uma atualização para a linha 10, conforme ADR-006.

## Próxima retomada

- Ler este documento e o contrato operacional antes de alterar o projeto. As animações foram aprovadas; preservar o ritmo e os efeitos descritos em [movimento](design/motion.md), sem reabrir a escolha da biblioteca ou recriar a marca.
- Usar a prévia IPv4 [127.0.0.1:3000/pt](http://127.0.0.1:3000/pt), com alternativa `/en`. A abertura não se repete na sessão da aba; entradas de seções não se repetem na mesma montagem. Para rever a rolagem, voltar ao início e recarregar. Conteúdo já visível/restaurado permanece estático para evitar saltos.
- Preservar seções, textos, imagens, contatos, slide nativo, hovers e partículas. O catálogo público contém os cinco projetos; o [registro dos projetos](projetos-implementacao.md) documenta conteúdo aprovado, contribuições confirmadas e implementação.
- Última validação de código: tipos, lint, conteúdo, dez testes Node, build e 22 testes Chromium de movimento passaram. O total atual é 168 testes de navegador; a última execução completa passou com 167, antes da adição do cenário de entrada transparente. Não apresentar a suíte atual inteira como reexecutada.
- pizzaUP e BarberHub já estão no slide, com estado traduzido e contribuições confirmadas; preservar a ordem e a ausência de demos nesses dois. A revisão editorial geral em PT/EN, validação em Safari/Firefox, leitores de tela e dispositivos físicos e validação no host antes da troca do portfólio antigo continuam pendentes. Currículo em português já está publicado no hero; versão inglesa e Instagram seguem pendentes.

Na atualização de progresso de 2026-10-26, somente a documentação foi alterada e os scripts não foram repetidos. A atualização de 2026-10-30 acrescenta documentação editorial e duas imagens de referência, sem mudar código da aplicação; suas verificações estão registradas no plano de projetos.

## Estado do repositório

Na consolidação, os arquivos da aplicação e de `docs/` aparecem como não rastreados no Git. Esse trabalho existente foi preservado, sem staging, commit, descarte ou reescrita de histórico. Antes de novas alterações, inspecionar novamente o estado real do checkout; este registro é uma fotografia da sessão, não uma suposição permanente.

Atualização de pré-produção em 2026-10-30: a solicitação de executar as recomendações da auditoria incluiu revisar e versionar esses arquivos. O fechamento foi preparado na branch `codex/pre-producao`, preservando a implementação e a documentação existentes. Consultar o Git real e a [verificação](pre-producao-verificacao.md) antes de retomar; o parágrafo anterior é histórico.

## Retomada em outro chat

Registro histórico: o proprietário encerrou a etapa anterior com a documentação atualizada e retomou a abertura neste chat do mesmo projeto. O pedido abaixo foi adotado e implementado; os pontos seguintes preservam o registro anterior. Repositório: `C:\Users\Felipe Tajima\projetosportfolio\new-tajportfolio`.

Estado a preservar na retomada:

- A prévia conferida é [http://127.0.0.1:3000/pt](http://127.0.0.1:3000/pt), com alternativa `/en`. Na última inspeção, `localhost:3000` apontava para outra instância. Conferir processo, endereço e porta antes de concluir que alterações visuais não foram aplicadas; não encerrar outros projetos.
- Partículas claras estão em cinza escuro próximo do preto, com os tamanhos e opacidades registrados nos tokens. O último problema foi de instância/carregamento, sem necessidade de novo aumento visual. Imports estáticos geram URLs com hash; `npm run dev` fixa IPv4 e `agentRules: false` preserva o contrato do repositório.
- Última validação de código: tipos, lint, build, dez testes Node e 15 testes Chromium das partículas passaram. Os cenários de desktop no tema claro verificam pixels escuros realmente renderizados, além da geometria. O navegador da aplicação também foi conferido visualmente. A execução completa anterior tem 123 testes de navegador; não somar os subconjuntos nem apresentá-la como reexecutada nesta última correção.
- A abertura ainda não foi implementada. Motion e a sequência `</>` → expansão → `<TAJ/>` → página estão definidos. A recomendação final foi aproximadamente 1,5 s e uma vez por sessão da aba; duração e repetição continuam propostas até serem adotadas no pedido de implementação. O limite de 2 s e os demais comportamentos propostos/confirmados seguem [F08](features/abertura.md).
- Ler [F08](features/abertura.md), [storyboard e movimento](design/motion.md), [lettering](design/lettering.md) e [ADR-008](adr/0008-motion-e-particulas.md). Reutilizar os grupos do SVG mestre; respeitar temas, idiomas, movimento reduzido, acesso direto por âncora e falhas. Preservar as seções, o slide nativo e os hovers existentes.

Mensagem sugerida para o proprietário iniciar o próximo chat, caso queira adotar a duração e repetição recomendadas:

> No repositório `C:\Users\Felipe Tajima\projetosportfolio\new-tajportfolio`, leia AGENTS.md, docs/estado-atual.md e docs/features/abertura.md. Implemente somente a abertura animada com Motion e os SVGs aprovados. Adote aproximadamente 1,5 segundo, uma vez por sessão da aba, respeitando movimento reduzido e os critérios documentados. Preserve as seções e alterações existentes.

Naquela atualização documental, somente este documento foi alterado e os scripts não foram repetidos. A validação da implementação posterior está em [verificação da abertura](abertura-verificacao.md).
