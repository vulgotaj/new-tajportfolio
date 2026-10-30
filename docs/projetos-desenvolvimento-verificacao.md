# Inclusão de pizzaUP e BarberHub — verificação

Entrega de 2026-10-30. O catálogo local publica os cinco projetos na ordem aprovada. pizzaUP e BarberHub têm imagens originais, conteúdo PT/EN, GitHub e estado “Em desenvolvimento” / “In development”; não têm demonstração fornecida. O proprietário confirmou autoria integral do pizzaUP e desenvolvimento do BarberHub com um amigo, atuando no frontend, backend e integrações. A validação de contribuição pessoal permanece obrigatória.

## Comandos executados

| Comando | Resultado |
| --- | --- |
| `npm run validate:content` | Passou: cinco projetos publicados, seis serviços e quatro contatos; traduções PT/EN e arquivos locais válidos. |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou sem avisos. |
| `npm test` | 11 testes passaram. |
| `npm run build` | Passou; `/pt` e `/en` pré-gerados. |
| `npm run test:e2e -- tests/e2e/projects.spec.ts` | 19 cenários Chromium passaram. |
| `npm run test:e2e` | 168 de 169 passaram; uma falha no teste existente de pausa das partículas, detalhada abaixo. Todos os 19 cenários de projetos passaram também nesta execução. |
| `npm run test:e2e -- tests/e2e/particles.spec.ts --grep "partículas pt dark 1440" --repeat-each=3 --output=test-results/particles-recheck` | Três repetições passaram. |

Na suíte completa, `particles.spec.ts:40` exigiu igualdade exata entre strings de matrizes de transformação após pausar as animações. A maior diferença observada foi cerca de 0,00001 px; os estados das três animações já eram `paused`. O mesmo cenário passou nas três repetições isoladas, indicando uma oscilação intermitente nessa comparação. O teste e a implementação das partículas foram preservados; a execução completa teve uma falha e não deve ser registrada como inteiramente aprovada. Contexto e trace em `test-results/particles-partículas-pt-dark-1440/`.

Os testes de conteúdo verificam a ordem, contribuições confirmadas, ausência de estado nos três primeiros, estado opcional validado inclusive em rascunhos e independência de demo/publicação. Preservam as regras de tradução, mídias, rascunhos e protocolos de links.

Os cenários da seção cobrem PT/EN × claro/escuro × 360/768/1440 px, imagens carregadas durante a navegação, cinco itens e oito ações, estado somente nos dois novos, ausência de demo nesses dois, destinos e nomes acessíveis, Home/End, setas, botões, extremos e foco visível. Também cobrem âncoras de ambos os novos ao trocar idioma e voltar no histórico, rolagem suave, resize, recarga, movimento reduzido, arrasto e toque até o quinto item, além de conteúdo e rolagem sem JavaScript.

A primeira rodada identificou premissas incorretas nos testes ampliados: imagens distantes com carregamento adiado eram exigidas antes de entrar na área visível; voltar no histórico restaura a posição vertical do header usado para trocar idioma; um gesto curto não alcança necessariamente o extremo. As verificações agora acompanham o carregamento ao navegar, medem a posição horizontal ao voltar e usam dois gestos de toque reais. Nenhuma alteração do comportamento do slide foi necessária.

## Mídia e limites

As cópias de `pizzaup.png` e `barberhub.png` em `public/projects/` têm SHA-256 idêntico aos originais editoriais, conforme os hashes do [registro de implementação](projetos-implementacao.md#imagens-aprovadas). Previews preservam a proporção do slide, sem distorção. Capturas geradas ficam em `test-results/`, ignorado pelo Git.

Inspeção visual realizada nos dois projetos em PT/EN, claro/escuro e 360/768/1440 px. Conferidos enquadramento, leitura do estado, contraste do texto, quebra das tecnologias longas e ações GitHub. As seis comparações em `test-results/visual-review/review-{largura}-{tema}.png` reúnem os dois projetos nos dois idiomas; não são arquivos de publicação.

Os testes conferem links sem acionar serviços de contato ou enviar mensagens. Não foram executados fluxos funcionais dos projetos externos, revalidação externa das demos antigas, Safari/Firefox, leitores de tela ou dispositivos físicos. Nenhum deploy foi realizado.

Conferidos 104 links locais nos documentos alterados por caminho de arquivo, sem validação de âncoras. Os 16 arquivos de texto alterados não têm espaços ao fim das linhas. O repositório já estava com os arquivos não rastreados na inspeção inicial; não houve staging ou commit. Dependências e configuração do projeto foram preservadas.
