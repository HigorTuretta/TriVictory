import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { moedas } from '../../data/gameData';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import { ConfirmModal } from '../../components/ConfirmModal';
import {
    PageWrapper,
    HeaderContainer,
    Title,
    SearchWrapper,
    SearchInput,
    SearchIcon,
    CharacterGrid,
    CardWrapper,
    CardBackgroundImage,
    CardGradientOverlay,
    CardContent,
    Info,
    StatusPill,
    DeleteButton,
    NewCharacterCard,
    FormTitle,
    PointsInput,
    NewCharacterButton,
} from './styles';

// --- Animações ---
const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export const CharacterSelect = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [basePoints, setBasePoints] = useState(12);
    const [showConfirmModal, setShowConfirmModal] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return;
        setLoading(true);
        const q = query(collection(db, "characters"), where("ownerId", "==", currentUser.uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const charactersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCharacters(charactersData);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar fichas: ", error);
            toast.error("Não foi possível carregar as suas fichas.");
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
            isDead: false, 
            money: { amount: 0, type: moedas[0] },
            basePoints: parseInt(basePoints, 10) || 12,
            level: 0,
            xp: { current: 0, target: 100, system: 'unit' },
            portraitImage: '',
            tokenImage: '',
            bannerPosition: 50,
            tokenBorderColor: '#7b3ff1',
            attributes: { poder: 0, habilidade: 0, resistencia: 0 },
            pv_current: 1, pm_current: 1, pa_current: 1,
            skills: [], advantages: [], disadvantages: [], inventory: [],
        };

        try {
            const docRef = await addDoc(collection(db, "characters"), newChar);
            toast.success("Nova ficha forjada com bravura!");
            navigate(`/sheet/${docRef.id}`);
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
            try {
                await deleteDoc(doc(db, "characters", showConfirmModal.id));
                toast.success(`Ficha de "${showConfirmModal.name}" enviada para o além...`);
                setShowConfirmModal(null);
            } catch (error) {
                toast.error("O além se recusou a receber a ficha. Tente novamente.");
            }
        }
    };

    const filteredCharacters = useMemo(() => {
        if (!searchTerm) {
            return characters;
        }
        return characters.filter(char => 
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [characters, searchTerm]);

    if (loading) {
        return <PageWrapper><Title>A procurar as suas Lendas...</Title></PageWrapper>;
    }

    return (
        <>
            <ConfirmModal 
                isOpen={!!showConfirmModal} 
                onClose={() => setShowConfirmModal(null)} 
                onConfirm={confirmDeletion} 
                title="Confirmar Eliminação" 
                message={`Tem a certeza que deseja apagar permanentemente a ficha de "${showConfirmModal?.name}"?`} 
            />
            <PageWrapper>
                <HeaderContainer>
                    <Title>As Minhas Lendas</Title>
                    <SearchWrapper>
                        <SearchIcon>
                            <FaSearch size={14} />
                        </SearchIcon>
                        <SearchInput 
                            type="text"
                            placeholder="Buscar por nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchWrapper>
                </HeaderContainer>

                <CharacterGrid variants={gridVariants} initial="hidden" animate="visible">
                    <NewCharacterCard as={motion.form} variants={cardVariants} layout onSubmit={handleNewCharacter}>
                        <FaPlus size={40} style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }} />
                        <FormTitle htmlFor="points">
                            Pontos Iniciais
                        </FormTitle>
                        <PointsInput 
                            id="points"
                            type="number"
                            value={basePoints}
                            onChange={(e) => setBasePoints(e.target.value)}
                            min="0"
                        />
                        <NewCharacterButton type="submit">
                            Criar Nova Ficha
                        </NewCharacterButton>
                    </NewCharacterCard>
                    <AnimatePresence>
                        {filteredCharacters.map((char) => (
                            <CardWrapper
                                key={char.id}
                                variants={cardVariants}
                                layout
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={() => navigate(`/sheet/${char.id}`)}
                                onHoverStart={() => setHoveredCard(char.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                                transition={{ duration: 0.2 }}
                            >
                                <CardBackgroundImage src={char.portraitImage || char.bannerImage || ''} />
                                <CardGradientOverlay />
                                <AnimatePresence>
                                    {char.isDead && (
                                        <StatusPill initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                            Morto
                                        </StatusPill>
                                    )}
                                </AnimatePresence>
                                <AnimatePresence>
                                    {hoveredCard === char.id && (
                                        <DeleteButton
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={(e) => handleDeleteClick(e, char)} 
                                            title="Apagar personagem"
                                        >
                                            <FaTrash />
                                        </DeleteButton>
                                    )}
                                </AnimatePresence>
                                <CardContent>
                                    <Info>
                                        <span>{char.name || 'Personagem sem nome'}</span>
                                        <small>Nível {char.level || 0} {char.archetype ? `• ${char.archetype.nome}` : ''}</small>
                                    </Info>
                                </CardContent>
                            </CardWrapper>
                        ))}
                    </AnimatePresence>

                    
                </CharacterGrid>
            </PageWrapper>
        </>
    );
};
