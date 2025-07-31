// src/screens/CharacterSheet/styles.js
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const SheetContainer = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem 4rem;
  animation: ${css`${fadeIn} 0.5s ease-in-out`};
  position: relative;
  transition: filter 0.5s ease-in-out;
  filter: ${({ $isDead }) => ($isDead ? 'grayscale(80%) opacity(0.9)' : 'none')};
  
  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
    margin: 1rem auto;
  }
`;

export const DeathAnimationOverlay = styled.div`
  position: fixed; /* Fixo na tela inteira */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(2px);
  z-index: 999;
  pointer-events: none;
  div { max-width: 400px; max-height: 400px; }

  @media (max-width: 768px) {
    div { max-width: 250px; max-height: 250px; }
  }
`;

export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 100;
  transition: all 0.3s ease;

  /* Estilos dinâmicos baseados nas props */
  background: ${({ theme, $isEditing, $isDead }) => {
    if ($isDead) return theme.success;
    if ($isEditing) return theme.secondary;
    return theme.primary;
  }};

  &:hover { 
    transform: scale(1.1) rotate(10deg);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
    right: 1.5rem;
  }
`;

export const BackButton = styled.button`
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover { 
    background-color: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

export const HeaderPanel = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  margin-bottom: 2.5rem;

  @media (max-width: 900px) { 
    padding: 1.5rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

export const SheetLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) { 
    grid-template-columns: 1fr; 
    gap: 2rem;
  }
`;

export const ChoiceButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) { 
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
`;