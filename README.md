# Portfólio TAJ · Felipe Tajima

Portfólio pessoal de Felipe Tajima, desenvolvedor Full-Stack. Reúne projetos, apresentação profissional, serviços e canais de contato em uma aplicação responsiva, disponível em português e inglês.

## Funcionalidades

- **Dois idiomas:** rotas `/pt` e `/en`, com textos, metadados e estados traduzidos. A troca de idioma preserva a seção visitada quando possível.
- **Temas claro e escuro:** preferência inicial do sistema e escolha manual persistida no navegador.
- **Apresentação animada:** abertura com a marca TAJ uma vez por sessão da aba e partículas contínuas no hero, com controle de pausa e suporte a movimento reduzido.
- **Projetos em slide horizontal:** navegação por botões, teclado, toque e arrasto, com links para repositórios e demonstrações disponíveis.
- **Sobre mim e serviços:** biografia, tecnologias e seis ofertas de desenvolvimento web.
- **Contato direto:** LinkedIn, GitHub, e-mail e WhatsApp por links, sem formulário ou envio de mensagens pela aplicação.
- **Download do currículo:** PDF em português, identificado como PT-BR também na interface em inglês.
- **SEO:** metadados por idioma, URLs canônicas, Open Graph, imagens de compartilhamento, sitemap e robots.

O catálogo apresenta **DevControle**, **Fast Motors**, **Today Movies**, **pizzaUP** e **BarberHub**. Os dois últimos estão identificados como projetos em desenvolvimento e possuem link para o GitHub.

## Tecnologias

| Área | Ferramentas |
| --- | --- |
| Aplicação | Next.js 16 com App Router e React 19 |
| Linguagem | TypeScript em modo estrito |
| Estilos | Tailwind CSS 4 e tokens semânticos |
| Animações | Motion |
| Ícones e tipografia | React Icons, Jost local e marca própria em SVG |
| Qualidade | ESLint, testes nativos do Node.js e Playwright |

As páginas em português e inglês são pré-geradas. Server Components renderizam o conteúdo; Client Components cuidam das interações. Conteúdo e traduções ficam versionados no repositório. A aplicação não exige banco de dados, autenticação ou backend separado.

## Executar localmente

### Requisitos

- Node.js 24, ou versão compatível com `engines.node` em [package.json](package.json) (`^22.18.0 || >=24.0.0`).
- npm.

```sh
git clone https://github.com/vulgotaj/new-tajportfolio.git
cd new-tajportfolio
npm ci
npm run dev
```

Acesse [português](http://127.0.0.1:3000/pt) ou [inglês](http://127.0.0.1:3000/en). A raiz `/` redireciona para `/pt`. O servidor de desenvolvimento usa `127.0.0.1`; se a porta estiver ocupada, confira o endereço informado no terminal.

Não é necessário criar um arquivo `.env` para executar a aplicação atual.

### Simular produção

```sh
npm run build
npm start
```

O build valida o conteúdo antes de gerar a aplicação. O servidor de produção usa a porta 3000 por padrão.

## Scripts e verificações

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run typecheck` | Gera os tipos de rotas e verifica o TypeScript. |
| `npm run lint` | Executa o ESLint sem permitir avisos. |
| `npm run validate:content` | Valida catálogo, traduções, imagens, serviços, contatos, currículo e recursos de marca. |
| `npm test` | Executa os testes de conteúdo com o runner do Node.js. |
| `npm run build` | Valida o conteúdo e gera o build de produção. |
| `npm start` | Serve o build de produção. |
| `npm run test:e2e` | Executa os cenários de navegador com Playwright e Chromium. |
| `npm run assets:brand` | Regenera favicon, ícone Apple e imagens sociais PT/EN. |

Para verificar o projeto:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Os testes E2E exigem um build atualizado e a porta `3100` livre. O Playwright inicia e encerra seu próprio servidor de produção em `127.0.0.1:3100`. Resultados e traces ficam em `test-results/`, ignorado pelo Git. Os testes de contato não enviam mensagens nem abrem conversas reais.

A geração dos recursos de marca também exige o Chromium do Playwright. Os arquivos gerados em `public/` são versionados; o build normal não precisa iniciar um navegador.

## Estrutura e conteúdo

```text
src/
  app/                 Rotas, layouts, estilos globais, sitemap e robots
    [lang]/            Páginas e metadados em português e inglês
  components/          Seções, navegação e controles da interface
  content/projects/    Catálogo de projetos, leitura e validação
  data/                Perfil, serviços, contatos, currículo e origem pública
  i18n/                Idiomas e dicionários PT/EN
  assets/              Fonte local e fotografias
public/                Marca, imagens dos projetos, currículo e licenças
scripts/               Validação de conteúdo e geração de recursos de marca
tests/                 Testes de conteúdo e cenários E2E
docs/                  Arquitetura, decisões e registros de verificação
```

Para manter o conteúdo:

- **Projetos:** edite [src/content/projects/catalog.json](src/content/projects/catalog.json). Publicação, destaque e ordem são definidos nos dados, sem editar componentes. Adicione as imagens em `public/projects/` e execute `npm run validate:content`.
- **Textos da interface:** mantenha os dicionários [pt.json](src/i18n/pt.json) e [en.json](src/i18n/en.json) correspondentes.
- **Perfil e serviços:** edite [profile.ts](src/data/profile.ts) e [services.ts](src/data/services.ts), incluindo ambos os idiomas.
- **Contatos:** mantenha apenas destinos autorizados em [contacts.ts](src/data/contacts.ts). Instagram permanece omitido até haver um perfil fornecido.
- **Currículo:** mantenha o PDF em `public/cv/` e sua referência em [resume.ts](src/data/resume.ts). A versão inglesa ainda não está disponível.
- **Identidade visual:** os tokens estão em [globals.css](src/app/globals.css); os SVGs da marca ficam em `public/brand/`.

## Deploy

O fluxo previsto usa **Vercel com o preset Next.js**, instalação por `npm ci`, build por `npm run build` e diretório de saída padrão do framework. Use uma versão de Node.js compatível com `package.json`.

A origem configurada para os metadados é `https://felipetajima.vercel.app`, centralizada em [src/data/site.ts](src/data/site.ts). Esse endereço está associado ao portfólio anterior; a configuração no código não substitui a implantação existente.

Antes de promover uma implantação, valide o preview nos dois idiomas e temas, navegação, projetos, contatos e download do currículo. Confira também os cabeçalhos de segurança e o bloqueio de indexação do preview. O passo a passo está em [docs/publicacao.md](docs/publicacao.md).

A aplicação utiliza o otimizador de imagens e o redirect do Next.js. Uma exportação estática exige adaptações de imagens e redirecionamento, conforme as [decisões técnicas](docs/adr/0006-fundacao-tecnica.md).

## Documentação

- [Índice da documentação](docs/README.md)
- [Arquitetura](docs/architecture.md)
- [Decisões arquiteturais](docs/adr/README.md)
- [Funcionalidades e critérios de aceite](docs/features/README.md)
- [Estado atual e retomada do desenvolvimento](docs/estado-atual.md)
- [Publicação e verificação de pré-produção](docs/publicacao.md)

## Autor e licença

Desenvolvido por **Felipe Tajima** · [GitHub](https://github.com/vulgotaj) · [LinkedIn](https://www.linkedin.com/in/feltajima)

Projeto sob a [licença MIT](LICENSE). As licenças de terceiros estão em [public/licenses/](public/licenses/) e a licença da Jost em [src/assets/fonts/OFL.txt](src/assets/fonts/OFL.txt).
