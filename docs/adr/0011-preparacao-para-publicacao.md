# ADR-011 — Preparação para publicação na Vercel

- Status: adotado no escopo de correção da auditoria autorizado em 2026-10-30.
- Data: 2026-10-30.

## Contexto

A auditoria local identificou URLs relativas em `hreflang`, ausência de recursos de compartilhamento e cabeçalhos defensivos, alertas de nomes acessíveis e oportunidade de reduzir o peso das fotos. O proprietário informou que pretende usar `https://felipetajima.vercel.app`, atualmente associado ao portfólio antigo, e confirmou que a abertura deve continuar em 2,5 segundos. Não foi solicitada a substituição da implantação existente nesta etapa.

## Decisão

Centralizar a origem pública em `src/data/site.ts`. Gerar canonical, alternativos, Open Graph e Twitter pela Metadata API; sitemap e robots são rotas de metadados pré-geradas. As imagens sociais PT/EN são arquivos estáticos, reproduzíveis por `npm run assets:brand`, com Jost local e o SVG mestre preservado. A versão inicial do favicon usava o traçado original da letra T. Em revisão solicitada pelo proprietário em 2026-10-30, o ícone da aba passou a usar a marca completa preta sobre branco, em SVG/ICO, com URL SVG versionada pelo hash do import estático. O ícone Apple mantém a abreviação T. Traçados e espaçamento dos SVGs aprovados permanecem intactos.

Manter a pré-geração. A CSP estática permite scripts inline necessários ao tema antes da hidratação e ao HTML/RSC do Next, sem `unsafe-eval` em produção. Bloqueia manipuladores de eventos em atributos, objetos, formulários e enquadramento; limita recursos à própria origem, com exceções locais de imagem e de WebSocket em desenvolvimento. `unsafe-inline` não impede toda injeção de scripts: esta política é defesa adicional e não substitui escape de conteúdo, validação de links e manutenção das dependências. Nonces por requisição exigiriam renderização dinâmica sem necessidade deste portfólio.

Configurar `nosniff`, recusa de iframe, política de referenciador e bloqueio de câmera/microfone/geolocalização. HSTS sem preload ou expansão para subdomínios é enviado em produção; navegadores o aplicam em HTTPS. `upgrade-insecure-requests` é usado somente no ambiente Vercel, evitando converter a prévia HTTP local em HTTPS. Deploys de preview na Vercel recebem `X-Robots-Tag: noindex, nofollow`.

As fotos mantêm arquivos originais e enquadramento CSS; `next/image` negocia AVIF/WebP e usa qualidade 60 nas fotos pessoais. Projetos mantêm qualidade 75. Os valores de `sizes` acompanham a área efetivamente renderizada, incluindo a escala do retrato no hero. A abertura continua com 2,5 s e limite independente de 3 s, conforme a confirmação do proprietário e o ADR-009.

## Consequências e revisão

Não foram adicionados backend, autenticação, analytics, biblioteca ou serviço externo. Novos recursos externos exigem revisão da CSP. Alterar origem ou perfil exige atualizar os dados e regenerar os recursos afetados; a geração de imagens usa Chromium apenas no desenvolvimento, não no build da Vercel.

O custo de renderização da abertura permanece um compromisso visual aceito; registrar as medições após as otimizações sem prometer Core Web Vitals com base em laboratório. Antes da troca do domínio, verificar a implantação de preview, HTTPS, imagens, cabeçalhos e indexação no host. A preparação do código e o commit local não autorizam substituir automaticamente o portfólio antigo.

## Referências

- [CSP estática e custo dos nonces](https://nextjs.org/docs/app/guides/content-security-policy).
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).
- [next/image: formatos, qualidade e sizes](https://nextjs.org/docs/app/api-reference/components/image).
- [URLs absolutas nos alternativos de idioma](https://developers.google.com/search/docs/specialty/international/localized-versions).
