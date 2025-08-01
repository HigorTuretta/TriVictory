import styled from 'styled-components';

export const GameRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  
  /* Força a tela a ocupar todo o espaço, ignorando o padding do MainLayout */
  main {
    padding: 0 !important;
    max-width: none !important;
    margin: 0 !important;
  }
`;

export const VTTLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar map";
  width: 100%;
  height: 100%;
  position: relative; /* Necessário para o 'bounds' do Draggable */
  overflow: hidden;
`;

export const MapArea = styled.main`
  grid-area: map;
  position: relative;
  overflow: hidden;
  background-color: #000; /* O fundo do mapa é preto por padrão */
  background-image: radial-gradient(${({ theme }) => theme.border}22 1px, transparent 1px);
  background-size: 20px 20px;
`;


// --- PLACEHOLDER ---
export const TempPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.textSecondary};

  p {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0.5rem;
  }
`;