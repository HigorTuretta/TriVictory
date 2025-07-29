import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalBackdrop, ModalContent, CloseButton } from './styles';

// --- Configuração das Animações ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const modalVariants = {
  hidden: { y: -50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const Modal = ({ isOpen, onClose, children, size = 'medium' }) => {
  // Efeito para fechar o modal com a tecla 'Escape'
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Usamos AnimatePresence para habilitar as animações de saída.
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <ModalBackdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <ModalContent
            $size={size}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            // Atributos de acessibilidade
            role="dialog"
            aria-modal="true"
          >
            <CloseButton onClick={onClose} aria-label="Fechar modal">×</CloseButton>
            {children}
          </ModalContent>
        </ModalBackdrop>
      )}
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
};