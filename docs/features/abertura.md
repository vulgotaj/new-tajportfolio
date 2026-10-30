# Abertura da página

Status: implementada em 2026-10-26 com Motion e os paths aprovados. O proprietário adotou aproximadamente 2,5 segundos e uma vez por sessão da aba. Biblioteca no [ADR-008](../adr/0008-motion-e-particulas.md), execução e liberação no [ADR-009](../adr/0009-abertura-por-sessao.md).

O [storyboard visual](../design/motion.md) detalha os estados. A implementação termina normalmente em 2,5 s desde a ativação, com limite independente de 3 s. Não há uma segunda entrada do hero.

A marca usa o [lettering vetorial](../design/lettering.md), mantendo os mesmos traçados da versão de header durante a expansão; não recriar as letras com a fonte da interface.

## Objetivo

Apresentar a identidade TAJ antes da entrada no portfólio, com uma transição curta e fluida até o hero.

## Escopo

Inclui a introdução da marca e sua transição para a página. As regras de cor e identidade estão em [Direção visual](../design.md#identidade-confirmada).

Não inclui indicador percentual, estimativa de carregamento nem espera por todas as imagens da página.

## Sequência confirmada

1. Apresentar `</>` centralizado na superfície correspondente ao tema inicial.
2. Abrir espaço entre `<` e `/>`, revelando `TAJ` até formar `<TAJ/>`, sem saltos na composição.
3. Encerrar a abertura e revelar a página com continuidade visual para o hero.

O movimento não deve simular progresso de rede nem repetir a introdução do hero como uma segunda espera.

## Comportamentos implementados

- Exibir a sequência completa uma vez por sessão da aba; trocas de idioma e navegação entre seções não a reiniciam.
- Duração normal de 2,5 segundos, com saída forçada em até 3 segundos a partir da ativação. Hidratação consome o mesmo orçamento; quando leva 500 ms ou mais, omitir a sequência restante e liberar a página.
- Encerrar sem aguardar fotografia, imagens de projetos, serviço de contato ou recursos externos.
- Com preferência por movimento reduzido, omitir a expansão e liberar diretamente a página.
- Se JavaScript, animação ou armazenamento de sessão falhar, manter o conteúdo acessível; a camada de abertura deve falhar aberta.
- Em acesso direto a uma seção, não deslocar o visitante para o topo nem substituir o foco após a abertura.
- Ao sair, remover a camada de abertura e liberar qualquer bloqueio temporário de interação ou rolagem, inclusive em falhas.

## Critérios de aceite

- **AB-01:** na execução padrão, a ordem visual é `</>` → expansão → `<TAJ/>` → página.
- **AB-02:** todas as letras e símbolos da marca ficam pretos no tema claro e brancos no escuro, sem gradiente; o fundo segue o tema sem clarão incorreto.
- **AB-03:** a expansão fica centralizada e não provoca deslocamento do conteúdo da página.
- **AB-04:** a abertura se adapta a celular, tablet e desktop, sem cortes ou rolagem horizontal.
- **AB-05:** o conteúdo fica disponível mesmo com recursos de imagem lentos ou indisponíveis.
- **AB-06:** a preferência de movimento reduzido elimina a expansão.
- **AB-07:** elementos cobertos não recebem foco enquanto a camada estiver ativa; ao encerrar, a navegação por teclado funciona sem perda de foco ou armadilha.
- **AB-08:** a marca não gera anúncios repetidos a leitores de tela durante a animação.
- **AB-09:** a sequência não se repete durante a mesma sessão da aba e respeita o limite de duração.

## Verificação

Os cenários em `tests/e2e/opening.spec.ts` observam frames reais, geometria, duração, sessão, teclado, preferência reduzida e falhas, além da matriz PT/EN × claro/escuro × 360/768/1440 px. Alcance e resultados em [verificação da abertura](../abertura-verificacao.md). Permanecem aplicáveis os [critérios transversais](README.md#critérios-transversais).
