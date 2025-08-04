// src/hooks/useCharacterActions.js
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import * as gameData from '../data/gameData';

const findAdv = (name) => gameData.vantagens.find((a) => a.nome === name);
const hasReqItem = (arr = [], reqName) => arr.some((i) => i.nome === reqName);
const checkReq = (char, req) => {
    switch (req.tipo) {
        case 'pericia': return hasReqItem(char.skills, req.nome);
        case 'vantagem': return hasReqItem(char.advantages, req.nome);
        case 'desvantagem': return hasReqItem(char.disadvantages, req.nome);
        case 'ou': return req.opcoes.some((r) => checkReq(char, r));
        default: return true;
    }
};
const unmetReqsForClass = (char, kit) => {
    const list = [];
    kit?.exigencias?.forEach((req) => !checkReq(char, req) && list.push(req));
    return list;
};

const CONSUMABLE_EFFECTS = {
    'Cura menor': { resource: 'pv', amount: 5, toast: '+5 PV recuperados.' },
    'Cura maior': { resource: 'pv', amount: 10, toast: '+10 PV recuperados.' },
    'Energia menor': { resource: 'pm', amount: 5, toast: '+5 PM recuperados.' },
    'Energia maior': { resource: 'pm', amount: 10, toast: '+10 PM recuperados.' },
    'Adrenalina menor': { resource: 'pa', amount: 1, toast: '+1 PA recuperado.' },
};

// NOVO: Mapa de tradução para as chaves de lista.
const KEY_TO_NAME_MAP = {
    skills: 'Perícia',
    advantages: 'Vantagem',
    disadvantages: 'Desvantagem',
    inventory: 'Item',
    techniques: 'Técnica',
    kits: 'Kit'
};

export const useCharacterActions = (character, updateCharacter, resources, lockedItems) => {
    const [unmetClassReqs, setUnmetClassReqs] = useState([]);

    const handleAttributeChange = (attr, value) => {
        const sanitizedValue = Math.max(0, Math.min(5, value));
        updateCharacter({ attributes: { ...character.attributes, [attr]: sanitizedValue } });
    };

    const handleResourceChange = (key, value) => {
        updateCharacter({ [key]: value });
    };
    const addItem = (listKey, item, subOption = null, custoOverride = null) => {
        const list = character[listKey] || [];
        if (list.some(i => i.nome === item.nome && !item.repetivel)) {
            return toast.error(`${item.nome} já foi adicionado(a).`);
        }

        const finalCost = custoOverride !== null ? custoOverride : item.custo;

        // CORREÇÃO: Validação de pontos. Impede a adição se não houver pontos suficientes.
        // Desvantagens (custo negativo) sempre podem ser adicionadas.
        if (finalCost > 0 && points.remaining < finalCost) {
            return toast.error("Pontos de personagem insuficientes!");
        }

        const newItem = { ...item, id: uuidv4(), subOption, custo: finalCost };
        const itemNameSingular = KEY_TO_NAME_MAP[listKey] || 'Item';
        updateCharacter({ [listKey]: [...list, newItem] });
        toast.success(`${itemNameSingular} "${item.nome}${subOption ? ` (${subOption})` : ''}" adicionada!`);
    };

    const removeItem = (listKey, itemId) => {
        const list = character[listKey] || [];
        const targetItem = list.find(i => i.id === itemId);
        if (!targetItem) return;
        if (lockedItems.has(targetItem.nome)) {
            return toast.error('Item obrigatório por Arquétipo ou Kit não pode ser removido.');
        }

        // CORREÇÃO: Usa o mapa de tradução para a mensagem do toast.
        const itemNameSingular = KEY_TO_NAME_MAP[listKey] || 'Item';
        updateCharacter({ [listKey]: list.filter(i => i.id !== itemId) });
        toast.success(`${itemNameSingular} "${targetItem.nome}${targetItem.subOption ? ` (${targetItem.subOption})` : ''}" removida!`);
    };

    const handleArchetypeChange = (e) => {
        const newName = e.target.value;
        const newArchetype = gameData.arquetipos.find(a => a.nome === newName) || null;
        let advantages = (character.advantages || []).filter(v => !v.fromArchetype);
        let disadvantages = (character.disadvantages || []).filter(d => !d.fromArchetype);

        newArchetype?.vantagensGratuitas?.forEach(advName => {
            if (!hasReqItem(advantages, advName)) {
                const advData = findAdv(advName);
                if (advData) advantages.push({ ...advData, id: uuidv4(), fromArchetype: true });
            }
        });
        updateCharacter({ archetype: newArchetype, archetypeChoices: {}, advantages, disadvantages });
        toast.success(newArchetype ? `Arquétipo "${newArchetype.nome}" selecionado!` : 'Arquétipo removido!');
    };

    const handleMakeChoice = (choice, chosenItem, subOption = null) => {
        const newItem = { ...chosenItem, id: uuidv4(), subOption: subOption, fromArchetype: true };
        const listToUpdate = choice.tipo === 'vantagem' ? 'advantages' : 'disadvantages';

        const updates = {
            archetypeChoices: { ...character.archetypeChoices, [choice.id]: newItem },
            [listToUpdate]: [...(character[listToUpdate] || []), newItem]
        };
        updateCharacter(updates);
        toast.success(`${newItem.nome}${subOption ? ` (${subOption})` : ''} definido como escolha de arquétipo!`);
    };

    const handleAddKit = (kitName) => {
        if (!kitName) return;
        const kitData = gameData.classes.find(c => c.nome === kitName);
        if (!kitData) return;

        const unmet = unmetReqsForClass(character, kitData);
        if (unmet.length > 0) {
            setUnmetClassReqs(unmet);
            return toast.error('Kit indisponível — veja os requisitos pendentes.');
        }

        const advantages = [...(character.advantages || [])];
        kitData.vantagensGratuitas?.forEach(advName => {
            if (!hasReqItem(advantages, advName)) {
                const advData = findAdv(advName);
                if (advData) advantages.push({ ...advData, id: uuidv4(), fromClass: true, fromKit: kitData.nome });
            }
        });

        setUnmetClassReqs([]);
        updateCharacter({ kits: [...(character.kits || []), kitData], advantages });
        toast.success(`Kit "${kitData.nome}" adicionado!`);
    };

    const handleRemoveKit = (kitName) => {
        updateCharacter({
            kits: (character.kits || []).filter(k => k.nome !== kitName),
            advantages: (character.advantages || []).filter(adv => adv.fromKit !== kitName)
        });
        toast.success(`Kit "${kitName}" removido.`);
    };

    const checkTechniqueRequirements = useCallback((technique) => {
        if (!technique.requisito) return { meets: true, unmet: [] };
        const requirements = technique.requisito.split(/, | e /);
        const allCharItems = [...(character.skills || []), ...(character.advantages || []), ...(character.techniques || [])];
        const unmetReqs = [];
        requirements.forEach(req => {
            const reqLower = req.toLowerCase();
            const attrMatch = reqLower.match(/(poder|habilidade|resistencia) (\d+)/);
            if (attrMatch) {
                const [, attr, value] = attrMatch;
                if ((character.attributes[attr] || 0) < parseInt(value, 10)) unmetReqs.push(req);
                return;
            }
            if (!allCharItems.some(item => item.nome.toLowerCase() === reqLower)) unmetReqs.push(req);
        });
        return { meets: unmetReqs.length === 0, unmet: unmetReqs };
    }, [character]);

    const handleAddTechnique = (technique, variation) => {
        const currentTechniques = character.techniques || [];
        const subOption = variation ? variation.nome : null;
        if (currentTechniques.some(t => t.nome === technique.nome && t.subOption === subOption)) {
            return toast.error(`Você já possui esta técnica.`);
        }
        const newTechnique = { ...technique, id: uuidv4(), subOption, descricao: variation ? variation.descricao : technique.descricao };
        delete newTechnique.variacoes;
        updateCharacter({ techniques: [...currentTechniques, newTechnique] });
        toast.success(`Técnica "${newTechnique.nome}${subOption ? `: ${subOption}` : ''}" adicionada!`);
    };

    const handleRemoveTechnique = (techniqueId) => {
        const technique = (character.techniques || []).find(t => t.id === techniqueId);
        if (!technique) return;
        updateCharacter({ techniques: (character.techniques || []).filter(t => t.id !== techniqueId) });
        toast.success(`Técnica "${technique.nome}${technique.subOption ? `: ${technique.subOption}` : ''}" removida!`);
    };

    const handleConsume = (itemName) => {
        const inventory = [...(character.inventory || [])];
        const itemIndex = inventory.findIndex(i => i.name === itemName && i.quantity > 0);
        if (itemIndex === -1) return toast.error(`Você não tem mais "${itemName}".`);

        const effect = CONSUMABLE_EFFECTS[itemName];
        if (!effect) return;

        const { resource, amount, toast: effectToast } = effect;
        const resourceKey = `${resource}_current`;
        const maxResource = resources[resource];

        const updates = { [resourceKey]: Math.min(maxResource, (character[resourceKey] || 0) + amount) };
        inventory[itemIndex].quantity -= 1;
        updates.inventory = inventory.filter(i => i.quantity > 0);

        updateCharacter(updates);
        toast.success(`"${itemName}" consumido. ${effectToast}`);
    };

    return {
        unmetClassReqs,
        setUnmetClassReqs,
        handleAttributeChange,
        handleResourceChange,
        addItem,
        removeItem,
        handleArchetypeChange,
        handleMakeChoice,
        handleAddKit,
        handleRemoveKit,
        checkTechniqueRequirements,
        handleAddTechnique,
        handleRemoveTechnique,
        handleConsume,
    };
};