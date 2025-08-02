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

    const updateRoom = useCallback(_.debounce((data) => {
        if (roomId) {
            const roomRef = doc(db, 'rooms', roomId);
            updateDoc(roomRef, data).catch(err => {
                console.error("Erro ao sincronizar com o Firestore:", err);
                toast.error("Falha na sincronização.");
            });
        }
    }, 500), [roomId]);

    useEffect(() => {
        if (!roomId || !currentUser?.uid) { setLoading(false); return; }
        setLoading(true);
        const roomRef = doc(db, 'rooms', roomId);
        const unsubscribe = onSnapshot(roomRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                if (data.masterId !== currentUser.uid && !data.playerIds.includes(currentUser.uid)) {
                    toast.error("Acesso negado."); return navigate('/rooms');
                }
                const validatedData = {
                    scenes: [], tokens: [], characters: [], initiative: { order: [], currentIndex: -1, isRunning: false }, fogOfWar: {},
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
    
    const value = { room, loading, roomId, updateRoom };

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === undefined) throw new Error('useRoom deve ser usado dentro de um RoomProvider');
    return context;
};