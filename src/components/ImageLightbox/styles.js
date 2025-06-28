import styled from 'styled-components';
import { motion } from 'framer-motion';

/* --- Camada de fundo --- */
export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  padding: 2rem;                           /* respiro lateral */
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;                     /* centraliza verticalmente */
  justify-content: center;                 /* centraliza horizontalmente */
  z-index: 1000;
`;

/* --- Quadro da imagem (referência para o botão) --- */
export const Content = styled(motion.div)`
  position: relative;                      /* CloseButton usa como referência */
  display: inline-block;                   /* encolhe para caber a imagem */
`;

/* --- Imagem --- */
export const FullImage = styled.img`
  display: block;
  max-width: 70vw;                         /* limite de 70 % da viewport */
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;                     /* nunca corta nada */
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

/* --- Botão “X” --- */
export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);         /* cola na quina externa */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(50%, -50%) scale(1.1) rotate(90deg);
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;
