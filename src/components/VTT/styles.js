import styled, { keyframes, css } from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';

// --- FloatingWindow Styles ---
// --- FloatingWindow Styles (Modificado) ---
export const WindowContainer = styled(motion.div)`
  position: absolute;
  z-index: 1010;
  background-color: ${({ theme }) => rgba(theme.surface, 0.6)};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  min-width: 320px;
  min-height: 200px; // Altura mínima
  max-width: 600px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textPrimary};
  
  /* Habilita o redimensionamento */
  resize: both;
  overflow: hidden; /* Necessário para que o resize funcione corretamente */
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

export const SidebarContainer = styled(motion.aside)`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'stretch')};
  
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0.5rem 0.25rem' : '1rem')};
  gap: 1.5rem;
  z-index: 100;
  position: relative;

>.version{
  font-size: 10px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
}
`;
export const CollapseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: -16px;
  transform: translateY(-50%);
  width: 32px; height: 32px; border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white; border: 2px solid ${({ theme }) => theme.surface};
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 101; cursor: pointer;
  &:hover { transform: translateY(-50%) scale(1.1); }
  svg { width: 14px; height: 14px; display: block; flex-shrink: 0; }
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
    transition: opacity 0.2s ease, height 0.2s ease, margin-bottom 0.2s, padding-bottom 0.2s;
    opacity: ${({ $isCollapsed }) => $isCollapsed ? 0 : 1};
    height: ${({ $isCollapsed }) => $isCollapsed ? '0' : 'auto'};
    margin-bottom: ${({ $isCollapsed }) => $isCollapsed ? '0' : '0.75rem'};
    padding-bottom: ${({ $isCollapsed }) => $isCollapsed ? '0' : '0.5rem'};
    overflow: hidden;
    white-space: nowrap;
  }
`;
// O estilo que faltava ser aplicado
export const ToolButton = styled.button`
position: relative;
  inline-size: ${({ $isCollapsed }) => ($isCollapsed ? '44px' : '100%')};
  block-size: 44px;
  margin-inline: ${({ $isCollapsed }) => ($isCollapsed ? 'auto' : '0')};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.75rem')};

  display: inline-flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  gap: 0.75rem;
  margin-bottom: .5rem;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 6px;
  overflow: hidden;

  & > svg { width: 22px; height: 22px; flex: 0 0 auto; }

  span {
    ${({ $isCollapsed }) => $isCollapsed && 'display:none;'}
    font-size: 0.9rem;
  }

  &:hover { background-color: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.onPrimary}; }
`;
export const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`; export const PlayerCard = styled.li`
  inline-size: ${({ $isCollapsed }) => ($isCollapsed ? '44px' : '100%')};
  block-size: 44px;
  margin-inline: ${({ $isCollapsed }) => ($isCollapsed ? 'auto' : '0')};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.5rem')};

  display: flex; align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  gap: 0.75rem;

  background-color: ${({ theme }) => theme.surfaceVariant};
  border-radius: 6px; overflow: hidden;
`;

export const PlayerAvatar = styled.img`
  width: 35px; height: 35px; border-radius: 50%;
  object-fit: cover; flex-shrink: 0;
`;

export const PlayerInfo = styled.div`
  flex-grow: 1; min-width: 0;
  ${({ $isCollapsed }) => $isCollapsed && 'display:none;'}
`;


export const PlayerName = styled.p`
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: .5rem;
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
  inline-size: ${({ $isCollapsed }) => ($isCollapsed ? '44px' : '100%')};
  block-size: 44px;
  margin-inline: ${({ $isCollapsed }) => ($isCollapsed ? 'auto' : '0')};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '8px 12px')};

  display: inline-flex; align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'center')};
  gap: 0.5rem;
  margin-top: .5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white; border-radius: 6px;

  span { 
    ${({ $isCollapsed }) => $isCollapsed && 'display:none;'} }
`;

export const MapContainer = styled.div`width: 100%; height: 100%; cursor: grab; &:active { cursor: grabbing; }`;

export const ToolbarContainer = styled(motion.div)`
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: ${({ theme }) => rgba(theme.surface, 0.5)};
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 0.75rem; border-radius: 12px; border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadows.large}; display: flex; align-items: center; gap: 0.5rem; z-index: 1000;
`;
export const RollButton = styled.button`font-weight: 600; min-width: 50px; background-color: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.onPrimary}; &:hover { filter: brightness(1.1); }`;
export const CommandInput = styled.input`background-color: ${({ theme }) => theme.background}; width: 200px; text-align: center;`;

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

export const GrimoireList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5rem;
`;
export const EnemyCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  cursor: grab;
  transition: background-color 0.2s ease;

  &:active { cursor: grabbing; }

  /* O botão de deletar dentro do card só aparece no hover do card */
  &:hover button {
    opacity: 1;
    visibility: visible;
  }
`;
export const DeleteEnemyButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textSecondary};
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    
    &:hover {
        color: ${({ theme }) => theme.error};
        background-color: ${({ theme }) => rgba(theme.error, 0.125)};
        transform: scale(1.1);
    }
`;

export const EnemyTokenPreview = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
`;
export const EnemyInfo = styled.div`
  flex-grow: 1;
  min-width: 0; /* Previne que o texto empurre os outros elementos */
  
  p { margin: 0; font-weight: 600; color: ${({ theme }) => theme.textPrimary}; }
  span { font-size: 0.8rem; color: ${({ theme }) => theme.textSecondary}; }
`;
export const EnemyForm = styled.div`
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    input[name="name"], 
    input[name="imageUrl"],
    .file-upload-button,
    button {
        grid-column: 1 / -1;
    }
    
    div {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        label {
            font-size: 0.8rem;
            font-weight: 500;
            color: ${({ theme }) => theme.textSecondary};
        }
    }

    input {
        font-size: 0.9rem;
        padding: 8px;
    }

    button {
        background-color: ${({ theme }) => theme.success};
        color: white;
        font-weight: 600;
    }
`;

// --- InitiativeTracker Styles ---
export const TrackerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InitiativeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InitiativeItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 6px;
  background-color: ${({ theme, $isActive }) => $isActive ? rgba(theme.primary, 0.188) : theme.background};
  border: 2px solid ${({ theme, $isActive }) => $isActive ? theme.primary : 'transparent'};
  transition: all 0.2s ease-in-out;
`;

export const InitiativeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const InitiativeRoll = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  min-width: 30px;
  text-align: center;
`;

export const InitiativeName = styled.span`font-weight: 500;`;
export const InitiativeControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;
export const PlayerInitiativeButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${({ theme }) => theme.success};
    color: white;
    border-radius: 6px;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ModifierContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Aumenta o espaçamento entre as seções */
  text-align: center;
`;

// Container para o controle principal de -/+
export const ModifierControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ModifierInput = styled.input`
  width: 100px;
  height: 60px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => rgba(theme.primary, 0.25)};
  }
`;

export const ModifierButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.1);
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const OptionCard = styled.label`
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme, $isActive }) => $isActive ? theme.primary : theme.border};
  background-color: ${({ theme, $isActive }) => $isActive ? `rgba(${theme.primary}, 0.125)` : theme.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => `rgba(${theme.secondary}, 0.125)`};
  }

  /* Estilos para o estado desabilitado */
  ${({ theme, $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      background-color: ${theme.surface}; /* Força um fundo neutro */
      border-color: ${theme.border};     /* Força uma borda neutra */

      /* Sobrescreve o efeito hover para que nada aconteça */
      &:hover {
        background-color: ${theme.surface};
        border-color: ${theme.border};
      }
    `
  }
`;

export const OptionIcon = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primary};
`;

export const OptionLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

export const OptionDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.3;
`;

export const OptionCheckbox = styled.input`
  display: none;
`;

export const ConfirmRollButton = styled.button`
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: ${({ theme }) => theme.success};
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
    }
`;

// --- MacroManager Styles ---
export const MacroList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const MacroItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
`;

export const MacroInfo = styled.div`
  p { margin: 0; font-weight: 600; }
  span { font-size: 0.8rem; font-family: monospace; color: ${({ theme }) => theme.textSecondary}; }
`;

export const MacroControls = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    background: transparent;
    padding: 0.5rem;
    &:hover { color: ${({ theme }) => theme.primary}; }
  }
`;

export const MacroForm = styled.div`
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    h5 { margin-bottom: 0; }
    input { font-size: 0.9rem; padding: 8px; }
    button { background-color: ${({ theme }) => theme.success}; color: white; font-weight: 600; }
`;

// --- FogOfWarManager Styles ---
export const FowToolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  label {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  input[type="range"] {
    flex-grow: 1;
  }
`;

export const FowActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  button {
    font-weight: 600;
  }
`;

// --- RoomSettings Styles ---
export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SettingLabel = styled.label`
  font-weight: 500;
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 400;
    margin-top: 0.25rem;
  }
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  /* Estilos para um toggle switch bonito */
  appearance: none;
  width: 40px;
  height: 22px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 22px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s ease;
  }

  &:checked {
    background-color: ${({ theme }) => theme.success};
  }

  &:checked::before {
    transform: translateX(18px);
  }
`;
export const ContextMenuBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ResourceBar = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 55px auto auto; 
  align-items: center;
  gap: 0.75rem;
  justify-content: safe;
  label {
    font-weight: 700;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
  }

  span {
    color: ${({ theme }) => theme.textSecondary};
    font-family: monospace;
  }
`;

export const ResourceInput = styled.input`
    width: 100%;
    text-align: center;
    background-color: ${({ theme }) => theme.background};
    font-size: 0.9rem;
    font-weight: 500;
    padding: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => rgba(theme.primary, 0.2)};
    }

    &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: ${({ theme }) => theme.textPrimary};
    }
`;

export const ResourceControls = styled.div`
    display: flex;
    gap: 0.3rem;
    margin-left: 0.5rem;
    button {
        width: 28px;
        height: 28px;
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 50%;
        background: ${({ theme }) => theme.surfaceVariant};
        color: ${({ theme }) => theme.textSecondary};
        transition: all 0.2s ease;
        

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        line-height: 0;
        
        &:hover:not(:disabled) {
            background: ${({ theme }) => theme.primary};
            color: white;
            transform: scale(1.1);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
`;

export const BarVisual = styled.div`
  flex-grow: 1;
  height: 12px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  overflow: hidden;
  min-width: 150px;
`;

export const BarFill = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${({ color }) => color};
  transition: width 0.3s ease-out;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 1rem;

  button {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px 12px;
    border-radius: 6px;
    border: none;
    background-color: ${({ theme }) => theme.surfaceVariant};
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.onPrimary};
        transform: translateY(-2px);
    }
    
    &.danger:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.error};
      color: ${({ theme }) => theme.onError};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
  }
`;

export const JukeboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

export const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  border-left: 4px solid ${({ theme, $isPlaying }) => $isPlaying ? theme.success : theme.border};
`;

export const TrackInfo = styled.div`
  flex-grow: 1;
  font-weight: 500;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TrackControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  input[type="range"] {
    width: 80px;
  }
`;

export const JukeboxForm = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  input {
    font-size: 0.9rem;
    padding: 8px;
  }
`;

const critGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 3px rgba(255,255,255,.30),
      0 0 12px rgba(255,255,255,.50),
      0 0 16px rgba(76,175,80,.85),
      0 0 18px rgba(76,175,80,.85);
  }
`;

const fumbleGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 3px rgba(255,255,255,.30),
      0 0 12px rgba(255,255,255,.50),
      0 0 16px rgba(244,67,54,.85),
      0 0 20px rgba(244,67,54,.85);
  }
`;

export const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Garante que o container ocupe o espaço */
  background-color: ${({ theme }) => theme.background};
`;

export const LogItem = styled(motion.div)`
  position: relative; 
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, $hidden }) => $hidden ? rgba(theme.surface, 0.5) : theme.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  will-change: transform, box-shadow, filter;
  opacity: ${({ $hidden }) => $hidden ? 0.7 : 1};
  
  animation: ${({ $isAllCrits, $isAllFumbles }) => {
    if ($isAllCrits) return css`${critGlow} 1.5s ease-in-out infinite alternate`;
    if ($isAllFumbles) return css`${fumbleGlow} 1.5s ease-in-out infinite alternate`;
    return 'none';
  }};

  /* O botão de visibilidade só aparece quando o mouse está sobre o card */
  &:hover > button {
    opacity: 1;
    visibility: visible;
  }
`;
export const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
`;

export const LogInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;
`;

export const LogCharacter = styled.strong`
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogUser = styled.small`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
`;

export const LogRoll = styled.span`
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
  white-space: nowrap;
`;
export const LogResult = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
`;

export const LogTotal = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  color: ${({ theme }) => theme.primary};
`;

export const LogBreakdown = styled.p`
  font-family: monospace;
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  margin: 0;

  .crit { color: ${({ theme }) => theme.success}; }
  .fumble { color: ${({ theme }) => theme.error}; }
`;


export const HiddenRollCard = styled.div`
  width: 100%;
  text-align: center;
  font-style: italic;
  padding: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const VisibilityToggle = styled.button`
  position: absolute;
  top: -7px;      /* Distância do topo do card */
  right: -7px;   /* Distância da direita do card */
  
  background: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  opacity: 0;
  visibility: hidden;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }
`;

export const Timestamp = styled.time`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textSecondary};
  align-self: flex-end;
  margin-top: 0.5rem;
`;


// NOVO: Estilos para paginação
export const LogPagination = styled.div`
  padding: 0.75rem 1rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.border};

  button {
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }
`;

export const LogList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  overflow-y: auto;
  padding: 1rem;
`;

export const ZoomSliderContainer = styled(motion.div)`
  position: absolute;
  right: 10px;
  top: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.surface}E6;
  backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 1000;

  input[type="range"] {
    /* CORREÇÃO: Usa o padrão moderno para sliders verticais */
    writing-mode: vertical-lr;
    direction: rtl;
    -webkit-appearance: none; /* Ainda necessário para resetar o estilo base no WebKit */
    appearance: none;
    width: 8px;
    height: 150px;
    cursor: ns-resize;
    
    /* Mantém os estilos customizados para a barra e o seletor */
    background: ${({ theme }) => theme.background};
    border-radius: 4px;
    outline: none;
  }
`;
export const UnreadBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 4px;
  background-color: ${({ theme }) => theme.error};
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.surfaceVariant};
`;