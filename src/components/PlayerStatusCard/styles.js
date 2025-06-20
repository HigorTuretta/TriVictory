import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled.div`
    background-color: ${({ theme }) => theme.surface};
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const CardHeader = styled.div`
    margin-bottom: 1rem;
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
    margin-left: 0.5rem;
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
    gap: 0.5rem;
    font-size: 0.9rem;
`;

export const ResourceIcon = styled.div`
    flex-shrink: 0;
`;

export const ResourceBar = styled.div`
    flex-grow: 1;
    height: 12px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 12px;
    overflow: hidden;
`;

export const ResourceProgress = styled.div`
    height: 100%;
    width: ${props => props.$progress}%;
    background-color: ${props => props.$color};
    border-radius: 12px;
    transition: width 0.3s ease-in-out;
`;
