import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { moedas } from '../../data/gameData';
import toast from 'react-hot-toast';
import {
    FaTrash,
    FaPlus,
    FaSearch,
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import deathCharAnimation from '../../assets/lotties/deathChar.json';
import { RPGLoader } from '../../components/RPGLoader';
// ✅ Imagem padrão local
import HeroPlaceholder from '../../assets/HeroPlaceholder.png';

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
    PaginationContainer,
    PageButton,
    PageIndicator,
    DeathLottie
} from './styles';

/* ------------------ Animações ------------------ */
const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

const ITEMS_PER_PAGE = 9;

export const CharacterSelect = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [basePoints, setBasePoints] = useState(10);
    const [showConfirmModal, setShowConfirmModal] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    /* ----------- Carregar fichas do Firestore ----------- */
    useEffect(() => {
        if (!currentUser) return;
        setLoading(true);

        const q = query(
            collection(db, 'characters'),
            where('ownerId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                setCharacters(data);
                setLoading(false);
            },
            (err) => {
                console.error('Erro ao buscar fichas: ', err);
                toast.error('Não foi possível carregar as suas fichas.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    /* -------------- Criar nova ficha -------------- */
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
            portraitImage:
                'https://res.cloudinary.com/ddhx9gcct/image/upload/v1751141269/nxp9picc2ipcob0e4vnq.jpg',
            tokenImage:
                'https://res.cloudinary.com/ddhx9gcct/image/upload/v1751141269/sizepmrpwvfvpqmwugln.jpg',
            bannerPosition: 13,
            tokenBorderColor: '#888888',
            attributes: { poder: 0, habilidade: 0, resistencia: 0 },
            pv_current: 1,
            pm_current: 1,
            pa_current: 1,
            skills: [],
            advantages: [],
            disadvantages: [],
            inventory: []
        };

        try {
            const docRef = await addDoc(collection(db, 'characters'), newChar);
            toast.success('Nova ficha forjada com bravura!');
            navigate(`/sheet/${docRef.id}`);
        } catch (err) {
            console.error('Erro ao criar personagem: ', err);
            toast.error('Erro ao forjar a nova ficha.');
        }
    };

    /* -------------- Excluir ficha -------------- */
    const handleDeleteClick = (e, char) => {
        e.stopPropagation();
        setShowConfirmModal(char);
    };

    const confirmDeletion = async () => {
        if (!showConfirmModal) return;
        try {
            await deleteDoc(doc(db, 'characters', showConfirmModal.id));
            toast.success(`Ficha de "${showConfirmModal.name}" enviada para o além...`);
            setShowConfirmModal(null);
        } catch {
            toast.error('O além se recusou a receber a ficha. Tente novamente.');
        }
    };

    /* -------------- Filtrar, ordenar e resetar página -------------- */
    const filteredCharacters = useMemo(() => {
        setCurrentPage(1);

        /* Filtra pelo termo de busca (se houver) */
        let list = characters;
        if (searchTerm.trim()) {
            const t = searchTerm.toLowerCase();
            list = list.filter((c) => c.name.toLowerCase().includes(t));
        }

        /* Ordena: vivos em A-Z, depois mortos em A-Z */
        return [...list].sort((a, b) => {
            if (a.isDead === b.isDead) {
                return a.name
                    .toLocaleLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .localeCompare(
                        b.name
                            .toLocaleLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, ''),
                        'pt-BR',
                        { sensitivity: 'base' }
                    );
            }
            return a.isDead ? 1 : -1; // vivos primeiro
        });
    }, [characters, searchTerm]);

    /* -------------- Paginação -------------- */
    const paginatedCharacters = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCharacters.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCharacters, currentPage]);

    const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

    /* -------------- Loading -------------- */
    if (loading) {
        return (
            <PageWrapper>
              <RPGLoader/>
            </PageWrapper>
        );
    }

    /* --------------------- JSX --------------------- */
    return (
        <>
            {/* Modal de confirmação de exclusão */}
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

                    {/* Campo de busca */}
                    <SearchWrapper>
                        <SearchIcon>
                            <FaSearch size={14} />
                        </SearchIcon>
                        <SearchInput
                            placeholder="Buscar por nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchWrapper>
                </HeaderContainer>

                {/* Grade de personagens */}
                <CharacterGrid variants={gridVariants} initial="hidden" animate="visible">
                    {/* Card para criar nova ficha */}
                    <NewCharacterCard
                        as={motion.form}
                        variants={cardVariants}
                        layout
                        onSubmit={handleNewCharacter}
                    >
                        <FaPlus
                            size={40}
                            style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}
                        />
                        <FormTitle htmlFor="points">Pontos Iniciais</FormTitle>
                        <PointsInput
                            id="points"
                            type="number"
                            value={basePoints}
                            onChange={(e) => setBasePoints(e.target.value)}
                            min="0"
                        />
                        <NewCharacterButton type="submit">Criar Nova Ficha</NewCharacterButton>
                    </NewCharacterCard>

                    {/* Cards das fichas existentes */}
                    <AnimatePresence>
                        {paginatedCharacters.map((char) => (
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
                                <CardBackgroundImage
                                    src={char.portraitImage || char.bannerImage || HeroPlaceholder}
                                    $isDead={char.isDead}
                                />
                                <CardGradientOverlay />

                                {/* Botão excluir + lottie de morto */}
                                <AnimatePresence>
                                    {hoveredCard === char.id && (
                                        <DeleteButton
                                            key="deleteBtn"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={(e) => handleDeleteClick(e, char)}
                                            title="Apagar personagem"
                                        >
                                            <FaTrash size={26} />
                                        </DeleteButton>
                                    )}

                                    {char.isDead && (
                                        <>
                                            <DeathLottie
                                                key="deathAnim"
                                                animationData={deathCharAnimation}
                                                loop
                                                autoplay
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            />
                                            <StatusPill
                                                key="statusMorto"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                Morto
                                            </StatusPill>
                                        </>
                                    )}
                                </AnimatePresence>

                                {/* Informações do personagem */}
                                <CardContent>
                                    <Info>
                                        <span>{char.name || 'Personagem sem nome'}</span>
                                        <small>
                                            Nível {char.level || 0}
                                            {char.archetype ? ` • ${char.archetype.nome}` : ''}
                                        </small>
                                    </Info>
                                </CardContent>
                            </CardWrapper>
                        ))}
                    </AnimatePresence>
                </CharacterGrid>

                {/* Paginação */}
                {totalPages > 1 && (
                    <PaginationContainer>
                        <PageButton
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaArrowLeft size={12} /> &nbsp; Anterior
                        </PageButton>

                        <PageIndicator>
                            Página {currentPage} de {totalPages}
                        </PageIndicator>

                        <PageButton
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Próxima &nbsp; <FaArrowRight size={12} />
                        </PageButton>
                    </PaginationContainer>
                )}
            </PageWrapper>
        </>
    );
};
