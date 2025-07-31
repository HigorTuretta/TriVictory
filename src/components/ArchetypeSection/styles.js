// src/components/ArchetypeSection/styles.js
import styled from 'styled-components';

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ArchetypeSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
`;

export const AddArchetypeButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.success};
  color: white;
  font-weight: 500;
  padding: 8px;
  font-size: 0.9rem;
`;

export const ArchetypeInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.secondary};
`;

export const ArchetypePower = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};

  & + & {
    margin-top: 0.5rem;
  }
`;

export const ArchetypeChoiceInfo = styled(ArchetypeInfo)`
  border-left-color: ${({ theme }) => theme.success};
  
  strong {
    color: ${({ theme }) => theme.success};
    display: block;
    margin-bottom: 0.5rem;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
`;

// --- NOVOS ESTILOS PARA O MODAL DE ESCOLHA ---

export const ModalContent = styled.div`
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
  p {
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

export const ChoiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChoiceButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const ChoiceDescription = styled.p`
  font-size: 0.8rem !important;
  color: ${({ theme }) => theme.textSecondary} !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0 !important;
  padding-left: 0.5rem;
`;