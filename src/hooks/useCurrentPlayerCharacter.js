// src/hooks/useCurrentPlayerCharacter.js
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';

/**
 * Hook customizado que busca e retorna os dados do personagem
 * que o usuário logado vinculou na sala de jogo atual.
 * 
 * @returns {{character: object|null, loading: boolean}}
 */
export const useCurrentPlayerCharacter = () => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aguarda os dados essenciais carregarem
        if (!room || !currentUser) {
            setLoading(false);
            return;
        }

        // Encontra o vínculo entre o usuário e o personagem na sala
        const characterLink = room.characters?.find(c => c.userId === currentUser.uid);

        // Se não houver vínculo, não há personagem para buscar
        if (!characterLink?.characterId) {
            setCharacter(null);
            setLoading(false);
            return;
        }

        // Cria um listener em tempo real para o documento do personagem vinculado
        const charRef = doc(db, 'characters', characterLink.characterId);
        const unsubscribe = onSnapshot(charRef, (docSnap) => {
            if (docSnap.exists()) {
                setCharacter({ id: docSnap.id, ...docSnap.data() });
            } else {
                // O personagem pode ter sido deletado
                setCharacter(null);
                console.warn(`Personagem vinculado com ID ${characterLink.characterId} não encontrado.`);
            }
            setLoading(false);
        });

        // Limpa o listener ao desmontar ou quando as dependências mudam
        return () => unsubscribe();

    }, [room, currentUser]); // Re-executa se a sala ou o usuário mudarem

    return { character, loading };
};