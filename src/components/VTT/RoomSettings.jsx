// src/components/VTT/RoomSettings.jsx
import React from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SettingsContainer, SettingRow, SettingLabel, ToggleSwitch } from './styles';

export const RoomSettings = () => {
  const { room, updateRoom } = useRoom();

  const settings = room.roomSettings || {
    playerVision: true,
    allyVision: true, // NOVO
    visionRadius: 3.5,
    showGrid: true,
    gridSize: 70,
    gridOffset: { x: 0, y: 0 },
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    updateRoom({ roomSettings: newSettings });
  };

  const handleOffsetChange = (axis, value) => {
    const newOffset = { ...settings.gridOffset, [axis]: value };
    handleSettingChange('gridOffset', newOffset);
  };

  return (
    <SettingsContainer>
      <SettingRow>
        <SettingLabel htmlFor="playerVision">
          Visão Dinâmica
          <span>Se ativada: área vista escurece fora do raio; o visto se torna explorado permanentemente.</span>
        </SettingLabel>
        <ToggleSwitch
          id="playerVision"
          checked={!!settings.playerVision}
          onChange={(e) => handleSettingChange('playerVision', e.target.checked)}
        />
      </SettingRow>

      <SettingRow>
        <SettingLabel htmlFor="allyVision">
          Visão de Aliados
          <span>Se ativada, os jogadores veem a visão e as áreas exploradas de todos aliados.</span>
        </SettingLabel>
        <ToggleSwitch
          id="allyVision"
          checked={!!settings.allyVision}
          onChange={(e) => handleSettingChange('allyVision', e.target.checked)}
          disabled={!settings.playerVision}
        />
      </SettingRow>

      <SettingRow>
        <SettingLabel htmlFor="visionRadius">
          Raio de Visão (quadrados)
          <span>Alcance da visão dinâmica.</span>
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

      <SettingRow>
        <SettingLabel htmlFor="gridSize">
          Tamanho da Grade (px)
          <span>Afeta o tamanho dos tokens e o alinhamento no mapa.</span>
        </SettingLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input
            type="range"
            id="gridSize"
            min="30"
            max="150"
            step="1"
            value={settings.gridSize || 70}
            onChange={(e) => handleSettingChange('gridSize', parseInt(e.target.value, 10))}
            style={{ width: '120px' }}
          />
          <span>{settings.gridSize || 70}px</span>
        </div>
      </SettingRow>

      <SettingRow style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <SettingLabel>
          Ajuste Fino da Grade (Offset)
          <span>Use para alinhar a grade da VTT com a grade desenhada no mapa.</span>
        </SettingLabel>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="gridOffsetX">X:</label>
            <input
              type="number"
              id="gridOffsetX"
              value={settings.gridOffset?.x || 0}
              onChange={(e) => handleOffsetChange('x', parseInt(e.target.value, 10))}
              style={{ width: '70px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="gridOffsetY">Y:</label>
            <input
              type="number"
              id="gridOffsetY"
              value={settings.gridOffset?.y || 0}
              onChange={(e) => handleOffsetChange('y', parseInt(e.target.value, 10))}
              style={{ width: '70px' }}
            />
          </div>
        </div>
      </SettingRow>
    </SettingsContainer>
  );
};
