import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  resize: vertical;
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

export const SaveButton = styled.button`
  padding: 12px;
  margin-top: 1rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

// --- NOVOS ESTILOS ---
export const QuickAddContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const QuickAddButton = styled.button`
  padding: 6px 12px;
  font-size: 0.8rem;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }
`;