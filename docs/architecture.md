# Arquitetura inicial

Revisão de 2026-10-26 com fundação, apresentação inicial, projetos, Sobre mim, serviços, contato e rodapé implementados. Regras em [AGENTS.md](../AGENTS.md), escopo nas [features](features/README.md), aparência no [design](design.md) e contexto das escolhas nos [ADRs](adr/README.md). Header, hero, slide de projetos, Sobre mim, serviços, contato e rodapé estão compostos; a abertura foi implementada com Motion e liberação independente, conforme [ADR-009](adr/0009-abertura-por-sessao.md).

## Contexto

Portfólio público bilíngue voltado a contratação e freelance. Hero de tela inteira apresenta o profissional; projetos são a primeira seção seguinte. Há slide de projetos, temas, currículo, sobre mim, cards de serviços e links de contato.

## Fluxo

```text
Conteúdo versionado + traduções + componentes + tokens
                          |
                 Validação e build
                          |
           Páginas pré-geradas por idioma
                          |
                      Visitante
                          |
        Links para redes, conversa ou aplicativo de e-mail
```

Não existe recebimento de mensagens pelo site. Não criar API de contato, provedor de envio ou banco de mensagens. [ADR-005](adr/0005-contato-por-links.md) substitui a direção anterior.

## Responsabilidades

| Parte | Papel | Limite |
| --- | --- | --- |
| Rotas/layouts | Compor conteúdo e metadados por idioma. | Não embutir catálogo ou dados de contato no JSX. |
| Conteúdo/traduções | Perfil, projetos, ofertas e contatos públicos. | Sem dependência de componentes. |
| Leitura/validação | Preparar conteúdo para build e filtrar rascunhos. | Não criar API só para ler arquivos locais. |
| Componentes | Apresentação e interações localizadas. | Receber apenas dados públicos necessários. |
| Estado no navegador | Tema, menu, abertura e posição do slide. | Sem estado global de negócio ou rascunho de mensagem. |

Páginas usam conteúdo preparado e componentes. Componentes não importam o catálogo inteiro de rascunhos para o cliente. O contato é um conjunto de links, não um serviço.

## Renderização e organização

Next.js App Router, TypeScript estrito e Tailwind seguem o [ADR-001](adr/0001-stack-e-renderizacao.md). O build confirmou `/pt` e `/en` pré-gerados com `generateStaticParams`. Layout e página são Server Components; os controles de idioma e tema são as fronteiras de cliente. Detalhes de ferramentas, fonte e tema no [ADR-006](adr/0006-fundacao-tecnica.md).

```text
src/
├── app/[lang]/          # Páginas e layouts localizados
├── components/          # Hero, slide, seções e controles
├── content/projects/    # Catálogo e textos
├── data/                # Perfil, serviços e contatos públicos
├── i18n/                # Traduções
├── lib/                 # Funções/validação com uso real
└── assets/              # Imagens
public/cv/               # PDFs públicos
docs/                    # Documentação
```

Organização alvo, não uma lista de diretórios vazios. A implementação usa `assets/fonts/` e `assets/photos/`, `data/profile.ts` com biografia PT/EN e tecnologias, `data/services.ts` com ofertas/ordem/ícones e traduções, apresentação/controles em `components/`, traduções em `i18n/` e catálogo/validação em `content/projects/`. `public/cv/` contém o PDF em português fornecido pelo proprietário; `data/resume.ts` centraliza caminho e idioma usados pelo hero e pela validação de conteúdo. Conteúdo versionado permanece no [ADR-002](adr/0002-conteudo-versionado.md): JSON para catálogo/dicionários e TypeScript para perfil/validação, conforme ADR-006. Idiomas por rota seguem o [ADR-003](adr/0003-idiomas-por-rota.md).

## Interações e recursos

- Tema atua sobre tokens semânticos; preferência inicial e persistência seguem F05.
- Header usa disclosure compacto para idioma e botão de alternância direta claro/escuro, preservando os ajustes do proprietário. A navegação oferece início/projetos/Sobre mim/serviços/contato, com menu nativo estreito e Escape. Hero e artigos são Server Components; controles são clientes. `#intro`, `#projects`, `#project-{id}`, `#about`, `#services` e `#contact` identificam destinos reais; `#foundation` é preservado.
- Idioma vem da URL; conferir idioma do HTML, destinos por seção e repetição da abertura ao navegar. Não há formulário a preservar.
- Slide usa overflow horizontal/Scroll Snap, controles, teclado, toque nativo e arrasto com mouse, sem biblioteca nem clones. O leitor em `content/projects/read.ts` valida, filtra, ordena e localiza os campos públicos. O fragmento do projeto preserva a posição entre idiomas; estado permanece local. O alinhamento CSS é central em celular/tablet e inicial em desktop. Uma função de geometria calcula o mesmo destino para botões, teclado, restauração e resize; margens nos extremos permitem centralizar também primeiro/último sem duplicar itens. Detalhes no [ADR-007](adr/0007-slide-nativo-de-projetos.md).
- Sobre mim é um Server Component: recebe biografia no idioma atual, lista de tecnologias e rótulos traduzidos. A foto da floresta usa import estático e `next/image` sob demanda, sem preload. O layout CSS mantém texto/foto/tecnologias no celular e tablet, com foto lateral no desktop. O efeito decorativo de cor compartilha CSS com o hero, sem novo estado ou dependência.
- Serviços usam cards por exigência visual, em um Server Component com dados localizados pela página. A grade CSS usa uma/duas/três colunas, com altura adaptável ao texto; Ícones decorativos vêm da família Bootstrap Icons de `react-icons/bs`. O build valida identificadores e traduções. Os cards de serviços não têm ações, conforme revisão do proprietário; contato é acessado pela navegação. Não transformar o agrupamento aberto dos projetos no mesmo componente visual.
- Os cinco destinos reais de navegação são compostos uma vez no header e compartilhados com o menu estreito, evitando divergência entre suas listas.
- Ícones de interface usam `react-icons@5.7.0`, solicitado pelo proprietário, com imports nominais de `react-icons/bs` e sem provider próprio. Os ícones acompanham o componente que os renderiza: conteúdo continua no servidor e controles mantêm suas fronteiras clientes existentes. Tamanhos são explícitos e SVGs decorativos usam `aria-hidden`/`focusable=false`; rótulos continuam nos links/botões. A marca e partículas originais não são substituídas. Licenças MIT ficam em `public/licenses/react-icons.txt`.
- O rodapé é um Server Component após o conteúdo principal; recebe nome do perfil e rótulo traduzido para voltar ao início. A marca reutiliza os mesmos SVGs, com imagens decorativas dentro do link nomeado para evitar leitura redundante.
- Contato é um Server Component que recebe `data/contacts.ts` e rótulos do idioma atual. `lib/contacts.ts` valida no build e na leitura protocolos, domínios, formato dos perfis, ausência de credenciais/parâmetros e e-mail/número internacional. A seção de contato e seu acesso na navegação são omitidos se a lista ficar vazia. A configuração atual contém quatro canais autorizados, sem Instagram. Não há widgets, SDK, formulário ou envio de mensagens.

O fundo do hero possui uma fronteira de cliente própria em `hero-particles.tsx`. Motion mini anima três camadas com SVGs externos já aprovados, sem mudar os Server Components do conteúdo. Pausa manual, visibilidade da área/aba e preferência reduzida controlam o ciclo de vida local; não existe armazenamento global. A abertura usa `motion/react` em uma fronteira cliente própria; o mestre SVG é incorporado na pré-geração e o conteúdo das seções permanece no servidor. Um script anterior à hidratação controla sessão, preferência reduzida e prazo independente de 3 s. Detalhes no [ADR-009](adr/0009-abertura-por-sessao.md).

## Publicação e verificações futuras

O contêiner `#portfolio-content` é a fronteira cliente `PageMotion`, que recebe o conteúdo das seções já renderizado pelo servidor. Seus atributos `data-enter` ativam entradas locais com Motion mini, uma vez por montagem/visibilidade, coordenadas com a saída da abertura. Não há ocultação inicial no servidor; foco, fragmentos, preferência reduzida e falhas mantêm leitura/navegação imediatas. Decisão no [ADR-010](adr/0010-movimento-das-secoes.md), evidências em [verificação de movimento](movimento-verificacao.md).

Sem endpoint dinâmico de contato, publicação estática continua candidata. A aplicação usa build padrão e `next start`, com conteúdo pré-gerado e redirect de `/` para `/pt` na configuração. A fotografia do hero usa import estático, preload, sizes e otimização nativa de `next/image`; os recortes/dessaturação são CSS. `output: export` não oferece o redirect nem o otimizador padrão: hospedagem estática exigirá regra equivalente e loader ou imagens responsivas pré-geradas. Fonte, logos e partículas são arquivos locais. Hospedagem e domínio permanecem pendentes, sem imposição de runtime pela decisão histórica substituída.

`build` valida catálogo, arquivos de imagem e traduções antes da geração. Os projetos publicados usam caminhos em `public/projects/` e imagens aprovadas sem alteração, renderizadas por `next/image`. Tipos, lint, testes Node e Playwright seguem o [README](../README.md); cobrem fundação, apresentação, slide, Sobre mim, serviços, contato e rodapé. A abertura tem cenários de sequência real, duração, sessão, teclado e falhas; resultados em [verificação da abertura](abertura-verificacao.md). O build confere caminho local e marcadores do PDF do currículo; os cenários da fundação conferem download nativo por teclado, conteúdo binário idêntico, rótulos e funcionamento sem JavaScript. Testes não enviam mensagens nem abrem conversas reais.

## Pendências

Hospedagem e domínio; acompanhamento da disponibilidade das demonstrações (verificadas em 2026-10-26); revisão da biografia/tecnologias; perfil de Instagram e PDFs. As imagens das seções implementadas já estão aplicadas. A contribuição completa dos três projetos foi confirmada pelo proprietário. Tokens monocromáticos permanecem centralizados. ESLint 9 foi mantido por compatibilidade com os plugins atuais; revisar quando houver suporte declarado à linha 10. O [ponto de retomada](estado-atual.md) registra os refinamentos e a validação disponível por entrega.

## Preparação para publicação

Origem, metadados absolutos, imagens sociais, favicon, sitemap/robots e cabeçalhos estáticos foram implementados conforme o [ADR-011](adr/0011-preparacao-para-publicacao.md). O build continua pré-gerando PT/EN; não há middleware com nonce nem nova renderização dinâmica. `src/data/site.ts` centraliza a origem autorizada, `scripts/generate-brand-assets.mjs` exporta a marca para os formatos públicos e o [fluxo de publicação](publicacao.md) separa preview da futura troca do portfólio antigo. A abertura continua em 2,5 segundos por escolha do proprietário.
