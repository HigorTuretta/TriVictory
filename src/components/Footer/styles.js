import styled from "styled-components";

export const FooterContainer = styled.footer`
    width: 100%;
    padding: 1.5rem 2rem;
    background-color: ${({ theme }) => theme.surface};
    border-top: 1px solid ${({ theme }) => theme.border};
    margin-top: auto;
`;

export const FooterText = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.9rem;
`;
