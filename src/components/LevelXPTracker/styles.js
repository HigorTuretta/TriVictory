import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// O container principal, agora mais integrado ao tema
export const Wrapper = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.border};
  min-height: 80px;
  transition: all 0.3s ease-in-out;

  ${({ $isEditing }) => $isEditing && css`
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  `}
`;

// -- MODO VISUALIZAÇÃO --

// Círculo estiloso para o nível
export const LevelDisplay = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 15px ${({ theme }) => theme.primary}40;
  
  span:first-child {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
    line-height: 1;
  }
  span:last-child {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    line-height: 1.1;
  }
`;

// A nova barra de XP
export const BarContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const BarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;

// Estilo para os botões de reset
export const ResetActions = styled.div`
    display: flex;
    gap: 0.5rem;

    button {
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.textSecondary};
        padding: 0.2rem;
        cursor: pointer;
        transition: color 0.2s, transform 0.2s;
        display: flex;
        align-items: center;

        &:hover:not(:disabled) {
            color: ${({ theme }) => theme.primary};
            transform: scale(1.1);
        }

        &.danger:hover:not(:disabled) {
            color: ${({ theme }) => theme.error};
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    }
`;

export const XPBar = styled.div`
  width: 100%;
  height: 18px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

// A barra de progresso com animação framer-motion
export const XPProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 18px;
  transition: width 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

// Botões de Ação (+ e -)
export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceVariant || theme.background};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }

  &.remove:not(:disabled):hover {
    background: ${({ theme }) => theme.error};
    border-color: ${({ theme }) => theme.error};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Form inline para adicionar XP
export const AddXpForm = styled.form`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
`;

export const AddXpInput = styled.input`
    width: 70px;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    text-align: center;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
    }
`;


// -- MODO EDIÇÃO --
// Estilos aprimorados para o formulário de edição

export const EditGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const EditField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
  }

  input[type="number"], input[type="text"] {
    width: 100%;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;