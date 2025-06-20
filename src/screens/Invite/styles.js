import styled from 'styled-components';
import { AuthContainer, AuthBox, Title as AuthTitle, Button as AuthButton } from '../../styles/Auth';

export const InviteContainer = styled(AuthContainer)``;

export const InviteBox = styled(AuthBox)`
    max-width: 500px;
`;

export const Title = styled(AuthTitle)``;

export const Subtitle = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 2rem;
    font-size: 0.95rem;
    line-height: 1.5;
`;

export const InfoLine = styled.div`
    background-color: ${({ theme }) => theme.background};
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1.1rem;

    strong {
        color: ${({ theme }) => theme.primary};
        margin-right: 0.5rem;
    }

    span {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2.5rem;
`;

export const Button = styled(AuthButton)`
    margin-top: 0;
    width: 100%;
    flex-grow: 1;

    &.accept {
        background-color: ${({ theme }) => theme.success};
    }
    
    &.decline {
        background-color: ${({ theme }) => theme.error};
    }
`;
