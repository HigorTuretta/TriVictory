export const pericias = [
  { nome: 'Animais', custo: 1, descricao: 'Você sabe cuidar, adestrar, cavalgar e lidar com animais e outras criaturas irracionais. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Arte', custo: 1, descricao: 'Você sabe realizar performances artísticas como cantar, dançar, tocar música, cozinhar, etc. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Esporte', custo: 1, descricao: 'Você tem conhecimento e capacidade em atividades físicas como correr, escalar, nadar e acrobacias. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Influência', custo: 1, descricao: 'Você sabe convencer outros através de diplomacia, liderança, intimidação ou sedução. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Luta', custo: 1, descricao: 'Você sabe atacar e se defender em combate, corpo a corpo ou à distância. Concede +1D em testes de Ataque, Defesa e Iniciativa.' },
  { nome: 'Manha', custo: 1, descricao: 'Você sabe realizar ações furtivas ou ilegais, como roubar, arrombar portas e construir armadilhas. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Máquinas', custo: 1, descricao: 'Você sabe operar, construir e consertar máquinas, veículos e computadores. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Medicina', custo: 1, descricao: 'Você sabe realizar primeiros socorros, diagnosticar e tratar doenças e ferimentos. Concede +1D em testes que envolvam essas ações.' },
  { nome: 'Mística', custo: 1, descricao: 'Você sabe sobre forças sobrenaturais e pode usar esta perícia em vez de Luta ao atacar ou se defender com poderes mágicos. Concede +1D em testes de Mística.' },
  { nome: 'Percepção', custo: 1, descricao: 'Você sabe usar seus sentidos para perceber melhor o mundo, notar coisas escondidas e evitar surpresas. Concede +1D em testes de Percepção.' },
  { nome: 'Saber', custo: 1, descricao: 'Você possui conhecimento teórico sobre ciência, idiomas e outros assuntos. Concede +1D em testes que envolvam esse conhecimento.' },
  { nome: 'Sobrevivência', custo: 1, descricao: 'Você sabe subsistir e se orientar em condições adversas, encontrar comida e abrigo. Concede +1D em testes que envolvam essas ações.' },
];

export const vantagens = [
    { nome: 'Aceleração', custo: 1, descricao: 'Você se move muito rápido. Pode gastar 1 PM para realizar um movimento extra em seu turno. Também pode gastar 1 PM para receber +1D (Ganho) em testes de Iniciativa ou em testes de Habilidade para correr, fugir ou perseguir.' },
    { nome: '+Ação', custo: 1, repetivel: true, descricao: 'Você recebe +2 Pontos de Ação (PA) para cada vez que compra esta vantagem.' },
    { nome: 'Acumulador', custo: 1, descricao: 'Sempre que você acerta um ataque, pode gastar 2 PM para receber um bônus de P+1 no ataque seguinte. O bônus é cumulativo até um máximo de P+5, e se perde se você errar um ataque ou deixar de atacar.' },
    { nome: 'Ágil', custo: 1, descricao: 'Você tem grande agilidade. Recebe um bônus de +2 em testes de Habilidade envolvendo agilidade, coordenação, equilíbrio e Iniciativa. Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { 
      nome: 'Ajudante', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Você tem um companheiro. Uma vez por rodada, pode gastar 2 PM para invocá-lo e receber seu benefício. Apenas uma ajuda por rodada.',
      opcoes: [
        { nome: 'Curandeiro', descricao: 'Cura 2D PV em um alvo Perto, ou permite repetir um teste de Resistência contra um efeito negativo.' },
        { nome: 'Especialista', descricao: 'Concede +1D (Ganho) em um teste de uma perícia escolhida (exceto para atacar ou defender).' },
        { nome: 'Familiar', descricao: 'Custa 1 PM para ser invocado e reduz à metade o custo em PM para usar outra vantagem na rodada.' },
        { nome: 'Lutador', descricao: 'Concede +1D (Ganho) em um teste de Ataque ou Defesa por uma rodada.' },
        { nome: 'Montaria', descricao: 'Concede um movimento extra, ou +1D (Ganho) em um teste de Iniciativa ou para correr/perseguir. Custa 1 PM.' }
      ]
    },
    { nome: 'Alcance', custo: 1, custos: [1, 2], descricao: 'Seus ataques acertam mais longe. 1pt: pode atingir alvos Longe sem penalidades, e Muito Longe com -1D (Perda). 2pt: pode atingir alvos Muito Longe sem penalidades.' },
    { nome: 'Anulação', custo: 2, descricao: 'Você pode gastar uma ação e 3 PM para tentar anular uma vantagem de um alvo. O alvo faz um teste de Resistência para evitar. Se falhar, não pode mais usar a vantagem na cena.' },
    { 
      nome: 'Arena', 
      custo: 1, 
      repetivel: true, 
      descricao: 'Escolha um tipo de terreno. Quando está nesse terreno, pode gastar 2 PM para receber +1D (Ganho) em um teste.',
      opcoes: ['Água', 'Céu', 'Cidades', 'Ermos', 'Subterrâneo', 'Categoria de lugares', 'Lugar único']
    },
    { nome: 'Artefato', custo: 1, repetivel: true, descricao: 'Você possui um item especial e único. Cada ponto gasto nesta vantagem vale 10XP para adquirir qualidades para o item.' },
    { 
        nome: 'Ataque Especial',
        custo: 1,
        repetivel: true,
        descricao: 'Ao fazer um ataque, você pode gastar PM para ativar um ou mais efeitos especiais.',
        opcoes: [
            { nome: 'Área (3 PM)', descricao: 'Seu ataque atinge todos os personagens Perto do alvo.' },
            { nome: 'Choque (1 PM)', descricao: 'Seu ataque usa sua Resistência em vez de Poder.' },
            { nome: 'Distante (1 PM)', descricao: 'Atinge um passo de distância além. Cumulativo com Alcance.' },
            { nome: 'Espiritual (1 PM)', descricao: 'O alvo perde PM em vez de PV.' },
            { nome: 'Investida (1 PM)', descricao: 'Ao atacar um alvo Longe, você também se move até ele.' },
            { nome: 'Múltiplo (1 PM/alvo extra)', descricao: 'Atinge mais alvos, até um máximo igual à sua Habilidade.' },
            { nome: 'Penetrante (2 PM)', descricao: 'O alvo tem -1D (Perda) em seu teste de defesa.' },
            { nome: 'Perigoso (1 PM)', descricao: 'Seu ataque causa um acerto crítico com resultado 5 ou 6.' },
            { nome: 'Poderoso (2 PM)', descricao: 'Quando consegue um crítico, pode gastar 2 PM para somar o Poder mais uma vez.' },
            { nome: 'Potente (1 PM por +2P)', descricao: 'Aumenta o Poder do ataque em +2. Pode ser comprado mais vezes.' },
            { nome: 'Preciso (1 PM)', descricao: 'Seu ataque usa sua Habilidade em vez de Poder.' },
            { nome: 'Titânico (3 PM)', descricao: 'Você tem um crítico automático no ataque.' }
        ]
    },
    { nome: 'Base', custo: 1, descricao: 'Você tem um porto seguro. Pode se teleportar para sua base de qualquer lugar, fora de combate. Todos os seus testes realizados lá têm +1D (Ganho).' },
    { nome: 'Brutal', custo: 1, repetivel: true, descricao: 'Ao atacar inimigos, você recupera suas energias.', opcoes: [
        { nome: 'Vida', descricao: 'Para cada 3 pontos de dano causados, recupera 1 PV.' },
        { nome: 'Mana', descricao: 'Para cada 3 pontos de dano causados, recupera 1 PM.' },
        { nome: 'Derrota', descricao: 'Cada vez que derrota um oponente, recupera 3 PV e 1 PM.' }
    ] },
    { nome: 'Carismático', custo: 1, descricao: 'Você tem facilidade para agradar. Recebe um bônus de +2 em testes sociais. Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { nome: 'Clone', custo: 1, descricao: 'Gaste 2 PM e um movimento para criar cópias exatas de si. Quando você recebe um ataque bem-sucedido, não sofre dano, mas uma cópia desaparece.' },
    { nome: 'Confusão', custo: 1, descricao: 'Faça um ataque e gaste 2 PM. Se vencer a defesa, além do dano, o alvo fica confuso e não consegue escolher seus alvos (são escolhidos ao acaso pelo mestre).' },
    { nome: 'Cura', custo: 1, descricao: 'Você gasta 2 PM para curar 1D PV em um alvo que possa tocar, até um limite de dados igual à sua Habilidade. Também pode gastar 2 PM para que um alvo repita um teste de Resistência contra um efeito negativo.' },
    { 
        nome: 'Defesa Especial',
        custo: 1,
        repetivel: true,
        descricao: 'Ao receber um ataque, você pode gastar PM para ativar uma técnica de defesa.',
        opcoes: [
            { nome: 'Blindada (1 PM)', descricao: 'Sua defesa consegue acerto crítico com 5 ou 6.' },
            { nome: 'Bloqueio (1 PM)', descricao: 'Você defende usando Poder em vez de Resistência.' },
            { nome: 'Esquiva (1 PM)', descricao: 'Você defende usando Habilidade em vez de Resistência.' },
            { nome: 'Proteção (1 PM por aliado)', descricao: 'Você usa sua defesa no lugar de um aliado Perto que foi atacado.' },
            { nome: 'Provocação (1 PM)', descricao: 'Você atrai e recebe um ataque direcionado a um aliado Perto.' },
            { nome: 'Reflexão (1 PM)', descricao: 'Se sua defesa for maior que o ataque, o oponente sofre dano igual à diferença.' },
            { nome: 'Robusta (2 PM)', descricao: 'Quando consegue um crítico na defesa, pode gastar 2 PM para somar sua Resistência mais uma vez.' },
            { nome: 'Tenaz (1 PM por +2R)', descricao: 'Aumenta a Resistência em +2 na defesa. Pode ser comprado mais vezes.' },
            { nome: 'Titânica (3 PM)', descricao: 'Você tem um crítico automático na defesa, e ela é considerada perfeita.' }
        ]
    },
    { nome: 'Desgaste', custo: 1, descricao: 'Faça um ataque e gaste 2 PM. Se vencer a defesa e causar dano, o alvo sofrerá o mesmo dano novamente na próxima rodada.' },
    { nome: 'Devoto', custo: 1, descricao: 'Você serve a uma causa ou crença. Ao fazer um teste seguindo sua devoção, pode gastar 2 PM para receber +1D (Ganho). Máximo de duas vezes por cena.' },
    { nome: 'Elo Mental', custo: 1, descricao: 'Ligação especial com outro personagem. Vocês podem perceber os pensamentos um do outro, se comunicar e gastar o PM um do outro.' },
    { nome: 'Estender', custo: 1, descricao: 'Você pode estender o efeito de suas vantagens pessoais a seus companheiros. Gaste 1 PM por turno para que uma vantagem que afeta apenas você também funcione com um aliado Perto.' },
    { nome: 'Famoso', custo: 1, descricao: 'Você é conhecido. Em situações sociais com NPCs que o reconhecem, pode gastar 3 PM para receber +1D (Ganho).' },
    { nome: 'Foco', custo: 1, descricao: 'Gaste 2 PM e use um turno inteiro se concentrando. No turno seguinte, seu próximo teste recebe um crítico automático (o atributo é somado mais uma vez).' },
    { nome: 'Forte', custo: 1, descricao: 'Você é muito forte. Recebe um bônus de +2 em testes de esforço físico. Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { nome: 'Gênio', custo: 1, descricao: 'Você tem um cérebro notável. Recebe um bônus de +2 em testes para resolver problemas. Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { nome: 'Golpe Final', custo: 1, descricao: 'Você tem um golpe poderoso. Gaste 3 PM e faça um ataque contra um alvo que esteja Perto da Derrota. Esse ataque é elevado uma escala de poder acima.' },
    { nome: 'Grimório', custo: 1, repetivel: true, descricao: 'Você tem uma fonte de conhecimentos mágicos. Cada ponto gasto nesta vantagem vale 10XP para adquirir truques ou técnicas comuns.' },
    { nome: 'Ilusão', custo: 2, descricao: 'Você consegue criar ilusões tridimensionais, mas sem substância. O custo em PM depende do tamanho da ilusão.' },
    { nome: 'Imitar', custo: 1, descricao: 'Quando alguém usa uma vantagem em sua presença, você pode fazer um teste de Percepção (9). Se tiver sucesso, gaste 3 PM para adquirir a mesma vantagem até o fim da cena.' },
    { nome: 'Imortal', custo: 1, descricao: 'Você pode ser derrotado, mas não morto. Em testes de morte, seu resultado nunca é pior que Inconsciente.' },
    { nome: 'Improviso', custo: 2, descricao: 'Na hora do aperto, você consegue usar capacidades que não deveria ter. Gaste 3 PM para aprender, na hora, uma perícia que não tenha, podendo usá-la até o fim da cena.' },
    { nome: 'Imune', custo: 1, repetivel: true, descricao: 'Você é imune a algo que normalmente afeta outras criaturas.', opcoes: ['Abiótico', 'Anfíbio', 'Doenças', 'Resiliente', 'Sem Mente'] },
    { nome: 'Inimigo', custo: 1, custos: [1, 2], repetivel: true, descricao: 'Você é treinado para enfrentar um certo tipo de criatura. Em todos os testes contra elas, você consegue acerto crítico com 5 ou 6. Custa 2pt para grupos muito comuns.', opcoes: ['Humanos (2pt)', 'Humanoides', 'Construtos', 'Espíritos', 'Monstros'] },
    { nome: 'Inofensivo', custo: 1, descricao: 'Você não parece perigoso. Em combate, você ganha uma ação extra antes do primeiro turno. Você também tem +1D (Ganho) ao rolar iniciativa.' },
    { nome: 'Instrutor', custo: 1, descricao: 'Usando uma ação e gastando 2 PM, você permite a um aliado fazer um teste como se ele tivesse uma perícia que você tem.' },
    { nome: 'Inventário', custo: 1, custos: [0, 1, 2, 3], descricao: 'Você carrega itens consumíveis. 0pt: 2 comuns. 1pt: 3 comuns, 1 incomum. 2pt: 5 comuns, 2 incomuns. 3pt: 5 comuns, 4 incomuns, 1 raro.' },
    { nome: 'Invisível', custo: 1, custos: [1, 2], descricao: 'Gaste uma ação e 3 PM para ficar invisível. 1pt: a invisibilidade é interrompida se você atacar ou sofrer dano. 2pt: é interrompida apenas se você sofrer dano.' },
    { nome: 'Irresistível', custo: 1, descricao: 'Seus poderes são mais difíceis de resistir. Para cada 2 PM gastos, a meta do teste para resistir a um de seus poderes aumenta em +3.' },
    { nome: 'Maestria', custo: 1, repetivel: true, requerPericia: true, descricao: 'Escolha uma perícia que você tem. Em testes dessa perícia, pode gastar 1 PM para ter um acerto crítico com 5 ou 6.' },
    { nome: 'Magia', custo: 2, descricao: 'Você pode manipular energias místicas. Gastando X PM, você soma +X em qualquer teste, até um bônus máximo igual à sua Habilidade. Ao atacar ou defender com Magia, pode usar a perícia Mística.' },
    { nome: '+Mana', custo: 1, repetivel: true, descricao: 'Você recebe +10 Pontos de Mana (PM) para cada vez que compra esta vantagem.' },
    { nome: '+Membros', custo: 2, descricao: 'Você tem membros extras (braços, cauda, etc.). Pode gastar 3 PM para fazer uma segunda ação em seu turno.' },
    { nome: 'Mentor', custo: 1, repetivel: true, descricao: 'Escolha uma perícia que você tem. Uma vez por cena, você tem +1D (Ganho) em um teste da perícia escolhida. Técnicas que usam essa perícia como pré-requisito gastam –1 PM (mínimo 1).' },
    { nome: 'Obstinado', custo: 1, descricao: 'Você pode gastar 1 ponto de P, H ou R (à sua escolha) como se fosse 1 Ponto de Ação. O atributo é recuperado com 8 horas de descanso.' },
    { nome: 'Paralisia', custo: 1, descricao: 'Faça um ataque e gaste 2 PM. Se vencer a defesa, em vez de sofrer dano, o alvo fica imobilizado e indefeso até o fim da cena ou até sofrer dano.' },
    { nome: 'Patrono', custo: 1, descricao: 'Você serve a uma pessoa ou organização. Ao fazer um teste de compra para algo que ajude na missão, pode gastar 1 PM para receber um Ganho. Também recebe um item consumível extra de cada raridade disponível em seu Inventário.' },
    { nome: 'Punição', custo: 1, custos: [1, 2], repetivel: true, descricao: 'Você pode impor um efeito negativo. Escolha uma desvantagem de mesmo valor. Faça um ataque e gaste 2 PM. Se vencer a defesa, o alvo sofre os efeitos da desvantagem escolhida.' },
    { nome: 'Regeneração', custo: 1, custos: [1, 2], descricao: 'Você se recupera rapidamente. 1pt: recupera 1 PV no início do seu turno. 2pt: recupera 3 PV no início do seu turno. Em testes de morte, seu resultado nunca é pior que Inconsciente.' },
    { nome: 'Resoluto', custo: 1, descricao: 'Sua determinação é inabalável. Recebe um bônus de +2 em testes envolvendo força de vontade (incluindo testes de morte). Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { nome: 'Riqueza', custo: 2, custos: [2, 4, 6], descricao: 'Você tem recursos financeiros de escala superior. 2pt: Sugoi (+1 nível, 2PM). 4pt: Kiodai (+2 níveis, 4PM). 6pt: Kami (+3 níveis, 6PM).' },
    { nome: 'Sentido', custo: 1, repetivel: true, descricao: 'Você tem um sentido melhor ou diferente que permite fazer testes de Percepção em situações impossíveis para outros.', opcoes: ['Aguçado', 'Infravisão', 'Intuição', 'Radar', 'Raio X'] },
    { nome: 'Telepata', custo: 1, descricao: 'Você pode ler ou sentir os pensamentos de outros. Pode usar um movimento e gastar 1PM para ter Ganho em um teste de perícia social ou prever movimentos em combate.' },
    { nome: 'Teleporte', custo: 1, descricao: 'Você pode usar um movimento e gastar PM para se deslocar até qualquer lugar que possa ver. 1 PM por passo de distância. Também pode gastar 3PM para ter Ganho de defesa contra um ataque.' },
    { nome: 'Torcida', custo: 1, descricao: 'Quando uma torcida está presente, você tem +1D (Ganho) por rodada, em qualquer teste que quiser.' },
    { nome: 'Transformação', custo: 1, custos: [1, 2], repetivel: true, descricao: 'Você pode mudar de forma e poderes. 1pt: os efeitos de todas as desvantagens são combinados. 2pt: cada forma sofre apenas os efeitos de suas próprias desvantagens.' },
    { nome: '+Vida', custo: 1, repetivel: true, descricao: 'Você recebe +10 Pontos de Vida (PV) para cada vez que compra esta vantagem.' },
    { nome: 'Vigoroso', custo: 1, descricao: 'Você é robusto. Recebe um bônus de +2 em testes envolvendo saúde física (incluindo testes de morte). Este bônus é somado ao resultado final do teste. Você também pode gastar 2 PM para conseguir um acerto crítico com 5 ou 6 nesses testes.' },
    { nome: 'Voo', custo: 1, descricao: 'Você pode voar. Levantar voo em combate usa um movimento e custa 2 PM. Voar ignora terreno difícil.' },
];

export const desvantagens = [
    { nome: 'Ambiente', custo: -1, descricao: 'Você é mais acostumado a um certo ambiente. No início de cada cena, role 1D. Com um resultado 1, você tem -1D (Perda) em todos os testes.' },
    { nome: 'Amnésia', custo: -2, descricao: 'Você não sabe quem é. O mestre cria sua ficha em segredo, e você descobre suas próprias perícias, vantagens e desvantagens durante o jogo.' },
    { nome: 'Antipático', custo: -1, descricao: 'Você não consegue (ou não quer) se expressar bem. Em testes de Poder envolvendo interação social, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Assombrado', custo: -1, custos: [-1, -2], descricao: 'Você é assombrado por algo que tira sua concentração. -1pt: Ao entrar em combate ou cena de ação, role 1D. Com resultado 1, todos os seus testes têm Perda. -2pt: A Perda ocorre com qualquer resultado ímpar.' },
    { nome: 'Atrapalhado', custo: -1, descricao: 'Você se atrapalha com facilidade. Em testes de Habilidade envolvendo coordenação e agilidade, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Aura', custo: -1, custos: [-1, -2], descricao: 'Você emana uma aura pesada. -1pt: Testes de outros Perto de você têm Perda. -2pt: O efeito se estende para Longe.' },
    { nome: 'Bateria', custo: -1, descricao: 'Você tem uma reserva de energia. Sempre que ficar com 0 PM, você "desliga", ficando inconsciente. Quando está com pouco PM (abaixo de sua Habilidade), todos os seus testes têm -1D (Perda).' },
    { nome: 'Código', custo: -1, repetivel: true, descricao: 'Você segue um código de conduta. Sempre que o violar, você fica com -1D (Perda) em todos os testes até conseguir se redimir.', opcoes: ['1ª Lei de Asimov', '2ª Lei de Asimov', 'Código do Caçador', 'Código do Combate', 'Código da Derrota', 'Código da Gratidão', 'Código dos Heróis', 'Código da Honestidade', 'Código da Redenção'] },
    { nome: 'Dependência', custo: -2, descricao: 'Você depende de algo raro ou desumano para viver. Todos os dias que não satisfizer sua dependência, você tem -1D (Perda) em todos os testes.' },
    { nome: 'Diferente', custo: -1, descricao: 'Seu corpo é muito diferente de um corpo humanoide comum. Você tem problemas para usar as armas, roupas, equipamentos, máquinas e veículos disponíveis — pode usar apenas aqueles feitos especialmente para você.' },
    { nome: 'Elo Vital', custo: -1, descricao: 'Escolha um aliado que também deve ter esta desvantagem. Sempre que um de vocês sofre dano, o outro também perde PV na mesma quantidade.' },
    { nome: 'Fracote', custo: -1, descricao: 'Você é fraco. Ao fazer um teste de Poder envolvendo esforço físico, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Frágil', custo: -1, descricao: 'Você tem pouco vigor físico. Ao fazer um teste de Resistência envolvendo saúde física, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Fraqueza', custo: -1, custos: [-1, -2], descricao: 'Você é vulnerável a um objeto, elemento ou condição. Enquanto estiver Perto dessa coisa, todos os seus testes têm -1D (Perda). O custo depende de quão comum é a fonte da fraqueza (-1pt para incomum, -2pt para comum).' },
    { nome: 'Fúria', custo: -2, descricao: 'Sempre que você sofre dano ou fica irritado, deve fazer um teste de Resistência. Se falhar, você entra em frenesi. Durante a Fúria, todos os seus testes que não sejam de ataque têm -1D (Perda) e suas vantagens gastam o dobro de PM.' },
    { nome: 'Inapto', custo: -1, repetivel: true, requerPericia: true, descricao: 'Escolha uma perícia que você não possui. Você é incompetente nela. Sempre que fizer um teste com essa perícia, você está em -1D (Perda) e qualquer falha é considerada uma falha crítica.' },
    { nome: 'Inculto', custo: -1, descricao: 'Você não tem familiaridade com a cultura local e tem dificuldade de comunicação. Testes sociais com personagens que não o entendem têm -1D (Perda).' },
    { nome: 'Indeciso', custo: -1, descricao: 'Você tem pouca convicção. Em testes de Resistência envolvendo força de vontade, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Infame', custo: -1, descricao: 'Você é muito conhecido, mas não por uma boa razão. Em testes sociais com NPCs que o reconhecem, você está sempre em -1D (Perda).' },
    { nome: 'Lento', custo: -1, descricao: 'Você se move devagar. Em testes de Iniciativa, você está sempre em -1D (Perda). Você também gasta um movimento a mais para cruzar cada distância.' },
    { nome: 'Maldição', custo: -1, custos: [-1, -2], descricao: 'Você é vítima de uma maldição. -1pt: a maldição é suave e irritante. -2pt: a maldição é grave e desafiadora.' },
    { nome: 'Monstruoso', custo: -1, descricao: 'Sua aparência grotesca causa repulsa. Você sempre tem -1D (Perda) em testes de iniciativa (exceto surpresa) e em testes sociais que envolvem aparência.' },
    { nome: 'Munição', custo: -1, descricao: 'Sua arma ou técnica exige recarga. Sempre que ataca, você precisa usar um movimento para recarregar. Se atacar sem recarregar, você não soma seu Poder ao teste de ataque.' },
    { nome: 'Pacifista', custo: -1, custos: [-1, -2], descricao: 'Você rejeita conflito. -1pt: não faz testes de ataque. -2pt: não faz nada que cause dano.' },
    { nome: 'Pobreza', custo: -1, descricao: 'Você não tem recursos financeiros. Todos os seus testes de compra são feitos com -1D (Perda).' },
    { nome: 'Ponto Fraco', custo: -1, descricao: 'Você tem uma vulnerabilidade explorável. Um adversário que conheça seu Ponto Fraco pode gastar 1 PM para receber +1D (Ganho) contra você.' },
    { nome: 'Protegido', custo: -1, descricao: 'Existe alguém que você precisa proteger. Sempre que o Protegido está em perigo, todos os seus testes têm -1D (Perda).' },
    { nome: 'Restrição', custo: -1, custos: [-1, -2], descricao: 'Certa condição dobra o custo em PM de suas vantagens. O custo depende de quão comum é a restrição (-1pt para incomum, -2pt para comum).' },
    { nome: 'Sem Vida', custo: -2, descricao: 'Você não é um ser vivo. Você não recupera PV de formas normais. Apenas pode ser consertado com perícias como Máquinas ou Mística. Em testes de morte, seu resultado nunca é pior que Inconsciente.' },
    { nome: 'Tapado', custo: -1, descricao: 'Você não é muito brilhante. Em testes de Habilidade relacionados a inteligência e raciocínio, você tem -1D (Perda) e nunca consegue acertos críticos.' },
    { nome: 'Transtorno', custo: -1, repetivel: true, descricao: 'Você lida com um transtorno mental que afeta seu comportamento.', opcoes: ['Cleptomania', 'Compulsão', 'Distração', 'Fantasia', 'Fobia', 'Megalomania', 'Mitomania', 'Paranoia'] },
    { nome: 'Utensílio', custo: -1, custos: [-1, -2], descricao: 'Você precisa de um item para usar seus poderes. -1pt: sem o item, não consegue críticos com uma perícia. -2pt: sem o item, não pode usar vantagens ou técnicas que gastam PM.' },
];

export const arquetipos = [
    { nome: 'Humano', custo: 0, poderes: ['Mais Além: Uma vez por cena, gaste 2PM para ter Ganho em um teste.'] },
    { nome: 'Aberrante', custo: 1, poderes: ['Deformidade: +1 no atributo de uma perícia à sua escolha.', 'Teratismo: Recebe uma Técnica Comum grátis.', 'Monstruoso (desvantagem).'], desvantagensGratuitas: ['Monstruoso'] },
    { nome: 'Abissal', custo: 1, poderes: ['Ágil (vantagem).', 'Desfavor: Gaste 3PM e uma ação para impor Perda a um alvo.', 'Infame (desvantagem).'], vantagensGratuitas: ['Ágil'], desvantagensGratuitas: ['Infame'] },
    { 
        nome: 'Alien', 
        custo: 1, 
        poderes: ['Talento: Aliens têm aptidões físicas ou mentais superiores.', 'Xenobiologia: Uma vantagem sua custa metade dos PM.', 'Inculto (desvantagem).'],
        desvantagensGratuitas: ['Inculto'],
        escolhas: [{
            id: 'alien_talento', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Forte', 'Gênio', 'Resoluto', 'Vigoroso'], mensagem: 'Como Alien, escolha seu Talento inato.'
        }]
    },
    { nome: 'Anão', custo: 1, poderes: ['Abascanto: Ganho em testes de R para evitar efeitos ruins.', 'A Ferro e Fogo: +1 em Máquinas e Sentido (Infravisão).', 'Lento (desvantagem).'], desvantagensGratuitas: ['Lento'] },
    { nome: 'Anfíbio', custo: 1, poderes: ['Imune (Anfíbio).', 'Vigoroso (vantagem).', 'Ambiente (água) (desvantagem).'], vantagensGratuitas: ['Vigoroso'], desvantagensGratuitas: ['Ambiente'] },
    { 
        nome: 'Celestial', 
        custo: 1, 
        poderes: ['Carismático (vantagem).', 'Arrebatar: Gaste 3PM e um movimento para conceder Ganho a um aliado.', 'Código: Todo celestial é guiado por um código.'],
        vantagensGratuitas: ['Carismático'],
        escolhas: [{
            id: 'celestial_codigo', tipo: 'desvantagem', nomeFiltro: 'Código', mensagem: "Como um Celestial, você deve ser guiado por um Código de Conduta."
        }]
    },
    { nome: 'Centauro', custo: 2, poderes: ['Corpo Táurico: Gaste 1PM para crítico com 5 ou 6 em testes de P físico e H para correr.', 'Vigoroso (vantagem).', 'Diferente (desvantagem).'], vantagensGratuitas: ['Vigoroso'], desvantagensGratuitas: ['Diferente'] },
    { 
        nome: 'Ciborgue', 
        custo: 2, 
        poderes: ['Construto Vivo: Pode recuperar PV normalmente e ser consertado.', 'Imune (Abiótico, Doenças, Resiliente).', 'Diretriz: Sua mente tem travas de programação.'],
        escolhas: [{
            id: 'ciborgue_diretriz', tipo: 'desvantagem', listaFiltro: ['Código', 'Transtorno'], mensagem: "Como um Ciborgue, você deve escolher uma Diretriz (Código ou Transtorno)."
        }]
    },
    { nome: 'Construto', custo: 1, poderes: ['Imune (Abiótico, Doenças, Resiliente, Sem Mente).', 'Bateria (desvantagem).', 'Sem Vida (desvantagem).'], desvantagensGratuitas: ['Bateria', 'Sem Vida'] },
    { nome: 'Dahllan', custo: 1, poderes: ['Benção da Natureza: Gaste 2PM e um movimento para Ganho em Defesa por um turno.', 'Empatia Selvagem: +1 em Animais.', 'Código Dahllan (desvantagem).'], desvantagensGratuitas: ['Código'] },
    { 
        nome: 'Elfo', 
        custo: 1, 
        poderes: ['Impecável: Elfos são elegantes.', 'Natureza Mística: +1 em Mística.', 'Frágil (desvantagem).'],
        desvantagensGratuitas: ['Frágil'],
        escolhas: [{
            id: 'elfo_impecavel', tipo: 'vantagem', listaFiltro: ['Ágil', 'Carismático', 'Gênio'], mensagem: 'Como Elfo, escolha sua característica Impecável.'
        }]
    },
    { 
        nome: 'Fada', 
        custo: 1, 
        poderes: ['Magia das Fadas: Você pode usar Magia ou Ilusão com -1PM de custo.', 'Infame (desvantagem).', 'Delicada: Escolha entre Diferente ou Frágil (desvantagem).'],
        desvantagensGratuitas: ['Infame'],
        escolhas: [
            { id: 'fada_magia', tipo: 'vantagem', listaFiltro: ['Magia', 'Ilusão'], mensagem: 'Como Fada, escolha seu dom mágico principal.' },
            { id: 'fada_delicada', tipo: 'desvantagem', listaFiltro: ['Diferente', 'Frágil'], mensagem: 'Como Fada, escolha sua delicadeza.' },
        ]
    },
    { nome: 'Fantasma', custo: 2, poderes: ['Espírito: Sempre incorpóreo, gasta PM para se tornar sólido. Imune e Sem Vida.', 'Paralisia (vantagem).', 'Devoto (desvantagem).'], vantagensGratuitas: ['Paralisia'], desvantagensGratuitas: ['Devoto', 'Sem Vida'] },
    { nome: 'Goblin', custo: 1, poderes: ['Espertalhão: +1 em Manha.', 'Subterrâneo: Sentido (Infravisão) e Ganho em testes de R contra doenças e venenos.', 'Diferente (desvantagem).'], desvantagensGratuitas: ['Diferente'] },
    { nome: 'Hynne', custo: 1, poderes: ['Atirador: Gaste 2PM para Ganho em ataques à distância.', 'Encantador: +1 em Influência.', 'Diferente (desvantagem).'], desvantagensGratuitas: ['Diferente'] },
    { 
        nome: 'Kallyanach', 
        custo: 2, 
        poderes: ['Baforada: Recebe um Ataque Especial (Área, Distante ou Potente) que custa -1PM.', 'Poder Dracônico: Dragões são poderosos.', 'Código dos Dragões (desvantagem).'],
        desvantagensGratuitas: ['Código'],
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
    { nome: 'Medusa', custo: 1, poderes: ['Carismático (vantagem).', 'Olhar Atordoante: Gaste 3PM para forçar um teste de R. Se falhar, alvo não faz ações e tem Perda na defesa por um turno.', 'Fracote (desvantagem).'], vantagensGratuitas: ['Carismático'], desvantagensGratuitas: ['Fracote'] },
    { nome: 'Minotauro', custo: 1, poderes: ['Atlético: +1 em Esporte.', 'Sentido Labiríntico: Nunca se perde e Ganho em testes de Percepção para farejar.', 'Transtorno (Fobia) (desvantagem).'], desvantagensGratuitas: ['Transtorno'] },
    { nome: 'Ogro', custo: 1, poderes: ['Destruidor: Gaste 2PM em um crítico para somar Poder mais uma vez.', 'Intimidador: Ganho em testes de Influência para intimidar.', 'Diferente (desvantagem).'], desvantagensGratuitas: ['Diferente'] },
    { nome: 'Osteon', custo: 2, poderes: ['Imune (Abiótico, Doenças, Resiliente).', 'Memória Póstuma: +1 em uma perícia à sua escolha.', 'Sem Vida (desvantagem).'], desvantagensGratuitas: ['Sem Vida'] },
    { nome: 'Qareen', custo: 2, poderes: ['Desejos: Tem a vantagem Magia. Quando lança uma magia que outra pessoa pediu, o custo diminui em -2PM.', 'Carismático (vantagem).', 'Código da Gratidão (desvantagem).'], vantagensGratuitas: ['Magia', 'Carismático'], desvantagensGratuitas: ['Código'] },
    { nome: 'Sauroide', custo: 2, poderes: ['Cascudo: Recebe Resoluto e Vigoroso.', 'Camuflagem: Ganho em testes para se esconder.', 'Fraqueza (Frio) (desvantagem).'], vantagensGratuitas: ['Resoluto', 'Vigoroso'], desvantagensGratuitas: ['Fraqueza'] },
    { 
        nome: 'Vampiro', 
        custo: 1, 
        poderes: ['Talento: Vampiros têm aptidões superiores.', 'Imortal (vantagem).', 'Fraqueza (Luz do dia) (desvantagem).'],
        vantagensGratuitas: ['Imortal'],
        desvantagensGratuitas: ['Fraqueza', 'Dependência'],
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Influência" },
          { "tipo": "pericia", "nome": "Manha" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Manha" },
          { "tipo": "pericia", "nome": "Percepção" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Manha" },
          { "tipo": "pericia", "nome": "Sobrevivência" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Resoluto" },
          { "tipo": "vantagem", "nome": "Vigoroso" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "+Mana" },
          { "tipo": "vantagem", "nome": "+Vida" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Ágil" },
          { "tipo": "vantagem", "nome": "Carismático" },
          { "tipo": "vantagem", "nome": "Gênio" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Ataque Especial" },
          { "tipo": "vantagem", "nome": "Defesa Especial" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Arte" },
          { "tipo": "pericia", "nome": "Mística" },
          { "tipo": "vantagem", "nome": "Telepata" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Arte" },
          { "tipo": "pericia", "nome": "Sobrevivência" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Ágil" },
          { "tipo": "vantagem", "nome": "Gênio" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Arte" },
          { "tipo": "pericia", "nome": "Influência" },
          { "tipo": "vantagem", "nome": "Carismático" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "pericia", "nome": "Arte" },
          { "tipo": "pericia", "nome": "Sobrevivência" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Resoluto" },
          { "tipo": "vantagem", "nome": "Vigoroso" }
        ]
      },
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Patrono" },
          { "tipo": "desvantagem", "nome": "Código" }
        ]
      }
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
      {
        "tipo": "ou", "opcoes": [
          { "tipo": "vantagem", "nome": "Ágil" },
          { "tipo": "vantagem", "nome": "Carismático" },
          { "tipo": "vantagem", "nome": "Forte" },
          { "tipo": "vantagem", "nome": "Gênio" },
          { "tipo": "vantagem", "nome": "Resoluto" },
          { "tipo": "vantagem", "nome": "Vigoroso" }
        ]
      },
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

export const qualidadesDeArtefatos = [
  { nome: 'Abençoado', custo: 10, descricao: 'Protege contra efeitos como Desgaste e Paralisia. Concede Ganho para resistir a eles.' },
  { nome: 'Acurado', custo: 20, descricao: 'Concede acerto crítico com 5 ou 6 em testes de ataque. Não pode ser combinado com Maciço.' },
  { nome: 'Amaldiçoado', custos: [-10, -20], descricao: 'O portador sofre os efeitos de uma Maldição suave (–10XP) ou grave (–20XP). O item não pode ser descartado voluntariamente.' },
  { nome: 'Aprimorado', custo: 10, repetivel: true, max: 5, descricao: 'Aumenta um atributo em +1 para uma situação específica. Custa +10XP por +1 de bônus (máx +5).' },
  { nome: 'Auspicioso', custo: 10, requerVantagem: true, descricao: 'Concede uma vantagem ao portador. O custo em XP é igual ao custo em pontos da vantagem (mínimo 10XP).' },
  { nome: 'Condutor', custo: 20, descricao: 'Todas as vantagens do portador gastam metade dos PM (arredondado para cima).' },
  { nome: 'Encantado', custo: 10, repetivel: true, max: 5, descricao: 'Concede um bônus mágico de +1 em testes de ataque (arma) ou defesa (armadura). Custo aumenta para bônus maiores.' },
  { nome: 'Espiritual', custo: 20, descricao: 'A arma ataca o espírito do alvo, causando dano em PM igual à metade do dano em PV.' },
  { nome: 'Flagelo', custo: 10, requerInimigo: true, descricao: 'Escolha um tipo de alvo como na vantagem Inimigo. A arma concede crítico com 5 ou 6 contra esse tipo.' },
  { nome: 'Fortificada', custo: 20, descricao: 'A armadura protege contra acertos críticos. Um oponente não consegue críticos contra você, exceto se ele tiver um poder que melhore o crítico. Não pode ser combinado com Leve.' },
  { nome: 'Honrado', custo: -10, requerCodigo: true, descricao: 'O artefato tem consciência e segue um Código. Se o portador violar o código, o item perde seus poderes temporariamente.' },
  { nome: 'Inteligente', custo: 10, descricao: 'O artefato é senciente e pode falar. Ele possui uma perícia à sua escolha, e você pode gastar 3PM para ter Ganho nela.' },
  { nome: 'Leve', custo: 20, descricao: 'A armadura é muito leve. Você tem críticos com 5 ou 6 em testes de defesa. Não pode ser combinado com Fortificada.' },
  { nome: 'Maciço', custo: 20, descricao: 'No primeiro acerto crítico de um ataque, você soma o Poder uma terceira vez. Não pode ser combinado com Acurado.' },
  { nome: 'Obra-Prima', custo: 10, requerPericia: true, descricao: 'Escolha uma perícia. Em testes com essa perícia, você pode gastar 3PM para ter Ganho.' },
  { nome: 'Sagrado', custo: 10, descricao: 'Se o portador seguir o Código dos Heróis, recebe um dharma uma vez por combate ou cena em um teste de ataque ou defesa.' },
  { nome: 'Venenoso', custo: 20, descricao: 'A arma é embebida em veneno. O alvo deve fazer um teste de Resistência ou sofrerá o mesmo dano novamente no próximo turno.' },
  { nome: 'Vorpal', custo: 50, descricao: 'Com um acerto crítico, você pode gastar 5PM para forçar o alvo a fazer um teste de morte imediato.' },
];