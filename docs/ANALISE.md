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
- No pacote, as matérias das seções tinham todas a mesma data e autoria genérica ("Redação"). Na prévia, cada uma ganhou autoria e data plausíveis; na versão final, devem ser a autoria e a data reais.
- 17 das 21 matérias tinham apenas uma frase no lugar da imagem. Na prévia, todas ganharam foto ou vídeo (ver seção 4).

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

## 4. Imagens e vídeos

Para a prévia parecer um portal em uso, todas as 21 matérias receberam foto ou vídeo. As imagens foram recortadas no formato do feed (4:3) e convertidas para WebP. Os vídeos foram cortados para 11 a 14 segundos, ficaram sem áudio (a narração original é em inglês) e ganharam legendas em português. Cada um ocupa menos de 0,5 MB. A legenda de cada matéria mostra autor, licença, fonte e link para a página original.

### Créditos

| Matéria | Mídia | Autor | Licença | Fonte |
| --- | --- | --- | --- | --- |
| O que um robô ensina sobre trabalhar em equipe? | Foto | Pacote original | — | Entre NAPs v4 |
| O feijão acordou! | Galeria (2 fotos) | Pacote original | — | Entre NAPs v4 |
| Uma garrafa, três camadas e muita ciência | Foto e vídeo | Pacote original | — | Entre NAPs v4 |
| Crônica de um recreio que não queria acabar | Foto | Pacote original | — | Entre NAPs v4 |
| A turma mediu o pátio | Foto (fita métrica) | ambabheg | CC BY 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Measuring_tape.jpg) |
| Como a sombra ficou tão grande? | Foto (teatro de sombras) | Pauloleong2002 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Shadow_play.jpg) |
| Onde o pátio esquenta mais? | Foto (termômetro) | Menchi | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clinical_thermometer_38.7.JPG) |
| O que as cores do repolho revelam? | Foto (indicador) | Epaenurk | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Red_cabbage_indicator.jpg) |
| Que visitantes aparecem na horta? | Foto (abelha) | Muhammad Mahdi Karim | GFDL 1.2 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Apis_mellifera_flying.jpg) |
| Uma roda para escutar quem pensa diferente | Foto (sala de aula) | NASA / Kennedy Space Center | Domínio público | [NASA](https://images.nasa.gov/details/KSC-04pd0309) |
| Mostra de Projetos em preparação | Foto (mostra de ciências) | NASA Headquarters | Domínio público | [NASA](https://images.nasa.gov/details/201404220019HQ) |
| NASA abre ao público imagens da Lua feitas pela Artemis II | Foto (crateras) | NASA Johnson Space Center | Domínio público | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Poynting_and_Kekul%C3%A9_Craters_on_the_Lunar_Far_Side_(art002e012702).jpg) |
| | Vídeo (simulação do sobrevoo, 14 s) | NASA / Goddard | Domínio público | [NASA](https://images.nasa.gov/details/mission_1min_2160p30) |
| Como a luz vira eletricidade em um painel solar? | Foto (painéis) | Noggen13 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Photovoltaic_Panels.JPG) |
| Guia apresenta as aves da Restinga de Cabedelo | Foto (bem-te-vi) | Giles Laurent | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:092_Great_kiskadee_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg) |
| Bertha Lutz e as pistas que os anfíbios deixaram | Foto (retrato de 1925) | Restauração de Adam Cuerden | Domínio público | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bertha_Lutz_1925.jpg) |
| As fases da Lua são a sombra da Terra? | Foto (eclipse lunar) | Muhammad Mahdi Karim | GFDL 1.2 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lunar_eclipse_June_2011_Total.jpg) |
| | Vídeo (demonstração das fases, 14 s) | NASA / Johnson | Domínio público | [NASA](https://images.nasa.gov/details/jsc2020m000081-STEMonstrations_Moon_Phases) |
| O que você perguntaria à astronauta Christina Koch? | Foto (a Lua vista da Orion) | NASA Johnson Space Center | Domínio público | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Across_the_Moon%E2%80%99s_Near_Side_and_Far_Side_--_art002e012216.jpg) |
| Por que o céu é azul? | Foto (céu e nuvens) | Tiago Fioreze | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clouds_over_the_Atlantic_Ocean.jpg) |
| Desafio: para onde a sombra foi? | Foto (relógio de sol) | NASA / Ames Research Center | Domínio público | [NASA](https://images.nasa.gov/details/ARC-2006-ACD06-0213-055) |
| Brasil e China avançam no projeto de um satélite | Foto (a Terra vista da Apollo 17) | NASA / tripulação da Apollo 17 | Domínio público | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg) |
| | Vídeo (a Terra vista de órbita, 11 s) | NASA / Goddard | Domínio público | [NASA](https://images.nasa.gov/details/GSFC_20150420_Orbit_m11858_2014) |
| Mãos limpas antes do lanche | Foto (mãos com espuma) | Designed by Magnific | Confirmar | Enviada pela equipe |

### Cuidados antes de publicar de verdade

- **Fotos de estudantes de outra escola.** "Roda de escuta" e "Mostra de Projetos" usam fotos de estudantes americanos, do acervo da NASA. Servem para a prévia; no site real, troque por fotos do Pio X com termo de uso de imagem.
- **Licenças com compartilhamento.** As fotos CC BY-SA exigem crédito ao autor e indicação da licença, o que a prévia já faz. As duas fotos sob GFDL 1.2 (abelha e eclipse) pedem que o texto completo da licença acompanhe a imagem; o mais simples é trocá-las por fotos em domínio público ou CC BY.
- **Foto das mãos limpas.** Confirmar se a licença da Magnific permite o uso em um site institucional.
- **De onde vieram as imagens.** Wikimedia Commons e a biblioteca de imagens e vídeos da NASA ([images.nasa.gov](https://images.nasa.gov)), que é toda em domínio público e foi a fonte mais estável. O Wikimedia limita os pedidos vindos de servidores na nuvem; para a versão final, vale baixar as imagens manualmente ou usar fotos próprias.

## 5. O que a prévia faz e o que é simulado

Funciona de verdade no navegador: navegação por link (`#materia-agua` abre direto a matéria), curtir, salvar, seguir NAPs, comentar, votar, responder o quiz, sugerir pauta, publicar como comitê (com fotos), aprovar ou recusar como curadoria e ver o resultado no feed.

Simulado: tudo fica guardado só no dispositivo de quem testa. Os números de curtidas, seguidores e votos e os cerca de 35 comentários da comunidade foram criados para a prévia parecer um portal em uso há algumas semanas. No lançamento, tudo começa do zero. O perfil (Estudante, Comitê, Curadoria) é trocado na tela de Perfil para facilitar o teste; na versão final ele virá da conta escolar.

## 6. Próximos passos para a versão publicada

**Conteúdo e identidade**
1. Validar as cores com a comunicação do colégio (o nome Entre NAPs já está decidido).
2. Conferir nas fontes as matérias com datas de 2026 (Artemis II, CBERS 06, Christina Koch).
3. Trocar depoimentos ilustrativos por reais e definir os nomes do expediente.
4. Substituir as fotos de estudantes de outra escola e as fotos sob GFDL, e confirmar a licença da foto das mãos limpas (ver seção 4).
5. Zerar curtidas, seguidores, votos e comentários de exemplo.

**Técnico**
6. Login com conta institucional e papéis atribuídos pela coordenação.
7. Banco de dados para matérias, comentários, curtidas, seguidores e votos (o manifesto atual tem `d1: null`).
8. Funções novas no servidor: curtir, seguir, sugerir pauta e retorno da curadoria.
9. Hospedagem com endereço próprio.
10. Termo de uso de imagem e política de privacidade revisados pela escola.
