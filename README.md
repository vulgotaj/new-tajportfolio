# Portfólio TAJ

Portfólio de Felipe Tajima com fundação técnica, apresentação inicial, projetos, Sobre mim, serviços, contato e rodapé implementados. A página possui header responsivo, hero de tela inteira, fotografia aprovada, partículas em movimento contínuo, controles de idioma/tema, slide de projetos, Sobre mim, seis cards de serviços, contato e rodapé. A abertura com Motion e o SVG aprovado dura cerca de 2,5 segundos, uma vez por sessão da aba, e é omitida com movimento reduzido.

Para retomar o desenvolvimento, começar pelo [estado atual e decisões consolidadas](docs/estado-atual.md), com refinamentos aprovados, mapa de responsabilidades, validação já executada e pendências.

## Executar

Use Node.js 24 LTS (alternativa: 22.18+ da linha 22) e npm. As versões exatas estão em `package.json` e `package-lock.json`.

```sh
npm ci
npm run dev
```

Abra [127.0.0.1:3000/pt](http://127.0.0.1:3000/pt) ou [127.0.0.1:3000/en](http://127.0.0.1:3000/en). O script de desenvolvimento fixa o endereço IPv4 local para evitar que `localhost` resolva para outra instância em IPv6. Confira a porta indicada no terminal se ela estiver ocupada. A raiz encaminha para português. Para simular produção: `npm run build` e `npm start`.

A configuração `agentRules: false` mantém o `AGENTS.md` existente sem alterações automáticas ao iniciar o Next.js.

## Verificar

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`build` executa a validação editorial antes do Next.js. `test:e2e` inicia e encerra seu próprio servidor de produção em `127.0.0.1:3100`; exige um build atualizado e a porta livre. Capturas e traces ficam em `test-results/`, ignorados pelo Git.

## Publicação e marca

Favicon e imagens de compartilhamento localizadas ficam em `public/`. Para regenerá-los após alterar nome/função ou o SVG mestre: `npm run assets:brand` (exige Chromium do Playwright apenas no desenvolvimento). O build normal usa as exportações versionadas, sem iniciar navegador.

Os cabeçalhos de segurança em `next.config.ts` preservam pré-geração, tema, animações e download. A CSP permite scripts inline necessários ao Next/tema, bloqueia handlers em atributos e enquadramento, e não permite `unsafe-eval` em produção. O preview Vercel recebe `noindex`; conferir a política efetiva no host antes de trocar a implantação. Detalhes e limites no [ADR-011](docs/adr/0011-preparacao-para-publicacao.md).

## Organização

- `src/app/[lang]/`: layouts e páginas pré-geradas de PT/EN.
- `src/components/`: header, hero, projetos, Sobre mim, serviços, contato, rodapé, marca e controles; apenas as interações são Client Components.
- `src/i18n/`: idiomas e dicionários locais tipados, sem fallback entre idiomas.
- `src/data/profile.ts`: nome, função, biografia PT/EN e tecnologias derivados do editorial.
- `src/data/services.ts`: seis ofertas, ordem, ícones e textos PT/EN; o build valida identificadores únicos e traduções não vazias.
- `src/data/contacts.ts`: quatro canais autorizados; Instagram omitido enquanto não houver perfil.
- `src/lib/contacts.ts`: validação de protocolos, domínios, perfis, e-mail e número internacional.
- `src/content/projects/`: catálogo real, validação e leitura dos itens publicados no servidor.
- `src/assets/`: Jost variável local com licença OFL e as duas fotografias aprovadas.
- `src/lib/theme.ts`: preferência de tema no navegador.
- `public/brand/`: SVGs aprovados, preservados sem alteração.
- `public/decoration/`: campos de partículas aprovados, sem máscara ao redor do texto; grupos reutilizados pelo fundo animado.
- `public/projects/`: imagens aprovadas, referenciadas pelos dados e servidas por `next/image`.

Os ícones da interface usam `react-icons@5.7.0`, com imports nominais de `react-icons/bs` (Bootstrap Icons). Contatos usam os símbolos reconhecíveis das plataformas; serviços e controles seguem a mesma família. Os SVGs aprovados da marca TAJ e das partículas permanecem próprios. Licenças MIT preservadas em [public/licenses/react-icons.txt](public/licenses/react-icons.txt); referência de uso no [projeto oficial](https://github.com/react-icons/react-icons).

Motion foi escolhido pelo proprietário para a abertura. `motion@14.6.0` já controla as três camadas de partículas pelo import `motion/react-mini`, com pausa manual, suspensão fora do hero/aba inativa e fundo estático para movimento reduzido ou sem JavaScript. Os 209 pontos de cada tema mantêm suas posições; tamanho e opacidade foram aumentados a pedido do proprietário, conforme os [tokens](docs/design/tokens.md). A abertura usa `motion/react`, com liberação independente e sessão em [ADR-009](docs/adr/0009-abertura-por-sessao.md); partículas em [ADR-008](docs/adr/0008-motion-e-particulas.md). Licenças MIT em `public/licenses/motion.txt`.

Os controles têm feedback de hover/foco com inversão de cores, navegação com fundo preenchido e destaque dos círculos de contato. Transições CSS de 180 ms usam movimentos curtos; movimento reduzido preserva as cores sem deslocamento/escala. Hover depende de mouse compatível, sem estado preso após toque.

As entradas de header/hero, previews, Sobre mim, serviços, contatos e rodapé usam Motion mini, uma vez ao alcançarem a área visível. O hero acompanha a saída da abertura; as demais entradas duram 900 ms e cada card de serviço mantém seu efeito após navegação pelo menu. O conteúdo nunca depende dos efeitos para aparecer; movimento reduzido e foco mantêm leitura e interação imediatas. Detalhes no [ADR-010](docs/adr/0010-movimento-das-secoes.md) e [verificação](docs/movimento-verificacao.md).

Tokens semânticos estão em `src/app/globals.css`, mapeados para utilitários Tailwind. Sem escolha salva, o tema acompanha o sistema; o botão do header alterna diretamente entre claro e escuro e persiste a escolha em `localStorage` (`taj-theme`). Sem JavaScript, o botão fica oculto, CSS acompanha o sistema e os links de idioma continuam úteis.

O catálogo publica DevControle, Fast Motors, Today Movies, pizzaUP e BarberHub nessa ordem. Os dois últimos indicam desenvolvimento em andamento e têm somente GitHub. A contribuição completa nos três primeiros foi confirmada pelo proprietário em 2026-10-26. Problema e solução foram derivados das descrições existentes e permanecem no conteúdo editorial. Repositórios e demonstrações usam os destinos fornecidos; as três demonstrações foram abertas e verificadas em 2026-10-26. Rascunhos são filtrados antes da apresentação pública. A biografia PT/EN e as dez tecnologias pessoais de `docs/conteudo.md` alimentam `src/data/profile.ts`; as seis ofertas alimentam `src/data/services.ts`, e os quatro canais autorizados alimentam `src/data/contacts.ts`.

O header oferece início, projetos, Sobre mim, serviços e contato, com menu nativo em telas estreitas. Idioma abre uma lista compacta acessível com Português e English; Escape fecha e devolve o foco, e os links funcionam sem JavaScript. Tema alterna diretamente, sem painel, com rótulo acessível indicando a próxima ação. O hero oferece “Baixar CV” / “Download CV (PT-BR)” e mantém a indicação para projetos. O PDF em português fornecido pelo proprietário fica em `public/cv/`, com referência em `src/data/resume.ts` e download nativo, inclusive sem JavaScript. Em desktop com pouca altura, a fotografia diminui proporcionalmente para que texto e seta dessa indicação apareçam inteiros no topo da página; o celular tem espaços ajustados, sem sobreposição. `#intro`, `#projects`, `#project-{id}`, `#about`, `#services` e `#contact` são compartilhados por idioma; `#foundation` permanece como compatibilidade.

No celular, o texto do hero fica centralizado para equilibrar a composição com a fotografia. Os contatos usam duas colunas simétricas, com ícones e rótulos centralizados; em smartphones, ícones maiores e rótulos de 16 px melhoram a proporção.

O slide usa rolagem nativa com Scroll Snap, botões, teclado, toque e arrasto com mouse. Em celular e tablet, cada parada centraliza o projeto, incluindo o primeiro e o último; teclado, recarga, resize e troca de idioma usam o mesmo alinhamento. No desktop, permanece a composição com mais de um item visível. Não tem autoplay ou dependência de animações. Texto, tecnologias e links permanecem fora da imagem, sem card externo. A pedido do proprietário, a área “Sobre o projeto” foi removida: as ações são GitHub com ícone/contorno e “Ver projeto” preenchida, ambas com indicação acessível de nova aba. Adicionar, destacar ou reordenar projetos não exige editar componentes. Detalhes no [ADR-007](docs/adr/0007-slide-nativo-de-projetos.md).

Serviços aparecem após Sobre mim, em cards com ícones lineares e grade de uma, duas ou três colunas. O conteúdo é renderizado no servidor e não depende de JavaScript. A seção se chama “Serviços” / “Services”; os cards mostram ícone, título e descrição, sem links “Conversar”. O acesso a contato permanece na navegação. Não foram adicionados preços, prazos ou disponibilidade.

O rodapé reutiliza os SVGs aprovados e o nome do perfil, com link acessível “Voltar ao início” / “Back to top”. É renderizado no servidor e funciona por teclado e sem JavaScript. Contato apresenta LinkedIn, GitHub, e-mail legível e WhatsApp com os destinos fornecidos pelo proprietário. O DDI brasileiro +55 foi adotado para o número com DDD 21. Perfis e WhatsApp abrem em nova aba com aviso acessível; e-mail usa `mailto:`. Instagram permanece omitido enquanto não houver perfil. Os dados são validados no build; não há formulário, endpoint, SDK ou envio de mensagens.

As fotos são importadas estaticamente e servidas por `next/image`, com tamanhos responsivos. Só a foto do hero recebe preload; a foto da floresta é carregada sob demanda. Os originais permanecem intactos. As imagens começam coloridas e ficam em preto e branco apenas em hover com ponteiro preciso; no celular/toque permanecem coloridas. Movimento reduzido remove a transição. As fotos pessoais usam qualidade 60, com AVIF/WebP negociados pelo navegador; originais e enquadramento CSS são preservados.

A origem autorizada é `https://felipetajima.vercel.app`, centralizada em `src/data/site.ts`. Canonical/alternativos são absolutos, com sitemap/robots pré-gerados e Open Graph/Twitter PT/EN. Esse endereço ainda atende o portfólio antigo; esta preparação não altera sua implantação. Consulte o [fluxo de publicação](docs/publicacao.md) e o [ADR-011](docs/adr/0011-preparacao-para-publicacao.md). O build padrão pré-gera as páginas e preserva o redirect de `/`; exportação estática requer configurar esse redirect no host. O currículo em português está disponível; a versão inglesa ainda não foi fornecida e o botão em inglês identifica explicitamente o arquivo PT-BR.

ESLint 9.39.5 foi fixado por compatibilidade com os peers dos plugins distribuídos por `eslint-config-next`; essa linha está fora de manutenção. Atualizar para ESLint 10 quando a configuração React declarar suporte, sem forçar peers incompatíveis. Detalhes e referências no [ADR-006](docs/adr/0006-fundacao-tecnica.md).

Consulte a [verificação da abertura](docs/abertura-verificacao.md), a [documentação](docs/README.md), a [arquitetura](docs/architecture.md), a [verificação de contato e rodapé](docs/contato-verificacao.md), a [verificação de serviços](docs/servicos-verificacao.md), a [verificação de Sobre mim](docs/sobre-verificacao.md), a [verificação de projetos](docs/projetos-verificacao.md) e os registros anteriores de [apresentação](docs/apresentacao-verificacao.md) e [fundação](docs/fundacao-verificacao.md).
