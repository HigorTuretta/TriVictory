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
  transition: all 0.3s ease;
`;

export const CardValue = styled.h3`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  transition: color 0.3s ease;
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
  font-weight: 600;
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
  background-color: ${({ theme, disabled }) => disabled ? theme.border : theme.secondary};
  color: ${({ disabled }) => disabled ? '#666' : '#ffffff'};
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  border: 2px solid ${({ theme, disabled }) => disabled ? theme.border : theme.surface};
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    background-color: #7b3ff1;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(123, 63, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    transform: none;
    box-shadow: none;
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
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 2px 8px rgba(123, 63, 241, 0.2);
  }
`;

export const ResourceBar = styled.div`
  flex-grow: 1;
  height: 28px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ResourceProgress = styled.div`
  height: 100%;
  width: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
  background: linear-gradient(90deg, ${({ $color, theme }) => $color || theme.primary}, ${({ $color, theme }) => $color ? `${$color}dd` : `${theme.primary}dd`});
  transition: width 0.3s ease-in-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${({ $progress }) => $progress > 0 ? 'shimmer 2s infinite' : 'none'};
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

export const ResourceText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  z-index: 1;
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
  background-color: ${({ theme, disabled }) => disabled ? theme.border : theme.secondary};
  color: ${({ theme, disabled }) => disabled ? '#666' : theme.textPrimary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  user-select: none;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(123, 63, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    background-color: #7b3ff1;
  }

  /* Estados para segurar botão */
  &:active:not(:disabled) {
    animation: pulse 0.1s ease-in-out;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); }
    50% { transform: scale(1.05); }
    100% { transform: scale(0.95); }
  }

  &:disabled {
    opacity: 0.4;
    transform: none;
    box-shadow: none;
  }

  /* Feedback visual para touch devices */
  @media (hover: none) {
    &:active:not(:disabled) {
      background-color: #7b3ff1;
      transform: scale(0.9);
    }
  }
`;

