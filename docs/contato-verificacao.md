# Verificação de contato e rodapé

Data: 2026-10-26. Entrega de F06 e rodapé, seguindo os mockups finais e os quatro destinos fornecidos pelo proprietário nesta conversa. A revisão posterior retirou os links dos serviços; contato continua acessível na navegação.

## Entrega e pressuposto

`#contact` apresenta LinkedIn, GitHub, e-mail e WhatsApp com ícone e nome, em PT/EN. O endereço de e-mail é legível/selecionável, com `mailto:` sem parâmetros. Perfis e WhatsApp usam HTTPS e nova aba, com aviso no nome acessível e `noopener noreferrer`. Instagram fica omitido porque o proprietário ainda não tem perfil.

Destinos e fonte estão em `src/data/contacts.ts` e no editorial. O número informado foi `21 982076692`; adotou-se o DDI brasileiro +55, comunicado ao proprietário, resultando em `https://wa.me/5521982076692`. O formato segue a [documentação oficial do WhatsApp](https://faq.whatsapp.com/5913398998672934), sem texto preenchido ou envio automático.

Contato e rodapé são Server Components. O header inclui contato; os seis serviços mostram somente ícones e textos, sem links internos. Uma lista de contatos vazia omite a seção e seu acesso no header. `lib/contacts.ts` valida no build e na leitura protocolos, domínios/perfis, canais únicos, e-mail e número internacional, rejeitando credenciais, portas e parâmetros. Não há formulário, API, SDK, autenticação, segredo ou coleta de dados.

O rodapé preserva os SVGs da marca, nome do perfil e composição dos mockups, com link acessível “Voltar ao início” / “Back to top”. As imagens dentro desse link são decorativas para evitar repetição do nome; a marca do header mantém seu nome acessível. Por revisão do proprietário, logo e nome ficam alinhados horizontalmente em todas as larguras, com espaço entre eles. Com texto ampliado, o nome pode quebrar dentro do espaço disponível sem sobreposição da marca.

## Revisão dos ícones

Em 2026-10-26, a pedido do proprietário, os desenhos manuais foram substituídos por `react-icons@5.7.0`, família Bootstrap Icons (`react-icons/bs`), nos contatos, serviços, projetos, menu, tema e setas. Contatos usam símbolos próprios das plataformas. Mantidos tamanhos explícitos, cores dos tokens, rótulos nos links/botões e SVGs decorativos ocultos da leitura acessível. Nenhuma seção foi convertida em Client Component para usar a biblioteca. Marca TAJ, fotos e partículas foram preservadas.

A versão foi fixada no manifesto/lockfile e seus peers foram conferidos com React 19.3.1. Licenças de React Icons e Bootstrap Icons estão em `public/licenses/react-icons.txt`; imports seguem a [documentação oficial](https://github.com/react-icons/react-icons) e a família usa [licença MIT](https://react-icons.github.io/react-icons/icons/bs/). Tipos, lint, 10 testes de conteúdo, build e 90 testes de navegador foram reexecutados; a matriz visual também cobre os novos símbolos.

## Revisão responsiva

Em 2026-10-26, a pedido do proprietário, o texto do hero foi centralizado no celular. O slide passou a centralizar cada projeto por botões/teclado em celular/tablet, com margens nos extremos e o mesmo cálculo para restauração de idioma, recarga e resize. O desktop mantém múltiplos itens visíveis com alinhamento inicial.

Os quatro contatos agora usam duas colunas simétricas, com ícone/rótulo/endereço alinhados ao centro. No celular, os círculos têm 64 px, os símbolos 28 px e os rótulos 16 px; tablet/desktop mantêm símbolos de 24 px e rótulos de 18 px. A grade tem largura máxima de 512 px e permanece centralizada no espaço disponível. Os links, nomes acessíveis e destinos permanecem iguais.

Os cenários existentes verificam centralização do nome, geometria da grade e três posições do slide, nos dois idiomas/temas. Um cenário adicional verifica rolagem suave, resize entre 390/430/768 px e recarga com o projeto centralizado. As regressões anteriores da seta e da navegação continuam cobertas.

## Refino de hover e foco

Em 2026-10-26, ações e controles receberam inversão de cores e resposta curta de 180 ms. Navegação/menus usam fundo preenchido e contatos destacam o círculo do ícone. Por refinamento do proprietário, esse hover depende do ponteiro sobre o ícone ou os textos do contato, sem reagir às laterais vazias do link na grade; foco por teclado permanece. Fotografias preservam o efeito aprovado. Os cenários verificam contraste dos estados, foco equivalente por teclado, ausência de reação nos botões desabilitados, movimento reduzido e ausência de hover persistente no toque. A matriz de contato cobre espaço vazio, ícone e rótulo nas três larguras, temas e idiomas. Os testes não acionam contatos externos.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| Tipos e lint | `npm run typecheck` e `npm run lint` passaram, sem avisos do lint. |
| Conteúdo | `npm test`: 10 testes passaram, incluindo destinos autorizados, domínio falso, protocolo executável, credenciais, duplicação e injeção/parâmetros em e-mail e WhatsApp. |
| Build | `npm run build` passou, com PT/EN pré-gerados; três projetos, seis serviços e quatro contatos validados. |
| Navegador | No ajuste da área de hover, 21 testes de contato/interações passaram. Após a entrega posterior das partículas com Motion, `npm run test:e2e` passou com 123 testes Chromium, incluindo a regressão da área de hover e os 15 novos cenários de partículas. |
| Visual | Contato e rodapé em PT/EN × claro/escuro × 360/768/1440 px, sem transbordamento horizontal. Os seis cards mantêm somente ícones e textos, sem ações. |
| Teclado | Menu, âncoras, quatro canais e retorno ao início têm ordem útil e foco visível; a navegação alcança `#contact` e os serviços não têm ações redundantes. |
| Idioma/tema | Query, seção, tema escolhido e histórico preservados; destinos não mudam com idioma. |
| Sem JavaScript/ampliação | Contatos e rodapé continuam úteis em ambos os idiomas, com texto a 200% em 320 px. |
| Preservação | Originais e alterações anteriores preservados; a revisão adicionou somente a dependência React Icons, sem alterar as versões existentes. Capturas/traces em `test-results/`, ignorados pelo Git. |

## Limites

Os testes conferem hrefs, nomes acessíveis, foco e destinos internos. Não clicam em `mailto:` nem WhatsApp, não abrem conversas e não enviam mensagens. O perfil GitHub pôde ser consultado; a ferramenta de consulta não confirmou a disponibilidade do LinkedIn, cujo URL foi mantido exatamente como fornecido. Não foi verificada a titularidade ou a recepção de mensagens por e-mail/WhatsApp.

Não foram executados Firefox, Safari, leitores de tela ou dispositivos físicos; Chromium foi usado com movimento reduzido na matriz. A ampliação modifica o tamanho base do texto, sem cobrir todos os modos de zoom. Instagram, currículo, abertura e domínio/hospedagem permanecem para etapas futuras. Motion foi definido posteriormente para a abertura e já controla as partículas do hero conforme [ADR-008](adr/0008-motion-e-particulas.md). A verificação desta entrega não constitui publicação em um domínio público.
