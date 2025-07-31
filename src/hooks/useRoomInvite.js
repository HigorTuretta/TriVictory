// src/hooks/useRoomInvite.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

/**
 * Hook customizado para gerenciar toda a lógica da tela de convite para uma sala.
 * Ele busca os dados da sala, verifica as permissões do usuário e fornece
 * as ações para aceitar ou recusar o convite.
 * @returns {object} Um objeto contendo o estado da sala, o status de carregamento e as funções de ação.
 */
export const useRoomInvite = () => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);

    // Efeito para buscar os dados da sala e verificar o status do usuário
    useEffect(() => {
        const fetchRoomData = async () => {
            // Se o usuário ainda não carregou, aguarda.
            if (!currentUser) return;
            
            setLoading(true);
            const roomRef = doc(db, "rooms", roomId);
            const roomSnap = await getDoc(roomRef);

            if (roomSnap.exists()) {
                const roomData = roomSnap.data();
                
                // Se o usuário já é mestre ou jogador, redireciona diretamente para a sala.
                if (roomData.masterId === currentUser.uid || (roomData.playerIds && roomData.playerIds.includes(currentUser.uid))) {
                    toast.success(`Você já está na sala "${roomData.roomName}"!`);
                    navigate(`/room/${roomId}`);
                    return;
                }

                // Caso contrário, define os dados da sala para exibir o convite.
                setRoom({ id: roomSnap.id, ...roomData });
            } else {
                toast.error("Este convite é para uma sala que não existe mais.");
                navigate('/');
            }
            setLoading(false);
        };
        
        fetchRoomData();
    }, [roomId, currentUser, navigate]);

    // Função para aceitar o convite
    const acceptInvite = async () => {
        setIsJoining(true);
        try {
            const roomRef = doc(db, "rooms", roomId);
            // Adiciona o ID do usuário ao array de jogadores no Firestore.
            await updateDoc(roomRef, {
                playerIds: arrayUnion(currentUser.uid)
            });
            toast.success("Você atendeu ao chamado!");
            navigate(`/room/${roomId}`);
        } catch (error) {
            toast.error("Houve uma falha ao tentar entrar na sala.");
            console.error("Erro ao aceitar convite: ", error);
            setIsJoining(false);
        }
    };

    // Função para recusar o convite
    const declineInvite = () => {
        toast('Você recusou o chamado... por enquanto.', { icon: '🤔' });
        navigate('/');
    };

    // Retorna o estado e as funções para o componente de UI
    return { 
        room, 
        loading, 
        isJoining, 
        acceptInvite, 
        declineInvite 
    };
};