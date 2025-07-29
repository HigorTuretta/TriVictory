import styled from 'styled-components';

export const SettingsContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.primary};
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-size: 1.1rem;
  font-weight: 600;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  width: 90px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

export const Unit = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;