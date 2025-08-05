// src/components/SheetFooter/index.jsx
import React from 'react';
import * as gameData from '../../data/gameData';
import { SelectionGrid } from '../SelectionGrid';
import { FinalizedView } from '../FinalizedView';
import { TechniqueSelectionGrid } from '../TechniqueSelectionGrid';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  FooterPanel, FinalizedSection, Section, SectionTitle,
  SectionHeader, VisibilityButton, BackstoryTextarea
} from './styles';

// --- Array de Configuração para as Seções da Ficha ---
const SECTIONS_CONFIG = [
  {
    key: 'skills',
    title: 'Perícias',
    data: gameData.pericias,
    isTechnique: false,
  },
  {
    key: 'advantages',
    title: 'Vantagens',
    data: gameData.vantagens,
    isTechnique: false,
  },
  {
    key: 'disadvantages',
    title: 'Desvantagens',
    data: gameData.desvantagens,
    isTechnique: false,
  },
  {
    key: 'techniques',
    title: 'Técnicas',
    data: gameData.tecnicas,
    isTechnique: true,
  },
];

// --- Subcomponente para a Seção de História ---
const BackstorySection = ({ character, isEditing, isVisible, onVisibilityToggle, onUpdate }) => (
  <Section>
    <SectionHeader>
      <SectionTitle style={{ marginBottom: 0 }}>História</SectionTitle>
      <VisibilityButton onClick={onVisibilityToggle} title={isVisible ? "Ocultar História" : "Mostrar História"}>
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </VisibilityButton>
    </SectionHeader>

    {(isEditing || isVisible) && (
      <BackstoryTextarea
        placeholder='Origens, personalidade, metas…'
        value={character.backstory || ''}
        onChange={(e) => onUpdate({ backstory: e.target.value })}
        readOnly={!isEditing}
        disabled={character.isDead}
      />
    )}
  </Section>
);


export const SheetFooter = ({
  isEditing, character, lockedItems, itemCounts, addItem, removeItem,
  onAddTechnique, onRemoveTechnique, checkTechniqueRequirements,
  isBackstoryVisible, setIsBackstoryVisible, handleUpdate,
  points
}) => {

  const renderSectionContent = (section) => {
    const selectedItems = character[section.key] || [];

    if (section.isTechnique) {
      return isEditing ? (
        <TechniqueSelectionGrid
          techniques={section.data}
          selectedTechniques={selectedItems}
          onAddTechnique={onAddTechnique}
          onRemoveTechnique={onRemoveTechnique}
          checkRequirements={checkTechniqueRequirements}
        />
      ) : (
        <FinalizedView items={selectedItems} />
      );
    }
    
    return isEditing ? (
      <SelectionGrid
        items={section.data}
        selectedItems={selectedItems}
        lockedItems={lockedItems}
        itemCounts={itemCounts}
        onAddItem={(item, subOption, cost) => addItem(section.key, item, subOption, cost)}
        onRemoveItem={(id) => removeItem(section.key, id)}
        listName={section.title}
        isEditing={isEditing}
        // CORREÇÃO: Passa a lista de perícias do personagem para a grade
        characterSkills={character.skills || []}
        points={points}
      />
    ) : (
      <FinalizedView items={selectedItems} />
    );
  };
  
  return (
    <FooterPanel>
      {SECTIONS_CONFIG.map(section => (
        <FinalizedSection key={section.key}>
          <SectionTitle>{section.title}</SectionTitle>
          {renderSectionContent(section)}
        </FinalizedSection>
      ))}

      <BackstorySection
        character={character}
        isEditing={isEditing}
        isVisible={isBackstoryVisible}
        onVisibilityToggle={() => setIsBackstoryVisible(v => !v)}
        onUpdate={handleUpdate}
      />
    </FooterPanel>
  );
};