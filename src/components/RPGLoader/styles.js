import styled, { keyframes } from 'styled-components';
import Lottie from 'lottie-react';

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

export const Animation = styled(Lottie)`
  max-width: 100%;
`;

const pulse = keyframes`
  0%   { opacity: .45; }
  50%  { opacity: 1; }
  100% { opacity: .45; }
`;

export const Message = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  animation: ${pulse} 2.4s ease-in-out infinite;
  user-select: none;
`;
