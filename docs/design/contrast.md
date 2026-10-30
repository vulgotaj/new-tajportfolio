# Contraste dos tokens revisados

Cálculo local para cores opacas de [tokens.md](tokens.md), com luminância relativa sRGB. Valores arredondados só para exibição; verificação com precisão completa.

| Par | Claro | Escuro | Meta |
| --- | --- | --- | --- |
| Texto / fundo | 21,00:1 | 21,00:1 | 4,5:1 |
| Secundário / fundo | 6,10:1 | 9,68:1 | 4,5:1 |
| Secundário / superfície | 5,69:1 | 8,71:1 | 4,5:1 |
| Acento e foco / fundo | 21,00:1 | 21,00:1 | 3:1 |
| Acento e foco / superfície | 19,60:1 | 18,88:1 | 3:1 |
| Texto inverso / ação preenchida | 21,00:1 | 21,00:1 | 4,5:1 |
| Logo / fundo | 21,00:1 | 21,00:1 | 3:1 voluntária |

Logo, texto principal, ícones e foco ficam pretos no claro e brancos no escuro. Links usam sublinhado ou identificação além da cor; foco usa contorno com afastamento. Ações preenchidas usam texto inverso. Os valores de 21:1 consideram cores opacas sem sobreposição de partículas ou antialiasing; não são uma medição de cada pixel da interface.

As partículas são pretas/brancas com opacidade reduzida. Sobre o campo decorado, o contraste mínimo calculado do texto secundário é de 4,75:1 no claro e 5,41:1 no escuro; [detalhes e limites](hero-backgrounds.md#validação-realizada-e-limites). A direção monocromática não altera as cores originais das fotografias, preservadas nos arquivos; o preto e branco é aplicado somente no hover compatível.

Cálculo não é certificação da interface. Conferir foco, estados, opacidade e imagens na implementação. Referências: [W3C — texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [W3C — elementos não textuais](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
