# Verificação da abertura

Data: 2026-10-26. Escopo: [F08](features/abertura.md), com decisão em [ADR-009](adr/0009-abertura-por-sessao.md).

## Implementação

Sequência `</>` → expansão → `<TAJ/>` → página, com os paths do SVG mestre incorporados na pré-geração. Alvo de 2,5 segundos desde a ativação, uma vez por sessão da aba, sem aguardar imagens. A camada usa branco/preto e a cor sólida da marca do tema efetivo. Hidratação consome o mesmo orçamento; se levar 500 ms ou mais, a página é liberada diretamente. Um limite de 3 segundos independente de React/Motion impede cobertura permanente quando o bundle falha.

Movimento reduzido e armazenamento de sessão indisponível omitem a abertura. Alterar para movimento reduzido durante a apresentação encerra a camada e cancela suas animações. O conteúdo mantém sua geometria para preservar âncoras/slide. Visibilidade e `inert` protegem elementos cobertos; a liberação não chama foco nem scroll. A marca é decorativa e não anuncia cada etapa.

As seções, os SVGs originais, partículas, hovers, dados e dependências foram preservados. Além dos novos componentes, a integração da aplicação se limita ao layout de idioma e aos estilos da abertura.

## Cobertura de navegador

`tests/e2e/opening.spec.ts` contém 23 cenários Chromium:

- Matriz PT/EN × claro/escuro × 360/768/1440 px: paths idênticos ao mestre, cor, fundo, centro, ausência de overflow, frames do estado compacto, expansão real, marca completa e saída por opacidade. O tempo é medido desde a ativação até a liberação; não é inferido apenas de screenshots.
- Foco bloqueado durante a cobertura, teclado/foco visível liberados ao final e acesso pelo skip link.
- Recarga, idioma, fragmento e histórico sem repetição; outra aba criada com sessão própria inicia a abertura.
- Entrada direta em contato e em um projeto, com posição/slide preservados e foco utilizável.
- Tema salvo contrário ao sistema desde a abertura; preferência reduzida inicial e alterada durante a sequência.
- Sessão indisponível, imagens bloqueadas, bundle de hidratação bloqueado, falha da API de animação e JavaScript desativado. Sem bundle, o prazo independente libera conteúdo e teclado.

Os testes anteriores que enviam teclado ou gestos diretamente agora aguardam a remoção da abertura antes de testar essas interações. Isso mantém as asserções de partículas e toque no slide, respeitando o bloqueio temporário exigido por AB-07.

Capturas `opening.png` e `opening-wordmark.png` ficam nos diretórios da matriz em `test-results/`, ignorados pelo Git. Houve inspeção visual dos estados inicial/completo em celular, tablet e desktop, nos dois temas; os estados da marca são idênticos entre idiomas. A prévia de desenvolvimento em `http://127.0.0.1:3000/pt` também completou a expansão, removeu a camada e liberou `inert`, sem erros de página, incluindo o replay de efeitos do React em desenvolvimento.

## Verificações executadas

Após o pedido de ampliar para 2,5 segundos, as fases foram escaladas proporcionalmente e o limite independente passou a 3 segundos. Tipos, lint, validação de conteúdo, dez testes Node, build e os 23 cenários Chromium da abertura passaram novamente, incluindo a matriz de idiomas/temas/larguras, teclado e movimento reduzido. A suíte completa de 146 cenários não foi repetida nesse ajuste restrito de duração; o resultado abaixo registra a entrega anterior.

Tipos, lint, validação de conteúdo, dez testes Node e build passaram. `/pt` e `/en` continuam pré-gerados. A suíte completa de 146 testes Chromium passou em 2,7 minutos, incluindo os 23 cenários da abertura e a regressão das seções existentes. Tipos e lint também foram repetidos após os ajustes de sincronização dos testes de teclado/toque, sem falhas. Não há falhas pendentes nas verificações executadas.

## Limitações

Não foram executados Safari, Firefox, leitores de tela ou dispositivos físicos. O bloqueio de foco e a exclusão da marca da árvore acessível foram verificados em Chromium; não substituem uma sessão com leitor de tela. Os testes de contatos verificam nomes e destinos sem enviar mensagens ou abrir conversas reais. Hospedagem/publicação não faz parte desta entrega.
