// src/hooks/useRoomMembers.js
import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoom } from '../contexts/RoomContext';

/**
 * Hook para buscar os perfis de todos os membros (mestre e jogadores) de uma sala.
 * @returns {{members: Array, loading: boolean}}
 */
export const useRoomMembers = () => {
    const { room } = useRoom();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const memberIds = useMemo(() => {
        if (!room) return [];
        return [room.masterId, ...(room.playerIds || [])];
    }, [room]);

    useEffect(() => {
        if (memberIds.length === 0) {
            setLoading(false);
            return;
        }

        const fetchMembers = async () => {
            setLoading(true);
            const usersRef = collection(db, 'users');
            // Firestore limita 'in' a 30 IDs, o que é suficiente para uma sala de RPG.
            const q = query(usersRef, where('uid', 'in', memberIds));
            const querySnapshot = await getDocs(q);
            const membersData = querySnapshot.docs.map(doc => doc.data());
            setMembers(membersData);
            setLoading(false);
        };

        fetchMembers();
    }, [memberIds]);

    return { members, loading };
};