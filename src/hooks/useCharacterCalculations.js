// src/hooks/useCharacterCalculations.js
import { useMemo } from 'react';

export const useCharacterCalculations = (character) => {
    const points = useMemo(() => {
        if (!character) return { total: 10, used: 0, remaining: 10, disBonus: 0 };

        const { attributes = {}, skills = [], advantages = [], disadvantages = [], archetype, kits = [], basePoints = 12 } = character;

        const attrCost = Object.values(attributes).reduce((s, v) => s + v, 0);

        // CORREÇÃO: A função `reduce` precisa de um valor inicial (0) para funcionar corretamente com um array vazio
        // ou com o primeiro item. Sem isso, `s` (o acumulador) pode ser `undefined`, resultando em NaN.
        const skillCost = skills.reduce((s, p) => s + p.custo, 0);

        const advCost = advantages
            .filter(v => !v.fromArchetype && !v.fromClass)
            .reduce((total, v) => total + v.custo, 0);

        const disBonus = disadvantages
            .filter(d => !d.fromArchetype && !d.fromClass)
            .reduce((total, d) => total + d.custo, 0);

        const kitCost = kits.reduce((total, _, index) => total + (index + 1), 0);

        const used = attrCost + skillCost + advCost + (archetype?.custo || 0) + kitCost;
        const totalAvailable = basePoints - disBonus;

        return { total: totalAvailable, used, remaining: totalAvailable - used, disBonus: Math.abs(disBonus) };
    }, [character]);

    const resources = useMemo(() => {
        if (!character) return { pv: 1, pm: 1, pa: 1 };

        const { attributes = {}, advantages = [] } = character;
        const { poder = 0, habilidade = 0, resistencia = 0 } = attributes;

        // 1. Calcula os valores base a partir dos atributos.
        let totalPa = poder || 1;
        let totalPm = (habilidade * 5) || 1;
        let totalPv = (resistencia * 5) || 1;

        // 2. Itera sobre as vantagens e adiciona os bônus.
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

        // 3. Retorna os valores finais calculados.
        return { pa: totalPa, pm: totalPm, pv: totalPv };
    }, [character]);

    const lockedItems = useMemo(() => {
        if (!character) return new Set();

        const locked = new Set();
        // Vantagens de Arquétipo
        (character.archetype?.vantagensGratuitas || []).forEach(name => locked.add(name));
        // DESVANTAGENS de Arquétipo
        (character.archetype?.desvantagensGratuitas || []).forEach(name => locked.add(name));

        // Vantagens de Kit
        (character.kits || []).forEach(kit => {
            (kit.vantagensGratuitas || []).forEach(name => locked.add(name));
            // DESVANTAGENS de Kit
            (kit.desvantagensGratuitas || []).forEach(name => locked.add(name));
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