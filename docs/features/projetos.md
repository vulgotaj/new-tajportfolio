# Projetos — F02

## Objetivo e escopo confirmado

Usar projetos reais como evidência principal de capacidade técnica, perto do início do site, permitindo atualização frequente sem alterar componentes de apresentação.

Referências visuais estão em [design.md](../design.md). Critérios compartilhados estão no [índice](README.md#critérios-transversais).

## Conteúdo e comportamento propostos

| Informação | Regra |
| --- | --- |
| Identificador | Estável e compartilhado pelas traduções; não depende do título. |
| Título e resumo | Obrigatórios por idioma para itens publicados. |
| Problema, solução e contribuição pessoal | Obrigatórios no catálogo editorial publicado. A pedido do proprietário, não apresentar área expansível para esses campos; a interface mantém resumo e tecnologias. |
| Tecnologias | Lista de nomes, sem níveis de proficiência. |
| Imagem e descrição alternativa | Obrigatórias para publicação na apresentação visual proposta; descrição traduzida quando a imagem informar conteúdo. |
| Repositório e demonstração | Opcionais; mostrar somente destinos configurados e válidos. |
| Publicação, destaque e ordem | Dados explícitos para controlar visibilidade e apresentação. |

- Manter dados e textos fora dos componentes, conforme o [ADR-002](../adr/0002-conteudo-versionado.md); JSON, validação e leitor público foram implementados em `src/content/projects/`.
- Exibir itens publicados, com os destacados primeiro e ordem numérica crescente em cada grupo. Desempatar pelo identificador para manter ordem estável.
- Usar slide horizontal na página principal, conforme revisão explícita de 2026-10-25: preview e texto abaixo agrupados visualmente, sem caixa externa de card. Desktop comporta mais de um item e indicação do seguinte; celular/tablet centralizam um item com prévias laterais. Margens nos extremos permitem centralizar o primeiro e o último. Filtros, arquivo e páginas individuais continuam fora do escopo.
- Oferecer controles anterior/próximo, teclado e toque/arrasto, sem autoplay nem dependência exclusiva de gestos. Ocultar a barra de rolagem do slide, mantendo anterior/próximo como controles visíveis e preservando a rolagem nativa. As setas centralizam o projeto em celular/tablet, com o mesmo destino para teclado e restauração por fragmento. Com movimento reduzido, mudar posição sem deslocamento animado. Se houver apenas um item, não exibir controles inúteis nem duplicá-lo.
- Imagens e textos devem permitir entender o projeto sem abrir o repositório e sem depender de hover.
- As imagens seguem o padrão das fotos pessoais: cores originais inicialmente, preto e branco apenas em hover com ponteiro preciso, transição de 350 ms e troca imediata com movimento reduzido. No celular/toque e sem hover, permanecer coloridas. Aplicar o filtro apenas à imagem, preservando arquivos originais e acesso aos textos/ações; [regras visuais](../design/photos/README.md#preto-e-branco-e-interação).
- Diferenciar projeto individual, colaborativo ou acadêmico quando pertinente; descrever apenas a contribuição real do autor.
- Mudanças de conteúdo entram no site após nova geração e publicação.

## Estados e exceções

- Rascunhos não aparecem no site público.
- Conteúdo obrigatório inválido em item publicado deve falhar na validação antes da publicação, com indicação do projeto e campo. Rascunhos incompletos podem permanecer fora da geração pública.
- Traduções ausentes seguem [F04](idiomas.md); não misturar idiomas silenciosamente.
- Sem demonstração ou repositório, omitir a ação correspondente; não renderizar botões vazios.
- Uma imagem que falhar no navegador mantém o espaço previsto e a identificação textual do projeto.
- Uma coleção vazia não quebra a página e deve ser detectada na revisão de publicação. O lançamento depende de ao menos um projeto real publicado; não fabricar itens para preencher o layout.

## Critérios de aceite

- **PR-01:** adicionar um item válido e publicá-lo faz o projeto aparecer sem alteração nos componentes.
- **PR-02:** remover, despublicar, destacar ou reordenar itens altera a apresentação conforme os dados, sem efeitos sobre os demais conteúdos.
- **PR-03:** empates de ordem produzem resultado estável; rascunhos nunca aparecem na listagem pública.
- **PR-04:** cada item publicado mantém problema, solução e contribuição validados no catálogo; a interface comunica resumo e tecnologias, sem a área “Sobre o projeto”. Links ausentes não geram ações sem destino.
- **PR-05:** conteúdo obrigatório inválido é identificado antes da publicação; um link com formato válido não é tratado como prova de que o destino está disponível.
- **PR-06:** todos os projetos e suas ações são acessíveis por toque e teclado, sem exigir hover ou arrasto.
- **PR-07:** trocar de idioma preserva a identidade dos projetos e usa seu conteúdo traduzido conforme F04.
- **PR-08:** a listagem é um slide com imagem e conteúdo aberto, sem card externo; a página não ganha rolagem horizontal acidental.
- **PR-09:** anterior/próximo, teclado e toque acessam todos os itens; a rolagem vertical continua disponível e não há autoplay.
- **PR-10:** início/fim e quantidades reduzidas têm controles coerentes; mudança de dados/idioma não deixa foco ou posição em item inexistente.

## Pendências

Implementado em 2026-10-30: pizzaUP e BarberHub são o quarto e quinto itens, ambos “Em desenvolvimento” / “In development”, com imagens e textos aprovados. O [registro de implementação](../projetos-implementacao.md) preserva os dados e a confirmação de contribuição: autoria integral de pizzaUP e colaboração no BarberHub com atuação no frontend, backend e integrações. `developmentStatus` é opcional, validado e propagado pelo leitor; permanece separado de visibilidade editorial e verificação de demo. Somente esses dois recebem o rótulo, e suas ações apresentam GitHub sem demo. Resultados na [verificação atual](../projetos-desenvolvimento-verificacao.md).

Implementado em 2026-10-26: DevControle, Fast Motors e Today Movies nessa ordem, com contribuição completa confirmada pelo proprietário nesta conversa. Problema e solução derivam das descrições existentes, sem acrescentar funcionalidades. O leitor valida, filtra rascunhos, ordena e entrega somente campos públicos traduzidos; imagens originais foram promovidas sem edição para `public/projects/`.

O slide usa Scroll Snap e controles locais, com teclado, toque, arrasto com mouse e movimento reduzido, sem autoplay ou biblioteca. A área “Sobre o projeto” foi removida por solicitação do proprietário em 2026-10-26, preservando os dados editoriais. GitHub usa ícone e contorno; “Ver projeto” é a ação preenchida com ícone de acesso externo. Ambas têm alvos de pelo menos 44 px e nomes acessíveis com projeto e aviso de nova aba. Os fragmentos `#project-{id}` mantêm a referência entre idiomas; ausência de coleção omite seção/CTA, e coleções pequenas não têm controles inúteis. Decisão no [ADR-007](../adr/0007-slide-nativo-de-projetos.md); resultados em [verificação de projetos](../projetos-verificacao.md).

Demonstrações verificadas em 2026-10-26: os três destinos responderam HTTP 200 e renderizaram o conteúdo esperado no Chromium. O catálogo usa `demoStatus: verified` e exibe as três ações. A consulta não cobre todos os fluxos internos dos aplicativos nem garante disponibilidade futura. Novos destinos sem verificação continuam omitidos. Repositórios usam os links fornecidos, sem testes que naveguem a conversas ou enviem mensagens.
