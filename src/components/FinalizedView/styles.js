import styled from 'styled-components';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Item = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.primary};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(.8);
  }
`;

export const ItemName = styled.strong`
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
`;

export const ItemSubOption = styled.span`
  color: ${({ theme }) => theme.secondary};
  margin-left: 0.5rem;
`;

export const HintText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 1rem;
  text-align: right;
`;
