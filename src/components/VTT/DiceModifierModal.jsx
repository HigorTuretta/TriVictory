import React, { useState } from 'react';
import { Modal } from '../Modal';
// ... outros imports de estilo

export const DiceModifierModal = ({ modalState, setModalState }) => {
    const { isOpen, initialRoll, resolve } = modalState;
    const [modifier, setModifier] = useState(0);
    const [spendPA, setSpendPA] = useState(false);
    const [critOnFive, setCritOnFive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        resolve({ modifier, spendPA, critOnFive, isHidden });
        setModalState({ isOpen: false, initialRoll: null, resolve: null });
    };

    const handleCancel = () => {
        resolve(null); // Resolve como nulo para indicar cancelamento
        setModalState({ isOpen: false, initialRoll: null, resolve: null });
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <h3>Modificar Rolagem</h3>
            <p>Resultado dos dados: {initialRoll.results.join(', ')}</p>
            {/* Inputs para modifier, toggles para PA, crit, hidden */}
            <button onClick={handleConfirm}>Confirmar Rolagem</button>
        </Modal>
    );
};