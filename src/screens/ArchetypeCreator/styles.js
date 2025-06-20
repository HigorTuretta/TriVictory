import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

export const CreatorContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.background};
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #b0b0c0;
  }
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
  color: ${({ theme }) => theme.secondary};
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  font-size: 1rem;
  resize: vertical;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

export const SubSection = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
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
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.background};
  font-weight: bold;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.error};
  color: white;
  font-weight: bold;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 1.2rem;
  line-height: 1;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const ChoiceBlock = styled.div`
  border: 1px dashed ${({ theme }) => theme.border};
  padding: 1rem;
  border-radius: 6px;

  h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.secondary};
    margin-bottom: 1rem;
  }
`;

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px;
  margin-top: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2fa94e;
  }
`;
