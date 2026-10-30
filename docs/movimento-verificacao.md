# Verificação do movimento das seções

Data: 2026-10-26. Escopo solicitado após a abertura: entradas das demais áreas, conforme [ADR-010](adr/0010-movimento-das-secoes.md) e [linguagem de movimento](design/motion.md).

Status: resultado visual final aprovado pelo proprietário em 2026-10-26, após a entrada transparente de baixo para cima. A revisão editorial fica para a etapa seguinte.

## Entrega

Após o proprietário relatar que as entradas não apareciam ou passavam rápido, o disparo e o ritmo foram revistos. Header mantém opacidade discreta; hero se acomoda em até 750 ms durante a saída da abertura de 2,5 segundos. Projetos e a foto de Sobre mim usam entrada vertical com opacidade de zero a um, sem escala nem recorte. Cada card de serviço entra quando alcança a tela; o menu não desativa toda a seção. Contatos e rodapé mantêm entradas locais. Não há transformação dos itens do carrossel, mudança de foco/fragmento ou alteração do conteúdo.

As entradas acontecem uma vez por montagem, duram 900 ms e usam deslocamento de até 24 px (16 px no hero). Conforme o pedido seguinte, texto e imagens começam transparentes e chegam a opacidade um de modo progressivo, sem zoom. O estado inicial é preparado fora da tela ou sob a abertura opaca; o observador dispara a entrada 24 px dentro da borda inferior da tela. Conteúdo já visível/restaurado não volta ao início de um efeito. Todos os estilos temporários são restaurados ao concluir ou cancelar. Movimento reduzido elimina as entradas; foco/clique encerra apenas o elemento que contém a ação. Sem JavaScript, animação ou APIs necessárias, o conteúdo mantém sua apresentação estática.

## Cobertura

Os 22 cenários de `tests/e2e/page-motion.spec.ts` incluem a matriz PT/EN × claro/escuro × 360/768/1440 px. Observam movimento entre frames, restauração de estilos, ausência de overflow e não repetição. Há cobertura da entrada simultânea à saída da abertura, teclado, preferência reduzida inicial/alterada, último projeto por âncora, navegação para contato, APIs ausentes e falhas. As regressões verificam menu → último card, rolagem gradual sem recorte/salto/queda de opacidade e retorno à aba. O cenário adicional observa um card inicialmente transparente e abaixo da posição final, exige vários frames intermediários de opacidade crescente e deslocamento decrescente, verifica ausência de escala e o término totalmente visível.

As asserções exigem variação das transformações em vários frames, além da existência de uma animação. A leitura respeita tanto ms quanto s nos tokens CSS. O caminho Início → menu do celular → Serviços também foi exercitado na própria prévia IPv4, preservando o foco na seção e a navegação. Capturas da matriz ficam disponíveis para inspeção; screenshots não substituem os testes do disparo e do tempo.

A regressão existente também verifica conteúdo sem JavaScript, links sociais e nomes acessíveis, hovers, tema, idioma, navegação, slide, toque, arrasto e partículas. Não há envio de mensagens ou abertura de conversas reais. Capturas da matriz ficam nos diretórios `page-motion-*` em `test-results/`, ignorados pelo Git.

## Resultado

Na entrega anterior, a suíte completa de 167 cenários passou. Após o novo pedido de entrada transparente de baixo para cima, tipos, lint, validação de conteúdo, dez testes Node, build e os 22 cenários de entradas passaram novamente. A suíte completa, agora com 168 cenários, não foi repetida nesse ajuste. As rotas continuam pré-geradas e as dependências não mudaram. Não há falhas pendentes nas verificações executadas.

## Limitações

Chromium com emulação de larguras, temas e toque. Safari, Firefox, dispositivos físicos e leitores de tela não foram executados. A avaliação visual do proprietário foi concluída com aprovação; ela não substitui essas verificações pendentes antes da publicação. Nesta consolidação documental, os scripts da aplicação não foram repetidos.
