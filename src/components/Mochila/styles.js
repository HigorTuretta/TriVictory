import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const MochilaContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`;

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondary};
  }

  > div {
    width: 100%;
  }
`;

export const CapacityBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 5px;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background-color: ${({ $percentage, theme }) =>
      $percentage > 90 ? theme.error : theme.primary};
    border-radius: 5px;
    transition: width 0.3s ease-in-out;
  }
`;

export const ItemForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.surface};
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FormLabel = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 0.2rem;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 1rem;

  button[type='submit'] {
    background-color: ${({ theme }) => theme.success};
    color: white;
    flex-grow: 1;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #2fa94e;
    }
  }
`;

export const ItemList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 5px;
  min-height: 300px;
`;

export const ItemCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  background-color: ${({ theme }) => theme.surface};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.secondary};
  gap: 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === 'dark' ? '#2a2a33' : '#e5e5ec'};
  }
`;

export const ItemName = styled.span`
  grid-column: 1 / 2;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemQuantity = styled.span`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  text-align: right;
`;

export const ItemWeight = styled.span`
  grid-column: 1 / 2;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
`;

export const ItemActions = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    background-color: ${({ theme }) => theme.border};
    width: 28px;
    height: 28px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textPrimary};
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button.delete {
    background-color: ${({ theme }) => theme.error};
    color: white;
  }
`;
