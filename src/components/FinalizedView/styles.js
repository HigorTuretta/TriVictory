import styled, { keyframes } from 'styled-components';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Item = styled.div`
  background-color: var(--color-surface);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-left: 3px solid var(--color-primary);
  transition: all 0.2s ease-in-out;
  cursor: pointer; /* Indica que o item é clicável */

  &:hover {
    background-color: #2a2a33; /* Um leve destaque no hover */
    border-left-color: var(--color-secondary);
  }
`;

export const ItemName = styled.strong`
  font-weight: 500;
  color: var(--color-text-primary);
`;

export const ItemSubOption = styled.span`
  color: var(--color-text-secondary);
  margin-left: 0.5rem;
`;

export const HintText = styled.p`
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    margin-top: 1rem;
    text-align: right;
`;