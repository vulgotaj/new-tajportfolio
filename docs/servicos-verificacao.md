# Verificação dos serviços freelance

Data: 2026-10-26. Registro da entrega inicial dos seis cards de F03 após Sobre mim; ações de contato concluídas na [etapa seguinte](contato-verificacao.md), seguindo os mockups finais em `design/photos/mockups/` e os tokens vigentes.

## Entrega

`#services` apresenta sites institucionais, lojas virtuais, sistemas/dashboards, landing pages, redesign/modernização e manutenção/evolução, nessa ordem. Títulos e descrições PT/EN foram copiados do editorial, sem acrescentar preços, prazos, disponibilidade ou garantias. Os dados estão em `src/data/services.ts`, com identificadores estáveis, ordem pelo array e seleção de ícones. O build verifica identificadores válidos/únicos e traduções não vazias usando a validação editorial existente.

`ServicesSection` é um Server Component. A página entrega somente títulos e descrições no idioma atual; SVGs decorativos locais acompanham os títulos, sem dependências ou paradas de teclado. Cards usam superfície neutra, contorno, raio de 16 px, espaçamento de 28 px e altura que cresce com o conteúdo. A grade tem uma coluna no celular, duas no tablet e três no desktop. Nenhum comportamento depende de hover ou animação.

O header e o menu estreito compartilham a mesma lista de quatro destinos reais. O acesso a serviços funciona por teclado, com foco visível no link e foco no destino; troca de idioma, tema e histórico preservam `#services`.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou sem avisos. |
| `npm test` | Os 7 testes editoriais existentes passaram. |
| `npm run validate:content` | PT/EN, três projetos publicados e seis serviços válidos. |
| `npm run build` | Passou; PT/EN permanecem pré-gerados. |
| `npm run test:e2e` | 72 testes Chromium passaram: 57 anteriores e 15 de serviços. |
| Visual | PT/EN × claro/escuro × 360/768/1440 px, com os seis cards capturados. Conteúdo completo, grade responsiva, sem sobreposição entre títulos/descrições ou transbordamento horizontal da página. |
| Navegação | Teclado, foco visível, âncora, idioma, query, tema persistido e histórico conferidos. |
| Sem JavaScript/zoom | Menu, navegação e seis ofertas acessíveis nos dois idiomas com texto a 200% em 320 px; cards crescem para acomodar o conteúdo. |
| Preservação | Dependências, fotos, logos, mockups e demais mídias existentes preservados. Capturas e traces ficam em `test-results/`, ignorados pelo Git. |

## Limites e próxima dependência

Os destinos de contato continuam adiados pelo proprietário, conforme F06 e o editorial. Por isso, o CTA “Conversar” dos mockups está omitido, sem link fictício/vazio, botão desabilitado ou seção de contato criada como placeholder. SM-04 está atendido quanto à composição dos cards e responsividade; seu acesso a contato depende de destinos autorizados. Nenhuma mensagem, conversa, formulário ou integração foi acionada.

A verificação de navegador usa Chromium; não foram executados Safari, Firefox, leitor de tela ou dispositivos físicos. Movimento reduzido foi usado na matriz; os cards não adicionam animação. A ampliação muda o tamanho base do texto e não substitui todos os modos de zoom. Contato, rodapé, currículo e abertura não foram implementados nesta etapa; hospedagem, domínio e biblioteca de animações continuam pendentes.
