import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

export const CreatorContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
    background-color: var(--color-text-secondary);
    color: var(--color-background);
    margin-bottom: 1.5rem;
    &:hover { background-color: #b0b0c0; }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const Input = styled.input`
  font-size: 1rem;
`;

export const Textarea = styled.textarea`
  font-size: 1rem;
  resize: vertical;
`;

export const SubSection = styled.div`
  background-color: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
`;

export const DynamicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AddButton = styled.button`
    background-color: var(--color-secondary);
    color: var(--color-background);
    font-weight: bold;
    align-self: flex-start;
`;

export const RemoveButton = styled.button`
    background-color: var(--color-error);
    color: white;
    font-weight: bold;
    width: 28px;
    height: 28px;
    padding: 0;
    font-size: 1.2rem;
    line-height: 1;
`;

export const ChoiceBlock = styled.div`
    border: 1px dashed var(--color-border);
    padding: 1rem;
    border-radius: 6px;

    h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-secondary);
        margin-bottom: 1rem;
    }
`;

export const SaveButton = styled.button`
    background-color: var(--color-success);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 15px;
    margin-top: 1rem;
`;