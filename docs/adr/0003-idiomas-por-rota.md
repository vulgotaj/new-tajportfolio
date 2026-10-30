# ADR-003 — Idiomas por rota

- Status: adotado na fundação em 2026-10-25, conforme o pedido de seguir a política documentada e resolver escolhas rotineiras.
- Data: 2026-10-24.
- Origem: requisito de troca de idioma e organização alvo `src/app/[lang]/` no contrato operacional.

## Contexto

As duas versões precisam ser compartilháveis, indexáveis e consistentes sem duplicar a implementação visual. A feature [F04](../features/idiomas.md) já propõe comportamento de navegação e tradução; seus detalhes de produto ainda não foram explicitamente confirmados.

## Decisão implementada na fundação

Usar `/pt/` e `/en/` como endereços públicos, resolvidos pelo segmento `[lang]`, com layouts/componentes compartilhados. Usar traduções locais tipadas e conteúdo associado por identificador estável. Gerar antecipadamente as versões suportadas e rejeitar idiomas não suportados.

Manter a URL como fonte de verdade para o idioma. Não detectar geolocalização nem exigir cookie para escolher o conteúdo inicial. Adotar português como padrão da raiz e bloquear build por tradução obrigatória ausente. Essas escolhas eram propostas de F04 e foram adotadas nesta entrega; sem fallback silencioso entre idiomas.

Usar resolução direta com dicionários JSON tipados, sem biblioteca de internacionalização. Uma dependência só se justifica por necessidades como formatação complexa ou mensagens que a solução simples não atenda. O layout raiz está em `[lang]` para gerar o atributo `lang` correto no HTML inicial. Metadados são traduzidos; canônicos e alternativos usam destinos relativos até existir domínio autorizado.

Os links de idioma têm destino real sem JavaScript. Com JavaScript preservam caminho, query e âncora estável. A apresentação usa `#intro` e mantém `#foundation` como compatibilidade. Projetos usam `#projects` e `#project-{id}`, restaurando a posição horizontal conforme o ADR-007; Sobre mim usa `#about`, serviços usa `#services` e contato usa `#contact`, preservados entre idiomas; seções futuras deverão manter identificadores equivalentes. Navegação completa entre idiomas é aceitável nesta etapa; tema persiste por armazenamento local. Abertura continua fora da implementação atual.

## Alternativas consideradas

- **Trocar apenas texto no cliente, mantendo uma URL única:** dificulta compartilhar a versão pretendida e exige resolver o estado do idioma no navegador.
- **Duplicar páginas e componentes por idioma:** facilita o início, mas favorece divergência de layout e manutenção duplicada.
- **Determinar idioma por cookie em toda requisição:** adiciona dependência de estado sem necessidade para URLs explícitas.

## Consequências e pontos a validar

- Traduções e metadados podem ser preparados durante o build; conteúdo técnico não deve chegar ao visitante como chave de tradução.
- Idioma correto no HTML inicial, destinos por seção e histórico do navegador precisam ser verificados na fundação.
- Trocar o segmento pode remontar partes da árvore ou causar navegação completa, conforme os layouts. Conferir a preservação de tema e seção e a política de repetição da abertura; não presumir persistência de um layout.
- Não converter toda a página em cliente para contornar a organização das traduções. Após a revisão de contato de 2026-10-25, não há rascunho de mensagem para preservar.

## Condição para aceitar ou revisar

A fundação adota padrão e validação acima e verifica o fluxo aplicável a ID-01 a ID-06. A preservação de cada seção futura exige verificar seus identificadores e navegação quando forem implementados; não declarar cobertura de seções ainda inexistentes. Reavaliar a solução se surgirem idiomas adicionais ou formatação complexa.

## Referência técnica

- [Geração antecipada de parâmetros de rota](https://nextjs.org/docs/app/api-reference/functions/generate-static-params).
