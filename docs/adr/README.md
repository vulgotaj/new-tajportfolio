# Registro de decisões arquiteturais

Os ADRs explicam escolhas e consequências; regras operacionais ficam no [AGENTS.md](../../AGENTS.md) e comportamentos, nas [features](../features/README.md). A visão integrada está em [architecture.md](../architecture.md).

| ADR | Assunto | Status |
| --- | --- | --- |
| [001](0001-stack-e-renderizacao.md) | Next.js, TypeScript, Tailwind e fronteira de renderização | Aceito |
| [002](0002-conteudo-versionado.md) | Conteúdo local versionado e separado da apresentação | Aceito; formato concretizado no ADR-006 |
| [003](0003-idiomas-por-rota.md) | Organização dos idiomas por rota | Adotado na fundação |
| [004](0004-contato-no-servidor.md) | Contato processado no servidor com integração isolada | Substituído pelo ADR-005; histórico |
| [005](0005-contato-por-links.md) | Contato por redes sociais e e-mail externo | Aceito |
| [006](0006-fundacao-tecnica.md) | Ferramentas, Jost local, formato editorial e mecanismo de tema | Adotado na fundação |
| [007](0007-slide-nativo-de-projetos.md) | Slide nativo, leitura pública do catálogo e posição por fragmento | Adotado na entrega de projetos |
| [008](0008-motion-e-particulas.md) | Motion para abertura e movimento contínuo das partículas | Aceito; complementado pelo ADR-009 |
| [009](0009-abertura-por-sessao.md) | Abertura curta por sessão, SVG mestre e liberação independente | Adotado na abertura |
| [010](0010-movimento-das-secoes.md) | Entradas das seções com Motion e conteúdo sempre disponível | Adotado nas seções |
| [011](0011-preparacao-para-publicacao.md) | Origem pública, metadados, CSP estática e recursos de publicação | Adotado na preparação para Vercel |

Aceito significa que a direção já foi estabelecida na conversa e no contrato operacional; não significa implementação concluída. Proposto identifica um detalhamento ainda não confirmado, mesmo quando o requisito que o motiva já está aceito.

Novos ADRs precisam de contexto, decisão ou proposta, alternativas, consequências e condição de revisão. Uma decisão substituída deve apontar para o novo registro, preservando seu contexto.

Não abrir registros vazios para toda pendência. Hospedagem receberá ADR quando houver escolha concreta e justificável; Motion foi definido no ADR-008. Não há serviço de envio de e-mail a escolher no escopo atual. Ajustes de cores, texto ou espaçamento pertencem ao design/conteúdo.
