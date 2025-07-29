import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled.div`
    background-color: ${({ theme }) => theme.surface};
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.border};
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
`;

export const CardHeader = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem; /* Substitui o margin-left */
`;

export const CharacterName = styled(Link)`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const PlayerNickname = styled.span`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
    font-style: italic;
`;

export const ResourceGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Resource = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Aumentado para melhor espaçamento */
`;

export const ResourceIcon = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
`;

export const ResourceBar = styled.div`
    flex-grow: 1;
    height: 12px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const ResourceProgress = styled.div`
    height: 100%;
    width: ${props => props.$progress}%;
    background-color: ${props => props.$color};
    border-radius: 12px;
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
`;

// Novo componente para alinhar os valores de recursos.
export const ResourceValues = styled.span`
    font-family: monospace;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
    min-width: 45px;
    text-align: right;
`;