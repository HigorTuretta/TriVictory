// src/components/VTT/DiceToolbar.jsx
import React, { useState } from 'react';
import { ToolbarContainer, RollButton, CommandInput } from './styles';
import { FaCog } from 'react-icons/fa';

export const DiceToolbar = ({ macros, onRoll, onOpenMacroManager }) => {
    const [command, setCommand] = useState('');

    const handleCommandSubmit = (e) => {
        if (e.key === 'Enter' && command.trim()) {
            // Aqui não passamos nome de macro, pois é um comando customizado
            if (command.toLowerCase().startsWith('/r ')) {
                onRoll(command.substring(3).trim());
            } else {
                onRoll(command.trim());
            }
            setCommand('');
        }
    };

    return (
        <ToolbarContainer>
            <RollButton onClick={() => onRoll('1d6')}>1D6</RollButton>
            <RollButton onClick={() => onRoll('2d6')}>2D6</RollButton>
            <RollButton onClick={() => onRoll('3d6')}>3D6</RollButton>
            
            {(macros || []).map(macro => (
                <RollButton 
                    key={macro.id} 
                    // MODIFICADO: Passa o comando e o nome do macro para a função onRoll
                    onClick={() => onRoll(macro.command, [], null, macro.name)} 
                    title={macro.command}
                >
                    {macro.name}
                </RollButton>
            ))}

            <CommandInput 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommandSubmit}
                placeholder="/r 2d6+3 ou 2d6+3"
            />
            <RollButton onClick={onOpenMacroManager} title="Gerenciar Macros">
                <FaCog />
            </RollButton>
        </ToolbarContainer>
    );
};