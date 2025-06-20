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