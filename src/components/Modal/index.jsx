import React from 'react';
import ReactDOM from 'react-dom'; // Importe o ReactDOM
import { ModalBackdrop, ModalContent, CloseButton } from './styles';

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // Usamos ReactDOM.createPortal para renderizar o modal fora da hierarquia principal
    return ReactDOM.createPortal(
        <ModalBackdrop onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalContent>
        </ModalBackdrop>,
        document.getElementById('modal-root') // Onde o portal será renderizado
    );
};