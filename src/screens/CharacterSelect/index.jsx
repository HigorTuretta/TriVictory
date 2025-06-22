import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { moedas } from '../../data/gameData';
import toast from 'react-hot-toast';

import { ConfirmModal } from '../../components/ConfirmModal';
import { 
    AppContainer, Title, CharacterSelectContainer, CharacterSlot, NewCharacterButton, 
    DeleteButton, NewCharacterForm, PointsInput, CharacterInfo, StatusLabel 
} from './styles';

export const CharacterSelect = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [basePoints, setBasePoints] = useState(10);
    const [showConfirmModal, setShowConfirmModal] = useState(null);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Efeito para buscar as fichas do Firestore
    useEffect(() => {
        if (!currentUser) return;
        setLoading(true);      
        // A consulta agora filtra pelo 'ownerId', garantindo que apenas as fichas
        // do próprio usuário sejam exibidas nesta tela.
        const q = query(collection(db, "characters"), where("ownerId", "==", currentUser.uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const charactersData = [];
            querySnapshot.forEach((doc) => {
                charactersData.push({ id: doc.id, ...doc.data() });
            });
            setCharacters(charactersData);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar fichas: ", error);
            toast.error("Não foi possível carregar suas fichas.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleNewCharacter = async (e) => {
        e.preventDefault();
        const newChar = {
            ownerId: currentUser.uid,
            viewers: [currentUser.uid],
            name: 'Novo Herói',
            backstory: '', 
            notes: '', 
            isDead: false, 
            money: { amount: 0, type: moedas[0] },
            basePoints: parseInt(basePoints, 10) || 12,
            level: 0,
            xp: { current: 0, target: 100, system: 'unit' },
            inventorySettings: { system: 'attribute', attribute: 'poder', multiplier: 10, fixedMax: 50 },
            archetype: null, 
            archetypeChoices: {},
            attributes: { poder: 0, habilidade: 0, resistencia: 0 },
            pv_current: 1, 
            pm_current: 1,
            pa_current: 1,
            skills: [], 
            advantages: [], 
            disadvantages: [], 
            inventory: [],
        };

        try {
            const docRef = await addDoc(collection(db, "characters"), newChar);
            toast.success("Nova ficha forjada com bravura!");
            navigate(`/sheet/${docRef.id}`, { state: { isNew: true } });
        } catch (error) {
            toast.error("Erro ao forjar a nova ficha.");
            console.error("Erro ao criar personagem: ", error);
        }
    };

    const handleDeleteClick = (e, char) => {
        e.stopPropagation();
        setShowConfirmModal(char);
    };

    const confirmDeletion = async () => {
        if (showConfirmModal) {
            if (showConfirmModal.ownerId !== currentUser.uid) {
                toast.error("Você não tem permissão para deletar esta ficha.");
                return;
            }
            try {
                await deleteDoc(doc(db, "characters", showConfirmModal.id));
                toast.success(`Ficha de "${showConfirmModal.name}" enviada para o além...`);
                setShowConfirmModal(null);
            } catch (error) {
                toast.error("O além se recusou a receber a ficha. Tente novamente.");
            }
        }
    };

    if (loading) {
        return <AppContainer><Title>Buscando suas Lendas...</Title></AppContainer>;
    }

    return (
        <>
            <ConfirmModal 
                isOpen={!!showConfirmModal} 
                onClose={() => setShowConfirmModal(null)} 
                onConfirm={confirmDeletion} 
                title="Confirmar Exclusão" 
                message={`Você tem certeza que deseja apagar permanentemente a ficha de "${showConfirmModal?.name}"?`} 
            />
            <AppContainer>
                <Title>Meus Personagens</Title>
                <CharacterSelectContainer>
                    {characters.length > 0 ? (
                        characters.map((char) => (
                            <CharacterSlot key={char.id} onClick={() => navigate(`/sheet/${char.id}`)}>
                                <CharacterInfo>
                                    <span>{char.name || 'Personagem sem nome'} (Nv. {char.level || 0})</span>
                                    {char.isDead && <StatusLabel>Morto 💀</StatusLabel>}
                                </CharacterInfo>
                                <DeleteButton onClick={(e) => handleDeleteClick(e, char)}>X</DeleteButton>
                            </CharacterSlot>
                        ))
                    ) : (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Nenhuma lenda foi forjada ainda. Crie uma nova abaixo!</p>
                    )}
                    <NewCharacterForm onSubmit={handleNewCharacter}>
                        <label htmlFor="points" style={{textAlign: 'center', marginBottom: '0.5rem', fontWeight: '500'}}>
                            Pontos Iniciais da Campanha
                        </label>
                        <PointsInput 
                            id="points"
                            type="number"
                            value={basePoints}
                            onChange={(e) => setBasePoints(e.target.value)}
                            min="0"
                        />
                        <NewCharacterButton type="submit">
                            + Criar Nova Ficha com {basePoints} Pontos
                        </NewCharacterButton>
                    </NewCharacterForm>
                </CharacterSelectContainer>
            </AppContainer>
        </>
    );
};
