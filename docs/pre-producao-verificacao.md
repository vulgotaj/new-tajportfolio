# Verificação de pré-produção — 2026-10-30

Escopo autorizado: correções da auditoria local, com origem `https://felipetajima.vercel.app` e abertura mantida em 2,5 s. Não inclui push, deploy ou troca do portfólio antigo.

## Alterações

- Origem centralizada e URLs absolutas nos metadados, alternativos e sitemap. Robots pré-gerado e metadados Open Graph/Twitter traduzidos.
- Favicon derivado do traçado original de T, ícone Apple e imagens sociais PT/EN com Jost e marca completa. Geração reproduzível por script, sem dependência nova.
- Nome acessível do idioma contém PT/EN; o e-mail usa o nome nativo formado pelo rótulo e endereço do próprio link. Apresentação visual preservada.
- CSP estática, bloqueio de iframe, `nosniff`, política de referenciador, permissões restritas e HSTS. Previews Vercel recebem `noindex`; código mantém pré-geração e elimina `X-Powered-By`.
- Fotos pessoais com qualidade 60 e negociação AVIF/WebP. `sizes` acompanha a escala do hero e a coluna de Sobre mim. Originais, enquadramento, efeito de cor e demais animações preservados.

## Resultados

Tipos, lint, validação de conteúdo/PDF/recursos, build e 11 testes Node passaram. O build pré-gerou PT/EN, robots e sitemap; nenhuma rota precisou de renderização dinâmica. `npm audit --omit=dev` reportou zero vulnerabilidades conhecidas, com manifesto/lockfile sem novas dependências.

Axe conferiu PT/EN × claro/escuro × 360/768/1440 px com movimento reduzido: zero violações automatizadas, zero transbordamento horizontal e zero erros JavaScript nessas visitas. Os dois alertas anteriores foram eliminados. As capturas do hero e de Sobre mim, favicon Apple e imagens sociais foram inspecionadas. Fonte, SVG mestre, fotos originais, previews dos projetos e currículo foram comparados com a base da tarefa e preservados.

Lighthouse 13.6.0, executado no servidor de produção local, sem os testes concorrendo pela CPU:

| Métrica | Auditoria inicial | Após otimizações |
| --- | --- | --- |
| Desempenho mobile | 87/100 | 89–91/100; última execução 91 |
| LCP mobile | 3,6 s | 3,2–3,4 s; última execução 3,2 s |
| CLS mobile | 0 | 0 |
| Desempenho desktop | 98/100 | 98/100 |
| SEO | 83/100 | 100/100 |
| Economia estimada restante nas imagens, mobile | 151 KiB | 39 KiB |

Resultados variam entre execuções e não equivalem a dados de campo ou conformidade completa com WCAG. Os relatórios brutos e capturas ficaram na pasta temporária `taj-production-fixes-audit`, fora do Git.

Os novos cenários Chromium de publicação passaram: verificação dos recursos públicos/metadados/cabeçalhos, tema funcionando sob CSP, recusa real de um handler em atributo e bloqueio real de iframe observado no navegador. A suíte completa executou 172 cenários: 160 passaram e 12 encontraram uma expectativa antiga de “Baixar Currículo”, enquanto o código já trazia “Baixar CV”. O teste foi sincronizado com os rótulos atuais sem alterar o conteúdo; os 12 cenários afetados passaram na reexecução. Assim, os 172 cenários distintos foram aprovados entre as duas execuções, sem falhas pendentes; não houve uma nova execução integral após a correção dessa expectativa. Lint foi repetido com sucesso após o ajuste.

## Git e publicação

A branch local é `codex/pre-producao`. Como o aplicativo inteiro estava não rastreado antes da tarefa, o versionamento inclui a implementação existente, conteúdo/documentação e estas correções. Os candidatos foram revisados por tipo, tamanho e busca de padrões comuns de credenciais; dependências instaladas, `.next`, `.env`, traces e artefatos de testes ficaram fora do índice. Links locais da documentação e `git diff --cached --check` passaram. Duas notas históricas de edição e o teste de contato tiveram apenas linhas vazias extras no fim removidas para essa verificação.

O fechamento da etapa registra um commit local; nenhum push, deploy, transferência de domínio ou substituição do portfólio antigo faz parte desta entrega. O [fluxo de publicação](publicacao.md) define a conferência do preview antes da futura troca.

## Limites

Medições de laboratório locais não comprovam desempenho de campo. A duração da abertura foi preservada por confirmação explícita do proprietário. A CSP permite scripts inline do Next/tema, portanto não deve ser apresentada como proteção completa contra injeção de scripts. Cabeçalhos, TLS, cache e ausência de bloqueio de indexação em produção precisam ser verificados após o deploy. Nenhum contato real é acionado pelos testes.
