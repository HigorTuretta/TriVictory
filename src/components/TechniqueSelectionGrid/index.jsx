import React, { useState } from 'react';
import { TechniqueDetailsModal } from '../TechniqueDetailsModal';
import { 
  Grid, TechniqueCard, TechniqueName, CategoryBadge,
  SelectedItemsContainer, SelectedItem, RemoveButton
} from './styles';

export const TechniqueSelectionGrid = ({ techniques, selectedTechniques = [], onAddTechnique, onRemoveTechnique, checkRequirements }) => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const handleSelect = (technique, variation) => {
    onAddTechnique(technique, variation);
    setSelectedTechnique(null);
  };

  return (
    <>
      {selectedTechniques.length > 0 && (
        <SelectedItemsContainer>
          {selectedTechniques.map((tech) => (
            <SelectedItem key={tech.id}>
              {tech.subOption ? `${tech.nome}: ${tech.subOption}` : tech.nome}
              <RemoveButton onClick={() => onRemoveTechnique(tech.id)} title="Remover Técnica">&times;</RemoveButton>
            </SelectedItem>
          ))}
        </SelectedItemsContainer>
      )}

      <Grid>
        {techniques.map(tech => (
          <TechniqueCard key={tech.nome} onClick={() => setSelectedTechnique(tech)} category={tech.categoria}>
            <TechniqueName>{tech.nome}</TechniqueName>
            <CategoryBadge category={tech.categoria}>{tech.categoria}</CategoryBadge>
          </TechniqueCard>
        ))}
      </Grid>

      <TechniqueDetailsModal
        isOpen={!!selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
        technique={selectedTechnique}
        onSelect={handleSelect}
        checkRequirements={checkRequirements}
        selectedTechniques={selectedTechniques} // Passa a lista para o modal
      />
    </>
  );
};