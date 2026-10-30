# Fotografias escolhidas

Escolha aprovada pelo usuário em 2026-10-25.

| Uso | Arquivo | Direção de enquadramento |
| --- | --- | --- |
| Hero | [Foto no costão](edited/felipe-costao-v2.png) | Cintura para cima, reduzindo o excesso de céu. À direita no desktop, com o olhar voltado para o texto. Preservar rosto, cabelo e presença do sorriso. |
| Sobre mim | [Foto na floresta](edited/felipe-floresta-v2.png) | Retrato mais próximo, preservando rosto e postura; adaptar ao espaço disponível sem distorção. |

Usar as versões v2, refeitas a partir dos originais com remoção de marcas e elementos do Instagram, sem solicitar correções de luz ou cor. Não usar as versões anteriores clareadas. [Registro da edição e prompts](edited/REVISAO-v2.md).

Implementação da apresentação: o PNG do costão foi copiado sem alterações para `src/assets/photos/felipe-costao-v2.png`. `next/image` recebe import estático, preload e tamanhos responsivos; a escala e o ponto focal são definidos por breakpoint no CSS, preservando cabelo, rosto e proporção. A foto da floresta também foi copiada sem alterações para `src/assets/photos/felipe-floresta-v2.png`, com import estático, carregamento sob demanda e enquadramento responsivo em CSS, sem preload.

A foto no caminho permanece como alternativa. A seleção não altera os arquivos aprovados nem exige recorte permanente: ajustar o enquadramento na composição, com proporção preservada. Não espelhar, clarear ou remover o fundo. O único filtro autorizado é o tratamento CSS descrito abaixo; manter os arquivos coloridos intactos.

## Preto e branco e interação

Revisão aprovada pelo usuário em 2026-10-30: as fotos pessoais do hero e de Sobre mim, assim como os previews de todos os projetos, começam coloridos, nos dois temas e em todas as larguras. Ao passar o mouse sobre a própria imagem, quando o dispositivo oferece hover e ponteiro preciso, aplicar preto e branco. Ao retirar o mouse, retornar às cores originais.

No celular e em dispositivos sem hover, manter as cores originais inclusive após toque; não criar alternância por toque, botão, cursor de ação ou parada de teclado apenas para o filtro. O efeito é decorativo e não revela informação exclusiva. Títulos, descrições, tecnologias e ações dos projetos permanecem legíveis e utilizáveis sem hover.

Transição de `filter` em 350 ms com `ease`, nos dois sentidos. Com `prefers-reduced-motion: reduce`, trocar imediatamente. Usar CSS, sem biblioteca de animação, JavaScript de detecção ou conversão permanente das imagens.

```css
.personal-portrait img, .project-preview img {
  filter: grayscale(0);
  transition: filter 350ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .personal-portrait:hover img, .project-preview:hover img { filter: grayscale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .personal-portrait img, .project-preview img { transition: none; }
}
```

O comportamento depende das capacidades de entrada, não da largura da tela: um tablet com mouse pode oferecer o mesmo efeito. O [estudo de hover](mockups/hover-comparison.png) preserva a direção anterior: na aplicação atual, os estados foram invertidos conforme esta revisão.

Os projetos usam as mídias do [catálogo editorial](../projects/catalog.json), com o mesmo tratamento aplicado apenas no contêiner da imagem. [Comparação do hover nos projetos](mockups/project-hover-comparison.png). Os arquivos coloridos originais permanecem intactos; não aplicar o filtro ao texto, aos controles ou à logo.

As fotografias foram aplicadas nos [mockups revisados](mockups/README.md), com capturas em português e inglês, nos dois temas e em celular, tablet e desktop. Os estudos são estáticos; não representam implementação funcional.
