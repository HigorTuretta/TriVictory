import React from 'react';
import { Modal } from '../Modal'; // A principal mudança: importamos o COMPONENTE Modal, não seus estilos
import { ConfirmWrapper, ConfirmButton } from './styles';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmButtonClass = "confirm" }) => {
    // O componente agora é um invólucro para o nosso componente Modal já existente.
    // O 'isOpen' e 'onClose' são passados para o Modal controlar sua visibilidade.
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{title}</h3>
            <p>{message}</p>
            <ConfirmWrapper>
                <ConfirmButton onClick={onClose} className="cancel">Cancelar</ConfirmButton>
                <ConfirmButton onClick={onConfirm} className={confirmButtonClass}>Confirmar</ConfirmButton>
            </ConfirmWrapper>
        </Modal>
    );
};