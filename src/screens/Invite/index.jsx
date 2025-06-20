import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { 
    InviteContainer, InviteBox, Title, Subtitle, InfoLine, 
    ActionsWrapper, Button 
} from './styles';

export const Invite = () => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const fetchRoomData = async () => {
            const roomRef = doc(db, "rooms", roomId);
            const roomSnap = await getDoc(roomRef);

            if (roomSnap.exists()) {
                const roomData = roomSnap.data();
                // Se o usuário já faz parte da sala, redireciona ele para lá
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

        if (currentUser) {
            fetchRoomData();
        }
    }, [roomId, currentUser, navigate]);

    const handleAcceptInvite = async () => {
        setIsJoining(true);
        const roomRef = doc(db, "rooms", roomId);
        try {
            // Adiciona o ID do usuário atual ao array de jogadores da sala
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

    const handleDeclineInvite = () => {
        toast('Você recusou o chamado... por enquanto.', { icon: '🤔' });
        navigate('/');
    };

    if (loading) {
        return <InviteContainer><Title>Verificando o pergaminho...</Title></InviteContainer>;
    }

    if (!room) {
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
                    <Button className="decline" onClick={handleDeclineInvite}>
                        Recusar Chamado
                    </Button>
                    <Button className="accept" onClick={handleAcceptInvite} disabled={isJoining}>
                        {isJoining ? 'Entrando...' : 'Atender ao Chamado'}
                    </Button>
                </ActionsWrapper>
            </InviteBox>
        </InviteContainer>
    );
};
