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
  flex-wrap: wrap;
  gap: 1rem;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #279644;
  }

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
    width: ${({ $percentage }) => Math.min($percentage, 100)}%;
    background-color: ${({ $percentage, theme }) => $percentage > 90 ? theme.error : theme.primary};
    border-radius: 4px;
    transition: width 0.3s ease, background-color 0.3s ease;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 250px;
  max-height: 450px; /* Aumentado para melhor usabilidade */
  overflow-y: auto;
  padding: 0.2rem 0.5rem 0.2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 1rem;
`;

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

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ItemName = styled.h4`
  font-weight: 500;
  margin: 0;
`;

export const ItemDetails = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
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
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &.delete { 
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.error}20;
        color: ${({ theme }) => theme.error};
      }
    }
    &:hover:not(:disabled) { 
      background-color: ${({ theme }) => theme.border}44;
      color: ${({ theme }) => theme.textPrimary};
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

const goldenGlow = keyframes`
  0% { box-shadow: 0 0 3px gold, inset 0 0 2px #0002; }
  50% { box-shadow: 0 0 12px gold, inset 0 0 2px #0002; }
  100% { box-shadow: 0 0 3px gold, inset 0 0 2px #0002; }
`;

export const RarityBadge = styled.span`
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  background-color: ${({ $rarity, theme }) => {
    switch ($rarity) {
      case 'Comum': return '#888';
      case 'Incomum': return theme.secondary;
      case 'Raro': return theme.primary;
      case 'Lendário': return '#FFC107';
      default: return 'transparent';
    }
  }};
  animation: ${({ $rarity }) => $rarity === 'Lendário' ? css`${goldenGlow} 2s ease-in-out infinite alternate` : 'none'};
  box-shadow: ${({ $rarity }) => $rarity === 'Lendário' ? '0 0 5px gold' : 'none'};
`;