import React from 'react';

// Componentes Filhos
import { MoneyTracker } from '../MoneyTracker';
import { LevelXPTracker } from '../LevelXPTracker';
import { ArchetypeSection } from '../ArchetypeSection';
import { ClassSection } from '../ClassSection';

// Dados e Estilos
import * as gameData from '../../data/gameData';
import { LeftColumn, Section, SectionTitle, NotesTextarea } from './styles';

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
  return (
    <LeftColumn>
      <Section>
        <SectionTitle>Dinheiro</SectionTitle>
        <MoneyTracker
          money={character.money || { amount: 0, type: { nome: 'Moedas de Ouro', sigla: 'MO' } }}
          onUpdate={(m) => handleUpdate({ money: m })}
          isEditing={isEditing}
          isDead={character.isDead}
        />
      </Section>

      <Section>
        <SectionTitle>Nível & XP</SectionTitle>
        <LevelXPTracker
          level={character.level}
          xp={character.xp}
          onUpdate={handleUpdate}
          isEditing={isEditing}
          isDead={character.isDead}
        />
      </Section>

      <ArchetypeSection
        character={character}
        isEditing={isEditing}
        handleArchetypeChange={handleArchetypeChange}
        goToArchetypeCreator={goToArchetypeCreator}
      />

      <ClassSection
        character={character}
        classes={gameData.classes}
        isEditing={isEditing}
        onAddKit={onAddKit} 
        onRemoveKit={onRemoveKit} 
        goToClassCreator={goToClassCreator}
        unmetReqs={unmetClassReqs}
      />

      <Section>
        <SectionTitle>Notas</SectionTitle>
        <NotesTextarea
          value={character.notes || ''}
          onChange={(e) => handleUpdate({ notes: e.target.value })}
          disabled={character.isDead}
          placeholder='Anotações da sessão…'
        />
      </Section>
    </LeftColumn>
  );
};