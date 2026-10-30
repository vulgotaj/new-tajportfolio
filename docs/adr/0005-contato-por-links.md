# ADR-005 — Contato por links

- Status: aceito.
- Data: 2026-10-25.
- Substitui: [ADR-004](0004-contato-no-servidor.md).
- Origem: retirada explícita do formulário pelo usuário e escolha de LinkedIn, GitHub, e-mail, Instagram e WhatsApp.

## Contexto

O contato passa a encaminhar o visitante aos canais do proprietário. O site não recebe nem envia o conteúdo de mensagens. As regras funcionais estão em [F06](../features/contato.md).

## Decisão

Renderizar links públicos a partir de dados versionados, com nomes acessíveis e destinos fornecidos pelo proprietário. Usar links HTTPS para os perfis/conversa e `mailto:` para e-mail.

Remover do escopo Route Handler de contato, SDK de e-mail, credenciais de envio, validação de mensagens, controle de frequência e estado de rascunho. Não criar essas estruturas na fundação.

## Alternativas consideradas

- **Formulário com serviço de e-mail:** direção anterior, substituída pelo usuário.
- **Widgets de redes sociais incorporados:** desnecessários para encaminhamento e acrescentam scripts externos.
- **Links simples:** atendem a necessidade com menos dependências; direção escolhida.

## Consequências

- Contato não exige backend nem provedor transacional; uma publicação estática torna-se candidata, sujeita às demais necessidades do Next.js.
- O visitante usa a plataforma escolhida para conversar. `mailto:` depende de aplicativo/serviço de e-mail configurado; exibir o endereço e permitir copiá-lo quando fornecido.
- Testes verificam dados e navegação sem enviar mensagens ou abrir conversas reais.
- Destinos de LinkedIn, GitHub, e-mail e WhatsApp foram fornecidos pelo proprietário em 2026-10-26 e estão em `src/data/contacts.ts`. Instagram permanece omitido enquanto não houver perfil. Para o número com DDD 21, foi assumido e comunicado o DDI brasileiro +55. A validação restringe protocolo/domínio/formato e rejeita credenciais e parâmetros; não confirma entrega ou disponibilidade das plataformas. Não usar links fictícios nos artefatos publicados.

## Revisão

Reavaliar somente se o usuário solicitar novamente recebimento de mensagens dentro do site. Nesse caso, uma nova decisão deve justificar a infraestrutura.
