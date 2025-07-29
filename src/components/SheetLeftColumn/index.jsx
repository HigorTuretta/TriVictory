import React from 'react';
import * as gameData from '../../data/gameData';
import { MoneyTracker } from '../MoneyTracker';
import { LevelXPTracker } from '../LevelXPTracker';
import { ArchetypeSection } from '../ArchetypeSection';
import { ClassSection } from '../ClassSection';
import { LeftColumn, Section, SectionTitle, NotesTextarea } from './styles';

// Componente wrapper para o textarea, para manter o padrão de configuração.
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
}) => {
  // Função wrapper para sanitizar os dados do LevelXPTracker antes de atualizar.
  const handleXpTrackerUpdate = (updates) => {
    const sanitizedUpdates = {
      ...updates,
      level: Number(updates.level) || 0,
      basePoints: Number(updates.basePoints) || 12,
      xp: {
        current: Number(updates.xp?.current) || 0,
        target: Number(updates.xp?.target) || 100,
      }
    };
    handleUpdate(sanitizedUpdates);
  };

  // --- Array de Configuração para renderização dinâmica da coluna ---
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
      },
    },
    {
      key: 'level',
      title: 'Nível & XP',
      hasWrapper: true,
      Component: LevelXPTracker,
      props: {
        level: character.level || 0,
        xp: character.xp || { current: 0, target: 100 },
        basePoints: character.basePoints || 12,
        isEditing,
        onUpdate: handleXpTrackerUpdate,
        isDead: character.isDead,
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
        disabled: character.isDead,
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