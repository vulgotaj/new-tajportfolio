# Contato — F06

Revisado em 2026-10-25: contato por redes sociais e e-mail externo substitui o formulário e seus critérios anteriores. Decisão em [ADR-005](../adr/0005-contato-por-links.md).

## Objetivo e escopo confirmado

Permitir contato profissional pelos cinco canais escolhidos: LinkedIn, GitHub, e-mail, Instagram e WhatsApp. Não coletar nem enviar mensagens dentro do site. Composição em [design](../design.md); critérios comuns no [índice](README.md#critérios-transversais).

## Comportamento

- Exibir ícone e nome de cada canal, em linguagem adaptada ao idioma, com destinos fornecidos pelo proprietário. Distribuir os quatro canais em duas colunas simétricas, com ícone, rótulo e endereço alinhados ao centro. No celular, usar ícone de 28 px dentro de círculo de 64 px e rótulo de 16 px.
- LinkedIn, GitHub e Instagram encaminham ao perfil correto; WhatsApp encaminha à conversa do número autorizado, sem envio automático.
- E-mail usa `mailto:`; apresentar também o endereço para leitura/cópia quando fornecido. Um botão de copiar é melhoria opcional, não condição para acessar o contato.
- Links continuam funcionando sem JavaScript. Se abrirem outra aba, informar esse comportamento e proteger a relação com a janela de origem.
- Não incorporar feeds, chats ou widgets de terceiros só para representar os canais.

## Estados e exceções

- Nos estudos, nomes podem ocupar espaços identificados sem URL. Na publicação, não usar perfis fictícios, `href` vazio ou número de exemplo; renderizar somente os canais com destinos autorizados.
- Atualização de 2026-10-26: o proprietário forneceu LinkedIn, GitHub, e-mail e WhatsApp. Instagram ainda não existe e fica omitido, sem impedir a publicação dos outros quatro canais.
- Link externo indisponível não deve gerar confirmação de mensagem enviada. O site não controla login, disponibilidade ou entrega na plataforma.
- `mailto:` depende do aplicativo de e-mail configurado. Endereço legível oferece alternativa de cópia.
- Não afirmar prazo de resposta nem disponibilidade profissional sem conteúdo fornecido.

## Critérios de aceite

- **CO-01:** a seção apresenta os canais autorizados com nome e destino verificáveis; Instagram permanece omitido até existir perfil fornecido pelo proprietário.
- **CO-02:** teclado e leitor de tela identificam cada destino sem depender de reconhecer o ícone.
- **CO-03:** perfis usam protocolos/destinos permitidos; WhatsApp usa o número fornecido, sem enviar mensagem automaticamente.
- **CO-04:** e-mail abre o destino `mailto:` correto e o endereço pode ser lido/copiado manualmente; não há campos de mensagem.
- **CO-05:** os contatos permanecem utilizáveis sem JavaScript, nos dois temas e idiomas.
- **CO-06:** a troca de idioma/tema não muda os destinos dos canais; testes não disparam mensagens nem conversas reais.
- **CO-07:** não há endpoint, SDK ou segredo de envio de e-mail criado para esta feature.

## Implementação e pendências

A seção `#contact`, os quatro canais e o rodapé foram implementados em 2026-10-26. Os destinos ficam em `src/data/contacts.ts`, com validação de protocolos/domínios/perfis, e-mail e número internacional antes do build e da renderização. Instagram fica ausente dos dados, sem link inativo ou placeholder. A lista vazia omite a seção e seu acesso no header.

O número com DDD 21 foi publicado com DDI brasileiro +55, comunicado como pressuposto ao proprietário. E-mail fica legível e selecionável; o link abre o aplicativo de e-mail. Não foi adicionado botão de copiar nem envio de mensagem. Perfis/WhatsApp usam nova aba com aviso acessível e proteção da janela de origem. O acesso à seção fica na navegação; os links dos cards de serviços foram removidos por solicitação do proprietário.

O rodapé usa a marca aprovada, nome do perfil e link traduzido para voltar ao início. Tudo é composto no servidor, com navegação útil sem JavaScript, nos dois idiomas e temas. Verificações em [contato e rodapé](../contato-verificacao.md).

A única pendência de canal é Instagram, quando houver perfil. Não há provedor transacional, remetente ou rate limit de formulário a definir. A disponibilidade das plataformas e o envio pelo aplicativo escolhido permanecem externos ao site.
