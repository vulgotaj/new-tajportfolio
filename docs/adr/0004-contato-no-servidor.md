# ADR-004 — Contato no servidor

- Status: substituído pelo [ADR-005](0005-contato-por-links.md) em 2026-10-25. Preservado apenas como histórico; não implementar esta decisão.
- Data: 2026-10-24.
- Origem: envio de mensagens por e-mail e direção de usar Route Handler com integração privada isolada, consolidada no contrato operacional.

## Contexto

Revisão: o usuário retirou o formulário e escolheu contato por redes sociais e link de e-mail. As seções abaixo descrevem a decisão anterior, não a arquitetura vigente.

Mensagens precisam ser validadas e enviadas sem expor credenciais no navegador. O fluxo deve tratar indisponibilidade de terceiros sem impedir o acesso ao portfólio. Os estados e limites propostos pertencem a [F06](../features/contato.md).

## Decisão

Processar solicitações em `POST /api/contact` dentro da aplicação Next.js. O Route Handler valida a entrada, aplica a política de abuso e responde com resultados públicos. Um módulo privado em `src/lib/server/` concentra a integração do provedor de e-mail.

Manter a integração concreta substituível nos testes, sem criar uma hierarquia de interfaces, container de injeção ou suporte a vários provedores antes de precisar. Não armazenar mensagens em banco no escopo inicial.

Executar o endpoint em ambiente compatível com o Next.js e o provedor escolhido. Páginas pré-geradas não eliminam essa necessidade: uma exportação estática não executa o processamento de POST. Provedor, runtime e hospedagem não são escolhidos neste registro.

## Alternativas consideradas

- **Somente `mailto:`:** continua útil como alternativa, mas não atende o fluxo proposto de envio dentro do site.
- **SDK com segredo no navegador:** expõe credenciais e não estabelece uma fronteira confiável de validação.
- **Backend separado:** possível, porém adiciona implantação e contrato entre sistemas sem benefício atual.
- **Server Action:** alternativa válida no Next.js; o Route Handler mantém um contrato HTTP explícito e corresponde à direção já definida.

## Consequências

- O build e a leitura do site não dependem de disponibilidade do serviço de e-mail.
- Antes de publicar o endpoint, escolher serviço, remetente, destinatário, timeout, proteção contra abuso e tratamento operacional de falhas.
- Testes substituem o provedor; verificam aceitação, rejeição e resposta inconclusiva sem enviar e-mail real.
- A aceitação do envio não confirma entrega final; timeout não comprova ausência de envio. Não prometer exatamente uma entrega por solicitação sem suporte real à deduplicação.
- Segurança e tratamento de dados seguem o [contrato operacional](../../AGENTS.md#segurança), sem duplicar suas regras aqui.

## Revisão

Reavaliar persistência ou processamento assíncrono somente se houver requisito de rastreabilidade, volume ou confiabilidade que o fluxo simples não consiga atender. A escolha do fornecedor terá ADR próprio quando houver proposta concreta.

## Referências técnicas

- [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers).
- [Limites da exportação estática](https://nextjs.org/docs/app/guides/static-exports).
