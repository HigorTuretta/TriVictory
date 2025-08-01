// src/hooks/useGrimoire.js
import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoom } from '../contexts/RoomContext';
import toast from 'react-hot-toast';

/**
 * Hook para gerenciar o grimório de inimigos de uma sala.
 * Fornece a lista de inimigos e as funções para criar, atualizar e deletar.
 * @returns {{enemies: Array, loading: boolean, addEnemy: function, updateEnemy: function, deleteEnemy: function}}
 */
export const useGrimoire = () => {
    const { roomId } = useRoom();
    const [enemies, setEnemies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Efeito para buscar os inimigos da sala em tempo real, ordenados por nome
    useEffect(() => {
        if (!roomId) {
            setLoading(false);
            return;
        }
        const enemiesColRef = collection(db, 'rooms', roomId, 'enemies');
        const q = query(enemiesColRef, orderBy('name'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const enemiesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setEnemies(enemiesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [roomId]);

    const addEnemy = useCallback(async (enemyData) => {
        if (!roomId) return;
        try {
            const enemiesColRef = collection(db, 'rooms', roomId, 'enemies');
            await addDoc(enemiesColRef, enemyData);
            toast.success(`Inimigo "${enemyData.name}" adicionado ao grimório!`);
        } catch (error) {
            console.error("Erro ao adicionar inimigo:", error);
            toast.error("Falha ao adicionar inimigo.");
        }
    }, [roomId]);

    const updateEnemy = useCallback(async (enemyId, updatedData) => {
        if (!roomId) return;
        try {
            const enemyDocRef = doc(db, 'rooms', roomId, 'enemies', enemyId);
            await updateDoc(enemyDocRef, updatedData);
            toast.success("Inimigo atualizado.");
        } catch (error) {
            console.error("Erro ao atualizar inimigo:", error);
            toast.error("Falha ao atualizar inimigo.");
        }
    }, [roomId]);

    const deleteEnemy = useCallback(async (enemyId) => {
        if (!roomId) return;
        try {
            const enemyDocRef = doc(db, 'rooms', roomId, 'enemies', enemyId);
            await deleteDoc(enemyDocRef);
            toast.error("Inimigo removido do grimório.");
        } catch (error) {
            console.error("Erro ao deletar inimigo:", error);
            toast.error("Falha ao remover inimigo.");
        }
    }, [roomId]);

    return { enemies, loading, addEnemy, updateEnemy, deleteEnemy };
};