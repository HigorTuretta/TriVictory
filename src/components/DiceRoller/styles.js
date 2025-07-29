import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow: hidden; // Previne qualquer scroll indesejado
`;

export const DiceWrapper = styled(motion.div)`
  position: relative; // Garante que os dados fiquem no centro do wrapper
  display: flex;
  justify-content: center;
  align-items: center;
  // O gap é controlado pela transformação 'x' nos elementos filhos
`;

export const DieSvg = styled.svg`
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
`;

export const ResultWrapper = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 15px #000;
  // A animação de fade-in agora é controlada pelo framer-motion no próprio componente.
`;

export const TotalText = styled.h1`
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.primary || '#8a4fff'}; // Adicionado fallback
`;

export const BreakdownText = styled.p`
  font-size: 1.5rem;
  font-family: monospace;
  color: ${({ theme }) => theme.textSecondary || '#ccc'}; // Adicionado fallback
`;