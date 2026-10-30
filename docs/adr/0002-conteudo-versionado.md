# ADR-002 — Conteúdo versionado

- Status: aceito. Formato e validação concretizados na fundação pelo [ADR-006](0006-fundacao-tecnica.md).
- Data: 2026-10-24.
- Origem: requisito de atualizar projetos com frequência e direção de manter conteúdo no repositório, separadamente dos componentes.

## Contexto

Projetos são o principal conteúdo do portfólio e devem mudar sem alterar a interface. Não há necessidade identificada de equipe editorial, atualização em tempo real ou administração pelo navegador.

## Decisão

Manter conteúdo público no repositório e lê-lo diretamente durante a geração das páginas. Separar catálogo/textos, traduções e apresentação. Uma função de leitura prepara os dados esperados pelos componentes, sem oferecer uma API própria apenas para acessar arquivos locais.

Validar conteúdo publicado antes de gerar a publicação. Os dados e regras funcionais necessários estão em [F02](../features/projetos.md); não reproduzir seu schema neste registro.

Não decidir aqui entre arquivos TypeScript, JSON ou Markdown. A escolha deverá considerar o catálogo real e a necessidade de texto formatado. MDX ou um compilador de conteúdo adicional só se justificam por uma necessidade concreta de conteúdo executável ou rico.

Atualização de 2026-10-25: a escolha concreta foi registrada no ADR-006. O parágrafo anterior preserva o contexto da decisão inicial; não é mais uma pendência da fundação.

## Alternativas consideradas

- **Conteúdo embutido em JSX:** simples no primeiro item, mas acopla manutenção editorial a componentes.
- **CMS:** adiciona operação, integração e dependência externa sem requisito editorial atual.
- **Banco e API de projetos:** introduzem infraestrutura que não melhora o fluxo inicial de edição pelo proprietário.

## Consequências

- Histórico e revisão de conteúdo acompanham o código; alterações dependem de publicação.
- O responsável precisa usar o fluxo do repositório, diretamente ou com assistência.
- Rascunhos não podem vazar para props do cliente ou artefatos públicos; a filtragem acontece antes da composição pública.
- Conteúdo inválido deve produzir diagnóstico de item/campo, sem exigir depuração de componentes.
- A identidade dos projetos precisa ser estável entre idiomas, independentemente do formato escolhido.

## Revisão

Reavaliar CMS quando edição fora do Git ou múltiplos editores se tornarem necessidades reais. Registrar o formato concreto na fundação, preservando esta decisão de separação e anotando suas consequências, sem criar loaders genéricos para formatos não utilizados.
