import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// O backdrop agora é um componente `motion.div` para animar sua opacidade.
export const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinha no topo para melhor visualização */
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto; /* Permite scroll no backdrop se o conteúdo for maior que a tela */
`;

// O conteúdo também é um `motion.div` para animar sua entrada/saída.
export const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primary}40;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  margin-top: 2rem;
  margin-bottom: 2rem;

  /* Lógica para tamanhos de modal configuráveis */
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`max-width: 400px;`;
      case 'large':
        return css`max-width: 900px;`;
      case 'medium':
      default:
        return css`max-width: 600px;`;
    }
  }}

  /* Estilos para os filhos do modal */
  h3 {
    color: ${({ theme }) => theme.primary};
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.border};
    transform: rotate(90deg);
  }
`;