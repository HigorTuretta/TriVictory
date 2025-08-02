// src/screens/Rooms/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { useUserRooms } from '../../hooks/useUserRooms';
import toast from 'react-hot-toast';
import { FaPlus, FaCrown, FaUserFriends } from 'react-icons/fa';

import { Modal } from '../../components/Modal';
import { RPGLoader } from '../../components/RPGLoader';
import {
    RoomsContainer, Header, Title, CreateRoomButton, RoomGrid,
    RoomCard, RoomName, RoomRole, Form, Input, Button, SectionHeader
} from './styles';

// --- Subcomponente: Modal de Criação de Sala ---
const CreateRoomModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("O nome da sala não pode estar vazio.");

        const masterData = {
            uid: currentUser.uid,
            nickname: currentUser.nickname || currentUser.displayName,
        };

        const newRoom = {
            roomName: name.trim(),
            masterId: currentUser.uid,
            masterNickname: currentUser.nickname || currentUser.displayName,
            playerIds: [],
            // CORREÇÃO: Adiciona o mestre à lista de membros na criação da sala
            members: [masterData],
            createdAt: serverTimestamp(),
        };

        try {
            const docRef = await addDoc(collection(db, "rooms"), newRoom);
            toast.success(`Sala "${name}" criada com sucesso!`);
            onClose();
            navigate(`/room/${docRef.id}`);
        } catch (error) {
            toast.error("Erro ao criar a sala.");
            console.error("Erro: ", error);
        }
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

// --- Subcomponente: Seção de Salas ---
const RoomSection = ({ title, icon, rooms, role }) => {
    const navigate = useNavigate();
    
    return (
        <section>
            <SectionHeader>{icon} {title}</SectionHeader>
            {rooms.length > 0 ? (
                <RoomGrid>
                    {rooms.map(room => (
                        <RoomCard key={room.id} onClick={() => navigate(`/room/${room.id}`)}>
                            <RoomName>{room.roomName}</RoomName>
                            <RoomRole>{role}</RoomRole>
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


// --- Componente Principal da Tela ---
export const Rooms = () => {
    const { masteredRooms, joinedRooms, loading } = useUserRooms();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return <RoomsContainer><RPGLoader /></RoomsContainer>;
    }

    return (
        <>
            <CreateRoomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <RoomsContainer>
                <Header>
                    <Title>Suas Salas de Jogo</Title>
                    <CreateRoomButton onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Criar Nova Sala
                    </CreateRoomButton>
                </Header>
                
                <RoomSection title="Salas que eu Mestro" icon={<FaCrown />} rooms={masteredRooms} role="Mestre" />
                <RoomSection title="Salas que eu Jogo" icon={<FaUserFriends />} rooms={joinedRooms} role="Jogador" />
            </RoomsContainer>
        </>
    );
};