import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

const withBaseOpacity = (hex) => rgba(hex, 0.25);

// O Wrapper principal
export const Wrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onPrimary};
  margin-bottom: 2rem;

  ${({ $dead }) =>
    $dead &&
    css`
      filter: grayscale(100%) opacity(0.6);
    `}
  
  @media (max-width: 768px) {
    height: 250px;
    border-radius: 0;
    margin-bottom: 1.5rem;
  }
`;

// A imagem de fundo do banner
export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center ${({ $position }) => $position}%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

// Overlay com gradiente
export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to top,
    rgba(30, 30, 38, 0.95) 0%,
    rgba(30, 30, 38, 0.7) 40%,
    transparent 80%
  );
  
  ${Wrapper}:hover & + ${BannerImage} {
      transform: scale(1.05);
  }
`;

// Conteúdo sobre a imagem
export const Content = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: flex-end;
  }
`;

// Wrapper para a linha inferior
export const BottomRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    pointer-events: auto;
`;

// Token
export const TokenWrap = styled.div`
  width: 84px;
  height: 84px;
  padding: 4px;
  border-radius: 50%;
  background: ${({ $border }) => $border};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  z-index: 4;
  pointer-events: auto;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

export const Token = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

// Botão de upload
export const UploadBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  cursor: pointer;
  z-index: 5;
  opacity: 0.8;
  transition: all 0.2s;
  pointer-events: auto;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    top: 1rem;
    right: 1rem;
  }
`;

// ✅ Botão para ampliar a imagem
export const ExpandButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => rgba(theme.surface, 0.7)};
  backdrop-filter: blur(4px);
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  z-index: 5;
  opacity: 0.7;
  transition: all 0.2s;
  pointer-events: auto;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.onPrimary};
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    bottom: 1rem;
    right: 1rem;
  }
`;

// Informações do personagem
export const Info = styled.div`
  flex-grow: 1;
  pointer-events: auto;
`;

export const NameInput = styled.input`
  width: 100%;
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  background: transparent;
  color: #FFFFFF;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
  padding-bottom: 0.5rem;

  &::placeholder { color: rgba(255, 255, 255, 0.7); }
  &:focus { border-color: ${({ theme }) => theme.primary}; }
  &:disabled {
    opacity: 0.7;
    -webkit-text-fill-color: #FFFFFF;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PointsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Pill = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(5px);
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'base': return withBaseOpacity(theme.surface);
      case 'disBonus': return withBaseOpacity(theme.textSecondary);
      case 'remain': return withBaseOpacity(theme.success);
      default: return withBaseOpacity(theme.primary);
    }
  }};

  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.7rem;
  }
`;
