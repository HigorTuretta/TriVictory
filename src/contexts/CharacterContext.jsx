// src/contexts/CharacterContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import _ from 'lodash';
import { useCharacterCalculations, useCharacterActions } from '../hooks';

const CharacterContext = createContext();

export const CharacterProvider = ({ children, characterId }) => {
    const { currentUser } = useAuth();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Função de atualização com debounce para o Firestore
    const debouncedUpdate = useCallback(_.debounce((id, data) => {
        if (id) {
            updateDoc(doc(db, 'characters', id), data);
        }
    }, 800), []);
    
    // Função de atualização local e remota
    const updateCharacter = (patch) => {
        setCharacter(prev => {
            if (!prev) return null;
            const nextState = { ...prev, ...patch };
            debouncedUpdate(prev.id, patch);
            return nextState;
        });
    };

    // Efeito para carregar os dados do personagem
    useEffect(() => {
        if (!characterId || !currentUser?.uid) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const unsub = onSnapshot(doc(db, 'characters', characterId), (snap) => {
            if (!snap.exists()) {
                toast.error('Ficha não encontrada.');
                setLoading(false);
                return;
            }
            const data = snap.data();
            if (!data.viewers?.includes(currentUser.uid)) {
                toast.error('Sem permissão para ver esta ficha.');
                setLoading(false);
                return;
            }
            setCharacter({ id: snap.id, ...data });
            setLoading(false);
        });
        return () => unsub();
    }, [characterId, currentUser?.uid]);

    // O valor do contexto agora é apenas o estado base.
    // Os cálculos e ações serão adicionados no hook 'useCharacter'.
    const contextValue = {
        character,
        loading,
        isEditing,
        setIsEditing,
        updateCharacter,
    };

    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
};

// --- Hook Principal que os Componentes irão Consumir ---
// Ele une o contexto base com os hooks de cálculo e ações.
export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (context === undefined) {
        throw new Error('useCharacter deve ser usado dentro de um CharacterProvider');
    }
    
    const { character, updateCharacter } = context;
    
   const { points, resources, lockedItems, itemCounts } = useCharacterCalculations(character);
    
    // CORREÇÃO: Passa o objeto 'points' para o hook de ações.
    const actions = useCharacterActions(character, updateCharacter, resources, lockedItems, points);

    return {
        ...context,
        points,
        resources,
        lockedItems,
        itemCounts,
        ...actions,
    };
};