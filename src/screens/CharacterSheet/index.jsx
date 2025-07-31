// src/screens/CharacterSheet/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaSave, FaSkull, FaHeartbeat } from 'react-icons/fa';
import Lottie from 'lottie-react';

// CORREÇÃO: Re-importa o useAuth que estava faltando.
import { useAuth } from '../../contexts/AuthContext'; 
import { CharacterProvider, useCharacter } from '../../contexts/CharacterContext';

// Componentes de UI
import { CharacterSheetHeader } from '../../components/CharacterSheetHeader';
import { ImageCropperModal } from '../../components/ImageCropperModal';
import { ImageLightbox } from '../../components/ImageLightbox';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { SheetLeftColumn } from '../../components/SheetLeftColumn';
import { SheetRightColumn } from '../../components/SheetRightColumn';
import { SheetFooter } from '../../components/SheetFooter';
import { ConfirmModal } from '../../components/ConfirmModal';
import { RPGLoader } from '../../components/RPGLoader';

import deathAnimation from '../../assets/lotties/deathAnimation.json';
import {
  SheetContainer, BackButton, HeaderPanel, Section, SectionTitle,
  SheetLayoutGrid, DeathAnimationOverlay, FloatingActionButton
} from './styles';

// --- Hook Customizado para gerenciar o estado da UI da Ficha ---
const useCharacterSheetUI = () => {
    const [modals, setModals] = useState({
        imageCropper: false,
        lightbox: false,
        confirmDeath: false,
        confirmResurrection: false,
    });
    const [lightboxImageUrl, setLightboxImageUrl] = useState('');

    const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
    const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));

    const openLightbox = (url) => {
        setLightboxImageUrl(url);
        openModal('lightbox');
    };

    return { modals, openModal, closeModal, lightboxImageUrl, openLightbox };
};

// --- Subcomponente: Botões Flutuantes ---
const FloatingActions = ({ isOwner, isEditing, onEditToggle, onDeathToggle, isDead }) => {
    if (!isOwner) return null;
    return (
        <>
            <FloatingActionButton
                onClick={onEditToggle}
                $isEditing={isEditing}
                title={isEditing ? 'Salvar Alterações' : 'Modo de Edição'}
            >
                {isEditing ? <FaSave /> : <FaPencilAlt />}
            </FloatingActionButton>

            {!isEditing && (
                <FloatingActionButton
                    onClick={onDeathToggle}
                    $isDead={isDead}
                    style={{ bottom: '7rem' }}
                    title={isDead ? 'Ressuscitar Personagem' : 'Marcar como Morto'}
                >
                    {isDead ? <FaHeartbeat /> : <FaSkull />}
                </FloatingActionButton>
            )}
        </>
    );
};

// --- Subcomponente: Modais da Ficha ---
const SheetModals = ({ character, modals, closeModal, openLightbox, updateCharacter }) => {
    const handleDeathConfirm = () => {
        updateCharacter({ isDead: true, pv_current: 0 });
        toast('Que seus feitos sejam lembrados.', { icon: '💀' });
        closeModal('confirmDeath');
    };

    const handleResurrectionConfirm = () => {
        const maxPv = (character.attributes.resistencia || 0) * 5 || 1;
        updateCharacter({ isDead: false, pv_current: maxPv });
        toast.success('Milagre! Personagem ressuscitado.');
        closeModal('confirmResurrection');
    };

    return (
        <>
            <ConfirmModal isOpen={modals.confirmDeath} onClose={() => closeModal('confirmDeath')} onConfirm={handleDeathConfirm} title="Confirmar Morte" message="Isso marcará o personagem como morto. Continuar?" />
            <ConfirmModal isOpen={modals.confirmResurrection} onClose={() => closeModal('confirmResurrection')} onConfirm={handleResurrectionConfirm} title="Ressuscitar Personagem" message="Deseja trazer o personagem de volta à vida?" confirmVariant="resurrect" />
            <ImageCropperModal open={modals.imageCropper} onClose={() => closeModal('imageCropper')} onDone={(data) => updateCharacter(data)} characterImage={character?.portraitImage || character?.bannerImage} />
            <ImageLightbox isOpen={modals.lightbox} onClose={() => closeModal('lightbox')} imageUrl={openLightbox.url} />
        </>
    );
};


/* --------------------- Conteúdo Principal da Tela ------------------------- */
const CharacterSheetContent = () => {
    const navigate = useNavigate();
    // CORREÇÃO: Chama o useAuth para obter o usuário logado e verificar a posse.
    const { currentUser } = useAuth();
    const { character, loading, isEditing, setIsEditing, updateCharacter, ...actions } = useCharacter();
    const { modals, openModal, closeModal, lightboxImageUrl, openLightbox } = useCharacterSheetUI();
    const [isBackstoryVisible, setIsBackstoryVisible] = useState(false);

    useEffect(() => {
        if (!loading && character?.isDead) setIsEditing(false);
    }, [loading, character, setIsEditing]);

    if (loading || !character) {
        return <RPGLoader />;
    }

    // CORREÇÃO: A verificação de 'isOwner' agora usa o 'currentUser' do useAuth.
    const isOwner = currentUser?.uid === character?.ownerId;
    const { resources, points, lockedItems, itemCounts } = actions;

    return (
        <SheetContainer $isDead={character.isDead}>
            <SheetModals character={character} modals={modals} closeModal={closeModal} openLightbox={{ url: lightboxImageUrl }} updateCharacter={updateCharacter} />
            {character.isDead && <DeathAnimationOverlay><Lottie animationData={deathAnimation} loop /></DeathAnimationOverlay>}
            <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>

            <CharacterSheetHeader
                character={character}
                characterName={character.name}
                onNameChange={(name) => updateCharacter({ name })}
                isOwner={isOwner}
                isEditing={isEditing}
                isDead={character.isDead}
                points={points}
                onOpenImageManager={() => openModal('imageCropper')}
                onBannerClick={() => openLightbox(character.portraitImage || character.bannerImage)}
            />

            <HeaderPanel>
                <Section>
                    <SectionTitle>Atributos e Recursos</SectionTitle>
                    <AttributeDisplay
                        attributes={character.attributes}
                        resources={resources}
                        currentResources={{ pv_current: character.pv_current, pm_current: character.pm_current, pa_current: character.pa_current }}
                        onAttributeChange={actions.handleAttributeChange}
                        onResourceChange={actions.handleResourceChange}
                        isEditing={isEditing}
                        isDead={character.isDead}
                        points={points}
                    />
                </Section>
            </HeaderPanel>

            <SheetLayoutGrid>
                <SheetLeftColumn
                    character={character}
                    isEditing={isEditing}
                    handleUpdate={updateCharacter}
                    handleArchetypeChange={actions.handleArchetypeChange}
                    onAddKit={actions.handleAddKit}
                    onRemoveKit={actions.handleRemoveKit}
                    unmetClassReqs={actions.unmetClassReqs}
                />
                <SheetRightColumn
                    character={character}
                    isEditing={isEditing}
                    handleUpdate={updateCharacter}
                    onConsume={actions.handleConsume}
                />
            </SheetLayoutGrid>

            <SheetFooter
                character={character}
                isEditing={isEditing}
                lockedItems={lockedItems}
                itemCounts={itemCounts}
                addItem={actions.addItem}
                removeItem={actions.removeItem}
                onAddTechnique={actions.handleAddTechnique}
                onRemoveTechnique={actions.handleRemoveTechnique}
                checkTechniqueRequirements={actions.checkTechniqueRequirements}
                isBackstoryVisible={isBackstoryVisible}
                setIsBackstoryVisible={setIsBackstoryVisible}
                handleUpdate={updateCharacter}
            />

            <FloatingActions
                isOwner={isOwner}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(prev => !prev)}
                onDeathToggle={() => openModal(character.isDead ? 'confirmResurrection' : 'confirmDeath')}
                isDead={character.isDead}
            />
        </SheetContainer>
    );
};

/* ------- Componente Wrapper com o Provider -------------- */
export const CharacterSheet = () => {
    const { characterId } = useParams();
    return (
        <CharacterProvider characterId={characterId}>
            <CharacterSheetContent />
        </CharacterProvider>
    );
};