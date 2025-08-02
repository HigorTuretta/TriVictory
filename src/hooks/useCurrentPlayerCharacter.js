// src/hooks/useCurrentPlayerCharacter.js
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';
import _ from 'lodash';

export const useCurrentPlayerCharacter = () => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    const characterLink = room?.characters?.find(c => c.userId === currentUser?.uid);
    const characterId = characterLink?.characterId;

    useEffect(() => {
        if (!characterId) {
            setCharacter(null);
            setLoading(false);
            return;
        }

        const charRef = doc(db, 'characters', characterId);
        const unsubscribe = onSnapshot(charRef, (docSnap) => {
            if (docSnap.exists()) {
                setCharacter({ id: docSnap.id, ...docSnap.data() });
            } else {
                setCharacter(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [characterId]);

    // Função com debounce para atualizar os dados do personagem no Firestore
    const updateCharacter = useCallback(_.debounce((data) => {
        if (characterId) {
            const charRef = doc(db, 'characters', characterId);
            updateDoc(charRef, data);
        }
    }, 500), [characterId]);

    return { character, loading, updateCharacter };
};