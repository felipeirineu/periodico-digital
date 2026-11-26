# Entre NAPs · Periódico Digital

Código-fonte da versão 4 publicada em https://entre-naps.felipeirineu.chatgpt.site/. O pacote inclui o carrossel, as dez seções fixas, a enquete e o quiz Fato ou Fake?.

## Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `src/index.html` | Estrutura da página inicial |
| `src/style.css` | Identidade visual e layout responsivo |
| `src/app.js` | Interface, navegação, carrossel, busca e participação |
| `src/data.js` | Seções, matérias, perfis dos NAPs e dados da edição piloto |
| `src/server.js` | API, enquete, autenticação, curadoria e mídia enviada |
| `src/media/` | Imagens, vídeo e legendas que acompanham a edição |
| `scripts/build.mjs` | Compilação do Worker e incorporação das mídias |
| `.openai/hosting.json` | Configuração do projeto original no Sites |
| `dist/` | Compilação pronta da versão publicada |

## Como compilar

1. Extraia o ZIP e abra um terminal na pasta `Entre-NAPs`.
2. Use Node.js 22 ou superior.
3. Execute `npm run build`. O projeto usa apenas bibliotecas do próprio Node.js.
4. A compilação gera `dist/server/index.js`, o ponto de entrada do Worker.

A interface é servida pelo Worker. Para usar o site completo, execute a compilação em um ambiente compatível com Cloudflare Workers. Ao configurar outra hospedagem ou um novo projeto no Sites, associe o manifesto ao projeto de destino.

O armazenamento R2 precisa estar vinculado como `BUCKET` para votos, envios, comentários e moderação. A curadoria depende da integração de login do Sites e da variável `EDITOR_EMAIL`, definida no ambiente de publicação. Em outro provedor, adapte a integração de identidade à autenticação desse ambiente.

As mídias da edição piloto e o conteúdo de `src/data.js` fazem parte do código. Votos, perfis, contribuições, comentários e arquivos enviados que estão no armazenamento do site são dados de produção e ficam fora deste ZIP. Credenciais e valores de configuração também ficam fora.

Código da versão publicada: `9fa2d2b0a6e01702fa791b7d586171049baf922e`.
