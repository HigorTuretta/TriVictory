// src/data/gameData.js

// A lista de Perícias, Vantagens e Desvantagens permanece a mesma da resposta anterior.
// A grande mudança está na estrutura dos Arquétipos.

export const pericias = [
  { nome: 'Animais', custo: 1, descricao: 'Sabe cuidar, adestrar, cavalgar e lidar com animais e outras criaturas irracionais.' },
  { nome: 'Arte', custo: 1, descricao: 'Sabe fazer performances artísticas como cantar, dançar, tocar música, cozinhar, etc.' },
  { nome: 'Esporte', custo: 1, descricao: 'Capacitado em atividades físicas como correr, escalar, nadar, fazer acrobacias, etc.' },
  { nome: 'Influência', custo: 1, descricao: 'Sabe convencer outros com diplomacia, liderança, intimidação ou sedução.' },
  { nome: 'Luta', custo: 1, descricao: 'Sabe atacar e se defender em combate, corpo a corpo ou à distância.' },
  { nome: 'Manha', custo: 1, descricao: 'Sabe fazer coisas malandras ou ilegais, como furtar, arrombar, criar armadilhas.' },
  { nome: 'Máquinas', custo: 1, descricao: 'Sabe operar, construir e consertar máquinas, veículos e computadores.' },
  { nome: 'Medicina', custo: 1, descricao: 'Sabe realizar primeiros socorros, tratar doenças, venenos e realizar cirurgias.' },
  { nome: 'Mística', custo: 1, descricao: 'Sabe sobre forças sobrenaturais, atacar e se defender com poderes mágicos.' },
  { nome: 'Percepção', custo: 1, descricao: 'Sabe usar seus sentidos para perceber melhor o mundo, notar coisas escondidas.' },
  { nome: 'Saber', custo: 1, descricao: 'Sabe tudo sobre tudo, qualquer conhecimento teórico em ciências, idiomas, etc.' },
  { nome: 'Sobrevivência', custo: 1, descricao: 'Sabe subsistir e se orientar em condições adversas, encontrar comida, etc.' },
];

export const vantagens = [
    { nome: 'Aceleração', custo: 1, descricao: 'Pode gastar 1PM para um movimento extra ou Ganho na iniciativa.' },
    { nome: '+Ação', custo: 1, repetivel: true, descricao: 'Ganha +2 Pontos de Ação. Pode ser comprada várias vezes.' },
    { nome: 'Acumulador', custo: 1, descricao: 'Após acertar um ataque, gaste 2PM para ganhar P+1 no próximo ataque, acumulando até P+5.' },
    { nome: 'Ágil', custo: 1, descricao: 'Recebe H+2 em testes de agilidade e iniciativa. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { 
      nome: 'Ajudante', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Tem um ajudante que pode ser invocado por 2PM (ou 1PM para Familiar/Montaria).',
      opcoes: ['Curandeiro', 'Especialista', 'Familiar', 'Lutador', 'Montaria']
    },
    { nome: 'Alcance', custo: 1, max: 2, descricao: '1pt: atinge Longe sem penalidade e Muito Longe com Perda. 2pt: atinge Muito Longe sem penalidade.' },
    { nome: 'Anulação', custo: 2, descricao: 'Gaste 3PM e uma ação para anular uma vantagem de um alvo até o fim da cena.' },
    { 
      nome: 'Arena', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Escolha um tipo de terreno. Nele, pode gastar 2PM para ter Ganho em um teste.',
      opcoes: ['Água', 'Céu', 'Cidades', 'Ermos', 'Subterrâneo', 'Lugar Específico']
    },
    { nome: 'Artefato', custo: 1, repetivel: true, descricao: 'Possui um item especial. Cada ponto vale 10XP para comprar qualidades para o item.' },
    { 
        nome: 'Ataque Especial',
        custo: 1,
        repetivel: true,
        descricao: 'Permite ativar técnicas de ataque superiores gastando PM.',
        opcoes: [ 'Área (3PM)', 'Choque (1PM)', 'Distante (1PM)', 'Espiritual (1PM)', 'Investida (1PM)', 'Múltiplo (1PM/alvo)', 'Penetrante (2PM)', 'Perigoso (1PM)', 'Poderoso (2PM)', 'Potente (+2P/1PM)', 'Preciso (1PM)', 'Titânico (3PM)' ]
    },
    { nome: 'Base', custo: 1, descricao: 'Possui uma base de operações. Pode se teleportar para ela fora de combate e tem Ganho em testes realizados lá.' },
    { nome: 'Brutal', custo: 1, repetivel: true, descricao: 'Recupera PV ou PM ao causar dano ou derrotar oponentes em combate.', opcoes: ['Vida', 'Mana', 'Derrota'] },
    { nome: 'Carismático', custo: 1, descricao: 'Recebe P+2 em testes sociais. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { nome: 'Clone', custo: 1, descricao: 'Gaste 2PM e um movimento para criar cópias. Um clone desaparece no lugar de você sofrer dano.' },
    { nome: 'Confusão', custo: 1, descricao: 'Ataque por 2PM. Se vencer, alvo fica confuso, com alvos escolhidos ao acaso pelo mestre.' },
    { nome: 'Cura', custo: 1, descricao: 'Gaste 2PM para curar 1D PV, até um máximo de dados igual à sua Habilidade.' },
    { 
        nome: 'Defesa Especial',
        custo: 1,
        repetivel: true,
        descricao: 'Permite ativar técnicas de defesa superiores gastando PM.',
        opcoes: ['Blindada (1PM)', 'Bloqueio (1PM)', 'Esquiva (1PM)', 'Proteção (1PM/alvo)', 'Provocação (1PM)', 'Reflexão (1PM)', 'Robusta (2PM)', 'Tenaz (+2R/1PM)', 'Titânica (3PM)']
    },
    { nome: 'Desgaste', custo: 1, descricao: 'Ataque por 2PM. Se causar dano, o alvo sofre o mesmo dano novamente na próxima rodada.' },
    { nome: 'Devoto', custo: 1, descricao: 'Serve a uma causa. Gaste 2PM para ter Ganho em testes que sigam ou defendam sua devoção (2x/cena).' },
    { nome: 'Elo Mental', custo: 1, descricao: 'Ligação mental com outro personagem. Podem se comunicar e compartilhar PM.' },
    { nome: 'Estender', custo: 1, descricao: 'Gaste 1PM por turno para estender o efeito de uma vantagem pessoal a um aliado Perto.' },
    { nome: 'Famoso', custo: 1, descricao: 'É conhecido. Em situações sociais, gaste 3PM para ter Ganho.' },
    { nome: 'Foco', custo: 1, descricao: 'Use um turno se concentrando (2PM) para receber um crítico automático no próximo teste.' },
    { nome: 'Forte', custo: 1, descricao: 'Recebe P+2 em testes de esforço físico. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { nome: 'Gênio', custo: 1, descricao: 'Recebe H+2 em testes de inteligência. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { nome: 'Golpe Final', custo: 1, descricao: 'Gaste 3PM para fazer um ataque contra um alvo perto da derrota. O ataque é elevado uma escala acima.' },
    { nome: 'Grimório', custo: 1, repetivel: true, descricao: 'Permite começar com técnicas. Cada ponto vale 10XP para adquirir truques ou técnicas comuns.' },
    { nome: 'Ilusão', custo: 2, descricao: 'Cria ilusões tridimensionais com custo de PM variável conforme o tamanho.' },
    { nome: 'Imitar', custo: 1, descricao: 'Gaste 3PM e uma ação para imitar uma vantagem de um alvo até o fim da cena.' },
    { nome: 'Imortal', custo: 1, descricao: 'Não pode ser morto. Em testes de morte, o pior resultado é inconsciente.' },
    { nome: 'Improviso', custo: 2, descricao: 'Gaste 3PM para aprender e usar uma perícia que não tenha até o fim da cena.' },
    { 
      nome: 'Imune', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Imune a algo que normalmente afeta outras criaturas.',
      opcoes: ['Abiótico', 'Anfíbio', 'Doenças', 'Resiliente', 'Sem Mente']
    },
     { 
      nome: 'Inimigo', 
      custo: 1,
      repetivel: true,
      descricao: 'Treinado contra um tipo de criatura. Crítico com 5 ou 6 contra elas. Custa 2pt para grupos abundantes.',
      opcoes: ['Humanos (2pt)', 'Humanoides', 'Construtos', 'Espíritos', 'Monstros']
    },
    { nome: 'Inofensivo', custo: 1, descricao: 'Não parece perigoso. Ganha uma ação extra no início do combate e Ganho na iniciativa.' },
    { nome: 'Instrutor', custo: 1, descricao: 'Gaste 2PM e uma ação para permitir que um aliado use uma de suas perícias.' },
    { nome: 'Inventário', custo: 1, max: 3, descricao: 'Carrega itens consumíveis. 1pt: Pequeno; 2pt: Grande; 3pt: Supremo.' },
    { nome: 'Invisível', custo: 1, max: 2, descricao: '1pt: Gaste 3PM para ficar invisível até atacar. 2pt: invisibilidade só quebra se sofrer dano.' },
    { nome: 'Irresistível', custo: 1, descricao: 'Pode gastar 2PM ou mais para aumentar a dificuldade do teste de resistência de um alvo.' },
    { nome: 'Maestria', custo: 1, repetivel: true, descricao: 'Escolha uma perícia. Gaste 1PM para ter crítico com 5 ou 6 em testes dela.' },
    { nome: 'Magia', custo: 2, descricao: 'Manipula energias místicas. Gaste X PM para somar +X em qualquer teste, até o limite da Habilidade.' },
    { nome: '+Mana', custo: 1, repetivel: true, descricao: 'Ganha +10 Pontos de Mana. Pode ser comprada várias vezes.' },
    { nome: '+Membros', custo: 2, descricao: 'Tem membros extras. Gaste 3PM para fazer uma segunda ação no turno.' },
    { nome: 'Mentor', custo: 1, repetivel: true, descricao: 'Escolha uma perícia. Uma vez por cena, tenha Ganho em um teste dela. Técnicas com essa perícia custam -1PM.' },
    { nome: 'Obstinado', custo: 1, descricao: 'Pode gastar 1 ponto de atributo como se fosse 1 Ponto de Ação.' },
    { nome: 'Paralisia', custo: 1, descricao: 'Ataque por 2PM. Se vencer, em vez de dano, alvo fica imobilizado e indefeso.' },
    { nome: 'Patrono', custo: 1, descricao: 'Serve a uma organização. Gaste 1PM para Ganho em testes de compra para a missão e recebe itens extras.' },
    { nome: 'Punição', custo: 1, max: 2, repetivel: true, descricao: 'Ataque por 2PM. Se vencer, impõe uma desvantagem no alvo.' },
    { nome: 'Regeneração', custo: 1, max: 2, descricao: '1pt: recupera 1PV por turno. 2pt: recupera 3PV por turno. Pior resultado em teste de morte é Inconsciente.' },
    { nome: 'Resoluto', custo: 1, descricao: 'Recebe R+2 em testes de força de vontade. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { nome: 'Riqueza', custo: 2, max: 6, descricao: 'Tem recursos superiores. 2pt: Sugoi, 4pt: Kiodai, 6pt: Kami. Gaste PM para subir de escala em testes de compra.' },
    { 
      nome: 'Sentido', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Tem um sentido melhor ou diferente.',
      opcoes: ['Aguçado (Visão)', 'Aguçado (Audição)', 'Aguçado (Faro)', 'Infravisão', 'Intuição', 'Radar', 'Raio X']
    },
    { nome: 'Telepata', custo: 1, descricao: 'Pode ler pensamentos. Gaste 1PM para ter Ganho em testes sociais ou de defesa.' },
    { nome: 'Teleporte', custo: 1, descricao: 'Gaste PM para se deslocar para qualquer lugar que possa ver.' },
    { nome: 'Torcida', custo: 1, descricao: 'Luta melhor com plateia. Quando há torcida, tem um Ganho por rodada.' },
    { nome: 'Transformação', custo: 1, max: 2, repetivel: true, descricao: 'Pode mudar de forma. Faça outra ficha de personagem com a mesma pontuação.' },
    { nome: '+Vida', custo: 1, repetivel: true, descricao: 'Ganha +10 Pontos de Vida. Pode ser comprada várias vezes.' },
    { nome: 'Vigoroso', custo: 1, descricao: 'Recebe R+2 em testes de saúde física. Gaste 2PM para crítico com 5 ou 6 nesses testes.' },
    { nome: 'Voo', custo: 1, descricao: 'Pode voar. Gaste 2PM e um movimento para levantar voo.' },
];

export const desvantagens = [
    { nome: 'Ambiente', custo: -1, descricao: 'Acostumado a um ambiente específico. Fora dele, tem Perda em todos os testes em 1 em 1D.' },
    { nome: 'Amnésia', custo: -2, descricao: 'Não sabe quem é. O mestre faz sua ficha em segredo e você descobre seus poderes e fraquezas na prática.' },
    { nome: 'Antipático', custo: -1, descricao: 'Tem dificuldade de interação social. Tem Perda e nunca faz críticos em testes de Poder social.' },
    { nome: 'Assombrado', custo: -1, max: -2, descricao: '-1pt: Em 1 em 1D, tem Perda em todos os testes na cena. -2pt: acontece com resultado ímpar.' },
    { nome: 'Atrapalhado', custo: -1, descricao: 'Se atrapalha com facilidade. Tem Perda e nunca faz críticos em testes de Habilidade física.' },
    { nome: 'Aura', custo: -1, max: -2, descricao: '-1pt: Todos (aliados e inimigos) Perto de você têm Perda em seus testes. -2pt: afeta até Longe.' },
    { nome: 'Bateria', custo: -1, descricao: 'Quando fica com 0PM, desliga. Com PM baixo, tem Perda em todos os testes.' },
    {
      nome: 'Código',
      custo: -1,
      repetivel: true,
      descricao: 'Segue um código de conduta que o impede de fazer (ou deixar de fazer) alguma coisa.',
      opcoes: ['1ª Lei de Asimov', '2ª Lei de Asimov', 'Código do Caçador', 'Código do Combate', 'Código da Derrota', 'Código da Gratidão', 'Código dos Heróis', 'Código da Honestidade', 'Código da Redenção']
    },
    { nome: 'Dependência', custo: -2, descricao: 'Depende de algo raro ou proibido (sangue, cérebros, etc.) para viver. Não recomendado para jogadores.' },
    { nome: 'Diferente', custo: -1, descricao: 'Corpo muito diferente do humanoide comum, com dificuldades para usar equipamentos normais.' },
    { nome: 'Elo Vital', custo: -1, descricao: 'Ligado a um aliado. Quando um sofre dano, o outro também perde a mesma quantidade de PV.' },
    { nome: 'Fracote', custo: -1, descricao: 'Fraco fisicamente. Tem Perda e nunca faz críticos em testes de Poder para esforço físico.' },
    { nome: 'Frágil', custo: -1, descricao: 'Pouco vigor. Tem Perda e nunca faz críticos em testes de Resistência para saúde física.' },
    { nome: 'Fraqueza', custo: -1, max: -2, descricao: 'Vulnerável a um objeto ou condição. -1pt: Incomum. -2pt: Comum.' },
    { nome: 'Fúria', custo: -2, descricao: 'Ao sofrer dano, pode entrar em frenesi, atacando o alvo mais próximo e com Perda na defesa.' },
    { nome: 'Inapto', custo: -1, repetivel: true, descricao: 'Incompetente em uma perícia que não possui. Tem Perda e falha crítica automática nesses testes.' },
    { nome: 'Inculto', custo: -1, descricao: 'Não familiarizado com a cultura local. Dificuldade para ler e se comunicar.' },
    { nome: 'Indeciso', custo: -1, descricao: 'Dificuldade para tomar decisões. Tem Perda e nunca faz críticos em testes de Resistência para força de vontade.' },
    { nome: 'Infame', custo: -1, descricao: 'Conhecido por maus motivos. Tem Perda em testes sociais com NPCs que o reconhecem.' },
    { nome: 'Lento', custo: -1, descricao: 'Move-se devagar. Tem Perda na iniciativa e gasta um movimento extra para se deslocar.' },
    { nome: 'Maldição', custo: -1, max: -2, descricao: 'Vítima de uma maldição. -1pt: Suave e constrangedora. -2pt: Grave e desafiadora.' },
    { nome: 'Monstruoso', custo: -1, descricao: 'Aparência grotesca. Tem Perda em iniciativa e em testes sociais que envolvam aparência.' },
    { nome: 'Munição', custo: -1, descricao: 'Precisa usar um movimento para recarregar após cada ataque, ou ataca sem somar o Poder.' },
    { nome: 'Pacifista', custo: -1, max: -2, descricao: '-1pt: Não ataca, apenas se defende. -2pt: Não faz absolutamente nada que cause dano.' },
    { nome: 'Pobreza', custo: -1, descricao: 'Não tem recursos financeiros. Tem Perda em todos os testes de compra.' },
    { nome: 'Ponto Fraco', custo: -1, descricao: 'Tem uma vulnerabilidade que adversários podem explorar para ter Ganho contra você.' },
    { nome: 'Protegido', custo: -1, descricao: 'Precisa proteger alguém. Se o protegido estiver em perigo, você tem Perda em todos os testes.' },
    { nome: 'Restrição', custo: -1, max: -2, descricao: 'Uma condição torna seus poderes mais difíceis de usar, dobrando o custo de PM. -1pt: Incomum. -2pt: Comum.' },
    { nome: 'Sem Vida', custo: -2, descricao: 'Não é um ser vivo. Não recupera PV normalmente, apenas com conserto (Máquinas ou Mística).' },
    { nome: 'Tapado', custo: -1, descricao: 'Não muito brilhante. Tem Perda e nunca faz críticos em testes de Habilidade para inteligência.' },
    {
      nome: 'Transtorno',
      custo: -1,
      repetivel: true,
      descricao: 'Lida com um transtorno mental que afeta seu comportamento.',
      opcoes: ['Cleptomania', 'Compulsão', 'Distração', 'Fantasia', 'Fobia', 'Megalomania', 'Mitomania', 'Paranoia']
    },
    { nome: 'Utensílio', custo: -1, max: -2, descricao: 'Precisa de um item para usar seus poderes. -1pt: para uma perícia. -2pt: para todas as vantagens que gastam PM.' },
];

export const arquetipos = [
    { nome: 'Humano', custo: 0, poderes: ['Mais Além: Uma vez por cena, gaste 2PM para ter Ganho em um teste.'] },
    { nome: 'Aberrante', custo: 1, poderes: ['Deformidade: +1 no atributo de uma perícia à sua escolha.', 'Teratismo: Recebe uma Técnica Comum grátis.', 'Monstruoso (desvantagem).'] },
    { nome: 'Abissal', custo: 1, poderes: ['Ágil (vantagem).', 'Desfavor: Gaste 3PM e uma ação para impor Perda a um alvo.', 'Infame (desvantagem).'], vantagensGratuitas: ['Ágil'] },
    { 
        nome: 'Alien', 
        custo: 1, 
        poderes: ['Talento: Aliens têm aptidões físicas ou mentais superiores.', 'Xenobiologia: Uma vantagem sua custa metade dos PM.', 'Inculto (desvantagem).'],
        escolhas: [{
            id: 'alien_talento', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Forte', 'Gênio', 'Resoluto', 'Vigoroso'], mensagem: 'Como Alien, escolha seu Talento inato.'
        }]
    },
    { nome: 'Anão', custo: 1, poderes: ['Abascanto: Ganho em testes de R para evitar efeitos ruins.', 'A Ferro e Fogo: +1 em Máquinas e Sentido (Infravisão).', 'Lento (desvantagem).'] },
    { nome: 'Anfíbio', custo: 1, poderes: ['Imune (Anfíbio).', 'Vigoroso (vantagem).', 'Ambiente (água) (desvantagem).'], vantagensGratuitas: ['Vigoroso'] },
    { 
        nome: 'Celestial', 
        custo: 1, 
        poderes: ['Carismático (vantagem).', 'Arrebatar: Gaste 3PM e um movimento para conceder Ganho a um aliado.', 'Código: Todo celestial é guiado por um código.'],
        vantagensGratuitas: ['Carismático'],
        escolhas: [{
            id: 'celestial_codigo', tipo: 'desvantagem', nomeFiltro: 'Código', mensagem: "Como um Celestial, você deve ser guiado por um Código de Conduta."
        }]
    },
    { nome: 'Centauro', custo: 2, poderes: ['Corpo Táurico: Gaste 1PM para crítico com 5 ou 6 em testes de P físico e H para correr.', 'Vigoroso (vantagem).', 'Diferente (desvantagem).'], vantagensGratuitas: ['Vigoroso'] },
    { 
        nome: 'Ciborgue', 
        custo: 2, 
        poderes: ['Construto Vivo: Pode recuperar PV normalmente e ser consertado.', 'Imune (Abiótico, Doenças, Resiliente).', 'Diretriz: Sua mente tem travas de programação.'],
        escolhas: [{
            id: 'ciborgue_diretriz', tipo: 'desvantagem', listaFiltro: ['Código', 'Transtorno'], mensagem: "Como um Ciborgue, você deve escolher uma Diretriz (Código ou Transtorno)."
        }]
    },
    { nome: 'Construto', custo: 1, poderes: ['Imune (Abiótico, Doenças, Resiliente, Sem Mente).', 'Bateria (desvantagem).', 'Sem Vida (desvantagem).'] },
    { nome: 'Dahllan', custo: 1, poderes: ['Benção da Natureza: Gaste 2PM e um movimento para Ganho em Defesa por um turno.', 'Empatia Selvagem: +1 em Animais.', 'Código Dahllan (desvantagem).'] },
    { 
        nome: 'Elfo', 
        custo: 1, 
        poderes: ['Impecável: Elfos são elegantes.', 'Natureza Mística: +1 em Mística.', 'Frágil (desvantagem).'],
        escolhas: [{
            id: 'elfo_impecavel', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Gênio'], mensagem: 'Como Elfo, escolha sua característica Impecável.'
        }]
    },
    { 
        nome: 'Fada', 
        custo: 1, 
        poderes: ['Magia das Fadas: Você pode usar Magia ou Ilusão com -1PM de custo.', 'Infame (desvantagem).', 'Delicada: Escolha entre Diferente ou Frágil (desvantagem).'],
        escolhas: [
            { id: 'fada_magia', tipo: 'vantagem', listaFiltro: ['Magia', 'Ilusão'], mensagem: 'Como Fada, escolha seu dom mágico principal.' },
            { id: 'fada_delicada', tipo: 'desvantagem', listaFiltro: ['Diferente', 'Frágil'], mensagem: 'Como Fada, escolha sua delicadeza.' },
        ]
    },
    { nome: 'Fantasma', custo: 2, poderes: ['Espírito: Sempre incorpóreo, gasta PM para se tornar sólido. Imune e Sem Vida.', 'Paralisia (vantagem).', 'Devoto (desvantagem).'], vantagensGratuitas: ['Paralisia'] },
    { nome: 'Goblin', custo: 1, poderes: ['Espertalhão: +1 em Manha.', 'Subterrâneo: Sentido (Infravisão) e Ganho em testes de R contra doenças e venenos.', 'Diferente (desvantagem).'] },
    { nome: 'Hynne', custo: 1, poderes: ['Atirador: Gaste 2PM para Ganho em ataques à distância.', 'Encantador: +1 em Influência.', 'Diferente (desvantagem).'] },
    { 
        nome: 'Kallyanach', 
        custo: 2, 
        poderes: ['Baforada: Recebe um Ataque Especial (Área, Distante ou Potente) que custa -1PM.', 'Poder Dracônico: Dragões são poderosos.', 'Código dos Dragões (desvantagem).'],
        escolhas: [{
            id: 'kally_poder', tipo: 'vantagem', listaFiltro: ['Forte', 'Carismático'], mensagem: 'Como Kallyanach, escolha seu Poder Dracônico.'
        }]
    },
    { 
        nome: 'Kemono', 
        custo: 1, 
        poderes: ['Percepção Apurada: +1 em Percepção.', 'Talento: Escolha uma vantagem de aptidão física ou mental.', 'Cacoete: Você deve escolher uma desvantagem ligada ao seu lado animal.'],
        escolhas: [
            { id: 'kemono_talento', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Forte', 'Gênio', 'Resoluto', 'Vigoroso'], mensagem: "Escolha o Talento do seu Kemono." },
            { id: 'kemono_cacoete', tipo: 'desvantagem', listaFiltro: ['Antipático', 'Atrapalhado', 'Fracote', 'Frágil', 'Indeciso', 'Tapado'], mensagem: "Escolha o Cacoete do seu Kemono (não conta para o limite de pontos)." }
        ]
    },
    { nome: 'Medusa', custo: 1, poderes: ['Carismático (vantagem).', 'Olhar Atordoante: Gaste 3PM para forçar um teste de R. Se falhar, alvo não faz ações e tem Perda na defesa por um turno.', 'Fracote (desvantagem).'], vantagensGratuitas: ['Carismático'] },
    { nome: 'Minotauro', custo: 1, poderes: ['Atlético: +1 em Esporte.', 'Sentido Labiríntico: Nunca se perde e Ganho em testes de Percepção para farejar.', 'Transtorno (Fobia de altura) (desvantagem).'] },
    { nome: 'Ogro', custo: 1, poderes: ['Destruidor: Gaste 2PM em um crítico para somar Poder mais uma vez.', 'Intimidador: Ganho em testes de Influência para intimidar.', 'Diferente (desvantagem).'] },
    { nome: 'Osteon', custo: 2, poderes: ['Imune (Abiótico, Doenças, Resiliente).', 'Memória Póstuma: +1 em uma perícia à sua escolha.', 'Sem Vida (desvantagem).'] },
    { nome: 'Qareen', custo: 2, poderes: ['Desejos: Tem a vantagem Magia. Quando lança uma magia que outra pessoa pediu, o custo diminui em -2PM.', 'Carismático (vantagem).', 'Código da Gratidão (desvantagem).'], vantagensGratuitas: ['Magia', 'Carismático'] },
    { nome: 'Sauroide', custo: 2, poderes: ['Cascudo: Recebe Resoluto e Vigoroso.', 'Camuflagem: Ganho em testes para se esconder.', 'Fraqueza (Frio) (desvantagem).'], vantagensGratuitas: ['Resoluto', 'Vigoroso'] },
    { 
        nome: 'Vampiro', 
        custo: 1, 
        poderes: ['Talento: Vampiros têm aptidões superiores.', 'Imortal (vantagem).', 'Fraqueza (Luz do dia) (desvantagem).'],
        vantagensGratuitas: ['Imortal'],
        escolhas: [{
            id: 'vampiro_talento', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Forte', 'Gênio', 'Resoluto', 'Vigoroso'], mensagem: "Como Vampiro, escolha seu Talento profano."
        }]
    },
];

export const classes = [
  {
    "nome": "Abastado",
    "custo": 1,
    "poderes": [
      "Meritocracia: 1 vez/cena, faça um teste de compra para usar uma vantagem que não possua uma única vez.",
      "Poder aquisitivo: seus testes de compra ganham +3 no resultado final.",
      "Tempo é dinheiro!: seu primeiro teste de compra na sessão recebe Ganho, e o segundo não sofre Perda."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Influência" },
          { "tipo": "pericia", "nome": "Manha" }
      ]},
      { "tipo": "vantagem", "nome": "Riqueza" }
    ]
  },
  {
    "nome": "Agente Secreto",
    "custo": 1,
    "poderes": [
      "Identidade secreta: receba Ganho em testes para ocultar suas atividades. Testes de outros para descobrir sobre você têm Perda.",
      "Olho clínico: gaste 1 ação e 1 PM para fazer um teste de Percepção (H, 9) e descobrir uma característica de um alvo.",
      "Plano de ação: gaste um movimento e 2 PM para receber H+2 até o fim da cena."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "pericia", "nome": "Manha" },
        { "tipo": "pericia", "nome": "Percepção" }
      ]},
      { "tipo": "vantagem", "nome": "Patrono" }
    ]
  },
  {
    "nome": "Alquimista",
    "custo": 1,
    "poderes": [
      "Diagrama: gaste um movimento para reduzir o custo em PM da sua próxima vantagem ou técnica em -1 (mínimo 1).",
      "Diagrama pessoal: escolha uma de suas vantagens ou técnicas. Você a utiliza com o poder Diagrama sem precisar gastar um movimento.",
      "Troca equivalente: 1 vez/cena, no início da primeira rodada, mude seus atributos e vantagens livremente. Dura até o fim da cena."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Mística" },
      { "tipo": "pericia", "nome": "Saber" }
    ]
  },
  {
    "nome": "Artista Marcial",
    "custo": 1,
    "poderes": [
      "Kata: ao vencer a defesa do alvo, use um movimento para aumentar o dano em +2. Cada movimento adicional no turno adiciona +2.",
      "Montagem de treino: 1 vez/sessão, faça um teste de Luta (9) antes de um combate. Se passar, recebe Maestria (Luta) durante a luta.",
      "Lutarei para conseguir!: 1 vez/cena, use Luta para substituir qualquer outra perícia. Custa 3 PM para usos adicionais."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" }
    ]
  },
  {
    "nome": "Ás Advogado",
    "custo": 1,
    "poderes": [
      "Coleta de provas: em um crítico de Influência ou Saber, pode obter uma 'Prova'. Gaste Provas para conseguir críticos automáticos nesses testes.",
      "Embargo: pague 2 PM para anular todo o dano de um ataque ou um efeito negativo de falha em teste (usos limitados).",
      "Objeção!: sua Defesa Especial (Reflexão) causa +2 de dano ao adversário."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Influência" },
      { "tipo": "vantagem", "nome": "Defesa Especial (Reflexão)" }
    ]
  },
  {
    "nome": "Atirador de Elite",
    "custo": 1,
    "poderes": [
      "Mira perfeita: 1 vez/cena, seu primeiro ataque contra cada alvo Longe ou mais distante impõe Perda na defesa dele.",
      "Posição vantajosa: gaste uma ação completa para receber Ganho em defesas contra ataques de Longe ou mais distantes.",
      "Um tiro, duas mortes: ao derrotar um inimigo com um ataque à distância, o mesmo ataque atinge outro alvo sem custo."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Manha" },
      { "tipo": "vantagem", "nome": "Alcance 2" }
    ]
  },
  {
    "nome": "Bárbaro",
    "custo": 1,
    "poderes": [
      "Espírito livre: se estiver consciente, você nunca é considerado indefeso.",
      "Frenesi de combate: gaste 3 PM para receber P+3 até o fim da cena. Depois, você fica esgotado na cena seguinte.",
      "Resistência superior: a vantagem Vigoroso concede R+3 em vez de +2."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Sobrevivência" },
      { "tipo": "vantagem", "nome": "Vigoroso" }
    ]
  },
  {
    "nome": "Caça-Prêmios",
    "custo": 1,
    "poderes": [
      "Ataque subjugante: gaste 2 PM antes de um ataque. Se causar dano, o alvo tem Perda em ataque e defesa até o próximo turno dele.",
      "Contrato: ao aceitar caçar um alvo, recebe a vantagem Inimigo contra ele temporariamente.",
      "Mural de recompensas: recebe Ganho em testes para obter informações sobre procurados e para rastrear seu alvo."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Percepção" },
      { "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Manha" },
          { "tipo": "pericia", "nome": "Sobrevivência" }
      ]}
    ]
  },
  {
    "nome": "CARD Gamer",
    "custo": 1,
    "poderes": [
      "Caiu na armadilha!: 1 vez/cena, após uma ação do oponente, faça um teste de Mística para usar Magia como uma reação.",
      "Carta na manga: ao usar um poder que gasta PM, pague +2 PM para ter chance de repeti-lo de graça no próximo turno.",
      "Escolha uma carta: gaste 1 PM para invocar um Ajudante até o fim da cena. Um teste de Mística (9) decide se você ou o mestre escolhe o tipo."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Magia" },
      { "tipo": "pericia", "nome": "Mística" },
      { "tipo": "vantagem", "nome": "Utensílio" }
    ]
  },
  {
    "nome": "Cavaleiro",
    "custo": 1,
    "poderes": [
      "Armadura completa: ao sofrer um ataque, pague 2 PM para reduzir o resultado de cada dado do atacante em -1.",
      "Força da honra: 1 vez/cena, receba um Ganho em um teste para cada Código que você possui.",
      "Inspirar aliado: gaste 1 PM e uma ação para dar Ganho em um teste para um aliado no próximo turno dele."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Resoluto" },
        { "tipo": "vantagem", "nome": "Vigoroso" }
      ]},
      { "tipo": "desvantagem", "nome": "Código (qualquer)" }
    ]
  },
  {
    "nome": "Celebridade",
    "custo": 1,
    "poderes": [
      "Grande fama: o custo para usar a vantagem Famoso é reduzido para 2 PM.",
      "Ovação: sob efeito da sua Torcida, gaste um turno para recuperar 1D PM.",
      "Rugido das massas: com Torcida, seu teste também se torna um crítico com 5 ou 6."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Famoso" },
      { "tipo": "vantagem", "nome": "Torcida" }
    ]
  },
  {
    "nome": "Cientista",
    "custo": 1,
    "poderes": [
      "Eureka!: 1 vez/sessão, gaste um movimento e 3 PM para adquirir uma vantagem de 1pt até o fim da cena.",
      "Método científico: 1 vez/cena, use Saber para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Pesquisa: gaste um movimento e 1 PM para fazer um teste de Saber (9) e descobrir informações sobre um alvo."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Saber" }
    ]
  },
  {
    "nome": "Clérigo",
    "custo": 1,
    "poderes": [
      "Devoto fervoroso: pode usar a vantagem Devoto até três vezes por cena.",
      "Dom divino: 1 vez/cena, gaste um movimento e 3 PM para adquirir uma perícia ou vantagem de 1pt até o fim da cena.",
      "Poder concedido: 1 vez/cena, use uma vantagem escolhida de uma lista (Cura, Magia, etc.) sem gastar PM."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Devoto" }
    ]
  },
  {
    "nome": "Cosmonauta da ORDEM",
    "custo": 1,
    "poderes": [
      "Primeiro contato: gaste 2 PM para receber +3 em um teste de Saber ou Sobrevivência.",
      "Inimigo meu: use a vantagem Inimigo para seres extraterrestres que nunca viu antes.",
      "Sensores avançados: pague 2 PM para adquirir um Sentido à sua escolha para um único teste."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Patrono" },
      { "tipo": "vantagem", "nome": "Inimigo (aliens)" }
    ]
  },
  {
    "nome": "Curandeiro",
    "custo": 1,
    "poderes": [
      "Paramédico: com uma ação e um teste de Medicina (9), você pode curar 1D Pontos de Vida.",
      "Cura crítica: ao rolar 6 num dado de Cura, role um dado extra.",
      "Explosão de cura: 1 vez/cena, use sua Cura na capacidade máxima sem gastar PM."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Medicina" },
      { "tipo": "vantagem", "nome": "Cura" }
    ]
  },
  {
    "nome": "Detetive",
    "custo": 1,
    "poderes": [
      "Elementar!: 1 vez/cena, use Percepção para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Obter informação: em um crítico de Manha ou Percepção, pode obter uma 'Pista'. Gaste Pistas para conseguir críticos automáticos nesses testes.",
      "Caso encerrado: inimigos derrotados em sua presença permanecem assim até o fim da cena, mesmo se curados."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Manha" },
      { "tipo": "pericia", "nome": "Percepção" }
    ]
  },
  {
    "nome": "DPS",
    "custo": 1,
    "poderes": [
      "Estilo de combate: escolha melee ou ranged para ganhar Especialização (Luta), mas se torna Inapto para defender e atacar no estilo oposto.",
      "Ataque gratuito: 1 vez/cena, use um Ataque Especial sem pagar PM.",
      "Último recurso: quando está perto da derrota, seus ataques no estilo escolhido recebem Ganho."
    ],
    "exigencias": [
      { "tipo": "atributo", "nome": "Poder", "valor": 3 },
      { "tipo": "vantagem", "nome": "Ataque Especial (qualquer)" }
    ]
  },
  {
    "nome": "Druida",
    "custo": 1,
    "poderes": [
      "Forma selvagem: sua Transformação permite escolher duas vantagens extras de uma lista (Ágil, Voo, etc.) a cada mudança.",
      "Irmãos selvagens: você pode mudar o tipo do seu Ajudante no início de cada cena.",
      "Dádiva da natureza: 1 vez/cena, use Animais para substituir qualquer outra perícia. Custa 3 PM para usos adicionais."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Animais" },
      { "tipo": "vantagem", "nome": "Ajudante" },
      { "tipo": "vantagem", "nome": "Transformação" },
      { "tipo": "desvantagem", "nome": "Código Dahllan" }
    ]
  },
  {
    "nome": "Elementalista",
    "custo": 1,
    "poderes": [
      "Ambiente elemental: ao rolar 6 no dado de Ambiente, use Magia uma vez sem custo de PM.",
      "Elemento primordial: 1 vez/sessão, gaste um movimento e 3 PM para adquirir uma perícia ou vantagem de 1pt até o fim da cena.",
      "Moldar essência: na primeira rodada de cada cena, mude seus atributos e perícias livremente."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Magia" },
      { "tipo": "desvantagem", "nome": "Ambiente" },
      { "tipo": "desvantagem", "nome": "Fraqueza" }
    ]
  },
  {
    "nome": "Engenheiro Mecha",
    "custo": 1,
    "poderes": [
      "A ferramenta certa: 1 vez/cena, use Máquinas para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Engenheiro de campo: com um teste de Máquinas (9), gaste 1 PM para criar um Ajudante de sua escolha até o fim da cena.",
      "Martelinho de ouro: com uma ação e um teste de Máquinas (9), cure 2D PV em um construto ou some 1D ao seu próximo teste."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Máquinas" },
      { "tipo": "vantagem", "nome": "Utensílio (ferramentas)" }
    ]
  },
  {
    "nome": "Entidade Exilada",
    "custo": 1,
    "poderes": [
      "Não conheci o outro mundo por querer!: em testes de morte, role 1D extra e descarte o menor resultado.",
      "Sorte extraplanar: 1 vez/sessão, use uma vantagem, técnica ou Energia youkai sem gastar PM.",
      "Energia youkai: gaste PM para curar PV (2 PM para 1 PV) em si mesmo ou em alguém com Elo Mental."
    ],
    "exigencias": []
  },
  {
    "nome": "Estudante",
    "custo": 1,
    "poderes": [
      "Hora do intervalo: após um conflito, receba uma refeição básica que concede Ganho em um único teste.",
      "Prova real: pague 2 PM para rolar 1D extra em um teste de perícia e descartar o menor resultado.",
      "Quem não cola...: use a vantagem Mentor uma segunda vez por cena."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Qualquer" },
      { "tipo": "vantagem", "nome": "Mentor" }
    ]
  },
  {
    "nome": "Exército da Luz",
    "custo": 1,
    "poderes": [
      "Artilharia total: 1 vez/cena, faça um Ataque Especial de até 3pts (você ainda paga o custo em PM).",
      "Armadura radiante: adicione 1D em testes de resistência a efeitos nocivos e descarte o menor dado.",
      "Ombro a ombro: gaste 2 PM para conceder Ganho a um teste de um aliado Perto."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Patrono" }
    ]
  },
  {
    "nome": "Experimento",
    "custo": 1,
    "poderes": [
      "Adaptação: receba duas imunidades com a vantagem Imune em vez de uma.",
      "Bioenergia: as vantagens +Mana ou +Vida concedem +15 em vez de +10.",
      "Mutação: ao fazer um teste de um atributo escolhido, pague 2 PM para rolar 1D extra e descartar o menor."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Imune" },
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "+Mana" },
        { "tipo": "vantagem", "nome": "+Vida" }
      ]}
    ]
  },
  {
    "nome": "Gatuno Galante",
    "custo": 1,
    "poderes": [
      "Ardiloso: pague 3 PM para usar os efeitos de Confusão, Invisível, Inofensivo ou Telepata por um turno.",
      "Reconhecimento de terreno: 1 vez/sessão, declare o local de uma cena como sua Arena.",
      "Um passo à frente: gaste 2 PM para receber Ganho em um teste para evitar um efeito negativo (exceto dano)."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Manha" },
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Ágil" },
        { "tipo": "vantagem", "nome": "Carismático" },
        { "tipo": "vantagem", "nome": "Gênio" }
      ]}
    ]
  },
  {
    "nome": "Gigante da Luz",
    "custo": 1,
    "poderes": [
      "Poder interior: escolha entre Forte, Ágil ou Vigoroso. A vantagem se aplica a ambas as suas formas.",
      "Transformação gigante: sua segunda forma aumenta sua escala para Kiodai e concede Alcance, Golpe Final e Voo.",
      "Transformação menor: pode se transformar em sua segunda forma em tamanho normal, sem mudar a escala."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Transformação" },
      { "tipo": "desvantagem", "nome": "Código do Combate" },
      { "tipo": "desvantagem", "nome": "Código dos Heróis" }
    ]
  },
  {
    "nome": "Guerreira Mágica",
    "custo": 1,
    "poderes": [
      "Auxílio mágico: ao usar Magia para emular Ataque Especial, Ajudante, Alcance ou Mentor, o custo em PM é normal (x1) em vez de triplicado.",
      "Punirei você!: contra um alvo perto da derrota, seu custo em PM para usar Magia é reduzido pela metade.",
      "Transformação radiante: gaste um movimento para se transformar. Receba Ganho em testes de Mística por 2 PM e Perda em testes para descobrir sua identidade."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Mística" },
      { "tipo": "vantagem", "nome": "Magia" }
    ]
  },
  {
    "nome": "Guerreiro",
    "custo": 1,
    "poderes": [
      "Lutar é tudo!: ao fazer um teste de Luta, pague 2 PM para somar +3 ao resultado após a rolagem.",
      "Manobra especial: 1 vez/cena, use um Ataque ou Defesa Especial sem gastar PM.",
      "Sem parar: ao derrotar um inimigo, pode fazer um ataque imediato contra outro oponente."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" },
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Ataque Especial" },
        { "tipo": "vantagem", "nome": "Defesa Especial" }
      ]}
    ]
  },
  {
    "nome": "Herói Sentai",
    "custo": 1,
    "poderes": [
      "Hora de sincronizar: seu Elo Mental funciona com até 5 aliados, mesmo que eles não tenham a vantagem.",
      "Soltar faísca: quando sofre dano, pague 1 PM para anular 3 pontos de dano.",
      "Finalização: ao usar um Golpe Final, cada aliado pode pagar 3 PM para somar o Poder dele ao seu ataque."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Elo Mental" },
      { "tipo": "vantagem", "nome": "Golpe Final" },
      { "tipo": "vantagem", "nome": "Patrono" }
    ]
  },
  {
    "nome": "Idol",
    "custo": 1,
    "poderes": [
      "Seu sorriso...: a vantagem Carismática concede P+3 em vez de +2.",
      "...É tão resplandecente!: 1 vez/cena, use Arte para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Me dê a mão!: com um teste de Arte (9), gaste um movimento e 1 PM para conceder Ganho a um aliado."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Arte" },
      { "tipo": "vantagem", "nome": "Carismática" },
      { "tipo": "vantagem", "nome": "Famosa" }
    ]
  },
  {
    "nome": "Ilusionista",
    "custo": 1,
    "poderes": [
      "Gambito ilusório: 1 vez/rodada, gaste 1 PM para receber Ganho em um teste de defesa.",
      "Glamour: mude a sua aparência ou a de aliados e objetos. As ilusões se movem com os alvos sem gastar seus movimentos.",
      "Ilusão autônoma: crie uma ilusão que age sozinha pelo custo normal, sem gastar seus movimentos."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "pericia", "nome": "Arte" },
        { "tipo": "pericia", "nome": "Mística" },
        { "tipo": "vantagem", "nome": "Telepata" }
      ]},
      { "tipo": "vantagem", "nome": "Ilusão" }
    ]
  },
  {
    "nome": "Impostor",
    "custo": 1,
    "poderes": [
      "Disfarce perfeito: com 1 movimento e 3 PM, assuma a aparência de alguém. Testes para descobrir o disfarce sofrem Perda.",
      "Engenheiro social: 1 vez/cena, use Influência para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Jogo da imitação: copie e mantenha duas vantagens simultaneamente com a vantagem Imitar."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Influência" },
      { "tipo": "vantagem", "nome": "Imitar" }
    ]
  },
  {
    "nome": "Intendente",
    "custo": 1,
    "poderes": [
      "Excelência: em um crítico com uma perícia, gaste 3 PM para somar o atributo correspondente mais uma vez.",
      "Housekeeping: por 3 PM, você e até H aliados compartilham seus PMs somados até o fim da cena.",
      "Sempre a postos: aprenda perícias com Improviso por 2 PM em vez de 3, e mantenha até duas perícias ao mesmo tempo."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "pericia", "nome": "Arte" },
        { "tipo": "pericia", "nome": "Sobrevivência" }
      ]},
      { "tipo": "vantagem", "nome": "Improviso" }
    ]
  },
  {
    "nome": "Ladino",
    "custo": 1,
    "poderes": [
      "Ataque furtivo: gaste 2 PM ao atacar um alvo desprevenido para impor R-1 na defesa dele.",
      "Malandragem: 1 vez/cena, use Manha para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Trapaça: ao usar 1 Ponto de Ação para um poder surpreendente, pode adquirir qualquer vantagem, mesmo de custo maior que 1pt."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Manha" },
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Ágil" },
        { "tipo": "vantagem", "nome": "Gênio" }
      ]}
    ]
  },
  {
    "nome": "Maginauta",
    "custo": 1,
    "poderes": [
      "Imersão: com uma ação completa e 2 PM, entre no magiespaço. Seu corpo fica indefeso, mas seus poderes mágicos são aprimorados.",
      "Interferência: gaste uma ação e 2 PM para dar Ganho ou Perda a um teste de Mística de outro personagem.",
      "Sobrecarga: ao usar Magia, teste Mística (9). Sucesso dá +2 ao teste mágico; falha anula a magia."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Magia" },
      { "tipo": "pericia", "nome": "Mística" }
    ]
  },
  {
    "nome": "Mago",
    "custo": 1,
    "poderes": [
      "Aptidão mágica: seu bônus máximo da vantagem Magia é H+2.",
      "Bateria de mana: 1 vez/cena, use uma ação completa para recuperar 1D+H PM.",
      "Preparar magias: com PMs cheios, pague metade do custo para deixar magias 'preparadas' e usá-las depois."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Mística" },
      { "tipo": "vantagem", "nome": "Magia" }
    ]
  },
  {
    "nome": "Menestreamer",
    "custo": 1,
    "poderes": [
      "Inspirar: gaste 1 movimento e 3 PM para conceder Ganho ao teste de perícia de um aliado (custa 1 PM se já tiver o poder).",
      "É meu amigo!: pague 1 PM para conceder a vantagem Famoso a um aliado por uma cena.",
      "Audiência generosa: com um teste de Arte ou Influência (9), receba Ganho em um teste de compra."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "pericia", "nome": "Arte" },
        { "tipo": "pericia", "nome": "Influência" },
        { "tipo": "vantagem", "nome": "Carismático" }
      ]},
      { "tipo": "vantagem", "nome": "Famoso" }
    ]
  },
  {
    "nome": "Mercenário",
    "custo": 1,
    "poderes": [
      "Nem morto: em testes de morte, role 1D extra e descarte o menor resultado enquanto tiver um contrato.",
      "Melhor no que faz: pode usar a vantagem Devoto até três vezes por cena.",
      "Trato feito: no início de cada sessão, pode trocar de Patrono. Recebe +3 em testes de compra para o Patrono."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Devoto" },
      { "tipo": "vantagem", "nome": "Patrono" },
      { "tipo": "desvantagem", "nome": "Código do Mercenário" }
    ]
  },
  {
    "nome": "Mestre-Cuca",
    "custo": 1,
    "poderes": [
      "Talento culinário: receba +3 em testes de Arte e Sobrevivência para cozinhar.",
      "Prato milagroso: 1 vez/sessão, ao cozinhar, gaste Pontos de Ação para conceder uma vantagem temporária a alguém.",
      "Despensa cheia: comece cada sessão com um número de refeições básicas igual à sua Habilidade."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "pericia", "nome": "Arte" },
        { "tipo": "pericia", "nome": "Sobrevivência" }
      ]}
    ]
  },
  {
    "nome": "Monge",
    "custo": 1,
    "poderes": [
      "Agilidade superior: a vantagem Ágil concede H+3 em vez de +2.",
      "Alma de aço: em um teste de Resistência, pague 1 PM para somar +1 a um dado.",
      "Controle dos chakras: em combate, gaste um turno completo para recuperar 1D+H PV ou 1D+H PM."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Ágil" },
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Resoluto" },
        { "tipo": "vantagem", "nome": "Vigoroso" }
      ]},
      { "tipo": "desvantagem", "nome": "1ª Lei de Asimov" }
    ]
  },
  {
    "nome": "Motoqueiro Mascarado",
    "custo": 1,
    "poderes": [
      "Henshin: gaste um movimento para vestir seu traje. Pode pagar 2 PM para receber Ganho em um teste de Luta.",
      "Moto de batalha: por 2 PM, seu Ajudante Montaria pode agir como um Lutador.",
      "Até o fim: você não sofre Perda e pode continuar lutando normalmente quando está Derrotado."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" },
      { "tipo": "vantagem", "nome": "Ajudante (Montaria)" }
    ]
  },
  {
    "nome": "Necromante",
    "custo": 1,
    "poderes": [
      "Criar morto-vivo: com um teste de Mística (9), gaste 1 PM para invocar um Ajudante de sua escolha até o fim da cena.",
      "Energia negativa: suas vantagens de cura funcionam em criaturas com a desvantagem Sem Vida.",
      "Fortificar morto-vivo: o custo para usar Magia em criaturas Sem Vida é reduzido em 1 PM (mínimo 1)."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Mística" },
      { "tipo": "vantagem", "nome": "Magia" }
    ]
  },
  {
    "nome": "Negociador",
    "custo": 1,
    "poderes": [
      "Argumentação: 1 vez/cena, use Influência para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "Empatia: pague 2 PM para anular um Ganho em um teste de Poder (incluindo combate) contra você.",
      "Palavras de conforto: qualquer poder de cura usado em sua presença tem Ganho ou recupera +2 PV."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Influência" },
      { "tipo": "vantagem", "nome": "Carismático" }
    ]
  },
  {
    "nome": "Ninja",
    "custo": 1,
    "poderes": [
      "Mestre ninja: use o Ganho da vantagem Mentor duas vezes por cena em vez de uma.",
      "Ninpo de combate: 1 vez/rodada, gaste 1 PM para substituir um teste de ataque ou defesa por um teste de Manha.",
      "Ougi: escolha uma vantagem ou técnica. Ela custará -1 PM (mínimo 1) e, no primeiro uso da sessão, o alvo tem Perda para resistir."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Manha" },
      { "tipo": "vantagem", "nome": "Mentor" }
    ]
  },
  {
    "nome": "Operativo",
    "custo": 1,
    "poderes": [
      "Combate tático: ao executar uma manobra de combate, pague 1 PM para receber +3 no teste.",
      "Armas secretas: tentativas de anular ou revelar suas vantagens e técnicas sofrem Perda.",
      "Equipamento de espião: 1 vez/sessão, seu Patrono fornece um item que simula uma vantagem de 1pt para um único uso."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" },
      { "tipo": "pericia", "nome": "Sobrevivência" },
      { "tipo": "vantagem", "nome": "Patrono" }
    ]
  },
  {
    "nome": "Paladino",
    "custo": 1,
    "poderes": [
      "Bravura final: em vez de testes de morte, o dano recebido é descontado dos seus PMs. Se os PMs acabarem, você cai Quase Morto.",
      "Me dê sua força!: ao usar Devoto para ter Ganho, some +1 ao resultado de cada dado.",
      "Sétimo sentido: quando estiver perto da derrota, gaste 2 PM para fazer um ataque ou defesa uma escala acima."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Devoto" },
      { "tipo": "desvantagem", "nome": "Código dos Heróis" },
      { "tipo": "desvantagem", "nome": "Código da Honestidade" }
    ]
  },
  {
    "nome": "Patrulheiro",
    "custo": 1,
    "poderes": [
      "Natureza provedora: 1 vez/cena, use Sobrevivência para substituir qualquer outra perícia. Custa 3 PM para usos adicionais.",
      "À prova de tudo: passe automaticamente em testes para achar descanso. Pague 1 PM para dar +3 a um teste contra privações.",
      "Rastreador perfeito: pague 2 PM para adquirir um Sentido de sua escolha para um único teste."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Sobrevivência" }
    ]
  },
  {
    "nome": "Pescador Parrudo",
    "custo": 1,
    "poderes": [
      "Quem sou? Onde estou?: 1 vez/cena, use os benefícios de Vigoroso em testes de Poder.",
      "Parrudez: gaste 1 PM para defender com Sobrevivência, somando +1 a cada dado. Sucesso é considerado defesa perfeita.",
      "Pescado do dia: no início da cena, teste Sobrevivência para dar +1 em testes de Resistência a todos os aliados."
    ],
    "exigencias": [
      { "tipo": "atributo", "nome": "Poder", "valor": 3 },
      { "tipo": "pericia", "nome": "Sobrevivência" },
      { "tipo": "vantagem", "nome": "Vigoroso" }
    ]
  },
  {
    "nome": "Piloto Mecha",
    "custo": 1,
    "poderes": [
      "Ajudante robô: seu Ajudante é considerado Lutador e Montaria.",
      "Ás indomável: 1 vez/sessão, ao usar 1 Ponto de Ação, pode também aumentar o teste em uma escala.",
      "Kiodai mecha: 1 vez/sessão, se houver um inimigo Kiodai, invoque um veículo de 10 pontos em escala Kiodai."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Máquinas" },
      { "tipo": "vantagem", "nome": "Ajudante" }
    ]
  },
  {
    "nome": "Policial do Espaço",
    "custo": 1,
    "poderes": [
      "Jouchaku!: gaste um movimento para invocar seu traje. Nele, por 2 PM, pode usar Alcance 1 ou Golpe Final.",
      "Assistente: o custo para usar seu Ajudante é reduzido em 1 PM (mínimo 1).",
      "Kiodai mecha: 1 vez/sessão, se houver um inimigo Kiodai, seu Patrono fornece um veículo de 10 pontos em escala Kiodai."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" },
      { "tipo": "vantagem", "nome": "Ajudante" },
      { "tipo": "vantagem", "nome": "Patrono" },
      { "tipo": "desvantagem", "nome": "Código dos Heróis" }
    ]
  },
  {
    "nome": "Psiônico",
    "custo": 1,
    "poderes": [
      "Dom telepático: use a vantagem Telepata sem precisar gastar um movimento.",
      "Intuição psíquica: pague 1 PM para receber Ganho em um teste de Percepção usando sua Intuição.",
      "Sobrecarga psíquica: ao usar Obstinado, trate 1 ponto de atributo como 2 Pontos de Ação, mas com risco de cair a 0 PV."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Obstinado" },
      { "tipo": "vantagem", "nome": "Sentido (Intuição)" },
      { "tipo": "vantagem", "nome": "Telepata" }
    ]
  },
  {
    "nome": "Repórter Extremo",
    "custo": 1,
    "poderes": [
      "Faro para notícia: pague 1 PM para trocar sua Intuição por outro Sentido para um único teste.",
      "Fontes confiáveis: 1 vez/sessão, escolha uma vantagem de uma lista (Arena, Inimigo, etc.) para usar durante uma cena.",
      "Furo de reportagem: 1 vez/cena, use Percepção para substituir qualquer outra perícia. Custa 3 PM para usos adicionais."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Percepção" },
      { "tipo": "vantagem", "nome": "Sentido (Intuição)" }
    ]
  },
  {
    "nome": "Samurai",
    "custo": 1,
    "poderes": [
      "Guerreiro poeta: gaste 2 PM para receber +3 em um teste de Arte ou Influência.",
      "Artefato ancestral: no início do seu turno, gaste PM para imbuir sua arma ou armadura com uma qualidade de artefato por um turno.",
      "Guerreiro honrado: receba 1 Ponto de Ação extra para cada Patrono e Código que possuir."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Patrono" },
        { "tipo": "desvantagem", "nome": "Código" }
      ]}
    ]
  },
  {
    "nome": "Servo da Centelha",
    "custo": 1,
    "poderes": [
      "Bater onde dói: ao atacar, pague 2 PM para impor R-1 na defesa do alvo.",
      "Combate violento: em um acerto crítico de ataque, some +2 ao resultado final.",
      "Faísca da Centelha: ao usar Devoto, em vez do normal, receba P+2 e R+1 por um número de rodadas igual ao seu Poder."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Luta" },
      { "tipo": "vantagem", "nome": "Devoto" }
    ]
  },
  {
    "nome": "Shinigami",
    "custo": 1,
    "poderes": [
      "Eu voltarei!: quando morre, retorna na cena seguinte com recursos cheios. Só pode ser morto permanentemente por outro shinigami.",
      "Guia dos mortos: conceda Ganho a qualquer teste de morte realizado em sua presença.",
      "Inimigo espiritual: um espírito derrotado por você permanece assim até o fim da cena."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Imortal" },
      { "tipo": "vantagem", "nome": "Inimigo (espíritos)" }
    ]
  },
  {
    "nome": "Superatleta",
    "custo": 1,
    "poderes": [
      "Aquecimento: no início de cada cena, recupere PM igual ao seu maior atributo.",
      "Espírito olímpico: sempre que você passar num teste, todos os seus aliados recebem +1 no teste seguinte deles.",
      "Medalha de ouro: 1 vez/cena, use Esportes para substituir qualquer outra perícia. Custa 3 PM para usos adicionais."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Esportes" }
    ]
  },
  {
    "nome": "Super-Herói",
    "custo": 1,
    "poderes": [
      "Sobrehumano: escolha uma de suas vantagens de exigência. Pague 1 PM para aumentar o bônus de atributo dela para +4.",
      "Façanha épica: 1 vez/sessão, em um teste com um atributo sobre-humano, aumente o teste em uma escala.",
      "Herói de ação: você tem 2 Pontos de Ação extras."
    ],
    "exigencias": [
      { "tipo": "ou", "opcoes": [
        { "tipo": "vantagem", "nome": "Ágil" },
        { "tipo": "vantagem", "nome": "Carismático" },
        { "tipo": "vantagem", "nome": "Forte" },
        { "tipo": "vantagem", "nome": "Gênio" },
        { "tipo": "vantagem", "nome": "Resoluto" },
        { "tipo": "vantagem", "nome": "Vigoroso" }
      ]},
      { "tipo": "desvantagem", "nome": "Código dos Heróis" }
    ]
  },
  {
    "nome": "Tanque",
    "custo": 1,
    "poderes": [
      "Hoje não!: 1 vez/cena, ignore completamente um dano que o levaria a 0 PV.",
      "Defesa gratuita: 1 vez/cena, use uma Defesa Especial sem gastar PM.",
      "Último bastião: quando está perto da derrota, todos os seus testes de defesa recebem Ganho."
    ],
    "exigencias": [
      { "tipo": "atributo", "nome": "Resistência", "valor": 3 },
      { "tipo": "vantagem", "nome": "Defesa Especial (Provocação)" }
    ]
  },
  {
    "nome": "Treinador de Monstros",
    "custo": 1,
    "poderes": [
      "Amigo dos monstros: cada uso de seu Ajudante custa -1 PM (mínimo 1).",
      "Eu escolho você!: se tiver mais de um Ajudante, pode usar a vantagem duas vezes por rodada.",
      "Temos que pegar!: 1 vez/sessão, faça um teste de Animais (9) para conseguir um novo Ajudante temporário."
    ],
    "exigencias": [
      { "tipo": "pericia", "nome": "Animais" },
      { "tipo": "vantagem", "nome": "Ajudante (qualquer)" }
    ]
  },
  {
    "nome": "Vigilante Sombrio",
    "custo": 1,
    "poderes": [
      "Forma sombria: gaste um movimento para ganhar Incorpóreo por 1 PM/turno. Se já o tiver, interaja com o mundo físico por 1 PM.",
      "Terror da noite: ao causar dano, gaste 2 PM para forçar o alvo a um teste de R. Se ele falhar, sofre Perda na próxima defesa.",
      "Sumir nas sombras: gaste 1 PM em vez de 3 para ficar Invisível."
    ],
    "exigencias": [
      { "tipo": "vantagem", "nome": "Invisível" },
      { "tipo": "vantagem", "nome": "Sentido (infravisão)" }
    ]
  }
]


export const moedas = [
    // Fantasia
    { nome: 'Moedas de Ouro', sigla: 'MO' },
    { nome: 'Peças de Prata', sigla: 'PP' },
    { nome: 'Gemas Preciosas', sigla: 'Gemas' },
    { nome: 'Dracmas', sigla: 'Ð' },
    // Sci-Fi
    { nome: 'Créditos Galácticos', sigla: 'CR' },
    { nome: 'Uni-Chips', sigla: 'UC' },
    { nome: 'Fragmentos de Dados', sigla: 'Data' },
    // Moderno
    { nome: 'Dólares', sigla: '$' },
    { nome: 'Reais', sigla: 'R$' },
    { nome: 'Euros', sigla: '€' },
    // Pós-Apocalíptico
    { nome: 'Tampinhas de Garrafa', sigla: 'Tampas' },
    { nome: 'Cápsulas', sigla: 'Caps' },
    { nome: 'Rações', sigla: 'Rações' },
    // Genérico / Gamer
    { nome: 'Zenny', sigla: 'Z' },
    { nome: 'Gil', sigla: 'G' },
    { nome: 'Pontos de Reputação', sigla: 'Rep' }
];