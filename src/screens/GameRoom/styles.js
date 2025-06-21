import styled from 'styled-components';

export const GameRoomContainer = styled.div`
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 2rem;
`;

export const RoomInfo = styled.div`
    flex-grow: 1;
`;

export const RoomTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 900;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 0.5rem;
`;

export const ActionButton = styled.button``

export const MasterInfo = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
`;

export const InviteSection = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;

    p {
        font-size: 0.9rem;
        color: ${({ theme }) => theme.textSecondary};
    }
`;

export const InviteLink = styled.input`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    min-width: 300px;
`;

export const CopyButton = styled.button`
    background-color: ${({ theme }) => theme.primary};
    color: white;
    font-size: 1.2rem;
    padding: 10px;
`;

export const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr; /* Coluna de jogadores e área principal */
    gap: 2rem;
    align-items: start;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const PlayersPanel = styled.div`
    background-color: ${({ theme }) => theme.surface};
    border-radius: 8px;
    padding: 1.5rem;
    position: sticky;
    top: 100px; /* Abaixo da NavBar */
`;

export const PanelTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const PlayerList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const PlayerCard = styled.li`
    background-color: ${({ theme }) => theme.background};
    padding: 1rem;
    border-radius: 6px;
`;

export const PlayerInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
`;

export const PlayerName = styled.span`
    font-weight: bold;
    font-size: 1.1rem;
`;

export const CharacterName = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    font-style: italic;
`;

export const LinkCharacterButton = styled.button`
    width: 100%;
    padding: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.secondary};
    color: white;

    &:disabled {
        background-color: ${({ theme }) => theme.border};
        cursor: not-allowed;
    }
`;

export const GameArea = styled.div`
    /* Espaço para o futuro dashboard, rolador de dados, etc. */
`;

export const MasterDashboard = styled.div`
    background-color: ${({ theme }) => theme.surface};
    border-radius: 8px;
    padding: 1.5rem;
`;

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`;
