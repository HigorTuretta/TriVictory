import styled from 'styled-components';

/* ---------- Modo Edição ---------- */

export const AttributeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const AttributeCard = styled.div`
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.surface},
    ${({ theme }) => theme.background}
  );
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 5px 5px 15px #0d0d10, -5px -5px 15px #17171e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardValue = styled.h3`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
`;

export const CardLabel = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const CardResource = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1rem;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ControlButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.secondary};
  color: #ffffff;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  border: 2px solid ${({ theme }) => theme.surface};

  &:hover {
    background-color: #7b3ff1;
    transform: scale(1.1);
  }
`;

/* ---------- Modo Jogo ---------- */

export const CompactWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CompactCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
`;

export const ResourceBar = styled.div`
  flex-grow: 1;
  height: 28px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

export const ResourceProgress = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ $color, theme }) => $color || theme.primary};
  transition: width 0.3s ease-in-out;
`;

export const ResourceText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
`;

export const ResourceControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ResourceButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
