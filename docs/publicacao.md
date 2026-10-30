# Publicação

Origem autorizada: `https://felipetajima.vercel.app`, em `src/data/site.ts`. Esse endereço ainda atende o portfólio antigo. A preparação técnica não transfere o domínio nem substitui a implantação existente.

## Fluxo de entrega

1. Revisar e versionar código, conteúdo, documentação e recursos aprovados. Dependências instaladas, `.next`, `.env`, traces e capturas de testes são ignorados; não enviar esses arquivos.
2. Usar o preset Next.js na Vercel, com Node.js compatível com `package.json`, instalação por `npm ci`, build por `npm run build` e saída padrão do framework. O otimizador de imagens requer esse fluxo; não usar exportação estática sem revisar o ADR-006.
3. Criar uma implantação de preview e conferir PT/EN, temas, abertura, navegação, fotos, projetos, contatos e currículo. Não enviar mensagens nem abrir conversas reais durante os testes.
4. Conferir no host os cabeçalhos de segurança e o `X-Robots-Tag: noindex, nofollow` do preview. Em produção, esse bloqueio de preview deve estar ausente. Validar canonical/alternativos/sitemap apontando para a origem autorizada, HTTPS sem conteúdo misto, MIME do PDF, formatos negociados das fotos e cache dos recursos.
5. Somente após validar o preview, substituir a implantação ou transferir o endereço do portfólio antigo no projeto Vercel apropriado. Essa troca ainda não foi executada; o push do repositório não transfere o endereço por si só.
6. Medir novamente desempenho no endereço público. As métricas locais de Lighthouse não substituem dados reais de visitantes; a abertura de 2,5 s foi mantida por escolha do proprietário.

## Recursos de marca

`npm run assets:brand` regenera `public/icon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` e `public/og/{pt,en}.png`, usando o SVG mestre e a Jost local. Exige Chromium do Playwright instalado no computador de desenvolvimento (`npx playwright install chromium`). As exportações ficam versionadas; o build normal não executa o navegador nem instala uma ferramenta de imagens.

A imagem social usa a marca completa, nome e função confirmados. Desde a revisão de 2026-10-30, o ícone da aba usa a logo completa preta sobre branco, nos formatos SVG e ICO, preservando todos os paths e o espaçamento do export aprovado. O SVG é importado estaticamente nos metadados para receber uma URL com hash e renovar o cache após alterações. O ícone Apple mantém a letra T extraída do mestre; os SVGs originais não são alterados. As fotos pessoais originais e o PDF fornecido também permanecem intactos.

## Política de segurança

A CSP estática e os demais cabeçalhos são definidos em `next.config.ts`, conforme o [ADR-011](adr/0011-preparacao-para-publicacao.md). Scripts inline de tema e hidratação são permitidos, handlers em atributos são bloqueados e `unsafe-eval` é restrito a desenvolvimento. Não existe uma alegação de proteção completa contra XSS. HSTS não usa preload nem `includeSubDomains`; atualização para HTTPS por CSP só é habilitada no ambiente Vercel para não quebrar a prévia HTTP local.

Safari, Firefox, tecnologias assistivas e dispositivos físicos devem ser conferidos antes da divulgação ampla. O relatório de [verificação de pré-produção](pre-producao-verificacao.md) registra o que foi efetivamente executado.
