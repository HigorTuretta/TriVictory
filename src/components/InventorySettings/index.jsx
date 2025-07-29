import React from 'react';
import {
  SettingsContainer,
  Title,
  FormRow,
  Label,
  Input,
  Select,
  Unit,
} from './styles';

export const InventorySettings = ({ settings, onUpdate }) => {
  const { system, attribute, multiplier, fixedMax } = settings;

  // Manipulador de eventos unificado que atualiza o estado
  // com base no nome do campo do formulário.
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseInt(value, 10) || 0 : value;

    onUpdate({
      ...settings,
      [name]: updatedValue,
    });
  };

  return (
    <SettingsContainer>
      <Title>Regra de Carga da Mochila</Title>

      <FormRow>
        <Label>
          <input
            type="radio"
            name="system"
            value="attribute"
            checked={system === 'attribute'}
            onChange={handleChange}
          />
          Baseada em Atributo
        </Label>
        <Label>
          <input
            type="radio"
            name="system"
            value="fixed"
            checked={system === 'fixed'}
            onChange={handleChange}
          />
          Valor Fixo
        </Label>
      </FormRow>

      {/* Painel de configuração para o sistema "Baseado em Atributo" */}
      {system === 'attribute' && (
        <FormRow>
          <Select name="attribute" value={attribute} onChange={handleChange}>
            <option value="poder">Poder</option>
            <option value="habilidade">Habilidade</option>
            <option value="resistencia">Resistência</option>
          </Select>
          <Unit>X</Unit>
          <Input
            type="number"
            name="multiplier"
            value={multiplier}
            onChange={handleChange}
          />
          <Unit>kg</Unit>
        </FormRow>
      )}

      {/* Painel de configuração para o sistema "Valor Fixo" */}
      {system === 'fixed' && (
        <FormRow>
          <Input
            type="number"
            name="fixedMax"
            value={fixedMax}
            onChange={handleChange}
          />
          <Unit>kg</Unit>
        </FormRow>
      )}
    </SettingsContainer>
  );
};