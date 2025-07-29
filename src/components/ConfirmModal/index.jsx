import React from 'react';
import { Modal } from '../Modal';
import { ConfirmWrapper, ConfirmButton } from './styles';

/**
 * Modal de confirmação que reutiliza o componente base de Modal.
 * A prop `confirmButtonClass` foi renomeada para `confirmVariant` para refletir melhor
 * seu propósito e desacoplar da implementação via classes CSS.
 * As variantes possíveis são 'confirm', 'resurrect', e 'cancel'.
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmVariant = "confirm"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>{title}</h3>
      <p>{message}</p>
      <ConfirmWrapper>
        {/* A variante de estilo agora é passada como uma prop diretamente para o styled-component,
            que é responsável por aplicar a lógica de estilização. */}
        <ConfirmButton $variant="cancel" onClick={onClose}>
          Cancelar
        </ConfirmButton>
        <ConfirmButton $variant={confirmVariant} onClick={onConfirm}>
          Confirmar
        </ConfirmButton>
      </ConfirmWrapper>
    </Modal>
  );
};