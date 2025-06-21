import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* animação do resultado */
const resultFadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

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
`;

export const DiceWrapper = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding-bottom: 10rem;
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
  animation: ${resultFadeIn} 0.5s ease-out;
`;

export const TotalText = styled.h1`
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.primary};
`;

export const BreakdownText = styled.p`
  font-size: 1.5rem;
  font-family: monospace;
  color: ${({ theme }) => theme.textSecondary};
`;
