# Currículo — F07

## Objetivo e escopo confirmado

Disponibilizar currículo para download, com acesso fácil desde a apresentação. Critérios compartilhados estão no [índice](README.md#critérios-transversais).

Estado implementado em 2026-10-30: o proprietário forneceu `Felipe_Tajima_Curriculo_Fullstack_ATS.pdf` e solicitou substituir a ação do hero por “Baixar Currículo”. O PDF em português foi copiado sem edição para `public/cv/felipe-tajima-curriculo-fullstack-pt.pdf`, com SHA-256 `F9218AB68E29D6A8452AB4279DC8238A1615A8710B4EA06FEE58C3B5A623213D`, idêntico ao original. A conferência do PDF confirmou uma página, nome do proprietário e texto em português. `src/data/resume.ts` centraliza caminho e idioma; o link HTML usa `download`, `type="application/pdf"` e `hreflang="pt-BR"`. Na página inglesa, “Download Résumé (PT-BR)” identifica a alternativa disponível. A indicação com seta continua levando a projetos.

## Comportamento

- Disponibilizar arquivos PDF estáticos, com uma versão em português e outra em inglês quando fornecidas.
- O idioma da página determina o arquivo preferencial; o rótulo informa claramente a ação e, quando necessário, o idioma disponível.
- Apresentar a ação no hero e permitir acesso consistente pelos demais pontos definidos no design, sem exigir cadastro ou envio de dados.
- O arquivo deve ter nome compreensível, identificar o profissional e o idioma e representar a versão vigente. Atualizar o currículo não deve exigir alterações nos componentes.
- Solicitar download pelo mecanismo suportado pelo navegador; se ele abrir um visualizador de PDF, o arquivo deve continuar acessível e permitir salvamento.

## Estados e exceções

- Se não houver arquivo no idioma atual, informar a ausência e oferecer explicitamente a outra versão disponível, identificando seu idioma. Nunca trocar o arquivo silenciosamente.
- Se nenhum arquivo estiver disponível, não exibir uma ação de download ativa; informar indisponibilidade onde pertinente e manter o acesso ao contato.
- Arquivo configurado inexistente ou inválido deve ser detectado na validação de publicação. Falhas de rede durante o acesso não devem produzir mensagem falsa de download concluído.
- Não publicar PDFs vazios, arquivos de exemplo nem currículos gerados com informações não fornecidas.
- Trocar idioma usa a versão correspondente quando existir, sem reiniciar a abertura ou perder a seção atual. Enquanto só houver o PDF em português, manter o destino e identificar PT-BR no rótulo inglês.

## Critérios de aceite

- **CV-01:** com currículo disponível, o visitante acessa um PDF real a partir do hero, por teclado ou toque e sem JavaScript.
- **CV-02:** páginas em português e inglês apontam para o arquivo correspondente quando ambas as versões existem.
- **CV-03:** ausência de uma versão é comunicada e a alternativa identifica seu idioma; ausência de todas não gera link quebrado ou botão ativo sem destino.
- **CV-04:** a verificação de publicação detecta referência a arquivo ausente ou não PDF e confere se o conteúdo pertence ao profissional.
- **CV-05:** atualizar o arquivo ou sua referência atualiza o download publicado, sem alterar componentes; a publicação deve evitar servir versão antiga por configuração inadequada de cache.

## Fora do escopo e pendências

Não inclui geração automática de currículo, edição pelo site ou rastreamento individual de downloads. A versão inglesa ainda não foi fornecida. Não gerar tradução do documento nem alterar o PDF original. O build valida o caminho em `/cv/` e os marcadores `%PDF-`/`%%EOF`; a conferência de autoria/idioma foi manual nesta publicação. Os arquivos públicos são servidos pelo Next sem configuração adicional de cache imutável.
