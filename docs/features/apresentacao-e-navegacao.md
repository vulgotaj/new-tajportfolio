# Apresentação e navegação — F01

## Objetivo e escopo confirmado

Dar boas-vindas com um hero de tela inteira, imponente, apresentando Felipe Tajima e a função confirmada “Desenvolvedor Full-Stack”, com espaço lateral para imagem. Funcionar em computador, tablet e celular. Aparência em [design](../design.md), entrada em [F08](abertura.md) e critérios comuns no [índice](README.md#critérios-transversais).

## Comportamento

- Hero ocupa no mínimo a tela de entrada, considerando o header, sem esconder conteúdo em telas baixas, zoom ou traduções longas. Em telas menores a seção pode crescer. No celular, saudação, nome, função e ação são centralizados para distribuir o conteúdo de forma equilibrada.
- Boas-vindas, nome e função ficam à esquerda e imagem à direita no desktop; adaptar/empilhar quando não houver largura suficiente.
- Priorizar nome em uma linha e função abaixo em telas amplas. O fundo escolhido é de partículas contínuas, inclusive na área do texto, sem recorte vazio ao redor do conteúdo. Usar baixa intensidade, não um painel opaco para esconder as partículas.
- Não mostrar lista, badges ou rotação de tecnologias abaixo da função.
- Oferecer “Baixar Currículo” / “Download Résumé (PT-BR)” como ação do hero, apontando ao PDF em português fornecido pelo proprietário. A indicação/link para projetos continua conduzindo à seção seguinte.
- Projetos são a primeira seção após o hero. Isso não exige mostrar previews dentro da primeira viewport.
- Header oferece início pela marca, projetos, sobre mim, serviços, contato, idioma e tema. Preservar idioma e tema ao navegar.
- Âncoras estáveis, URLs diretas e voltar/avançar funcionam sem títulos cobertos pelo header.
- No menu estreito, oferecer o mesmo acesso essencial; se recolhível, informar estado, fechar ao escolher destino e aceitar Escape. O padrão proposto é expansão não modal, sem prender foco.

## Estados e exceções

Menu fechado/aberto, foco visível e imagem indisponível sem bloquear nome ou ações. Sem imagem definitiva, o estudo usa espaço reservado; não publicar foto falsa. Ausência de currículo segue [F07](curriculo.md). Navegação deve continuar utilizável sem animações.

## Critérios de aceite

- **AP-01:** hero dá boas-vindas, identifica nome/função confirmados e oferece imagem, currículo disponível e acesso a projetos.
- **AP-02:** hero tem presença de tela inteira e projetos são a primeira seção seguinte; não reduzir o hero para forçar previews na primeira dobra.
- **AP-03:** links/âncoras e voltar/avançar alcançam a seção correta, sem header encobrindo o destino.
- **AP-04:** marca e navegação preservam idioma/tema e não reiniciam a abertura interna.
- **AP-05:** controles e menu são utilizáveis por teclado/toque; imagem lateral se reorganiza sem cortes impeditivos.
- **AP-06:** não há lista de tecnologias abaixo da função; zoom, tela baixa e traduções não ocultam nome ou ações.
- **AP-07:** composição ampla mantém nome horizontal, e o campo de partículas continua atrás da região de texto sem máscara; leitura e controles permanecem claros nos dois temas. Em telas estreitas, nome pode quebrar sem cortes.

## Pendências

Header e hero implementados em 2026-10-25, seguindo os mockups: saudação PT/EN, nome, função e foto do costão, composição horizontal ampla e empilhada estreita, partículas contínuas estáticas e controles de idioma/tema. O recorte preserva o original e usa somente CSS; na revisão de 2026-10-30, a foto passou a iniciar colorida e ficar em preto e branco somente em hover compatível, mantendo cor no celular/toque. O header não é fixo e oferece um link para pular à apresentação.

Atualização de 2026-10-26: CTA “Ver projetos” e indicação final apontam à seção real `#projects`, que é a primeira após o hero. Header oferece início, projetos, Sobre mim (`#about`) serviços (`#services`) e contato (`#contact`), incluindo menu nativo estreito que fecha ao escolher destino, clicar fora ou pressionar Escape. Escape devolve foco ao acionador. Idioma preserva painel compacto e tema preserva alternância direta, conforme os ajustes pedidos pelo proprietário. AP-03 cobre as âncoras existentes, inclusive fragmentos estáveis dos projetos.

As boas-vindas seguem o texto dos mockups aprovados, ainda sujeito à revisão editorial. Currículo disponibilizado em 2026-10-30, conforme [F07](curriculo.md). Sobre mim, serviços, contato e rodapé foram implementados nas etapas seguintes; abertura não foi iniciada. Motion foi escolhido pelo proprietário em 2026-10-26 e já controla o movimento contínuo das partículas. O botão de pausa, a suspensão fora do hero/aba inativa e o campo estático com movimento reduzido/sem JavaScript estão descritos no [ADR-008](../adr/0008-motion-e-particulas.md). Resultados atuais em [verificação de contato e rodapé](../contato-verificacao.md); serviços em [verificação de serviços](../servicos-verificacao.md); Sobre mim em [verificação de Sobre mim](../sobre-verificacao.md); projetos em [verificação de projetos](../projetos-verificacao.md); histórico em [verificação da apresentação](../apresentacao-verificacao.md).

## Revisão da indicação de projetos

Em 2026-10-26, foi reproduzido o texto da indicação visível sem a seta em uma viewport de 1440 × 680: o hero tinha 644 px mais 96 px de header, colocando o SVG abaixo da primeira tela. O espaço inferior foi reduzido, e a foto de desktop passou a ajustar sua largura à altura disponível mantendo a proporção 103:113 e o mesmo recorte relativo. No celular, os espaços entre elementos e abaixo da composição foram reduzidos. Não há posição fixa, sobreposição da indicação com a foto ou alteração do arquivo original.

Doze cenários PT/EN × claro/escuro × 1440 × 680, 1200 × 600 e 360 × 800 conferem a seta inteira no topo, ausência de sobreposição/transbordamento e navegação por teclado. Em alturas extremas ou texto ampliado, a seção continua podendo crescer para preservar o conteúdo. Os cenários anteriores de tablet/desktop/celular, tema, idioma e movimento reduzido permanecem na suíte.
