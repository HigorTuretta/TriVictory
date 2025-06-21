import styled, { keyframes, css } from 'styled-components';

/* animações ------------------------------------------------------- */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);  }
`;

const rainbow = keyframes`
  0%   { background-position:   0% 50%; }
  100% { background-position: 200% 50%; }
`;

/* utilitário de cor ---------------------------------------------- */
const tone = (theme, variant) => {
  if (variant === 'crit') return theme.success;
  if (variant === 'fail') return theme.error;
  return theme.secondary;
};

/* ---------- layout externo ---------- */
export const Wrapper = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const Title = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
`;

export const Pagination = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const PageButton = styled.button`
  background: ${({ theme, $active }) =>
    $active ? theme.secondary : theme.background};
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 3px 7px;
  font-size: 0.78rem;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
`;

/* ---------- área de rolagem interna ---------- */
export const LogContainer = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
`;

/* ---------- cartão de log ---------- */
export const LogCard = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem 0.8rem 1.1rem;
  display: flex;
  gap: 0.9rem;
  background: ${({ theme, $variant }) =>
    $variant === 'hidden' ? theme.border : theme.background};
  border-radius: 6px;
  animation: ${fadeIn} 0.25s ease;

  border-left: ${({ theme, $variant }) =>
    $variant === 'hidden'
      ? `4px dashed ${theme.background}`
      : `6px solid ${tone(theme, $variant)}`};

  /* borda arco-íris para crítico */
  ${({ $variant, theme }) =>
    $variant === 'crit' &&
    css`
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 6px;
        padding: 2px;
        background: linear-gradient(
          60deg,
          ${theme.success},
          ${theme.secondary},
          ${theme.success}
        );
        background-size: 200% 200%;
        animation: ${rainbow} 5s linear infinite;
        -webkit-mask: linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
    `}

  /* efeito “quebrado” para falha */
  ${({ $variant }) =>
    $variant === 'fail' &&
    css`
      transform: rotateX(1deg);
      filter: grayscale(0.4);
    `}
`;

/* círculo com ícone ------------------------------------------------ */
export const LeftBar = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme, $variant }) => tone(theme, $variant)};

  ${({ $variant }) =>
    $variant === 'hidden' &&
    css`
      background: ${({ theme }) => theme.background};
    `}

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

/* conteúdo --------------------------------------------------------- */
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-right: 120px; /* espaço para botões + badge */
  justify-content: center;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

export const Breakdown = styled.span`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 2px;
`;

/* botões ----------------------------------------------------------- */
export const Buttons = styled.div`
  position: absolute;
  top: 6px;
  right: 90px; /* badge ocupa a faixa final */
  display: flex;
  gap: 0.45rem;

  button {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

/* selo Crítico / Falha -------------------------------------------- */
export const Badge = styled.span`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  background: ${({ theme, $variant }) =>
    $variant === 'crit' ? theme.success : theme.error};
  color: #fff;
  font-size: 0.66rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
`;
