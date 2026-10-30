# ADR-008 — Motion e movimento contínuo das partículas

- Status: aceito pelo proprietário em 2026-10-26; partículas implementadas. A abertura foi implementada posteriormente no [ADR-009](0009-abertura-por-sessao.md); o contexto abaixo registra a decisão anterior.
- Data: 2026-10-26.

## Contexto

O proprietário confirmou Motion para a abertura e solicitou movimento constante nas partículas do hero. A abertura continua especificada em F08, com tempos e repetição ainda propostos. O fundo já possui SVGs claros/escuros aprovados, divididos em três grupos de profundidade. Hover e slide nativo já funcionam sem um motor de animação.

## Decisão

Usar `motion@14.6.0`, versão estável consultada no registro npm em 2026-10-26, com peers React/React DOM `^18.0.0 || ^19.0.0`, compatíveis com a aplicação. Fixar versão e lockfile; preservar as licenças MIT da dependência e dos pacotes Motion distribuídos em `public/licenses/motion.txt`.

Na abertura futura, usar os recursos de sequência de `motion/react` apenas na fronteira interativa necessária. Na entrega atual, `hero-particles.tsx` usa `useAnimate` de `motion/react-mini` para animar três camadas HTML com transforms via APIs nativas. Não instalar um segundo motor de partículas.

Cada camada referencia o grupo correspondente dos SVGs por `<use>`, mantendo coordenadas e cores. Após o pedido de maior visibilidade do proprietário, os raios e opacidades dos ativos de execução foram refinados conforme os [tokens](../design/tokens.md); originais do estudo permanecem em `docs/design/hero-backgrounds/`. A seleção de claro/escuro permanece em CSS; não depende de estado React nem reinicia o movimento ao alternar o tema. O conteúdo do hero continua renderizado no servidor.

Os SVGs são imports estáticos do Next.js e o `<use>` recebe a URL gerada com hash do conteúdo. Assim, mudanças nos arquivos participam do Fast Refresh/build e passam a ter um novo endereço, evitando reaproveitar o recurso anterior sob a mesma URL pública. Os arquivos-fonte continuam em `public/decoration/`, sem duplicação manual ou query de versão mantida à mão.

As camadas longe/meio/perto usam ciclos de 32/28/24 segundos e amplitudes horizontais de 8/12/16 px, com movimentos verticais de 6/10/12 px. O retorno termina na posição inicial sem salto. Não há piscadas, atração pelo cursor, linhas entre pontos ou movimento do texto/foto. O campo permanece contínuo atrás do conteúdo.

Oferecer pausa/retomada por botão nativo com nome PT/EN e foco visível. Preservar a fase ao pausar; a escolha vale durante a montagem do hero, sem armazenamento global. Interromper trabalho fora da área visível ou com a aba inativa. Movimento reduzido cancela as animações e mostra o campo estático; mudanças dessa preferência durante a visita são observadas. Sem JavaScript ou APIs necessárias, manter SVGs estáticos e omitir o controle inativo.

## Alternativas

- CSS + controle nativo: viável, mas Motion já foi escolhido e agora tem uso concreto. A entrada mini fornece o controle de reprodução usado nesta entrega.
- GSAP ou biblioteca específica de partículas: capacidade adicional sem necessidade demonstrada para o movimento de três camadas.
- Animar cada ponto: aumentaria a quantidade de animações sem melhorar a direção aprovada de profundidade discreta.

## Consequências e revisão

Existe uma dependência nova e um Client Component pequeno dedicado ao fundo/pausa; as seções e o conteúdo não mudam de fronteira. A ausência de animação não oculta informações nem impede navegação. Abertura não foi implementada implicitamente por esta decisão, e hover/carrossel não serão reescritos só para usar Motion.

Revisar amplitudes/ritmo após avaliação visual do proprietário. Verificar movimento real, pausa, preferência reduzida, temas, teclado, âncoras, celular/tablet/desktop, aba inativa e desmontagem. Não inferir desempenho em todos os dispositivos apenas de screenshots ou do número reduzido de camadas.

Fontes: [instalação e Next.js](https://motion.dev/docs/react-installation), [useAnimate e limpeza](https://motion.dev/docs/react-use-animate), [controles de reprodução](https://motion.dev/docs/animate#controls), [licença](https://github.com/motiondivision/motion/blob/main/LICENSE.md). A comparação anterior está em [movimento](../design/motion.md#biblioteca).
