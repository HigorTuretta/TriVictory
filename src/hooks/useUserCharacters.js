// src/hooks/useUserCharacters.js
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para buscar a lista de todos os personagens de um usuário em tempo real.
 * @returns {{characters: Array, loading: boolean}}
 */
export const useUserCharacters = () => {
    const { currentUser } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }
        
        // Query para buscar os personagens cujo ownerId corresponde ao UID do usuário logado
        const q = query(
            collection(db, 'characters'), 
            where('ownerId', '==', currentUser.uid)
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const charsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCharacters(charsData);
            setLoading(false);
        });

        // Limpa o listener ao desmontar
        return () => unsubscribe();
    }, [currentUser]);

    return { characters, loading };
};