import React from 'react';
import { InventorySettings } from '../InventorySettings';
import { Mochila } from '../Mochila';
import { RightColumn, Section, SectionTitle } from './styles';

// Renomeando a prop para onConsume para clareza
export const SheetRightColumn = ({ character, isEditing, handleUpdate, onConsume }) => {
  const inventorySettings = character.inventorySettings || {
    system: 'attribute', attribute: 'poder', multiplier: 10, fixedMax: 50,
  };
  const capacity = inventorySettings.system === 'fixed' ? inventorySettings.fixedMax : (character.attributes[inventorySettings.attribute || 'poder'] || 0) * (inventorySettings.multiplier || 10);
  const totalWeight = (character.inventory || []).reduce((sum, it) => sum + (it.weight || 0) * (it.quantity || 1), 0);

  return (
    <RightColumn>
      <Section style={{ height: '100%' }}>
        <SectionTitle>Mochila</SectionTitle>
        {isEditing && (
          <InventorySettings settings={inventorySettings} onUpdate={(s) => handleUpdate({ inventorySettings: s })} />
        )}
        <Mochila
          items={character.inventory || []}
          onUpdate={(inv) => handleUpdate({ inventory: inv })}
          capacity={capacity}
          totalWeight={totalWeight}
          isDead={character.isDead}
          onConsume={onConsume} // Passando a nova prop
        />
      </Section>
    </RightColumn>
  );
};