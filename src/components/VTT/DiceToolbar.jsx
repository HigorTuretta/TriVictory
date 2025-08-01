
import React, { useState } from 'react';
import { ToolbarContainer, RollButton, CommandInput } from './styles';

export const DiceToolbar = ({ onRoll }) => {
    const [command, setCommand] = useState('');

    const handleCommandSubmit = (e) => {
        if (e.key === 'Enter' && command.trim()) {
            if (command.toLowerCase().startsWith('/r ')) {
                onRoll(command.substring(3).trim());
            }
            // Futuramente, pode ter uma lógica de chat aqui
            setCommand('');
        }
    };

    return (
        <ToolbarContainer>
            <RollButton onClick={() => onRoll('1d6')}>1D6</RollButton>
            <RollButton onClick={() => onRoll('2d6')}>2D6</RollButton>
            <RollButton onClick={() => onRoll('3d6')}>3D6</RollButton>
            <CommandInput 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommandSubmit}
                placeholder="/r 2d6+3 ou chat"
            />
            {/* Botão para abrir modal de macros */}
        </ToolbarContainer>
    );
};