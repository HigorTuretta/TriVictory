// src/components/VTT/FogOfWarManager.jsx
import React from 'react';
import { FowToolbar, FowControls, FowActions } from './styles';

export const FogOfWarManager = ({ tool, setTool, brushSize, setBrushSize, onFillAll, onClearAll }) => {
    return (
        <FowToolbar>
            <FowControls>
                <label>Ferramenta:</label>
                <button onClick={() => setTool('brush')} disabled={tool === 'brush'}>Desenhar</button>
                <button onClick={() => setTool('eraser')} disabled={tool === 'eraser'}>Apagar</button>
            </FowControls>
            <FowControls>
                <label>Pincel:</label>
                <input
                    type="range"
                    min="20"
                    max="1500"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                />
                <span>{brushSize}px</span>
            </FowControls>
            <FowActions>
                <button onClick={onFillAll} style={{ backgroundColor: '#333', color: 'white' }}>Cobrir Tudo</button>
                <button onClick={onClearAll} style={{ backgroundColor: '#FF3B30', color: 'white' }}>Revelar Tudo</button>
            </FowActions>
            <p>Aperte <code>Espaço</code> para mover a tela enquanto pinta.</p>
        </FowToolbar>
    );
};