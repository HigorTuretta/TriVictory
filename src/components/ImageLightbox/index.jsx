import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import {
  Overlay,
  Content,
  FullImage,
  CloseButton
} from './styles';

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } }
};

const contentVariants = {
  hidden:  { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 250, damping: 25 }
  },
  exit:    { scale: 0.8, opacity: 0, transition: { duration: 0.2 } }
};

export const ImageLightbox = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <Content
          variants={contentVariants}
          onClick={e => e.stopPropagation()}
        >
          <FullImage src={imageUrl} alt="Imagem ampliada" />

          <CloseButton onClick={onClose} title="Fechar">
            <FaTimes />
          </CloseButton>
        </Content>
      </Overlay>
    </AnimatePresence>
  );
};
