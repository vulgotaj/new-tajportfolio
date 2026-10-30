# Temas — F05

## Objetivo e escopo confirmado

Oferecer versões clara e escura com qualidade visual consistente. As regras de cor da marca e as referências ficam em [design.md](../design.md); critérios compartilhados, no [índice](README.md#critérios-transversais).

Fundação de 2026-10-25: mecanismo implementado na página mínima com Sistema/Claro/Escuro, escolha persistida e aplicação antes da hidratação. O tema não tem transição animada. Cobertura executada no [registro da fundação](../fundacao-verificacao.md); as seções ainda não implementadas precisarão de revisão própria.

Revisão solicitada pelo proprietário: o header agora tem um botão que alterna diretamente entre claro e escuro, sem abrir seletor. A ação considera o tema efetivo, inclusive quando ele veio do sistema, e informa a próxima ação em PT/EN. A preferência inicial do sistema e a escolha manual persistida permanecem; não há ação de retorno ao automático na interface atual.

Estado em 2026-10-26: claro/escuro e seus controles foram conferidos nas seções implementadas, nos dois idiomas e nas três larguras da matriz. A abertura usa o mesmo tema efetivo desde a ativação, inclusive preferência salva contra o sistema; [verificação da abertura](../abertura-verificacao.md) e [contato](../contato-verificacao.md).

## Comportamento proposto

- Na ausência de escolha salva, acompanhar a preferência de tema do sistema; se ela não puder ser consultada, adotar claro como fallback.
- Permitir alternar manualmente entre claro e escuro. O controle informa seu propósito e a opção ativa ou ação resultante de forma inequívoca.
- Salvar a escolha explícita no navegador e aplicá-la nas próximas visitas antes da primeira pintura, inclusive à abertura.
- A escolha salva prevalece sobre alterações do sistema. Sem escolha explícita, mudanças do sistema atualizam o tema durante a visita.
- Trocar o tema mantém idioma, seção, menu e contexto do slide; não recarrega a página nem reinicia a abertura. O fundo principal é branco puro no claro e preto puro no escuro; a logo fica preta no claro e branca no escuro, incluindo todas as letras e símbolos no header, rodapé e abertura.
- Considerar toda a interface: texto, superfícies, imagens aplicáveis, bordas, foco, campos e mensagens. A cor não deve ser a única forma de comunicar estados.
- Eventual transição visual deve ser breve e respeitar movimento reduzido; não depender de uma biblioteca de animações.

## Estados e exceções

- Estados: preferência automática do sistema, claro manual e escuro manual. O controle inicial pode alternar apenas claro/escuro; botão adicional para voltar ao automático não é requisito desta versão.
- Armazenamento bloqueado ou indisponível não impede a troca na página atual; a preferência pode deixar de persistir entre carregamentos.
- Valor salvo inválido é ignorado, usando a preferência do sistema ou o fallback.
- Sem JavaScript, aplicar ao menos uma apresentação legível e a preferência do sistema via estilos, sem deixar conteúdo invisível.

## Critérios de aceite

- **TE-01:** sem preferência salva, o tema acompanha o sistema e segue o fallback se necessário.
- **TE-02:** a escolha manual prevalece, persiste quando o armazenamento está disponível e é aplicada sem clarão de outro tema.
- **TE-03:** mudar o tema preserva contexto da página/slide, nos dois idiomas; fundos principais são branco/preto puros e a logo acompanha o tema ativo: preta no claro e branca no escuro, sem alterar seus traçados ou espaçamento.
- **TE-04:** controle e mensagens permanecem compreensíveis por teclado e leitor de tela; estados não dependem só de cor.
- **TE-05:** os dois temas mantêm contraste, foco visível e identidade conforme o documento de design, incluindo a abertura.
- **TE-06:** armazenamento indisponível, valor salvo inválido e movimento reduzido têm os comportamentos previstos sem erro impeditivo.

## Pendências

Tokens monocromáticos, fallback claro e alternância direta no header já foram implementados. Conferir os tokens e os estados nas seções futuras; eventual transição continua opcional.
