// src/components/VTT/RoomSettings.jsx
import React from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SettingsContainer, SettingRow, SettingLabel, ToggleSwitch } from './styles';

export const RoomSettings = () => {
    // CORREÇÃO: Consome 'updateRoom' diretamente do contexto, em vez de um 'dispatch' inexistente.
    const { room, updateRoom } = useRoom();

    const settings = room.roomSettings || { playerVision: true, visionRadius: 3.5 };

    const handleSettingChange = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        // CORREÇÃO: Usa a função 'updateRoom' para garantir que a atualização seja enviada corretamente ao Firestore.
        updateRoom({ roomSettings: newSettings });
    };

    return (
        <SettingsContainer>
            <SettingRow>
                <SettingLabel htmlFor="playerVision">
                    Visão Dinâmica dos Jogadores
                    <span>Jogadores revelam a névoa ao redor de seus tokens.</span>
                </SettingLabel>
                <ToggleSwitch
                    id="playerVision"
                    checked={settings.playerVision}
                    onChange={(e) => handleSettingChange('playerVision', e.target.checked)}
                />
            </SettingRow>

            <SettingRow>
                <SettingLabel htmlFor="visionRadius">
                    Raio de Visão (quadrados)
                    <span>Alcance da visão dinâmica dos jogadores.</span>
                </SettingLabel>
                <input
                    type="number"
                    id="visionRadius"
                    value={settings.visionRadius}
                    onChange={(e) => handleSettingChange('visionRadius', parseFloat(e.target.value) || 1)}
                    style={{ width: '80px', textAlign: 'center' }}
                    min="1"
                    step="0.5"
                    disabled={!settings.playerVision}
                />
            </SettingRow>
        </SettingsContainer>
    );
};