// src/screens/Invite/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import {
    InviteContainer, InviteBox, Title, Subtitle, InfoLine,
    ActionsWrapper, Button, LoadingText
} from './styles';

// --- Hook Customizado para gerenciar a lógica do convite ---
const useRoomInvite = () => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const fetchRoomData = async () => {
            if (!currentUser) return;
            setLoading(true);
            
            const roomRef = doc(db, "rooms", roomId);
            const roomSnap = await getDoc(roomRef);

            if (roomSnap.exists()) {
                const roomData = roomSnap.data();
                if (roomData.masterId === currentUser.uid || roomData.playerIds.includes(currentUser.uid)) {
                    navigate(`/room/${roomId}`);
                    return;
                }
                setRoom({ id: roomSnap.id, ...roomData });
            } else {
                toast.error("Este convite é para uma sala que não existe mais.");
                navigate('/');
            }
            setLoading(false);
        };
        fetchRoomData();
    }, [roomId, currentUser, navigate]);

    const acceptInvite = async () => {
        setIsJoining(true);
        try {
            const roomRef = doc(db, "rooms", roomId);
            await updateDoc(roomRef, { playerIds: arrayUnion(currentUser.uid) });
            toast.success("Você atendeu ao chamado!");
            navigate(`/room/${roomId}`);
        } catch (error) {
            toast.error("Houve uma falha ao tentar entrar na sala.");
            console.error("Erro ao aceitar convite: ", error);
            setIsJoining(false);
        }
    };

    const declineInvite = () => {
        toast('Você recusou o chamado... por enquanto.', { icon: '🤔' });
        navigate('/');
    };

    return { room, loading, isJoining, acceptInvite, declineInvite };
};


// --- Componente de Apresentação ---
export const Invite = () => {
    const { room, loading, isJoining, acceptInvite, declineInvite } = useRoomInvite();

    if (loading) {
        return <InviteContainer><LoadingText>Verificando o pergaminho...</LoadingText></InviteContainer>;
    }

    if (!room) {
        // Se a sala for nula após o carregamento, significa que o usuário já foi redirecionado.
        return null;
    }

    return (
        <InviteContainer>
            <InviteBox>
                <Title>Você foi Convocado!</Title>
                <Subtitle>Um Mestre requer sua presença em uma nova aventura. Você aceita o chamado?</Subtitle>
                
                <InfoLine>
                    <strong>Campanha:</strong> {room.roomName}
                </InfoLine>
                <InfoLine>
                    <strong>Mestre:</strong> <span><FaCrown /> {room.masterNickname}</span>
                </InfoLine>

                <ActionsWrapper>
                    <Button $variant="decline" onClick={declineInvite} disabled={isJoining}>
                        Recusar Chamado
                    </Button>
                    <Button $variant="accept" onClick={acceptInvite} disabled={isJoining}>
                        {isJoining ? 'Entrando...' : 'Atender ao Chamado'}
                    </Button>
                </ActionsWrapper>
            </InviteBox>
        </InviteContainer>
    );
};