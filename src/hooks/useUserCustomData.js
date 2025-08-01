// src/hooks/useUserCustomData.js
import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Importa os dados padrão do jogo
import * as gameData from '../data/gameData';

/**
 * Hook customizado para gerenciar os dados de jogo customizados de um usuário.
 * Ele lê/grava no localStorage, combina os dados customizados com os dados padrão
 * e fornece funções para CRUD (Create, Read, Update, Delete).
 * 
 * @returns {object} Um objeto contendo:
 * - `allData` {object}: Objeto com as listas de perícias, vantagens, etc., já combinadas.
 * - `addCustomItem` {function}: Função para adicionar um novo item customizado.
 * - `updateCustomItem` {function}: Função para atualizar um item customizado existente.
 * - `deleteCustomItem` {function}: Função para deletar um item customizado.
 */
export const useUserCustomData = () => {
    const { currentUser } = useAuth();
    
    // A chave do localStorage agora inclui o UID do usuário para garantir que os dados
    // sejam específicos para cada conta logada.
    const userPrefix = currentUser ? `3det_custom_${currentUser.uid}` : '3det_custom_guest';

    // Hooks de localStorage para cada tipo de dado customizado
    const [customSkills, setCustomSkills] = useLocalStorage(`${userPrefix}_skills`, []);
    const [customAdvantages, setCustomAdvantages] = useLocalStorage(`${userPrefix}_advantages`, []);
    const [customDisadvantages, setCustomDisadvantages] = useLocalStorage(`${userPrefix}_disadvantages`, []);
    const [customArchetypes, setCustomArchetypes] = useLocalStorage(`${userPrefix}_archetypes`, []);

    // Combina os dados padrão com os customizados do usuário, usando useMemo para performance.
    // O objeto allData só será recalculado se os dados customizados mudarem.
    const allData = useMemo(() => ({
        pericias: [...gameData.pericias, ...customSkills],
        vantagens: [...gameData.vantagens, ...customAdvantages],
        desvantagens: [...gameData.desvantagens, ...customDisadvantages],
        arquetipos: [...gameData.arquetipos, ...customArchetypes],
        // Adicione outras categorias de dados aqui se necessário (ex: tecnicas)
    }), [customSkills, customAdvantages, customDisadvantages, customArchetypes]);

    // Função para adicionar um novo item customizado.
    const addCustomItem = useCallback((type, item) => {
        const newItem = { ...item, id: uuidv4(), isCustom: true };
        
        const setters = {
            pericias: setCustomSkills,
            vantagens: setCustomAdvantages,
            desvantagens: setCustomDisadvantages,
            arquetipos: setCustomArchetypes,
        };

        const setter = setters[type];
        if (setter) {
            setter(prev => [...prev, newItem]);
        }
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    // Função para atualizar um item customizado existente.
    const updateCustomItem = useCallback((type, updatedItem) => {
        const updater = (prev) => prev.map(item => (item.id === updatedItem.id ? updatedItem : item));

        const setters = {
            pericias: setCustomSkills,
            vantagens: setCustomAdvantages,
            desvantagens: setCustomDisadvantages,
            arquetipos: setCustomArchetypes,
        };

        const setter = setters[type];
        if (setter) {
            setter(updater);
        }
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    // Função para deletar um item customizado.
    const deleteCustomItem = useCallback((type, itemToDelete) => {
        const updater = (prev) => prev.filter(item => item.id !== itemToDelete.id);
        
        const setters = {
            pericias: setCustomSkills,
            vantagens: setCustomAdvantages,
            desvantagens: setCustomDisadvantages,
            arquetipos: setCustomArchetypes,
        };

        const setter = setters[type];
        if (setter) {
            setter(updater);
        }
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    return { allData, addCustomItem, updateCustomItem, deleteCustomItem };
};