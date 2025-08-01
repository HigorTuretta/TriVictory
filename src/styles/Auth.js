// src/styles/Auth.js
import styled, { keyframes } from "styled-components";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import pattern from '../assets/pattern.png';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  min-height: 100vh;
  background-image: url(${pattern});
  background-size: 200px;
`;

export const LeftPane = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: white;
  flex-direction: column;
  text-align: center;

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }

  img {
    width: 250px;
    animation: float 3.5s ease-in-out infinite;
  }

  h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  p {
    max-width: 400px;
    font-size: 1.1rem;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    display: none; // Oculta o painel esquerdo em telas menores
  }
`;

export const RightPane = styled(motion.div)`
  flex: 1;
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme }) => theme.surface}E6; // Adiciona transparência
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-left: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    border-left: none;
    max-width: 100%;
    padding: 2rem 1.5rem;
    background-color: ${({ theme }) => theme.surface};
    backdrop-filter: none;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AuthBox = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: 420px;
  width: 100%;
  margin: auto; // Centraliza a caixa
`;

export const Input = styled.input``; // Reutiliza o estilo global

export const Button = styled.button`
  padding: 14px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const GoogleButton = styled(Button)`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  font-weight: 600;
  margin-top: 1rem;

  svg {
    color: #4285F4;
  }

  &:hover {
    border-color: #4285F4;
    background-color: ${({ theme }) => theme.surfaceVariant};
  }
`;

export const AuthLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
`;