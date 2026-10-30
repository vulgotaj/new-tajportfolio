# Verificação da seção de projetos

Data: 2026-10-26. Registro da entrega de F02 após a apresentação inicial; a etapa seguinte está em [verificação de Sobre mim](sobre-verificacao.md). Referências: mockups finais de projetos em `design/photos/mockups/`, tokens e mídias aprovados. A contribuição completa de DevControle, Fast Motors e Today Movies foi confirmada pelo proprietário nesta conversa.

## Resultado entregue

Os três projetos aparecem nessa ordem, com preview e texto sobre o fundo da página, sem card externo. Descrições e tecnologias permanecem concisas. Na revisão solicitada pelo proprietário, a área “Sobre o projeto” foi removida; desafio, solução e contribuição permanecem no catálogo editorial. GitHub ganhou ícone/contorno e “Ver projeto” usa preenchimento e ícone externo. As imagens permanecem em preto e branco, revelando a cor somente no hover compatível, com troca imediata sob movimento reduzido. Originais foram copiados para `public/projects/` sem alteração.

O slide oferece anterior/próximo, posição visível, setas, Home/End, rolagem, gesto de toque e arrasto com mouse. A barra de rolagem fica oculta conforme solicitação do proprietário, mantendo os controles visíveis e a navegação nativa. Não tem autoplay, clones ou biblioteca. Os extremos desabilitam o controle correspondente; ResizeObserver acompanha mudanças de tamanho. A seção é a primeira após o hero. CTA, indicação final e navegação apontam para destinos reais. O menu estreito aceita Escape e fecha ao selecionar uma seção.

Fragmentos `#project-{id}` preservam a referência ao trocar idioma, recarregar ou usar o histórico. O tema mantém a alternância direta e a escolha persistida. O painel de idioma continua compacto, conforme os ajustes anteriores do proprietário.

## Verificações executadas

| Comando ou revisão | Resultado |
| --- | --- |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou sem avisos. |
| `npm test` | 7 testes passaram: catálogo real, campos obrigatórios, tradução incompleta, URLs inseguras, ordenação, filtragem, coleções vazias/unitárias e omissão de demonstração não verificada. |
| `npm run build` | Passou; catálogo com 3 publicados e PT/EN pré-gerados como SSG. |
| `npm run test:e2e` | 42 testes Chromium passaram, incluindo os 25 cenários anteriores e 17 cenários de projetos. |
| Visual | 12 variantes de projetos inspecionadas: PT/EN × claro/escuro × 360/768/1440 px, com início/fim e novas ações capturados. Previews mantêm proporção e títulos alinhados; a página não tem transbordamento horizontal. |
| Integridade | SHA-256 das três cópias coincide com o das imagens aprovadas. Fotos, logos e mockups originais preservados; metadados internos `sourceThread` ausentes do HTML público. |

Os testes de navegador verificam conteúdo/ordem, imagens carregadas, controles de início/fim, teclado, clique, arrasto com mouse, gesto de toque simulado, ausência de bloqueio da rolagem vertical e remoção da área expansível. Conferem também nomes/destinos das seis ações GitHub/demonstração, foco por teclado e preservação do projeto/tema entre idiomas e no histórico. Em desktop, conferem cor no hover, retorno ao preto e branco e ausência de transição com movimento reduzido. No toque, a foto continua dessaturada.

Sem JavaScript, o conteúdo e os links continuam disponíveis; setas do teclado rolam a lista nativa e os controles aprimorados ficam ocultos. O cenário de 320 px com texto a 200% passou após permitir quebra dos grupos de controles no header e na seção. Capturas ficam em `test-results/`, ignoradas pelo Git.

## Limites e pendências

As três demonstrações responderam HTTP 200 e renderizaram o conteúdo esperado no Chromium em 2026-10-26: Dev Controle - Sistema de gerenciamento, FastMotors - Oficina Especializada e todayMOVIES. O catálogo usa `demoStatus: verified` e as ações estão visíveis. Foram abertas apenas as páginas iniciais, sem autenticar, enviar mensagens ou acionar contatos; a verificação não cobre fluxos internos nem disponibilidade futura. A suíte local confere os seis destinos, nova aba, nomes acessíveis e alvos de 44 px sem navegar para os aplicativos externos.

Coleções vazias e unitárias foram cobertas na leitura/validação; não foram criadas rotas de teste para renderizá-las. Os componentes tratam ausência de coleção, uma unidade e dois itens que caibam, sem controles inúteis. Não foram executados Firefox, Safari, leitores de tela ou dispositivos físicos; o gesto de toque foi simulado no Chromium. A ampliação automatizada altera o tamanho base do texto, sem substituir todos os modos de zoom de navegador.

Sobre mim, serviços, contato, rodapé e abertura não foram iniciados. Hospedagem, domínio, currículo e destinos sociais continuam pendentes. A apresentação 404 e a limitação de ESLint permanecem como registradas nas entregas anteriores. Não há falhas pendentes nas verificações executadas.

Decisões técnicas no [ADR-007](adr/0007-slide-nativo-de-projetos.md).
