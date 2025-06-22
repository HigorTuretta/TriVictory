// src/data/gameData.js
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

export const tecnicas = [
  {
    "categoria": "Truques",
    "nome": "Ás Indomável",
    "requisito": "Esporte ou Máquinas",
    "alcance": "Pessoal",
    "custo": "Variável",
    "duracao": "Instantânea",
    "descricao": "Você é um prodígio da pilotagem. Quando comanda um veículo, pode usar as seguintes manobras.",
    "variacoes": [
      {
        "nome": "Até o limite!",
        "custo": "Variável (PV do veículo)",
        "descricao": "Você força o veículo até quase explodir. Pode usar PV do veículo em vez de PM para ativar uma vantagem, com custo máximo igual à sua Habilidade."
      },
      {
        "nome": "Drifting",
        "custo": "2 PM",
        "descricao": "Você usa uma ação e 2 PM para colocar-se em posição de vantagem, tem Ganho em um teste na próxima rodada."
      },
      {
        "nome": "Nunca me diga as chances!",
        "custo": "2 PM",
        "descricao": "Você gasta 2 PM para anular uma Perda em um teste, fazendo algo que parecia impossível. Só pode fazer isso uma vez por teste."
      },
      {
        "nome": "Vai, corredor, vai!",
        "custo": "1 PM",
        "descricao": "Você gasta 1 PM para fazer um movimento extra, como se tivesse Aceleração."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Barreira Mística",
    "requisito": "Magia, Mística",
    "alcance": "Pessoal",
    "custo": "1 a 2 PM por uso",
    "duracao": "Um turno",
    "testes": "Seu teste de defesa é normal, mas você pode escolher usar a perícia Mística em vez de Luta.",
    "descricao": "Você usa seus poderes mágicos para se defender. Com 1 PM, você conjura uma Barreira Mística como reação contra um ataque. Você só precisa conjurar a Barreira Mística uma vez por rodada, no primeiro ataque recebido. Ela permanece ativa até seu próximo turno. Você também pode gastar 1 PM extra para adicionar um destes efeitos:",
    "variacoes": [
      {
        "nome": "Debilitante",
        "descricao": "Se sua defesa superar o ataque, você reduz um atributo do atacante (à sua escolha) em –1, até o fim da cena. Isso não afeta os seus recursos."
      },
      {
        "nome": "Drenante",
        "descricao": "Se sua defesa superar o ataque, você recupera 2 PM. Cada crítico na defesa recupera mais 2 PM."
      },
      {
        "nome": "Elétrica",
        "descricao": "Sua defesa eletrifica e atordoa o alvo; o próximo ataque contra ele tem Ganho."
      },
      {
        "nome": "Espinhosa",
        "descricao": "Se o atacante está Perto, ele sofre 1 ponto de dano. Cada crítico na defesa causa mais 1 ponto de dano."
      },
      {
        "nome": "Luminosa",
        "descricao": "Se sua defesa superar o ataque, a barreira causa um clarão que ofusca o atacante, causando Perda em seu próximo teste."
      },
      {
        "nome": "Maciça",
        "descricao": "Você tem defesa perfeita."
      },
      {
        "nome": "Solidária",
        "descricao": "Você pode conjurar a Barreira Mística para um aliado Perto. Ele tem Ganho na defesa. Você não recebe nenhum benefício nesta rodada."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Cancioneiro Popular",
    "requisito": "Arte",
    "alcance": "Perto",
    "custo": "2 PM",
    "duracao": "Instantânea",
    "descricao": "Suas canções têm efeitos emocionais diversos. Cancioneiro Popular não pode ser usado em combate ou conflitos.",
    "variacoes": [
      {
        "nome": "Canção de amor",
        "testes": "Arte (9)",
        "descricao": "Escolha um alvo e faça um teste de Arte (9). Com sucesso, ele se tornará amigável a você, garantindo Ganho em seu próximo teste social contra ele. Dobrar a meta pode fazer com que ele se apaixone de verdade!"
      },
      {
        "nome": "Canção de ninar",
        "descricao": "Você canta para o grupo antes de dormir, aumentando a recuperação de recursos em terreno ruim em +1D PM e PV."
      },
      {
        "nome": "Canção de protesto",
        "testes": "Arte (9)",
        "descricao": "Escolha um alvo para protestar e faça um teste de Arte (9). Com sucesso, ele terá Perda em seu próximo teste social."
      },
      {
        "nome": "Canção de rua",
        "testes": "Arte (9)",
        "descricao": "Faça um teste de Arte (9) onde houver muitos transeuntes (tipicamente vias urbanas). Se passar, tem Ganho no próximo teste de compra."
      },
      {
        "nome": "Canção relaxante",
        "descricao": "Você canta para o grupo em um momento de descanso, aumentando a recuperação de recursos em um descanso curto em +1 por ponto de atributo."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Dobrar Elemento",
    "requisito": "Nenhum",
    "alcance": "Perto",
    "custo": "1 PM ou mais por uso",
    "duracao": "Instantânea",
    "descricao": "Você pode controlar um único elemento à sua escolha, como fogo, terra, água, ar, luz ou trevas; ou elementos mais exóticos, como vapor, gelo, relâmpago ou outros. Para cada elemento você deve aprender um truque diferente. Na maioria dos casos, o elemento deve estar presente para ser controlado. Dobrar Elemento não serve para atacar ou causar dano direto.",
    "variacoes": [
      {
        "nome": "Manipular",
        "custo": "1 PM ou mais",
        "descricao": "Manipular, levitar ou controlar pequenas quantidades do elemento, até cerca de 1kg (para líquidos e sólidos) ou meio metro cúbico (para gases ou energias). Você pode gastar mais PM para controlar quantidades maiores."
      },
      {
        "nome": "Causar incômodo",
        "custo": "2 PM",
        "descricao": "Causar incômodo a um alvo, impondo Perda em um teste. Por exemplo, usando água para tornar o chão escorregadio, ou uma lufada de ar para desequilibrá-lo."
      },
      {
        "nome": "Reforçar ataque",
        "custo": "Variável",
        "descricao": "Reforçar um ataque com o elemento, adicionando um tipo de dano adequado (como fogo, frio, pancada ou outro) sem causar Perda."
      },
      {
        "nome": "Proteger-se",
        "custo": "Variável",
        "descricao": "Usar o elemento para se proteger, conseguindo defesa perfeita se vencer o teste de defesa."
      },
      {
        "nome": "Outros efeitos",
        "custo": "Variável",
        "descricao": "Outros efeitos menores ligados ao elemento escolhido. Dobrar Vapor para fazer um motor funcionar, enquanto Dobrar Fogo pode aquecer água ou outro item (mas não a ponto de causar dano)."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Golpes",
    "requisito": "Luta",
    "alcance": "Variável",
    "custo": "Variável",
    "duracao": "Instantânea",
    "descricao": "Você domina diversas manobras únicas de artes marciais. Este é um conjunto de truques diferente, pois não contém um grupo completo de habilidades; em vez disso, você escolhe dois golpes da lista. Você pode comprar este truque várias vezes: cada vez, escolhe mais dois golpes. Golpes não podem ser combinados com outras técnicas e vantagens, exceto quando dito o contrário.",
    "variacoes": [
      {
        "nome": "Derrubar",
        "custo": "0 ou 1 PM",
        "descricao": "Quando vence a defesa do adversário, em vez de causar dano, você pode escolher derrubá-lo (ou gastar 1PM para causar dano e também derrubá-lo). Um oponente derrubado tem Perda em todos os testes até usar um movimento para se levantar."
      },
      {
        "nome": "Finta",
        "custo": "1 PM",
        "descricao": "Você pode usar um movimento e 1PM para causar Perda no próximo ataque que receber antes de seu próximo turno. Se a defesa vencer o ataque, você tem defesa perfeita, e pode fazer um ataque com Ganho contra o mesmo adversário no seu próximo turno."
      },
      {
        "nome": "Golpe Arriscado",
        "custo": "1 PM",
        "descricao": "Gaste 1PM ao atacar. Você tem chance de crítico máxima (4, 5 ou 6 em cada dado), mas qualquer outro resultado é considerado 0. Se não rolar pelo menos um crítico, será uma falha crítica."
      },
      {
        "nome": "Golpe Atordoante",
        "custo": "2 PM",
        "descricao": "Gaste 2PM ao atacar. Se causar dano maior que a Resistência do alvo, ele fica atordoado: não pode realizar uma ação no próximo turno, apenas um movimento."
      },
      {
        "nome": "Golpe Debilitante",
        "custo": "2 PM",
        "descricao": "Gaste 2PM ao atacar. Se vencer a defesa, em vez de causar dano, reduz um atributo do oponente (à sua escolha) em –1 até o fim do combate. Se você rolar pelo menos um crítico, reduz em –2. Isso não afeta os recursos do adversário."
      },
      {
        "nome": "Golpe Forte",
        "custo": "1 PM",
        "descricao": "Gaste 1PM ao atacar. Se vencer a defesa do oponente, causa +2 pontos de dano. Cada crítico aumenta o dano extra em +1. Se a defesa vencer, mas não com defesa perfeita, você ainda causa 1 ponto de dano extra. O dano extra ignora limite de dano."
      },
      {
        "nome": "Golpe Rápido",
        "custo": "1 PM",
        "descricao": "Você pode gastar 1PM para fazer um ataque com um movimento, mas o teste tem Perda e não pode utilizar vantagens e técnicas."
      },
      {
        "nome": "Recuperar Fôlego",
        "custo": "0",
        "descricao": "Você faz uma pausa breve para se recobrar e voltar ao combate. Use um movimento para recuperar 1D pontos de mana, até um máximo igual à sua Resistência. Você só pode fazer isso durante combates e conflitos."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Grimório Debilitante",
    "requisito": "Magia",
    "alcance": "Perto",
    "custo": "3 PM por uso (ou 9 PM)",
    "duracao": "Instantânea ou duradoura",
    "descricao": "Você utiliza sua magia para atrapalhar adversários, alterando as condições do ambiente para ter vantagens contra eles.",
    "variacoes": [
      {
        "nome": "Luz/Trevas",
        "duracao": "Duradoura",
        "descricao": "Você ilumina ou escurece a área Perto de um alvo. Uma área escurecida causa Perda em ações que usam a visão (incluindo atacar e defender). Uma área subitamente iluminada causa Perda por uma rodada, enquanto os olhos se ajustam à claridade."
      },
      {
        "nome": "Pés de Chumbo",
        "testes": "Resistência contra a sua Habilidade",
        "duracao": "Duradoura",
        "descricao": "Você aumenta a gravidade no alvo, deixando-o mais lento. O alvo precisa gastar uma ação para realizar um movimento, uma ação completa para uma ação, e uma ação completa extra para tudo que demore mais. O alvo pode resistir com um teste de Resistência contra a sua Habilidade."
      },
      {
        "nome": "Tempestade Mental",
        "duracao": "Instantânea",
        "descricao": "Você faz um ataque contra um alvo, podendo receber bônus no teste usando Magia. Se superar a sua defesa, em vez de PV, você diminuirá seus PM."
      },
      {
        "nome": "Terreno Escorregadio de Neo",
        "custo": "3 PM ou 9 PM",
        "duracao": "1 turno ou duradoura",
        "descricao": "A área Perto do alvo fica escorregadia. Qualquer ação que depende de movimentação (incluindo atacar e defender) tem Perda, e qualquer falha resulta em queda. Um personagem caído tem Perda em todos os testes até usar um movimento para se levantar. Dura 1 turno, mas você pode gastar 9 PM para tornar duradoura."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Grimório Irritante",
    "requisito": "Magia",
    "alcance": "Perto",
    "custo": "0 a 1 PM ou mais",
    "duracao": "Instantânea",
    "descricao": "Em vez de efeitos dramáticos de poder arcano, você utiliza sua magia para irritar e provocar. Bem chato, mas raramente tem efeito mecânico. Contra alvos tentando tarefas que exigem concentração, pode causar Perda.",
    "variacoes": [
      {
        "nome": "A Aporrinhação do Caos",
        "custo": "1 PM por turno",
        "descricao": "Você cria um pequeno enxame de criaturas que não causam dano, mas incomodam o alvo e causam Perda em um teste, apenas fora de combate. Custa 1 PM, mas pode ser mantido gastando mais 1 PM por turno."
      },
      {
        "nome": "O Apavorante Gás de Luignaccio",
        "custo": "1 PM por rodada",
        "testes": "Resistência (9)",
        "descricao": "O alvo tem direito a um teste de Resistência (9). Se falhar, começa a emitir sonoras flatulências durante uma rodada para cada PM gasto. Durante esse tempo, tem Perda em testes sociais contra qualquer infeliz capaz de farejá-lo."
      },
      {
        "nome": "A Flor Perene de Milady “A”",
        "custo": "0 PM",
        "descricao": "Esta magia simples, de custo 0, faz um gerânio inofensivo nascer no local desejado (que pode ser uma criatura). Se arrancado, desaparece — e uma nova flor nasce no lugar, e assim sucessivamente até a magia ser cancelada."
      },
      {
        "nome": "A Gagueira de Raviollius",
        "custo": "1 PM por rodada",
        "testes": "Resistência (9)",
        "descricao": "O alvo tem direito a um teste de Resistência (9). Se falhar, é acometido por gagueira incontrolável durante uma rodada para cada PM gasto. Durante esse tempo, tem Perda em testes que usam a voz (como cantar, usar Influência, comandar Aliados ou conjurar Magia)."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Monasticismo Marcial",
    "requisito": "Nenhum",
    "alcance": "Pessoal",
    "custo": "2 PM por uso",
    "duracao": "Instantânea",
    "descricao": "Você passou por treinamento marcial rigoroso, como os monges shaolin.",
    "variacoes": [
      {
        "nome": "Corpo fechado",
        "descricao": "Ganho em um teste de Resistência para evitar um efeito negativo de vantagens ou poderes."
      },
      {
        "nome": "Inviolável",
        "descricao": "Mantendo-se imóvel (sem realizar ações ou movimentos), você tem Ganho e defesa perfeita em todos os testes de defesa até seu próximo turno."
      },
      {
        "nome": "Palma de ferro",
        "descricao": "Ganho em um teste de Poder para quebrar objetos inanimados (mas não testes de ataque)."
      },
      {
        "nome": "Realinhar chakras",
        "descricao": "Usando uma ação, você pode repetir um teste de Resistência para eliminar algum efeito negativo (e pode gastar mais 2 PM para usar Corpo Fechado e ter Ganho nesse teste)."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Ninjutsu",
    "requisito": "Manha",
    "alcance": "Perto",
    "custo": "2 PM por uso",
    "duracao": "Instantânea",
    "descricao": "Você é um mestre em truques de infiltração e sabotagem.",
    "variacoes": [
      {
        "nome": "Bomba de fumaça",
        "descricao": "Usando uma ação, todos os personagens Perto (incluindo aliados) ficam cegos por uma rodada, recebendo Perda em testes que usam a visão (como fazer um ataque, ou impedir sua fuga)."
      },
      {
        "nome": "Corrida ninja",
        "descricao": "Você dobra seu deslocamento neste turno. Por exemplo, pode ir de Perto para Muito Longe com apenas um movimento."
      },
      {
        "nome": "Estrepes",
        "descricao": "Usando uma ação, você espalha objetos espinhosos no chão para atrapalhar um alvo Perto. Ele tem Perda em um teste que você escolher, até seu próximo turno."
      },
      {
        "nome": "Jutsu de troca",
        "descricao": "Como reação, você troca de lugar com um item próximo, como um tronco de árvore. Ganho no teste de defesa, apenas uma vez por rodada."
      },
      {
        "nome": "Pipa ninja",
        "descricao": "Você usa um movimento para saltar até Longe, e uma ação para abrir uma grande capa de tecido e voar durante uma rodada. Você pode continuar voando se usar uma ação por rodada para controlar a pipa, ou pode fechá-la com um movimento e voltar ao chão sem sofrer dano."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Pequenos Desejos",
    "requisito": "Mística",
    "alcance": "Perto",
    "custo": "0 a 1 PM por uso",
    "duracao": "Instantânea",
    "testes": "Teste de Mística (para truques simples)",
    "descricao": "Esta magia realiza uma série de efeitos e ilusões inofensivas, mais para distrair e entreter que qualquer outra coisa. Personagens treinados em Mística e com a vantagem Magia recebem esta técnica sem gastar XP.",
    "variacoes": [
      {
        "nome": "Criar objetos",
        "custo": "0 PM",
        "descricao": "Criar pequenos objetos sem utilidade prática, como flores, lenços, borboletas ou pombos (mágicos, que logo desaparecem)."
      },
      {
        "nome": "Levitar item",
        "custo": "0 PM",
        "descricao": "Levitar e mover um item leve, lentamente, como se tivesse Poder 0."
      },
      {
        "nome": "Colorir, limpar ou sujar",
        "custo": "0 PM",
        "descricao": "Colorir, limpar ou sujar itens pequenos (incluindo roupas)."
      },
      {
        "nome": "Aquecer, esfriar ou temperar",
        "custo": "0 PM",
        "descricao": "Aquecer, esfriar e/ou temperar (mas não produzir) uma refeição, ou outro item de até 500g."
      },
      {
        "nome": "Criar ser feérico",
        "custo": "1 PM",
        "descricao": "Criar um pequeno ser feérico, feito de magia, que realiza uma tarefa simples como apanhar lenha, colher frutos, pescar, vigiar uma área, alimentar um mascote, etc."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Praga",
    "requisito": "Mística",
    "alcance": "Perto",
    "custo": "2 PM",
    "duracao": "Variada",
    "testes": "Teste de Poder contra a Resistência do alvo.",
    "descricao": "Você aponta o dedo e roga uma praga contra alguém! Se vencer, ele sofre um dos efeitos a seguir, à sua escolha:",
    "variacoes": [
      {
        "duracao": "Até o fim da cena",
        "descricao": "-1 em testes de um atributo."
      },
      {
        "duracao": "Até o fim da sessão",
        "descricao": "Perda em um único teste à sua escolha."
      },
      {
        "duracao": "Até o fim da cena",
        "descricao": "Vantagens e técnicas custam +1 PM."
      },
      {
        "duracao": "Até o fim da cena",
        "descricao": "Qualquer resultado 1 em um teste causa falha crítica."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Raio Místico",
    "requisito": "Magia, Mística",
    "alcance": "Perto ou Longe",
    "custo": "1 a 2 PM por uso",
    "duracao": "Instantânea",
    "testes": "Seu teste de ataque é normal, mas você pode escolher usar a perícia Mística em vez de Luta.",
    "descricao": "Você usa seus poderes mágicos para atacar. Com uma ação e 1 PM, você dispara um Raio Místico contra um alvo Perto ou Longe. Você também pode gastar 1 PM extra para adicionar um destes efeitos:",
    "variacoes": [
      {
        "nome": "Ácido",
        "testes": "Resistência (6 + dano sofrido)",
        "descricao": "Na próxima rodada, o alvo faz um teste de Resistência (6 + dano sofrido). Se falhar, sofre 1D–1 de dano extra."
      },
      {
        "nome": "Congelante",
        "descricao": "Se sofrer dano, o alvo congela, sofrendo Perda em seu próximo teste."
      },
      {
        "nome": "Debilitante",
        "descricao": "Se vencer a defesa, em vez de causar dano, você reduz um atributo do alvo (à sua escolha) em –1, até o fim da cena. Isso não afeta os seus recursos."
      },
      {
        "nome": "Distante",
        "descricao": "O alcance do raio muda para Muito Longe."
      },
      {
        "nome": "Elétrico",
        "descricao": "Se causar dano, o choque atordoa o alvo; o próximo ataque contra ele tem Ganho."
      },
      {
        "nome": "Flamejante",
        "descricao": "Faça o teste de ataque com Poder +2."
      }
    ]
  },
  {
    "categoria": "Truques",
    "nome": "Super-Movimento",
    "requisito": "Esporte, Luta ou Magia",
    "alcance": "Pessoal",
    "custo": "1 PM por uso",
    "duracao": "Instantânea",
    "descricao": "Através de treinamento ou magia, você realiza movimentos impossíveis para uma pessoa comum.",
    "variacoes": [
      {
        "custo": "1 PM por uso",
        "descricao": "Pode andar em paredes e tetos. Se descer, deve gastar mais 1 PM para prender-se novamente."
      },
      {
        "custo": "1 PM por uso",
        "descricao": "Saltar até Muito Longe com um movimento, sem sofrer Perda nem dano de queda ao voltar ao chão."
      },
      {
        "custo": "1 PM por rodada",
        "descricao": "Correr sobre a água ou outra superfície instável. Deve gastar um movimento e 1 PM por rodada, ou afundará."
      },
      {
        "custo": "1 PM por uso",
        "descricao": "Ganho em um teste para se livrar de cordas, amarras e outros tipos de contenção."
      }
    ]
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Absorver Mana",
    "requisito": "Mística",
    "alcance": "Pessoal",
    "custo": "0 PM",
    "duracao": "Instantânea",
    "descricao": "No lugar de gastar sua própria energia para ativar poderes, você pode absorvê-la do ambiente. Você pode usar um movimento para absorver 1D PM, ou uma ação para absorver 1D+H PM. Estes PM podem superar o seu limite, mas você não pode absorver mais mana até gastar o que já foi absorvido. Mana ambiental é volátil: você só pode segurá-lo por uma rodada; PM absorvidos que não sejam gastos até o fim do seu próximo turno são perdidos."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Área de Batalha",
    "requisito": "Poder ou Habilidade 2, Mística",
    "alcance": "Perto",
    "custo": "2 PM para ativar, 1 PM por rodada para manter",
    "duracao": "Enquanto pagar o custo",
    "testes": "Oponentes que não queiram ser transportados podem fazer um teste oposto de Resistência para anular a técnica.",
    "descricao": "Usando uma ação, você transporta a você e um número máximo de personagens igual a seu Poder ou Habilidade (escolha um) para um campo de batalha especial, em outra dimensão, onde possui vantagens sobre eles. Escolha duas vantagens de 1 ponto, ou uma de 2 pontos. Você não precisa possuí-las; enquanto está na área de batalha, elas passam a fazer parte da sua ficha. Se tiver a vantagem, seu custo em PM é reduzido à metade. Adquirindo a técnica diversas vezes, você pode ter mais de uma área de batalha, ou uma única que concede vantagens maiores quando invocada. Você pode ativar todas elas com uma única ação, mas deve pagar o custo total em PM de todas as técnicas."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Bola de Fogo",
    "requisito": "Habilidade 2, Magia",
    "alcance": "Longe",
    "custo": "3 PM + Magia",
    "duracao": "Instantânea",
    "descricao": "Um dos mais conhecidos feitiços de ataque, esta técnica cria uma grande esfera flamejante que explode ao atingir o alvo. Faça um ataque. Você pode aumentar a intensidade do fogo, usando Magia para ter bônus no teste. Se usar a regra de Tipos de Dano, este ataque causa dano de fogo. Devido à grande área da explosão, a Bola de Fogo também atinge todos os alvos Perto do alvo original. Além disso, todos sofrem Perda em seus testes de defesa."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Combo",
    "requisito": "Habilidade 1, Golpe",
    "alcance": "Variável",
    "custo": "0 PM",
    "duracao": "Instantânea",
    "testes": "O oponente rola a defesa uma só vez, mas você rola um novo ataque para superá-la a cada novo golpe.",
    "descricao": "Você pode realizar diversos golpes em sequência. Quando acerta um golpe (ou seja, seu ataque supera a defesa) no oponente, pode usar um movimento para realizar um novo golpe contra ele. Se tiver mais movimentos e seguir vencendo a defesa, você pode adicionar mais golpes ao combo, até um máximo de golpes extras igual à sua Habilidade. No entanto, nenhum golpe pode ser repetido no mesmo combo."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Consertar",
    "requisito": "Máquinas",
    "alcance": "Perto",
    "custo": "2 a 10 PM",
    "duracao": "Instantânea",
    "descricao": "Você pode gastar uma ação e 2 PM para curar 1D Pontos de Vida em um construto. Você pode gastar mais PM para aumentar a recuperação, até um máximo de dados igual à sua Habilidade ou 5, o que for menor."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Desprezo",
    "requisito": "Poder 2 e Arte ou Influência",
    "alcance": "Perto",
    "custo": "2 PM, depois 1 PM por uso",
    "duracao": "Duradoura",
    "testes": "Faça um teste de Poder contra a Resistência do alvo. Toda vez que fizer isso, ele pode fazer um novo teste de Resistência para interromper a técnica.",
    "descricao": "Seu inimigo é inferior, e você sabe deixar isso bem claro. Com uma ação e 2 PM, você lança um olhar de desprezo contra o alvo, ou palavras ácidas que ironizam suas capacidades (ou a falta delas). Se vencer, até o fim da cena, você pode gastar 1 PM como reação para causar Perda sempre que ele fizer um teste."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Disparo de Energia",
    "requisito": "Luta ou Magia",
    "alcance": "Longe",
    "custo": "3 PM",
    "duracao": "Instantânea",
    "descricao": "Você concentra sua energia espiritual em uma esfera, raio ou outro formato, e dispara contra um alvo. Você pode fazer um ataque com Poder +2 e atingir um personagem Longe, sem Perda, mesmo sem a vantagem Alcance. Você pode gastar tempo e movimentos para concentrar energia — cada movimento aumenta o Poder em +2, sem custo extra em PM, até um máximo de movimentos igual ao Poder inicial. Você pode usar mais de uma rodada para acumular o bônus, mas não pode fazer outras ações e movimentos durante esse tempo. Todo disparo de energia tem um nome próprio e impressionante, que o atacante grita quando dispara. Invente esse nome. Se você (o jogador!) gritá-lo, a técnica gasta –1PM."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Encantar",
    "requisito": "Arte, Influência ou Magia",
    "alcance": "Perto",
    "custo": "3 PM (ou mais com Magia)",
    "duracao": "Duradoura",
    "testes": "Faça um teste de Poder resistido por um de Resistência do alvo.",
    "descricao": "Seja por fala mansa, música cativante, ou poder mágico puro e simples, você torna um alvo extremamente amigável a você. Se tiver sucesso, ele não poderá realizar ações agressivas contra você (como atacá-lo). Além disso, também vai entender qualquer pedido seu como uma sugestão muito razoável. Pedidos muito difíceis ou contrários à sua natureza, como atacar um aliado ou violar um Código, permitem que ele faça um novo teste de Resistência para quebrar o encanto. Usando Magia, você pode gastar mais PM para ter bônus no teste, seguindo as regras da vantagem."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Gambiarra",
    "requisito": "Saber, Maestria (Saber)",
    "alcance": "Pessoal",
    "custo": "2 PM",
    "duracao": "Instantânea",
    "descricao": "Você junta um barbante, chiclete, clipes de papel e faz uma bomba. Ou um computador. Ou ambos! Você pode gastar 2 PM para trocar qualquer perícia por Saber em um teste, mantendo a mesma meta. Você só pode fazer isso se tiver tempo e recursos suficientes; não é possível durante um combate, cenas de conflito ou testes resistidos."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Golpe Púrpura",
    "requisito": "Poder 3, Luta",
    "alcance": "Perto",
    "custo": "3 PM",
    "duracao": "Instantânea",
    "descricao": "Tornado famoso pelo General Púrpura, líder do exército ARSENAL e senhor da Ilha do Martelo, este golpe poderoso atinge o alvo com força tremenda. Faça um ataque. Você recebe um crítico automático. Além disso, caso consiga outro crítico, o alvo é também arremessado um passo de distância. Cada novo crítico aumenta essa distância, chegando a Fora de Alcance se rolar mais três críticos! Se houver obstáculos ou barreiras no caminho, o alvo também sofre 1D de dano extra para cada distância percorrida."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Grito da Selva",
    "requisito": "Poder 2, Animais",
    "alcance": "Pessoal",
    "custo": "3 PM",
    "duracao": "Duradoura",
    "descricao": "Você usa uma ação completa, toma fôlego e emite um grito poderoso, ouvido a quilômetros de distância. No início de seu próximo turno, animais selvagens ou outras criaturas da região surgem para ajudá-lo. Os animais permanecem até o fim da cena, atuando como um Ajudante de tipo à sua escolha em cada utilização. Ainda é preciso pagar PM de acordo com a regra da vantagem. Os animais surgem mesmo nos lugares mais improváveis — afinal, a vida sempre encontra um meio! Contudo, se o mestre achar isso impossível, ninguém responde ao chamado — mas você ganha um dharma como compensação, apenas uma vez na aventura!"
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Inspirar",
    "requisito": "Poder 2 e Arte, Influência ou Devoto",
    "alcance": "Perto",
    "custo": "3 ou 6 PM",
    "duracao": "Duradoura",
    "testes": "Teste de Poder (9)",
    "descricao": "Você inspira um aliado com uma música ou discurso edificante. Faça um teste de Poder (9). Com sucesso, o aliado ganha +2 em todos os testes até o fim da cena. Cada acerto crítico em seu teste aumenta esse bônus em +1. Gastando 6 PM, você afeta todos os aliados Perto."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Invocar Elemental",
    "requisito": "Habilidade 2, Magia",
    "alcance": "Perto",
    "custo": "3 PM",
    "duracao": "Duradoura",
    "descricao": "Você invoca uma criatura elemental, um ser de outro plano de existência, feito inteiramente de um elemento como água, ar, terra ou fogo. Enquanto está neste plano, ele age como um Ajudante, de um tipo escolhido por você ao conjurar a magia. Ainda é preciso pagar PM de cada utilização como Ajudante."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Megalon",
    "requisito": "Habilidade 3, Magia",
    "alcance": "Perto",
    "custo": "10 PM",
    "duracao": "Duradoura",
    "testes": "Um alvo recebendo esta magia contra a vontade tem direito a um teste de Resistência contra a sua Habilidade para evitá-la.",
    "descricao": "Você aumenta o tamanho de uma criatura, tornando-a mais robusta, porém desajeitada. O alvo tem Ganho em todos os testes que envolvem esforço ou vigor físico, mas também Perda em testes de agilidade, coordenação e furtividade."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Mikron",
    "requisito": "Habilidade 3, Magia",
    "alcance": "Perto",
    "custo": "10 PM",
    "duracao": "Duradoura",
    "testes": "Um alvo recebendo esta magia contra a vontade tem direito a um teste de Resistência contra a sua Habilidade para evitá-la.",
    "descricao": "Você diminui o tamanho de uma criatura, tornando-a ágil, porém enfraquecida. O alvo tem Ganho em todos os testes que envolvem agilidade, coordenação e furtividade, mas passa a ter Perda em testes que envolvem esforço ou vigor físico."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Pisão do Titã",
    "requisito": "Poder 3",
    "alcance": "Perto",
    "custo": "3 PM",
    "duracao": "Instantânea",
    "descricao": "Faça um ataque. Você golpeia o chão, atingindo com uma onda de choque todos os alvos (inimigos e aliados) Perto. Alvos que recebam dano acima de seu valor de Resistência são derrubados. Um personagem caído tem Perda em todos os testes até usar um movimento para se levantar."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Poeira Glacial",
    "requisito": "Habilidade 2, Magia",
    "alcance": "Longe",
    "custo": "3 PM + bônus de Magia",
    "duracao": "Instantânea",
    "descricao": "Você esfria o ar ao redor de um alvo, congelando-o. Faça um ataque. Você pode aumentar a intensidade do frio, usando Magia para receber bônus no teste. Se usar a regra de Tipos de Dano, este ataque causa dano de frio. Se o alvo perde um valor de PV acima de sua Resistência, ele congela, recebendo Perda em todos os testes por uma rodada."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Queimar o Cosmo",
    "requisito": "Resistência 2, Luta",
    "alcance": "Pessoal",
    "custo": "5 a 25 PM",
    "duracao": "Duradoura",
    "descricao": "Você usa uma ação para queimar energia cósmica, fazendo-a fluir pelo seu corpo e aumentando suas capacidades. Cada 5 PM aumentam +1 seu Poder, Habilidade e Resistência, até o fim da cena (recursos não são afetados). O bônus máximo é igual à sua Resistência original, ou +5, o que for menor."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Raio da Fúria",
    "requisito": "Habilidade 3, Magia",
    "alcance": "Longe",
    "custo": "10 PM",
    "duracao": "Duradoura",
    "testes": "Um alvo recebendo esta magia contra a vontade tem direito a um teste de Resistência contra seu Poder para evitá-la.",
    "descricao": "Você tem o poder de enfurecer os seres e transformá-los em monstros incontroláveis. O alvo recebe Poder +2 em testes de ataque, e tem críticos com 5 ou 6. No entanto, também tem Perda em todos os outros testes (incluindo defesa), e gasta o dobro de PM para vantagens e técnicas. Quando o efeito termina, o alvo fica exausto; seus PM caem a zero e tem Perda em todos os testes até descansar."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Rajada de Golpes",
    "requisito": "Habilidade 2, Luta",
    "alcance": "Perto",
    "custo": "3 PM",
    "duracao": "Instantânea",
    "descricao": "Você atinge o alvo com uma sequência veloz de golpes, atacando com Poder+2 e chance de crítico 5 ou 6. Você pode gastar movimentos no mesmo turno para desferir ainda mais golpes; cada movimento aumenta o Poder em +2, sem custo extra em PM, até um máximo de movimentos igual à sua Habilidade."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Relâmpago",
    "requisito": "Habilidade 2, Magia",
    "alcance": "Longe",
    "custo": "3 PM + bônus de Magia",
    "duracao": "Instantânea",
    "descricao": "Você dispara um raio elétrico contra o alvo. Faça um ataque. Você pode aumentar a intensidade da eletricidade, usando Magia para ter bônus no teste. Se usar a regra de Tipos de Dano, este ataque causa dano de choque. Se o alvo perde um valor de PV acima da sua Resistência, fica atordoado, dando Ganho ao oponente em todos os testes resistidos (inclusive ataque e defesa) por uma rodada."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Role os Dados",
    "requisito": "Habilidade 3, Arte",
    "alcance": "Perto",
    "custo": "5 PM",
    "duracao": "Instantânea",
    "testes": "Teste de Arte (9)",
    "descricao": "O bardo do grupo também pode cantar o maior sucesso da banda Holy Avenger! Role um teste de Arte (9). Com sucesso, você e todos os aliados Perto recuperam 1PA. Para cada crítico na rolagem, recuperam 1PA extra. Se você (o jogador!) cantar o refrão da música, a técnica custa –1PM para ser usada. Se o grupo inteiro cantar, reduz em –2PM!"
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Sabedoria dos Ermos",
    "requisito": "Arena, Sobrevivência",
    "alcance": "Pessoal",
    "custo": "1 ou 3 PM",
    "duracao": "Instantânea",
    "descricao": "Seu conhecimento de sobrevivência permite obter itens necessários em locais com os quais você está familiarizado. Quando está na sua Arena, você pode gastar 1PM para usar um item comum, ou 3PM para um item incomum, além do que tiver no Inventário. Você não pode usar este item para recuperar os PM que acabou de gastar na técnica."
  },
  {
    "categoria": "Técnicas Comuns",
    "nome": "Setas Infalíveis de Petrovna",
    "requisito": "Habilidade 1, Magia",
    "alcance": "Longe",
    "custo": "1 PM por seta",
    "duracao": "Instantânea",
    "testes": "As setas atingem automaticamente, sem teste de ataque ou defesa.",
    "descricao": "Você usa uma ação para criar uma ou mais setas de energia mágica, até um máximo de setas igual à sua Habilidade, que ficam flutuando ao seu redor — permanecendo até o fim da cena, ou até serem disparadas. Com um movimento, você pode disparar todas as setas para um ou mais alvos à sua escolha, dividindo-as como quiser. Cada uma causando 1 ponto de dano e então sumindo. Alvos com defesa perfeita automática não sofrem dano. Você pode manter apenas um conjunto de setas preparado por vez."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Abrir Chakra",
    "requisito": "Atributo 4, Luta",
    "alcance": "Pessoal",
    "custo": "15 PM",
    "duracao": "Duradoura",
    "descricao": "Você desbloqueia um chakra, um vórtice de energia espiritual em seu corpo. Cada atributo tem um chakra correspondente, que são técnicas separadas. Abrir o chakra usa um movimento. Até o fim da cena, você tem Ganho e um crítico automático em testes do atributo correspondente (incluindo testes de ataque e defesa). Quando o efeito termina você cai exausto, com o recurso daquele atributo reduzido a zero. Caso seja Resistência, você cai derrotado e inconsciente. Para os demais, tem Perda em todos os testes devido ao cansaço, até se recuperar.",
    "variacoes": [
      {
        "nome": "Poder",
        "descricao": "O alvo tem Perda em testes de defesa."
      },
      {
        "nome": "Habilidade",
        "custo": "1 PM por movimento extra",
        "descricao": "Você pode gastar 1PM para fazer um movimento extra. O máximo de movimentos por rodada é igual ao atributo. Cada três movimentos podem ser trocados por uma ação extra, mas você só pode realizar um ataque extra por rodada, independente de quantas ações realizar."
      },
      {
        "nome": "Resistência",
        "descricao": "Você recebe 20PV extras e todas as suas defesas são perfeitas."
      }
    ]
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Bomba Vital",
    "requisito": "Resistência 4, Luta",
    "alcance": "Longe",
    "custo": "Variável",
    "duracao": "Instantânea",
    "testes": "Teste de Resistência (9)",
    "descricao": "Você absorve energia da própria natureza, acumulando magia ambiente bruta e moldando-a como uma esfera brilhante, arremessada contra um oponente. Use uma ação completa e faça um teste de Resistência (9). Para cada ponto que seu teste superar a meta, você acumula 1PM na bomba, até uma quantidade máxima por rodada igual ao atributo. Você pode demorar mais para acumular mais energia, até um limite de rodadas igual à sua Resistência. Quando chegar a esse limite, precisa arremessar a bomba ou dissipá-la. Enquanto está acumulando energia, aliados Perto podem doar PM a você. Cada ação de um aliado doa 1D PM. Quando estiver pronto, você pode usar outra ação completa para arremessar a bomba. Este ataque atinge todos os alvos Perto do alvo principal, com um bônus de Poder igual aos PM acumulados. Para 20PM ou mais, o ataque tem Ganho. Mesmo não usando sua própria energia, a exaustão faz seus PM caírem a zero. Você também tem Perda em todos os testes até descansar."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Dim Mak",
    "requisito": "Habilidade 5, Luta",
    "alcance": "Perto",
    "custo": "5 PM",
    "duracao": "Instantânea",
    "descricao": "Você sabe atingir pontos de pressão no corpo do oponente, para paralisar membros ou órgãos vitais, e até matar com um simples toque! Quando usa o Dim Mak, você faz um ataque com chance de crítico máxima (4, 5 ou 6) que não pode ser combinado com nenhuma outra vantagem ou técnica. Superando a defesa, em vez de causar dano, o alvo perde 2 pontos em um atributo à sua escolha. Cada crítico faz perder 1 ponto adicional. Caso o atributo seja reduzido a 0, é considerado nulo. O alvo perde os recursos desse atributo, e não pode fazer testes que o utilizem. Caso seja Resistência, o alvo entra em coma e deve fazer imediatamente um teste de morte. Se sobreviver, a recuperação será demorada: 1 ponto de atributo para cada 1D dias de repouso absoluto."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Mata-Kaiju",
    "requisito": "Habilidade 5, Magia",
    "alcance": "Muito Longe",
    "custo": "10 PM + bônus de Magia",
    "duracao": "Instantânea",
    "descricao": "Uma das mais poderosas magias de destruição conhecidas, dispara uma avassaladora descarga de energia que destrói uma grande área ao redor do ponto de impacto. Mata-Kaiju requer três rodadas para ser conjurada. A primeira, usando Magia para aumentar o seu ataque ao máximo, gastando PM para ter bônus no teste; a segunda, concentrando e intensificando a energia reunida; e a terceira, para fazer o disparo. O teste de ataque tem dois críticos automáticos (duas escalas acima!) e atinge todos os alvos Longe do alvo principal. Devido à imensa área do ataque, todos os testes de defesa recebem duas Perdas."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Megalon Superior",
    "requisito": "Habilidade 6, Megalon",
    "alcance": "Perto",
    "custo": "25 ou 50 PM",
    "duracao": "Duradoura",
    "descricao": "Versão aprimorada da magia Megalon, capaz de transformar o alvo em algo realmente titânico! O alvo é elevado uma escala acima (25PM) ou duas (50PM)."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Metamagia",
    "requisito": "Habilidade 5, Magia, Maestria (Mística)",
    "alcance": "Variável",
    "custo": "Variável",
    "duracao": "Instantânea",
    "descricao": "Você domina as artes místicas com tamanha precisão que pode modificar todos os seus parâmetros! Este é um conjunto de truques lendários, que altera o efeito da vantagem Magia e qualquer técnica que a tenha entre os requisitos. Sempre que usar Magia ou suas técnicas, você pode gastar mais PM para adicionar os seguintes efeitos:",
    "variacoes": [
      {
        "nome": "Acelerar magia",
        "custo": "+5 PM",
        "descricao": "Diminuir o tipo de ação da magia em um passo (de ação para movimento, por exemplo)."
      },
      {
        "nome": "Alvos extras",
        "custo": "+1 PM por alvo extra",
        "descricao": "Até um máximo de alvos iguais à sua Habilidade. O efeito da magia deve ser dividido entre eles."
      },
      {
        "nome": "Duplicar magia",
        "custo": "Custo da magia x2",
        "descricao": "Cria um efeito extra da magia na mesma ação, pagando duas vezes o custo em PM."
      },
      {
        "nome": "Estender magia",
        "custo": "+3 PM por passo",
        "descricao": "Aumentar o alcance de magia um passo (de Perto para Longe, por exemplo). Você pode usar mais PM para estendê-lo ainda mais."
      },
      {
        "nome": "Expandir magia",
        "custo": "+3 PM (Perto), +9 PM (Longe), +15 PM (Muito Longe)",
        "descricao": "Afetar todos Perto do alvo, ou Longe, ou Muito Longe. Cada passo de distância impõe uma Perda em testes de defesa para evitar."
      }
    ]
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Morte Estelar",
    "requisito": "Habilidade 9, Magia",
    "alcance": "Muito Longe",
    "custo": "100 PM",
    "duracao": "Instantânea",
    "descricao": "Esta talvez seja a magia mais destrutiva de todo o universo conhecido! Usada pela própria semideusa Vitória para derrotar o deus-monstro K’Athanoa, consome toda a energia de uma estrela, que desaparece do céu. Essa energia então é convertida em um único disparo, destruindo imediatamente o alvo — não importando ser uma criatura, uma cidade, um planeta ou mesmo um deus! Obviamente, cada vez que essa técnica é usada, um sol morre em algum lugar do universo — existindo uma chance de extinção para mundos ou civilizações inteiras. Caso isso ocorra (resultado 1 em 1D), entidades cósmicas mantenedoras do equilíbrio universal procuram o conjurador para aplicar penalidades adequadas."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Percepção Cósmica",
    "requisito": "Habilidade 5, Maestria (Percepção)",
    "alcance": "Pessoal",
    "custo": "5 PM para ativar, 1 PM por rodada para manter",
    "duracao": "Enquanto pagar o custo",
    "descricao": "Você é uno com o mundo! Com uma ação e 5PM, pode entrar em um estado de conexão profunda com o universo, e enxergar as próprias linhas de energia que ligam os seres vivos e o mundo ao seu redor. Você deve gastar 1PM no começo do seu turno para manter esse estado de conexão cósmica. Enquanto está com a técnica ativa, você tem Ganho e um crítico automático em todos os testes de Percepção. Além disso, pode gastar 1PM para adquirir qualquer Sentido por uma rodada, ou trocar a perícia de qualquer teste (inclusive ataque e defesa) por Percepção."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Rapsódia das Arcas",
    "requisito": "Poder 4, Maestria (Arte)",
    "alcance": "Perto",
    "custo": "3 PM por rodada",
    "duracao": "4 rodadas",
    "testes": "Teste de Poder com meta crescente (6, 9, 12, 15)",
    "descricao": "Você executa uma longa canção épica, exaltando os feitos de seus companheiros, tornando-os a melhor versão de si mesmos. A cada rodada você faz um teste de Poder com meta crescente. Para cada sucesso, seus aliados Perto recebem um novo benefício cumulativo:",
    "variacoes": [
      {
        "nome": "1ª Rodada",
        "meta": "6",
        "descricao": "Todas as vantagens e técnicas de seus aliados custam –2PM."
      },
      {
        "nome": "2ª Rodada",
        "meta": "9",
        "descricao": "Seus aliados recuperam 5PV e 5PM no começo de seu turno."
      },
      {
        "nome": "3ª Rodada",
        "meta": "12",
        "descricao": "Seus aliados conseguem crítico com 5 ou 6."
      },
      {
        "nome": "4ª Rodada",
        "meta": "15",
        "descricao": "Seus aliados têm defesa perfeita e Ganho em um teste na rodada."
      }
    ]
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Sabedoria Selvagem",
    "requisito": "Habilidade 4, Sabedoria dos Ermos",
    "alcance": "Pessoal",
    "custo": "5 ou 10 PM",
    "duracao": "Instantânea",
    "descricao": "Você é ainda mais eficiente em encontrar itens de utilidade em locais com os quais é familiarizado. Quando está na sua Arena, você pode gastar 5PM para usar um item raro, ou 10PM para um item lendário. Não, você não pode usar esse item para recuperar os PM que gastou na própria técnica!"
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Trapacear o Destino",
    "requisito": "Habilidade 5, Maestria (Manha)",
    "alcance": "Pessoal",
    "custo": "5 a 15 PM",
    "duracao": "Instantânea",
    "descricao": "Você é tão esguio e trapaceiro que nem o próprio destino consegue pegá-lo! Sempre que rolar 1 em um dado, você pode gastar 5PM para virá-lo do outro lado e trocá-lo por um 6 (e um acerto crítico). Você pode até transformar uma falha crítica em um sucesso devastador! Diferente de outras técnicas, este custo nunca pode ser reduzido por vantagens, poderes ou outros meios."
  },
  {
    "categoria": "Técnicas Lendárias",
    "nome": "Visão do Futuro",
    "requisito": "Habilidade 5",
    "alcance": "Pessoal",
    "custo": "3 PM",
    "duracao": "Instantânea",
    "descricao": "O futuro é show! Você consegue enxergar alguns instantes no futuro e, talvez, fazer algo para mudá-lo. Sempre que alguém faz um teste contra você, seja um ataque, defesa ou teste resistido, você pode gastar 3PM como reação para fazê-lo rolar esse teste duas vezes, e ficar com o resultado que você escolher."
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