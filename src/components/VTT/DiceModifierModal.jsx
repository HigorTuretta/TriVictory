// src/components/VTT/DiceModifierModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRoom } from '../../contexts/RoomContext';
import { Modal } from '../Modal';
import { ModifierContent, ModifierInput, OptionsGrid, OptionToggle, RollButton } from './styles';

export const DiceModifierModal = ({ isOpen, onClose }) => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const isMaster = room.masterId === currentUser.uid;

    const [modifier, setModifier] = useState(0);
    const [spendPA, setSpendPA] = useState(false);
    const [critOnFive, setCritOnFive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleConfirm = () => {
        onClose({ modifier, spendPA, critOnFive, isHidden });
        // Reseta o estado para a próxima abertura
        setModifier(0);
        setSpendPA(false);
        setCritOnFive(false);
        setIsHidden(false);
    };

    const handleCancel = () => {
        onClose(null); // Envia nulo para indicar cancelamento
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModifierContent>
                <h3>Modificar Rolagem</h3>
                <ModifierInput>
                    <label htmlFor="modifier">Modificador Adicional</label>
                    <input
                        id="modifier"
                        type="number"
                        value={modifier}
                        onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                        autoFocus
                    />
                </ModifierInput>
                <OptionsGrid>
                    <OptionToggle>
                        <input type="checkbox" id="spendPA" checked={spendPA} onChange={(e) => setSpendPA(e.target.checked)} />
                        <label htmlFor="spendPA">Gastar 1 PA? (1d=6)</label>
                    </OptionToggle>
                    <OptionToggle>
                        <input type="checkbox" id="critOnFive" checked={critOnFive} onChange={(e) => setCritOnFive(e.target.checked)} />
                        <label htmlFor="critOnFive">Crítico com 5 ou 6?</label>
                    </OptionToggle>
                    {isMaster && (
                        <OptionToggle>
                            <input type="checkbox" id="isHidden" checked={isHidden} onChange={(e) => setIsHidden(e.target.checked)} />
                            <label htmlFor="isHidden">Rolagem Oculta?</label>
                        </OptionToggle>
                    )}
                </OptionsGrid>
                <RollButton onClick={handleConfirm}>Rolar Dados</RollButton>
            </ModifierContent>
        </Modal>
    );
};