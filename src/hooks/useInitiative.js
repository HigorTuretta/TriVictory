// src/hooks/useInitiative.js
import { useCallback, useMemo } from 'react';
import { useRoom } from '../contexts/RoomContext';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export const useInitiative = () => {
    const { room, updateRoom } = useRoom();

    // CORREÇÃO: Adiciona uma guarda de segurança. Se a sala não estiver carregada,
    // retorna um estado padrão vazio e seguro.
    if (!room) {
        return {
            initiativeOrder: [],
            currentIndex: -1,
            isRunning: false,
            addToInitiative: () => {},
            removeFromInitiative: () => {},
            nextTurn: () => {},
            resetInitiative: () => {},
        };
    }

    const initiative = useMemo(() => {
        const defaults = { order: [], currentIndex: -1, isRunning: false };
        return { ...defaults, ...room.initiative };
    }, [room.initiative]);

    const addToInitiative = useCallback((entity, rollResult) => {
        const currentOrder = initiative.order || [];

        if (currentOrder.some(item => item.tokenId === entity.tokenId)) {
            toast.error(`"${entity.name}" já está na ordem de iniciativa.`);
            return;
        }

        const newItem = {
            id: uuidv4(),
            tokenId: entity.tokenId,
            name: entity.name,
            type: entity.type,
            initiative: rollResult,
        };

        const newOrder = [...currentOrder, newItem].sort((a, b) => b.initiative - a.initiative);
        
        updateRoom({ initiative: { ...initiative, order: newOrder, isRunning: true } });
        toast.success(`"${entity.name}" rolou ${rollResult} e entrou na iniciativa!`);

    }, [initiative, updateRoom]);

    const removeFromInitiative = useCallback((itemId) => {
        const newOrder = (initiative.order || []).filter(item => item.id !== itemId);
        updateRoom({ initiative: { ...initiative, order: newOrder } });
    }, [initiative, updateRoom]);

    const nextTurn = useCallback(() => {
        const order = initiative.order || [];
        if (order.length === 0) return;
        
        const nextIndex = (initiative.currentIndex + 1) % order.length;
        updateRoom({ initiative: { ...initiative, currentIndex: nextIndex, isRunning: true } });
    }, [initiative, updateRoom]);
    
    const resetInitiative = useCallback(() => {
        updateRoom({ initiative: { order: [], currentIndex: -1, isRunning: false } });
        toast.error("Ordem de iniciativa reiniciada.");
    }, [updateRoom]);

    return {
        initiativeOrder: initiative.order,
        currentIndex: initiative.currentIndex,
        isRunning: initiative.isRunning,
        addToInitiative,
        removeFromInitiative,
        nextTurn,
        resetInitiative
    };
};