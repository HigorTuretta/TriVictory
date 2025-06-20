import React, { useState } from 'react';
import { ConfirmModal } from '../../components/ConfirmModal';
import { 
    AppContainer, Title, CharacterSelectContainer, CharacterSlot, NewCharacterButton, 
    DeleteButton, NewCharacterForm, PointsInput, CharacterInfo, StatusLabel 
} from './styles';

export const CharacterSelect = ({ characters, onSelectCharacter, onNewCharacter, onDeleteCharacter }) => {
  const [basePoints, setBasePoints] = useState(12);
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    onNewCharacter(basePoints);
  }

  const handleDeleteClick = (e, char) => {
    e.stopPropagation();
    setShowConfirmModal(char);
  }

  const confirmDeletion = () => {
    if (showConfirmModal) {
      onDeleteCharacter(showConfirmModal.id);
      setShowConfirmModal(null);
    }
  }

  return (
    <>
      <ConfirmModal
        isOpen={!!showConfirmModal}
        onClose={() => setShowConfirmModal(null)}
        onConfirm={confirmDeletion}
        title="Confirmar Exclusão"
        message={`Você tem certeza que deseja apagar permanentemente a ficha de "${showConfirmModal?.name}"? Esta ação não pode ser desfeita.`}
      />
      <AppContainer>
        <Title>3DeT Victory - Fichas</Title>
        <CharacterSelectContainer>
          {characters.length > 0 ? (
            characters.map((char) => (
              <CharacterSlot key={char.id} onClick={() => onSelectCharacter(char.id)}>
                <CharacterInfo>
                  <span>{char.name || 'Personagem sem nome'} ({char.basePoints}pts)</span>
                  {char.isDead && <StatusLabel>Morto 💀</StatusLabel>}
                </CharacterInfo>
                <DeleteButton onClick={(e) => handleDeleteClick(e, char)}>X</DeleteButton>
              </CharacterSlot>
            ))
          ) : (
            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Nenhuma ficha encontrada. Crie uma nova abaixo!
            </p>
          )}

          <NewCharacterForm onSubmit={handleCreate}>
            <label htmlFor="points" style={{textAlign: 'center', marginBottom: '0.5rem', fontWeight: '500'}}>
              Pontos Iniciais da Campanha
            </label>
            <PointsInput 
              id="points"
              type="number"
              value={basePoints}
              onChange={(e) => setBasePoints(e.target.value)}
              min="0"
            />
            <NewCharacterButton type="submit">
              + Criar Nova Ficha com {basePoints} Pontos
            </NewCharacterButton>
          </NewCharacterForm>

        </CharacterSelectContainer>
      </AppContainer>
    </>
  );
};