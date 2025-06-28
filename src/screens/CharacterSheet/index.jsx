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

/* --------------------- Conteúdo interno da tela ------------------------- */
const CharacterSheetContent = () => {
  const { character, loading, updateCharacter, resources, points } = useCharacter();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  /* estados de UI --------------------------------------------------------- */
  const [isEditing, setIsEditing] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [confirmDeathModal, setConfirmDeathModal] = useState(false);
  const [confirmResModal, setConfirmResModal] = useState(false);

  /* verifica se o usuário logado é o dono */
  const isOwner = character && currentUser.uid === character.ownerId;

  /* --------------------- upload de retrato / token ----------------------- */
 const handleImagesDone = useCallback(
    // Recebe bannerUrl no lugar de portraitUrl
    async ({ bannerUrl, tokenUrl, tokenBorderColor }) => {
      if (!character?.id) return;

      const updatedData = {
        bannerImage: bannerUrl, // Salva no campo 'bannerImage'
        tokenImage: tokenUrl,
        tokenBorderColor,
      };

      /* 1. salva no Firestore */
      await updateDoc(doc(db, 'characters', character.id), updatedData);

      /* 2. atualiza contexto local */
      updateCharacter(updatedData);
    },
    [character, updateCharacter]
  );

  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!loading && character?.isDead) setIsEditing(false);
  }, [loading, character]);

  if (loading || !character) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        Carregando ficha…
      </div>
    );
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
            onNameChange={(value) => updateCharacter({ name: value })} // Corrigido para passar o valor
            points={points}
            isDead={character.isDead}
            character={character}
            onOpenImageManager={() => setImageModalOpen(true)}
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
            onAttributeChange={(attrs) => updateCharacter({ attributes: attrs })}
            onResourceChange={(res) => updateCharacter(res)}
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
      />

      {/* botões flutuantes */}
      {isOwner && (
        <>
          <FloatingActionButton
            onClick={() => setIsEditing((p) => !p)}
            style={{ bottom: '5rem', right: '2rem' }}
            title={isEditing ? 'Sair do Modo Edição' : 'Entrar no Modo Edição'}
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
                character.isDead ? 'Ressuscitar Personagem' : 'Marcar como Morto'
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
