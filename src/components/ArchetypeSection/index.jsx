import React from 'react';
import * as gameData from '../../data/gameData';
import {
  Section,
  SectionTitle,
  ArchetypeSelect,
  AddArchetypeButton,
  ArchetypeInfo,
  ArchetypePower,
  ArchetypeChoiceInfo,
} from './styles';

export const ArchetypeSection = ({
  character,
  isEditing,
  handleArchetypeChange,
  goToArchetypeCreator,
}) => (
  <Section>
    <SectionTitle>Arquétipo</SectionTitle>
    {isEditing ? (
      <>
        {/* CORREÇÃO: Adicionada a prop 'onChange' que estava faltando. */}
        <ArchetypeSelect
          value={character.archetype?.nome || ''}
          onChange={handleArchetypeChange}
          disabled={character.isDead}
        >
          <option value=''>Nenhum (Humano)</option>
          {gameData.arquetipos.map((a) => (
            <option key={a.nome} value={a.nome}>
              {a.nome} ({a.custo} pt)
            </option>
          ))}
        </ArchetypeSelect>
        <AddArchetypeButton
          onClick={goToArchetypeCreator}
          disabled={character.isDead}
        >
          + Criar Arquétipo Customizado
        </AddArchetypeButton>
      </>
    ) : (
      <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>
        {character.archetype?.nome || 'Humano'}
      </p>
    )}

    {character.archetype && (
      <ArchetypeInfo>
        {character.archetype.poderes.map((p, i) => (
          <ArchetypePower key={i}>{p}</ArchetypePower>
        ))}
      </ArchetypeInfo>
    )}

    {character.archetypeChoices &&
      Object.keys(character.archetypeChoices).length > 0 && (
        <ArchetypeChoiceInfo>
          <strong>Escolhas de Arquétipo:</strong>
          {Object.values(character.archetypeChoices).map((c) => (
            <span key={c.id}>
              {c.nome} {c.subOption && `(${c.subOption})`}
            </span>
          ))}
        </ArchetypeChoiceInfo>
      )}
  </Section>
);