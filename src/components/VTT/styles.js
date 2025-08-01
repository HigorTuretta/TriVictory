// src/components/VTT/styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- FloatingWindow Styles ---
export const WindowContainer = styled(motion.div)`
  position: absolute;
  z-index: 1010;
  background-color: ${({ theme }) => theme.surface}E6;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  min-width: 320px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;
export const WindowHeader = styled.header`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
export const WindowTitle = styled.h4`
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
`;
export const CloseButton = styled.button`
  background: transparent;
  color: inherit;
  opacity: 0.8;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    opacity: 1;
    background-color: rgba(255,255,255,0.2);
    transform: scale(1.1);
  }
`;
export const WindowBody = styled.div`
  padding: 1rem;
  max-height: 60vh;
  overflow-y: auto;
`;

// --- LeftSidebar Styles ---
export const SidebarContainer = styled(motion.aside)`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  z-index: 100;
`;
export const ToolSection = styled.div`
  h4 {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;
// O estilo que faltava ser aplicado
export const ToolButton = styled.button`
    width: 100%;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    background-color: ${({ theme }) => theme.surfaceVariant};
    color: ${({ theme }) => theme.textPrimary};
    border-radius: 6px;
    
    &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.onPrimary};
    }
`;
export const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const PlayerCard = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.surfaceVariant};
  padding: 0.5rem;
  border-radius: 6px;
`;
export const PlayerAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
export const PlayerInfo = styled.div`
  flex-grow: 1;
  min-width: 0;
`;
export const PlayerName = styled.p`
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CharacterName = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const LinkButton = styled.button`
  font-size: 0.9rem;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    filter: brightness(1.1);
  }
`;
// --- VTTMap Styles ---
export const MapContainer = styled.div`width: 100%; height: 100%; cursor: grab; &:active { cursor: grabbing; }`;
// --- DiceToolbar Styles ---
export const ToolbarContainer = styled(motion.div)`
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: ${({ theme }) => theme.surface}E6;
  backdrop-filter: blur(10px); padding: 0.75rem; border-radius: 12px; border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadows.large}; display: flex; align-items: center; gap: 0.5rem; z-index: 1000;
`;
export const RollButton = styled.button`font-weight: 600; min-width: 50px; background-color: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.onPrimary}; &:hover { filter: brightness(1.1); }`;
export const CommandInput = styled.input`background-color: ${({ theme }) => theme.background}; width: 200px; text-align: center;`;
// --- SceneManager Styles ---
export const SceneList = styled.div`display: flex; flex-direction: column; gap: 0.75rem;`;
export const SceneItem = styled.div`
  padding: 0.75rem; border-radius: 6px; border: 2px solid ${({ theme, $isActive }) => $isActive ? theme.success : theme.border};
  background: ${({ theme }) => theme.background}; display: flex; justify-content: space-between; align-items: center;
  span { font-weight: 500; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
`;
export const SceneForm = styled.div`
    margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid ${({ theme }) => theme.border};
    display: flex; flex-direction: column; gap: 0.75rem;
    input { font-size: 0.9rem; padding: 8px; }
    button { background-color: ${({ theme }) => theme.success}; color: white; font-weight: 600; }
`;
// --- EnemyGrimoire Styles ---
export const GrimoireList = styled.div`display: flex; flex-direction: column; gap: 0.75rem; max-height: 40vh; overflow-y: auto; padding-right: 0.5rem;`;
export const EnemyCard = styled.div`
  display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background-color: ${({ theme }) => theme.background}; border-radius: 6px; cursor: grab;
  &:active { cursor: grabbing; }
`;
export const EnemyTokenPreview = styled.img`width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid ${({ theme }) => theme.border}; background-color: ${({ theme }) => theme.surface};`;
export const EnemyInfo = styled.div`
  flex-grow: 1;
  p { margin: 0; font-weight: 600; color: ${({ theme }) => theme.textPrimary}; }
  span { font-size: 0.8rem; color: ${({ theme }) => theme.textSecondary}; }
`;
export const EnemyForm = styled.div`
    margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid ${({ theme }) => theme.border}; display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
    input { font-size: 0.9rem; padding: 8px; }
    input[name="name"], input[name="imageUrl"] { grid-column: 1 / -1; }
    button { grid-column: 1 / -1; background-color: ${({ theme }) => theme.success}; color: white; font-weight: 600; }
`;