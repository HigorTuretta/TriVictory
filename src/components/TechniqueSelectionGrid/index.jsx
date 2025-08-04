import React, { useState } from 'react';
import { TechniqueDetailsModal } from '../TechniqueDetailsModal';
import {
  GridContainer, Grid, TechniqueCard, TechniqueName, CategoryBadge,
  SelectedItemsContainer, SelectedItem, RemoveButton
} from './styles';

// --- Subcomponente para a Lista de Técnicas Selecionadas ---
const SelectedTechniquesList = ({ techniques, onRemove }) => {
  if (!techniques || techniques.length === 0) {
    return null;
  }

  return (
    <SelectedItemsContainer>
      {techniques.map((tech) => (
        <SelectedItem key={tech.id}>
          {tech.subOption ? `${tech.nome}: ${tech.subOption}` : tech.nome}
          <RemoveButton onClick={() => onRemove(tech.id)} title="Remover Técnica">
            ×
          </RemoveButton>
        </SelectedItem>
      ))}
    </SelectedItemsContainer>
  );
};

// --- Subcomponente para a Grade de Técnicas Disponíveis ---
const TechniqueGrid = ({ techniques, onCardClick }) => (
  <GridContainer>
    <Grid>
      {techniques.map(tech => (
        <TechniqueCard
          key={tech.nome}
          onClick={() => onCardClick(tech)}
          // CORREÇÃO: Passa a prop como `$category`
          $category={tech.categoria}
        >
          <TechniqueName>{tech.nome}</TechniqueName>
          <CategoryBadge $category={tech.categoria}>{tech.categoria}</CategoryBadge>
        </TechniqueCard>
      ))}
    </Grid>
  </GridContainer>
);

// --- Componente Principal ---
export const TechniqueSelectionGrid = ({
  techniques,
  selectedTechniques = [],
  onAddTechnique,
  onRemoveTechnique,
  checkRequirements
}) => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const handleSelectTechnique = (technique, variation) => {
    onAddTechnique(technique, variation);
    setSelectedTechnique(null); // Fecha o modal após a seleção
  };

  return (
    <>
      <SelectedTechniquesList
        techniques={selectedTechniques}
        onRemove={onRemoveTechnique}
      />

      <TechniqueGrid
        techniques={techniques}
        onCardClick={setSelectedTechnique}
      />

      <TechniqueDetailsModal
        isOpen={!!selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
        technique={selectedTechnique}
        onSelect={handleSelectTechnique}
        checkRequirements={checkRequirements}
        selectedTechniques={selectedTechniques}
      />
    </>
  );
};