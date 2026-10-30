# Verificação da fundação técnica

Registro histórico da primeira entrega. O estado posterior, com header e hero, está na [verificação da apresentação](apresentacao-verificacao.md).

Data: 2026-10-25. Ambiente: Windows, Node 24.21.0, npm 11.19.0. Referências de design: galeria final em `design/photos/mockups/`, tokens e lettering aprovados. A página entregue é somente de verificação, sem hero/header ou demais seções.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou: geração de tipos de rotas e TypeScript estrito, incluindo scripts e testes. |
| `npm run lint` | Passou, sem avisos. |
| `npm test` | 4 testes passaram: catálogo real em rascunho; bloqueio de publicação incompleta; URL executável/id duplicado; tradução ausente/vazia. |
| `npm run build` | Passou, incluindo `validate:content`: PT/EN completos, 3 projetos e 0 publicados. `/pt` e `/en` aparecem como SSG no relatório do Next. |
| `npm run test:e2e` | 21 testes Chromium passaram sobre o build de produção. |
| Desenvolvimento | Servidor existente em `localhost:3000` respondeu 200 em PT/EN com título e idioma corretos. Uma tentativa de iniciar outra instância foi recusada pelo Next; a instância existente foi preservada. |
| Dependências | `npm ls --depth=0` sem peers inválidos; auditoria da instalação/lockfile com 0 vulnerabilidades reportadas. |
| Preservação | Comparação SHA-256 dos materiais preexistentes: SVGs, imagens, catálogo editorial original e relatórios dos mockups intactos. Somente os documentos afetados foram atualizados. `AGENTS.md` e histórico Git preservados. |

## Cobertura do navegador

As 12 combinações de PT/EN, claro/escuro e larguras de 360, 768 e 1440 px foram capturadas e inspecionadas visualmente. Não houve transbordamento horizontal. Conferidos nome, função, fonte, marca correta e controles sem cortes; o fundo permanece branco/preto puro. Os testes verificam título, descrição, idioma do HTML, canônico e referências de idiomas. Usam também `prefers-reduced-motion: reduce`; a fundação não tem animações ou transições.

Os demais cenários verificam:

- Raiz encaminhando para `/pt`, preservando `#foundation`; `/fr` retorna 404.
- Troca de idioma preservando query, âncora, tema e histórico voltar/avançar.
- Tema acompanhando alterações do sistema até haver escolha explícita; escolha manual prevalecendo e persistindo após recarregar; retorno ao modo automático.
- Preferência escura salva com sistema claro aplicada mesmo com bundles JavaScript externos e SVGs bloqueados: apresentação inicial independe da hidratação.
- Armazenamento bloqueado, preferência salva inválida e ausência de `matchMedia`, sem impedir o uso dos controles.
- Sem JavaScript: nome/função visíveis, tema via CSS, logo adequada e links reais entre idiomas. O seletor de tema é ocultado e há explicação traduzida.
- Tab alcançando idiomas e grupo de tema; setas alterando rádios nativos; foco com contorno de 2 px. Alvos têm pelo menos 44 px de altura.

Capturas e traces são artefatos locais em `test-results/`, ignorados pelo Git. Para reproduzir, seguir o README; o teste de navegador exige um build atualizado, instala Chromium separadamente e usa a porta 3100.

## Limites

Não foram testados Firefox, Safari, dispositivos físicos ou leitores de tela. A revisão cobre a página mínima; não comprova slide, seções, contato, currículo ou abertura futuros. Não houve navegação para redes sociais, demonstrações ou conversas reais. A ausência de projetos publicados é intencional nesta entrega; não representa aceite para lançar o portfólio completo sem projeto real.

Domínio e hospedagem ainda não foram escolhidos. Canônicos/alternativos são relativos. Exportação estática não foi executada: o redirect configurado depende do Next e precisará de regra equivalente no host estático. A resposta 404 usa a apresentação nativa do framework; não foi criada uma experiência de erro localizada nesta fundação.

ESLint 9 foi mantido por compatibilidade declarada com a configuração React atual, apesar do fim de sua manutenção. Essa limitação e os critérios de revisão estão no [ADR-006](adr/0006-fundacao-tecnica.md). Não há falhas pendentes nos comandos de tipos, lint, testes ou build.
