/* =====================================================================
   HIPÓTESE · prévia funcional do periódico digital do Marista Pio X
   Tudo roda no navegador. Curtidas, comentários, envios e decisões da
   curadoria ficam salvos só neste dispositivo (localStorage).
   ===================================================================== */
const P = {nome:'Entre NAPs', sigla:'EN', subtitulo:'Periódico de ciência e tecnologia dos estudantes', escola:'Colégio Marista Pio X', cidade:'João Pessoa (PB)', vol:'v. 1', num:'n. 0', edicao:'Edição piloto', mes:'nov. 2026', hoje:'2026-11-26'};

/* ---------- Ícones ---------- */
const PATHS = {
 home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 plus:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>',
 book:'<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',
 shield:'<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 heart:'<path d="M12 20s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 6.8a4.6 4.6 0 0 1 8 2.8C20 15.1 12 20 12 20z"/>',
 chat:'<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/>',
 send:'<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
 bookmark:'<path d="M6 3h12v18l-6-4.5L6 21z"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 right:'<path d="m9 5 7 7-7 7"/>',
 left:'<path d="m15 5-7 7 7 7"/>',
 close:'<path d="M6 6l12 12M18 6 6 18"/>',
 play:'<path d="M8 5v14l11-7z"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
 layers:'<path d="M12 3 2 8l10 5 10-5z"/><path d="m2 13 10 5 10-5"/>',
 copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
 link:'<path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 quote:'<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 sprout:'<path d="M12 21v-8M12 14C5 14 3 11 3 6c6 0 9 2 9 8Zm0 1c0-7 3-10 9-10 0 6-3 10-9 10Z"/>',
 bulb:'<path d="M8 16c0-3-3-3.5-3-7a7 7 0 0 1 14 0c0 3.5-3 4-3 7zM9 19h6m-5 3h4"/>',
 flask:'<path d="M9 3h6m-5 0v7l-5 8c-1 2 0 3 2 3h10c2 0 3-1 2-3l-5-8V3M8 15h8"/>',
 orbit:'<ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-38 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(38 12 12)"/><circle cx="12" cy="12" r="1"/>',
 circuit:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M10 10h4v4h-4z"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
 pen:'<path d="m4 16 11-11 4 4L8 20l-5 1zM13 7l4 4"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
 spark:'<path d="M12 3c0 5 4 9 9 9-5 0-9 4-9 9 0-5-4-9-9-9 5 0 9-4 9-9Z"/>',
 leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 question:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.01"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 poll:'<path d="M5 20V10M12 20V4M19 20v-7"/>',
 atom:'<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
 ruler:'<path d="M3 15 15 3l6 6L9 21zM7 11l3 3m1-7 3 3m1-7 3 3"/>',
 inbox:'<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z"/>',
 reset:'<path d="M4 4v6h6"/><path d="M20 12A8 8 0 0 0 5.3 7.5L4 10m0 4a8 8 0 0 0 14.7 2.5"/>'
};
const ico = (n,extra='') => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" ${extra}>${PATHS[n]||''}</svg>`;
const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- Dados editoriais ---------- */
const NAPS = [
 {id:'I', nome:'NAP I', titulo:'Educação Infantil', faixa:'Educação Infantil', cor:'green', icon:'sprout', bio:'Brincar, explorar e descobrir o mundo com o corpo, a imaginação e a curiosidade.', curriculo:'Campos de experiências', areas:['O eu, o outro e o nós','Corpo, gestos e movimentos','Traços, sons, cores e formas','Escuta, fala, pensamento e imaginação','Espaços, tempos, quantidades, relações e transformações'], base:312},
 {id:'II', nome:'NAP II', titulo:'Anos iniciais', faixa:'2º ao 5º ano', cor:'yellow', icon:'bulb', bio:'Perguntas da sala viram histórias, investigações e projetos construídos em grupo.', curriculo:'Ensino Fundamental · anos iniciais', areas:['Linguagens','Matemática','Ciências da Natureza','Ciências Humanas','Ensino Religioso'], base:428},
 {id:'III', nome:'NAP III', titulo:'Anos finais', faixa:'6º ao 8º ano', cor:'blue', icon:'flask', bio:'Investigações, entrevistas e descobertas feitas pelos estudantes em diferentes componentes curriculares.', curriculo:'Ensino Fundamental · anos finais', areas:['Linguagens','Matemática','Ciências da Natureza','Ciências Humanas','Ensino Religioso'], base:507},
 {id:'IV', nome:'NAP IV', titulo:'9º ano e Ensino Médio', faixa:'9º ano ao 3º EM', cor:'purple', icon:'orbit', bio:'Reportagens, experimentos e debates que conectam a escola ao mundo.', curriculo:'9º ano do Fundamental e Ensino Médio', areas:['Linguagens e suas Tecnologias','Matemática e suas Tecnologias','Ciências da Natureza e suas Tecnologias','Ciências Humanas e Sociais Aplicadas'], base:586}
];
const CADERNOS = [
 {id:'ciencia', nome:'Ciência em Pauta', desc:'Reportagens que explicam a ciência e a tecnologia do mundo ao redor.'},
 {id:'gente', nome:'Gente que Pesquisa', desc:'Projetos das turmas, trajetórias de cientistas e entrevistas.'},
 {id:'participe', nome:'Participe', desc:'Checagens, perguntas e desafios abertos a toda a escola.'}
];
const SECOES = [
 {id:'natureza-em-foco', titulo:'Natureza em Foco', cad:'ciencia', icon:'orbit', cor:'blue', desc:'Descobertas sobre o planeta, o espaço e os seres vivos.'},
 {id:'ciencia-da-nossa-terra', titulo:'Ciência da Nossa Terra', cad:'ciencia', icon:'leaf', cor:'green', desc:'Pesquisa e biodiversidade da Paraíba e do Nordeste.'},
 {id:'como-funciona', titulo:'Como Funciona?', cad:'ciencia', icon:'bulb', cor:'yellow', desc:'O funcionamento de objetos e fenômenos do dia a dia.'},
 {id:'maristech', titulo:'Maristech', cad:'ciencia', icon:'circuit', cor:'blue', desc:'Tecnologia, computação e inovação.'},
 {id:'saude-em-dia', titulo:'Saúde em Dia', cad:'ciencia', icon:'heart', cor:'green', desc:'Hábitos e informações confiáveis sobre saúde.'},
 {id:'diario-de-bordo', titulo:'Diário de Bordo', cad:'gente', icon:'flask', cor:'purple', desc:'Projetos, experimentos e produções das turmas dos quatro NAPs.'},
 {id:'pequenos-e-grandes-cientistas', titulo:'Pequenos e Grandes Cientistas', cad:'gente', icon:'atom', cor:'purple', desc:'Trajetórias de pessoas que fazem ciência.'},
 {id:'fala-genio', titulo:'Fala, Gênio!', cad:'gente', icon:'mic', cor:'blue', desc:'Entrevistas com cientistas, professores e estudantes.'},
 {id:'fato-ou-fake', titulo:'Fato ou Fake?', cad:'participe', icon:'search', cor:'yellow', desc:'Checagem de afirmações que circulam por aí, sempre com fonte.'},
 {id:'pergunte-ao-jornal', titulo:'Pergunte ao Jornal', cad:'participe', icon:'question', cor:'purple', desc:'Dúvidas enviadas pelas turmas, respondidas com fontes.'},
 {id:'desafio-da-proxima-edicao', titulo:'Desafio da Próxima Edição', cad:'participe', icon:'target', cor:'green', desc:'Uma investigação para fazer em casa ou na escola e enviar à redação.'}
];
const FORMATOS = ['Reportagem','Investigação','Relato','Galeria','Vídeo','Entrevista','Crônica','Checagem','Agenda'];

const POSTS = [
 {id:'robo', section:'diario-de-bordo', nap:'II', format:'Reportagem', title:'O que um robô ensina sobre trabalhar em equipe?', author:'Comitê NAP II', credit:'Estudantes do 4º ano · orientação de Educação Tecnológica', date:'2026-11-25', question:'Por que o robô passava direto pela curva?', deck:'No torneio de robótica, as melhores ideias apareceram quando as equipes trocaram funções e aprenderam com os erros.', body:'Na primeira tentativa, o robô passou direto pela curva. Uma dupla observou as rodas e a outra revisou as instruções. Quando trocaram de função, descobriram que o problema era a ordem dos comandos, e não a velocidade do motor.\n\nPara a reportagem, o comitê anotou hipóteses e comparou três tentativas. No fim, o grupo desenhou a sequência com setas e circulou os trechos que podiam ser repetidos.\n\n“Quando eu expliquei meu programa, percebi onde ele se perdia”, conta uma integrante da equipe, em depoimento ilustrativo.', skill:'EF04CO03 · Criar e simular algoritmos com sequências e repetições. Complemento de Computação à BNCC.', image:'media/robo.webp', alt:'Mãos de estudantes montando um robô escolar com rodas amarelas', reactions:86, glossary:[['Algoritmo','Sequência finita de instruções para resolver um problema.'],['Depuração','Processo de encontrar e corrigir erros em um programa.']]},
 {id:'feijao', section:'diario-de-bordo', nap:'I', format:'Galeria', title:'O feijão acordou!', author:'Turma do Infantil 5', credit:'Relato das crianças · registro da professora', date:'2026-11-24', question:'O que muda no feijão a cada manhã?', deck:'A turma plantou feijões no algodão e desenhou as mudanças que apareceram a cada manhã.', body:'No primeiro dia, o feijão era duro e pequeno. Na segunda observação, uma raiz branca apareceu. Cada criança desenhou o que viu e explicou à roda qual parte do desenho havia mudado.\n\nA professora organizou os desenhos em sequência. As crianças compararam os registros e pensaram em perguntas para investigar na semana seguinte, como o que acontece com um pote que recebe menos luz.', skill:'EI03ET04 · Registrar observações usando múltiplas linguagens.', image:'media/feijao.webp', images:['media/feijao.webp','media/feijao-detalhe.webp'], alt:'Feijões germinando em potes de vidro com algodão, junto à janela', reactions:64},
 {id:'agua', section:'diario-de-bordo', nap:'III', format:'Vídeo', title:'Uma garrafa, três camadas e muita ciência', author:'Comitê NAP III', credit:'Estudantes do 6º ano · orientação de Ciências', date:'2026-11-24', question:'O que cada camada do filtro consegue reter?', deck:'O 6º ano registrou uma demonstração de filtração e explicou o que cada camada consegue reter.', body:'O grupo comparou o aspecto da água antes e depois da filtração. As camadas de cascalho e areia retiveram parte das partículas em suspensão.\n\nO professor conduziu a comparação com a decantação e discutiu por que o aspecto transparente não indica que a água está potável.', skill:'EF06CI03 · Selecionar métodos para a separação de sistemas heterogêneos.', image:'media/agua.webp', alt:'Protótipo de filtro de água feito com garrafa transparente e copos graduados', video:'media/agua.mp4', captions:'agua', transcript:'Montagem com imagens ilustrativas. A mistura com partículas passa pelas camadas de cascalho e areia. Parte dos sólidos fica retida, e a aparência da água muda. Água filtrada nessa demonstração não é água potável.', reactions:71, glossary:[['Filtração','Separação de sólidos de um líquido com um meio poroso, como areia ou papel-filtro.'],['Decantação','Separação em que as partículas mais densas se depositam no fundo pela ação da gravidade.'],['Água potável','Água própria para consumo, de acordo com padrões definidos pela autoridade sanitária.']]},
 {id:'cronica', section:'diario-de-bordo', nap:'III', format:'Crônica', title:'Crônica de um recreio que não queria acabar', author:'Oficina de Escrita · 7º ano', credit:'Autoria estudantil · revisão de Língua Portuguesa', date:'2026-11-23', deck:'Uma crônica sobre amizade, tempo e o sinal que sempre toca cedo demais.', body:'O sinal tocou quando a bola ainda estava no ar. Durante um segundo, ninguém se mexeu. Júlia disse que valia mais um lance, porque a bola tinha saído da mão antes do barulho. Renato, que já estava indo embora, voltou dois passos.\n\nA bola bateu no aro, caiu do lado de fora e rolou até o pé da professora. Ela devolveu a bola e disse que amanhã tinha mais. No caminho para a sala, João me perguntou se eu tinha visto a cesta. Disse que não teve cesta, teve uma promessa.', skill:'EF67LP30 · Criar narrativas ficcionais com enredo, personagens, tempo e espaço.', image:'media/cronica.webp', alt:'Caderno aberto com texto manuscrito, desenho de árvore e pássaro de papel laranja sobre a mesa', reactions:43},
 {id:'matematica', section:'diario-de-bordo', nap:'II', format:'Reportagem', title:'A turma mediu o pátio. Os resultados deram iguais?', author:'Comitê NAP II', credit:'Estudantes do 3º ano · orientação de Matemática', date:'2026-11-22', question:'Por que medidas do mesmo corredor deram resultados diferentes?', deck:'Passos, trenas e a descoberta de por que combinar a unidade faz diferença.', body:'Cada dupla mediu o corredor com seus próprios passos. A turma organizou os resultados em uma tabela e discutiu por que apareceram comprimentos diferentes para o mesmo trajeto.\n\nDepois, as duplas mediram novamente com a trena. Compararam as estimativas com as novas medidas e registraram qual instrumento foi mais fácil de usar em cada situação.', skill:'EF03MA19 · Estimar, medir e comparar comprimentos com diferentes unidades e instrumentos.', image:'media/matematica.webp', alt:'Fita métrica amarela enrolada sobre fundo branco', imgCredit:{autor:'ambabheg',licenca:'CC BY 2.0',url:'https://commons.wikimedia.org/wiki/File:Measuring_tape.jpg'}, cover:'Matemática no pátio', symbol:'ruler', reactions:38, glossary:[['Unidade de medida','Grandeza de referência combinada para comparar medições, como o metro.']]},
 {id:'sombras', section:'diario-de-bordo', nap:'I', format:'Relato', title:'Como a sombra ficou tão grande?', author:'Turma do Infantil 5', credit:'Desenhos e falas das crianças · mediação da professora', date:'2026-11-21', question:'Por que a sombra muda de tamanho?', deck:'Uma lanterna transformou a roda de histórias em um teatro de sombras.', body:'As crianças escolheram um personagem e testaram a distância entre a lanterna, a figura e a parede. Depois inventaram uma história coletiva em que o mesmo personagem cabia numa caixa e crescia até alcançar o teto.\n\nA professora anotou o que cada criança contou sobre a brincadeira.', skill:'EI03EF01 · Expressar ideias, desejos e sentimentos sobre vivências por diferentes linguagens.', image:'media/sombras.webp', alt:'Bonecos de teatro de sombras diante de uma tela iluminada', imgCredit:{autor:'Pauloleong2002',licenca:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Shadow_play.jpg'}, cover:'Teatro de sombras', symbol:'spark', reactions:52},
 {id:'calor', section:'diario-de-bordo', nap:'IV', format:'Investigação', title:'Onde o pátio esquenta mais?', author:'Comitê NAP IV', credit:'1º ano do Ensino Médio · orientação de Física', date:'2026-11-21', question:'Que pontos do pátio registram as maiores temperaturas, e por quê?', deck:'A turma comparou temperaturas na sombra, no piso e perto do jardim.', body:'Os estudantes definiram pontos de medição na quadra, sob uma árvore e próximo a um canteiro. Repetiram os registros no mesmo horário em três dias.\n\nNo relatório, distinguiram temperatura de sensação térmica e apontaram que tipo de superfície, exposição solar e circulação do ar precisam entrar na discussão.', skill:'EM13CNT101 · Analisar e representar transformações e conservações em sistemas que envolvem matéria e energia.', image:'media/calor.webp', alt:'Termômetro de vidro marcando a temperatura', imgCredit:{autor:'Menchi',licenca:'CC BY-SA 3.0',url:'https://commons.wikimedia.org/wiki/File:Clinical_thermometer_38.7.JPG'}, cover:'Mapa térmico do pátio', symbol:'sun', reactions:57, glossary:[['Sensação térmica','Percepção de temperatura pelo corpo, influenciada por vento, umidade e radiação solar.']]},
 {id:'ph', section:'diario-de-bordo', nap:'IV', format:'Investigação', title:'O que as cores do repolho revelam?', author:'Comitê NAP IV', credit:'1º ano do Ensino Médio · orientação de Química', date:'2026-11-20', question:'Como um indicador natural diferencia soluções ácidas e básicas?', deck:'Um indicador natural ajudou o grupo a comparar soluções de uso cotidiano.', body:'Com supervisão docente, a turma comparou a cor do indicador em água, vinagre e solução de bicarbonato. Para facilitar a comparação, manteve o volume do indicador constante e registrou as cores sobre papel branco.\n\nO grupo decidiu repetir as observações para verificar a consistência dos resultados.', skill:'EM13CNT301 · Formular hipóteses, interpretar dados e justificar conclusões em investigações.', image:'media/ph.webp', alt:'Três frascos com indicador de repolho roxo: rosa em meio ácido, roxo em meio neutro e verde em meio básico', imgCredit:{autor:'Epaenurk',licenca:'CC BY-SA 3.0',url:'https://commons.wikimedia.org/wiki/File:Red_cabbage_indicator.jpg'}, cover:'Química em cores', symbol:'flask', reactions:41, glossary:[['Indicador ácido-base','Substância que muda de cor conforme a acidez ou a basicidade do meio.']]},
 {id:'biologia', section:'diario-de-bordo', nap:'IV', format:'Reportagem', title:'Que visitantes aparecem na horta?', author:'Comitê NAP IV', credit:'2º ano do Ensino Médio · orientação de Biologia', date:'2026-11-19', question:'Quais organismos visitam a horta em diferentes horários?', deck:'O grupo montou um diário de observações de insetos e plantas em diferentes horários.', body:'Os estudantes desenharam um mapa da horta, escolheram áreas fixas para observação e registraram os organismos encontrados.\n\nAo voltar à sala, distinguiram observações diretas de hipóteses sobre quais visitantes poderiam participar da polinização.', skill:'EM13CNT301 · Formular perguntas, representar dados e justificar conclusões em investigações.', image:'media/biologia.webp', alt:'Abelha em voo carregando pólen nas patas', imgCredit:{autor:'Muhammad Mahdi Karim',licenca:'GFDL 1.2',url:'https://commons.wikimedia.org/wiki/File:Apis_mellifera_flying.jpg'}, cover:'Vida na horta', symbol:'sprout', reactions:29, glossary:[['Polinização','Transporte do pólen entre flores, que permite a formação de frutos e sementes.']]},
 {id:'escuta', section:'fala-genio', nap:'III', format:'Entrevista', title:'Uma roda para escutar quem pensa diferente', author:'Comitê NAP III', credit:'7º ano · curadoria docente', date:'2026-11-18', deck:'Estudantes entrevistaram colegas sobre respeito a convicções e modos de celebrar.', body:'Em duplas, os estudantes elaboraram perguntas abertas sobre convivência, crenças e tradições. Cada grupo resumiu a fala do outro antes de compartilhar o próprio ponto de vista.\n\nAo final, a turma registrou acordos de escuta para entrevistas futuras.', skill:'EF07ER05 · Discutir estratégias de convivência ética e respeitosa entre as religiões.', image:'media/escuta.webp', alt:'Estudantes sentados em uma sala de aula durante uma conversa em grupo', imgCredit:{autor:'NASA / Kennedy Space Center',licenca:'Domínio público',url:'https://images.nasa.gov/details/KSC-04pd0309',fonte:'NASA Image and Video Library'}, cover:'Uma roda de escuta', symbol:'chat', reactions:33},
 {id:'mostra', section:'diario-de-bordo', nap:'IV', format:'Agenda', title:'Mostra de Projetos em preparação', author:'Comitê NAP IV', credit:'Pauta colaborativa dos quatro NAPs', date:'2026-11-17', deck:'As equipes preparam estações com experimentos, protótipos e textos para a comunidade escolar.', body:'A edição demonstrativa prevê estações de robótica, física, biologia e narrativas.\n\nCada equipe vai apresentar a pergunta inicial, um registro de bastidores e o que mudou entre a primeira tentativa e a versão exposta.', image:'media/mostra.webp', alt:'Estudantes de uniforme visitam mesas de experimentos em uma mostra de ciências', imgCredit:{autor:'NASA Headquarters',licenca:'Domínio público',url:'https://images.nasa.gov/details/201404220019HQ',fonte:'NASA Image and Video Library'}, cover:'Mostra de Projetos', symbol:'calendar', reactions:48},
 {id:'artemis-imagens', section:'natureza-em-foco', nap:'IV', format:'Reportagem', author:'Comitê NAP IV', credit:'3º ano do Ensino Médio · orientação de Física', date:'2026-11-25', title:'NASA abre ao público imagens da Lua feitas pela Artemis II', deck:'Fotos e anotações da tripulação mostram como se faz ciência durante um sobrevoo lunar.', body:'Em 7 de outubro de 2026, a NASA anunciou a disponibilização de imagens e dados científicos reunidos na missão Artemis II. Durante a passagem pela Lua, a tripulação se revezou para fotografar, anotar e descrever detalhes da superfície. Os registros estão disponíveis no arquivo público de ciência planetária da agência.\n\nQuem observa uma fotografia lunar pode começar comparando manchas claras, regiões escuras e bordas de crateras. Depois, vale conferir como o ângulo da iluminação muda o que aparece na imagem.', image:'media/artemis-imagens.webp', alt:'Crateras Poynting e Kekulé no lado oculto da Lua, fotografadas pela tripulação da Artemis II', video:'media/artemis-imagens.mp4', captions:'artemis-imagens', videoCredit:{autor:'NASA / Goddard Space Flight Center',licenca:'Domínio público',url:'https://images.nasa.gov/details/mission_1min_2160p30',fonte:'NASA Image and Video Library',desc:'Simulação da NASA da aproximação da cápsula Orion à Lua'}, imgCredit:{autor:'NASA Johnson Space Center / NASA',licenca:'Domínio público',url:'https://commons.wikimedia.org/wiki/File:Poynting_and_Kekul%C3%A9_Craters_on_the_Lunar_Far_Side_(art002e012702).jpg'}, cover:'Imagens da Lua', symbol:'orbit', reactions:92, references:[{name:'NASA · Imagens e dados da Artemis II',url:'https://www.nasa.gov/blogs/artemis/2026/10/07/nasa-releases-artemis-ii-lunar-science-data-images/'}]},
 {id:'painel-solar', section:'como-funciona', nap:'III', format:'Reportagem', author:'Comitê NAP III', credit:'8º ano · orientação de Ciências', date:'2026-11-23', title:'Como a luz vira eletricidade em um painel solar?', deck:'O caminho começa nas células do painel e passa pelo inversor antes de chegar a uma instalação elétrica.', body:'Uma célula fotovoltaica tem um material semicondutor, geralmente silício. Quando a luz chega à célula, parte de sua energia permite o surgimento de uma corrente elétrica. Muitas células ligadas formam um módulo.\n\nOs módulos entregam corrente contínua. Em sistemas conectados à rede, o inversor converte essa eletricidade em corrente alternada, compatível com a instalação.\n\nPara investigar em sala, imagine dois módulos iguais, um sob a luz e outro à sombra. Qual deles geraria mais eletricidade nas mesmas condições?', image:'media/painel-solar.webp', alt:'Painéis solares fotovoltaicos sob um céu azul com nuvens', imgCredit:{autor:'Noggen13',licenca:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Photovoltaic_Panels.JPG'}, cover:'Luz em eletricidade', symbol:'sun', reactions:61, glossary:[['Semicondutor','Material cuja condução elétrica fica entre a de um condutor e a de um isolante, como o silício.'],['Inversor','Equipamento que converte corrente contínua em corrente alternada.']], references:[{name:'Empresa de Pesquisa Energética · Fontes de energia',url:'https://www.epe.gov.br/pt/abcdenergia/fontes-de-energia'},{name:'Ministério de Minas e Energia · Sistema fotovoltaico conectado à rede',url:'https://projeteee.mme.gov.br/equipamento/sistema-fotovoltaico-conectado-a-rede-sfcr-ou-on-grid/'}]},
 {id:'restinga-cabedelo', section:'ciencia-da-nossa-terra', nap:'III', format:'Reportagem', author:'Comitê NAP III', credit:'7º ano · orientação de Ciências e Geografia', date:'2026-11-22', title:'Guia apresenta as aves da Restinga de Cabedelo', deck:'A publicação do ICMBio ajuda a conhecer a fauna de uma floresta vizinha a João Pessoa.', body:'A Floresta Nacional da Restinga de Cabedelo protege ambientes costeiros como a restinga e o manguezal. O guia do ICMBio reúne informações sobre aves registradas na unidade e ajuda a transformar uma observação em uma investigação.\n\nComece por uma ave que você já viu perto de casa ou da escola. Anote onde ela estava, como se movia e que forma tinha o bico. Depois, compare seu registro com o guia e destaque quais pistas ajudaram na identificação e quais ainda deixam dúvida.', image:'media/restinga-cabedelo.webp', alt:'Bem-te-vi de peito amarelo pousado em um galho', imgCredit:{autor:'Giles Laurent',licenca:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:092_Great_kiskadee_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg'}, cover:'Aves de Cabedelo', symbol:'leaf', reactions:45, glossary:[['Restinga','Vegetação que cresce sobre solos arenosos do litoral.']], references:[{name:'ICMBio · Guia de aves da Restinga de Cabedelo',url:'https://www.gov.br/icmbio/pt-br/centrais-de-conteudo/publicacoes/guias-de-aves/guiadeavesdaflorestanacionaldarestingadecabedelosousaetal20231.pdf'}]},
 {id:'bertha-lutz', section:'pequenos-e-grandes-cientistas', nap:'II', format:'Reportagem', author:'Comitê NAP II', credit:'5º ano · orientação de Ciências', date:'2026-11-20', title:'Bertha Lutz e as pistas que os anfíbios deixaram', deck:'A cientista brasileira estudou anfíbios no Museu Nacional e ajudou a documentar dezenas de espécies.', body:'Bertha Lutz ingressou no Museu Nacional em 1919. Na ciência, pesquisou plantas e anfíbios e descreveu mais de 80 espécies de anfíbios, segundo o Instituto Oswaldo Cruz. Sua trajetória também inclui a defesa de direitos das mulheres no Brasil.\n\nUma pergunta para pequenos cientistas: que características você anotaria para permitir que outra pessoa reconhecesse o animal que você observou? Desenhe, descreva e compare seus registros com os de uma dupla.', image:'media/bertha-lutz.webp', alt:'Retrato de Bertha Lutz em 1925', imgCredit:{autor:'Adam Cuerden',licenca:'Domínio público',url:'https://commons.wikimedia.org/wiki/File:Bertha_Lutz_1925.jpg'}, cover:'A ciência de Bertha Lutz', symbol:'atom', reactions:58, references:[{name:'Instituto Oswaldo Cruz · Histórias para inspirar futuras cientistas',url:'https://www.ioc.fiocruz.br/noticias/livro-conta-historias-de-pesquisadoras-para-inspirar-futuras-cientistas'}]},
 {id:'fases-ou-eclipse', section:'fato-ou-fake', nap:'II', format:'Checagem', verdict:'Fake', author:'Comitê NAP II', credit:'5º ano · checagem revisada pela curadoria de Ciências', date:'2026-11-24', title:'As fases da Lua são a sombra da Terra?', deck:'Uma checagem para distinguir o que vemos toda semana do que acontece num eclipse lunar.', body:'Fake. Em cada fase vemos uma parte diferente da metade iluminada da Lua, porque ela se desloca ao redor da Terra. No eclipse lunar, a Terra fica alinhada entre o Sol e a Lua e sua sombra alcança a superfície lunar. Esse alinhamento acontece em algumas luas cheias.\n\nUma pista para checar a afirmação é comparar o desenho das posições do Sol, da Terra e da Lua nos dois casos.', image:'media/fases-ou-eclipse.webp', alt:'Lua avermelhada durante o eclipse lunar total de junho de 2011', video:'media/fases-ou-eclipse.mp4', captions:'fases-ou-eclipse', videoCredit:{autor:'NASA / Johnson Space Center',licenca:'Domínio público',url:'https://images.nasa.gov/details/jsc2020m000081-STEMonstrations_Moon_Phases',fonte:'NASA Image and Video Library',desc:'Demonstração das fases da Lua com uma bola iluminada por uma lâmpada'}, imgCredit:{autor:'Muhammad Mahdi Karim',licenca:'GFDL 1.2',url:'https://commons.wikimedia.org/wiki/File:Lunar_eclipse_June_2011_Total.jpg'}, cover:'Fases e eclipses', symbol:'orbit', reactions:103, glossary:[['Eclipse lunar','Fenômeno em que a sombra da Terra encobre total ou parcialmente a Lua.']], references:[{name:'NASA Science · Fases da Lua',url:'https://science.nasa.gov/moon/moon-phases/'},{name:'NASA Science · Eclipses e a Lua',url:'https://science.nasa.gov/moon/eclipses/'}]},
 {id:'perguntas-christina-koch', section:'fala-genio', nap:'IV', format:'Reportagem', author:'Comitê NAP IV', credit:'9º ano · orientação de Língua Portuguesa', date:'2026-11-19', title:'O que você perguntaria à astronauta Christina Koch?', deck:'A trajetória da engenheira que viajou ao redor da Lua inspira a primeira pauta de entrevista da seção.', body:'Christina Koch, engenheira e astronauta da NASA, foi especialista de missão na Artemis II em 2026. Durante a viagem, a NASA anunciou uma conversa da tripulação com jornalistas e abriu espaço para perguntas sobre a missão.\n\nO Fala, Gênio! convida as turmas a preparar perguntas abertas para suas próprias entrevistas. Como você percebeu que um teste precisava mudar? O que mais surpreendeu sua equipe? Os estudantes também podem ser entrevistados sobre seus projetos.', image:'media/perguntas-christina-koch.webp', alt:'A Lua vista da cápsula Orion durante a missão Artemis II, com a fronteira entre o lado visível e o lado oculto', imgCredit:{autor:'NASA Johnson Space Center',licenca:'Domínio público',url:'https://commons.wikimedia.org/wiki/File:Across_the_Moon%E2%80%99s_Near_Side_and_Far_Side_--_art002e012216.jpg'}, cover:'Pauta de entrevista', symbol:'mic', reactions:49, references:[{name:'NASA · Perfil de Christina Koch',url:'https://www.nasa.gov/people/christina-koch-2/'},{name:'NASA · Conversa da tripulação com a imprensa',url:'https://www.nasa.gov/news-release/nasa-to-host-media-call-with-artemis-ii-crew-on-way-home-from-moon/'}]},
 {id:'ceu-azul', section:'pergunte-ao-jornal', nap:'II', format:'Reportagem', author:'Professores de Ciências', credit:'Resposta a uma pergunta do 3º ano', date:'2026-11-24', title:'Por que o céu é azul?', deck:'A primeira pergunta da seção passa pela luz do Sol e pelos gases que compõem a atmosfera.', body:'A luz do Sol reúne diversas cores. Ao atravessar a atmosfera, ela interage com as moléculas do ar e se espalha em várias direções. A luz azul se espalha com mais facilidade que a vermelha. Parte dela chega aos nossos olhos vinda de várias partes do céu.\n\nQue outra pergunta da sua turma merece uma investigação? Envie pelo story “Pergunte”. Conte de onde surgiu a dúvida, sem incluir informações pessoais.', image:'media/ceu-azul.webp', alt:'Céu azul com nuvens sobre o oceano Atlântico', imgCredit:{autor:'Tiago Fioreze',licenca:'CC BY-SA 3.0',url:'https://commons.wikimedia.org/wiki/File:Clouds_over_the_Atlantic_Ocean.jpg'}, cover:'A cor do céu', symbol:'spark', reactions:117, glossary:[['Espalhamento','Desvio da luz em várias direções ao interagir com partículas ou moléculas.']], references:[{name:'NASA Space Place · Por que o céu é azul?',url:'https://spaceplace.nasa.gov/blue-sky/en/'}]},
 {id:'desafio-sombras', section:'desafio-da-proxima-edicao', nap:'II', format:'Investigação', author:'Curadoria docente', credit:'Ciências da Natureza · NAPs II e III', date:'2026-11-25', title:'Desafio: para onde a sombra foi?', deck:'Observe a sombra de um objeto no mesmo ponto em três horários e transforme os registros em um desenho ou tabela.', body:'Com orientação de um professor, escolha um objeto fixo em um ponto iluminado. Marque com giz onde termina sua sombra e registre o horário. Volte ao mesmo ponto em outros dois horários e repita o registro.\n\nCompare o comprimento e a direção das sombras. Envie à redação os horários, o desenho ou a tabela e uma pergunta que a observação deixou para a próxima edição. A proposta se inspira em uma atividade de relógio de Sol.', image:'media/desafio-sombras.webp', alt:'Relógio de sol de pedra ao entardecer, com a sombra do ponteiro sobre o mostrador', imgCredit:{autor:'NASA / Ames Research Center',licenca:'Domínio público',url:'https://images.nasa.gov/details/ARC-2006-ACD06-0213-055',fonte:'NASA Image and Video Library'}, cover:'Diário de sombras', symbol:'sun', reactions:66, references:[{name:'NASA Science · Atividade de relógio de Sol',url:'https://science.nasa.gov/learn/heat/resource/create-a-sundial-activity/'}]},
 {id:'maristech-cbers', section:'maristech', nap:'IV', format:'Reportagem', author:'Comitê NAP IV', credit:'1º ano do Ensino Médio · Educação Tecnológica', date:'2026-11-18', title:'Brasil e China avançam no projeto de um satélite de observação', deck:'A cooperação em torno do CBERS 06 aproxima a tecnologia espacial de perguntas sobre cidades, florestas e água.', body:'Em maio de 2026, o INPE recebeu representantes do centro chinês CRESDA para reuniões técnicas da missão CBERS 06. A cooperação faz parte de um programa de satélites de observação da Terra.\n\nUma forma de entender o trabalho é pensar em uma pergunta concreta: como um bairro mudou ao longo dos anos? Imagens da mesma região em datas diferentes ajudam a identificar alterações na vegetação, nas ruas e nas construções.', image:'media/maristech-cbers.webp', alt:'A Terra vista do espaço, com a África e a Antártida, em foto da tripulação da Apollo 17', video:'media/maristech-cbers.mp4', captions:'maristech-cbers', videoCredit:{autor:'NASA / Goddard Space Flight Center',licenca:'Domínio público',url:'https://images.nasa.gov/details/GSFC_20150420_Orbit_m11858_2014',fonte:'NASA Image and Video Library',desc:'Imagens de satélite de nuvens, ilhas e montanhas vistas de órbita'}, imgCredit:{autor:'NASA / tripulação da Apollo 17',licenca:'Domínio público',url:'https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg'}, cover:'Satélites e mapas', symbol:'circuit', reactions:37, glossary:[['Sensoriamento remoto','Obtenção de informações sobre a superfície da Terra a partir de sensores a distância, como os de satélites.']], references:[{name:'INPE · Cooperação técnica para o CBERS 06',url:'https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/inpe-e-cresda-avancam-na-cooperacao-tecnica-para-a-missao-cbers-06/'}]},
 {id:'maos-limpas', section:'saude-em-dia', nap:'I', format:'Reportagem', author:'Professoras do NAP I', credit:'Educação Infantil · Programa Saúde na Escola', date:'2026-11-21', title:'Mãos limpas antes do lanche', deck:'Água e sabonete ajudam a cuidar da saúde em momentos comuns da rotina escolar.', body:'O Ministério da Saúde orienta lavar as mãos com água limpa e sabão antes de comer e depois de usar o banheiro. Na lavagem, esfregue as palmas, o dorso e entre os dedos, enxágue e seque as mãos.\n\nA turma pode desenhar lembretes para a hora do lanche. Um bom cartaz mostra em que momento lavar as mãos e quais partes costumam ser esquecidas.', image:'media/maos-limpas.webp', alt:'Mãos de uma criança cobertas de espuma de sabonete sobre a pia, com a torneira ao fundo', imgCredit:{autor:'Designed by Magnific'}, cover:'Água e sabonete', symbol:'heart', reactions:40, references:[{name:'Ministério da Saúde · Higienização antes das refeições',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dtha/mitos-e-verdades/higienizacao-das-maos-antes-das'},{name:'Programa Saúde na Escola · Guia de bolso',url:'https://bvsms.saude.gov.br/bvs/publicacoes/guia_saude_escola_doen%C3%A7as_negligenciadas.pdf'}]}
];
/* Legendas embutidas: viram um arquivo temporário no navegador. */
const CAPTIONS = {'artemis-imagens':`WEBVTT

00:00:00.000 --> 00:00:07.000
Simulação da NASA: a cápsula Orion se aproxima da Lua.

00:00:07.000 --> 00:00:14.000
A parte iluminada muda conforme o ângulo da luz do Sol.
`,
'fases-ou-eclipse':`WEBVTT

00:00:00.000 --> 00:00:07.000
Uma lâmpada faz o papel do Sol. A bola é a Lua.

00:00:07.000 --> 00:00:14.000
Ao girar, vemos partes diferentes da metade iluminada: são as fases.
`,
'maristech-cbers':`WEBVTT

00:00:00.000 --> 00:00:05.000
Satélites fotografam a Terra de cima, todos os dias.

00:00:05.000 --> 00:00:11.000
Comparar imagens de datas diferentes revela mudanças no território.
`,
agua:`WEBVTT

00:00:00.000 --> 00:00:04.000
Uma garrafa, três camadas e muita ciência

00:00:04.000 --> 00:00:08.000
O cascalho e a areia retêm parte dos sólidos em suspensão.

00:00:08.000 --> 00:00:12.000
A água parece mais clara, mas não está potável.
`};
const captionURL = k => { try{ return CAPTIONS[k]?URL.createObjectURL(new Blob([CAPTIONS[k]],{type:'text/vtt'})):''; }catch{ return ''; } };
const SAMPLE_COMMENTS = [
 {id:'c1',postId:'robo',author:'Luísa',tag:'estudante',body:'Gostei de ver que trocar de função ajudou a encontrar o erro. Na minha equipe, quem desenhou as setas também acabou explicando o programa para todo mundo.',date:'2026-11-25'},
 {id:'c2',postId:'robo',author:'Prof. André',tag:'educador',body:'O registro das tentativas daria uma ótima pauta de bastidores para a próxima edição.',date:'2026-11-25'},
 {id:'c3',postId:'feijao',author:'Patrícia',tag:'família',body:'O desenho da raiz foi a primeira coisa que me contaram na saída. Vamos acompanhar o próximo registro!',date:'2026-11-24'},
 {id:'c4',postId:'agua',author:'Rafael',tag:'estudante',body:'Dá para repetir a experiência mudando a ordem das camadas e comparar os resultados?',date:'2026-11-24'},
 {id:'c5',postId:'cronica',author:'Prof.ª Marina',tag:'educadora',body:'O detalhe da bola no ar me fez lembrar de como o tempo do recreio parece diferente.',date:'2026-11-23'}
,
{id:'m0',postId:'robo',author:'Caio',tag:'estudante · 5º ano',body:'A gente teve o mesmo problema no clube de robótica! Era um bloco de repetição no lugar errado.',date:'2026-11-25'},
{id:'m1',postId:'feijao',author:'Camila',tag:'família',body:'Plantamos em casa também. O nosso já tem duas folhas!',date:'2026-11-25'},
{id:'m2',postId:'feijao',author:'Prof.ª Débora',tag:'educadora',body:'As crianças ficaram orgulhosas de ver os desenhos publicados. Obrigada, comitê!',date:'2026-11-24'},
{id:'m3',postId:'agua',author:'Prof. Marcos',tag:'educador',body:'Ótimo cuidado ao explicar que a água filtrada não é potável. Isso gera muita confusão.',date:'2026-11-24'},
{id:'m4',postId:'cronica',author:'Rafaela',tag:'estudante · 8º ano',body:'Melhor final: “não teve cesta, teve uma promessa”.',date:'2026-11-24'},
{id:'m5',postId:'cronica',author:'Heitor',tag:'estudante · 7º ano',body:'Parece o nosso recreio de sexta-feira.',date:'2026-11-23'},
{id:'m6',postId:'matematica',author:'Bia',tag:'estudante · 3º ano',body:'O corredor deu 23 passos meus e 19 passos do meu colega!',date:'2026-11-22'},
{id:'m7',postId:'sombras',author:'Jorge',tag:'família',body:'Minha filha chegou em casa contando a história do personagem que cresce até o teto.',date:'2026-11-21'},
{id:'m8',postId:'calor',author:'Lucas',tag:'estudante · 1º EM',body:'A quadra esquentou bem mais que debaixo da árvore. Precisamos de mais sombra no pátio.',date:'2026-11-22'},
{id:'m9',postId:'calor',author:'Prof. Marcos',tag:'educador',body:'Boa decisão repetir as medições no mesmo horário em dias diferentes.',date:'2026-11-21'},
{id:'m10',postId:'ph',author:'Júlia',tag:'estudante · 1º EM',body:'O nosso ficou rosa com vinagre e esverdeado com bicarbonato.',date:'2026-11-20'},
{id:'m11',postId:'biologia',author:'Thiago',tag:'estudante · 2º EM',body:'Vi uma abelha jataí perto do canteiro de manjericão na semana passada.',date:'2026-11-20'},
{id:'m12',postId:'escuta',author:'Prof.ª Beatriz',tag:'educadora',body:'Os acordos de escuta podiam virar um cartaz em cada sala.',date:'2026-11-19'},
{id:'m13',postId:'mostra',author:'Isadora',tag:'estudante · 6º ano',body:'Que horas começa? Quero levar minha avó.',date:'2026-11-18'},
{id:'m14',postId:'mostra',author:'Comitê NAP IV',tag:'comitê',body:'Das 8h às 11h30, no pátio coberto. Esperamos vocês!',date:'2026-11-18'},
{id:'m15',postId:'artemis-imagens',author:'Caio',tag:'estudante · 7º ano',body:'Dá para ver as crateras com binóculo daqui de João Pessoa?',date:'2026-11-25'},
{id:'m16',postId:'artemis-imagens',author:'Prof. Rodrigo',tag:'educador',body:'Dá, sim. Perto do quarto crescente, as bordas das crateras ficam bem marcadas.',date:'2026-11-25'},
{id:'m17',postId:'painel-solar',author:'Marina',tag:'estudante · 8º ano',body:'Lá em casa tem painel no telhado. Agora entendi para que serve o inversor.',date:'2026-11-23'},
{id:'m18',postId:'painel-solar',author:'Pedro',tag:'estudante · 9º ano',body:'Seria legal comparar a geração em um dia nublado e em um dia de sol.',date:'2026-11-23'},
{id:'m19',postId:'restinga-cabedelo',author:'Helena',tag:'família',body:'Fomos à Flona no fim de semana e vimos um bem-te-vi bem de perto.',date:'2026-11-23'},
{id:'m20',postId:'restinga-cabedelo',author:'Prof.ª Carla',tag:'educadora',body:'Vamos levar o guia na saída de campo do 7º ano.',date:'2026-11-22'},
{id:'m21',postId:'bertha-lutz',author:'Sofia',tag:'estudante · 5º ano',body:'Eu só conhecia a Bertha Lutz pela luta pelo voto feminino. Não sabia que ela era cientista.',date:'2026-11-21'},
{id:'m22',postId:'fases-ou-eclipse',author:'Gabriel',tag:'estudante · 5º ano',body:'Eu achava que era a sombra da Terra! O desenho das posições ajudou muito.',date:'2026-11-24'},
{id:'m23',postId:'fases-ou-eclipse',author:'Prof.ª Lúcia',tag:'educadora',body:'Vou usar essa checagem com o 5º ano na aula de quinta.',date:'2026-11-24'},
{id:'m24',postId:'perguntas-christina-koch',author:'Ana Clara',tag:'estudante · 9º ano',body:'Eu perguntaria como é dormir sem gravidade.',date:'2026-11-20'},
{id:'m25',postId:'perguntas-christina-koch',author:'Davi',tag:'estudante · 1º EM',body:'E como ela treinou para ficar tanto tempo longe da Terra?',date:'2026-11-19'},
{id:'m26',postId:'ceu-azul',author:'Miguel',tag:'estudante · 3º ano',body:'E por que o pôr do sol fica laranja?',date:'2026-11-25'},
{id:'m27',postId:'ceu-azul',author:'Comitê NAP II',tag:'comitê',body:'Boa pergunta, Miguel! Ela entrou na lista da próxima edição.',date:'2026-11-25'},
{id:'m28',postId:'desafio-sombras',author:'Laura',tag:'estudante · 4º ano',body:'Fizemos às 8h, às 10h e ao meio-dia. Ao meio-dia a sombra ficou bem curtinha!',date:'2026-11-25'},
{id:'m29',postId:'maristech-cbers',author:'Enzo',tag:'estudante · 1º EM',body:'Dá para ver o nosso bairro nessas imagens de satélite?',date:'2026-11-19'},
{id:'m30',postId:'maos-limpas',author:'Renata',tag:'família',body:'Meu filho agora lembra todo mundo de lavar entre os dedos antes do lanche.',date:'2026-11-22'}
];
const SAMPLE_QUEUE = [
 {id:'pauta-demo',kind:'post',nap:'II',section:'diario-de-bordo',format:'Relato',title:'As cores do céu por uma semana',author:'Comitê NAP II',deck:'A turma desenhou o céu na entrada e na saída e comparou as diferenças.',body:'Os estudantes do 3º ano registraram nuvens, luminosidade e cores do céu em sete observações. Agora o comitê prepara a versão para publicação.',date:'2026-11-25',cover:'As cores do céu',symbol:'sun',demo:true},
 {id:'comentario-demo',kind:'comment',postId:'agua',author:'Beatriz',tag:'família',body:'Gostaria de ver as anotações da equipe depois da segunda tentativa.',date:'2026-11-25',demo:true}
];
const QUIZ = [
 {claim:'A Lua produz a própria luz.',answer:'Fake',explanation:'O brilho que vemos vem da luz do Sol refletida pela superfície da Lua.',source:'NASA Science',url:'https://science.nasa.gov/moon/moonlight/'},
 {claim:'Dá para criar um algoritmo sem usar computador.',answer:'Fato',explanation:'Uma sequência de instruções para dobrar um avião de papel já é um algoritmo. Outra pessoa pode seguir os passos e conferir o resultado.',source:'Code.org · Algoritmos no cotidiano',url:'https://code.org/curriculum/course2/2/Activity2-RealLifeAlgorithms.pdf'},
 {claim:'O verão acontece porque a Terra fica mais perto do Sol.',answer:'Fake',explanation:'A inclinação do eixo da Terra muda a incidência da luz solar ao longo do ano. Por isso, quando é verão em um hemisfério, é inverno no outro.',source:'NASA Space Place',url:'https://spaceplace.nasa.gov/seasons/en/'},
 {claim:'As fases da Lua são a sombra da Terra.',answer:'Fake',explanation:'Nas fases, muda a parte iluminada da Lua que conseguimos ver. A sombra da Terra só alcança a Lua em um eclipse lunar.',source:'NASA Science · Fases da Lua',url:'https://science.nasa.gov/moon/moon-phases/'}
];
const POLL = {id:'janeiro-2027', pergunta:'Qual pauta você quer na estreia, em janeiro?', options:[{id:'robotica',label:'Robótica que ajuda a escola',base:18},{id:'agua',label:'A ciência da água no dia a dia',base:12},{id:'testes',label:'Como os cientistas testam uma ideia?',base:9}]};
const AGENDA = [
 {d:'27',m:'NOV',titulo:'Mostra de Projetos',quem:'Todos os NAPs',desc:'Estudantes dos quatro NAPs apresentam experimentos, textos e protótipos.',post:'mostra'},
 {d:'03',m:'DEZ',titulo:'Roda de leitura',quem:'NAPs II e III',desc:'As oficinas de escrita compartilham histórias e crônicas.',post:'cronica'},
 {d:'15',m:'JAN',titulo:'Lançamento do n. 1',quem:'Comunidade escolar',desc:'Primeira edição regular, com o tema escolhido na enquete.'}
];
const INSPIRACOES = [
 {name:'Folhetim Marista', school:'Colégio Marista Criciúma', url:'https://engeplus.com.br/noticia/alunos-do-colegio-marista-criciuma-lancam-jornal-79673', copy:'Jornal criado por estudantes do Ensino Médio: autoria do comitê e publicação por edições.'},
 {name:'Falaí!', school:'Colégio Santa Cruz', url:'https://santacruz.g12.br/noticia/a-8a-edicao-do-falai-esta-no-ar/', copy:'Divisão em editorias e orientação docente à produção dos alunos.'},
 {name:'Frontiers for Young Minds', school:'Frontiers (periódico científico para jovens)', url:'https://kids.frontiersin.org/about', copy:'Resumo no início, glossário no fim e revisão feita por jovens com mentoria de cientistas.'},
 {name:'Podcast literário', school:'Marista Escola Social Irmão Lourenço', url:'https://colegiosmaristas.com.br/wp-content/uploads/2025/03/PROMAC-Escolas-e-Colegios-Sociais-Maristas-LEM-3-Projeto.pdf', copy:'Produção em áudio e vídeo sempre acompanhada de transcrição.'}
];

/* ---------- Estado local ---------- */
const KEY='hipotese-previa-v1';
const DEFAULT = {likes:[],saves:[],follows:['II'],seen:[],role:'estudante',roleNap:'II',name:'',comments:[],subs:[],pautas:[],decisions:{},quiz:{},vote:null};
let S = load();
function load(){ try{ const raw=JSON.parse(localStorage.getItem(KEY)); return raw&&typeof raw==='object'?{...structuredClone(DEFAULT),...raw}:structuredClone(DEFAULT);}catch{ return structuredClone(DEFAULT);} }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch{} }
const V = {view:'inicio', feedTab:'destaques', limit:6, explore:{cad:'',sec:'',q:''}, profTab:'salvos', napTab:'', homeScroll:0, lastTab:'inicio', files:[]};

/* ---------- Utilidades de conteúdo ---------- */
const napOf = id => NAPS.find(n=>n.id===id)||NAPS[0];
const secOf = id => SECOES.find(s=>s.id===id);
const cadOf = id => CADERNOS.find(c=>c.id===id);
const isRedacao = p => /^Redação/.test(p.author);
const approvedSubs = () => S.subs.filter(s=>s.status==='approved');
const demoApproved = () => SAMPLE_QUEUE.filter(q=>q.kind==='post'&&S.decisions[q.id]?.status==='approved').map(q=>({...q,date:S.decisions[q.id].date||P.hoje,reactions:0,approvedNow:true}));
const allPosts = () => [...approvedSubs().map(s=>({...s,approvedNow:true})),...demoApproved(),...POSTS].sort((a,b)=>b.date.localeCompare(a.date)||(b.approvedNow?1:0)-(a.approvedNow?1:0));
const postById = id => allPosts().find(p=>p.id===id) || S.subs.find(p=>p.id===id);
const ORDER = (()=>{const list=[];CADERNOS.forEach(c=>SECOES.filter(s=>s.cad===c.id).forEach(s=>POSTS.filter(p=>p.section===s.id).sort((a,b)=>b.date.localeCompare(a.date)).forEach(p=>list.push(p.id))));return list;})();
const ident = p => { const i=ORDER.indexOf(p.id); return i<0?`${P.sigla}·v1n0·novo`:`${P.sigla}·v1n0·e${String(i+1).padStart(2,'0')}`; };
const words = p => (p.body||'').split(/\s+/).length + (p.deck||'').split(/\s+/).length;
const readMin = p => Math.max(1,Math.round(words(p)/180));
const MESES=['jan.','fev.','mar.','abr.','maio','jun.','jul.','ago.','set.','out.','nov.','dez.'];
const dateLabel = d => { const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||''); return m?`${+m[3]} ${MESES[+m[2]-1]} ${m[1]}`:''; };
const relDate = d => { if(d===P.hoje) return 'hoje'; const diff=Math.round((Date.parse(P.hoje)-Date.parse(d))/864e5); if(diff===1) return 'ontem'; if(diff>1&&diff<7) return `há ${diff} dias`; return dateLabel(d); };
const likeCount = p => (p.reactions||0) + (S.likes.includes(p.id)?1:0);
const visibleComments = id => [...SAMPLE_COMMENTS.filter(c=>c.postId===id), ...SAMPLE_QUEUE.filter(q=>q.kind==='comment'&&q.postId===id&&S.decisions[q.id]?.status==='approved'), ...S.comments.filter(c=>c.postId===id&&(c.status==='approved'||c.status==='pending'))];
const queueItems = () => [
  ...SAMPLE_QUEUE.filter(q=>!S.decisions[q.id]),
  ...S.subs.filter(s=>s.status==='pending').map(s=>({...s,kind:'post'})),
  ...S.comments.filter(c=>c.status==='pending').map(c=>({...c,kind:'comment'})),
  ...S.pautas.filter(p=>p.status==='pending').map(p=>({...p,kind:'pauta'}))
];
const ROLES = {estudante:{nome:'Estudante',desc:'Lê, curte, salva, comenta e sugere pautas.'}, comite:{nome:'Comitê',desc:'Também publica pelo seu NAP, com revisão.'}, curadoria:{nome:'Curadoria',desc:'Revisa e aprova envios e comentários.'}};
const canPublish = () => S.role==='comite'||S.role==='curadoria';

/* ---------- Peças de interface ---------- */
function imgCredit(p){
  const c=p.imgCredit;
  if(!c) return 'Foto: '+esc(p.credit||p.author)+'.';
  if(!c.url) return `Imagem: ${esc(c.autor)}${c.licenca?' · '+esc(c.licenca):''}.`;
  return `Imagem: <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.autor)}</a> · ${esc(c.licenca)}, via ${esc(c.fonte||'Wikimedia Commons')}.`;
}
function avatar(p){
  if(isRedacao(p)) return `<span class="av brand-av" aria-hidden="true">${ico('book')}</span>`;
  const n=napOf(p.nap); return `<span class="av c-${n.cor}" aria-hidden="true">${ico(n.icon)}</span>`;
}
function authorLink(p){ return isRedacao(p)?`<a href="#edicao">${esc(p.author)}</a>`:`<a href="#nap-${p.nap.toLowerCase()}">${esc(p.author)}</a>`; }
function coverMarkup(p){
  if(p.image) return `<img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" draggable="false">${p.verdict?`<span class="verdict">${esc(p.verdict.toUpperCase())}</span>`:''}`;
  const s=secOf(p.section), n=napOf(p.nap), cor=s?s.cor:n.cor;
  return `<div class="tcover c-${cor}"><span class="tc-sec">${ico(s?s.icon:n.icon)}<span>${esc(s?s.titulo:p.format)}</span></span><strong>${esc(p.cover||p.title)}</strong><span class="tc-mark">${P.nome}</span>${p.verdict?`<span class="verdict">${esc(p.verdict.toUpperCase())}</span>`:''}</div>`;
}
function mediaBadge(p){
  if(p.video) return `<span class="badge">${ico('play')} Vídeo</span>`;
  if((p.images||[]).length>1) return `<span class="badge">${ico('layers')} ${p.images.length}</span>`;
  return '';
}
function postCard(p){
  const s=secOf(p.section), n=napOf(p.nap), liked=S.likes.includes(p.id), saved=S.saves.includes(p.id), c=visibleComments(p.id).length;
  const followBtn = !isRedacao(p) && !S.follows.includes(p.nap) ? `<button class="follow" data-follow="${p.nap}" aria-pressed="false">Seguir</button>`:'';
  return `<article class="post c-${s?s.cor:n.cor}" aria-labelledby="t-${esc(p.id)}">
    <header class="post-h">${avatar(p)}<div class="who">${authorLink(p)}<small>${esc(n.nome)} · ${esc(n.faixa)}</small></div>${followBtn}</header>
    <div class="media" data-tap="${esc(p.id)}">${coverMarkup(p)}${mediaBadge(p)}<span class="burst" aria-hidden="true"><svg viewBox="0 0 24 24">${PATHS.heart}</svg></span></div>
    <div class="actions">
      <button class="act wide" data-like="${esc(p.id)}" aria-pressed="${liked}" aria-label="${liked?'Descurtir':'Curtir'}, ${likeCount(p)} curtidas">${ico('heart')}<span class="cnt" data-likes="${esc(p.id)}">${likeCount(p)}</span></button>
      <button class="act wide" data-comments="${esc(p.id)}" aria-label="${c} comentários">${ico('chat')}<span class="cnt">${c}</span></button>
      <button class="act" data-share="${esc(p.id)}" aria-label="Compartilhar">${ico('send')}</button>
      <span class="sp"></span>
      <button class="act" data-save="${esc(p.id)}" aria-pressed="${saved}" aria-label="${saved?'Remover dos salvos':'Salvar'}">${ico('bookmark')}</button>
    </div>
    <div class="post-b">
      ${s?`<a class="sec-tag" href="#secao-${s.id}">${ico(s.icon)}${esc(s.titulo)}</a>`:''}
      <h3 id="t-${esc(p.id)}"><a href="#materia-${esc(p.id)}">${esc(p.title)}</a></h3>
      <p class="deck">${esc(p.deck)}</p>
      <div class="post-meta">${p.approvedNow&&p.date===P.hoje?'<span class="pill new-flag">Novo</span>':''}<span>${esc(p.format)}</span><span>${ico('clock','style="width:14px;height:14px;vertical-align:-2px"')} ${readMin(p)} min</span><span>${esc(relDate(p.date))}</span></div>
      <a class="readlink" href="#materia-${esc(p.id)}">Ler matéria ${ico('right')}</a>
    </div>
  </article>`;
}
function coverPost(){
  const total=POSTS.length, secoes=new Set(POSTS.map(p=>p.section)).size;
  return `<article class="post" aria-label="Capa da edição piloto">
    <header class="post-h"><span class="av brand-av" aria-hidden="true">${ico('book')}</span><div class="who"><a href="#edicao">Redação ${P.nome}</a><small>Capa · ${P.edicao}</small></div></header>
    <div class="media" style="aspect-ratio:1/1">
      <div class="slides" id="cover-slides" aria-roledescription="carrossel" aria-label="Capa da edição">
        <section class="slide" aria-roledescription="slide" aria-label="1 de 4"><img src="media/robo.webp" alt="" loading="eager"><span class="shade"></span>
          <div class="sc"><span class="kick">Matéria de capa · Diário de Bordo</span><h2>Robótica se faz <em>em equipe.</em></h2><p>O 4º ano descobriu que o erro estava na ordem dos comandos.</p><a class="cta" href="#materia-robo">Ler reportagem ${ico('right')}</a></div></section>
        <section class="slide plain" aria-roledescription="slide" aria-label="2 de 4"><div class="sc"><span class="kick">${P.vol} · ${P.num} · ${P.mes}</span><h2>Nesta edição</h2>
          <div class="stat-row"><div><b>${total}</b><span>matérias</span></div><div><b>4</b><span>NAPs</span></div><div><b>${secoes}</b><span>seções</span></div></div>
          <a class="cta" href="#edicao">Ver sumário ${ico('right')}</a></div></section>
        <section class="slide" aria-roledescription="slide" aria-label="3 de 4"><img src="media/agua.webp" alt="" loading="lazy"><span class="shade"></span>
          <div class="sc"><span class="kick">Enquete aberta</span><h2>Você escolhe a pauta <em>de janeiro.</em></h2><button class="cta" data-story="enquete">Votar agora ${ico('poll')}</button></div></section>
        <section class="slide plain" aria-roledescription="slide" aria-label="4 de 4" style="background:#FFC72C;color:#2A2000"><div class="sc"><span class="kick" style="color:#0B3C6E">Lançamento · janeiro de 2027</span><h2 style="color:#0B3C6E">O Entre NAPs <em style="color:#0B3C6E;font-style:italic">vai começar.</em></h2><p style="color:#3A3000">A primeira edição regular destaca Ciências da Natureza e Educação Tecnológica, com projetos dos estudantes.</p></div></section>
      </div>
      <span class="slide-count" id="cover-count">1/4</span>
      <button class="slide-nav prev" data-slide="-1" aria-label="Slide anterior" hidden>${ico('left')}</button>
      <button class="slide-nav next" data-slide="1" aria-label="Próximo slide">${ico('right')}</button>
    </div>
    <div class="dots" id="cover-dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></div>
    <div class="post-b" style="padding-top:8px"><h3 style="font-size:19px">${P.nome} · ${P.edicao}</h3><p class="deck">Deslize para ver os destaques. Cada matéria traz resumo, pergunta de investigação, glossário e fontes.</p></div>
  </article>`;
}
const STORIES = [
 {id:'quiz', label:'Fato ou Fake?', icon:'search', cor:'yellow'},
 {id:'enquete', label:'Enquete', icon:'poll', cor:'blue'},
 {id:'desafio', label:'Desafio', icon:'target', cor:'green'},
 {id:'pergunte', label:'Pergunte', icon:'question', cor:'purple'},
 {id:'agenda', label:'Agenda', icon:'calendar', cor:'brand'}
];
function storiesRow(){
  return `<div class="stories" role="list" aria-label="Participe">${STORIES.map(s=>`<button role="listitem" class="story c-${s.cor}${S.seen.includes(s.id)?' seen':''}" data-story="${s.id}"><span class="ring"><span>${ico(s.icon)}</span></span>${esc(s.label)}</button>`).join('')}</div>`;
}

/* ---------- Navegação ---------- */
function renderNav(){
  const q=queueItems().length;
  const items=[['inicio','Início','home'],['secoes','Seções','grid'],['criar',canPublish()?'Publicar':'Sugerir','plus'],['edicao','Edição','book'],['perfil','Perfil','user']];
  if(S.role==='curadoria') items.splice(4,0,['curadoria','Curadoria','shield']);
  const active = V.view==='materia'||V.view==='nap' ? V.lastTab : V.view==='secao' ? 'secoes' : V.view;
  $('#nav').innerHTML = `<a class="nav-brand brand" href="#inicio" aria-label="${P.nome}, página inicial"><span class="mark" aria-hidden="true">${ico('book')}</span><span class="wordmark"><strong>Entre <b>NAPs</b></strong><small>Marista Pio X</small></span></a>`+
    items.filter(([id])=>!(id==='curadoria'&&window.innerWidth<768)).map(([id,l,i])=>`<a href="#${id}" class="${id==='criar'?'create':''}" ${active===id?'aria-current="page"':''}>${ico(i)}<span class="lbl">${l}</span>${id==='curadoria'&&q?`<span class="count">${q}</span>`:''}</a>`).join('')+
    `<div class="nav-secs">${CADERNOS.map(c=>`<span class="cad">${esc(c.nome)}</span>${SECOES.filter(x=>x.cad===c.id).map(x=>`<a href="#secao-${x.id}" class="c-${x.cor}" ${V.view==='secao'&&V.arg===x.id?'aria-current="page"':''}><i></i>${esc(x.titulo)}</a>`).join('')}`).join('')}</div>`+
    `<div class="nav-foot"><strong>Prévia · perfil ${ROLES[S.role].nome}${S.role==='comite'?' NAP '+S.roleNap:''}</strong>Troque o perfil para testar publicação e curadoria.<br><button data-goto="perfil">Trocar perfil</button></div>`;
}

/* ---------- Views ---------- */
function viewHome(){
  let list=allPosts();
  if(V.feedTab==='seguindo') list=list.filter(p=>S.follows.includes(p.nap));
  const shown=list.slice(0,V.limit);
  const aside = asideMarkup();
  return `<div class="home-grid view-wrap"><div class="col">
    ${storiesRow()}
    ${sectionStrip()}
    <div class="gutter" style="padding-left:max(12px,env(safe-area-inset-left,0px))"><div class="tabs" role="group" aria-label="Filtrar feed">
      <button class="tab" data-feed="destaques" aria-pressed="${V.feedTab==='destaques'}">Destaques</button>
      <button class="tab" data-feed="seguindo" aria-pressed="${V.feedTab==='seguindo'}">Seguindo · ${S.follows.length} NAP${S.follows.length===1?'':'s'}</button>
    </div></div>
    <div class="feed">
      ${V.feedTab==='destaques'?coverPost():''}
      ${shown.length?shown.map(postCard).join(''):`<div class="empty gutter">Você ainda não segue nenhum NAP. Abra <a href="#secoes">Seções</a> e toque em “Seguir” no perfil de um NAP.</div>`}
    </div>
    ${list.length>V.limit?`<div class="more"><button class="btn ghost" data-more>Carregar mais publicações</button></div>`:shown.length?`<p class="note" style="text-align:center;padding:18px 16px">Você chegou ao fim da edição. <a href="#edicao">Ver o sumário completo</a></p>`:''}
  </div><aside class="aside" aria-label="Sobre a edição">${aside}</aside></div>`;
}
function asideMarkup(){
  const voted=S.vote;
  return `<section class="card issue-card"><span class="eyebrow">${P.vol} · ${P.num} · ${P.mes}</span><h2>${P.edicao}</h2><p>${P.subtitulo}. ${allPosts().length} matérias em 3 cadernos.</p><a class="btn sun sm" href="#edicao">${ico('list')} Ver sumário</a></section>
  <section class="card"><span class="eyebrow">Enquete</span><h2>${esc(POLL.pergunta)}</h2><p>${voted?'Você já votou. Veja o resultado parcial.':'Seu voto define a pauta do n. 1.'}</p><button class="btn ghost sm" style="margin-top:10px" data-story="enquete">${voted?'Ver resultado':'Votar'}</button></section>
  <section class="card"><span class="eyebrow">Agenda</span><div class="mini-list">${AGENDA.map(a=>`<${a.post?`a href="#materia-${a.post}"`:'div'} class="mini-item"><span class="date-box">${a.d}<small><br>${a.m}</small></span><span class="grow"><strong>${esc(a.titulo)}</strong><small>${esc(a.quem)}</small></span></${a.post?'a':'div'}>`).join('')}</div></section>
  <section class="card"><span class="eyebrow">Perfis dos NAPs</span><div class="mini-list">${NAPS.map(n=>`<div class="mini-item c-${n.cor}"><span class="av" aria-hidden="true">${ico(n.icon)}</span><a class="grow" href="#nap-${n.id.toLowerCase()}" style="text-decoration:none;color:var(--ink)"><strong>${n.nome}</strong><small>${esc(n.faixa)}</small></a><button class="follow" data-follow="${n.id}" aria-pressed="${S.follows.includes(n.id)}">${S.follows.includes(n.id)?'Seguindo':'Seguir'}</button></div>`).join('')}</div></section>
  <p class="aside-foot">${P.nome} · ${P.subtitulo} do ${P.escola}, ${P.cidade}. <a href="#edicao">Expediente e política editorial</a></p>`;
}
function secCount(id){ return allPosts().filter(p=>p.section===id).length; }
function secCard(sc){
  const n=secCount(sc.id), last=allPosts().find(p=>p.section===sc.id);
  return `<a class="sec-card c-${sc.cor}" href="#secao-${sc.id}"><span class="sec-ico" aria-hidden="true">${ico(sc.icon)}</span><span class="sec-txt"><strong>${esc(sc.titulo)}</strong><small>${esc(sc.desc)}</small><em>${n} matéria${n===1?'':'s'}${last?' · última '+esc(relDate(last.date)):''}</em></span>${ico('right')}</a>`;
}
function sectionsIndex(){
  return CADERNOS.map(c=>`<section class="cad-block" aria-labelledby="cad-${c.id}"><header class="cad-h"><h2 id="cad-${c.id}">${esc(c.nome)}</h2><p>${esc(c.desc)}</p></header><div class="sec-cards">${SECOES.filter(x=>x.cad===c.id).map(secCard).join('')}</div></section>`).join('')+
  `<section class="cad-block" aria-labelledby="cad-naps"><header class="cad-h"><h2 id="cad-naps">Perfis dos NAPs</h2><p>Siga o NAP da sua turma para ver as publicações dele na aba Seguindo.</p></header><div class="naps-row">${NAPS.map(n=>`<a class="nap-chip c-${n.cor}" href="#nap-${n.id.toLowerCase()}"><span class="av" aria-hidden="true">${ico(n.icon)}</span><strong>${n.nome}</strong><small>${esc(n.faixa)}</small></a>`).join('')}</div></section>`;
}
function searchResults(q){
  const norm=t=>t.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[̀-ͯ]/g,'');
  const nq=norm(q);
  const secs=SECOES.filter(x=>norm(x.titulo+' '+x.desc).includes(nq));
  const res=allPosts().filter(p=>norm([p.title,p.deck,p.body,p.author,secOf(p.section)?.titulo,p.format,napOf(p.nap).nome,(p.glossary||[]).map(g=>g[0]).join(' ')].join(' ')).includes(nq));
  return `${secs.length?`<div class="sec-cards" style="margin-bottom:14px">${secs.map(secCard).join('')}</div>`:''}<p class="note" style="margin-bottom:8px">${res.length} matéria${res.length===1?'':'s'} para “${esc(q)}”</p><div class="results">${res.map(p=>{const x=secOf(p.section);return `<a class="result c-${x?x.cor:'brand'}" href="#materia-${esc(p.id)}"><span class="thumb">${coverMarkup(p)}</span><span style="min-width:0"><strong>${hl(p.title,q)}</strong><small>${esc(x?x.titulo:'')} · ${esc(p.author)} · ${readMin(p)} min</small></span></a>`;}).join('')||'<div class="empty">Nada encontrado. Tente “Lua”, “água” ou “robô”.</div>'}</div>`;
}
function viewSections(){
  const q=V.explore.q.trim();
  return `<div class="col gutter view-wrap" style="max-width:860px"><div class="page-h"><h1>Seções</h1><p>O periódico organizado em três cadernos. Escolha uma seção ou busque por assunto.</p></div>
    <label class="search"><span class="sr">Buscar no periódico</span>${ico('search')}<input id="q" type="search" placeholder="Buscar matérias, seções e termos do glossário" value="${esc(V.explore.q)}" autocomplete="off"></label>
    <div id="explore-body">${q?searchResults(q):sectionsIndex()}</div></div>`;
}
const SEC_CTA = {'fato-ou-fake':['quiz','Jogar Fato ou Fake?'],'pergunte-ao-jornal':['pergunte','Enviar uma pergunta'],'desafio-da-proxima-edicao':['desafio','Ver o desafio']};
function viewSection(id){
  const sc=secOf(id); if(!sc) return viewSections();
  const c=cadOf(sc.cad), list=allPosts().filter(p=>p.section===id), sibs=SECOES.filter(x=>x.cad===sc.cad), cta=SEC_CTA[id];
  return `<div class="home-grid view-wrap"><div class="col">
    <header class="sec-banner c-${sc.cor}"><a class="crumb" href="#secoes">${ico('left')} Seções · ${esc(c.nome)}</a>
      <div class="sb-row"><span class="sec-ico big" aria-hidden="true">${ico(sc.icon)}</span><div style="min-width:0"><h1>${esc(sc.titulo)}</h1><p>${esc(sc.desc)}</p></div></div>
      <div class="sb-meta"><span>${list.length} matéria${list.length===1?'':'s'} nesta edição</span>${cta?`<button class="btn primary sm" data-story="${cta[0]}">${esc(cta[1])}</button>`:`<a class="btn ghost sm" href="#criar">${canPublish()?'Publicar nesta seção':'Sugerir uma pauta'}</a>`}</div></header>
    <div class="chips sib gutter" role="group" aria-label="Outras seções de ${esc(c.nome)}">${sibs.map(x=>`<a class="chip c-${x.cor}" href="#secao-${x.id}" ${x.id===id?'aria-current="page"':''}>${ico(x.icon)}${esc(x.titulo)}</a>`).join('')}</div>
    <div class="feed">${list.map(postCard).join('')||'<div class="empty">Esta seção ainda não tem matérias publicadas.</div>'}</div>
  </div><aside class="aside" aria-label="Sobre a edição">${asideMarkup()}</aside></div>`;
}
function sectionStrip(){
  return `<nav class="sec-strip" aria-label="Seções do periódico"><div class="ss-h"><strong>Seções</strong><a href="#secoes">Ver todas ${ico('right')}</a></div><div class="chips">${SECOES.map(x=>`<a class="chip c-${x.cor}" href="#secao-${x.id}">${ico(x.icon)}${esc(x.titulo)}</a>`).join('')}</div></nav>`;
}
function hl(t,q){ const i=t.toLocaleLowerCase('pt-BR').indexOf(q.toLocaleLowerCase('pt-BR')); return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length)); }
function tile(p){
  const s=secOf(p.section);
  return `<a class="tile c-${s?s.cor:'brand'}" href="#materia-${esc(p.id)}" aria-label="${esc(p.title)}">${coverMarkup(p)}${p.video?`<span class="badge">${ico('play')}</span>`:(p.images||[]).length>1?`<span class="badge">${ico('layers')}</span>`:''}<span class="hover" aria-hidden="true"><span>${ico('heart')} ${likeCount(p)}</span><span>${ico('chat','style="fill:none"')} ${visibleComments(p.id).length}</span></span></a>`;
}
function viewArticle(id){
  const p=postById(id);
  if(!p) return `<div class="col gutter view-wrap"><div class="empty">Matéria não encontrada. <a href="#inicio">Voltar ao início</a></div></div>`;
  const s=secOf(p.section), n=napOf(p.nap), cad=s?cadOf(s.cad):null, liked=S.likes.includes(p.id), saved=S.saves.includes(p.id);
  const imgs = p.images?.length>1 ? `<div class="gallery" aria-label="Galeria com ${p.images.length} imagens">${p.images.map((src,i)=>`<div><div class="media"><img src="${esc(src)}" alt="${esc(p.alt)}${i?' (detalhe)':''}"></div></div>`).join('')}</div><figcaption>Deslize para ver ${p.images.length} imagens · ${esc(p.credit||p.author)}</figcaption>`
    : p.video ? `<video controls playsinline preload="metadata" poster="${esc(p.image||'')}" src="${esc(p.video)}">${p.captions?`<track kind="captions" src="${esc(captionURL(p.captions))}" srclang="pt-BR" label="Português" default>`:''}</video><figcaption>${p.videoCredit?`${esc(p.videoCredit.desc)}. Vídeo: <a href="${esc(p.videoCredit.url)}" target="_blank" rel="noopener">${esc(p.videoCredit.autor)}</a> · ${esc(p.videoCredit.licenca)}, via ${esc(p.videoCredit.fonte)}. Legendas em português pela redação.`:`Vídeo com legendas · ${esc(p.credit||p.author)}`}</figcaption>`
    : `<div class="media" data-tap="${esc(p.id)}">${coverMarkup(p)}<span class="burst" aria-hidden="true"><svg viewBox="0 0 24 24">${PATHS.heart}</svg></span></div>${p.image?`<figcaption>${esc(p.alt)}. ${imgCredit(p)}</figcaption>`:''}`;
  const related = allPosts().filter(x=>x.id!==p.id&&(x.section===p.section||x.nap===p.nap)).slice(0,3);
  const cite = `${p.author.toUpperCase()}. ${p.title}. ${P.nome}: ${P.subtitulo.toLowerCase()}, ${P.escola}, ${P.cidade}, ${P.vol}, ${P.num}, ${P.mes} Disponível em: ${location.href.split('#')[0]}#materia-${p.id}. Acesso em: ${dateLabel(P.hoje)}.`;
  return `<div class="article-top"><button class="iconbtn" data-back aria-label="Voltar">${ico('back')}</button><span class="t">${esc(s?s.titulo:p.format)}</span><button class="iconbtn" data-share="${esc(p.id)}" aria-label="Compartilhar">${ico('send')}</button></div>
  <article class="reader c-${s?s.cor:n.cor}" aria-labelledby="art-title">
    <div class="gutter">
      <header class="art-h">
        <div class="art-kick">${cad?`<span>${esc(cad.nome)}</span><span aria-hidden="true">/</span>`:''}${s?`<a href="#secao-${s.id}">${esc(s.titulo)}</a>`:''}<span class="pill">${esc(p.format)}</span>${p.verdict?`<span class="pill" style="background:var(--bad);color:#fff">Veredito: ${esc(p.verdict)}</span>`:''}</div>
        <h1 id="art-title">${esc(p.title)}</h1>
        <div class="abstract"><span class="eyebrow">Resumo</span><p>${esc(p.deck)}</p></div>
        <div class="byline">${avatar(p)}<div class="who">${authorLink(p)}<small>${esc(p.credit||P.subtitulo)}</small></div>${!isRedacao(p)?`<button class="follow" data-follow="${p.nap}" aria-pressed="${S.follows.includes(p.nap)}">${S.follows.includes(p.nap)?'Seguindo':'Seguir '+n.nome}</button>`:''}</div>
        <div class="meta-line"><span>${esc(dateLabel(p.date))}</span><span>${readMin(p)} min de leitura</span><span>${esc(n.nome)} · ${esc(n.faixa)}</span><span class="mono">${esc(ident(p))}</span>${p.status==='pending'?'<span class="pill status-pending">Em análise pela curadoria</span>':''}</div>
      </header>
    </div>
    <figure class="art-media">${imgs}</figure>
    <div class="gutter">
      ${p.question?`<div class="question"><span class="eyebrow">Pergunta de investigação</span><p>${esc(p.question)}</p></div>`:''}
      <div class="prose">${(p.body||'').split(/\n\s*\n/).map(par=>`<p>${esc(par)}</p>`).join('')}</div>
      <div class="boxes">
        ${p.transcript?`<details class="box"><summary>Transcrição e descrição do vídeo</summary><p style="margin-top:8px;color:var(--muted)">${esc(p.transcript)}</p></details>`:''}
        ${p.glossary?.length?`<section class="box"><h2>${ico('book')} Glossário</h2><dl>${p.glossary.map(([t,d])=>`<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl></section>`:''}
        ${p.skill?`<section class="box"><h2>${ico('target')} ${n.id==='I'?'Objetivo de aprendizagem · BNCC':'Conexão com a BNCC'}</h2><p>${esc(p.skill)}</p></section>`:''}
        ${p.references?.length?`<section class="box"><h2>${ico('link')} Fontes consultadas</h2><ol>${p.references.map(r=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)}</a></li>`).join('')}</ol></section>`:''}
        <section class="box"><h2>${ico('quote')} Como citar</h2><p class="cite" id="cite-text">${esc(cite)}</p><div class="cite-row"><button class="btn ghost sm" data-copy="cite-text">${ico('copy')} Copiar citação</button><span class="note">Formato baseado na ABNT.</span></div></section>
      </div>
    </div>
    <div class="art-actions">
      <button class="act wide" data-like="${esc(p.id)}" aria-pressed="${liked}" aria-label="${liked?'Descurtir':'Curtir'}, ${likeCount(p)} curtidas">${ico('heart')}<span class="cnt" data-likes="${esc(p.id)}">${likeCount(p)}</span></button>
      <a class="act wide" href="#comentarios" data-jump="comentarios" aria-label="${visibleComments(p.id).length} comentários, ir para comentários">${ico('chat')}<span class="cnt">${visibleComments(p.id).length}</span></a>
      <button class="act" data-share="${esc(p.id)}" aria-label="Compartilhar">${ico('send')}</button>
      <span class="sp" style="flex:1"></span>
      <button class="act" data-save="${esc(p.id)}" aria-pressed="${saved}" aria-label="${saved?'Remover dos salvos':'Salvar'}">${ico('bookmark')}</button>
    </div>
    <div class="gutter">
      <section class="comments" id="comentarios" aria-labelledby="cmt-h">${commentsMarkup(p.id,'cmt-h')}</section>
      ${related.length?`<section class="related"><h2>Leia também</h2><div class="results">${related.map(x=>{const xs=secOf(x.section);return `<a class="result c-${xs?xs.cor:'brand'}" href="#materia-${esc(x.id)}"><span class="thumb">${coverMarkup(x)}</span><span style="min-width:0"><strong>${esc(x.title)}</strong><small>${esc(xs?xs.titulo:'')} · ${readMin(x)} min</small></span></a>`;}).join('')}</div></section>`:''}
    </div>
  </article>`;
}
function commentsMarkup(id,hid){
  const list=visibleComments(id);
  return `<h2 id="${hid}">Comentários <span class="note" style="font:600 14px var(--f-ui)">${list.length}</span></h2>
  ${list.length?list.map(c=>`<div class="cmt"><span class="av c-brand" aria-hidden="true">${esc((c.author||'?').trim()[0]||'?')}</span><div style="min-width:0"><strong>${esc(c.author)}</strong> <small>${esc(c.tag||'')} · ${esc(relDate(c.date))}</small>${c.status==='pending'?' <span class="pill status-pending">Aguardando moderação · só você vê</span>':''}<p>${esc(c.body)}</p></div></div>`).join(''):'<p class="note">Seja a primeira pessoa a comentar.</p>'}
  <form class="cform" data-form="comment" data-post="${esc(id)}"><label class="sr" for="c-${hid}">Escreva um comentário</label><textarea id="c-${hid}" name="body" maxlength="600" required placeholder="Comente como ${esc(S.name||ROLES[S.role].nome)}…" rows="1"></textarea><button class="btn primary sm" type="submit">Enviar</button></form>
  <p class="note">A curadoria revisa os comentários antes de publicá-los. Não inclua dados pessoais.</p>`;
}
function viewEdition(){
  const toc = CADERNOS.map(c=>`<section><h2>${esc(c.nome)} <small>${esc(c.desc)}</small></h2>${SECOES.filter(s=>s.cad===c.id).map(s=>{const ps=allPosts().filter(p=>p.section===s.id);return ps.length?`<div class="c-${s.cor}"><h3>${ico(s.icon)}${esc(s.titulo)}</h3>${ps.map(p=>`<a class="toc-item" href="#materia-${esc(p.id)}"><span class="mono">${esc(ident(p).split('·').pop())}</span><strong>${esc(p.title)}</strong><span class="rt">${readMin(p)} min</span><small>${esc(p.author)} · ${esc(napOf(p.nap).nome)}</small></a>`).join('')}</div>`:'';}).join('')}</section>`).join('');
  return `<div class="col view-wrap" style="max-width:760px">
    <header class="masthead"><span class="eyebrow">${P.escola} · ${P.cidade}</span><h1>${P.nome}</h1><p>${P.subtitulo}. Reportagens, investigações e checagens produzidas pelo comitê estudantil dos quatro NAPs, com curadoria docente.</p><span class="mono">${P.vol} · ${P.num} (${P.edicao.toLowerCase()}) · ${P.mes} · periodicidade bimestral</span></header>
    <div class="gutter">
      <div class="toc" aria-label="Sumário"><div class="block" style="padding:0"><h2 style="font:600 28px/1.1 var(--f-serif)">Sumário</h2><p class="note">Cada matéria tem um identificador permanente para citação.</p></div>${toc}</div>
      <section class="block" id="expediente"><h2>Como uma matéria chega aqui</h2>
        <ol class="flow"><li><strong>Pauta</strong>Qualquer estudante sugere. O comitê do NAP escolhe e apura.</li><li><strong>Revisão por pares</strong>Integrantes do comitê de outro NAP leem e comentam o texto.</li><li><strong>Curadoria docente</strong>Professores conferem fontes, BNCC e autorização de imagem.</li><li><strong>Publicação</strong>A matéria recebe identificador e entra na edição.</li></ol></section>
      <section class="block"><h2>Política editorial</h2><ul class="plain-list">
        <li><strong>Fonte sempre.</strong> Toda informação científica indica de onde veio, com link.</li>
        <li><strong>Imagem com autorização.</strong> Fotos de estudantes só com termo de uso de imagem assinado pela família.</li>
        <li><strong>Privacidade.</strong> Crianças aparecem pelo primeiro nome ou pela turma. Comentários não publicam dados pessoais.</li>
        <li><strong>Exemplos sinalizados.</strong> Depoimentos e eventos ilustrativos desta edição piloto estão marcados no texto.</li>
        <li><strong>Correções.</strong> Erros corrigidos ficam registrados ao fim da matéria, com a data.</li></ul></section>
      <section class="block"><h2>Expediente</h2><ul class="plain-list">
        <li><strong>Editor(a) responsável:</strong> coordenação pedagógica · a definir</li>
        <li><strong>Curadoria docente:</strong> Ciências da Natureza e Educação Tecnológica</li>
        <li><strong>Comitê estudantil:</strong> representantes dos NAPs I, II, III e IV</li>
        <li><strong>Referências curriculares:</strong> <a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener">BNCC · MEC</a> e <a href="https://basenacionalcomum.mec.gov.br/images/historico/anexo_parecer_cneceb_n_2_2022_bncc_computacao.pdf" target="_blank" rel="noopener">Complemento de Computação</a></li></ul></section>
      <section class="block"><h2>Inspirações</h2><ul class="plain-list">${INSPIRACOES.map(i=>`<li><a href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.name)}</a> · ${esc(i.school)}. ${esc(i.copy)}</li>`).join('')}</ul></section>
      <section class="block"><h2>Arquivo</h2><div class="results"><a class="result" href="#inicio"><span class="thumb"><div class="tcover c-brand" style="background:#0B3C6E;color:#fff"><strong style="font-size:20px">n. 0</strong></div></span><span><strong>${P.edicao} · ${P.mes}</strong><small>Edição atual</small></span></a><div class="result" aria-disabled="true" style="opacity:.6"><span class="thumb"><div class="tcover c-yellow"><strong style="font-size:20px">n. 1</strong></div></span><span><strong>Janeiro de 2027</strong><small>Em produção · tema em votação</small></span></div></div></section>
    </div></div>`;
}
function viewNap(id){
  const n=NAPS.find(x=>x.id===id); if(!n) return viewHome();
  const ps=allPosts().filter(p=>p.nap===n.id&&!isRedacao(p)), all=allPosts().filter(p=>p.nap===n.id);
  const following=S.follows.includes(n.id), likes=all.reduce((s,p)=>s+likeCount(p),0);
  const tab=V.napTab||'comite', list=tab==='comite'?ps:all;
  return `<div class="col gutter view-wrap c-${n.cor}">
    <div class="prof"><span class="av" aria-hidden="true">${ico(n.icon)}</span><div><h1>${n.nome}</h1><div class="stats"><span><b>${all.length}</b>matérias</span><span><b>${n.base+(following?1:0)}</b>seguidores</span><span><b>${likes}</b>curtidas</span></div></div>
      <div class="bio"><strong>${esc(n.titulo)} · ${esc(n.faixa)}</strong><p>${esc(n.bio)}</p>
        <details><summary class="note" style="cursor:pointer;font-weight:700">${esc(n.curriculo)}</summary><div class="areas" style="margin-top:8px">${n.areas.map(a=>`<span class="pill">${esc(a)}</span>`).join('')}</div></details>
        <div class="prof-acts"><button class="btn ${following?'ghost':'primary'} sm" data-follow="${n.id}" aria-pressed="${following}">${following?'Seguindo':'Seguir'}</button><a class="btn ghost sm" href="#criar">${canPublish()?'Publicar':'Sugerir pauta'}</a></div></div></div>
    <div class="subtabs" role="group" aria-label="Publicações"><button data-naptab="comite" aria-pressed="${tab==='comite'}">${ico('grid')} Do comitê</button><button data-naptab="todas" aria-pressed="${tab==='todas'}">${ico('book')} Todas do NAP</button></div>
    ${list.length?`<div class="grid">${list.map(tile).join('')}</div>`:'<div class="empty">Nenhuma publicação ainda.</div>'}
  </div>`;
}
function viewProfile(){
  const tab=V.profTab;
  const saved=allPosts().filter(p=>S.saves.includes(p.id)), liked=allPosts().filter(p=>S.likes.includes(p.id));
  const mine=[...S.subs.map(s=>({t:s.title,k:'Publicação',st:s.status,d:s.date,id:s.id,note:s.note})),...S.pautas.map(s=>({t:s.title,k:'Sugestão de pauta',st:s.status,d:s.date,note:s.note})),...S.comments.map(c=>({t:c.body.slice(0,80),k:'Comentário em “'+(postById(c.postId)?.title||'')+'”',st:c.status,d:c.date,id:c.postId,note:c.note}))];
  const stName={pending:'Em análise',approved:'Publicado',rejected:'Não aprovado'};
  let body;
  if(tab==='salvos') body = saved.length?`<div class="grid">${saved.map(tile).join('')}</div>`:'<div class="empty">Toque no ícone de marcador em uma matéria para guardá-la aqui.</div>';
  else if(tab==='curtidas') body = liked.length?`<div class="grid">${liked.map(tile).join('')}</div>`:'<div class="empty">As matérias que você curtir aparecem aqui. Dica: toque duas vezes na imagem para curtir.</div>';
  else body = mine.length?`<div class="queue">${mine.map(m=>`<div class="q"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="pill status-${m.st}">${stName[m.st]}</span><span class="note">${esc(m.k)} · ${esc(relDate(m.d))}</span></div><h3>${esc(m.t)}</h3>${m.note?`<p class="note"><strong>Retorno da curadoria:</strong> ${esc(m.note)}</p>`:''}${m.st==='approved'&&m.id?`<a class="readlink" href="#materia-${esc(m.id)}">Abrir ${ico('right')}</a>`:''}</div>`).join('')}</div>`:'<div class="empty">Seus comentários, pautas e publicações aparecem aqui com o status da revisão.</div>';
  const nm=S.name||'Visitante da prévia';
  return `<div class="col gutter view-wrap">
    <div class="prof"><span class="av c-brand" aria-hidden="true">${ico('user')}</span><div><h1>${esc(nm)}</h1><div class="stats"><span><b>${S.saves.length}</b>salvos</span><span><b>${S.likes.length}</b>curtidas</span><span><b>${S.follows.length}</b>seguindo</span></div></div>
      <div class="bio"><form class="row2" data-form="name" style="align-items:end"><label class="field"><span>Nome de exibição</span><input id="nm" name="name" maxlength="40" value="${esc(S.name)}" placeholder="Ex.: Ana · 8º ano"></label><button class="btn ghost" type="submit">Salvar nome</button></form>
      <div class="card" style="padding:14px"><span class="eyebrow">Ver a prévia como</span><div class="role-pick" role="group" aria-label="Perfil de acesso">${Object.entries(ROLES).map(([k,r])=>`<button data-role="${k}" aria-pressed="${S.role===k}"><strong>${r.nome}</strong><small>${r.desc}</small></button>`).join('')}</div>
        ${S.role==='comite'?`<label class="field" style="margin-top:10px"><span>NAP do comitê</span><select id="role-nap">${NAPS.map(n=>`<option value="${n.id}" ${S.roleNap===n.id?'selected':''}>${n.nome} · ${esc(n.faixa)}</option>`).join('')}</select></label>`:''}
        ${S.role==='curadoria'?`<a class="btn primary sm" style="margin-top:10px" href="#curadoria">${ico('shield')} Abrir fila da curadoria (${queueItems().length})</a>`:''}
        <p class="note" style="margin-top:10px">Na versão publicada, o perfil vem da conta escolar e é atribuído pela coordenação.</p></div></div></div>
    <div class="subtabs" role="group" aria-label="Minhas listas"><button data-proftab="salvos" aria-pressed="${tab==='salvos'}">${ico('bookmark')} Salvos</button><button data-proftab="curtidas" aria-pressed="${tab==='curtidas'}">${ico('heart')} Curtidas</button><button data-proftab="envios" aria-pressed="${tab==='envios'}">${ico('inbox')} Envios</button></div>
    ${body}
    <p class="note" style="padding:24px 0;text-align:center"><button class="linkbtn" data-reset style="color:var(--link);font-weight:700">${ico('reset','style="width:16px;height:16px;vertical-align:-3px"')} Restaurar a prévia ao estado inicial</button></p>
  </div>`;
}
function viewCreate(){
  if(!canPublish()){
    return `<div class="col gutter view-wrap"><div class="page-h"><h1>Sugerir uma pauta</h1><p>Viu algo curioso na escola? Tem uma pergunta que merece investigação? Mande para o comitê.</p></div>
    <form class="form" data-form="pauta">
      <label class="field"><span>Sua ideia em uma frase</span><input id="pt-title" name="title" required maxlength="120" placeholder="Ex.: Por que o pão mofa mais rápido no verão?"></label>
      <label class="field"><span>Conte mais</span><textarea id="pt-body" name="body" required maxlength="800" placeholder="Onde surgiu a dúvida? Que seção combina? Quem poderia ser entrevistado?"></textarea></label>
      <label class="field"><span>Seção sugerida</span><select id="pt-sec" name="section"><option value="">Não sei</option>${sectionOptions('')}</select></label>
      <div class="notice">${ico('info')}<span><strong>Quer publicar diretamente?</strong> Publicar é função do comitê estudantil. Nesta prévia, troque o perfil para “Comitê” em <a href="#perfil">Perfil</a>.</span></div>
      <p class="err" role="alert" hidden></p>
      <button class="btn primary" type="submit">${ico('send')} Enviar sugestão</button>
    </form></div>`;
  }
  const nap = S.role==='comite'?S.roleNap:'';
  return `<div class="view-wrap gutter" style="max-width:1100px;margin:0 auto"><div class="page-h"><h1>Nova publicação</h1><p>O texto passa por revisão de pares e pela curadoria antes de entrar no feed.</p></div>
  <div class="compose"><form class="form" data-form="post" novalidate>
    <div class="drop" id="drop">${ico('image')}<strong style="color:var(--ink)">Fotos ou vídeo</strong><span>Até 4 arquivos, somando 12 MB. JPG, PNG, WebP, MP4 ou WebM.</span><label class="btn ghost sm" for="f-media">Escolher arquivos</label><input class="sr" id="f-media" name="media" type="file" multiple accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"><div class="thumbs" id="thumbs"></div><span class="note">Sem mídia, a matéria ganha uma capa tipográfica com a cor da seção.</span></div>
    <label class="field" id="alt-field" hidden><span>Descrição das imagens (acessibilidade)</span><input id="f-alt" name="alt" maxlength="240" placeholder="O que aparece na imagem?"></label>
    <div class="row2"><label class="field"><span>NAP</span><select id="f-nap" name="nap" ${nap?'disabled':''}>${NAPS.map(n=>`<option value="${n.id}" ${n.id===nap?'selected':''}>${n.nome} · ${esc(n.faixa)}</option>`).join('')}</select>${nap?'<small>Definido pelo seu perfil de comitê.</small>':''}</label>
      <label class="field"><span>Formato</span><select id="f-format" name="format">${FORMATOS.map(f=>`<option>${f}</option>`).join('')}</select></label></div>
    <label class="field"><span>Seção</span><select id="f-sec" name="section" required>${sectionOptions('diario-de-bordo')}</select></label>
    <label class="field"><span>Título</span><input id="f-title" name="title" required maxlength="110" placeholder="Uma pergunta ou uma descoberta"></label>
    <label class="field"><span>Resumo</span><textarea id="f-deck" name="deck" required maxlength="240" style="min-height:70px" placeholder="Duas frases que contam o essencial."></textarea><small><span id="deck-n">0</span>/240</small></label>
    <label class="field"><span>Pergunta de investigação</span><input id="f-q" name="question" maxlength="140" placeholder="Opcional. Ex.: O que acontece se…?"></label>
    <label class="field"><span>Texto</span><textarea id="f-body" name="body" required maxlength="6000" style="min-height:180px" placeholder="Separe os parágrafos com uma linha em branco."></textarea></label>
    <div class="row2"><label class="field"><span>Autoria</span><input id="f-author" name="author" required maxlength="80" value="${nap?'Comitê NAP '+nap:'Redação '+P.nome}"></label><label class="field"><span>Turma e orientação</span><input id="f-credit" name="credit" maxlength="120" placeholder="Ex.: 7º ano · orientação de Ciências"></label></div>
    <label class="field"><span>Conexão com a BNCC</span><input id="f-skill" name="skill" maxlength="300" placeholder="Código e descrição da habilidade"></label>
    <label class="field"><span>Fontes (uma por linha: nome | link)</span><textarea id="f-refs" name="refs" maxlength="1200" style="min-height:70px" placeholder="NASA · Fases da Lua | https://science.nasa.gov/moon/moon-phases/"></textarea><small>Matérias de ciência precisam de pelo menos uma fonte.</small></label>
    <label class="check"><input type="checkbox" id="f-auth" name="authorized" value="yes"><span>As pessoas que aparecem nas mídias têm termo de uso de imagem assinado, e o texto não traz dados pessoais.</span></label>
    <p class="err" role="alert" hidden></p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" type="submit">${ico('send')} Enviar para revisão</button><a class="btn ghost" href="#inicio">Cancelar</a></div>
  </form>
  <aside class="preview" aria-label="Pré-visualização"><span class="eyebrow">Como vai aparecer no feed</span><div id="live-preview" style="margin-top:8px"></div></aside></div></div>`;
}
function sectionOptions(sel){ return CADERNOS.map(c=>`<optgroup label="${esc(c.nome)}">${SECOES.filter(s=>s.cad===c.id).map(s=>`<option value="${s.id}" ${s.id===sel?'selected':''}>${esc(s.titulo)}</option>`).join('')}</optgroup>`).join(''); }
function viewQueue(){
  if(S.role!=='curadoria') return `<div class="col gutter view-wrap"><div class="page-h"><h1>Curadoria</h1></div><div class="empty">Área reservada à curadoria docente. Para testar, troque o perfil em <a href="#perfil">Perfil</a>.</div></div>`;
  const items=queueItems();
  const kindName={post:'Publicação',comment:'Comentário',pauta:'Sugestão de pauta'};
  return `<div class="col gutter view-wrap"><div class="page-h"><h1>Fila da curadoria</h1><p>${items.length?`${items.length} ite${items.length===1?'m aguarda':'ns aguardam'} revisão.`:'Nada pendente.'} Aprovações entram no feed na hora.</p></div>
  <div class="queue">${items.map(it=>{
    const n=it.nap?napOf(it.nap):null, s=it.section?secOf(it.section):null;
    const files=(it.media||[]).length?`<div class="thumbs">${it.media.map(m=>m.type.startsWith('video')?`<div><video src="${esc(m.url)}" muted></video></div>`:`<div><img src="${esc(m.url)}" alt="${esc(it.alt||'')}"></div>`).join('')}</div>`:'';
    return `<article class="q"><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span class="pill status-pending">${kindName[it.kind]}</span>${n?`<span class="pill c-${n.cor}">${n.nome}</span>`:''}${s?`<span class="note">${esc(s.titulo)}</span>`:''}${it.demo?'<span class="note">· exemplo</span>':''}<span class="note">· ${esc(relDate(it.date))}</span></div>
      <h3>${esc(it.kind==='comment'?`Em “${postById(it.postId)?.title||'matéria'}”`:it.title)}</h3>
      ${it.deck?`<p><strong>${esc(it.deck)}</strong></p>`:''}<div class="body">${esc(it.body)}</div>${files}
      ${it.kind==='post'&&!it.references?.length&&s&&s.cad==='ciencia'?'<p class="err" style="font-size:13px">Atenção: matéria de ciência sem fonte indicada.</p>':''}
      <p class="note">Por ${esc(it.author||'estudante')}${it.credit?' · '+esc(it.credit):''}</p>
      <div class="q-acts"><label class="sr" for="n-${esc(it.id)}">Retorno para a autoria</label><input id="n-${esc(it.id)}" placeholder="Retorno para a autoria (opcional)"><button class="btn primary sm" data-decide="approved" data-id="${esc(it.id)}" data-kind="${it.kind}">${ico('check')} Aprovar</button><button class="btn danger sm" data-decide="rejected" data-id="${esc(it.id)}" data-kind="${it.kind}">Recusar</button></div></article>`;}).join('')||'<div class="empty">Tudo revisado. Novos envios do comitê e comentários aparecem aqui.</div>'}</div></div>`;
}

/* ---------- Roteador ---------- */
function route(){
  const h=decodeURIComponent(location.hash.slice(1))||'inicio';
  const prev=V.view;
  if(prev==='inicio') V.homeScroll=window.scrollY;
  let view='inicio', arg='';
  if(h.startsWith('materia-')){view='materia';arg=h.slice(8);}
  else if(h.startsWith('nap-')){view='nap';arg=h.slice(4).toUpperCase();}
  else if(h.startsWith('secao-')){view='secao';arg=h.slice(6);}
  else if(h==='explorar') view='secoes';
  else if(h==='sobre'||h==='expediente'){view='edicao';arg='expediente';}
  else if(['inicio','secoes','edicao','perfil','criar','curadoria'].includes(h)) view=h;
  else if(h==='comentarios'){ $('#comentarios')?.scrollIntoView({behavior:'smooth'}); return; }
  V.view=view; V.arg=arg;
  document.body.classList.toggle('reading',view==='materia');
  if(!['materia','nap'].includes(view)) V.lastTab=view==='secao'?'secoes':view;
  const html = view==='materia'?viewArticle(arg):view==='nap'?viewNap(arg):view==='secoes'?viewSections():view==='secao'?viewSection(arg):view==='edicao'?viewEdition():view==='perfil'?viewProfile():view==='criar'?viewCreate():view==='curadoria'?viewQueue():viewHome();
  $('#view').innerHTML=html;
  renderNav();
  hydrateIcons(document);
  afterRender(view);
  if(view==='inicio'&&prev==='materia') window.scrollTo(0,V.homeScroll); else if(arg==='expediente') $('#expediente')?.scrollIntoView(); else window.scrollTo(0,0);
  document.title = view==='materia'&&postById(arg) ? `${postById(arg).title} · ${P.nome}` : `${P.nome} · Marista Pio X`;
}
function rerender(){ const y=window.scrollY; const v=V.view; V.view='__'; const prevScroll=V.homeScroll; route(); V.homeScroll=prevScroll; window.scrollTo(0,y); if(v==='inicio') V.homeScroll=y; }
function hydrateIcons(root){ root.querySelectorAll('[data-ico]').forEach(el=>{ if(!el.firstChild) el.innerHTML=ico(el.dataset.ico); }); }
function afterRender(view){
  if(view==='inicio') initCover();
  if(view==='secoes'){ const q=$('#q'); q.addEventListener('input',()=>{V.explore.q=q.value; const v=q.value.trim(); $('#explore-body').innerHTML=v?searchResults(v):sectionsIndex();}); if(V.focusSearch){q.focus();V.focusSearch=false;} }
  if(view==='criar'&&canPublish()) initComposer();
}
function initCover(){
  const sl=$('#cover-slides'); if(!sl) return;
  const dots=$$('#cover-dots i'), count=$('#cover-count'), prev=$('[data-slide="-1"]'), next=$('[data-slide="1"]');
  const upd=()=>{const i=Math.round(sl.scrollLeft/sl.clientWidth); dots.forEach((d,k)=>d.classList.toggle('on',k===i)); count.textContent=`${i+1}/4`; prev.hidden=i===0; next.hidden=i===3; [...sl.children].forEach((c,k)=>c.inert=k!==i);};
  sl.addEventListener('scroll',()=>{cancelAnimationFrame(sl._r); sl._r=requestAnimationFrame(upd);},{passive:true});
  upd();
}

/* ---------- Ações ---------- */
let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; clearTimeout(toastT); toastT=setTimeout(()=>t.textContent='',3200); }
function toggle(list,id){ const i=S[list].indexOf(id); if(i<0) S[list].push(id); else S[list].splice(i,1); save(); return i<0; }
function like(id, force){
  const on = force ? (S.likes.includes(id)?true:toggle('likes',id)) : toggle('likes',id);
  const p=postById(id);
  $$(`[data-like="${CSS.escape(id)}"]`).forEach(b=>{b.setAttribute('aria-pressed',on);b.classList.remove('pop');void b.offsetWidth;if(on)b.classList.add('pop');});
  $$(`[data-likes="${CSS.escape(id)}"]`).forEach(el=>{el.textContent=likeCount(p); el.closest('button')?.setAttribute('aria-label',`${on?'Descurtir':'Curtir'}, ${likeCount(p)} curtidas`);});
}
let tapT=null, tapId=null;
document.addEventListener('click', e=>{
  const t=e.target.closest('button,a,[data-tap]'); if(!t) return;
  const d=t.dataset;
  if(t.matches('[data-focus-search]')) V.focusSearch=true;
  if(d.tap!==undefined){
    if(tapT&&tapId===d.tap){ clearTimeout(tapT); tapT=null; like(d.tap,true); const b=t.querySelector('.burst'); if(b){b.classList.remove('on');void b.offsetWidth;b.classList.add('on');} return; }
    tapId=d.tap; clearTimeout(tapT); tapT=setTimeout(()=>{tapT=null; if(V.view!=='materia') location.hash='materia-'+d.tap;},280); return;
  }
  if(d.like) return like(d.like);
  if(d.save){ const on=toggle('saves',d.save); $$(`[data-save="${CSS.escape(d.save)}"]`).forEach(b=>{b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Remover dos salvos':'Salvar');}); toast(on?'Salvo no seu perfil':'Removido dos salvos'); return; }
  if(d.follow){ const on=toggle('follows',d.follow); toast(on?`Você segue o NAP ${d.follow}`:`Deixou de seguir o NAP ${d.follow}`); rerender(); return; }
  if(d.comments) return openComments(d.comments);
  if(d.share) return openShare(d.share);
  if(d.story!==undefined){ e.preventDefault(); return openStory(d.story); }
  if(d.feed){ V.feedTab=d.feed; V.limit=6; rerender(); return; }
  if(d.more!==undefined){ V.limit+=6; rerender(); return; }
  if(d.naptab){ V.napTab=d.naptab; rerender(); return; }
  if(d.proftab){ V.profTab=d.proftab; rerender(); return; }
  if(d.role){ S.role=d.role; save(); toast(`Agora você vê a prévia como ${ROLES[d.role].nome}`); rerender(); return; }
  if(d.goto){ location.hash=d.goto; return; }
  if(d.back!==undefined){ if(history.length>1&&V.cameFromApp) history.back(); else location.hash=V.lastTab||'inicio'; return; }
  if(d.jump){ e.preventDefault(); $('#'+d.jump)?.scrollIntoView({behavior:'smooth'}); $('#'+d.jump+' textarea')?.focus({preventScroll:true}); return; }
  if(d.copy){ const el=$('#'+d.copy); copyText(el.value??el.textContent, el); return; }
  if(d.slide){ const sl=$('#cover-slides'); sl.scrollBy({left:sl.clientWidth*+d.slide,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); return; }
  if(d.decide) return decide(d.id,d.kind,d.decide);
  if(d.reset!==undefined){ if(t.dataset.confirm){ S=structuredClone(DEFAULT); save(); toast('Prévia restaurada'); location.hash='inicio'; rerender(); } else { t.dataset.confirm='1'; t.innerHTML='Toque de novo para confirmar a restauração'; } return; }
});
window.addEventListener('hashchange',()=>{ V.cameFromApp=true; route(); });
document.addEventListener('change', e=>{
  if(e.target.id==='role-nap'){ S.roleNap=e.target.value; save(); rerender(); }
});
async function copyText(text, el){
  try{ await navigator.clipboard.writeText(text); toast('Copiado'); }
  catch{ if(el&&el.select){ el.select(); } else if(el){ const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r);} toast('Texto selecionado. Use Ctrl+C ou “Copiar”.'); }
}

/* ---------- Folha inferior: comentários e compartilhar ---------- */
const sheet=$('#sheet');
function openSheet(title, html){
  sheet.innerHTML=`<div class="sh"><div class="sh-h"><h2 id="sheet-title">${title}</h2><button class="iconbtn" data-close-sheet aria-label="Fechar">${ico('close')}</button></div><div class="sh-b">${html}</div></div>`;
  if(!sheet.open) sheet.showModal();
}
sheet.addEventListener('click',e=>{ if(e.target===sheet||e.target.closest('[data-close-sheet]')) sheet.close(); else if(e.target.closest('a[href^="#"]')) sheet.close(); });
function openComments(id){ const p=postById(id); openSheet('Comentários', `<p class="note" style="margin-bottom:10px">${esc(p?.title||'')}</p><div class="comments" style="padding:0">${commentsMarkup(id,'sh-cmt')}</div>`); }
function openShare(id){
  const p=postById(id); const url=location.href.split('#')[0]+'#materia-'+id;
  openSheet('Compartilhar', `<p style="font:600 18px/1.3 var(--f-serif);margin-bottom:12px">${esc(p.title)}</p>
  <div class="share-row"><label class="sr" for="share-url">Link da matéria</label><input id="share-url" readonly value="${esc(url)}"><button class="btn primary sm" data-copy="share-url">${ico('copy')} Copiar</button></div>
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><a class="btn ghost sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(p.title+' · '+P.nome+' '+url)}">WhatsApp</a><a class="btn ghost sm" target="_blank" rel="noopener" href="https://classroom.google.com/share?url=${encodeURIComponent(url)}">Google Sala de Aula</a></div>
  <p class="note" style="margin-top:12px">Na versão publicada, o link abre direto na matéria, inclusive fora da escola.</p>`);
}

/* ---------- Formulários ---------- */
document.addEventListener('submit', e=>{
  const f=e.target, type=f.dataset.form; if(!type) return; e.preventDefault();
  const fd=new FormData(f), err=f.querySelector('.err');
  const fail=msg=>{ if(err){err.hidden=false;err.textContent=msg;err.scrollIntoView({block:'center'});} else toast(msg); };
  if(type==='name'){ S.name=String(fd.get('name')||'').trim().slice(0,40); save(); toast('Nome salvo'); rerender(); return; }
  if(type==='comment'){
    const body=String(fd.get('body')||'').trim(); if(!body) return;
    S.comments.push({id:'u'+Date.now(),postId:f.dataset.post,author:S.name||ROLES[S.role].nome,tag:ROLES[S.role].nome.toLowerCase(),body,date:P.hoje,status:'pending'}); save();
    toast('Comentário enviado para moderação');
    if(sheet.open) openComments(f.dataset.post); else rerender();
    return;
  }
  if(type==='pauta'){
    const title=String(fd.get('title')||'').trim(), body=String(fd.get('body')||'').trim();
    if(!title||!body) return fail('Escreva a ideia e conte um pouco mais sobre ela.');
    S.pautas.push({id:'p'+Date.now(),title,body,section:fd.get('section')||'',author:S.name||'Estudante',date:P.hoje,status:'pending'}); save();
    toast('Sugestão enviada ao comitê'); V.profTab='envios'; location.hash='perfil'; return;
  }
  if(type==='post'){
    const g=k=>String(fd.get(k)||'').trim();
    const nap=S.role==='comite'?S.roleNap:g('nap');
    const data={title:g('title'),deck:g('deck'),body:g('body'),author:g('author')};
    if(!data.title||!data.deck||!data.body||!data.author) return fail('Preencha título, resumo, texto e autoria.');
    if(V.files.length&&!g('alt')) return fail('Descreva as imagens para quem usa leitor de tela.');
    if(V.files.length&&fd.get('authorized')!=='yes') return fail('Confirme a autorização de uso de imagem.');
    const refs=g('refs').split('\n').map(l=>l.split('|').map(x=>x.trim())).filter(x=>x[0]).map(([name,url])=>({name,url:/^https?:\/\//.test(url||'')?url:''}));
    const sec=secOf(g('section'));
    if(sec?.cad==='ciencia'&&!refs.length) return fail('Matérias do caderno Ciência em Pauta precisam de pelo menos uma fonte.');
    const img=V.files.find(x=>x.type.startsWith('image')), vid=V.files.find(x=>x.type.startsWith('video'));
    const id='env-'+Date.now().toString(36);
    S.subs.push({id,kind:'post',nap,section:g('section'),format:g('format'),...data,question:g('question'),credit:g('credit'),skill:g('skill'),references:refs.filter(r=>r.url),alt:g('alt'),image:img?.url,images:V.files.filter(x=>x.type.startsWith('image')).map(x=>x.url),video:vid?.url,media:V.files.map(({url,type})=>({url,type})),cover:data.title.split(' ').slice(0,4).join(' '),date:P.hoje,status:'pending',reactions:0});
    save(); V.files=[]; toast('Enviado para revisão. Acompanhe em Perfil › Envios.'); V.profTab='envios'; location.hash='perfil';
  }
});
function decide(id,kind,status){
  const note=$('#n-'+CSS.escape(id))?.value.trim()||'';
  const sample=SAMPLE_QUEUE.find(q=>q.id===id);
  if(sample) S.decisions[id]={status,date:P.hoje,note};
  else { const coll=kind==='post'?S.subs:kind==='comment'?S.comments:S.pautas; const it=coll.find(x=>x.id===id); if(it){it.status=status;it.note=note;} }
  save(); toast(status==='approved'?(kind==='pauta'?'Pauta aprovada para o comitê':'Aprovado e publicado'):'Recusado. A autoria verá o retorno.'); rerender();
}
/* Reduz fotos para 1080 px antes de guardar (na versão publicada, isso economiza dados móveis). */
function shrink(file){ return new Promise(res=>{ const u=URL.createObjectURL(file), im=new Image(); im.onload=()=>{ const k=Math.min(1,1080/Math.max(im.width,im.height)), c=document.createElement('canvas'); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext('2d').drawImage(im,0,0,c.width,c.height); URL.revokeObjectURL(u); res(c.toDataURL('image/jpeg',.82)); }; im.onerror=()=>res(u); im.src=u; }); }
function initComposer(){
  const input=$('#f-media'), drop=$('#drop'), form=$('[data-form="post"]');
  const renderThumbs=()=>{ $('#thumbs').innerHTML=V.files.map(f=>f.type.startsWith('video')?`<div><video src="${f.url}" muted></video></div>`:`<div><img src="${f.url}" alt=""></div>`).join(''); $('#alt-field').hidden=!V.files.length; preview(); };
  const add=async files=>{
    const list=[...files].filter(f=>/^(image\/(jpeg|png|webp)|video\/(mp4|webm))$/.test(f.type));
    if(list.length!==files.length) toast('Alguns arquivos foram ignorados: use JPG, PNG, WebP, MP4 ou WebM.');
    if(V.files.length+list.length>4||[...V.files,...list].reduce((s,f)=>s+f.size,0)>12*1024*1024){ toast('Limite: 4 arquivos e 12 MB no total.'); return; }
    const items=await Promise.all(list.map(async f=>f.type.startsWith('image')?{url:await shrink(f),type:'image/jpeg',size:f.size}:{url:URL.createObjectURL(f),type:f.type,size:f.size}));
    V.files=[...V.files,...items]; renderThumbs();
  };
  input.addEventListener('change',()=>add(input.files));
  ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over');}));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over'); if(ev==='drop') add(e.dataTransfer.files);}));
  const preview=()=>{
    const g=id=>$('#'+id)?.value.trim()||'';
    const img=V.files.find(f=>f.type.startsWith('image'));
    const p={id:'preview',nap:S.role==='comite'?S.roleNap:g('f-nap'),section:g('f-sec'),format:g('f-format'),title:g('f-title')||'Título da matéria',deck:g('f-deck')||'O resumo aparece aqui, com até duas linhas no feed.',body:g('f-body'),author:g('f-author')||'Autoria',date:P.hoje,image:img?.url,alt:g('f-alt'),cover:(g('f-title')||'Sua capa').split(' ').slice(0,4).join(' '),reactions:0,video:V.files.find(f=>f.type.startsWith('video'))?.url};
    $('#live-preview').innerHTML=postCard(p).replace(/data-(like|save|share|comments|tap|follow)="[^"]*"/g,'').replace(/href="#materia-preview"/g,'href="#criar"');
    $('#deck-n').textContent=g('f-deck').length;
  };
  form.addEventListener('input',preview); renderThumbs();
}

/* ---------- Stories ---------- */
const story=$('#story'); let ST={id:'',i:0};
const STORY_BG={quiz:['#0B3C6E','#fff'],enquete:['#1E8BC3','#fff'],desafio:['#2E6B1A','#fff'],pergunte:['#4A3285','#fff'],agenda:['#FFC72C','#14202E']};
function storyPages(id){
  if(id==='quiz'){
    const pages=QUIZ.map((q,i)=>{ const a=S.quiz[i];
      return `<span class="eyebrow">Fato ou Fake? · ${i+1} de ${QUIZ.length}</span><h2>${esc(q.claim)}</h2>
      <div class="st-choice two" role="group" aria-label="Sua resposta">${['Fato','Fake'].map(v=>`<button data-quiz="${i}" data-v="${v}" aria-pressed="${a===v}">${v}</button>`).join('')}</div>
      ${a?`<div class="st-answer" role="status"><b>${a===q.answer?'Acertou!':'Quase!'} É ${q.answer}.</b>${esc(q.explanation)}<br><a href="${esc(q.url)}" target="_blank" rel="noopener">Fonte: ${esc(q.source)}</a></div>`:'<p>Escolha uma opção para ver a explicação.</p>'}`; });
    const ok=QUIZ.filter((q,i)=>S.quiz[i]===q.answer).length, done=Object.keys(S.quiz).length;
    pages.push(`<span class="eyebrow">Resultado</span><div class="st-big">${ok}/${QUIZ.length}</div><h2>${done<QUIZ.length?'Responda todas para ver seu resultado completo.':ok===QUIZ.length?'Checagem perfeita!':'Boa checagem!'}</h2><p>Antes de compartilhar uma informação, procure a fonte e confira a data.</p><a class="st-cta" href="#materia-fases-ou-eclipse" data-close-story>Ler a checagem completa ${ico('right')}</a>`);
    return pages;
  }
  if(id==='enquete'){
    const v=S.vote, tot=POLL.options.reduce((s,o)=>s+o.base+(v===o.id?1:0),0);
    return [`<span class="eyebrow">Enquete · pauta do n. 1</span><h2>${esc(POLL.pergunta)}</h2>
      <div class="st-choice" role="group" aria-label="Opções">${POLL.options.map(o=>{const c=o.base+(v===o.id?1:0), pct=Math.round(c/tot*100);
        return `<button data-vote="${o.id}" aria-pressed="${v===o.id}" ${v?'disabled':''}>${v?`<span class="bar" style="width:${pct}%"></span>`:''}<span><span>${esc(o.label)}</span>${v?`<b>${pct}%</b>`:''}</span></button>`;}).join('')}</div>
      <p style="font-size:13.5px">${v?`${tot} votos · resultado parcial. Votos simulados nesta prévia.`:'Um voto por estudante, com a conta escolar.'}</p>`];
  }
  if(id==='desafio') return [
    `<span class="eyebrow">Desafio da próxima edição</span><h2>Para onde a sombra foi?</h2><p>Uma investigação com giz, um objeto fixo e três horários diferentes.</p>`,
    `<span class="eyebrow">Passo a passo</span><h2>Marque e registre</h2><p>1. Com um professor, escolha um objeto fixo num lugar ensolarado.<br>2. Marque com giz onde a sombra termina e anote a hora.<br>3. Repita em mais dois horários.</p>`,
    `<span class="eyebrow">Compartilhe</span><h2>Compare as sombras</h2><p>O comprimento mudou? E a direção? Envie seu desenho ou tabela e a pergunta que ficou.</p><a class="st-cta" href="#criar" data-close-story>Enviar meu registro ${ico('right')}</a><a href="#materia-desafio-sombras" data-close-story>Ler o desafio completo</a>`];
  if(id==='pergunte') return [
    `<span class="eyebrow">Pergunte ao Jornal</span><h2>Por que o céu é azul?</h2><p>A luz azul do Sol se espalha mais que a vermelha quando atravessa o ar. Por isso ela parece vir de todo o céu.</p><a class="st-cta" href="#materia-ceu-azul" data-close-story>Ler a resposta ${ico('right')}</a>`,
    `<span class="eyebrow">Sua vez</span><h2>Qual é a sua pergunta?</h2><form data-story-form><label class="sr" for="st-q">Sua pergunta</label><textarea id="st-q" class="st-input" maxlength="300" required placeholder="Ex.: Por que a água do mar é salgada?"></textarea><button class="st-cta" type="submit" style="margin-top:12px;border:0">${ico('send')} Enviar à redação</button></form><p style="font-size:13.5px">Sem nomes completos ou dados pessoais. A redação escolhe uma pergunta por edição.</p>`];
  if(id==='agenda') return AGENDA.map(a=>`<span class="eyebrow">Agenda · ${esc(a.quem)}</span><div class="st-big">${a.d} <span style="font-size:.45em;letter-spacing:.1em">${a.m}</span></div><h2>${esc(a.titulo)}</h2><p>${esc(a.desc)}</p>${a.post?`<a class="st-cta" href="#materia-${a.post}" data-close-story>Ler matéria ${ico('right')}</a>`:''}`);
  return [];
}
function openStory(id,i=0){ ST={id,i}; if(!S.seen.includes(id)){S.seen.push(id);save();} drawStory(); if(!story.open) story.showModal(); story.querySelector('.st-body')?.focus(); }
function drawStory(){
  const pages=storyPages(ST.id), s=STORIES.find(x=>x.id===ST.id), [bg,ink]=STORY_BG[ST.id];
  ST.i=Math.max(0,Math.min(ST.i,pages.length-1));
  story.setAttribute('aria-label',`Story ${s.label}, ${ST.i+1} de ${pages.length}`);
  story.innerHTML=`<div class="st-card" style="--st-bg:${bg};--st-ink:${ink}">
    <div class="st-bars" aria-hidden="true">${pages.map((_,k)=>`<i class="${k<ST.i?'done':k===ST.i?'done':''}"></i>`).join('')}</div>
    <div class="st-head"><span class="av" aria-hidden="true">${ico(s.icon)}</span><strong>${esc(s.label)}</strong><button class="iconbtn" data-close-story aria-label="Fechar story">${ico('close')}</button></div>
    <div class="st-body" tabindex="-1">${pages[ST.i]}</div>
    <div class="st-foot"><button data-st="-1" ${ST.i===0?'disabled':''}>${ico('left')} Anterior</button><span style="align-self:center;font-size:12.5px;opacity:.8;text-align:center">${ST.i+1}/${pages.length}<br>toque nas laterais</span><button data-st="1">${ST.i===pages.length-1?'Concluir':'Próximo'} ${ico('right')}</button></div></div>`;
}
function stepStory(dir){ const n=storyPages(ST.id).length, ni=ST.i+dir; if(ni>=n){ story.close(); return; } if(ni<0) return; ST.i=ni; drawStory(); }
let swipe=null, swiped=false;
story.addEventListener('pointerdown',e=>{ swipe={x:e.clientX,y:e.clientY}; });
story.addEventListener('pointerup',e=>{ if(!swipe) return; const dx=e.clientX-swipe.x, dy=e.clientY-swipe.y; swipe=null; if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5&&!e.target.closest('textarea,input')){ swiped=true; stepStory(dx<0?1:-1); } });
story.addEventListener('click',e=>{
  if(swiped){ swiped=false; return; }
  if(e.target===story){ story.close(); return; }
  const card=e.target.closest('.st-card');
  if(card&&!e.target.closest('button,a,textarea,input,label,select,form,.st-head,.st-foot')){
    const r=card.getBoundingClientRect(); stepStory(e.clientX-r.left<r.width*0.35?-1:1); return;
  }
  const t=e.target.closest('button,a'); if(!t) return;
  if(t.hasAttribute('data-close-story')){ story.close(); return; }
  if(t.dataset.st){ stepStory(+t.dataset.st); return; }
  if(t.dataset.quiz){ S.quiz[t.dataset.quiz]=t.dataset.v; save(); drawStory(); return; }
  if(t.dataset.vote){ S.vote=t.dataset.vote; save(); drawStory(); toast('Voto registrado'); if(V.view==='inicio') rerender(); return; }
});
story.addEventListener('submit',e=>{ e.preventDefault(); const v=$('#st-q').value.trim(); if(!v) return; S.pautas.push({id:'q'+Date.now(),title:v,body:'Pergunta enviada pelo story “Pergunte ao Jornal”.',section:'pergunte-ao-jornal',author:S.name||'Estudante',date:P.hoje,status:'pending'}); save(); story.close(); toast('Pergunta enviada à redação'); });
story.addEventListener('keydown',e=>{ if(e.target.matches('textarea,input')) return; if(e.key==='ArrowRight') stepStory(1); if(e.key==='ArrowLeft') stepStory(-1); });
story.addEventListener('close',()=>{ if(V.view==='inicio'){ $$('.story').forEach(b=>b.classList.toggle('seen',S.seen.includes(b.dataset.story))); } });

window.addEventListener('resize',()=>{ clearTimeout(window._rz); window._rz=setTimeout(renderNav,150); });
route();
