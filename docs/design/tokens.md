# Tokens e tipografia — revisão visual

Revisão de 2026-10-25. Direção monocromática confirmada pelo usuário: detalhes pretos no tema claro e brancos no escuro, como a logo. Cinzas neutros preservam a hierarquia; não usar acentos cromáticos na interface. Contexto e referências em [design.md](../design.md).

## Paleta

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `background` | `#FFFFFF` | `#000000` | Fundo da página e da abertura, sem tonalidade azulada. |
| `surface` | `#F7F7F7` | `#111111` | Cards de serviço e apoio a imagens. |
| `text` | `#000000` | `#FFFFFF` | Nome, títulos e corpo. |
| `text-muted` | `#626262` | `#B0B0B0` | Texto secundário das demais seções. |
| `hero-muted` | `#444444` | `#CCCCCC` | Saudação e indicação de projetos, com contraste reforçado sobre as partículas. |
| `border` | `#D7D7D7` | `#303030` | Limites decorativos e separação discreta. |
| `accent` | `#000000` | `#FFFFFF` | Ícones, contornos de destaque, indicadores, links e foco. |
| `logo` | `#000000` | `#FFFFFF` | Cor sólida de todas as letras e símbolos da marca, conforme o tema ativo. |
| `on-accent` | `#FFFFFF` | `#000000` | Texto e ícones sobre ações preenchidas com `accent`. |
| `particle` | `#000000` | `#FFFFFF` | Partículas decorativas, com opacidade reduzida para preservar a leitura. |

Links usam `text` com sublinhado ou indicação explícita de destino. Foco usa `accent`, com contorno de 2 px e afastamento de 4 px; não depender apenas da mudança de cor. Em ações preenchidas, combinar `accent` com `on-accent`. Ações secundárias são transparentes, com contorno do tema. No foco de ações preenchidas, manter o afastamento para que o anel permaneça distinguível.

Logo, acentos e partículas seguem a mesma inversão por tema, sem gradiente. Após o pedido de maior visibilidade em 2026-10-26, partículas têm raios de 1,10/1,70/2,40 unidades SVG nas camadas longe/meio/perto e opacidade de aproximadamente 54–76% no claro e 18–33% no escuro. Após o primeiro aumento de tamanho, o proprietário pediu mais opacidade, com cinza escuro próximo do preto no tema claro. Os pontos claros são pretos com transparência, resultando visualmente em tons de aproximadamente #3E3E3E a #757575 sobre branco. No escuro, a opacidade aumentou em 30% em relação à revisão anterior. Os raios continuam cerca de 70% maiores que o estudo inicial, mantendo os 209 pontos e suas coordenadas por tema; não criar máscara ao redor do texto. Os valores gráficos ficam nos SVGs de `public/decoration/`, enquanto os SVGs originais do estudo em `docs/design/hero-backgrounds/` permanecem como histórico. Fotografias pessoais e imagens de projetos usam as cores originais no estado padrão e ficam em preto e branco no hover compatível; no celular/toque permanecem coloridas. Preservar os arquivos coloridos, aplicando o efeito por CSS conforme as [regras de imagem](photos/README.md#preto-e-branco-e-interação).

Na logo, propor largura de 144 px no header amplo, 132 px no estreito e mínimo recomendado de 120 px; preservar a proporção. Ver [lettering](lettering.md) e [contraste](contrast.md).

## Estados de interação

Revisão aplicada em 2026-10-26: ações com contorno, controles circulares, navegação e itens dos menus usam preenchimento `accent` e texto/ícone `on-accent` no hover/foco. A ação “Ver projeto” inverte seu preenchimento para `background` com conteúdo `accent`. Os círculos de contato também invertem cores, com elevação de 2 px e escala de 1,06 no hover. Foco mantém o anel existente, sem depender do deslocamento.

Tokens de resposta ficam no CSS: duração de 180 ms, curva `cubic-bezier(.2, 0, 0, 1)`, elevação de -2 px, deslocamento de ícone de 2 px e escala de pressionamento 0,97. Hover é restrito a ponteiro preciso com suporte a hover; controles desabilitados ficam fora dos efeitos. Nos contatos, somente o ícone ou os textos visíveis ativam o destaque; o espaço vazio do link na coluna não ativa hover. O foco por teclado continua destacando o contato inteiro. Movimento reduzido zera duração/deslocamentos e usa escala 1. A marca e a transição fotográfica de 350 ms são preservadas.

## Fonte identificada

Usar **[Jost](https://fonts.google.com/specimen/Jost)** em títulos, textos e controles. A logo tem lettering próprio em SVG, sem dependência de fonte. No [site do Frans](https://www.frans.my.id/), a folha `/_next/static/css/05f0d11a77576b44.css` consultada em 2026-10-25 declara `body { font-family: Jost, sans-serif }`; o título da imagem é um h3 sem override de família e com peso bold. A regra de Raleway encontrada para h1 não é a do título anexado.

Pesos propostos: 400 para texto e função, 500 para controles, 600 para subtítulos e 700 para nome e títulos fortes. Na fundação, Jost variável normal Latin foi incluída localmente com licença SIL OFL 1.1, preload e `display: swap` via `next/font/local`. A apresentação usa 400, 500 e 700, seguindo a escala abaixo: nome de 56 px no celular, 78 px no tablet e até 96 px no desktop; os controles compactos do header preservam alvos de 44 px.

## Escala proposta

| Elemento | Celular | Tablet | Desktop |
| --- | --- | --- | --- |
| Nome no hero | 56–64 px | 72–78 px | 96–104 px, ajustando à largura disponível |
| Função | 24–28 px | 28–32 px | 40 px |
| Título de seção | 36 px | 44 px | 56 px |
| Título de projeto/serviço | 24 px | 28 px | 30–32 px |
| Corpo | 16 px | 18 px | 20 px |
| Controles | 14–16 px | 16 px | 16 px |

Entrelinha do nome: cerca de 1,0; função 1,2; corpo 1,5–1,6. O nome pode usar caixa alta para acompanhar a referência de Nicolas. Não converter todo o site em caixa alta nem importar o espaçamento excessivo do nome da referência de Frans para parágrafos.

Após o refinamento do hero, priorizar “FELIPE TAJIMA” em uma linha no desktop, com a função em uma linha abaixo e a imagem lateral. Não impor `nowrap` em telas pequenas ou com zoom: permitir quebra quando necessária, sem diminuir excessivamente a fonte.

## Geometria

- Hero: altura mínima da tela disponível, incluindo o header; preferir unidade de viewport estável na implementação. Altura cresce quando conteúdo, zoom ou tradução exigirem.
- Conteúdo: largura máxima inicial de 1.280 px; margens mínimas de 20 px no celular, 32 px no tablet e 64 px em telas amplas.
- Escala de espaços: 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128 px.
- Projetos: previews em aproximadamente 16:10, raio de 10–12 px; texto e tecnologias fora da imagem, sem painel externo preenchido.
- Serviços: cards com superfície própria, contorno sutil, raio de 16 px, ícone/assinatura na cor de `accent` e padding de 28–32 px; uma coluna no celular, duas quando necessário no tablet e três no desktop.
- Foto e imagem do hero: enquadramento escolhido por ativo. Não cortar rosto ou partes importantes para satisfazer altura fixa.
- Alvos de toque de pelo menos 44 × 44 px; foco visível de 2 px com afastamento de 4 px.

As cores de superfície dos cards não alteram a exigência de fundo principal branco/preto. O uso de cards é intencional nos serviços; não envolvê-los em outra caixa nem aplicar o mesmo contêiner aos projetos.
