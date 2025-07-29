import styled, { css } from "styled-components";

const sharedButtonPulse = css`
  &:active:not(:disabled) {
    transform: scale(0.95);
    animation: pulse 0.1s ease-in-out;
  }
  @keyframes pulse {
    0% { transform: scale(0.95); }
    50% { transform: scale(1.02); }
    100% { transform: scale(0.95); }
  }
  @media (hover: none) {
    &:active:not(:disabled) { transform: scale(0.9); }
  }
`;

export const MoneyContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MoneyDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  justify-content: center;
`;

export const Amount = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  line-height: 1;
  text-shadow: 0 1px 3px #00000080;
`;

export const CurrencyType = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
`;

export const QuickControls = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

export const QuickButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  min-height: 36px;
  color: white;
  ${sharedButtonPulse};

  background-color: ${({ theme, $variant }) => $variant === 'add' ? theme.success : theme.error};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textSecondary};
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

export const ActionButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  ${sharedButtonPulse};

  background-color: ${({ theme, $variant }) => $variant === 'add' ? theme.success : theme.error};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

export const ActionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const AmountInput = styled.input`
  width: 100%;
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  transition: all 0.2s ease;
  appearance: textfield;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
  }
`;

export const FormButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ theme, $variant }) => $variant === 'cancel'
    ? css`
      background-color: transparent;
      color: ${theme.textSecondary};
      &:hover { color: ${theme.error}; }
    `
    : css`
      background-color: ${theme.primary};
      color: ${theme.onPrimary};
      &:hover { filter: brightness(1.15); }
    `
  }
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
`;

export const EditRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
  }

  input, select {
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
    }
  }
`;