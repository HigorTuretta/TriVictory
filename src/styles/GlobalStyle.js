// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* --- Reset e Configurações Base --- */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    overflow-x: hidden;
    transition: ${({ theme }) => theme.transitions.medium};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* --- Estilos Padrão para Elementos de Formulário --- */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 10px 15px;
    font-weight: 500;
    transition: ${({ theme }) => theme.transitions.short};
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textPrimary};
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    transition: ${({ theme }) => theme.transitions.short};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
    }
  }

  /* --- Estilização da Barra de Rolagem --- */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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