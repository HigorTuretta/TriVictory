import styled from 'styled-components';

// --- Estilos para Modo Edição ---
export const AttributeGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  flex-wrap: wrap;

  @media(max-width: 600px) {
    flex-direction: column;
  }
`;

export const AttributeCard = styled.div`
  background: linear-gradient(145deg, var(--color-background), #1a1a21);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid var(--color-border);
  box-shadow: 5px 5px 15px #0d0d10, -5px -5px 15px #17171e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 calc(33.333% - 1rem); /* 3 cards por linha com espaço */
  min-width: 250px;

  @media(max-width: 600px) {
    flex: 1 1 100%;
  }
`;

export const CardValue = styled.h3`
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-primary);
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
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  min-height: 24px;
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
  background-color: var(--color-primary);
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  border: 2px solid var(--color-surface);
  
  &:hover {
    background-color: #7b3ff1;
    transform: scale(1.1);
  }
`;

// --- Estilos para Modo Jogo ---
export const CompactWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const CompactCard = styled.div`
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 calc(33.333% - 0.67rem);
  min-width: 250px;

  @media(max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const RowContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ResourceBar = styled.div`
  flex-grow: 1;
  height: 28px;
  background-color: #101014;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

export const ResourceProgress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${props => props.$color || 'var(--color-primary)'};
  transition: width 0.3s ease-in-out;
`;

export const ResourceText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
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
  background-color: var(--color-border);
  color: var(--color-text-primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ResourceLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-shadow: 0 0 3px rgba(0,0,0,0.4);
`;

export const ResourceIcon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;

  &.life {
    color: #F44336;
    animation-name: pulse-life;
  }
  &.mana {
    color: #00BCD4;
    animation-name: pulse-mana;
  }
  &.action {
    color: #FFC107;
    animation-name: pulse-action;
  }

  @keyframes pulse-life {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }
  @keyframes pulse-mana {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(10deg) scale(1.15); }
  }
  @keyframes pulse-action {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
`;