// Este arquivo mapeia cada tipo de ação aos atributos e perícias correspondentes.
// A quantidade de dados para ações de personagem será calculada dinamicamente.

export const rollActions = {
    // Rolagens Baseadas em Ações de Personagem
    ATAQUE: { label: 'Ataque', attribute: 'poder', skill: 'Luta' },
    DEFESA: { label: 'Defesa', attribute: 'resistencia', skill: 'Luta' },
    ESQUIVA: { label: 'Esquiva', attribute: 'habilidade', skill: 'Luta' },
    INICIATIVA: { label: 'Iniciativa', attribute: 'habilidade', skill: 'Luta' },
    INVESTIGAR: { label: 'Investigação', attribute: 'habilidade', skill: 'Percepção' },
    CONVENCER: { label: 'Convencer', attribute: 'poder', skill: 'Influência' },
    CONHECIMENTO: { label: 'Conhecimento', attribute: 'habilidade', skill: 'Saber' },
    
    // Testes Puros
    TESTE_PODER: { label: 'Teste de Poder', attribute: 'poder', skill: null },
    TESTE_HABILIDADE: { label: 'Teste de Habilidade', attribute: 'habilidade', skill: null },
    TESTE_RESISTENCIA: { label: 'Teste de Resistência', attribute: 'resistencia', skill: null },
    
    // Rolagens Simples (com contagem de dados fixa)
    D1: { label: '1d6', attribute: null, skill: null, diceCount: 1 },
    D2: { label: '2d6', attribute: null, skill: null, diceCount: 2 },
    D3: { label: '3d6', attribute: null, skill: null, diceCount: 3 },
};
