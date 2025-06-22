// src/styles/Auth.js
import styled from "styled-components";
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
  background-position: center;
  background-repeat: repeat;
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

  img {
    width: 250px;
    animation: float 3s ease-in-out infinite;
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

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }
`;

export const RightPane = styled(motion.div)`
  flex: 1;
  max-width: 480px;
  width: 100%;
  background-color: ${({ theme }) => theme.surface + 'dd'};
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-left: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Input = styled.input`
  padding: 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

export const Button = styled.button`
  padding: 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

export const GoogleButton = styled(Button)`
  background-color: white;
  color: #444;
  border: 1px solid #ccc;
  font-weight: 600;
  margin-top: 1rem;

  svg {
    color: #4285F4;
  }

  &:hover {
    border-color: #4285F4;
    background-color: #f5faff;
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
