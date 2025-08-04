// src/components/VTT/DiceModifierModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRoom } from '../../contexts/RoomContext';
import { Modal } from '../Modal';
import { 
    FaPlus, FaMinus, FaStar, FaCrosshairs, FaEyeSlash, FaDiceD20 
} from 'react-icons/fa';
import { 
    ModifierContent, ModifierControl, ModifierInput, ModifierButton, 
    OptionsGrid, OptionCard, OptionIcon, OptionLabel, OptionDescription, 
    OptionCheckbox, ConfirmRollButton
} from './styles';

export const DiceModifierModal = ({ isOpen, onClose }) => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const isMaster = room.masterId === currentUser.uid;

    const [modifier, setModifier] = useState(0);
    const [spendPA, setSpendPA] = useState(false);
    const [critOnFive, setCritOnFive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Reseta o estado quando o modal fecha para não "lembrar" das escolhas anteriores.
    const handleClose = (value) => {
        onClose(value);
        setModifier(0);
        setSpendPA(false);
        setCritOnFive(false);
        setIsHidden(false);
    };
    
    const handleModifierChange = (delta) => {
        setModifier(prev => prev + delta);
    };

    const optionsConfig = [
        { id: 'spendPA', label: 'Gastar 1 PA?', description: 'Garante que um dado seja 6.', value: spendPA, setter: setSpendPA, Icon: FaStar, isPlayerOnly: true },
        { id: 'critOnFive', label: 'Crítico Aprimorado', description: 'Acerto crítico com 5 ou 6.', value: critOnFive, setter: setCritOnFive, Icon: FaCrosshairs },
        { id: 'isHidden', label: 'Rolagem Oculta', description: 'Apenas você verá o resultado.', value: isHidden, setter: setIsHidden, Icon: FaEyeSlash, isMasterOnly: true },
    ];
    
    return (
        <Modal isOpen={isOpen} onClose={() => handleClose(null)}>
            <ModifierContent>
                <h3>Modificar Rolagem</h3>
                
                <ModifierControl>
                    <ModifierButton onClick={() => handleModifierChange(-1)}><FaMinus /></ModifierButton>
                    <ModifierInput
                        type="number"
                        value={modifier}
                        onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                        autoFocus
                    />
                    <ModifierButton onClick={() => handleModifierChange(1)}><FaPlus /></ModifierButton>
                </ModifierControl>

                <OptionsGrid>
                    {optionsConfig.map(opt => {
                        // Não renderiza a opção se não for permitida para o usuário
                        if ((opt.isMasterOnly && !isMaster) || (opt.isPlayerOnly && isMaster)) return null;

                        return (
                            <OptionCard key={opt.id} $isActive={opt.value}>
                                <OptionIcon><opt.Icon /></OptionIcon>
                                <OptionLabel>{opt.label}</OptionLabel>
                                <OptionDescription>{opt.description}</OptionDescription>
                                <OptionCheckbox
                                    type="checkbox"
                                    id={opt.id}
                                    checked={opt.value}
                                    onChange={(e) => opt.setter(e.target.checked)}
                                />
                            </OptionCard>
                        );
                    })}
                </OptionsGrid>
                
                <ConfirmRollButton onClick={() => handleClose({ modifier, spendPA, critOnFive, isHidden })}>
                    <FaDiceD20 /> Rolar os Dados
                </ConfirmRollButton>

            </ModifierContent>
        </Modal>
    );
};