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
  background-color: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 8px;
  max-width: 70vw;
  min-width: fit-content;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primary};
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  margin-top: 2rem;
  max-height: 85vh;
  overflow-y: auto;

  h3 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.secondary};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: ${({ theme }) => theme.secondary};
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
  }
`;
