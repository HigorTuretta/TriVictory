import styled from 'styled-components';

/* -------------- CONTÊINER PRINCIPAL -------------- */
export const GameRoomContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

/* Cabeçalho da sala */
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

export const MasterInfo = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

/* Convidar jogadores */
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
  color: #fff;
  font-size: 1.2rem;
  padding: 10px;
`;

/* Grid principal */
export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/* Painel de jogadores */
export const PlayersPanel = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    position: static;
  }
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

export const CharacterName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.textSecondary};
    padding: 0;
    margin-left: 0.5rem;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.error};
    }
  }
`;

export const LinkCharacterButton = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.secondary};
  color: #fff;

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

/* Área central */
export const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/* Painel do mestre */
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

/* Painel de ações */
export const ActionPanel = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: 500;
  padding: 10px 15px;

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

/* Opções de rolagem */
export const RollOptions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const OptionCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    cursor: pointer;
  }

  input {
    width: auto;
    cursor: pointer;
  }
`;
