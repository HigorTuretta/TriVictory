import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// --- Search Bar ---
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem; /* Espaço para o ícone */
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.8rem;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
  pointer-events: none; /* Para não interferir com o clique no input */
`;

// --- Character Grid ---
export const CharacterGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

// --- Character Card ---
export const CardWrapper = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.surfaceVariant};
  aspect-ratio: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export const CardBackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center 25%;
  transition: transform 0.4s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.1);
  }
`;

export const CardGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(18, 18, 23, 0.95) 20%,
    rgba(18, 18, 23, 0.5) 50%,
    transparent 100%
  );
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
  }
`;

export const StatusPill = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError || '#fff'};
  z-index: 3;
`;

export const DeleteButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;

  /* área de clique recomendada (≈44 px) */
  width: 44px;
  height: 44px;
  border-radius: 50%;

  background: ${({ theme }) => theme.surfaceElevated ?? 'rgba(255,255,255,0.08)'};
  border: 2px solid transparent;
  color: ${({ theme }) => theme.textPrimary};
font-size: 1.6rem;
line-height: 0; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.error};
    color: ${({ theme }) => theme.onError ?? '#fff'};
    border-color: ${({ theme }) => theme.error};
    transform: scale(1.06);
  }

  /* qualquer SVG dentro do botão ocupa ~60 % do círculo */
  & > svg {
    pointer-events: none;   /* não intercepta o hover */
  }
`;
// --- New Character Card ---
export const NewCharacterCard = styled(motion.form)`
  background: transparent;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 12px;
  aspect-ratio: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease;
  padding: 1.5rem;
  gap: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
  }
`;

export const FormTitle = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
`;

export const PointsInput = styled.input`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.5rem;
  width: 80px;
  text-align: center;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

export const NewCharacterButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  font-weight: 600;
  border: none;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

   &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 15px ${({ theme }) => theme.primary}40;
  }
`;
