import styled, { keyframes, css } from 'styled-components';

export const MochilaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
`;

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CapacityBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background-color: ${({ $percentage, theme }) => $percentage > 90 ? theme.error : theme.primary};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  min-height: 100px;
  overflow-y: auto;
  padding-right: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 1rem;
`;

// ... todos os outros estilos de ItemCard, ItemInfo, etc permanecem os mesmos ...
export const ItemCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.surface};
  border-left: 3px solid ${({ theme }) => theme.secondary};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: ${({ theme }) => theme.border}22; }
`;
export const ItemInfo = styled.div``;
export const ItemName = styled.h4`font-weight: 500;`;
export const ItemDetails = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textSecondary};
    cursor: pointer;
    font-size: 0.9rem;
    padding: 4px;
    &.delete { color: ${({ theme }) => theme.error}; }
    &:hover:not(:disabled) { color: ${({ theme }) => theme.textPrimary}; }
  }
`;
const goldenGlow = keyframes`
  0% { box-shadow: 0 0 5px gold; }
  50% { box-shadow: 0 0 15px gold; }
  100% { box-shadow: 0 0 5px gold; }
`;
export const RarityBadge = styled.span`
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  background-color: ${({ rarity }) => {
    switch (rarity) {
      case 'Comum': return '#888';
      case 'Incomum': return '#2196F3';
      case 'Raro': return '#9C27B0';
      case 'Lendário': return '#FFC107';
      default: return 'transparent';
    }
  }};
  animation: ${({ rarity }) => rarity === 'Lendário' ? css`${goldenGlow} 1.5s ease-in-out infinite alternate` : 'none'};
  box-shadow: ${({ rarity }) => rarity === 'Lendário' ? '0 0 5px gold' : 'none'};
`;