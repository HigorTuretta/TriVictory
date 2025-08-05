// src/components/Artifacts/styles.js
import styled from 'styled-components';

// --- Estilos para ArtifactList ---

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Estilo do botão de Criar Artefato */
  & > button {
    background-color: ${({ theme }) => theme.success}20;
    color: ${({ theme }) => theme.success};
    border: 2px dashed ${({ theme }) => theme.success};
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.success}30;
      border-style: solid;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
      background-color: transparent;
    }
  }
`;

export const ArtifactCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem 1.5rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ArtifactName = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
`;

export const ArtifactActions = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    background: transparent;
    color: ${({ theme }) => theme.textSecondary};
    transition: all 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: scale(1.1);
    }
    
    &[title="Deletar Artefato"]:hover {
      color: ${({ theme }) => theme.error};
    }
  }
`;

export const QualityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QualityItem = styled.div`
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const QualityDescription = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.4;
`;


// --- Estilos para ArtifactBuilderModal ---

export const BuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  input {
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: 700;
    background: transparent;
    color: ${({ theme }) => theme.textPrimary};
    border: none;
    
    &:focus {
      outline: none;
    }
  }
`;

export const XpTracker = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme, $invalid }) => $invalid ? theme.error : theme.success};
  white-space: nowrap;
`;

export const QualityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-height: 45vh;
  overflow-y: auto;
  padding: 0.5rem;
`;

export const QualityCard = styled.button`
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;

  border: 2px solid ${({ theme, $selected }) => $selected ? theme.primary : theme.border};
  background-color: ${({ theme, $selected }) => $selected ? theme.primary + '20' : theme.surface};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }

  strong {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
  }

  small {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.4;
  }
`;

export const AddCustomButton = styled.button`
    color: ${({ theme }) => theme.secondary};
    font-weight: 600;
    margin-top: 1rem;
    padding: 0.75rem;
    border: 1px dashed ${({ theme }) => theme.secondary};
    border-radius: 6px;

    &:hover {
        background-color: ${({ theme }) => theme.secondary}20;
        border-style: solid;
    }
`;

export const SubChoiceInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;