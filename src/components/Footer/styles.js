import styled, { keyframes } from 'styled-components';

// animação sutil de rotação
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: auto;
`;

export const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;

  strong {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ThemeToggle = styled.button`
  background: ${({ theme, $isLight }) => $isLight ? theme.surface : theme.primary};
  color: ${({ theme, $isLight }) => $isLight ? theme.textSecondary : '#fff'};
  border: none;
  border-radius: 50%;
  padding: 0.8rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    animation: ${rotate} 0.6s linear;
    background: ${({ theme }) => theme.secondary};
    color: #fff;
  }

  svg {
    pointer-events: none;
  }
`;
