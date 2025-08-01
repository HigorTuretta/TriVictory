// src/screens/CharacterSheet/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaSave, FaSkull, FaHeartbeat } from 'react-icons/fa';
import Lottie from 'lottie-react';

import { useAuth } from '../../contexts/AuthContext';
import { CharacterProvider, useCharacter } from '../../contexts/CharacterContext';
import { getMainImageUrl } from '../../services/cloudinaryService'; // Importa o helper

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

// Hook e subcomponentes permanecem os mesmos da refatoração anterior
const useCharacterSheetUI = () => {
    const [modals, setModals] = useState({ imageCropper: false, lightbox: false, confirmDeath: false, confirmResurrection: false });
    const [lightboxImageUrl, setLightboxImageUrl] = useState('');
    const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
    const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));
    const openLightbox = (url) => { setLightboxImageUrl(url); openModal('lightbox'); };
    return { modals, openModal, closeModal, lightboxImageUrl, openLightbox };
};

const FloatingActions = ({ isOwner, isEditing, onEditToggle, onDeathToggle, isDead }) => { /* ...código omitido... */ };
const SheetModals = ({ character, modals, closeModal, lightboxImageUrl, updateCharacter }) => { /* ...código omitido... */ };


/* --------------------- Conteúdo Principal da Tela ------------------------- */
const CharacterSheetContent = () => {
    const navigate = useNavigate();
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

    const isOwner = currentUser?.uid === character?.ownerId;
    const { resources, points, lockedItems, itemCounts } = actions;

    // Prepara a imagem para o cropper, garantindo que seja sempre uma URL válida.
    const imageForCropper = character?.portraitImage ? getMainImageUrl(character.portraitImage) : '';

    return (
        <SheetContainer $isDead={character.isDead}>
            {/* O componente de modais foi movido para fora da renderização principal para clareza */}
            <SheetModals 
                character={character} 
                modals={modals} 
                closeModal={closeModal} 
                lightboxImageUrl={lightboxImageUrl} 
                updateCharacter={updateCharacter} 
            />

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
                onBannerClick={openLightbox}
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

             {/* CORREÇÃO: Passa a URL da imagem já processada para o modal de corte */}
            <ImageCropperModal
                open={modals.imageCropper}
                onClose={() => closeModal('imageCropper')}
                onDone={(data) => updateCharacter(data)}
                characterImage={imageForCropper}
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