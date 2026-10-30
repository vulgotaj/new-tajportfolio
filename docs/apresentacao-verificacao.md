# Verificação da apresentação inicial

Registro da entrega anterior ao slide de projetos. O estado posterior está na [verificação de projetos](projetos-verificacao.md).

Data: 2026-10-25. Continuação da [fundação técnica](fundacao-verificacao.md), implementando header e hero de F01. Referências: mockups finais de `design/photos/mockups/`, fotografia v2 do costão, tokens monocromáticos e lettering aprovados. A skill frontend-design foi aplicada preservando essas escolhas.

## Entrega e limites

Hero de tela inteira com boas-vindas, nome/função, foto lateral no desktop e composição empilhada em telas menores. Partículas usam os SVGs aprovados como campo contínuo estático, inclusive atrás do texto, sem máscara. Não foi escolhida ou instalada biblioteca de animações. A foto permanece em preto e branco por CSS e revela a cor apenas em hover compatível, com troca imediata sob movimento reduzido.

O header oferece marca, início, painel compacto de idioma e alternância direta de tema, com destinos reais e link para pular à apresentação. Em telas estreitas, omite a duplicação textual do início, preservando a marca como acesso. O painel de idioma usa disclosure nativo de 160 px com opções em coluna; Escape fecha e retorna o foco, clicar fora ou ativar o tema também fecha. A seleção de idioma funciona sem JavaScript. O botão de tema não abre painel e informa a próxima ação no idioma atual.

Projetos, Sobre mim, serviços, contato, rodapé e abertura não foram iniciados. Não há menu para seções inexistentes, links sociais, currículo ou CTA “Ver projetos” sem destino. AP-01 segue parcial quanto ao acesso a projetos; AP-03 cobre as âncoras existentes. O próximo conteúdo após o hero deverá ser a seção de projetos, quando sua implementação for solicitada e o conteúdo necessário estiver pronto.

## Resultados

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou, sem avisos. |
| `npm test` | 4 testes editoriais passaram. |
| `npm run build` | Passou com validação editorial; PT/EN permanecem SSG. Catálogo permanece com 3 rascunhos e 0 publicados. |
| `npm run test:e2e` | 25 testes Chromium passaram sobre o build de produção. |
| Revisão visual | 12 capturas inspecionadas: PT/EN × claro/escuro × 360/768/1440 px, sem transbordamento; nome em uma linha no desktop e foto com cabelo/rosto preservados. |
| Integridade | Foto da aplicação idêntica ao PNG aprovado por SHA-256; partículas copiadas sem alteração; SVGs de marca e materiais originais preservados. |

A suíte mantém os cenários da fundação e acrescenta verificação da foto carregada, altura mínima da apresentação, nome em uma linha no desktop, metadados, foco e painéis do header, hover/retorno ao preto e branco, toque sem alternância de cor, âncoras reais e preservação de `#intro` na troca de idioma. Um cenário bloqueia a imagem e amplia o texto a 200% em 320 px, conferindo leitura e ausência de transbordamento horizontal.

Teclado conferido com Tab/Enter/Escape no idioma e Enter/Espaço na alternância de tema; movimento reduzido elimina a transição do filtro. A escolha manual de tema continua persistindo e prevalecendo sobre o sistema; falhas de armazenamento, valor inválido e ausência da API de preferência não bloqueiam o uso. As 12 variantes verificam também a alternância nos dois sentidos e o painel compacto, sem transbordamento. Não houve abertura de conversas ou envio de mensagens.

Capturas ficam em `test-results/`, ignoradas pelo Git. Não foram executados Firefox, Safari, testes em dispositivos físicos ou leitores de tela. A ampliação automatizada altera o tamanho base do texto; não substitui testes com todos os modos de zoom dos navegadores. A apresentação 404 permanece nativa e as limitações de ESLint/hospedagem do ADR-006 continuam vigentes.
