import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  color: var(--color-primary);
  text-shadow: 0 0 15px rgba(138, 79, 255, 0.5);
  margin-bottom: 3rem;
`;

export const CharacterSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

export const CharacterSlot = styled.div`
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: var(--color-primary);
    transform: scale(1.02);
  }
`;

export const CharacterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StatusLabel = styled.span`
  background-color: var(--color-error);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
`;

export const DeleteButton = styled.button`
    background-color: var(--color-error);
    color: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-weight: bold;
    font-size: 1rem;
    padding: 0;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    transition: opacity 0.2s;
    flex-shrink: 0;
  
  ${CharacterSlot}:hover & {
      opacity: 1;
  }
`;

export const NewCharacterForm = styled.form`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-surface);
`;

export const PointsInput = styled.input`
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
`;

export const NewCharacterButton = styled.button`
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 700;
  border: none;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  margin-top: 1rem;

   &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(138, 79, 255, 0.5);
  }
`;