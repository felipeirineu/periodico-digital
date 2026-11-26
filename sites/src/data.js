const naps = [
  {id:'I', title:'Educação Infantil', range:'Educação Infantil', color:'green', symbol:'sprout', description:'Brincar, explorar e descobrir o mundo com o corpo, a imaginação e a curiosidade.', curriculum:'Campos de experiências', areas:['O eu, o outro e o nós','Corpo, gestos e movimentos','Traços, sons, cores e formas','Escuta, fala, pensamento e imaginação','Espaços, tempos, quantidades, relações e transformações']},
  {id:'II', title:'Anos iniciais', range:'2º ao 5º ano', color:'yellow', symbol:'bulb', description:'Perguntas da sala viram histórias, investigações e projetos construídos em grupo.', curriculum:'Ensino Fundamental · anos iniciais', areas:['Linguagens','Matemática','Ciências da Natureza','Ciências Humanas','Ensino Religioso']},
  {id:'III', title:'Anos finais', range:'6º ao 8º ano', color:'blue', symbol:'flask', description:'Investigações, entrevistas e descobertas feitas pelos estudantes em diferentes componentes curriculares.', curriculum:'Ensino Fundamental · anos finais', areas:['Linguagens','Matemática','Ciências da Natureza','Ciências Humanas','Ensino Religioso']},
  {id:'IV', title:'9º ano e Ensino Médio', range:'9º ano ao 3º do Médio', color:'purple', symbol:'orbit', description:'Reportagens, experimentos e debates que conectam a escola ao mundo.', curriculum:'9º ano do Fundamental e Ensino Médio', areas:['9º ano · Linguagens, Matemática, Ciências da Natureza, Ciências Humanas e Ensino Religioso','Ensino Médio · Linguagens e suas Tecnologias','Ensino Médio · Matemática e suas Tecnologias','Ensino Médio · Ciências da Natureza e suas Tecnologias','Ensino Médio · Ciências Humanas e Sociais Aplicadas']}
];
const sources = [
 {name:'Folhetim Marista', school:'Colégio Marista Criciúma', url:'https://engeplus.com.br/noticia/alunos-do-colegio-marista-criciuma-lancam-jornal-79673', copy:'Um jornal criado por estudantes do Ensino Médio inspirou a autoria do comitê e a publicação por edições.'},
 {name:'Podcast literário', school:'Marista Escola Social Irmão Lourenço', url:'https://colegiosmaristas.com.br/wp-content/uploads/2025/03/PROMAC-Escolas-e-Colegios-Sociais-Maristas-LEM-3-Projeto.pdf', copy:'A proposta de produção literária em áudio inspirou a inclusão de mídia e de transcrições.'},
 {name:'Falaí!', school:'Colégio Santa Cruz', url:'https://santacruz.g12.br/noticia/a-8a-edicao-do-falai-esta-no-ar/', copy:'O jornal da Oficina de Mídias inspirou a divisão em editorias e a orientação docente à produção dos alunos.'},
 {name:'Santa na Net', school:'Colégio Santa Cruz', url:'https://portalcei.santacruz.g12.br/~digital/2022/EF2/7/santananet_livro/index.html', copy:'As reportagens do 7º ano sobre cidadania digital inspiraram a ligação entre a pauta e a aprendizagem em sala.'}
];
const posts = [
 {id:'robo', nap:'II', topic:'Educação Tecnológica', title:'O que um robô ensina sobre trabalhar em equipe?', author:'Comitê NAP II', credit:'Estudantes do 4º ano · orientação de Educação Tecnológica', format:'Reportagem', date:'2026-11-25', deck:'No torneio de robótica, as melhores ideias apareceram quando as equipes trocaram funções e aprenderam com os erros.', body:'Na primeira tentativa, o robô passou direto pela curva. Uma dupla observou as rodas e a outra revisou as instruções. Quando trocaram de função, descobriram que o problema era a ordem dos comandos, e não a velocidade do motor.\n\nPara a reportagem, o comitê anotou hipóteses e comparou três tentativas. No fim, o grupo desenhou a sequência com setas e circulou os trechos que podiam ser repetidos.\n\n“Quando eu expliquei meu programa, percebi onde ele se perdia”, conta uma integrante da equipe, em depoimento ilustrativo.', skill:'EF04CO03 · Criar e simular algoritmos com sequências e repetições. Complemento de Computação à BNCC.', image:'/media/robo.webp', alt:'Estudantes ajustam as peças de um robô escolar', reactions:24},
 {id:'feijao',nap:'I',topic:'Descobertas',title:'O feijão acordou!',author:'Turma do Infantil 5',credit:'Relato das crianças · registro da professora',format:'Galeria',date:'2026-11-24',deck:'A turma plantou feijões no algodão e desenhou as mudanças que apareceram a cada manhã.',body:'No primeiro dia, o feijão era duro e pequeno. Na segunda observação, uma raiz branca apareceu. Cada criança desenhou o que viu e explicou à roda qual parte do desenho havia mudado.\n\nA professora organizou os desenhos em sequência. As crianças compararam os registros e pensaram em perguntas para investigar na semana seguinte, como o que acontece com um pote que recebe menos luz.',skill:'EI03ET04 · Registrar observações usando múltiplas linguagens.',image:'/media/feijao.webp',images:['/media/feijao.webp','/media/feijao-detalhe.webp'],alt:'Feijões germinando em potes de vidro junto à janela',reactions:16},
 {id:'agua',nap:'III',topic:'Ciências',title:'Uma garrafa, três camadas e muita ciência',author:'Comitê NAP III',credit:'Estudantes do 6º ano · orientação de Ciências',format:'Vídeo',date:'2026-11-24',deck:'O 6º ano registrou uma demonstração de filtração e explicou o que cada camada consegue reter.',body:'O grupo comparou o aspecto da água antes e depois da filtração. As camadas de cascalho e areia retiveram parte das partículas em suspensão. O professor conduziu a comparação com a decantação e discutiu por que o aspecto transparente não indica que a água está potável.',skill:'EF06CI03 · Selecionar métodos para a separação de sistemas heterogêneos.',image:'/media/agua.webp',alt:'Protótipo de filtro de água com garrafa transparente e recipientes graduados',video:'/media/agua.mp4', transcript:'Montagem com imagens ilustrativas. A mistura com partículas passa pelas camadas de cascalho e areia. Parte dos sólidos fica retida, e a aparência da água muda. Água filtrada nessa demonstração não é água potável.',reactions:13},
 {id:'cronica',nap:'III',topic:'Produção textual',title:'Crônica de um recreio que não queria acabar',author:'Oficina de Escrita · 7º ano',credit:'Autoria estudantil · revisão de Língua Portuguesa',format:'História',date:'2026-11-23',deck:'Uma crônica sobre amizade, tempo e o sinal que sempre toca cedo demais.',body:'O sinal tocou quando a bola ainda estava no ar. Durante um segundo, ninguém se mexeu. Júlia disse que valia mais um lance, porque a bola tinha saído da mão antes do barulho. Renato, que já estava indo embora, voltou dois passos.\n\nA bola bateu no aro, caiu do lado de fora e rolou até o pé da professora. Ela devolveu a bola e disse que amanhã tinha mais. No caminho para a sala, João me perguntou se eu tinha visto a cesta. Disse que não teve cesta, teve uma promessa.',skill:'EF67LP30 · Criar narrativas ficcionais com enredo, personagens, tempo e espaço.',image:'/media/cronica.webp',alt:'Caderno aberto e pássaro de papel sobre uma mesa',reactions:9},
 {id:'matematica',nap:'II',topic:'Matemática',title:'A turma mediu o pátio. Os resultados deram iguais?',author:'Comitê NAP II',credit:'Estudantes do 3º ano · orientação de Matemática',format:'Reportagem',date:'2026-11-22',deck:'Passos, trenas e a descoberta de por que combinar a unidade faz diferença.',body:'Cada dupla mediu o corredor com seus próprios passos. A turma organizou os resultados em uma tabela e discutiu por que apareceram comprimentos diferentes para o mesmo trajeto.\n\nDepois, as duplas mediram novamente com a trena. Compararam as estimativas com as novas medidas e registraram qual instrumento foi mais fácil de usar em cada situação.',skill:'EF03MA19 · Estimar, medir e comparar comprimentos com diferentes unidades e instrumentos.',cover:'Matemática no pátio',symbol:'ruler',reactions:7},
 {id:'sombras',nap:'I',topic:'Artes e Linguagens',title:'Como a sombra ficou tão grande?',author:'Turma do Infantil 5',credit:'Desenhos e falas das crianças · mediação da professora',format:'Relato',date:'2026-11-21',deck:'Uma lanterna transformou a roda de histórias em um teatro de sombras.',body:'As crianças escolheram um personagem e testaram a distância entre a lanterna, a figura e a parede. Depois inventaram uma história coletiva em que o mesmo personagem cabia numa caixa e crescia até alcançar o teto. A professora anotou o que cada criança contou sobre a brincadeira.',skill:'EI03EF01 · Expressar ideias, desejos e sentimentos sobre vivências por diferentes linguagens.',cover:'Teatro de sombras',symbol:'spark',reactions:11},
 {id:'calor',nap:'IV',topic:'Física',title:'Onde o pátio esquenta mais?',author:'Comitê NAP IV',credit:'1º ano do Ensino Médio · orientação de Física',format:'Investigação',date:'2026-11-21',deck:'A turma comparou temperaturas na sombra, no piso e perto do jardim.',body:'Os estudantes definiram pontos de medição na quadra, sob uma árvore e próximo a um canteiro. Repetiram os registros no mesmo horário em três dias.\n\nNo relatório, distinguiram temperatura de sensação térmica e apontaram que tipo de superfície, exposição solar e circulação do ar precisam entrar na discussão.',skill:'EM13CNT101 · Analisar e representar transformações e conservações em sistemas que envolvem matéria e energia.',cover:'Mapa térmico do pátio',symbol:'sun',reactions:14},
 {id:'ph',nap:'IV',topic:'Química',title:'O que as cores do repolho revelam?',author:'Bancada NAP IV',credit:'1º ano do Ensino Médio · orientação de Química',format:'Investigação',date:'2026-11-20',deck:'Um indicador natural ajudou o grupo a comparar soluções de uso cotidiano.',body:'Com supervisão docente, a turma comparou a cor do indicador em água, vinagre e solução de bicarbonato. Para facilitar a comparação, manteve o volume do indicador constante e registrou as cores sobre papel branco.\n\nO grupo decidiu repetir as observações para verificar a consistência dos resultados.',skill:'EM13CNT301 · Formular hipóteses, interpretar dados e justificar conclusões em investigações.',cover:'Química em cores',symbol:'flask',reactions:8},
 {id:'biologia',nap:'IV',topic:'Biologia',title:'Que visitantes aparecem na horta?',author:'Comitê NAP IV',credit:'2º ano do Ensino Médio · orientação de Biologia',format:'Reportagem',date:'2026-11-19',deck:'O grupo montou um diário de observações de insetos e plantas em diferentes horários.',body:'Os estudantes desenharam um mapa da horta, escolheram áreas fixas para observação e registraram os organismos encontrados. Ao voltar à sala, distinguiram observações diretas de hipóteses sobre quais visitantes poderiam participar da polinização.',skill:'EM13CNT301 · Formular perguntas, representar dados e justificar conclusões em investigações.',cover:'Vida na horta',symbol:'sprout',reactions:6},
 {id:'escuta',nap:'III',topic:'Ensino Religioso',title:'Uma roda para escutar quem pensa diferente',author:'Curadoria docente',credit:'7º ano · depoimentos do comitê estudantil',format:'Entrevista',date:'2026-11-18',deck:'Estudantes entrevistaram colegas sobre respeito a convicções e modos de celebrar.',body:'Em duplas, os estudantes elaboraram perguntas abertas sobre convivência, crenças e tradições. Cada grupo resumiu a fala do outro antes de compartilhar o próprio ponto de vista. Ao final, a turma registrou acordos de escuta para entrevistas futuras.',skill:'EF07ER05 · Discutir estratégias de convivência ética e respeitosa entre as religiões.',cover:'Uma roda de escuta',symbol:'chat',reactions:10},
 {id:'mostra',nap:'IV',topic:'Eventos',title:'Mostra de Projetos em preparação',author:'Comitê NAP IV',credit:'Pauta colaborativa dos quatro NAPs',format:'Agenda',date:'2026-11-17',deck:'As equipes estão preparando estações com experimentos, protótipos e textos para a comunidade escolar.',body:'A edição demonstrativa prevê estações de robótica, física, biologia e narrativas. Cada equipe vai apresentar a pergunta inicial, um registro de bastidores e o que mudou entre a primeira tentativa e a versão exposta.',cover:'Mostra de Projetos',symbol:'calendar',reactions:5}
];
const sampleComments = [
 {id:'c1',postId:'robo',author:'Luísa · estudante',body:'Gostei de ver que trocar de função ajudou a encontrar o erro. Na minha equipe, quem desenhou as setas também acabou explicando o programa para todo mundo.',date:'2026-11-25'},
 {id:'c2',postId:'robo',author:'Prof. André · educador',body:'O registro das tentativas daria uma ótima pauta de bastidores para a próxima edição.',date:'2026-11-25'},
 {id:'c3',postId:'feijao',author:'Patrícia · família',body:'O desenho da raiz foi a primeira coisa que me contaram na saída. Vamos acompanhar o próximo registro!',date:'2026-11-24'},
 {id:'c4',postId:'agua',author:'Rafael · estudante',body:'Dá para repetir a experiência mudando a ordem das camadas e comparar os resultados?',date:'2026-11-24'},
 {id:'c5',postId:'cronica',author:'Prof. Marina · educadora',body:'O detalhe da bola no ar fez eu lembrar de como o tempo do recreio parece diferente.',date:'2026-11-23'}
];
const samplesInReview = [
 {id:'pauta-demo',kind:'post',nap:'II',topic:'Ciências',title:'As cores do céu por uma semana',author:'Comitê NAP II',format:'Relato',deck:'A turma desenhou o céu na entrada e na saída e comparou as diferenças.',body:'Os estudantes do 3º ano registraram nuvens, luminosidade e cores do céu em sete observações da turma. Agora o comitê está preparando a versão para publicação.',date:'2026-11-25',status:'pending', demo:true},
 {id:'comentario-demo',kind:'comment',postId:'agua',author:'Beatriz · família',body:'Gostaria de ver as anotações da equipe depois da segunda tentativa.',date:'2026-11-25',status:'pending',demo:true}
];
const januaryPoll = {
  id:'janeiro-2027',
  options:[
    {id:'robotica', label:'Robótica que ajuda a escola'},
    {id:'agua', label:'A ciência da água no dia a dia'},
    {id:'testes', label:'Como os cientistas testam uma ideia?'}
  ]
};

const editorialSections = [
  {id:'natureza-em-foco',title:'Natureza em Foco',icon:'orbit',color:'blue'},
  {id:'como-funciona',title:'Como funciona?',icon:'bulb',color:'yellow'},
  {id:'ciencia-da-nossa-terra',title:'Ciência da Nossa Terra',icon:'sprout',color:'green'},
  {id:'pequenos-e-grandes-cientistas',title:'Pequenos e Grandes Cientistas',icon:'flask',color:'purple'},
  {id:'fato-ou-fake',title:'Fato ou Fake?',icon:'search',color:'yellow'},
  {id:'fala-genio',title:'Fala, Gênio!',icon:'chat',color:'blue'},
  {id:'pergunte-ao-jornal',title:'Pergunte ao Jornal',icon:'pen',color:'purple'},
  {id:'desafio-da-proxima-edicao',title:'Desafio da Próxima Edição',icon:'sun',color:'green'},
  {id:'maristech',title:'Maristech',icon:'circuit',color:'blue'},
  {id:'saude-em-dia',title:'Saúde em Dia',icon:'heart',color:'green'}
];

posts.push(...[
  {
    id:'artemis-imagens',section:'natureza-em-foco',nap:'IV',topic:'Astronomia',format:'Reportagem',
    title:'NASA abre ao público imagens da Lua feitas pela Artemis II',
    deck:'Fotos e anotações da tripulação mostram como se faz ciência durante um sobrevoo lunar.',
    body:'Em 7 de outubro de 2026, a NASA anunciou a disponibilização de imagens e dados científicos reunidos na missão Artemis II. Durante a passagem pela Lua, a tripulação se revezou para fotografar, anotar e descrever detalhes da superfície. Os registros estão disponíveis no arquivo público de ciência planetária da agência.\n\nQuem observa uma fotografia lunar pode começar comparando manchas claras, regiões escuras e bordas de crateras. Depois, vale conferir como o ângulo da iluminação muda o que aparece na imagem.',
    cover:'Imagens da Lua',symbol:'orbit',
    references:[{name:'NASA · Imagens e dados da Artemis II',url:'https://www.nasa.gov/blogs/artemis/2026/10/07/nasa-releases-artemis-ii-lunar-science-data-images/'}]
  },{
    id:'painel-solar',section:'como-funciona',nap:'III',topic:'Física',format:'Reportagem',
    title:'Como a luz vira eletricidade em um painel solar?',
    deck:'O caminho começa nas células do painel e passa pelo inversor antes de chegar a uma instalação elétrica.',
    body:'Uma célula fotovoltaica tem um material semicondutor, geralmente silício. Quando a luz chega à célula, parte de sua energia permite o surgimento de uma corrente elétrica. Muitas células ligadas formam um módulo.\n\nOs módulos entregam corrente contínua. Em sistemas conectados à rede, o inversor converte essa eletricidade em corrente alternada, compatível com a instalação. Para investigar em sala, imagine dois módulos iguais, um sob a luz e outro à sombra. Qual deles geraria mais eletricidade nas mesmas condições?',
    cover:'Luz em eletricidade',symbol:'sun',
    references:[{name:'Empresa de Pesquisa Energética · Fontes de energia',url:'https://www.epe.gov.br/pt/abcdenergia/fontes-de-energia'},{name:'Ministério de Minas e Energia · Sistema fotovoltaico conectado à rede',url:'https://projeteee.mme.gov.br/equipamento/sistema-fotovoltaico-conectado-a-rede-sfcr-ou-on-grid/'}]
  },{
    id:'restinga-cabedelo',section:'ciencia-da-nossa-terra',nap:'III',topic:'Meio Ambiente',format:'Reportagem',
    title:'Guia apresenta as aves da Restinga de Cabedelo',
    deck:'A publicação do ICMBio ajuda a conhecer a fauna de uma floresta vizinha a João Pessoa.',
    body:'A Floresta Nacional da Restinga de Cabedelo protege ambientes costeiros como a restinga e o manguezal. O guia do ICMBio reúne informações sobre aves registradas na unidade e ajuda a transformar uma observação em uma investigação.\n\nComece por uma ave que você já viu perto de casa ou da escola. Anote onde ela estava, como se movia e que forma tinha o bico. Depois, compare seu registro com o guia e destaque quais pistas ajudaram na identificação e quais ainda deixam dúvida.',
    cover:'Aves de Cabedelo',symbol:'sprout',
    references:[{name:'ICMBio · Guia de aves da Restinga de Cabedelo',url:'https://www.gov.br/icmbio/pt-br/centrais-de-conteudo/publicacoes/guias-de-aves/guiadeavesdaflorestanacionaldarestingadecabedelosousaetal20231.pdf'}]
  },{
    id:'bertha-lutz',section:'pequenos-e-grandes-cientistas',nap:'II',topic:'Biologia',format:'Reportagem',
    title:'Bertha Lutz e as pistas que os anfíbios deixaram',
    deck:'A cientista brasileira estudou anfíbios no Museu Nacional e ajudou a documentar dezenas de espécies.',
    body:'Bertha Lutz ingressou no Museu Nacional em 1919. Na ciência, pesquisou plantas e anfíbios e descreveu mais de 80 espécies de anfíbios, segundo o Instituto Oswaldo Cruz. Sua trajetória também inclui a defesa de direitos das mulheres no Brasil.\n\nUma pergunta para pequenos cientistas: que características você anotaria para permitir que outra pessoa reconhecesse o animal que você observou? Desenhe, descreva e compare seus registros com os de uma dupla.',
    cover:'Ciência de Bertha Lutz',symbol:'flask',
    references:[{name:'Instituto Oswaldo Cruz · Histórias para inspirar futuras cientistas',url:'https://www.ioc.fiocruz.br/noticias/livro-conta-historias-de-pesquisadoras-para-inspirar-futuras-cientistas'}]
  },{
    id:'fases-ou-eclipse',section:'fato-ou-fake',nap:'II',topic:'Astronomia',format:'Investigação',
    title:'As fases da Lua são a sombra da Terra?',
    deck:'Uma checagem para distinguir o que vemos toda semana do que acontece num eclipse lunar.',
    body:'Fake. Em cada fase vemos uma parte diferente da metade iluminada da Lua, porque ela se desloca ao redor da Terra. No eclipse lunar, a Terra fica alinhada entre o Sol e a Lua e sua sombra alcança a superfície lunar. Esse alinhamento acontece em algumas luas cheias.\n\nUma pista para checar a afirmação é comparar o desenho das posições do Sol, da Terra e da Lua nos dois casos.',
    cover:'Fases e eclipses',symbol:'orbit',
    references:[{name:'NASA Science · Fases da Lua',url:'https://science.nasa.gov/moon/moon-phases/'},{name:'NASA Science · Eclipses e a Lua',url:'https://science.nasa.gov/moon/eclipses/'}]
  },{
    id:'perguntas-christina-koch',section:'fala-genio',nap:'IV',topic:'Astronomia',format:'Reportagem',
    title:'O que você perguntaria à astronauta Christina Koch?',
    deck:'A trajetória da engenheira que viajou ao redor da Lua inspira a primeira pauta de entrevista da seção.',
    body:'Christina Koch, engenheira e astronauta da NASA, foi especialista de missão na Artemis II em 2026. Durante a viagem, a NASA anunciou uma conversa da tripulação com jornalistas e abriu espaço para perguntas sobre a missão.\n\nO Fala, Gênio! convida as turmas a preparar perguntas abertas para suas próprias entrevistas. Como você percebeu que um teste precisava mudar? O que mais surpreendeu sua equipe? Os estudantes também podem ser entrevistados sobre seus projetos. Envie sua pauta à curadoria.',
    cover:'Pauta de entrevista',symbol:'chat',
    references:[{name:'NASA · Perfil de Christina Koch',url:'https://www.nasa.gov/people/christina-koch-2/'},{name:'NASA · Conversa da tripulação com a imprensa',url:'https://www.nasa.gov/news-release/nasa-to-host-media-call-with-artemis-ii-crew-on-way-home-from-moon/'}]
  },{
    id:'ceu-azul',section:'pergunte-ao-jornal',nap:'II',topic:'Ciências',format:'Reportagem',
    title:'Por que o céu é azul?',
    deck:'A primeira pergunta da seção passa pela luz do Sol e pelos gases que compõem a atmosfera.',
    body:'A luz do Sol reúne diversas cores. Ao atravessar a atmosfera, ela interage com as moléculas do ar e se espalha em várias direções. A luz azul se espalha com mais facilidade que a vermelha. Parte dela chega aos nossos olhos vinda de várias partes do céu.\n\nQue outra pergunta da sua turma merece uma investigação? Envie-a em um comentário para a curadoria. Conte de onde surgiu a dúvida, sem incluir informações pessoais.',
    cover:'A cor do céu',symbol:'spark',
    references:[{name:'NASA Space Place · Por que o céu é azul?',url:'https://spaceplace.nasa.gov/blue-sky/en/'}]
  },{
    id:'desafio-sombras',section:'desafio-da-proxima-edicao',nap:'II',topic:'Ciências',format:'Investigação',
    title:'Desafio: para onde a sombra foi?',
    deck:'Observe a sombra de um objeto no mesmo ponto em três horários e transforme os registros em um desenho ou tabela.',
    body:'Com orientação de um professor, escolha um objeto fixo em um ponto iluminado. Marque com giz onde termina sua sombra e registre o horário. Volte ao mesmo ponto em outros dois horários e repita o registro.\n\nCompare o comprimento e a direção das sombras. Envie à curadoria os horários, o desenho ou a tabela e uma pergunta que a observação deixou para a próxima edição. A proposta se inspira em uma atividade de relógio de Sol.',
    cover:'Diário de sombras',symbol:'sun',
    references:[{name:'NASA Science · Atividade de relógio de Sol',url:'https://science.nasa.gov/learn/heat/resource/create-a-sundial-activity/'}]
  },{
    id:'maristech-cbers',section:'maristech',nap:'IV',topic:'Educação Tecnológica',format:'Reportagem',
    title:'Brasil e China avançam no projeto de um satélite de observação',
    deck:'A cooperação em torno do CBERS 06 aproxima a tecnologia espacial de perguntas sobre cidades, florestas e água.',
    body:'Em maio de 2026, o INPE recebeu representantes do centro chinês CRESDA para reuniões técnicas da missão CBERS 06. A cooperação faz parte de um programa de satélites de observação da Terra.\n\nUma forma de entender o trabalho é pensar em uma pergunta concreta: como um bairro mudou ao longo dos anos? Imagens da mesma região em datas diferentes ajudam a identificar alterações na vegetação, nas ruas e nas construções. Comparar imagens e conferir o contexto são etapas da investigação.',
    cover:'Satélites e mapas',symbol:'circuit',
    references:[{name:'INPE · Cooperação técnica para o CBERS 06',url:'https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/inpe-e-cresda-avancam-na-cooperacao-tecnica-para-a-missao-cbers-06/'}]
  },{
    id:'maos-limpas',section:'saude-em-dia',nap:'I',topic:'Saúde',format:'Reportagem',
    title:'Mãos limpas antes do lanche',
    deck:'Água e sabonete ajudam a cuidar da saúde em momentos comuns da rotina escolar.',
    body:'O Ministério da Saúde orienta lavar as mãos com água limpa e sabão antes de comer e depois de usar o banheiro. Na lavagem, esfregue as palmas, o dorso e entre os dedos, enxágue e seque as mãos.\n\nA turma pode desenhar lembretes para a hora do lanche. Um bom cartaz mostra em que momento lavar as mãos e quais partes costumam ser esquecidas.',
    cover:'Água e sabonete',symbol:'heart',
    references:[{name:'Ministério da Saúde · Higienização antes das refeições',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dtha/mitos-e-verdades/higienizacao-das-maos-antes-das'},{name:'Programa Saúde na Escola · Guia de bolso',url:'https://bvsms.saude.gov.br/bvs/publicacoes/guia_saude_escola_doen%C3%A7as_negligenciadas.pdf'}]
  }
].map(story=>({author:'Redação Entre NAPs',date:'2026-11-25',...story})));
