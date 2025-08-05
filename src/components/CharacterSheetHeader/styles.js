// src/components/CharacterSheetHeader/styles.js
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

// --- Funções Helper ---
const withBaseOpacity = (hex) => rgba(hex, 0.25);
const fallback = (themeValue, defaultValue) => (themeValue || defaultValue);

// --- Contêiner Principal ---
export const Wrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background: ${({ theme }) => fallback(theme.surface, '#1e1e26')};
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

// --- Imagem de Banner ---
export const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center ${({ $position }) => $position}%;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

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

// --- Conteúdo sobre o Banner ---
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
  }
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  pointer-events: auto;
`;

// --- Token do Personagem ---
export const TokenWrap = styled.div`
  width: 84px;
  height: 84px;
  padding: 4px;
  border-radius: 50%;
  background: ${({ $border, theme }) => fallback($border, theme.primary)};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
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

// --- Mixin de Estilo para Botões de Ícone ---
const IconBtn = css`
  position: absolute;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, background-color 0.2s;
  pointer-events: auto;
  z-index: 4;
  
  // --- CORREÇÃO APLICADA AQUI ---
  font-size: 22px; /* Define o tamanho do ícone */

  /* Removemos o seletor SVG, pois o font-size é mais eficaz */

  &:hover { transform: scale(1.1); }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 18px; /* Ajusta o tamanho do ícone para telas menores */
  }
`;

// --- Botões Específicos ---
export const UploadBtn = styled.button`
  ${IconBtn};
  top: 16px;
  right: 68px; /* Abre espaço para o novo botão */
  background: ${({ theme }) => fallback(theme.primary, '#8a4fff')};
  color: ${({ theme }) => fallback(theme.onPrimary, '#fff')};
  opacity: 0.9;
  &:hover { opacity: 1; }
`;

export const ShareButton = styled.button`
  ${IconBtn};
  top: 16px;
  right: 16px;
  background: ${({ theme, $isPublic }) => $isPublic ? theme.success : fallback(theme.secondary, '#00BCD4')};
  color: ${({ theme }) => fallback(theme.onPrimary, '#fff')};
  opacity: 0.9;
  &:hover { opacity: 1; }
`;

export const ExpandButton = styled.button`
  ${IconBtn};
  bottom: 16px;
  right: 16px;
  background: ${({ theme }) => rgba(fallback(theme.surface, '#1e1e26'), 0.7)};
  backdrop-filter: blur(4px);
  color: ${({ theme }) => fallback(theme.textPrimary, '#fff')};
  opacity: 0.8;

  &:hover {
    background: ${({ theme }) => fallback(theme.primary, '#8a4fff')};
    color: ${({ theme }) => fallback(theme.onPrimary, '#fff')};
    opacity: 1;
  }
`;

// --- Informações (Nome e Pontos) ---
export const Info = styled.div`
  flex-grow: 1;
  pointer-events: auto;
  min-width: 0; // Previne overflow em flexbox
`;

export const NameInput = styled.input`
  width: 100%;
  font-size: 2.5rem;
  font-weight: 900;
  background: transparent;
  color: #fff;
  border: none;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  transition: border-color 0.2s;

  &::placeholder { color: rgba(255, 255, 255, 0.7); }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => fallback(theme.primary, '#8a4fff')};
  }
  &:disabled {
    opacity: 1;
    cursor: default;
    -webkit-text-fill-color: #fff; /* Para Chrome/Safari */
  }

  @media (max-width: 768px) { font-size: 1.5rem; }
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  white-space: nowrap; // Evita quebra de linha no texto

  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'base': return withBaseOpacity(fallback(theme.surface, '#1e1e26'));
      case 'disBonus': return withBaseOpacity(fallback(theme.textSecondary, '#a0a0b0'));
      case 'remain': return withBaseOpacity(fallback(theme.success, '#4caf50'));
      case 'default':
      default:
        return withBaseOpacity(fallback(theme.primary, '#8a4fff'));
    }
  }};

  @media (max-width: 768px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.7rem;
  }
`;