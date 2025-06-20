import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav`
    width: 100%;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.surface};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
`;

export const Logo = styled(Link)`
    font-size: 1.8rem;
    font-weight: 900;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
`;

export const UserName = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
`;

export const LogoutButton = styled.button`
    background: none;
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1.2rem;
    padding: 0.5rem;

    &:hover {
        color: ${({ theme }) => theme.error};
    }
`;
