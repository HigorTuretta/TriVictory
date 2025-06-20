import styled from 'styled-components';

export const InventoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 250px;
  overflow-y: auto;
  padding: 0.5rem;
  background-color: var(--color-background);
  border-radius: 6px;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background-color: var(--color-error);
  color: white;
  padding: 5px 10px;
  font-size: 0.8rem;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const AddItemForm = styled.form`
  display: flex;
  gap: 1rem;
`;

export const AddButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    &:hover {
        background-color: #7b3ff1;
    }
`;