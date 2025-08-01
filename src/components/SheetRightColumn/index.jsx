import React, { useMemo } from 'react';
import { InventorySettings } from '../InventorySettings';
import { Mochila } from '../Mochila';
import { RightColumn, Section, SectionTitle } from './styles';

export const SheetRightColumn = ({ character, isEditing, handleUpdate, onConsume }) => {
  // Guarda de segurança para o caso do personagem ainda não ter carregado.
  if (!character) {
    return <RightColumn />;
  }

  // Desestrutura as propriedades do personagem para um código mais limpo e seguro.
  const {
    inventory = [],
    inventorySettings: charSettings,
    attributes,
    isDead,
  } = character;

  // Memoiza as configurações do inventário para evitar re-cálculos desnecessários.
  const inventorySettings = useMemo(() => charSettings || {
    system: 'attribute', attribute: 'poder', multiplier: 10, fixedMax: 50,
  }, [charSettings]);

  // Memoiza o cálculo do peso total, que só será refeito se o inventário mudar.
  const totalWeight = useMemo(() => {
    return inventory.reduce((sum, it) => sum + (it.weight || 0) * (it.quantity || 1), 0);
  }, [inventory]);

  // Memoiza o cálculo da capacidade, que só será refeito se as configurações ou atributos mudarem.
  const capacity = useMemo(() => {
    if (inventorySettings.system === 'fixed') {
      return inventorySettings.fixedMax;
    }
    const attrValue = attributes[inventorySettings.attribute || 'poder'] || 0;
    const multiplier = inventorySettings.multiplier || 10;
    return attrValue * multiplier;
  }, [inventorySettings, attributes]);

  return (
    <RightColumn>
      <Section>
        <SectionTitle>Mochila</SectionTitle>
        {isEditing && (
          <InventorySettings
            settings={inventorySettings}
            onUpdate={(s) => handleUpdate({ inventorySettings: s })}
          />
        )}
        <Mochila
          items={inventory}
          onUpdate={(inv) => handleUpdate({ inventory: inv })}
          capacity={capacity}
          totalWeight={totalWeight}
          isDead={isDead}
          onConsume={onConsume}
        />
      </Section>
    </RightColumn>
  );
};