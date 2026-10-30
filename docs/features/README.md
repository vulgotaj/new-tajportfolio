# Especificações das features

Este índice organiza o escopo inicial do portfólio para contratação profissional e serviços freelance. A documentação não autoriza implementar as features.

## Como interpretar

- **Confirmado:** requisito solicitado pelo usuário.
- **Proposto:** comportamento detalhado sugerido para concretizar o requisito; pode ser refinado antes da implementação.
- **Pendente:** informação ou decisão ainda necessária. Pendências de conteúdo não impedem estruturar a aplicação, mas não devem ser preenchidas com fatos inventados.
- Os critérios de aceite são a referência de verificação futura. Quando dependem de uma proposta, validam essa proposta se ela for adotada.

Regras operacionais ficam no [AGENTS.md](../../AGENTS.md); referências, identidade e direção visual ficam em [design.md](../design.md). A [arquitetura](../architecture.md) integra as responsabilidades técnicas, e os [ADRs](../adr/README.md) distinguem decisões aceitas e propostas. Não duplicar esses contratos nas features.

## Features

| ID | Especificação | Situação |
| --- | --- | --- |
| F01 | [Apresentação e navegação](apresentacao-e-navegacao.md) | Hero, header, rodapé e acessos reais implementados, com menu estreito e retorno ao início. Partículas com movimento contínuo, pausa e versão estática acessível. |
| F02 | [Projetos](projetos.md) | Slide nativo implementado com três projetos; ações GitHub e demonstrações verificadas, sem área expansível. |
| F03 | [Sobre mim e serviços](sobre-mim-e-servicos.md) | Sobre mim e seis cards implementados; título “Serviços” / “Services”, sem links dentro dos cards. Contato acessível pela navegação (F06). |
| F04 | [Idiomas](idiomas.md) | Rotas, metadados, padrão PT, validação e troca de idioma com preservação de seção/projeto implementados nas seções atuais. Abertura implementada e coberta em F08. |
| F05 | [Temas](temas.md) | Sistema, escolha persistida, aplicação antes da hidratação e alternância direta implementados nas seções atuais. Abertura implementada e coberta em F08. |
| F06 | [Contato](contato.md) | Quatro canais autorizados publicados; Instagram omitido enquanto não houver perfil. Sem formulário ou envio interno. |
| F07 | [Currículo](curriculo.md) | Download nativo do PDF em português no hero; página inglesa identifica PT-BR. Versão inglesa pendente. |
| F08 | [Abertura](abertura.md) | Motion e SVG aprovado; 2,5 s, uma vez por sessão da aba e omissão com movimento reduzido. Liberação independente em até 3 s. |

## Critérios transversais

- Conferir as features aplicáveis em português e inglês e nos temas claro e escuro.
- Verificar layouts de celular, tablet e desktop; usar inicialmente 360, 768 e 1440 pixels como amostras, além de conferir a adaptação entre elas. São larguras de teste, não breakpoints obrigatórios.
- Conferir teclado, foco, nomes acessíveis dos controles, leitura linear e movimento reduzido. Informações e ações essenciais não podem depender de hover.
- Conteúdo principal, navegação, projetos e links de currículo/contato devem continuar úteis sem animações. Onde uma interação depender de JavaScript, definir uma alternativa utilizável.
- Preservar tema, idioma e localização na página conforme cada especificação; não reiniciar a abertura nas interações internas.
- Não publicar textos fictícios, projetos inventados, links de exemplo ou arquivos de currículo vazios.
- Verificações automatizadas devem cobrir regras e fluxos relevantes; revisão visual complementa os testes. A ferramenta será definida na fundação técnica.

## Dependências e pendências

Fotos e função “Desenvolvedor Full-Stack” estão confirmadas. O [conteúdo editorial](../conteudo.md) e os três projetos já estão aplicados aos mockups. Contribuições confirmadas e demonstrações verificadas em 2026-10-26. Antes de publicar, revisar a lista pessoal de tecnologias. Quatro destinos de contato foram fornecidos em 2026-10-26; Instagram ainda não existe e é omitido. Currículo indisponível não impede a primeira versão: omitir a ação de download.

A revisão de design de 2026-10-25 define a direção de hero, slide, cards, fonte Jost e fundos branco/preto. Motion foi escolhido para a abertura; partículas contínuas já foram implementadas com pausa, suspensão por visibilidade e preferência reduzida (ADR-008). Hospedagem permanece pendente após a fundação, sem requisito de runtime apenas para contato. A decisão anterior de formulário foi substituída pelo ADR-005.
