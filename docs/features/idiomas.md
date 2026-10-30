# Idiomas — F04

## Objetivo e escopo confirmado

Permitir navegar no portfólio em português e inglês. Incluir conteúdo, controles, metadados, descrições alternativas e mensagens dos fluxos. A identidade da marca não é traduzida.

Critérios compartilhados estão no [índice](README.md#critérios-transversais). A proposta de organização técnica está no [ADR-003](../adr/0003-idiomas-por-rota.md).

Fundação de 2026-10-25: política abaixo adotada para a página mínima, conforme atualização do ADR-003. Rotas, padrão PT, traduções obrigatórias, metadados e troca com preservação de tema/âncora foram implementados. A preservação de seções do portfólio depende de sua implementação futura.

Estado em 2026-10-26: a preservação de seção e posição do projeto também foi implementada e verificada nas seções atuais, incluindo recarga e histórico. A abertura compartilha a sessão da aba entre idiomas e não reinicia na troca; ver [verificação da abertura](../abertura-verificacao.md) e [estado consolidado](../estado-atual.md).

## Comportamento proposto

- Usar páginas públicas em `/pt/` e `/en/`, com português brasileiro para `pt`. A URL determina o idioma exibido e pode ser compartilhada diretamente.
- Adotar português como idioma padrão de `/`, encaminhando para `/pt/` e preservando uma âncora válida. Não detectar idioma automaticamente pela localização do visitante nesta versão.
- O seletor identifica claramente Português e English e informa o idioma atual; não usar apenas bandeiras.
- A troca leva à seção equivalente no outro idioma e mantém o tema. Não reproduzir a abertura nem forçar retorno ao hero.
- A navegação voltar/avançar restaura o idioma indicado na URL. Não manter uma preferência de idioma em armazenamento que contradiga uma URL explícita.
- Traduzir também controles/posições do slide, mensagens de navegação, download, nomes de ações de contato e recursos de acessibilidade, não somente textos de seções. Não há estados de envio de mensagem no escopo atual.
- Cada versão declara o idioma do documento, metadados próprios, endereço canônico e referências às versões equivalentes para indexação.
- Textos equivalentes podem ser adaptados para soar naturais; dados e promessas profissionais permanecem consistentes.

## Estados e exceções

- Proposta para traduções ausentes: bloquear publicação de conteúdo obrigatório incompleto e indicar a chave ou item faltante. Rascunhos de projetos podem continuar incompletos e não publicados.
- Não publicar chaves técnicas de tradução nem preencher texto inglês silenciosamente com português ou vice-versa.
- Idiomas fora de `pt` e `en` não são aceitos como páginas válidas; usar resposta de página não encontrada, sem lançar erro interno.
- Sem JavaScript, links explícitos continuam permitindo mudar de idioma. A preservação da posição exige apenas um destino válido de seção.
- Download de currículo segue a disponibilidade descrita em [F07](curriculo.md), sem apresentar arquivo de um idioma como se fosse de outro.

## Critérios de aceite

- **ID-01:** abrir diretamente `/pt/` ou `/en/` apresenta a versão correta sem depender de visita anterior.
- **ID-02:** a raiz segue o padrão proposto e um código de idioma desconhecido não é tratado como conteúdo válido.
- **ID-03:** a troca preserva seção equivalente e tema; voltar/avançar respeita a URL.
- **ID-04:** textos visíveis, acessíveis e metadados usam o idioma correspondente; não aparecem chaves nem traduções misturadas por fallback silencioso.
- **ID-05:** a validação detecta tradução obrigatória ausente antes da publicação.
- **ID-06:** o seletor funciona com teclado, toque e sem JavaScript; o layout tolera diferenças de comprimento dos textos.

## Fora do escopo e pendências

Não inclui tradução automática, outros idiomas ou geolocalização. Português como padrão e bloqueio por tradução obrigatória ausente foram adotados na fundação. Faltam os textos revisados e a verificação das futuras seções nos dois idiomas.
