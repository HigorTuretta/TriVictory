// src/screens/CharacterSheet/index.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaSave, FaHeartbeat } from 'react-icons/fa';
import Lottie from 'lottie-react';

import { useAuth } from '../../contexts/AuthContext';
import { CharacterProvider, useCharacter } from '../../contexts/CharacterContext';
import { getMainImageUrl } from '../../services/cloudinaryService';

// Componentes de UI
import { CharacterSheetHeader } from '../../components/CharacterSheetHeader';
import { ImageCropperModal } from '../../components/ImageCropperModal';
import { ImageLightbox } from '../../components/ImageLightbox';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { SheetLeftColumn } from '../../components/SheetLeftColumn';
import { SheetRightColumn } from '../../components/SheetRightColumn';
import { SheetFooter } from '../../components/SheetFooter';
import { ConfirmModal } from '../../components/ConfirmModal';
import { ArtifactBuilderModal } from '../../components/Artifacts/ArtifactBuilderModal';
import { RPGLoader } from '../../components/RPGLoader';

import deathAnimation from '../../assets/lotties/deathAnimation.json';
import {
    SheetContainer, BackButton, HeaderPanel, Section, SectionTitle,
    SheetLayoutGrid, DeathAnimationOverlay, FloatingActionButton
} from './styles';


const useCharacterSheetUI = () => {
    const [modals, setModals] = useState({ imageCropper: false, lightbox: false, confirmDeath: false, confirmResurrection: false });
    const [lightboxImageUrl, setLightboxImageUrl] = useState('');
    const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
    const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));
    const openLightbox = (url) => { setLightboxImageUrl(url); openModal('lightbox'); };
    return { modals, openModal, closeModal, lightboxImageUrl, openLightbox };
};

// --- CORREÇÃO: Implementação completa do componente FloatingActions ---
const FloatingActions = ({ isOwner, isEditing, onEditToggle, onDeathToggle, isDead }) => {
    // Regra 1: Só o dono da ficha pode ver o botão.
    if (!isOwner) {
        return null;
    }

    // Regra 2: Se o personagem está morto, o botão serve para ressuscitar.
    if (isDead) {
        return (
            <FloatingActionButton
                onClick={onDeathToggle}
                title="Ressuscitar Personagem"
                $isDead={true}
            >
                <FaHeartbeat />
            </FloatingActionButton>
        );
    }

    // Regra 3: Se o personagem está vivo, o botão alterna o modo de edição.
    return (
        <FloatingActionButton
            onClick={onEditToggle}
            title={isEditing ? 'Salvar Alterações' : 'Habilitar Edição'}
            $isEditing={isEditing}
        >
            {isEditing ? <FaSave /> : <FaPencilAlt />}
        </FloatingActionButton>
    );
};

// O componente de Modais permanece como estava
const SheetModals = ({ character, modals, closeModal, lightboxImageUrl, updateCharacter }) => {
    const handleDeathConfirm = () => {
        updateCharacter({ isDead: true });
        toast.error(`${character.name} tombou em batalha...`);
        closeModal('confirmDeath');
    };
    const handleResurrectionConfirm = () => {
        updateCharacter({ isDead: false });
        toast.success(`${character.name} voltou dos mortos!`, { icon: '😇' });
        closeModal('confirmResurrection');
    };

    return (
        <>
            <ImageLightbox isOpen={modals.lightbox} onClose={() => closeModal('lightbox')} imageUrl={lightboxImageUrl} />
            <ConfirmModal
                isOpen={modals.confirmDeath}
                onClose={() => closeModal('confirmDeath')}
                onConfirm={handleDeathConfirm}
                title={`Matar ${character.name}?`}
                message="Isso marcará o personagem como morto e irá desabilitar a edição. Você poderá ressuscitá-lo depois."
                confirmVariant="confirm"
            />
            <ConfirmModal
                isOpen={modals.confirmResurrection}
                onClose={() => closeModal('confirmResurrection')}
                onConfirm={handleResurrectionConfirm}
                title={`Ressuscitar ${character.name}?`}
                message="O personagem voltará à vida e a ficha poderá ser editada novamente."
                confirmVariant="resurrect"
            />
        </>
    );
};
/* --------------------- Conteúdo Principal da Tela ------------------------- */
const CharacterSheetContent = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { character, loading, isEditing, setIsEditing, updateCharacter, ...actions } = useCharacter();
    const { modals, openModal, closeModal, lightboxImageUrl, openLightbox } = useCharacterSheetUI();
    const [isBackstoryVisible, setIsBackstoryVisible] = useState(false);
    const [editingArtifact, setEditingArtifact] = useState(null);

    const xpBudget = useMemo(() => {
        if (!character?.advantages) return 0;
        return (character.advantages.filter(a => a.nome === 'Artefato').reduce((sum, a) => sum + a.custo, 0)) * 10;
    }, [character?.advantages]);

    useEffect(() => {
        if (!loading && character?.isDead) setIsEditing(false);
    }, [loading, character, setIsEditing]);

    // GUARDA DE SEGURANÇA: Se estiver carregando ou o personagem for nulo, mostra o loader.
    if (loading || !character) {
        return <RPGLoader />;
    }

    // CORREÇÃO: Todos os cálculos e desestruturações que dependem do 'character'
    // são movidos para DEPOIS da guarda de segurança.
    const isOwner = currentUser?.uid === character.ownerId;
    const { resources, points, lockedItems, itemCounts, addArtifact, updateArtifact, removeArtifact } = actions;
    const imageForCropper = character.portraitImage || '';

    const handleSaveArtifact = (artifactData) => {
        if (editingArtifact === 'new') {
            addArtifact(artifactData);
        } else {
            updateArtifact(artifactData);
        }
    };


    return (
        <SheetContainer $isDead={character.isDead}>
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
                    onEditArtifact={setEditingArtifact}
                    onDeleteArtifact={removeArtifact}
                    onCreateArtifact={() => setEditingArtifact('new')}
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
                points={points}
            />

            <ImageCropperModal
                open={modals.imageCropper}
                onClose={() => closeModal('imageCropper')}
                onDone={(data) => updateCharacter(data)}
                characterImage={imageForCropper}
            />
            <ArtifactBuilderModal
                isOpen={!!editingArtifact}
                onClose={() => setEditingArtifact(null)}
                onSave={handleSaveArtifact}
                artifactToEdit={editingArtifact === 'new' ? null : editingArtifact}
                xpBudget={xpBudget}
                characterAdvantages={character.advantages}
                characterDisadvantages={character.disadvantages}
                characterSkills={character.skills}
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