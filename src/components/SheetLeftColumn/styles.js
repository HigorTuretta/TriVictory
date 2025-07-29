//src\components\SheetLeftColumn\styles.js
import styled from 'styled-components';

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const BaseTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  white-space: pre-wrap;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  &:read-only { 
    border-color: transparent; 
    background-color: transparent;
    color: ${({ theme }) => theme.textSecondary}; 
  }
  
  &:disabled { 
      opacity: 0.7; 
      cursor: not-allowed;
  }
`;

export const NotesTextarea = styled(BaseTextarea)`
  min-height: 200px;
`;