import React from 'react';
import { SettingsContainer, FormRow, RadioGroup } from './styles';

export const InventorySettings = ({ settings, onUpdate }) => {

    const handleSystemChange = (e) => {
        onUpdate({ ...settings, system: e.target.value });
    };

    const handleAttributeChange = (e) => {
        onUpdate({ ...settings, attribute: e.target.value });
    };

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ ...settings, [name]: parseInt(value, 10) });
    };

    return (
        <SettingsContainer>
            <h4>Regra de Carga da Mochila</h4>
            <FormRow>
                <RadioGroup>
                    <input
                        type="radio"
                        id="systemAttribute"
                        name="inventorySystem"
                        value="attribute"
                        checked={settings.system === 'attribute'}
                        onChange={handleSystemChange}
                    />
                    <label htmlFor="systemAttribute">Baseada em Atributo</label>
                </RadioGroup>
                <RadioGroup>
                    <input
                        type="radio"
                        id="systemFixed"
                        name="inventorySystem"
                        value="fixed"
                        checked={settings.system === 'fixed'}
                        onChange={handleSystemChange}
                    />
                    <label htmlFor="systemFixed">Valor Fixo</label>
                </RadioGroup>
            </FormRow>

            {settings.system === 'attribute' && (
                <FormRow>
                    <select value={settings.attribute} onChange={handleAttributeChange}>
                        <option value="poder">Poder</option>
                        <option value="habilidade">Habilidade</option>
                        <option value="resistencia">Resistência</option>
                    </select>
                    <span>X</span>
                    <input
                        type="number"
                        name="multiplier"
                        value={settings.multiplier}
                        onChange={handleValueChange}
                    />
                    <span>kg</span>
                </FormRow>
            )}

            {settings.system === 'fixed' && (
                <FormRow>
                    <input
                        type="number"
                        name="fixedMax"
                        value={settings.fixedMax}
                        onChange={handleValueChange}
                    />
                    <span>kg</span>
                </FormRow>
            )}
        </SettingsContainer>
    );
};