import styled from "styled-components";
import { Link } from 'react-router-dom';

export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
`;

export const AuthBox = styled.div`
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    background-color: ${({ theme }) => theme.surface};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const Title = styled.h2`
    text-align: center;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
    font-size: 2.2rem;
    font-weight: 900;
`;

export const Subtitle = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 2.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const Input = styled.input`
    padding: 14px;
    font-size: 1rem;
`;

export const Button = styled.button`
    padding: 14px;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;

    &:hover {
        opacity: 0.9;
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
    margin-top: 1.5rem;
    font-size: 0.9rem;
`;
