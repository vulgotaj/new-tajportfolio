# Verificação de Sobre mim

Data: 2026-10-26. Registro da implementação de Sobre mim em F03; a etapa seguinte está em [verificação de serviços](servicos-verificacao.md). Referências: mockups finais de `design/photos/mockups/`, foto da floresta v2 e conteúdo de `conteudo.md`.

## Resultado

A seção `#about` aparece após os projetos, com biografia PT/EN e as dez tecnologias existentes no editorial, sem níveis, porcentagens ou informações novas sobre experiência. Os dados ficam em `src/data/profile.ts`, separados do Server Component `about-section.tsx`; os rótulos e a descrição alternativa ficam nos dicionários. Firebase é somente um nome na lista pessoal, sem integração ou dependência instalada.

O desktop mantém texto e tecnologias à esquerda e fotografia à direita; celular e tablet usam texto, foto e tecnologias nessa ordem. O header e o menu estreito oferecem acesso real a Sobre mim por teclado e clique. A âncora recebe foco e permanece ao trocar idioma, inclusive com query, histórico e tema escolhido.

A foto aprovada foi copiada sem edição para `src/assets/photos/felipe-floresta-v2.png`. SHA-256 do original e da cópia: `600715D55529261C92A907635CBDB16264DD58E7B515FEFB22ACC265DB04A685`. Usa import estático, `next/image`, tamanhos responsivos e carregamento sob demanda. O enquadramento CSS preserva cabelo/rosto, com ponto focal vertical em 70%; não há espelhamento ou alteração de iluminação. Preto e branco, cor apenas no hover preciso e transição de 350 ms compartilham CSS com o hero. Movimento reduzido elimina a transição; toque não alterna a cor.

## Verificações

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou sem avisos. |
| `npm test` | 7 testes editoriais passaram. |
| `npm run build` | Passou, com PT/EN pré-gerados e conteúdo validado. |
| `npm run test:e2e` | 57 testes Chromium passaram: 42 anteriores e 15 de Sobre mim. |
| Visual | PT/EN × claro/escuro × 360/768/1440 px; conteúdo completo, foto carregada, ordem e composição responsivas, sem transbordamento horizontal. Capturas `about.png` em `test-results/`, ignoradas pelo Git. |
| Navegação | Menu e âncora operam por teclado, com foco visível; troca de idioma/histórico preserva `#about` e o tema. |
| Exceções | Sem JavaScript, imagem indisponível e texto a 200% em 320 px: biografia, nomes das tecnologias e navegação continuam disponíveis. A quebra de palavras evita transbordamento do título longo. |
| Movimento e toque | Cor retorna ao preto e branco ao sair do hover; movimento reduzido remove transição; toque mantém preto e branco. |
| Preservação | Foto original e demais mídias aprovadas intactas; nenhuma dependência adicionada ou configuração de backend alterada. |

## Limites

Biografia e tecnologias são a versão editorial existente e continuam abertas a refinamento pelo proprietário. Não foram adicionados anos de experiência, vínculos profissionais, clientes, disponibilidade ou promessas. A seção não tem controles ou paradas de teclado apenas para revelar cores.

Testes usam Chromium e toque simulado; não foram executados Safari, Firefox, leitor de tela ou dispositivos físicos. O teste de ampliação muda o tamanho base do texto, sem cobrir todos os modos de zoom. Serviços, contato, rodapé, currículo e abertura não foram implementados nesta etapa. Hospedagem, domínio, destinos sociais e biblioteca de animações continuam pendentes.
