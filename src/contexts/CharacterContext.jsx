// src/contexts/CharacterContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import _ from 'lodash';
import { useCharacterCalculations, useCharacterActions } from '../hooks';
import toast from 'react-hot-toast'; // Importar toast para mensagens de erro

const CharacterContext = createContext();

export const CharacterProvider = ({ children, characterId }) => {
    const { currentUser } = useAuth();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const debouncedUpdate = useCallback(_.debounce((id, data) => {
        if (id) {
            updateDoc(doc(db, 'characters', id), data);
        }
    }, 800), []);
    
    const updateCharacter = (patch) => {
        setCharacter(prev => {
            if (!prev) return null;
            const nextState = { ...prev, ...patch };
            // Apenas o dono pode persistir alterações
            if (prev.ownerId === currentUser?.uid) {
                debouncedUpdate(prev.id, patch);
            }
            return nextState;
        });
    };

    useEffect(() => {
        if (!characterId) {
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
            const isOwner = data.ownerId === currentUser?.uid;
            const isViewer = data.viewers?.includes(currentUser?.uid);

            // --- CORREÇÃO APLICADA AQUI ---
            // Verifica as condições de acesso: pública, dono ou viewer.
            if (data.isPublic || isOwner || isViewer) {
                setCharacter({ id: snap.id, ...data });
                // Desabilita o modo de edição se o usuário não for o dono.
                if (!isOwner) {
                    setIsEditing(false);
                }
            } else {
                toast.error('Sem permissão para ver esta ficha.');
                setCharacter(null);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [characterId, currentUser?.uid]);

    const contextValue = {
        character,
        loading,
        isEditing,
        setIsEditing,
        updateCharacter,
        isOwner: character?.ownerId === currentUser?.uid, // Adiciona flag de posse
    };

    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (context === undefined) {
        throw new Error('useCharacter deve ser usado dentro de um CharacterProvider');
    }
    
    const { character, updateCharacter, points: externalPoints } = context;

    const { points, resources, lockedItems, itemCounts } = useCharacterCalculations(character);
    
    // A função de ações agora recebe 'points' para a validação de custo
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