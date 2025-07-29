import styled from 'styled-components';

export const GridHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  flex-grow: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

export const AddCustomButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: white;
  font-weight: bold;
  white-space: nowrap;
  padding: 12px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2fa94e;
  }
`;

export const GridContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

export const ItemCard = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position: relative;
  border-left: 3px solid ${({ $isCustom, $isLocked, theme }) => 
    $isLocked ? theme.primary : ($isCustom ? theme.success : 'transparent')};

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-3px)')};
    box-shadow: ${({ disabled }) =>
      disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.3)'};
    border-color: ${({ disabled, theme }) =>
      disabled ? theme.border : theme.primary};
  }
`;

export const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

export const ItemCost = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin: 0;
`;

export const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  min-height: 30px;
`;

export const SelectedItem = styled.div`
  background-color: ${({ theme, $isLocked }) => $isLocked ? theme.primary : '#555'};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const CounterBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.surface};
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)')};
  }
`;

export const HintText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 1rem;
  text-align: right;
`;

export const CustomItemControls = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 0.25rem;

  button {
    background: rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.secondary};
    border: none;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    cursor: pointer;
  }

  ${ItemCard}:hover & button {
    visibility: visible;
    opacity: 1;
  }

  button:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;
export const SpecializationModalContent = styled.div`
  h3 { margin-bottom: 0.5rem; }
  p { margin-bottom: 1rem; color: ${({ theme }) => theme.textSecondary}; }
  hr { 
    border: none; 
    border-top: 1px solid ${({ theme }) => theme.border};
    margin: 1.5rem 0;
  }
`;

export const SpecializationInput = styled.input`
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
  }
`;

export const DisclaimerText = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 1.5rem !important;
  text-align: center;
  line-height: 1.4;

  span {
    display: block;
    margin-top: 0.25rem;
    font-weight: bold;
  }
`;