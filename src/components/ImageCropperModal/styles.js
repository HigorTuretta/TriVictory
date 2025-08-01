import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// --- ESTILOS PARA O MENU INICIAL ---
export const MenuContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;
    min-height: 300px;
`;

export const MenuTitle = styled.h3`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    text-align: center;
`;

export const MenuOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;

export const MenuButton = styled.button`
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border};
    font-weight: 600;
    cursor: pointer;
    background: ${({ theme, $primary }) => $primary ? theme.primary : theme.background};
    color: ${({ theme, $primary }) => $primary ? theme.onPrimary : theme.textPrimary};
    transition: all 0.2s ease;
    min-width: 220px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;

// --- ESTILOS EXISTENTES ---
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ChangeImageButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.textSecondary};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.surfaceVariant};
        color: ${({ theme }) => theme.textPrimary};
        border-color: ${({ theme }) => theme.textSecondary};
    }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DropZone = styled.div`
  height: 340px;
  border: 3px dashed ${({ theme }) => theme.primary};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textSecondary};
  display: grid;
  place-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 0.25s;
  ${({ $drag }) =>
    $drag &&
    css`
      background: ${({ theme }) => theme.surface};
    `}
  p {
    margin-top: 0.6rem;
  }
`;

export const CropArea = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
`;

export const HelpText = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.textSecondary};
    font-style: italic;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const Range = styled.input`
  flex: 1;
`;

export const Btn = styled.button`
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  background: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${({ $primary }) =>
    $primary &&
    css`
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.onPrimary};
       &:hover:not(:disabled) {
        filter: brightness(1.1);
      }
    `}
`;

export const Stepper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  
  span {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s;
    
    &.active {
      font-weight: 700;
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.primary}20;
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

export const ColorWrap = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Preview = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ theme }) => theme.border};
`;