// src/hooks/useChat.js
import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';
import { useLocalStorage } from './useLocalStorage';

export const useChat = (isWindowOpen) => {
    const { currentUser } = useAuth();
    const { room, roomId } = useRoom();
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const storageKey = `chat_last_read_${roomId}_${currentUser.uid}`;
    const [lastReadTimestamp, setLastReadTimestamp] = useLocalStorage(storageKey, null);

    const isMaster = room?.masterId === currentUser.uid;

    useEffect(() => {
        if (!roomId) return;

        const chatRef = collection(db, 'rooms', roomId, 'chat');
        const q = query(chatRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Filtra as mensagens que o usuário atual pode ver
            const visibleMessages = allMessages.filter(msg => {
                if (isMaster) return true; // Mestre vê tudo
                return msg.recipient === 'all' || 
                       msg.recipient === 'master' ||
                       msg.recipient === currentUser.uid ||
                       msg.senderId === currentUser.uid;
            });
            
            setMessages(visibleMessages);
            
            // Lógica para contagem de não lidas
            if (!isWindowOpen) {
                const newMessages = visibleMessages.filter(msg => 
                    msg.senderId !== currentUser.uid && // Ignora as próprias mensagens
                    (!lastReadTimestamp || msg.timestamp?.toMillis() > lastReadTimestamp)
                );
                setUnreadCount(prev => prev + newMessages.length);
            }
        });

        return () => unsubscribe();
    }, [roomId, isMaster, currentUser.uid, isWindowOpen, lastReadTimestamp]);
    
    // Zera a contagem e atualiza o timestamp quando a janela é aberta
    useEffect(() => {
        if (isWindowOpen) {
            setUnreadCount(0);
            const latestTimestamp = messages.length > 0 ? messages[messages.length - 1].timestamp?.toMillis() : Date.now();
            setLastReadTimestamp(latestTimestamp);
        }
    }, [isWindowOpen, messages, setLastReadTimestamp]);


    const sendMessage = useCallback(async (text, senderName, recipient) => {
        if (!text.trim()) return;

        const chatRef = collection(db, 'rooms', roomId, 'chat');
        await addDoc(chatRef, {
            text,
            senderId: currentUser.uid,
            senderName,
            recipient, // "all", "master", ou um uid específico
            timestamp: serverTimestamp()
        });
    }, [roomId, currentUser.uid]);

    return { messages, sendMessage, unreadCount };
};