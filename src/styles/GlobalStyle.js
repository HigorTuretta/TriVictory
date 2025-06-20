import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Importa a fonte que estamos usando no projeto */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

  /* Reseta os estilos padrão do navegador */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    /* Usa as variáveis do tema para definir as cores de fundo e de texto */
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Estilos padrão para botões */
  button {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }

  /* Estilos padrão para inputs */
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

  /* Estilos da barra de rolagem */
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
