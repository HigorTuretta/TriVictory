// src/hooks/useChat.js
import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast';

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

            // --- CORREÇÃO APLICADA AQUI ---
            // A lógica de filtragem foi refeita para garantir a privacidade correta.
            const visibleMessages = allMessages.filter(msg => {
                // Regra 1: O Mestre sempre vê todas as mensagens.
                if (isMaster) {
                    return true;
                }

                // Regras para os jogadores:
                const isPublic = msg.recipient === 'all';
                const isSender = msg.senderId === currentUser.uid;
                const isRecipient = msg.recipient === currentUser.uid;
                
                // O jogador vê a mensagem se:
                // - For pública (para 'all')
                // - Ele mesmo a enviou (para qualquer destinatário)
                // - Foi enviada diretamente para ele (pelo Mestre)
                // Isso implicitamente esconde mensagens de outros jogadores para o Mestre.
                return isPublic || isSender || isRecipient;
            });
            // --- FIM DA CORREÇÃO ---
            
            setMessages(visibleMessages);
            
            // Lógica para contagem de não lidas (sem alterações)
            if (!isWindowOpen) {
                const newMessages = visibleMessages.filter(msg => 
                    msg.senderId !== currentUser.uid &&
                    (!lastReadTimestamp || msg.timestamp?.toMillis() > lastReadTimestamp)
                );
                // Usamos um callback para evitar que a contagem seja resetada incorretamente
                setUnreadCount(prev => prev + newMessages.length);
            }
        });

        return () => unsubscribe();
    }, [roomId, isMaster, currentUser.uid, isWindowOpen, lastReadTimestamp]);
    
    // ... (O resto do hook: useEffect para zerar contagem e a função sendMessage permanecem os mesmos)
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
            recipient,
            timestamp: serverTimestamp()
        });
    }, [roomId, currentUser.uid]);

    const deleteMessage = useCallback(async (messageId) => {
        if (!roomId) return;
        try {
            const messageRef = doc(db, 'rooms', roomId, 'chat', messageId);
            await deleteDoc(messageRef);
            toast.success('Mensagem removida.');
        } catch (error) {
            toast.error('Não foi possível remover a mensagem.');
        }
    }, [roomId]);

     const clearChat = useCallback(async () => {
        if (!roomId) return;
        try {
            const chatRef = collection(db, 'rooms', roomId, 'chat');
            const snapshot = await getDocs(chatRef);
            
            if (snapshot.empty) {
                toast.success('O chat já está limpo!');
                return;
            }

            const batch = writeBatch(db);
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            toast.error('Histórico do chat foi limpo!');
        } catch (error) {
            toast.error('Ocorreu um erro ao limpar o chat.');
        }
    }, [roomId]);


     return { messages, sendMessage, unreadCount, deleteMessage, clearChat };
};