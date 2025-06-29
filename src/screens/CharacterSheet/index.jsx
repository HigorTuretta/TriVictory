// src/screens/CharacterSheet/index.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaSave, FaSkull, FaHeartbeat } from 'react-icons/fa';
import Lottie from 'lottie-react';

import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { CharacterProvider, useCharacter } from '../../contexts/CharacterContext';

import { CharacterSheetHeader } from '../../components/CharacterSheetHeader';
import { ImageCropperModal } from '../../components/ImageCropperModal';
import { ImageLightbox } from '../../components/ImageLightbox';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { SheetLeftColumn } from '../../components/SheetLeftColumn';
import { SheetRightColumn } from '../../components/SheetRightColumn';
import { SheetFooter } from '../../components/SheetFooter';
import { ConfirmModal } from '../../components/ConfirmModal';

import deathAnimation from '../../assets/lotties/deathAnimation.json';

import {
  SheetContainer,
  BackButton,
  HeaderPanel,
  Section,
  SectionTitle,
  SheetLayoutGrid,
  DeathAnimationOverlay,
  FloatingActionButton,
  DeathButton
} from './styles';
import { RPGLoader } from '../../components/RPGLoader';

/* --------------------- Conteúdo interno da tela ------------------------- */
const CharacterSheetContent = () => {
  const {
    character,
    loading,
    updateCharacter,
    resources,
    points,
    handleAttributeChange,
    handleResourceChange
  } = useCharacter();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  /* estados de UI --------------------------------------------------------- */
  const [isEditing, setIsEditing] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [confirmDeathModal, setConfirmDeathModal] = useState(false);
  const [confirmResModal, setConfirmResModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState('');

  /* verifica se o usuário logado é o dono */
  const isOwner = character && currentUser.uid === character.ownerId;

  /* --------------------- upload de retrato / token ----------------------- */
  const handleImagesDone = useCallback(
    async ({ portraitImage, tokenImage, bannerPosition, tokenBorderColor }) => {
      if (!character?.id) return;
      const updatedData = {
        portraitImage,
        tokenImage,
        bannerPosition,
        tokenBorderColor
      };
      await updateDoc(doc(db, 'characters', character.id), updatedData);
      updateCharacter(updatedData);
    },
    [character, updateCharacter]
  );

  const handleBannerClick = (imageUrl) => {
    if (imageUrl) {
      setLightboxImageUrl(imageUrl);
      setLightboxOpen(true);
    }
  };

  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!loading && character?.isDead) setIsEditing(false);
  }, [loading, character]);

 if (loading || !character) {
  return <RPGLoader  />;
}

  /* ------------------------------- JSX ---------------------------------- */
  return (
    <SheetContainer $isDead={character.isDead}>
      {/* ---------- Modais de confirmação ---------- */}
      <ConfirmModal
        isOpen={confirmDeathModal}
        onClose={() => setConfirmDeathModal(false)}
        onConfirm={() => {
          updateCharacter({ isDead: true, pv_current: 0 });
          toast('Que seus feitos sejam lembrados.', { icon: '💀' });
          setConfirmDeathModal(false);
        }}
        title="Confirmar Morte"
        message="Isso marcará o personagem como morto. Continuar?"
      />

      <ConfirmModal
        isOpen={confirmResModal}
        onClose={() => setConfirmResModal(false)}
        onConfirm={() => {
          updateCharacter({ isDead: false, pv_current: resources.pv });
          toast.success('Milagre! Personagem ressuscitado.');
          setConfirmResModal(false);
        }}
        title="Ressuscitar Personagem"
        message="Deseja trazer o personagem de volta à vida?"
        confirmButtonClass="resurrect"
      />

      {/* animação de morte */}
      {character.isDead && (
        <DeathAnimationOverlay>
          <Lottie animationData={deathAnimation} loop />
        </DeathAnimationOverlay>
      )}

      {/* navegação simples */}
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>

      {/* cabeçalho */}
      <CharacterSheetHeader
        isEditing={isEditing}
        isOwner={isOwner}
        characterName={character.name}
        onNameChange={(value) => updateCharacter({ name: value })}
        points={points}
        isDead={character.isDead}
        character={character}
        onOpenImageManager={() => setImageModalOpen(true)}
        onBannerClick={() =>
          handleBannerClick(character.portraitImage || character.bannerImage)
        }
      />

      {/* atributos / recursos */}
      <HeaderPanel>
        <Section>
          <SectionTitle>Atributos e Recursos</SectionTitle>
          <AttributeDisplay
            attributes={character.attributes}
            resources={resources}
            currentResources={{
              pv_current: character.pv_current,
              pm_current: character.pm_current,
              pa_current: character.pa_current
            }}
            onAttributeChange={handleAttributeChange}
            onResourceChange={handleResourceChange}
            isEditing={isEditing}
            isDead={character.isDead}
            points={points}
          />
        </Section>
      </HeaderPanel>

      {/* colunas */}
      <SheetLayoutGrid>
        <SheetLeftColumn
          character={character}
          isEditing={isEditing}
          isOwner={isOwner}
          handleUpdate={updateCharacter}
        />
        <SheetRightColumn
          character={character}
          isEditing={isEditing}
          isOwner={isOwner}
          resources={resources}
          handleUpdate={updateCharacter}
        />
      </SheetLayoutGrid>

      {/* rodapé */}
      <SheetFooter
        character={character}
        isEditing={isEditing}
        isOwner={isOwner}
        points={points}
        handleUpdate={updateCharacter}
      />

      {/* botões flutuantes */}
      {isOwner && (
        <>
          <FloatingActionButton
            onClick={() => setIsEditing((p) => !p)}
            style={{ bottom: '5rem', right: '2rem' }}
            title={
              isEditing ? 'Sair do Modo Edição' : 'Entrar no Modo Edição'
            }
          >
            {isEditing ? <FaSave /> : <FaPencilAlt />}
          </FloatingActionButton>

          {!isEditing && (
            <DeathButton
              onClick={() =>
                character.isDead
                  ? setConfirmResModal(true)
                  : setConfirmDeathModal(true)
              }
              $isDead={character.isDead}
              title={
                character.isDead
                  ? 'Ressuscitar Personagem'
                  : 'Marcar como Morto'
              }
            >
              {character.isDead ? <FaHeartbeat /> : <FaSkull />}
            </DeathButton>
          )}
        </>
      )}

      {/* modal de upload/crop */}
      <ImageCropperModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onDone={handleImagesDone}
        characterImage={character?.portraitImage || character?.bannerImage}
      />

      {/* lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={lightboxImageUrl}
      />
    </SheetContainer>
  );
};

/* ------- Provider externo que injeta o characterId da rota -------------- */
export const CharacterSheet = (props) => {
  const { characterId } = useParams();
  return (
    <CharacterProvider characterId={characterId}>
      <CharacterSheetContent {...props} />
    </CharacterProvider>
  );
};

