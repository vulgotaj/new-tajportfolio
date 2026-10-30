# ADR-009 — Abertura curta por sessão da aba

- Status: adotado na implementação autorizada em 2026-10-26.
- Data: 2026-10-26.

Complemento posterior: o pedido de animar o restante da página acrescentou entradas coordenadas durante a saída da abertura e nas seções, conforme [ADR-010](0010-movimento-das-secoes.md). O contexto abaixo registra o escopo original da abertura.

## Contexto

O proprietário solicitou a abertura com Motion e os SVGs aprovados, inicialmente em aproximadamente 1,5 segundo e uma vez por sessão da aba. Após avaliar a implementação, solicitou 2,5 segundos; as fases foram ampliadas proporcionalmente e o limite de segurança passou a 3 segundos. A escolha da biblioteca está no [ADR-008](0008-motion-e-particulas.md); os critérios de comportamento estão em [F08](../features/abertura.md).

## Decisão

Manter o conteúdo em Server Components. `opening.tsx` incorpora o SVG mestre local durante a pré-geração, sem duplicar seus paths nem depender de uma requisição de imagem. `opening-animation.tsx` usa `useAnimate` de `motion/react` para coordenar os símbolos, a revelação conjunta das letras e a saída por opacidade. Nenhuma seção recebe outra animação de entrada.

Um script síncrono no head, após o tema, verifica APIs, movimento reduzido e `sessionStorage` (`taj-opening-seen`). Registra a visita antes da ativação; recarga, idioma e histórico compartilham essa marca na sessão da aba. Armazenamento indisponível ou APIs ausentes omitem a abertura. Uma visita com movimento reduzido também consome a apresentação, evitando uma abertura tardia se a preferência mudar.

A camada só aparece com o atributo de ativação; sem JavaScript fica oculta e o conteúdo permanece disponível. O script instala uma liberação independente em 3 segundos antes de ativar a camada. Motion não controla esse limite. A execução normal termina em 2,5 s desde a ativação: o tempo de hidratação é descontado proporcionalmente da sequência sem pular o primeiro estado. Se a hidratação levar 500 ms ou mais, liberar diretamente o conteúdo, evitando uma animação comprimida demais. Falha síncrona, preferência reduzida durante a sequência, aba oculta ou saída da página encerram a abertura.

`visibility: hidden` protege o conteúdo antes da hidratação sem remover sua geometria. Durante a revelação, `inert` mantém elementos cobertos fora do foco/interação. A liberação remove esse estado e o atributo de ativação; o cliente desmonta a camada e cancela animações/timers. Não mover foco, alterar fragmento, chamar scroll nem bloquear overflow. Âncoras, restauração do slide e rolagem continuam nativas. A marca inteira é decorativa (`aria-hidden`), sem região de anúncios.

## Alternativas

- Ativar apenas depois da hidratação: permitiria um clarão do conteúdo antes da abertura.
- Ocultar conteúdo por padrão no HTML: poderia bloquear a visita sem JavaScript.
- Esperar imagens ou carregamento completo: não corresponde à apresentação de identidade solicitada.
- Incluir os paths em outro componente manualmente: duplicaria o SVG aprovado.

## Consequências e revisão

Há uma fronteira cliente local e um script pequeno de liberação independente, sem dependência nova, provider ou estado global de negócio. A camada ocupa o viewport sem deslocar o layout e usa os tokens de fundo/marca do tema já aplicado. A implementação tem cenários de navegador para a ordem real dos estados, tempo, repetição, foco, âncoras, temas, idiomas, larguras e falhas. Revisar o ritmo após avaliação visual do proprietário; Safari, Firefox e dispositivos físicos continuam pendentes.

Referências: [sequências e limpeza do useAnimate](https://motion.dev/docs/react-use-animate), [controles de reprodução](https://motion.dev/docs/animate#controls).
