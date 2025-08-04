// src/components/VTT/RoomSettings.jsx
import React from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SettingsContainer, SettingRow, SettingLabel, ToggleSwitch } from './styles';

export const RoomSettings = () => {
    const { room, updateRoom } = useRoom();

    // Adiciona 'gridSize' com um valor padrão de 70px.
    const settings = room.roomSettings || { playerVision: true, visionRadius: 3.5, showGrid: true, gridSize: 70 };

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
            
            <SettingRow>
                <SettingLabel htmlFor="showGrid">
                    Exibir Grade no Mapa
                    <span>Mostra as linhas da grade para todos os jogadores.</span>
                </SettingLabel>
                <ToggleSwitch
                    id="showGrid"
                    checked={settings.showGrid ?? true}
                    onChange={(e) => handleSettingChange('showGrid', e.target.checked)}
                />
            </SettingRow>

            {/* NOVO: Controle para o tamanho da grade */}
            <SettingRow>
                <SettingLabel htmlFor="gridSize">
                    Tamanho da Grade (px)
                    <span>Afeta o tamanho dos tokens e o alinhamento no mapa.</span>
                </SettingLabel>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <input
                        type="range"
                        id="gridSize"
                        min="30"
                        max="150"
                        step="1"
                        value={settings.gridSize || 70}
                        onChange={(e) => handleSettingChange('gridSize', parseInt(e.target.value, 10))}
                        style={{width: '120px'}}
                    />
                    <span>{settings.gridSize || 70}px</span>
                </div>
            </SettingRow>
        </SettingsContainer>
    );
};