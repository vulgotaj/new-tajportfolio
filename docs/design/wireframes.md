# Composição e estudos revisados

Revisão de 2026-10-25, substituindo a composição rejeitada. Os PNGs são estudos estáticos, não uma aplicação funcional. Aplicados: fotografias escolhidas, três projetos com imagens fornecidas, biografia provisória, dez tecnologias e seis serviços. Contatos permanecem sem destinos e o currículo está ausente.

## Hero conforme a referência

```text
marca              navegação                      idioma / tema

Olá, seja bem-vindo.                       espaço para imagem
FELIPE TAJIMA                              de apresentação
Desenvolvedor Full-Stack

ver projetos (currículo ainda indisponível)

                    indicação de projetos abaixo
```

- Hero de entrada em tela inteira, imponente, com nome dominante; não é o hero curto da proposta anterior.
- Texto à esquerda em bloco mais largo, nome em uma linha e função abaixo; imagem à direita no desktop. Boas-vindas curtas; sem faixa animada, badges ou lista de tecnologias abaixo da função.
- Não copiar planetas, kanji, biografia ou experiências de Nicolas. A foto escolhida é a do costão, com enquadramento da cintura para cima e menos céu; fonte e restrições em [fotografias](photos/README.md). Os [mockups atuais](photos/mockups/README.md) já mostram a foto nos dois temas, idiomas e três tamanhos.
- No tablet, adaptar as colunas ao espaço; no celular, texto e imagem empilhados. A altura mínima é a viewport, mas o conteúdo pode aumentar a seção sem cortes.
- Hero usa “Ver projetos” enquanto não houver currículo. Quando fornecido, o PDF poderá ter acesso direto conforme F07. Manter indicação de acesso aos projetos ao final; não prometer que os previews apareçam na primeira dobra.
- Header discreto com marca, links, idioma e tema. Em telas menores, menu expansível; controles não se sobrepõem ao nome.
- O [fundo de partículas](hero-backgrounds.md) foi escolhido pelo usuário. O campo passa também pela região do texto, sem máscara ou buraco vazio; opacidade baixa preserva a leitura. Animação futura continua opcional.

## Meus projetos

```text
título + contexto                          anterior / próximo

preview            preview            parte do próximo
título             título
descrição          descrição
tecnologias        tecnologias
ações              ações
```

- Slide horizontal como na captura fornecida: dois projetos legíveis no desktop e indicação parcial do próximo quando houver itens suficientes.
- Cada item agrupa visualmente imagem e conteúdo, mas não é um card com caixa externa: o fundo continua sendo o da página.
- Imagem com identidade do projeto; nome, contexto, contribuição, tecnologias e links abaixo, sempre legíveis sem hover.
- Previews seguem as fotos pessoais: cores originais por padrão e preto e branco no hover compatível, sem alterar o texto ou o layout. No celular/toque e sem hover, manter coloridos.
- Celular: um item principal e parte do próximo; toque/arrasto e controles explícitos. Não depender exclusivamente de gestos.
- Não usar autoplay. Com poucos projetos, adaptar controles e largura, evitando espaços vazios ou duplicação de itens.
- A apresentação não determina uma biblioteca. Estados e critérios em [F02](../features/projetos.md).

## Sobre mim

Preservar a organização anteriormente aceita como estrutura: texto e tecnologias junto de um retrato grande. Usar a foto na floresta conforme [fotografias](photos/README.md). Adaptar para Jost e a paleta monocromática, com detalhes pretos no claro e brancos no escuro. Sem porcentagens, barras ou níveis. Na versão estreita, texto, foto e tecnologias seguem uma leitura linear.

## Serviços freelance

Grupo de seis cards, com ícones monocromáticos distintos, título, descrição curta e acesso ao contato. Três colunas no desktop, duas no tablet quando houver espaço e uma no celular; preservar a ordem do conteúdo, com os serviços principais primeiro.

O [conteúdo vigente](../conteudo.md) define os três serviços principais e os três complementares incluídos no plano. Os seis cards e seus textos PT/EN já estão aplicados nas capturas atuais. A grade e as assinaturas visuais substituem a lista sem identidade da versão anterior.

## Vamos conversar

Chamada grande, breve convite e os cinco canais escolhidos: LinkedIn, GitHub, e-mail, Instagram e WhatsApp. Cada opção tem ícone e nome; o usuário não precisa reconhecer só o símbolo. Não há campos de mensagem, botão de envio ou estado de processamento.

Os perfis/endereços não foram fornecidos: os mockups mostram composição, não destinos funcionais. E-mail será `mailto:` e poderá ser apresentado para cópia; WhatsApp encaminha para a conversa do número autorizado. Critérios em [F06](../features/contato.md).

## Estudos gráficos

- [Hero escuro](hero-dark.png) e [hero claro](hero-light.png).
- [Comparação dos temas](direction.png).
- [Desktop completo](desktop.png), [tablet](tablet.png) e [celular](mobile.png).
- [Projetos, serviços e contato no tema escuro](sections-dark.png).
- [Galeria com conteúdo definido](photos/mockups/README.md): hero, Sobre mim e páginas completas por tamanho, tema e idioma; seções e posições inicial/final dos projetos para revisão.

As imagens reservadas são explícitas. As capturas não comprovam comportamento de slide, foco, responsividade em qualquer largura ou animação; verificar a implementação posteriormente.

## Revisão contra o pedido

O hero usa a viewport inteira e composição lateral da referência; a lista assimétrica de projetos foi substituída por slide; serviços passaram a cards; contato passou aos cinco canais. A fonte é a identificada, não uma alternativa aproximada. Branco e preto são fundos puros. Os princípios genéricos da skill não substituem essas escolhas explícitas do usuário.
