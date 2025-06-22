import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const CharacterNameInput = styled.input`
  font-size: 2.5rem;
  font-weight: 900;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.5rem 0;
  flex: 1 1 300px; /* permite crescer e quebrar com limite mínimo */

  &:disabled {
    border-bottom: 2px solid transparent;
  }
`;
