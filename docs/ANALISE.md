# Análise do pacote "Entre NAPs v4" e proposta para o periódico

Pacote analisado: `Entre-NAPs-v4-auditoria-externa.zip` (código-fonte, Worker compilado, mídias e ferramentas de auditoria da versão 4).
Prévia proposta: [`previa/index.html`](../previa/index.html).

## 1. O que o pacote contém

| Parte | Conteúdo |
| --- | --- |
| `src/index.html`, `style.css`, `app.js` | Página única com carrossel, 10 seções fixas, perfis dos NAPs, feed com filtros, barra lateral, diálogos para matéria, busca, envio e curadoria |
| `src/data.js` | 4 NAPs, 21 matérias (11 de projetos das turmas e 10 das seções), comentários de exemplo, enquete e itens de revisão |
| `src/server.js` | Worker (Cloudflare) com R2: feed, enquete por cookie, comentários e envios moderados, upload de mídia, papéis (dono, curadoria, comitê, comunidade) |
| `src/media/` | 5 imagens WebP, 1 vídeo MP4 de 12 s com legendas VTT |
| `auditoria/` | Prévia local somente leitura e verificação básica |

A base é sólida: HTML semântico, foco visível, legendas no vídeo, transcrição, BNCC em cada matéria, fontes citadas, moderação antes de publicar e validação real do tipo de arquivo no upload.

## 2. Diagnóstico

### Navegação e organização (o maior problema)

1. **Empilhamento.** A página inicial tem, em sequência: faixa da edição, carrossel, índice com 10 botões, 10 caixas de seção, perfis dos NAPs, filtros e feed, e uma barra lateral. Quem entra precisa rolar muito antes de chegar às matérias.
2. **Conteúdo duplicado.** As 10 matérias das seções aparecem nas caixas e de novo em "Últimas publicações".
3. **Matérias sem endereço.** A matéria abre em uma janela sobreposta, sem link próprio. Não dá para compartilhar uma matéria no grupo da turma nem salvar nos favoritos do navegador.
4. **Carrossel automático a cada 3 s.** Rápido demais para ler o título e o resumo. Há botão de pausa, mas a troca automática atrapalha leitores lentos e quem usa leitor de tela.
5. **Enquete e quiz escondidos.** Ficam num bloco oculto e são movidos por script para dentro das seções. Funciona, mas são as partes mais participativas e estão enterradas no meio da página.
6. **10 seções no mesmo nível.** Sem agrupamento, o leitor não entende a diferença entre "Natureza em Foco", "Ciência da Nossa Terra" e "Como funciona?". As 11 matérias de projetos das turmas não pertencem a nenhuma seção.

### Participação

- **Curtidas não são sociais.** Ficam só no navegador, e o número exibido é fixo no código. Um estudante não vê que colegas curtiram.
- **Comentário com nome livre.** Qualquer pessoa logada pode assinar como "Prof. André". O nome deve vir da conta.
- **Sem retorno da curadoria.** Quem envia vê "Não aprovado" sem saber o motivo.
- **Estudante sem comitê não contribui com pautas**, apenas comenta.

### Servidor, dados e privacidade

| Ponto | Risco | Recomendação |
| --- | --- | --- |
| `/api/feed` lê **todos** os registros do R2, um a um, a cada visita | Lentidão e custo crescem a cada comentário | Guardar registros em banco (D1/SQLite) e deixar o R2 só para mídia |
| Enquete conta todos os votos listando o bucket a cada voto | Mesmo problema de escala | Contador no banco |
| Voto por cookie de navegador | Basta uma aba anônima para votar de novo | Um voto por conta escolar |
| Identidade lida dos cabeçalhos `oai-authenticated-*` | Seguro só atrás do proxy do Sites; em outra hospedagem os cabeçalhos podem ser forjados | Validar sessão/token do provedor de login ao migrar |
| Login "Entrar com ChatGPT" | Estudantes menores de idade não deveriam precisar de conta externa | Login com a conta institucional da escola |
| Curadoria pode "aprovar" os itens de exemplo | Grava dados fictícios no armazenamento de produção | Remover amostras antes do lançamento |
| Sem limite de envios | Spam de comentários | Limite por conta e por minuto |
| Upload de até 12 MB sem redução | Pesado no 4G, ocupa armazenamento | Reduzir fotos no navegador antes de enviar (a prévia já faz isso, para 1080 px) |
| Imagens de crianças | LGPD e ECA | Termo de uso de imagem por estudante, só primeiro nome ou turma, sem rostos do NAP I quando possível |

### Conteúdo

- Conferir, antes de publicar, as matérias com datas de 2026 (Artemis II, CBERS 06) direto nas fontes citadas.
- Depoimentos ilustrativos estão marcados no texto, o que é correto. Manter essa marcação até haver depoimentos reais.
- As matérias das seções têm todas a mesma data e autoria genérica. Na versão final, cada uma deve ter autoria e data reais.

## 3. Proposta

### Nome

Decisão: manter **Entre NAPs**, com o subtítulo "Periódico de ciência e tecnologia dos estudantes". O nome já é conhecido pela comunidade e fala dos quatro NAPs. Alternativas avaliadas: Hipótese, Laboratório Aberto, Eureka Pio X.

### Identidade visual

- Azul-marinho institucional Marista nas barras de navegação (topo no celular, menu lateral no PC), com o amarelo do uniforme como destaque (marca, anel dos stories, item ativo).
- As quatro cores dos NAPs (verde, amarelo, azul, roxo) identificam autoria e seções.
- Tipografia sem serifa para a interface (familiar para quem usa redes sociais) e serifada para títulos e texto das matérias (leitura de periódico).
- Modo escuro automático.
- Os tons foram aproximados do uniforme nas fotos. Vale confirmar os códigos oficiais com a comunicação do colégio.

### Organização em 3 cadernos

| Caderno | Seções |
| --- | --- |
| **Ciência em Pauta** | Natureza em Foco, Ciência da Nossa Terra, Como Funciona?, Maristech, Saúde em Dia |
| **Gente que Pesquisa** | **Diário de Bordo** (nova: projetos das turmas), Pequenos e Grandes Cientistas, Fala, Gênio! |
| **Participe** | Fato ou Fake?, Pergunte ao Jornal, Desafio da Próxima Edição |

### Navegação no padrão das redes sociais

| Lugar | O que tem |
| --- | --- |
| **Início** | Faixa de seções logo abaixo dos stories. Stories interativos (Fato ou Fake?, Enquete, Desafio, Pergunte, Agenda), capa da edição em carrossel deslizável (sem troca automática) e feed com uma matéria por cartão. Aba "Seguindo" mostra só os NAPs que a pessoa segue |
| **Seções** | Busca (inclui termos do glossário), cartões de cada seção agrupados por caderno, com descrição e número de matérias, e perfis dos NAPs. Cada seção tem página própria com faixa colorida, atalho para as seções vizinhas e as matérias. No PC, a lista de seções fica sempre visível no menu lateral |
| **Publicar / Sugerir** | Comitê publica (com pré-visualização ao vivo do cartão). Qualquer estudante sugere pauta |
| **Edição** | Sumário por caderno e seção, fluxo editorial, política editorial, expediente, inspirações e arquivo de edições |
| **Perfil** | Salvos, curtidas, envios com status e retorno da curadoria |
| **Curadoria** | Fila única de publicações, comentários e pautas, com campo de retorno para a autoria e alerta de matéria de ciência sem fonte |

Gestos familiares: tocar duas vezes na imagem para curtir, número de curtidas e de comentários ao lado de cada ícone, deslizar a capa, tocar nas laterais ou deslizar para passar os stories, salvar com o marcador, compartilhar por link ou WhatsApp.

Autoria: cada matéria é assinada por quem a produziu (comitê de cada NAP, professores ou curadoria docente). "Redação Entre NAPs" assina apenas a capa da edição.

### Camada de periódico científico

Inspirada no [Frontiers for Young Minds](https://kids.frontiersin.org/about), periódico científico escrito para jovens:

- **Resumo** destacado no topo de cada matéria.
- **Pergunta de investigação** nas matérias do Diário de Bordo.
- **Glossário** ao fim do texto.
- **Conexão com a BNCC**, **fontes consultadas** e **como citar** (formato ABNT).
- **Identificador permanente** por matéria (`EN·v1n0·e08`), volume, número e periodicidade.
- **Fluxo editorial público**: pauta, revisão por pares estudantis (comitê de outro NAP), curadoria docente e publicação.

## 4. O que a prévia faz e o que é simulado

Funciona de verdade no navegador: navegação por link (`#materia-agua` abre direto a matéria), curtir, salvar, seguir NAPs, comentar, votar, responder o quiz, sugerir pauta, publicar como comitê (com fotos), aprovar ou recusar como curadoria e ver o resultado no feed.

Simulado: tudo fica guardado só no dispositivo de quem testa. Os números de curtidas, seguidores e votos partem de valores de exemplo. O perfil (Estudante, Comitê, Curadoria) é trocado na tela de Perfil para facilitar o teste; na versão final ele virá da conta escolar.

## 5. Próximos passos para a versão publicada

1. Definir o nome e validar cores com a comunicação do colégio.
2. Login com conta institucional e papéis atribuídos pela coordenação.
3. Banco de dados para matérias, comentários, curtidas, seguidores e votos (o manifesto atual tem `d1: null`).
4. Endpoints novos: curtir, seguir, sugerir pauta e retorno da curadoria.
5. Termo de uso de imagem e política de privacidade revisados pela escola.
6. Revisão das matérias de exemplo e troca de depoimentos ilustrativos por reais.
