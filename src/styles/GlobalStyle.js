import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* A linha de @import foi REMOVIDA daqui */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  button {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }

  input, textarea, select {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textPrimary};
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;
