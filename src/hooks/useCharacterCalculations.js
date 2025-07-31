// src/hooks/useCharacterCalculations.js
import { useMemo } from 'react';
import * as gameData from '../data/gameData';

/**
 * Hook customizado para calcular todos os dados derivados de um personagem.
 * @param {object} character - O objeto completo do personagem.
 * @returns {object} - Um objeto contendo points, resources, lockedItems e itemCounts.
 */
export const useCharacterCalculations = (character) => {
    const points = useMemo(() => {
        if (!character) return { total: 12, used: 0, remaining: 12, disBonus: 0 };

        const { attributes = {}, skills = [], advantages = [], disadvantages = [], archetype, kits = [], basePoints = 12 } = character;

        const attrCost = Object.values(attributes).reduce((s, v) => s + v, 0);
        const skillCost = skills.reduce((s, p) => s + p.custo, 0);
        const advCost = advantages.filter(v => !v.fromArchetype && !v.fromClass).reduce((s, v) => s + v.custo, 0);
        const disBonus = disadvantages.filter(d => !d.fromArchetype && !d.fromClass).reduce((s, d) => s + d.custo, 0);
        const kitCost = kits.reduce((total, _, index) => total + (index + 1), 0);
        
        const used = attrCost + skillCost + advCost + (archetype?.custo || 0) + kitCost;
        const totalAvailable = basePoints - disBonus;

        return { total: totalAvailable, used, remaining: totalAvailable - used, disBonus: Math.abs(disBonus) };
    }, [character]);

    const resources = useMemo(() => {
        if (!character) return { pv: 1, pm: 1, pa: 1 };

        const { poder = 0, habilidade = 0, resistencia = 0 } = character.attributes || {};
        return { pa: poder || 1, pm: habilidade * 5 || 1, pv: resistencia * 5 || 1 };
    }, [character]);

    const lockedItems = useMemo(() => {
        if (!character) return new Set();

        const locked = new Set();
        (character.archetype?.vantagensGratuitas || []).forEach(name => locked.add(name));
        (character.kits || []).forEach(kit => {
            (kit.vantagensGratuitas || []).forEach(name => locked.add(name));
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