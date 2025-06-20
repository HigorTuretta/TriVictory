import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SheetContainer = styled.div`
  background-color: var(--color-surface);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  max-width: 1400px;
  margin: 2rem auto;
  animation: ${css`${fadeIn} 0.5s ease-in-out`};
  position: relative;
  transition: filter 0.5s ease-in-out;
  filter: ${props => props.$isDead ? 'grayscale(100%)' : 'none'};
`;

export const DeathAnimationOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
  border-radius: 12px;
  pointer-events: none;

  div {
    width: 300px;
    height: 300px;
  }
`;

export const FloatingActionButton = styled.button`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    z-index: 100;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1) rotate(15deg);
    }
`;

export const BackButton = styled.button`
    background-color: var(--color-text-secondary);
    color: var(--color-background);
    margin-bottom: 1.5rem;
    &:hover { background-color: #b0b0c0; }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CharacterNameInput = styled.input`
  font-size: 2.5rem;
  font-weight: 900;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-border);
  color: var(--color-text-primary);
  border-radius: 0;
  width: auto;
  flex-grow: 1;
  padding: 0.5rem 0;
  
  &:disabled {
      background: transparent;
      color: var(--color-text-primary);
      cursor: default;
      border-bottom: 2px solid transparent;
  }
`;

export const Section = styled.section`
  width: 100%;
  display: block;
`;
export const FinalizedSection = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: var(--color-background);
    border-radius: 8px;
    animation: ${css`${fadeIn} 0.4s ease-out`};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    ${SectionTitle} {
        margin-bottom: 0;
        border-bottom: none;
    }
`;

export const VisibilityButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem;
    padding: 0 10px;
    opacity: 0.7;
    cursor: pointer;
    color: var(--color-text-secondary);

    &:hover {
        opacity: 1;
        transform: scale(1.1);
        color: var(--color-text-primary);
    }
`;

export const HeaderPanel = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
`;

export const SheetLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; 
  gap: 2rem;
  align-items: start;
  padding-bottom: 3rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const RightColumn = styled.div`
  height: 100%;
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const FooterPanel = styled.div`
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
`;

export const BackstoryTextarea = styled.textarea`
    width: 100%;
    min-height: 150px;
    resize: vertical;
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 0;
    white-space: pre-wrap;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);

    &:read-only {
        border-color: transparent;
        color: var(--color-text-secondary);
    }

    &:disabled {
      opacity: 0.7;
    }
`;

export const NotesTextarea = styled(BackstoryTextarea)`
    border: 1px solid var(--color-border);
    min-height: 200px;
`;

export const DeathButton = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-color: #a80000;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 8px 15px;
    border: 1px solid #ff4d4d;
    box-shadow: 0 0 10px #a80000;
    z-index: 20;

    &.resurrect {
        background-color: var(--color-success);
        border-color: #81c784;
        box-shadow: 0 0 10px var(--color-success);
    }

    &:hover {
        transform: scale(1.05);
    }
`;

export const ArchetypeSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
`;

export const AddArchetypeButton = styled.button`
    width: 100%;
    margin-top: 1rem;
    background-color: var(--color-success);
    color: white;
    font-weight: 500;
    padding: 8px;
    font-size: 0.9rem;
`;

export const ArchetypeInfo = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--color-background);
    border-radius: 6px;
    border-left: 3px solid var(--color-secondary);
`;

export const ArchetypeChoiceInfo = styled(ArchetypeInfo)`
    border-left: 3px solid var(--color-success);
    
    strong {
        color: var(--color-success);
        display: block;
        margin-bottom: 0.5rem;
    }

    span {
        display: block;
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }
`;

export const ArchetypePower = styled.p`
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    & + & {
        margin-top: 0.5rem;
    }
`;

export const ChoiceButton = styled.button`
    width: 100%;
    background-color: var(--color-primary);
    color: white;
    text-align: center;
    padding: 12px;
    font-size: 1rem;
    margin-top: 0.5rem;

    &:hover {
        background-color: #7b3ff1;
    }
`;