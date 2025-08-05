// src/components/SheetLeftColumn/index.jsx
import React from 'react';
import * as gameData from '../../data/gameData';
import { MoneyTracker } from '../MoneyTracker';
import { LevelXPTracker } from '../LevelXPTracker';
import { ArchetypeSection } from '../ArchetypeSection';
import { ClassSection } from '../ClassSection';
import { LeftColumn, Section, SectionTitle, NotesTextarea } from './styles';

// ... (NotesSection e handleXpTrackerUpdate sem alterações) ...
const NotesSection = (props) => <NotesTextarea {...props} />;

export const SheetLeftColumn = ({
  character,
  isEditing,
  handleUpdate,
  handleArchetypeChange,
  goToArchetypeCreator,
  onAddKit,
  onRemoveKit,
  goToClassCreator,
  unmetClassReqs,
  isOwner
}) => {
  const handleXpTrackerUpdate = (updates) => {
    const mergedData = {
      level: updates.level ?? character.level,
      basePoints: updates.basePoints ?? character.basePoints,
      xp: {
        current: updates.xp?.current ?? character.xp?.current,
        target: updates.xp?.target ?? character.xp?.target,
      }
    };
    const sanitizedUpdates = {
      level: Number(mergedData.level) || 0,
      basePoints: Number(mergedData.basePoints) || 10,
      xp: {
        current: Number(mergedData.xp?.current) || 0,
        target: Number(mergedData.xp?.target) || 10,
      }
    };
    handleUpdate(sanitizedUpdates);
  };

  const sectionsConfig = [
    {
      key: 'money',
      title: 'Dinheiro',
      hasWrapper: true,
      Component: MoneyTracker,
      props: {
        money: character.money || { amount: 0, type: { nome: 'Moedas de Ouro', sigla: 'MO' } },
        onUpdate: (m) => handleUpdate({ money: m }),
        isEditing,
        isDead: character.isDead,
        isOwner: isOwner,
      },
    },
    {
      key: 'level',
      title: 'Nível & XP',
      hasWrapper: true,
      Component: LevelXPTracker,
      props: {
        level: character.level || 0,
        xp: character.xp || { current: 0, target: 10 },
        basePoints: character.basePoints || 10,
        isEditing,
        onUpdate: handleXpTrackerUpdate,
        isDead: character.isDead,
        isOwner: isOwner, // <<< ADICIONADO AQUI
      },
    },
    {
      key: 'archetype',
      hasWrapper: false,
      Component: ArchetypeSection,
      props: {
        character,
        isEditing,
        handleArchetypeChange,
        goToArchetypeCreator,
      },
    },
    {
      key: 'class',
      hasWrapper: false,
      Component: ClassSection,
      props: {
        character,
        classes: gameData.classes,
        isEditing,
        onAddKit,
        onRemoveKit,
        goToClassCreator,
        unmetReqs: unmetClassReqs,
      },
    },
    {
      key: 'notes',
      title: 'Notas',
      hasWrapper: true,
      Component: NotesSection,
      props: {
        value: character.notes || '',
        onChange: (e) => handleUpdate({ notes: e.target.value }),
        disabled: character.isDead || !isOwner, // Também desabilitar para não-donos
        placeholder: 'Anotações da sessão…',
      },
    },
  ];

  return (
    <LeftColumn>
      {sectionsConfig.map(({ key, Component, title, hasWrapper, props }) => 
        hasWrapper ? (
          <Section key={key}>
            <SectionTitle>{title}</SectionTitle>
            <Component {...props} />
          </Section>
        ) : (
          <Component key={key} {...props} />
        )
      )}
    </LeftColumn>
  );
};