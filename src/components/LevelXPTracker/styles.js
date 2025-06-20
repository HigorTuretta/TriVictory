import styled from 'styled-components';

export const XPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-background);
  padding: 0.75rem;
  border-radius: 8px;
  height: 100%;
`;

export const LevelDisplay = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-secondary);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const XPBar = styled.div`
  flex-grow: 1;
  height: 25px;
  background-color: #101014;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
`;

export const XPProgress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 25px;
  transition: width 0.5s ease-in-out;
`;

export const XPText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  text-shadow: 1px 1px 2px black;
`;

export const ActionButtonsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    
    button {
        background-color: var(--color-border);
        color: var(--color-text-secondary);
        border-radius: 4px;
        padding: 4px;
        line-height: 0;
        
        &:hover {
            color: var(--color-text-primary);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            color: var(--color-text-secondary);
        }
    }
`;

export const AddXPButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--color-success);
    color: white;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        background-color: var(--color-border);
        cursor: not-allowed;
    }

    &.remove {
        background-color: var(--color-error);
    }
`;

export const AddXpForm = styled.form`
    display: flex;
    gap: 0.5rem;
`;

export const AddXpInput = styled.input`
    width: 60px;
    padding: 5px;
    text-align: center;
`;

export const EditContainer = styled.div`
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    justify-content: center;
`;

export const EditForm = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const EditLabel = styled.label`
    color: var(--color-text-secondary);
    font-weight: 500;
    flex-basis: 150px;
    white-space: nowrap;
`;

export const EditInput = styled.input`
    flex-grow: 1;
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    
    label {
        margin-right: 10px;
        cursor: pointer;
    }
    input[type="radio"] {
        width: auto;
        cursor: pointer;
    }
`;