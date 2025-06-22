import styled from 'styled-components';

export const Header = styled.header`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
  margin-bottom: 2.5rem;
  gap: 1rem;
  
`;

export const CharacterNameInput = styled.input`
  font-size: 2.5rem;
  font-weight: 900;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textPrimary};
  flex-grow: 1;
  padding: 0.5rem 0;

  &:disabled {
    border-bottom: 2px solid transparent;
  }
`;