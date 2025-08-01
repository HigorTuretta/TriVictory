// src/hooks/useCharacterManagement.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { moedas } from '../data/gameData';
import toast from 'react-hot-toast';

const newCharacterTemplate = {
    name: 'Novo Herói', isDead: false, money: { amount: 0, type: moedas[0] }, level: 0,
    xp: { current: 0, target: 100, system: 'unit' },
    portraitImage: 'trivictory/nxp9picc2ipcob0e4vnq', // Apenas public_id
    tokenImage: 'trivictory/sizepmrpwvfvpqmwugln', // Apenas public_id
    bannerPosition: 50, tokenBorderColor: '#888888',
    attributes: { poder: 0, habilidade: 0, resistencia: 0 },
    pv_current: 1, pm_current: 1, pa_current: 1,
    skills: [], advantages: [], disadvantages: [], inventory: []
};

/**
 * Hook para gerenciar a busca, criação e exclusão de personagens de um usuário.
 */
export const useCharacterManagement = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingChar, setDeletingChar] = useState(null); // Para o modal

    // Busca os personagens do usuário em tempo real
    useEffect(() => {
        if (!currentUser?.uid) { setLoading(false); return; }
        const q = query(collection(db, 'characters'), where('ownerId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setCharacters(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        }, (err) => {
            toast.error('Não foi possível carregar suas fichas.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Função para criar um novo personagem
    const createCharacter = useCallback(async (basePoints) => {
        const newCharData = {
            ...newCharacterTemplate,
            basePoints: parseInt(basePoints, 10) || 12,
            ownerId: currentUser.uid,
            viewers: [currentUser.uid],
            createdAt: new Date(),
        };

        try {
            const docRef = await addDoc(collection(db, 'characters'), newCharData);
            toast.success('Nova ficha forjada com bravura!');
            navigate(`/sheet/${docRef.id}`);
        } catch (err) {
            toast.error('Erro ao forjar a nova ficha.');
        }
    }, [currentUser, navigate]);

    // Função para deletar um personagem
    const deleteCharacter = useCallback(async () => {
        if (!deletingChar) return;
        try {
            await deleteDoc(doc(db, 'characters', deletingChar.id));
            toast.success(`Ficha de "${deletingChar.name}" enviada para o além...`);
            setDeletingChar(null);
        } catch {
            toast.error('O além se recusou a receber a ficha. Tente novamente.');
        }
    }, [deletingChar]);

    // Filtra e ordena a lista de personagens
    const sortedCharacters = useMemo(() => {
        return [...characters].sort((a, b) => {
            if (a.isDead === b.isDead) return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
            return a.isDead ? 1 : -1;
        });
    }, [characters]);

    return {
        loading,
        sortedCharacters,
        createCharacter,
        deleteCharacter,
        deletingChar,
        setDeletingChar
    };
};