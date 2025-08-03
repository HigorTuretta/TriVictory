// src/hooks/useLinkedCharactersData.js
import { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoom } from '../contexts/RoomContext';

/**
 * Hook para buscar e manter atualizados os dados completos de todas as fichas
 * de personagens que estão vinculadas a uma sala.
 */
export const useLinkedCharactersData = () => {
    const { room } = useRoom();
    const [charactersData, setCharactersData] = useState({});
    const [loading, setLoading] = useState(true);

    const characterLinks = useMemo(() => room?.characters || [], [room?.characters]);

    useEffect(() => {
        if (characterLinks.length === 0) {
            setCharactersData({});
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribers = characterLinks.map(link => {
            const charRef = doc(db, 'characters', link.characterId);
            return onSnapshot(charRef, (docSnap) => {
                if (docSnap.exists()) {
                    setCharactersData(prevData => ({
                        ...prevData,
                        [link.characterId]: { id: docSnap.id, ...docSnap.data() },
                    }));
                }
            });
        });
        
        // Define loading como false após as subscrições iniciais
        const timer = setTimeout(() => setLoading(false), 500);

        return () => {
            clearTimeout(timer);
            unsubscribers.forEach(unsub => unsub());
        };
    // Usamos uma string serializada dos IDs para uma dependência estável
    }, [JSON.stringify(characterLinks.map(c => c.characterId))]);

    return { charactersData, loading };
};