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
`;

// A imagem de fundo do banner. Agora usa a prop '$position'
export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* ✅ A mágica acontece aqui: A posição Y é controlada pela prop */
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
    rgba(30, 30, 38, 0.9) 0%,
    rgba(30, 30, 38, 0.6) 30%,
    transparent 80%
  );
  cursor: pointer;

  &:hover + ${BannerImage} {
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
`;

// Informações do personagem
export const Info = styled.div`
  padding-left: calc(84px + 1.5rem);
  margin-top: auto;
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

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.7;
    -webkit-text-fill-color: #FFFFFF;
  }
`;

export const PointsRow = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: 0.8rem;
`;

export const Pill = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(5px);
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'base':

        return withBaseOpacity(theme.surface);

      case 'disBonus':
        return withBaseOpacity(theme.textSecondary);

      case 'remain':
        return withBaseOpacity(theme.success);

      default:
        return withBaseOpacity(theme.primary);
    }
  }};

  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
