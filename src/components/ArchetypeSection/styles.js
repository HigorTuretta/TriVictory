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