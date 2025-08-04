import styled from 'styled-components';

export const GameRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  
  main {
    padding: 0 !important;
    max-width: none !important;
    margin: 0 !important;
  }
`;

export const VTTLayout = styled.div`
  --sidebar-width: ${({ $isSidebarCollapsed }) => $isSidebarCollapsed ? '80px' : '280px'};
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar map";
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  /* CORREÇÃO: Transição mais suave */
  transition: grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
export const MapArea = styled.main`
  grid-area: map;
  position: relative;
  overflow: hidden;
  background-color: #000;
  background-image: radial-gradient(${({ theme }) => theme.border}22 1px, transparent 1px);
  background-size: 20px 20px;
`;
export const GameLogContainer = styled.aside`
  grid-area: log;
  background-color: ${({ theme }) => theme.surface};
  border-left: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  height: 100%;
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