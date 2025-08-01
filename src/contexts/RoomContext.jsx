// src/contexts/RoomContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import _ from 'lodash';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateRoom = useCallback(_.debounce((data) => {
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
                    toast.error("Acesso negado.");
                    setError("Acesso negado.");
                    return navigate('/rooms');
                }
                
                // CORREÇÃO: Espalha os dados primeiro e depois aplica os valores padrão.
                // Isso garante que os defaults não sejam sobrescritos por 'undefined'.
                const validatedData = {
                    ...data,
                    scenes: data.scenes || [],
                    tokens: data.tokens || [],
                    initiative: data.initiative || { order: [], currentIndex: -1, isRunning: false },
                    activeSceneId: data.activeSceneId || null,
                    fogOfWar: data.fogOfWar || {},
                };

                setRoom({ id: snap.id, ...validatedData });
            } else {
                toast.error("Sala não encontrada.");
                setError("Sala não existe.");
                navigate('/rooms');
            }
            setLoading(false);
        }, (err) => {
            console.error("Erro ao carregar sala:", err);
            toast.error("Erro ao carregar dados da sala.");
            setError("Erro de conexão.");
            setLoading(false);
        });
        return () => unsubscribe();
    }, [roomId, currentUser, navigate]);
    
    const value = { room, loading, error, roomId, updateRoom };

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === undefined) throw new Error('useRoom deve ser usado dentro de um RoomProvider');
    return context;
};