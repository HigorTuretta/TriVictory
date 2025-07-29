import styled from 'styled-components';

export const BarContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.surfaceVariant || theme.background};
  border-radius: 8px;
  margin-top: 1rem;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const QuickButton = styled.button`
  flex-grow: 1;
  min-width: 120px; /* Garante um tamanho mínimo para os botões */
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
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonIcon = styled.div`
  font-size: 1.5rem;
  /* A cor agora é passada via prop, com um fallback para o tema */
  color: ${({ $color, theme }) => $color || theme.primary};
  display: flex;
  align-items: center;
`;

export const ButtonLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ButtonQuantity = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.surface};
  transition: all 0.2s ease;

  /* Estilo dinâmico com base na prop $hasItems */
  background-color: ${({ theme, $hasItems }) => $hasItems ? theme.primary : theme.border};
  color: ${({ theme, $hasItems }) => $hasItems ? 'white' : theme.textSecondary};
`;