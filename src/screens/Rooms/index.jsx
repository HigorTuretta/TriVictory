import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaPlus, FaCrown, FaUserFriends } from 'react-icons/fa';

import { Modal } from '../../components/Modal';
import {
    RoomsContainer, Header, Title, CreateRoomButton, RoomGrid,
    RoomCard, RoomName, RoomRole, Form, Input, Button
} from './styles';

export const Rooms = () => {
    const [myRooms, setMyRooms] = useState([]); // Salas que eu mestro
    const [joinedRooms, setJoinedRooms] = useState([]); // Salas que eu jogo
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser?.uid) return;

        setLoading(true);

        const masterQuery = query(collection(db, "rooms"), where("masterId", "==", currentUser.uid));
        const unsubscribeMaster = onSnapshot(masterQuery, (snapshot) => {
            const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMyRooms(roomsData);
        });

        const playerQuery = query(collection(db, "rooms"), where("playerIds", "array-contains", currentUser.uid));
        const unsubscribePlayer = onSnapshot(playerQuery, (snapshot) => {
            const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJoinedRooms(roomsData);
        });
        
        // Timeout para garantir que as queries tenham tempo de carregar
        setTimeout(() => setLoading(false), 500);

        return () => {
            unsubscribeMaster();
            unsubscribePlayer();
        };
    }, [currentUser]);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (!newRoomName.trim()) {
            toast.error("O nome da sala não pode estar vazio.");
            return;
        }

        const newRoom = {
            roomName: newRoomName,
            masterId: currentUser.uid,
            masterNickname: currentUser.nickname || currentUser.displayName,
            playerIds: [],
            characters: [], // Array de objetos { userId, characterId }
        };

        try {
            const docRef = await addDoc(collection(db, "rooms"), newRoom);
            toast.success(`Sala "${newRoomName}" criada com sucesso!`);
            setIsModalOpen(false);
            setNewRoomName('');
            navigate(`/room/${docRef.id}`); // Navega para a nova sala
        } catch (error) {
            toast.error("Erro ao criar a sala.");
            console.error("Erro: ", error);
        }
    };

    if (loading) {
        return <RoomsContainer><Title>Buscando suas aventuras...</Title></RoomsContainer>;
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Title>Criar Nova Sala de Jogo</Title>
                <Form onSubmit={handleCreateRoom}>
                    <Input 
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Nome da Campanha (Ex: A Ameaça de K'Athanoa)"
                        required
                    />
                    <Button type="submit">Forjar Sala</Button>
                </Form>
            </Modal>

            <RoomsContainer>
                <Header>
                    <Title>Suas Salas de Jogo</Title>
                    <CreateRoomButton onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Criar Nova Sala
                    </CreateRoomButton>
                </Header>
                
                <Section title="Salas que eu Mestro" icon={<FaCrown />} rooms={myRooms} role="Mestre" navigate={navigate} />
                <Section title="Salas que eu Jogo" icon={<FaUserFriends />} rooms={joinedRooms} role="Jogador" navigate={navigate} />
            </RoomsContainer>
        </>
    );
};

const Section = ({ title, icon, rooms, role, navigate }) => {
    return (
        <div style={{marginBottom: '3rem'}}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.5rem'}}>
                {icon} {title}
            </h3>
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
                <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem'}}>Você ainda não {role === 'Mestre' ? 'mestrou nenhuma sala' : 'participou de nenhuma sala'}.</p>
            )}
        </div>
    );
}
