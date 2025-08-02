import React, { useState } from 'react';
import { ToolbarContainer, RollButton, CommandInput } from './styles';
import { FaCog } from 'react-icons/fa';

export const DiceToolbar = ({ macros, onRoll, onOpenMacroManager }) => {
    const [command, setCommand] = useState('');

    const handleCommandSubmit = (e) => {
        if (e.key === 'Enter' && command.trim()) {
            if (command.toLowerCase().startsWith('/r ')) {
                onRoll(command.substring(3).trim());
            }
            setCommand('');
        }
    };

    return (
        <ToolbarContainer>
            <RollButton onClick={() => onRoll('1d6')}>1D6</RollButton>
            <RollButton onClick={() => onRoll('2d6')}>2D6</RollButton>
            <RollButton onClick={() => onRoll('3d6')}>3D6</RollButton>
            
            {/* Agora 'macros' está garantido como um array, então .map() é seguro */}
            {(macros || []).map(macro => (
                <RollButton key={macro.id} onClick={() => onRoll(macro.command)} title={macro.command}>
                    {macro.name}
                </RollButton>
            ))}

            <CommandInput 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommandSubmit}
                placeholder="/r 2d6+3"
            />
            <RollButton onClick={onOpenMacroManager} title="Gerenciar Macros">
                <FaCog />
            </RollButton>
        </ToolbarContainer>
    );
};