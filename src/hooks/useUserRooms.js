// src/hooks/useUserRooms.js
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook customizado para buscar em tempo real as salas de jogo de um usuário.
 * Ele separa as salas em duas listas: aquelas que o usuário mestra e
 * aquelas das quais ele participa como jogador.
 * 
 * @returns {object} Um objeto contendo:
 * - `masteredRooms` {Array}: Lista de salas que o usuário mestra.
 * - `joinedRooms` {Array}: Lista de salas que o usuário joga.
 * - `loading` {boolean}: True enquanto os dados iniciais estão sendo carregados.
 */
export const useUserRooms = () => {
    const { currentUser } = useAuth();
    const [masteredRooms, setMasteredRooms] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Se não houver usuário logado, não há nada a fazer.
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }

        setLoading(true);

        // Query para buscar as salas que o usuário atual MESTRA, ordenadas pela criação.
        const masterQuery = query(
            collection(db, "rooms"), 
            where("masterId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        // Query para buscar as salas em que o usuário atual é um JOGADOR, ordenadas pela criação.
        const playerQuery = query(
            collection(db, "rooms"), 
            where("playerIds", "array-contains", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        // Inicia o listener para as salas do mestre.
        const unsubscribeMaster = onSnapshot(masterQuery, (snapshot) => {
            const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMasteredRooms(roomsData);
        });

        // Inicia o listener para as salas do jogador.
        const unsubscribePlayer = onSnapshot(playerQuery, (snapshot) => {
            const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJoinedRooms(roomsData);
            // Considera o carregamento inicial concluído após a segunda query retornar.
            setLoading(false);
        });
        
        // Função de limpeza: remove os listeners quando o componente é desmontado
        // ou quando o usuário muda, para evitar vazamentos de memória.
        return () => {
            unsubscribeMaster();
            unsubscribePlayer();
        };
    }, [currentUser]); // O efeito re-executa se o usuário mudar (login/logout).

    return { masteredRooms, joinedRooms, loading };
};