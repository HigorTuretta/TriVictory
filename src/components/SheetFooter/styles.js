import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const FooterPanel = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const FinalizedSection = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  animation: ${css`${fadeIn} 0.4s ease-out`};
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

export const BackstoryTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  white-space: pre-wrap;

  &:read-only { 
    border-color: transparent; 
    color: ${({ theme }) => theme.textSecondary}; 
  }

  &:disabled { opacity: 0.7; }
`;