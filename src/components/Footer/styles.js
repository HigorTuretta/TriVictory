import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: auto; // Garante que o rodapé fique no final da página
  flex-shrink: 0; // Previne que o rodapé encolha em layouts flex
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

export const ThemeToggle = styled(motion.button)`
  background: ${({ theme, $isLight }) => $isLight ? theme.surface : theme.primary};
  color: ${({ theme, $isLight }) => $isLight ? theme.textSecondary : '#fff'};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background-color 0.3s ease, color 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  
  // O framer-motion agora controla as animações de interação (hover, tap).
  // A animação de rotação contínua foi removida em favor de uma interativa.

  // O hover agora usa um filtro para um efeito mais sutil e consistente.
  &:hover {
    filter: brightness(1.1);
  }

  // Garante que o SVG dentro do botão não capture eventos do mouse.
  svg {
    pointer-events: none;
    font-size: 1.1rem; // Tamanho do ícone explícito
  }
`;