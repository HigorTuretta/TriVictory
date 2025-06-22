import React from 'react';
import { PointTracker } from '../PointTracker';
import { Header, CharacterNameInput } from './styles';

export const CharacterSheetHeader = ({
  isEditing,
  isOwner,
  characterName,
  onNameChange,
  points,
  basePoints,
  isDead,
}) => {
  return (
    <Header>
      <CharacterNameInput
        value={characterName}
        onChange={onNameChange}
        disabled={!isEditing || isDead}
        placeholder='Nome do Personagem'
      />
      {isOwner && (
        <PointTracker points={points} basePoints={basePoints} />
      )}
    </Header>
  );
};