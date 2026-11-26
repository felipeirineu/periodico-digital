# Entre NAPs · versão 5 para o Sites

Atualização do projeto publicado em https://entre-naps.felipeirineu.chatgpt.site/ com a nova prévia do periódico (navegação no estilo de rede social, seções em destaque, stories, fotos e vídeos com créditos).

O manifesto `.openai/hosting.json` é o mesmo da versão 4 e aponta para o projeto já existente no Sites.

## Como publicar

1. No ChatGPT, abra a conversa (ou o projeto) onde o site Entre NAPs foi criado.
2. Anexe este ZIP e peça:
   > Substitua o código do site Entre NAPs pelo conteúdo deste pacote (versão 5) e publique no mesmo projeto do Sites, mantendo o `.openai/hosting.json`. Rode `node scripts/build.mjs` e `node auditoria/verificar.mjs` antes de publicar.
3. Abra o site e confira o início, uma matéria com vídeo (por exemplo, `#materia-fases-ou-eclipse`) e a aba Seções.

## Conferir antes, no seu computador (opcional)

Com Node.js 22 ou superior, dentro desta pasta:

1. `node scripts/build.mjs`
2. `node auditoria/verificar.mjs`
3. `node auditoria/previa.mjs` e abra http://127.0.0.1:8080

## O que mudou em relação à versão 4

| Arquivo | Mudança |
| --- | --- |
| `src/index.html`, `src/style.css`, `src/app.js` | Nova interface completa. Os dados da prévia (matérias, comentários de exemplo, enquete, quiz) ficam em `app.js` |
| `src/media/` | 21 matérias com foto, 4 vídeos curtos. Créditos e licenças aparecem na legenda de cada matéria |
| `src/server.js` | Regra de segurança (CSP) ajustada para fontes do Google Fonts, estilos inline, miniaturas geradas no navegador e legendas dos vídeos |
| `scripts/build.mjs` | `data.js` deixa de ser embutido em `app.js` e segue só no Worker (API) |
| `auditoria/verificar.mjs` | Confere os novos arquivos de mídia |

## Importante

- A interface desta versão é a prévia: curtidas, comentários, envios e curadoria ficam salvos no navegador de quem usa. A API do Worker continua no pacote, mas a nova interface ainda não está ligada a ela. Ligar as duas é o próximo passo técnico (ver `docs/ANALISE.md` no repositório).
- Antes de abrir para os estudantes, veja a seção "Cuidados antes de publicar de verdade" da análise: fotos de estudantes de outra escola, licenças GFDL e a foto das mãos limpas.
