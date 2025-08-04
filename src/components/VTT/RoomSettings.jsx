// src/components/VTT/RoomSettings.jsx
import React from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SettingsContainer, SettingRow, SettingLabel, ToggleSwitch } from './styles';

export const RoomSettings = () => {
    const { room, updateRoom } = useRoom();

    // Define valores padrão para as configurações, incluindo a nova 'showGrid'
    const settings = room.roomSettings || { playerVision: true, visionRadius: 3.5, showGrid: true };

    const handleSettingChange = (key, value) => {
        const newSettings = { ...settings, [key]: value };
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
            
            {/* NOVO: Opção para mostrar/ocultar a grade */}
            <SettingRow>
                <SettingLabel htmlFor="showGrid">
                    Exibir Grade no Mapa
                    <span>Mostra as linhas da grade para todos os jogadores.</span>
                </SettingLabel>
                <ToggleSwitch
                    id="showGrid"
                    checked={settings.showGrid ?? true} // Valor padrão true
                    onChange={(e) => handleSettingChange('showGrid', e.target.checked)}
                />
            </SettingRow>
        </SettingsContainer>
    );
};