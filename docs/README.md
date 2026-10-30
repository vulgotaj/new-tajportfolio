# Documentação do portfólio

| Documento | Responsabilidade |
| --- | --- |
| [AGENTS.md](../AGENTS.md) | Contrato operacional para agentes. |
| [Estado atual e retomada](estado-atual.md) | Entregas, refinamentos confirmados, mapa de código, evidências e próxima etapa. Começar por aqui ao retomar. |
| [Arquitetura](architecture.md) | Responsabilidades, fluxos e organização técnica vigente. |
| [ADRs](adr/README.md) | Decisões, propostas e histórico de substituições. |
| [Features](features/README.md) | Escopo, comportamentos e critérios de aceite. |
| [Design](design.md) | Direção visual revisada e estudos gráficos. |
| [Conteúdo editorial](conteudo.md) | Biografia PT/EN, tecnologias provisórias, serviços e disponibilidade de contato/currículo. |
| [Projetos: conteúdo e implementação](projetos-implementacao.md) | Cinco projetos implementados, textos PT/EN, imagens aprovadas, estado de desenvolvimento e contribuições confirmadas. |
| [Verificação dos novos projetos](projetos-desenvolvimento-verificacao.md) | Inclusão de pizzaUP e BarberHub, testes da coleção com cinco itens e revisão visual. |
| [Verificação do movimento](movimento-verificacao.md) | Entradas aprovadas, cenários executados e limitações da validação. |

Revisão atual: 2026-10-30. O [ponto de retomada](estado-atual.md) consolida as entregas e refinamentos posteriores aos mockups, sem substituir arquitetura, features e ADRs. A decisão anterior de envio no servidor foi substituída, não é uma pendência de implementação.

Implementação de 2026-10-30: a aplicação publica os cinco projetos, na ordem DevControle, Fast Motors, Today Movies, pizzaUP e BarberHub. Os dois últimos exibem estado de desenvolvimento traduzido, imagens aprovadas e GitHub, sem demo. Contribuições confirmadas pelo proprietário no [registro de implementação](projetos-implementacao.md); resultados executados na [verificação](projetos-desenvolvimento-verificacao.md). Os registros anteriores abaixo preservam suas datas originais.

Progresso mais recente: o proprietário aprovou as entradas transparentes de baixo para cima, com Motion, 900 ms e sem zoom. A abertura permanece em 2,5 s por sessão da aba. O [ponto de retomada atual](estado-atual.md#próxima-retomada) registra os comportamentos a preservar, o alcance exato dos testes e a próxima etapa prevista de revisão editorial PT/EN, ainda não iniciada.

Etapa atual, 2026-10-26: fundação, apresentação inicial, projetos, Sobre mim, serviços, contato e rodapé implementados em `/pt` e `/en` pré-gerados. Os três projetos estão publicados no catálogo após confirmação da contribuição completa pelo proprietário. Projetos são a primeira seção após o hero, em slide nativo aberto; header e hero têm destinos reais para ela. Tema alterna diretamente e idioma usa painel compacto. A área “Sobre o projeto” foi removida; GitHub usa ícone/contorno e “Ver projeto” abre as demonstrações verificadas em 2026-10-26. Sobre mim usa a biografia PT/EN e as dez tecnologias editoriais, com a foto da floresta v2 e navegação por `#about`. Serviços apresenta seis cards PT/EN e navegação por `#services`, com o título “Serviços” / “Services” e sem ações dentro dos cards. Contato permanece acessível na navegação. O rodapé usa a logo aprovada, o nome e acesso ao início. Contato publica LinkedIn, GitHub, e-mail e WhatsApp fornecidos pelo proprietário; Instagram fica omitido enquanto não existir perfil. Biografia/tecnologias seguem abertas a refinamento, currículo continua ausente. Motion anima as partículas com pausa e movimento reduzido (ADR-008) e a abertura de aproximadamente 2,5 segundos por sessão da aba, com SVG aprovado e liberação independente. Decisão no [ADR-009](adr/0009-abertura-por-sessao.md) e resultados em [verificação da abertura](abertura-verificacao.md).

Execução e scripts no [README da aplicação](../README.md); decisões nos ADRs [006](adr/0006-fundacao-tecnica.md) e [007](adr/0007-slide-nativo-de-projetos.md), resultados atuais na [verificação de contato e rodapé](contato-verificacao.md) e registros anteriores de [serviços](servicos-verificacao.md), [Sobre mim](sobre-verificacao.md), [projetos](projetos-verificacao.md), de [apresentação](apresentacao-verificacao.md) e [fundação](fundacao-verificacao.md). Os PNGs dos mockups e seus relatórios continuam sendo evidências do estudo de design, não da aplicação.

## Pré-produção

- [Publicação na Vercel](publicacao.md): domínio autorizado, preview, recursos de marca e limites antes da troca do portfólio antigo.
- [Verificação das correções da auditoria](pre-producao-verificacao.md).
- [ADR-011: preparação para publicação](adr/0011-preparacao-para-publicacao.md).
