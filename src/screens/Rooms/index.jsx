// src/screens/Rooms/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { useUserRooms } from '../../hooks/useUserRooms';
import toast from 'react-hot-toast';
import { FaPlus, FaCrown, FaUserFriends, FaTrash, FaSignOutAlt } from 'react-icons/fa';

import { Modal } from '../../components/Modal';
import { ConfirmModal } from '../../components/ConfirmModal'; // Usaremos nosso modal de confirmação
import { RPGLoader } from '../../components/RPGLoader';
import {
    RoomsContainer, Header, Title, CreateRoomButton, RoomGrid,
    RoomCard, RoomInfo, RoomName, RoomRole, ActionButton, Form, Input, Button, SectionHeader
} from './styles';

const CreateRoomModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("O nome da sala não pode estar vazio.");
        const newRoom = {
            roomName: name.trim(),
            masterId: currentUser.uid,
            playerIds: [],
            createdAt: serverTimestamp(),
        };
        try {
            const docRef = await addDoc(collection(db, "rooms"), newRoom);
            toast.success(`Sala "${name}" criada com sucesso!`);
            onClose();
            navigate(`/room/${docRef.id}`);
        } catch (error) { toast.error("Erro ao criar a sala."); }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Title>Criar Nova Sala de Jogo</Title>
            <Form onSubmit={handleCreate}>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da Campanha" required />
                <Button type="submit">Forjar Sala</Button>
            </Form>
        </Modal>
    );
};

const RoomSection = ({ title, icon, rooms, role, onRequestDelete, onRequestLeave }) => {
    const navigate = useNavigate();
    return (
        <section>
            <SectionHeader>{icon} {title}</SectionHeader>
            {rooms.length > 0 ? (
                <RoomGrid>
                    {rooms.map(room => (
                        <RoomCard key={room.id}>
                            <RoomInfo onClick={() => navigate(`/room/${room.id}`)}>
                                <RoomName>{room.roomName}</RoomName>
                                <RoomRole>{role}</RoomRole>
                            </RoomInfo>
                            {role === 'Mestre' && (
                                <ActionButton $variant="delete" onClick={() => onRequestDelete(room)} title="Deletar Sala">
                                    <FaTrash />
                                </ActionButton>
                            )}
                            {role === 'Jogador' && (
                                <ActionButton $variant="leave" onClick={() => onRequestLeave(room)} title="Sair da Sala">
                                    <FaSignOutAlt />
                                </ActionButton>
                            )}
                        </RoomCard>
                    ))}
                </RoomGrid>
            ) : (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Você ainda não {role === 'Mestre' ? 'mestrou nenhuma sala' : 'participou de nenhuma sala'}.
                </p>
            )}
        </section>
    );
};

export const Rooms = () => {
    const { masteredRooms, joinedRooms, loading } = useUserRooms();
    const { currentUser } = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState({ isOpen: false, room: null, type: null });

    const handleLeaveRoom = async () => {
        const room = confirmAction.room;
        if (!room) return;
        
        const roomRef = doc(db, 'rooms', room.id);
        try {
            await updateDoc(roomRef, {
                playerIds: arrayRemove(currentUser.uid)
            });
            toast.success(`Você saiu da sala "${room.roomName}".`);
        } catch (error) {
            toast.error("Erro ao sair da sala.");
        }
        setConfirmAction({ isOpen: false, room: null, type: null });
    };

    const handleDeleteRoom = async () => {
        const room = confirmAction.room;
        if (!room) return;
        
        const roomRef = doc(db, 'rooms', room.id);
        try {
            await deleteDoc(roomRef);
            toast.error(`Sala "${room.roomName}" deletada.`);
        } catch (error) {
            toast.error("Erro ao deletar a sala.");
        }
        setConfirmAction({ isOpen: false, room: null, type: null });
    };

    if (loading) {
        return <RoomsContainer><RPGLoader /></RoomsContainer>;
    }

    const modalMessages = {
        delete: {
            title: "Deletar Sala",
            message: `Tem certeza que deseja deletar permanentemente a sala "${confirmAction.room?.roomName}"? Esta ação não pode ser desfeita.`,
            onConfirm: handleDeleteRoom,
        },
        leave: {
            title: "Sair da Sala",
            message: `Tem certeza que deseja sair da sala "${confirmAction.room?.roomName}"?`,
            onConfirm: handleLeaveRoom,
        },
    };

    return (
        <>
            <CreateRoomModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            <ConfirmModal
                isOpen={confirmAction.isOpen}
                onClose={() => setConfirmAction({ isOpen: false, room: null, type: null })}
                onConfirm={modalMessages[confirmAction.type]?.onConfirm}
                title={modalMessages[confirmAction.type]?.title}
                message={modalMessages[confirmAction.type]?.message}
            />

            <RoomsContainer>
                <Header>
                    <Title>Suas Salas de Jogo</Title>
                    <CreateRoomButton onClick={() => setIsCreateModalOpen(true)}>
                        <FaPlus /> Criar Nova Sala
                    </CreateRoomButton>
                </Header>
                
                <RoomSection 
                    title="Salas que eu Mestro" 
                    icon={<FaCrown />} 
                    rooms={masteredRooms} 
                    role="Mestre" 
                    onRequestDelete={(room) => setConfirmAction({ isOpen: true, room, type: 'delete' })}
                />
                <RoomSection 
                    title="Salas que eu Jogo" 
                    icon={<FaUserFriends />} 
                    rooms={joinedRooms} 
                    role="Jogador" 
                    onRequestLeave={(room) => setConfirmAction({ isOpen: true, room, type: 'leave' })}
                />
            </RoomsContainer>
        </>
    );
};