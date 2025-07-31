import styled from 'styled-components';

// Container para centralizar o spinner na tela
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

