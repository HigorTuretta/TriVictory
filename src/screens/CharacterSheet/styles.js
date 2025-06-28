//src\screens\CharacterSheet\styles.js
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const SheetContainer = styled.div`
  background-color: transparent; // O fundo agora é controlado pelo tema geral
  padding: 0 2rem 2rem 2rem; // Remove o padding do topo
  border-radius: 18px;
  border: none; // O header agora tem a borda principal
  box-shadow: none; // O header agora tem a sombra principal
  max-width: 1400px;
  margin: 2rem auto;
  animation: ${css`${fadeIn} 0.5s ease-in-out`};
  position: relative;
  transition: filter 0.5s ease-in-out;
  filter: ${({ $isDead }) => ($isDead ? 'grayscale(100%)' : 'none')};
  
  // Adiciona um espaçamento entre o Header e o próximo conteúdo
  & > *:nth-child(2) { // O próximo elemento após o Header
    margin-top: 2rem;
  }
`;
export const DeathAnimationOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 15;
  border-radius: 12px;
  pointer-events: none;
  div { width: 300px; height: 300px; }
`;

export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 100;
  transition: all 0.3s ease;
  &:hover { transform: scale(1.1) rotate(15deg); }
`;

export const BackButton = styled.button`
  background-color: ${({ theme }) => theme.textSecondary};
  color: ${({ theme }) => theme.background};
  margin-bottom: 1.5rem;
  &:hover { background-color: #b0b0c0; }
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const HeaderPanel = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr;
  gap: 2rem;
  padding: 2rem; // Adiciona um padding interno
  background: ${({ theme }) => theme.surface}; // Dá um fundo próprio
  border-radius: 18px; // Arredonda as bordas
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
export const SheetLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

export const DeathButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: #a80000;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 15px;
  border: 1px solid #ff4d4d;
  box-shadow: 0 0 10px #a80000;
  z-index: 20;

  &.resurrect {
    background-color: ${({ theme }) => theme.success};
    border-color: #81c784;
    box-shadow: 0 0 10px ${({ theme }) => theme.success};
  }

  &:hover { transform: scale(1.05); }
`;

export const ChoiceButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
  padding: 12px;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:hover { background-color: #7b3ff1; }
`;