# Direção visual

Esta direção substitui o estudo inicial rejeitado. Os requisitos visuais explícitos abaixo prevalecem sobre escolhas anteriores do agente. Os PNGs vinculados são referências aprovadas. Em 2026-10-26, a aplicação possui tokens, Jost local, lettering aprovado, header, hero, slide de projetos, Sobre mim, serviços, contato, rodapé e abertura. Motion controla as partículas com pausa e movimento reduzido ([ADR-008](adr/0008-motion-e-particulas.md)) e a abertura curta por sessão da aba, com os mesmos paths e cores aprovados ([ADR-009](adr/0009-abertura-por-sessao.md)).

## Direção vigente

| Área | Direção solicitada |
| --- | --- |
| Hero | Tela inteira, nome em uma linha nas telas amplas, função abaixo e imagem ao lado. Texto centralizado no celular. Partículas contínuas também atrás da região de texto. Sem lista de tecnologias abaixo da função. |
| Projetos | Slide horizontal inspirado em Nicolas Yamada; preview com texto abaixo, sobre o fundo da página, sem card externo envolvendo tudo. Itens centralizados pelas setas em celular/tablet, inclusive nos extremos. |
| Sobre mim | Preservar organização de texto, fotografia e tecnologias, adaptada à linguagem visual. Sem níveis ou porcentagens. |
| Serviços | Título “Serviços” / “Services” e cards com identidade, ícone, título e descrição, sem links internos. |
| Contato | Canais autorizados em duas colunas equilibradas, com ícones e textos centralizados; ícones maiores e rótulos menores no celular. Instagram omitido até existir perfil. Sem formulário de mensagem. |
| Fonte | Jost na interface, identificada na referência de Frans; marca com lettering vetorial próprio. |
| Cor | Direção monocromática: fundo branco puro no claro e preto puro no escuro. Logo e detalhes pretos no claro e brancos no escuro; cinzas neutros para hierarquia e superfícies. |

## Estudos revisados

- [Tokens e tipografia](design/tokens.md).
- [Lettering TAJ em SVG](design/lettering.md): desenho próprio, variações de tema e aplicação em escala.
- A versão atual da logo foi aprovada pelo usuário após o refinamento de espaçamento.
- [Fotografias escolhidas](design/photos/README.md): costão para o hero e floresta para Sobre mim, usando as versões v2 sem correções de iluminação solicitadas. Aplicadas nos [mockups revisados](design/photos/mockups/README.md), nos dois idiomas, temas e três tamanhos de tela.
- Fotos pessoais e imagens dos projetos coloridas por padrão em todas as telas, com preto e branco apenas no hover compatível. No celular/toque, manter coloridas. [Regras atuais](design/photos/README.md#preto-e-branco-e-interação); os mockups preservam o sentido anterior do efeito.
- Por revisão explícita do proprietário em 2026-10-26, os ícones manuais da aplicação foram substituídos por Bootstrap Icons via React Icons: marcas nos contatos e GitHub dos projetos, ícones de serviços e controles de navegação/tema. Mantidos os tamanhos, nomes acessíveis e cores; o lettering TAJ e as partículas preservam seus SVGs originais.
- Ícones, contornos de destaque, foco, indicadores e partículas seguem a inversão preto/branco da logo. O acento azul foi removido; [tokens vigentes](design/tokens.md).
- [Composição e wireframes](design/wireframes.md), com versões desktop, tablet e celular.
- [Storyboard e movimento](design/motion.md).
- [Contraste dos tokens](design/contrast.md).
- [Fundo de partículas do hero](design/hero-backgrounds.md): direção escolhida, campo contínuo e composição horizontal revisada; movimento futuro ainda opcional.
- [Mockups com conteúdo definido](design/photos/mockups/README.md): três projetos com imagens fornecidas, biografia, tecnologias, seis serviços e estado sem currículo ou destinos sociais.

![Hero revisado no tema escuro](design/hero-dark.png)

[Ver hero claro](design/hero-light.png), [desktop completo](design/desktop.png), [tablet](design/tablet.png) e [celular](design/mobile.png).

## Referências e aplicação

| Referência | Aplicação |
| --- | --- |
| [Nicolas Yamada](https://www.nicyamada.com/) e capturas fornecidas | Escala e ocupação do hero, espaço visual lateral, header, entrada animada e slide de projetos. Não replicar sua biografia, marcas ou tecnologias. |
| [Frans Achmad](https://www.frans.my.id/) e captura fornecida | Jost em escala grande, pesos contrastantes e linguagem tipográfica. A fonte foi identificada no CSS e o título “Front End Developer” é um h3 que herda Jost do body. |
| [Kuon Yagi](https://kuon-yagi-portfolio.netlify.app/about) | Estrutura de texto e fotografia do sobre mim; adaptar tecnologias sem indicadores de proficiência. |
| [Alvalens](https://www.alvalens.my.id/#contact) | Convite de contato e canais profissionais; os cinco canais foram escolhidos pelo usuário. |

As imagens anexadas são referências visuais. Barras do navegador, favoritos, nomes, experiências e projetos de terceiros presentes nelas não fazem parte do conteúdo do portfólio TAJ.

## Identidade confirmada

- Logo `<TAJ/>` segue a referência e os ajustes fornecidos pelo usuário: traço fino, geometria técnica, T próximo do A e espaçamento aprovado. Todas as letras e símbolos ficam em preto puro no tema claro e branco puro no escuro, inclusive na abertura. Não usar gradiente. O [lettering](design/lettering.md) registra o SVG vigente.
- Abertura `</>` → `<TAJ/>` suave, antes da entrada na página; critérios em [F08](features/abertura.md).
- Jost para a interface; paths próprios para a marca. Pesos e escala da interface estão em tokens, e o desenho da marca está no SVG mestre; a execução visual segue aberta a refinamentos do usuário.
- Nome de apresentação adotado no estudo: Felipe Tajima. Função confirmada: Desenvolvedor Full-Stack.

## Estrutura vigente

```text
Header: marca + navegação + idioma + tema
Hero de entrada em tela inteira: texto à esquerda / imagem à direita
Meus projetos: slide horizontal de previews e conteúdo aberto
Sobre mim: texto + fotografia + tecnologias
Serviços: grupo de cards
Vamos conversar: canais sociais e e-mail
Rodapé
```

Projetos continuam sendo a primeira seção após o hero, mesmo que seu conteúdo comece abaixo da primeira tela. Não reduzir o hero para forçar projetos na primeira dobra. Em telas pequenas, acomodar imagem e texto sem cortes, permitindo que a altura cresça se necessário.

## Refino de interação

Hover e foco das ações/controles usam inversão de cores; navegação e menus ganham fundo preenchido. Os ícones de contato recebem destaque no círculo, com elevação/escala discretas. Transições CSS de 180 ms respeitam movimento reduzido e capacidades de entrada, sem hover persistente no toque. Contraste preto/branco e foco visível permanecem. Detalhes em [tokens](design/tokens.md#estados-de-interação) e [movimento](design/motion.md#refino-de-hover-implementado).

## Pendências reais

O [conteúdo editorial vigente](conteudo.md) está aplicado aos mockups, incluindo os três projetos e seis serviços. A contribuição completa dos projetos foi confirmada e o slide real implementado; as três demonstrações foram verificadas em 2026-10-26 e têm acesso direto. Sobre mim aplica a foto da floresta v2, biografia PT/EN e dez tecnologias dos mockups, com foto lateral no desktop e conteúdo empilhado em telas estreitas. Os seis serviços usam cards com ícones lineares, superfície neutra, contorno e grade de três/duas/uma colunas, com acesso real no header. Por revisão do proprietário, os cards não têm links “Conversar”; o contato é acessível pela navegação e segue os mockups com ícone e nome por canal: LinkedIn, GitHub, e-mail e WhatsApp. O endereço de e-mail fica legível; Instagram é omitido porque o proprietário ainda não tem perfil. O rodapé segue os mockups, com linha discreta, marca à esquerda e nome; logo e nome ficam na mesma linha também no celular, com espaço entre eles. A marca dá acesso ao início com rótulo traduzido. Biografia/tecnologias seguem abertas a refinamento, currículo continua ausente. O hero tem CTA/indicação reais para projetos, com texto e seta inteiros nas alturas reduzidas verificadas; a foto de desktop mantém proporção ao se ajustar à altura disponível; o header tem menu estreito com os destinos existentes. Projetos mantêm preview e texto abertos, sem card externo, e ações GitHub com ícone/contorno e “Ver projeto” preenchida com ícone de acesso externo. A área “Sobre o projeto” foi removida por solicitação do proprietário; os dados editoriais foram preservados. Não há links para seções inexistentes nem placeholders de contato.

Biblioteca de animações continua pendente. O contato por links remove a necessidade anterior de endpoint, provedor e credenciais de envio; decisão em [ADR-005](adr/0005-contato-por-links.md).
