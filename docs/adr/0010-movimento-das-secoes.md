# ADR-010 — Movimento das seções com conteúdo disponível

- Status: adotado; resultado visual final aprovado pelo proprietário em 2026-10-26.
- Data: 2026-10-26.

## Contexto

Após avaliar a abertura, o proprietário indicou que as animações das demais áreas deveriam preceder a revisão de textos. A biblioteca Motion, a identidade monocromática, o slide nativo e os hovers existentes já estavam definidos. A ampliação do escopo não exige outro motor nem transformar conteúdo em componentes de cliente.

## Decisão

`PageMotion` substitui o contêiner `#portfolio-content` no layout e recebe as seções renderizadas no servidor como `children`. Atributos estáticos `data-enter` identificam os blocos e imagens; a entrada combina opacidade e deslocamento vertical, com opacidade isolada no header/rodapé. A fronteira usa `motion/react-mini`, já disponível na dependência instalada.

O hero começa durante a saída da abertura de 2,5 s, sem outra espera, com duração de até 750 ms e deslocamento de até 16 px. O restante entra uma vez por montagem quando alcança a área visível, com IntersectionObserver. Os previews são observados individualmente para também alcançar projetos revelados pelo slide; os itens e a rolagem do carrossel não recebem transformações. Cada card de serviço é observado separadamente, inclusive após navegação pelo menu. Conforme pedido visual posterior, as entradas partem de opacidade zero e até 24 px abaixo, chegando a opacidade 1 e à posição final em 900 ms. Não há escala nem recorte. Tokens compartilhados ficam no CSS.

Nenhum elemento começa oculto no HTML/CSS. Após instalar observação e limpeza, o cliente prepara somente os elementos fora da tela (ou sob a abertura ainda opaca) com opacidade zero. Conteúdo já pintado ou restaurado permanece estático, evitando voltar visualmente ao início de um efeito. O observador inicia a entrada ao atingir 24 px dentro da borda inferior da tela, tornando a transição visível durante a rolagem. Não adicionar `inert`, bloquear rolagem ou mudar foco/fragmento. Movimento reduzido omite os efeitos e encerra os preparados/ativos; CSS reforça o estado estático. Foco/clique revela imediatamente o elemento que contém a ação, sem consumir os cards seguintes ao focar uma seção. O destino de âncora continua estável, pois a seção e os itens do slide não são transformados. Retornar à aba reobserva entradas pendentes; falha, conclusão ou desmontagem restauram estilos. Há também prazo local de restauração para cada efeito ativo.

## Refino após avaliação visual

O proprietário relatou que as entradas não apareciam ou passavam rápido. A duração foi ampliada, a preparação saiu do momento em que o elemento já estava visível e o recorte das fotos foi removido. A antiga omissão de toda a seção ao navegar por fragmento foi retirada: ela consumia animações ainda não vistas e tornava o menu um caminho sem efeitos. O tratamento por card substitui a animação única de uma grade longa no celular. A abertura permanece em 2,5 segundos.

No pedido seguinte, o proprietário especificou aparecer de baixo para cima, começando transparente e com boa transição. Esse efeito substitui as opacidades parciais e a escala anteriores; mantém a duração de 900 ms e a curva suave existente.

## Alternativas

- Ocultar cada seção até um evento de rolagem: tornaria leitura e navegação dependentes do efeito.
- Tornar cada seção um Client Component: ampliaria a fronteira sem necessidade.
- Animar itens do slide ou repetir entradas ao subir/descer: interferiria com sua geometria e acrescentaria movimento recorrente.
- Biblioteca adicional: Motion já atende ao escopo.

## Consequências e revisão

Há uma fronteira cliente local para o ciclo de vida das entradas; conteúdo, semântica, temas, idiomas e hovers permanecem nos componentes existentes. Sem JavaScript ou APIs, a página mantém sua apresentação estática. A abertura e as partículas preservam seus controles próprios. Validar frames reais, navegação, teclado, movimento reduzido, falhas e a matriz de larguras/temas/idiomas; ajustar o ritmo após avaliação visual do proprietário.

Referência: [useAnimate e limpeza por escopo](https://motion.dev/docs/react-use-animate).
