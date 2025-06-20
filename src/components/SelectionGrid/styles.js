import styled from 'styled-components';

export const GridHeader = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
`;

export const SearchBar = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    flex-grow: 1;
`;

export const AddCustomButton = styled.button`
    background-color: var(--color-success);
    color: white;
    font-weight: bold;
    white-space: nowrap;
    padding: 12px 15px;
`;

export const GridContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    background-color: var(--color-background);
    border-radius: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

export const ItemCard = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative; // Para posicionar os botões de controle
  
  /* Borda verde para itens customizados */
  border-left: 4px solid ${props => props.$isCustom ? 'var(--color-success)' : 'transparent'};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.3)'};
    border-color: ${props => props.disabled ? 'var(--color-border)' : 'var(--color-primary)'};
  }
`;
export const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const ItemCost = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
`;

export const SelectedItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    min-height: 30px;
`;

export const SelectedItem = styled.div`
    background-color: ${props => props.$fromArchetype ? 'var(--color-secondary)' : 'var(--color-primary)'};
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const RemoveButton = styled.button`
    background-color: rgba(255,255,255,0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 0;
    line-height: 20px;
    font-weight: bold;
`;

export const HintText = styled.p`
    font-size: 0.8rem;
    color: var(--color-text-secondary);
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
        background: rgba(0,0,0,0.3);
        color: var(--color-text-secondary);
        border: none;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden; /* Escondido por padrão */
        opacity: 0;
        transition: opacity 0.2s, visibility 0.2s;
    }

    ${ItemCard}:hover & button {
        visibility: visible; /* Aparece no hover do card */
        opacity: 1;
    }

    button:hover {
        background: var(--color-primary);
        color: white;
    }

    button.delete:hover {
        background: var(--color-error);
    }
`;
