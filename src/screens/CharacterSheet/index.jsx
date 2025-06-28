/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CharacterProvider, useCharacter } from '../../contexts/CharacterContext';
import toast from 'react-hot-toast';
import { FaHeartbeat, FaPencilAlt, FaSave, FaSkull } from 'react-icons/fa';
import Lottie from 'lottie-react';

// Componentes Filhos
import { CharacterSheetHeader } from '../../components/CharacterSheetHeader';
import { SheetLeftColumn } from '../../components/SheetLeftColumn';
import { SheetRightColumn } from '../../components/SheetRightColumn';
import { SheetFooter } from '../../components/SheetFooter';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Modal } from '../../components/Modal';

// Dados e Estilos
import deathAnimation from '../../assets/lotties/deathAnimation.json';
import * as gameData from '../../data/gameData';
import {
  SheetContainer,
  Section,
  SectionTitle,
  BackButton,
  HeaderPanel,
  SheetLayoutGrid,
  DeathButton,
  DeathAnimationOverlay,
  FloatingActionButton,
  ChoiceButton
} from './styles';

// Componente interno que usa o Context
const CharacterSheetContent = ({
  goToArchetypeCreator = () => {},
  goToClassCreator = () => {},
  onAddCustomItem = () => {},
  onUpdateCustomItem = () => {},
  onDeleteCustomItem = () => {}
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Usando o Context
  const {
    character,
    loading,
    isEditing,
    setIsEditing,
    points,
    resources,
    lockedItems,
    itemCounts,
    unmetClassReqs,
    setUnmetClassReqs,
    updateCharacter,
    handleAttributeChange,
    handleResourceChange,
    addItem,
    removeItem,
    handleArchetypeChange,
    handleMakeChoice,
    handleAddKit,
    handleRemoveKit,
    checkTechniqueRequirements,
    handleAddTechnique,
    handleRemoveTechnique,
    handleConsume
  } = useCharacter();

  // Estados locais específicos da UI
  const [isBackstoryVisible, setIsBackstoryVisible] = useState(false);
  const [confirmDeathModal, setConfirmDeathModal] = useState(false);
  const [confirmResModal, setConfirmResModal] = useState(false);
  const [choiceModal, setChoiceModal] = useState(null);

  // Inicializar modo de edição se for novo personagem
  useEffect(() => {
    if (location.state?.isNew) {
      setIsEditing(true);
    }
  }, [location.state?.isNew, setIsEditing]);

  // Gerenciar modal de escolhas de arquétipo
  useEffect(() => {
    if (!character) return;
    const archetype = character.archetype;
    if (isEditing && archetype && archetype.escolhas) {
      const hasPendingChoices = archetype.escolhas.some(choice => 
        !(character.archetypeChoices && character.archetypeChoices[choice.id])
      );
      if (hasPendingChoices && !choiceModal) {
        const nextChoice = archetype.escolhas.find(choice => 
          !(character.archetypeChoices && character.archetypeChoices[choice.id])
        );
        if (nextChoice) setChoiceModal(nextChoice);
      }
    }
  }, [character, isEditing, choiceModal]);

  // Wrapper para handleMakeChoice que fecha o modal
  const handleMakeChoiceAndClose = (choice, chosenItem, subOption = null) => {
    handleMakeChoice(choice, chosenItem, subOption);
    setChoiceModal(null);
  };

  if (loading || !character) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        Carregando ficha…
      </div>
    );
  }

  const isOwner = currentUser.uid === character.ownerId;

  return (
    <SheetContainer $isDead={character.isDead}>
      <ConfirmModal 
        isOpen={confirmDeathModal} 
        onClose={() => setConfirmDeathModal(false)} 
        onConfirm={() => { 
          updateCharacter({ isDead: true, pv_current: 0 }); 
          toast('Que seus feitos sejam lembrados.', { icon: '💀' }); 
          setConfirmDeathModal(false); 
        }} 
        title='Confirmar Morte' 
        message='Isso marcará o personagem como morto. Continuar?' 
      />
      
      <ConfirmModal 
        isOpen={confirmResModal} 
        onClose={() => setConfirmResModal(false)} 
        onConfirm={() => { 
          updateCharacter({ isDead: false, pv_current: resources.pv }); 
          toast.success('Milagre! Personagem ressuscitado.'); 
          setConfirmResModal(false); 
        }} 
        title='Ressuscitar Personagem' 
        message='Deseja trazer o personagem de volta à vida?' 
        confirmButtonClass='resurrect' 
      />
      
      {character.isDead && (
        <DeathAnimationOverlay>
          <Lottie animationData={deathAnimation} loop />
        </DeathAnimationOverlay>
      )}
      
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
      
      <CharacterSheetHeader 
        isEditing={isEditing} 
        isOwner={isOwner} 
        characterName={character.name} 
        onNameChange={(e) => updateCharacter({ name: e.target.value })} 
        points={points} 
        basePoints={character.basePoints || 12} 
        isDead={character.isDead} 
      />
      
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
      
      <SheetLayoutGrid>
        <SheetLeftColumn 
          character={character}
          isEditing={isEditing}
          isOwner={isOwner}
          handleUpdate={updateCharacter}
          handleArchetypeChange={handleArchetypeChange}
          goToArchetypeCreator={goToArchetypeCreator}
          onAddKit={handleAddKit}
          onRemoveKit={handleRemoveKit}
          goToClassCreator={goToClassCreator}
          unmetClassReqs={unmetClassReqs}
        />
        
        <SheetRightColumn 
          character={character}
          isEditing={isEditing}
          isOwner={isOwner}
          resources={resources}
          handleUpdate={updateCharacter}
          onConsume={handleConsume}
          isBackstoryVisible={isBackstoryVisible}
          setIsBackstoryVisible={setIsBackstoryVisible}
        />
      </SheetLayoutGrid>
      
      <SheetFooter 
        character={character}
        isEditing={isEditing}
        isOwner={isOwner}
        lockedItems={lockedItems}
        itemCounts={itemCounts}
        addItem={addItem}
        removeItem={removeItem}
        onAddTechnique={handleAddTechnique}
        onRemoveTechnique={handleRemoveTechnique}
        checkTechniqueRequirements={checkTechniqueRequirements}
        isBackstoryVisible={isBackstoryVisible}
        setIsBackstoryVisible={setIsBackstoryVisible}
        handleUpdate={updateCharacter}
      />

      {/* Modal de Escolhas de Arquétipo */}
      {choiceModal && (
        <Modal 
          isOpen={true} 
          onClose={() => setChoiceModal(null)} 
          title={`Escolha: ${choiceModal.titulo}`}
        >
          <div style={{ padding: '1rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              {choiceModal.descricao}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {choiceModal.opcoes.map((opcao, index) => {
                const item = gameData[choiceModal.tipo === 'vantagem' ? 'vantagens' : 'desvantagens']
                  .find(i => i.nome === opcao.nome);
                
                return (
                  <div key={index}>
                    <ChoiceButton 
                      onClick={() => handleMakeChoiceAndClose(choiceModal, item, opcao.subOption)}
                    >
                      {opcao.nome} {opcao.subOption && `(${opcao.subOption})`}
                    </ChoiceButton>
                    {item && (
                      <p style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--color-text-secondary)', 
                        marginTop: '0.25rem',
                        marginLeft: '1rem'
                      }}>
                        {item.descricao}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}

      {/* Botões Flutuantes */}
      {isOwner && (
        <>
          <FloatingActionButton 
            onClick={() => setIsEditing(!isEditing)} 
            style={{ bottom: '5rem', right: '2rem' }}
            title={isEditing ? 'Sair do Modo Edição' : 'Entrar no Modo Edição'}
          >
            {isEditing ? <FaSave /> : <FaPencilAlt />}
          </FloatingActionButton>
          
          {!isEditing && (
            <>
              <DeathButton 
                onClick={() => character.isDead ? setConfirmResModal(true) : setConfirmDeathModal(true)}
                $isDead={character.isDead}
                title={character.isDead ? 'Ressuscitar Personagem' : 'Marcar como Morto'}
              >
                {character.isDead ? <FaHeartbeat /> : <FaSkull />}
              </DeathButton>
            </>
          )}
        </>
      )}
    </SheetContainer>
  );
};

// Componente Principal com Provider
export const CharacterSheet = (props) => {
  const { characterId } = useParams();

  return (
    <CharacterProvider characterId={characterId}>
      <CharacterSheetContent {...props} />
    </CharacterProvider>
  );
};

