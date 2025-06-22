import styled from 'styled-components';

export const BarContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const QuickButton = styled.button`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.border};
    border-color: ${({ theme }) => theme.textSecondary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ButtonIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

export const ButtonLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ButtonQuantity = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.surface};
`;