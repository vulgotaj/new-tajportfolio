# Sobre mim e serviços — F03

## Objetivo e escopo confirmado

Apresentar a pessoa por trás dos projetos, com texto, boa fotografia e tecnologias que utiliza, apoiando oportunidades de contratação e freelance. A seção de tecnologias não deve usar porcentagens ou níveis.

A organização visual segue [design.md](../design.md). Critérios compartilhados estão no [índice](README.md#critérios-transversais).

A biografia PT/EN e a lista de tecnologias têm uma [versão editorial provisória](../conteudo.md), criada a pedido do proprietário. O plano de serviços inclui seis ofertas: sites institucionais, lojas virtuais, sistemas/dashboards, landing pages, redesign/modernização e manutenção/evolução. As três primeiras são o foco principal; as complementares também foram confirmadas para o plano.

## Comportamento proposto

- A biografia descreve trajetória, interesses, foco atual e maneira de trabalhar em texto objetivo. Não apresentar projetos pessoais como vínculos empregatícios.
- Usar fotografia própria com descrição alternativa apropriada e enquadramento que preserve a apresentação pessoal em telas menores.
- Mostrar tecnologias por nome, com ícones opcionais. Agrupar apenas se isso facilitar a leitura; não usar estrelas, escalas, barras ou rótulos como básico/intermediário/avançado.
- Relacionar competências com projetos reais quando houver ligação útil, sem transformar toda tecnologia em link obrigatório.
- Apresentar serviços freelance em um grupo de cards com identidade visual: ícone/assinatura, nome da oferta, problema atendido e descrição curta, sem links nos cards conforme revisão do proprietário. A revisão de 2026-10-25 substitui a apresentação em lista.
- Adaptar a grade para três/duas/uma colunas conforme quantidade de ofertas e largura, sem impor três ofertas reais apenas pelo estudo.
- Manter o acesso ao contato pela navegação, sem repetir o link em cada card de serviço; o convite também deve acolher recrutadores e propostas de contratação.
- Manter textos, tecnologias e ofertas em conteúdo editável, separado dos componentes.

## Estados e exceções

- Ausência ou falha de ícone mantém o nome da tecnologia visível.
- Falha de carregamento da fotografia não remove a biografia nem impede navegação.
- Não publicar placeholders de foto, biografia ou serviços como conteúdo definitivo.
- Não exibir disponibilidade para trabalho, clientes, depoimentos, preços, prazos ou garantias que não tenham sido fornecidos pelo proprietário.

## Critérios de aceite

- **SM-01:** o visitante encontra texto pessoal e fotografia após a seção de projetos, conforme a composição proposta.
- **SM-02:** tecnologias permanecem identificáveis sem ícones e não exibem percentuais nem níveis de domínio.
- **SM-03:** foto e texto preservam leitura e enquadramento em telas amplas e estreitas, nos dois temas.
- **SM-04:** cada serviço é apresentado em card com identidade e oferta concreta, sem links internos no card; o contato é acessível pela navegação sem cadastro, e os cards se reorganizam em telas menores.
- **SM-05:** atualizar biografia, tecnologias ou serviços não exige modificar a apresentação.
- **SM-06:** português e inglês comunicam o mesmo posicionamento, sem inventar experiência ou promessas para completar conteúdo.

## Serviços implementados

Em 2026-10-26, os seis serviços editoriais foram adicionados após Sobre mim em `#services`, com os três focos principais primeiro. Textos e ordem ficam em `src/data/services.ts`; ícones SVG são decorativos e locais. `ServicesSection` é um Server Component; desktop usa três colunas, tablet duas e celular uma, com altura adaptável ao conteúdo. O build valida identificadores únicos e traduções não vazias. Atualizar, ordenar ou traduzir as ofertas não exige editar o JSX.

O header e o menu estreito oferecem acesso a serviços. Idioma, query, tema e histórico preservam a seção. Por revisão explícita do proprietário em 2026-10-26, o título foi simplificado para “Serviços” / “Services” e os links “Conversar” / “Get in touch” foram removidos dos seis cards. O contato permanece disponível pela navegação. SM-04 segue a revisão atual, com cards de conteúdo e acesso ao contato pela navegação. SM-05 também cobre as ofertas. Resultados em [verificação de serviços](../servicos-verificacao.md).

## Fora do escopo e pendências

Não inclui contratação automática, checkout, orçamento instantâneo, agendamento ou painel administrativo. Sobre mim foi implementado em 2026-10-26 após os projetos, com a [foto aprovada](../design/photos/README.md), biografia PT/EN e dez tecnologias de `src/data/profile.ts`. A interface é um Server Component e os controles existentes de idioma/tema preservam `#about`. Desktop mantém a foto lateral; celular/tablet usam texto, foto e tecnologias empilhados. Na revisão de 2026-10-30, a foto passou a iniciar colorida, com preto e branco somente no hover compatível; permanece colorida no celular/toque e troca sem transição com movimento reduzido. SM-01, SM-02, SM-03, SM-05 (biografia/tecnologias) e SM-06 estão cobertos; a composição dos seis serviços foi implementada na etapa seguinte, e o acesso a contato de SM-04 foi concluído em F06. Resultados em [verificação de Sobre mim](../sobre-verificacao.md). Refinar a biografia e a lista pessoal de tecnologias quando o proprietário fornecer conteúdo mais específico. Preços e disponibilidade só entram se solicitados posteriormente.
