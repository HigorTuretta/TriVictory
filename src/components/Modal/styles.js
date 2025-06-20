import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: start;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background-color: var(--color-surface);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  border: 1px solid var(--color-primary);
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  margin-top: 2rem;
  /* Correção para o scroll */
  max-height: 85vh; /* Altura máxima de 90% da tela */
  overflow-y: auto; /* Adiciona scroll se o conteúdo passar da altura máxima */

  h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    color: var(--color-text-secondary);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
  font-size: 1.5rem;
  line-height: 1;

  &:hover {
    color: var(--color-text-primary);
  }
`;