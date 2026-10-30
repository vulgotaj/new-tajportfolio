# ADR-007 — Slide de projetos com rolagem nativa

- Status: adotado na implementação de F02.
- Data: 2026-10-26.

## Contexto

O catálogo tem três projetos reais e deve crescer sem alterar os componentes. F02 exige navegação horizontal acessível, sem autoplay, e a biblioteca de animações permanece pendente. O proprietário confirmou nesta conversa que desenvolveu os três aplicativos completos, resolvendo a contribuição pessoal necessária para publicação.

## Decisão

Usar overflow horizontal e CSS Scroll Snap, com controles React localizados para anterior/próximo, setas, Home/End e arrasto com mouse. O toque usa o comportamento do navegador, preservando rolagem vertical. Não instalar biblioteca de carrossel ou de animação. Movimento reduzido usa deslocamento imediato.

Revisão responsiva solicitada pelo proprietário em 2026-10-26: em celular/tablet usar `scroll-snap-align: center` e margens inicial/final para centralizar inclusive os extremos. Desktop mantém alinhamento inicial com múltiplos itens visíveis. Calcular o destino pelos tamanhos/offsets reais do elemento e pelo alinhamento CSS; reutilizar a geometria nos controles, teclado e restauração. ResizeObserver restaura o projeto indicado no fragmento após mudança de tamanho, sem estado global ou clones.

Compor artigos, imagens, textos e links em Server Components. O componente cliente recebe os artigos como children e somente identificadores/rótulos para controlar a navegação. O leitor valida, filtra rascunhos, ordena por destaque/ordem/id e entrega apenas conteúdo público no idioma solicitado. A ausência de demonstração verificada omite sua ação.

Manter identificadores de seção e projetos compartilhados por idioma (`#projects`, `#project-{id}`). A interação com o slide atualiza o fragmento sem criar entradas extras no histórico; trocar de idioma preserva esse fragmento. Ao restaurá-lo, o slide ajusta sua rolagem. Não adicionar estado global nem armazenamento para posição do slide.

Promover as imagens aprovadas sem alteração para `public/projects/`, com caminhos configurados no catálogo e renderização por `next/image`. Adicionar/reordenar projetos exige editar dados e incluir mídia, sem registrar cada item nos componentes. A validação de build verifica arquivos locais e campos obrigatórios, incluindo problema, solução e contribuição traduzidos.

## Alternativas

Uma biblioteca resolveria gestos e estados, mas introduziria uma dependência ainda não autorizada e desnecessária para esta coleção. Transladar uma faixa inteira por transform exigiria reimplementar rolagem, foco e fallback. A rolagem nativa mantém conteúdo e links utilizáveis sem JavaScript; os controles aprimorados são ocultados nesse estado.

## Consequências e revisão

Não há clonagem de itens, autoplay ou API para ler o catálogo. Início/fim e resize dependem de medidas do elemento rolável; ResizeObserver e eventos de scroll atualizam os controles. Coleções vazias omitem seção/CTA; uma unidade omite controles; duas unidades que couberem não exigem rolagem.

A revisão solicitada pelo proprietário em 2026-10-26 removeu a área “Sobre o projeto”, preservando seus campos no catálogo editorial. Repositório e demonstração ficam diretamente após as tecnologias; os links indicam nova aba no nome acessível. A imagem mantém proporção quando indisponível. A escolha de rolagem nativa permanece a mesma.

Reavaliar uma biblioteca somente se surgirem requisitos concretos que a rolagem nativa não atenda e após definição com o proprietário. Uma futura hospedagem estática ainda precisará resolver a otimização de imagens e os redirects previstos no ADR-006.

## Estado de desenvolvimento — 2026-10-30

A inclusão de pizzaUP e BarberHub usa `developmentStatus?: "in-development"` no catálogo e no leitor público, com rótulo traduzido pelo Server Component. A ausência mantém a apresentação dos projetos existentes; valores desconhecidos são rejeitados inclusive em rascunhos. Não inferir maturidade de `published` (visibilidade editorial), `demoStatus` (verificação de demonstração) ou da presença de links. Essa separação permite apresentar um projeto em desenvolvimento sem prometer uma demo. A validação dos campos editoriais obrigatórios permanece; o proprietário confirmou as contribuições antes de habilitar os novos itens.
