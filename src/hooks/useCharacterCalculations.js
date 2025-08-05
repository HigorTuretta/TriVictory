// src/hooks/useCharacterCalculations.js
import { useMemo } from 'react';

export const useCharacterCalculations = (character) => {
    const points = useMemo(() => {
        if (!character) return { total: 10, used: 0, remaining: 10, disBonus: 0 };

        const { attributes = {}, skills = [], advantages = [], disadvantages = [], archetype, kits = [], basePoints = 10 } = character;

        const attrCost = Object.values(attributes).reduce((s, v) => s + v, 0);
        
        const skillCost = skills.filter(s => !s.fromArtifact).reduce((s, p) => s + (p.custo || 0), 0);

        const advCost = advantages
            .filter(v => !v.fromArchetype && !v.fromClass && !v.fromArtifact)
            .reduce((total, v) => total + (v.custo || 0), 0);

        const disBonus = disadvantages
            .filter(d => !d.fromArchetype && !d.fromClass && !d.fromArtifact)
            .reduce((total, d) => total + (d.custo || 0), 0);

        const kitCost = kits.reduce((total, _, index) => total + (index + 1), 0);

        const used = attrCost + skillCost + advCost + (archetype?.custo || 0) + kitCost;
        const totalAvailable = basePoints - disBonus;

        return { total: totalAvailable, used, remaining: totalAvailable - used, disBonus: Math.abs(disBonus) };
    }, [character]);

    const resources = useMemo(() => {
        if (!character) return { pv: 1, pm: 1, pa: 1 };

        const { attributes = {}, advantages = [] } = character;
        const { poder = 0, habilidade = 0, resistencia = 0 } = attributes;

        let totalPa = poder || 1;
        let totalPm = (habilidade * 5) || 1;
        let totalPv = (resistencia * 5) || 1;

        advantages.forEach(vantagem => {
            switch (vantagem.nome) {
                case '+Vida':
                    totalPv += 10;
                    break;
                case '+Mana':
                    totalPm += 10;
                    break;
                case '+Ação':
                    totalPa += 2;
                    break;
                default:
                    break;
            }
        });

        return { pa: totalPa, pm: totalPm, pv: totalPv };
    }, [character]);

    const lockedItems = useMemo(() => {
        if (!character) return new Set();
        const locked = new Set();
    
        const addLock = (item) => {
            if (!item || !item.nome) return;
            if (item.subOption) {
                locked.add(`${item.nome} (${item.subOption})`);
            } else {
                locked.add(item.nome);
            }
        };
    
        (character.archetype?.vantagensGratuitas || []).forEach(addLock);
        (character.archetype?.desvantagensGratuitas || []).forEach(addLock);
    
        Object.values(character.archetypeChoices || {}).forEach(choice => {
            if (choice && choice.nome) addLock(choice);
        });
    
        (character.kits || []).forEach(kit => {
            (kit.vantagensGratuitas || []).forEach(item => addLock(typeof item === 'string' ? { nome: item } : item));
            (kit.desvantagensGratuitas || []).forEach(item => addLock(typeof item === 'string' ? { nome: item } : item));
        });
    
       // --- CORREÇÃO FINAL APLICADA AQUI ---
       // Itera sobre TODAS as listas e bloqueia itens com a flag 'fromArtifact'
       [
         ...(character.advantages || []),
         ...(character.disadvantages || []),
         ...(character.skills || [])
       ].forEach(item => {
           if (item.fromArtifact) {
               addLock(item);
           }
       });
    
        return locked;
    }, [character]);    

    const itemCounts = useMemo(() => {
        if (!character) return {};
        const counts = {};
        [
            ...(character.skills || []),
            ...(character.advantages || []),
            ...(character.disadvantages || [])
        ].forEach(item => {
            counts[item.nome] = (counts[item.nome] || 0) + 1;
        });
        return counts;
    }, [character]);

    return { points, resources, lockedItems, itemCounts };
};