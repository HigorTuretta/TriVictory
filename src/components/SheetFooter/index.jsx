import React from 'react';

// Componentes Filhos
import { SelectionGrid } from '../SelectionGrid';
import { FinalizedView } from '../FinalizedView';

// Ícones e Estilos
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
  FooterPanel, 
  FinalizedSection, 
  Section, 
  SectionTitle, 
  SectionHeader, 
  VisibilityButton, 
  BackstoryTextarea 
} from './styles';

export const SheetFooter = ({
  isEditing,
  character,
  disabledItems,
  gameData,
  addItem,
  removeItem,
  isBackstoryVisible,
  setIsBackstoryVisible,
  handleUpdate,
  lockedItems,
  itemCounts
}) => {
  return (
    <FooterPanel>
      {isEditing ? (
        <>
 <FinalizedSection>
            <SectionTitle>Perícias</SectionTitle>
            <SelectionGrid
              items={gameData.pericias}
              selectedItems={character.skills || []}
              lockedItems={lockedItems}
              itemCounts={itemCounts}
              onAddItem={(i, sub) => addItem('skills', i, sub)}
              onRemoveItem={(id) => removeItem('skills', id)}
              listName='Perícias'
              isEditing
            />
          </FinalizedSection>

          <FinalizedSection>
            <SectionTitle>Vantagens</SectionTitle>
            <SelectionGrid
              items={gameData.vantagens}
              selectedItems={character.advantages || []}
              lockedItems={lockedItems}
              itemCounts={itemCounts}
              onAddItem={(i, sub) => addItem('advantages', i, sub)}
              onRemoveItem={(id) => removeItem('advantages', id)}
              listName='Vantagens'
              isEditing
            />
          </FinalizedSection>

          <FinalizedSection>
            <SectionTitle>Desvantagens</SectionTitle>
            <SelectionGrid
              items={gameData.desvantagens}
              selectedItems={character.disadvantages || []}
              lockedItems={lockedItems}
              itemCounts={itemCounts}
              onAddItem={(i, sub) => addItem('disadvantages', i, sub)}
              onRemoveItem={(id) => removeItem('disadvantages', id)}
              listName='Desvantagens'
              isEditing
            />
          </FinalizedSection>
        </>
      ) : (
        <>
          <FinalizedSection>
            <SectionTitle>Perícias</SectionTitle>
            <FinalizedView items={character.skills || []} />
          </FinalizedSection>
          <FinalizedSection>
            <SectionTitle>Vantagens</SectionTitle>
            <FinalizedView items={character.advantages || []} />
          </FinalizedSection>
          <FinalizedSection>
            <SectionTitle>Desvantagens</SectionTitle>
            <FinalizedView items={character.disadvantages || []} />
          </FinalizedSection>
        </>
      )}

      {/* Seção de História */}
      <Section>
        <SectionHeader>
          <SectionTitle style={{ marginBottom: 0 }}>História</SectionTitle>
          <VisibilityButton onClick={() => setIsBackstoryVisible((v) => !v)}>
            {isBackstoryVisible ? <FaEyeSlash /> : <FaEye />}
          </VisibilityButton>
        </SectionHeader>

        {(isEditing || isBackstoryVisible) && (
          <BackstoryTextarea
            placeholder='Origens, personalidade, metas…'
            value={character.backstory || ''}
            onChange={(e) => handleUpdate({ backstory: e.target.value })}
            readOnly={!isEditing}
            disabled={character.isDead}
          />
        )}
      </Section>
    </FooterPanel>
  );
};