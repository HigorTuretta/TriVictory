// src/hooks/useRollMacros.js
import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

/**
 * Hook para gerenciar as macros de rolagem de dados de um usuário.
 * Salva as macros no localStorage para persistência.
 * @returns {{macros: Array, addMacro: function, updateMacro: function, deleteMacro: function}}
 */
export const useRollMacros = () => {
    const { currentUser } = useAuth();
    const storageKey = `3det_roll_macros_${currentUser?.uid}`;
    
    // CORREÇÃO: Garante que o valor inicial seja sempre um array vazio.
    // Isso previne que 'macros' seja 'undefined'.
    const [macros, setMacros] = useLocalStorage(storageKey, []);

    const addMacro = useCallback((macroData) => {
        if (!macroData.name || !macroData.command) {
            toast.error("Nome e Comando da macro são obrigatórios.");
            return;
        }
        const newMacro = { ...macroData, id: uuidv4() };
        setMacros(prev => [...prev, newMacro]);
        toast.success(`Macro "${newMacro.name}" criada!`);
    }, [setMacros]);

    const updateMacro = useCallback((updatedMacro) => {
        setMacros(prev => prev.map(m => m.id === updatedMacro.id ? updatedMacro : m));
        toast.success(`Macro "${updatedMacro.name}" atualizada.`);
    }, [setMacros]);

    const deleteMacro = useCallback((macroId) => {
        setMacros(prev => prev.filter(m => m.id !== macroId));
        toast.error("Macro removida.");
    }, [setMacros]);

    // Garante que o retorno seja sempre um array, mesmo que o localStorage falhe.
    return { macros: macros || [], addMacro, updateMacro, deleteMacro };
}