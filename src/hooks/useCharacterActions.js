// src/hooks/useCharacterActions.js
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import * as gameData from '../data/gameData';

const findAdv = (name) => gameData.vantagens.find((a) => a.nome === name);
const findDis = (name) => gameData.desvantagens.find((d) => d.nome === name);

const hasReqItem = (arr = [], reqName) => arr.some((i) => i.nome === reqName);

const checkReq = (char, req) => {
    switch (req.tipo) {
        case 'atributo': return (char.attributes[req.nome.toLowerCase()] || 0) >= req.valor;
        case 'pericia': return hasReqItem(char.skills, req.nome);
        case 'vantagem': return hasReqItem(char.advantages, req.nome);
        case 'maestria': return char.advantages.some(v => v.nome === 'Maestria' && v.subOption === req.nome);
        case 'desvantagem': return hasReqItem(char.disadvantages, req.nome);
        case 'ou': return req.opcoes.some((r) => checkReq(char, r));
        default: return true;
    }
};

const unmetReqs = (char, requirements = []) => {
    const unmet = [];
    requirements.forEach(req => {
        if (!checkReq(char, req)) {
            unmet.push(req);
        }
    });
    return unmet;
};

const CONSUMABLE_EFFECTS = {
    'Cura menor': { resource: 'pv', amount: 5, toast: '+5 PV recuperados.' },
    'Cura maior': { resource: 'pv', amount: 10, toast: '+10 PV recuperados.' },
    'Energia menor': { resource: 'pm', amount: 5, toast: '+5 PM recuperados.' },
    'Energia maior': { resource: 'pm', amount: 10, toast: '+10 PM recuperados.' },
    'Adrenalina menor': { resource: 'pa', amount: 1, toast: '+1 PA recuperado.' },
};

const KEY_TO_NAME_MAP = {
    skills: 'Perícia',
    advantages: 'Vantagem',
    disadvantages: 'Desvantagem',
    inventory: 'Item',
    techniques: 'Técnica',
    kits: 'Kit'
};

export const useCharacterActions = (character, updateCharacter, resources, lockedItems, points) => {
    const [unmetClassReqs, setUnmetClassReqs] = useState([]);

    const handleAttributeChange = (attr, value) => {
        const sanitizedValue = Math.max(0, Math.min(5, value));
        updateCharacter({ attributes: { ...character.attributes, [attr]: sanitizedValue } });
    };

    const handleResourceChange = (key, value) => {
        updateCharacter({ [key]: value });
    };

    // --- LÓGICA DE ARTEFATOS CORRIGIDA ---

    const addArtifact = (artifactData) => {
        const artifacts = [...(character.artifacts || []), artifactData];
        let advantages = [...(character.advantages || [])];

        const auspiciousQuality = artifactData.qualities.find(q => q.nome === 'Auspicioso' && q.subOption);

        if (auspiciousQuality) {
            const advData = findAdv(auspiciousQuality.subOption);
            if (advData) {
                const newAdvantage = {
                    ...advData,
                    id: uuidv4(),
                    fromArtifact: artifactData.id, // Vínculo com o artefato
                    custo: 0 // Custo em pontos é zero
                };
                advantages.push(newAdvantage);
            }
        }

        updateCharacter({ artifacts, advantages });
        toast.success(`Artefato "${artifactData.name}" criado!`);
    };

    const updateArtifact = (artifactData) => {
        // 1. Atualiza a lista de artefatos
        const artifacts = (character.artifacts || []).map(a => a.id === artifactData.id ? artifactData : a);
        
        // 2. Remove qualquer vantagem previamente associada a este artefato
        let advantages = (character.advantages || []).filter(a => a.fromArtifact !== artifactData.id);
        
        // 3. Verifica a nova versão do artefato e adiciona a vantagem se existir
        const auspiciousQuality = artifactData.qualities.find(q => q.nome === 'Auspicioso' && q.subOption);
        if (auspiciousQuality) {
            const advData = findAdv(auspiciousQuality.subOption);
            if (advData) {
                const newAdvantage = {
                    ...advData,
                    id: uuidv4(),
                    fromArtifact: artifactData.id,
                    custo: 0
                };
                advantages.push(newAdvantage);
            }
        }

        updateCharacter({ artifacts, advantages });
        toast.success(`Artefato "${artifactData.name}" atualizado!`);
    };

    const removeArtifact = (artifactId) => {
        const artifactName = (character.artifacts || []).find(a => a.id === artifactId)?.name || 'Artefato';
        // 1. Remove o artefato da lista
        const artifacts = (character.artifacts || []).filter(a => a.id !== artifactId);
        // 2. Remove a vantagem associada da lista de vantagens
        const advantages = (character.advantages || []).filter(a => a.fromArtifact !== artifactId);

        updateCharacter({ artifacts, advantages });
        toast.error(`Artefato "${artifactName}" removido.`);
    };

    // --- FIM DA LÓGICA DE ARTEFATOS ---

    const addItem = (listKey, item, subOption = null, custoOverride = null) => {
        const list = character[listKey] || [];
        if (list.some(i => i.nome === item.nome && !item.repetivel)) {
            return toast.error(`${item.nome} já foi adicionado(a).`);
        }
        const finalCost = custoOverride !== null ? custoOverride : item.custo;
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

        newArchetype?.desvantagensGratuitas?.forEach(disName => {
            if (!hasReqItem(disadvantages, disName)) {
                const disData = findDis(disName);
                if (disData) disadvantages.push({ ...disData, id: uuidv4(), fromArchetype: true, custo: 0 });
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
        toast.success(`${newItem.nome}${subOption ? ` (${subOption})` : ''} definido como escolha!`);
    };

    const handleAddKit = (kitName) => {
        if (!kitName) return;
        const kitData = gameData.classes.find(c => c.nome === kitName);
        if (!kitData) return;

        const unmet = unmetReqs(character, kitData.exigencias);
        if (unmet.length > 0) {
            setUnmetClassReqs(unmet);
            return toast.error('Kit indisponível — veja os requisitos pendentes.');
        }

        const advantages = [...(character.advantages || [])];
        const disadvantages = [...(character.disadvantages || [])];

        kitData.vantagensGratuitas?.forEach(advName => {
            if (!hasReqItem(advantages, advName)) {
                const advData = findAdv(advName);
                if (advData) advantages.push({ ...advData, id: uuidv4(), fromClass: true, fromKit: kitData.nome });
            }
        });

        kitData.desvantagensGratuitas?.forEach(disName => {
            if (!hasReqItem(disadvantages, disName)) {
                const disData = findDis(disName);
                if (disData) disadvantages.push({ ...disData, id: uuidv4(), fromClass: true, fromKit: kitData.nome, custo: 0 });
            }
        });

        setUnmetClassReqs([]);
        updateCharacter({ kits: [...(character.kits || []), kitData], advantages, disadvantages });
        toast.success(`Kit "${kitData.nome}" adicionado!`);
    };

    const handleRemoveKit = (kitName) => {
        updateCharacter({
            kits: (character.kits || []).filter(k => k.nome !== kitName),
            advantages: (character.advantages || []).filter(adv => adv.fromKit !== kitName),
            disadvantages: (character.disadvantages || []).filter(dis => dis.fromKit !== kitName)
        });
        toast.success(`Kit "${kitName}" removido.`);
    };

    const checkTechniqueRequirements = useCallback((technique) => {
        const requirements = technique.requisitos || [];
        const unmet = unmetReqs(character, requirements);
        return { meets: unmet.length === 0, unmet };
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
        addArtifact,
        updateArtifact,
        removeArtifact
    };
};