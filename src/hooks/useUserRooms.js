// src/hooks/useUserRooms.js
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export const useUserRooms = () => {
    const { currentUser } = useAuth();
    const [masteredRooms, setMasteredRooms] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }

        setLoading(true);

        // CORREÇÃO: Removido orderBy("createdAt") para evitar erro de índice no Firestore com 'array-contains'.
        const masterQuery = query(collection(db, "rooms"), where("masterId", "==", currentUser.uid));
        const playerQuery = query(collection(db, "rooms"), where("playerIds", "array-contains", currentUser.uid));

        const unsubscribeMaster = onSnapshot(masterQuery, (snapshot) => {
            setMasteredRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubscribePlayer = onSnapshot(playerQuery, (snapshot) => {
            setJoinedRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        
        return () => {
            unsubscribeMaster();
            unsubscribePlayer();
        };
    }, [currentUser]);

    return { masteredRooms, joinedRooms, loading };
};