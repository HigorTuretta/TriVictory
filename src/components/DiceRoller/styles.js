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
  overflow: hidden;
`;

export const DiceWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

// Alterado para motion.h1 para suportar a animação de contagem.
export const TotalText = styled(motion.h1)`
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.primary || '#8a4fff'};
`;

export const BreakdownText = styled.p`
  font-size: 1.5rem;
  font-family: monospace;
  color: ${({ theme }) => theme.textSecondary || '#ccc'};
`;