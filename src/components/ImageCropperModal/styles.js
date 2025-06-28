//src\components\ImageCropperModal\styles.js
import styled, { css } from 'styled-components';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DropZone = styled.div`
  height: 340px;
  border: 3px dashed ${({ theme }) => theme.primary};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textSecondary};
  display: grid;
  place-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 0.25s;
  ${({ $drag }) =>
    $drag &&
    css`
      background: ${({ theme }) => theme.surface};
    `}
  p {
    margin-top: 0.6rem;
  }
`;

export const CropArea = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const Range = styled.input`
  flex: 1;
`;

export const Btn = styled.button`
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  transition: filter 0.2s; 
  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }
  &:disabled {
    opacity: 0.5;
  }
  ${({ $primary }) =>
    $primary &&
    css`
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.onPrimary};
    `}
`;

export const Stepper = styled.div`
  display: flex;
  gap: 0.5rem;
  span {
    font-size: 0.8rem;
    opacity: 0.5;
  }
  .active {
    font-weight: 700;
    opacity: 1;
  }
`;

export const ColorWrap = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Preview = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ theme }) => theme.border};
`;
