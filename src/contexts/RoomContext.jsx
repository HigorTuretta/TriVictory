// src/contexts/RoomContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const GRID_SIZE = 70;
const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    const debouncedUpdate = useCallback(_.debounce((data) => {
        if (roomId) {
            const roomRef = doc(db, 'rooms', roomId);
            updateDoc(roomRef, data).catch(err => toast.error("Falha na sincronização."));
        }
    }, 500), [roomId]);

    useEffect(() => {
        if (!roomId || !currentUser?.uid) { setLoading(false); return; }
        const roomRef = doc(db, 'rooms', roomId);
        const unsubscribe = onSnapshot(roomRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                if (data.masterId !== currentUser.uid && !data.playerIds.includes(currentUser.uid)) {
                    toast.error("Acesso negado."); return navigate('/rooms');
                }
                const validatedData = {
                    scenes: [], tokens: [], characters: [], members: [],
                    initiative: { order: [], currentIndex: -1, isRunning: false },
                    fogOfWar: {},
                    roomSettings: { playerVision: true, visionRadius: 3.5 },
                    ...data,
                };
                setRoom({ id: snap.id, ...validatedData });
            } else {
                toast.error("Sala não encontrada."); navigate('/rooms');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [roomId, currentUser, navigate]);

    // --- API de Ações do Contexto ---

    const updateRoom = (updateData) => {
        setRoom(prev => ({...prev, ...updateData}));
        debouncedUpdate(updateData);
    };
    
    // CORREÇÃO: Lógica de atualização de posição de token simplificada.
    // Como todos os tokens (jogadores e inimigos) agora vivem no array `room.tokens`,
    // não precisamos mais de uma lógica condicional.
    const updateTokenPosition = (tokenId, newPos) => {
        const updatedTokens = room.tokens.map(t => t.tokenId === tokenId ? { ...t, ...newPos } : t);
        updateRoom({ tokens: updatedTokens });
    };

    const setFogPaths = (activeSceneId, paths) => {
        if (!activeSceneId) return;
        const newFogData = { ...room.fogOfWar, [activeSceneId]: { ...room.fogOfWar?.[activeSceneId], fogPaths: paths } };
        updateRoom({ fogOfWar: newFogData });
    };

    const addToInitiative = (entity, rollResult) => {
        const currentOrder = room.initiative?.order || [];
        if (currentOrder.some(item => item.tokenId === entity.tokenId)) {
            return toast.error(`"${entity.name}" já está na ordem de iniciativa.`);
        }
        const newItem = { id: uuidv4(), tokenId: entity.tokenId, name: entity.name, type: entity.type, initiative: rollResult };
        const newOrder = [...currentOrder, newItem].sort((a, b) => b.initiative - a.initiative);
        updateRoom({ initiative: { ...room.initiative, order: newOrder, isRunning: true } });
        toast.success(`"${entity.name}" rolou ${rollResult} e entrou na iniciativa!`);
    };
    
    const value = { room, loading, roomId, updateRoom, updateTokenPosition, setFogPaths, addToInitiative };

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === undefined) throw new Error('useRoom deve ser usado dentro de um RoomProvider');
    return context;
};