// src/screens/CharacterSelect/index.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterManagement } from '../../hooks/useCharacterManagement';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
import deathCharAnimation from '../../assets/lotties/deathChar.json';
import HeroPlaceholder from '../../assets/HeroPlaceholder.png';
import { RPGLoader } from '../../components/RPGLoader';
import { ConfirmModal } from '../../components/ConfirmModal';
import { getTokenImageUrl } from '../../services/cloudinaryService';
import {
    PageWrapper, HeaderContainer, Title, SearchWrapper, SearchInput, SearchIcon,
    CharacterGrid as GridContainer, CardWrapper, CardBackgroundImage, CardGradientOverlay, CardContent,
    Info, StatusPill, DeleteButton, NewCharacterCard as NewCardForm, FormTitle,
    PointsInput, NewCharacterButton, PaginationContainer, PageButton, PageIndicator, DeathLottie
} from './styles';

/* --- Animações --- */
const gridVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const cardVariants = { hidden: { opacity: 0, y: 30, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

const ITEMS_PER_PAGE = 9;

/* --- Subcomponentes de UI --- */
const CharacterSelectHeader = ({ searchTerm, onSearchChange }) => (
    <HeaderContainer>
        <Title>As Minhas Lendas</Title>
        <SearchWrapper>
            <SearchIcon><FaSearch size={14} /></SearchIcon>
            <SearchInput placeholder="Buscar por nome..." value={searchTerm} onChange={onSearchChange} />
        </SearchWrapper>
    </HeaderContainer>
);

const NewCharacterCard = ({ onCreate }) => {
    const [basePoints, setBasePoints] = useState(10);
    const handleSubmit = (e) => { e.preventDefault(); onCreate(basePoints); };
    return (
        <NewCardForm as={motion.form} variants={cardVariants} layout onSubmit={handleSubmit}>
            <FaPlus size={40} style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }} />
            <FormTitle htmlFor="points">Pontos Iniciais</FormTitle>
            <PointsInput id="points" type="number" value={basePoints} onChange={(e) => setBasePoints(e.target.value)} min="0" />
            <NewCharacterButton type="submit">Criar Nova Ficha</NewCharacterButton>
        </NewCardForm>
    );
};

const CharacterCard = ({ char, onSelect, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <CardWrapper
            variants={cardVariants} layout onClick={() => onSelect(char.id)}
            onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            transition={{ duration: 0.2 }}
        >
            <CardBackgroundImage src={getTokenImageUrl(char.tokenImage) || HeroPlaceholder} $isDead={char.isDead} />
            <CardGradientOverlay />
            <AnimatePresence>
                {isHovered && !char.isDead && (
                    <DeleteButton
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); onDelete(char); }} title="Apagar personagem"
                    ><FaTrash size={26} /></DeleteButton>
                )}
                {char.isDead && <DeathLottie animationData={deathCharAnimation} loop autoplay />}
            </AnimatePresence>
            <CardContent>
                <Info>
                    <span>{char.name || 'Personagem sem nome'}</span>
                    <small>Nível {char.level || 0} {char.archetype ? `• ${char.archetype.nome}` : ''}</small>
                </Info>
                {char.isDead && <StatusPill>Morto</StatusPill>}
            </CardContent>
        </CardWrapper>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(p => p - 1)} disabled={currentPage === 1}><FaArrowLeft size={12} />  Anterior</PageButton>
            <PageIndicator>Página {currentPage} de {totalPages}</PageIndicator>
            <PageButton onClick={() => onPageChange(p => p + 1)} disabled={currentPage === totalPages}>Próxima  <FaArrowRight size={12} /></PageButton>
        </PaginationContainer>
    );
};

/* --- Componente Principal --- */
export const CharacterSelect = () => {
    const navigate = useNavigate();
    const { loading, sortedCharacters, createCharacter, deleteCharacter, deletingChar, setDeletingChar } = useCharacterManagement();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const filteredCharacters = useMemo(() => {
        setCurrentPage(1); // Reseta a página a cada nova busca
        if (!searchTerm.trim()) return sortedCharacters;
        const term = searchTerm.toLowerCase();
        return sortedCharacters.filter(c => c.name.toLowerCase().includes(term));
    }, [sortedCharacters, searchTerm]);

    const paginatedCharacters = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCharacters.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCharacters, currentPage]);

    const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

    if (loading) {
        return <PageWrapper><RPGLoader /></PageWrapper>;
    }

    return (
        <>
            <ConfirmModal
                isOpen={!!deletingChar}
                onClose={() => setDeletingChar(null)}
                onConfirm={deleteCharacter}
                title="Confirmar Eliminação"
                message={`Tem a certeza que deseja apagar permanentemente a ficha de "${deletingChar?.name}"?`}
            />
            <PageWrapper>
                <CharacterSelectHeader searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
                <GridContainer as={motion.div} variants={gridVariants} initial="hidden" animate="visible">
                    <NewCharacterCard onCreate={createCharacter} />
                    <AnimatePresence>
                        {paginatedCharacters.map((char) => (
                            <CharacterCard
                                key={char.id}
                                char={char}
                                onSelect={(id) => navigate(`/sheet/${id}`)}
                                onDelete={setDeletingChar}
                            />
                        ))}
                    </AnimatePresence>
                </GridContainer>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </PageWrapper>
        </>
    );
};