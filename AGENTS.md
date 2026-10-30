# Contrato operacional

## Arquitetura e limites

- Use Next.js com App Router, TypeScript estrito e Tailwind CSS.
- Priorize páginas pré-geradas e Server Components. Use Client Components apenas onde houver interação ou APIs do navegador.
- Contato usa links para LinkedIn, GitHub, e-mail, Instagram e WhatsApp. Não crie formulário, endpoint ou integração de envio de mensagens.
- Não adicione backend separado, banco, autenticação, CMS ou estado global sem requisito concreto.
- Motion foi escolhido pelo usuário para a abertura; a aplicação usa essa mesma dependência para o movimento das partículas, conforme `docs/adr/0008-motion-e-particulas.md`. Não adicione outro motor de animação sem necessidade e definição com o usuário.
- Implemente somente o escopo solicitado. Registre decisões arquiteturais relevantes em `docs/adr/`, sem duplicar este contrato.

## Estrutura

- Adote `src/app/` para rotas e layouts e `src/app/[lang]/` para páginas em português e inglês.
- Use `src/components/` para apresentação, `src/content/projects/` para projetos e `src/i18n/` para traduções.
- Mantenha currículos em `public/cv/`; não crie estrutura de servidor sem necessidade concreta.
- Separe conteúdo da interface. Adicionar, ordenar ou destacar projetos não deve exigir mudanças nos componentes.
- Valide os dados dos projetos antes da publicação. Não crie pastas ou abstrações sem uso concreto.

## Código e interface

- Prefira responsabilidades pequenas, tipos explícitos nas fronteiras e composição simples. Evite `any` e abstrações especulativas.
- Comente decisões e restrições pouco evidentes, sem narrar o código.
- Centralize tokens visuais e use Tailwind de forma consistente; evite valores repetidos sem significado compartilhado.
- Use a skill `frontend-design` em trabalhos visuais e siga as referências fornecidas pelo usuário.
- O hero ocupa a tela de entrada, com boas-vindas, nome, função e espaço para imagem. Não adicione uma lista de tecnologias abaixo da função.
- Use partículas contínuas no fundo do hero, sem uma máscara vazia ao redor do texto. Em telas amplas, priorize nome em uma linha e composição horizontal; permita quebra em telas estreitas.
- Projetos são a primeira seção após o hero, em slide horizontal com preview e texto sobre o fundo da página, sem card externo. Serviços freelance usam cards.
- Use Jost na interface e o lettering SVG próprio, com cor sólida, na marca; não recrie a logo como texto nem aplique gradiente. Mantenha fundo branco/preto e as cores conforme os tokens de design.
- Toda mudança visual deve funcionar em celular, tablet e desktop, nos dois temas e idiomas.
- Respeite teclado, foco visível, contraste e `prefers-reduced-motion`. Animações não devem bloquear conteúdo ou navegação.
- Traduza também metadados, mensagens e estados. Preserve a seção equivalente ao trocar de idioma quando possível.
- Respeite a preferência inicial de tema do sistema, persista a escolha manual e evite clarão do tema incorreto.

## Verificação

- Execute os scripts existentes aplicáveis de tipos, lint, testes e build antes de concluir; informe falhas e verificações não executadas.
- Teste comportamentos e riscos reais, especialmente conteúdo, navegação e slide de projetos; evite testes que apenas reproduzam a implementação.
- Em mudanças visuais, confira os dois idiomas e temas em larguras de celular, tablet e desktop, além de teclado e movimento reduzido.
- Confira links sociais, seus nomes acessíveis e destinos; testes não devem enviar mensagens nem acionar conversas reais.
- Se ainda não houver ferramentas ou scripts, declare a limitação; não apresente verificações inexistentes como concluídas.

## Git

- Preserve alterações do usuário e mantenha o diff restrito à tarefa; não inclua segredos, dependências instaladas ou artefatos de build.
- Quando criar branches, use o prefixo `codex/`. Não reescreva histórico nem descarte trabalho sem autorização explícita.

## Segurança

- Nunca exponha credenciais no cliente, em variáveis `NEXT_PUBLIC_*`, logs ou respostas da API.
- Publique somente os contatos fornecidos pelo proprietário; não invente perfis, endereço de e-mail ou número de telefone.
- Links externos devem usar protocolos e destinos válidos; não aceite conteúdo executável nos dados de links. Não colete dados pessoais para acessar os contatos.
