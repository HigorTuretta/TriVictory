import styled from 'styled-components';

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-right: 2.5rem; 
`;

export const TechniqueTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const InfoItem = styled.div`
  strong {
    display: block;
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
  }
  span {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const Description = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.textSecondary};
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin: 1.5rem 0;
`;

export const VariationsHeader = styled.h4`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const VariationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  margin: 0 -0.5rem;
`;

export const VariationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
`;

export const VariationDetails = styled.div``;

export const VariationName = styled.h5`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.secondary};
`;

export const VariationDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textSecondary};
  padding-right: 1rem;
`;

export const VariationActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
`;

export const VariationInfo = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: ${({ theme, disabled }) => disabled ? theme.border : theme.success};
  color: ${({ disabled }) => disabled ? 'grey' : 'white'};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2e7d32;
  }
`;