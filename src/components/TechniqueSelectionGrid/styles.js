import styled from 'styled-components';

export const GridContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const TechniqueCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
  transition: all 0.2s ease-in-out;
  
  border-left: 4px solid ${({ category, theme }) => {
    switch (category) {
      case 'Truques': return theme.success;
      case 'Técnicas Comuns': return theme.secondary;
      case 'Técnicas Lendárias': return theme.primary;
      default: return theme.border;
    }
  }};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: ${({ category, theme }) => {
      switch (category) {
        case 'Truques': return theme.success;
        case 'Técnicas Comuns': return theme.secondary;
        case 'Técnicas Lendárias': return theme.primary;
        default: return theme.textPrimary;
      }
    }};
  }
`;

export const TechniqueName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const CategoryBadge = styled.span`
  align-self: flex-start; /* Alinhado com o nome da técnica */
  margin-top: 0.5rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background-color: ${({ category, theme }) => {
    switch (category) {
      case 'Truques': return theme.success;
      case 'Técnicas Comuns': return theme.secondary;
      case 'Técnicas Lendárias': return theme.primary;
      default: return 'grey';
    }
  }};
`;

export const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const SelectedItem = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RemoveButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 0;
  line-height: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;