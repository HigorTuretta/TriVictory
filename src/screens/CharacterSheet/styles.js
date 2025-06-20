import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SheetContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
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
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
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
    background-color: ${({ theme }) => theme.textSecondary};
    color: ${({ theme }) => theme.background};
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
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 0;
  width: auto;
  flex-grow: 1;
  padding: 0.5rem 0;
  
  &:disabled {
      background: transparent;
      color: ${({ theme }) => theme.textPrimary};
      cursor: default;
      border-bottom: 2px solid transparent;
  }
`;

export const Section = styled.section``;

export const FinalizedSection = styled.div`
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.background};
    border-radius: 8px;
    animation: ${css`${fadeIn} 0.4s ease-out`};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
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
    color: ${({ theme }) => theme.textSecondary};

    &:hover {
        opacity: 1;
        transform: scale(1.1);
        color: ${({ theme }) => theme.textPrimary};
    }
`;

export const HeaderPanel = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SheetLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr; 
  gap: 2rem;
  align-items: start;

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
    border-top: 1px solid ${({ theme }) => theme.border};
`;

export const BackstoryTextarea = styled.textarea`
    width: 100%;
    min-height: 150px;
    resize: vertical;
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 0;
    white-space: pre-wrap;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};

    &:read-only {
        border-color: transparent;
        color: ${({ theme }) => theme.textSecondary};
    }

    &:disabled {
      opacity: 0.7;
    }
`;

export const NotesTextarea = styled(BackstoryTextarea)`
    border: 1px solid ${({ theme }) => theme.border};
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
        background-color: ${({ theme }) => theme.success};
        border-color: #81c784;
        box-shadow: 0 0 10px ${({ theme }) => theme.success};
    }

    &:hover {
        transform: scale(1.05);
    }
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

export const ArchetypeSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
`;

export const ArchetypeInfo = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.background};
    border-radius: 6px;
    border-left: 3px solid ${({ theme }) => theme.secondary};
`;

export const ArchetypeChoiceInfo = styled(ArchetypeInfo)`
    border-left: 3px solid ${({ theme }) => theme.success};
    
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

export const ArchetypePower = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    & + & {
        margin-top: 0.5rem;
    }
`;

export const ChoiceButton = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    text-align: center;
    padding: 12px;
    font-size: 1rem;
    margin-top: 0.5rem;

    &:hover {
        background-color: #7b3ff1;
    }
`;
