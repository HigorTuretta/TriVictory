// src/screens/GameRoom/GameRoomUI.jsx
import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCurrentPlayerCharacter } from '../../hooks/useCurrentPlayerCharacter';
import { useDiceRoller } from '../../hooks/useDiceRoller';
import { useInitiative } from '../../hooks/useInitiative';
import { useRollMacros } from '../../hooks/useRollMacros';
import { useFogOfWar } from '../../hooks/useFogOfWar';
import { RPGLoader } from '../../components/RPGLoader';
import { VTTLayout, MapArea } from './styles';
import { LeftSidebar } from '../../components/VTT/LeftSidebar';
import { VTTMap } from '../../components/VTT/VTTMap';
import { DiceToolbar } from '../../components/VTT/DiceToolbar';
import { DiceRoller } from '../../components/DiceRoller';
import { DiceModifierModal } from '../../components/VTT/DiceModifierModal';
import { FloatingWindow } from '../../components/VTT/FloatingWindow';
import { SceneManager } from '../../components/VTT/SceneManager';
import { EnemyGrimoire } from '../../components/VTT/EnemyGrimoire';
import { InitiativeTracker } from '../../components/VTT/InitiativeTracker';
import { GameLog } from '../../components/VTT/GameLog';
import { TokenContextMenu } from '../../components/VTT/TokenContextMenu';
import { RoomSettings } from '../../components/VTT/RoomSettings';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FogOfWarManager } from '../../components/VTT/FogOfWarManager';
import { MacroManager } from '../../components/VTT/MacroManager';

const GameRoomContent = () => {
    const { room, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const { character, updateCharacter } = useCurrentPlayerCharacter();
    const { executeRoll, isRolling, currentRoll, onAnimationComplete, isModifierModalOpen, closeModifierModal } = useDiceRoller(character, updateCharacter);
    const { addToInitiative, initiativeOrder, currentIndex, isRunning } = useInitiative();
    const { macros, addMacro, updateMacro, deleteMacro } = useRollMacros();
    
    const [windows, setWindows] = useState({
        sceneManager: false, initiativeTracker: false, enemyGrimoire: false,
        gameLog: true, macroManager: false, fogOfWar: false, roomSettings: false,
    });
    const [selectedTokenId, setSelectedTokenId] = useState(null);
    const [contextMenu, setContextMenu] = useState({ token: null, x: 0, y: 0 });
    const [fowTool, setFowTool] = useState({ tool: 'eraser', brushSize: 70 });

    const isMaster = room.masterId === currentUser.uid;
    const activeScene = (Array.isArray(room.scenes) && room.activeSceneId) ? room.scenes.find(s => s.id === room.activeSceneId) : null;
    
    const { fillAll: fillFog, clearAll: clearFog } = useFogOfWar(activeScene?.id);

    const toggleWindow = (windowName) => setWindows(prev => ({ ...prev, [windowName]: !prev[windowName] }));
    
    const handleRollInitiativeFor = (token) => {
        const onRollComplete = (rollData) => { addToInitiative(token, rollData.total); };
        const tokenDataSource = room.tokens.find(t => t.tokenId === token.tokenId);
        const habilidade = tokenDataSource?.attributes?.habilidade || 0;
        const command = `1d6+${habilidade}`;
        const baseModifiers = [{ label: 'Habilidade', value: habilidade }];
        executeRoll(command, baseModifiers, onRollComplete);
    };

    const handlePlayerRollInitiative = () => {
        if (!character) { toast.error("Vincule um personagem para rolar iniciativa."); return; }
        const playerAsToken = { tokenId: character.id, name: character.name, type: 'player' };
        handleRollInitiativeFor(playerAsToken);
    };

    const handleContextMenuAction = (action, token) => {
        if (!isMaster) return;

        const currentTokens = room.tokens || [];
        let updatePayload = {};

        switch (action) {
            case 'rollInitiative':
                handleRollInitiativeFor(token);
                return; // Retorna para evitar a chamada a updateRoom
            case 'delete':
                // CORREÇÃO: A lógica de remoção agora é única e simples.
                // Sempre removemos o token do array `room.tokens`.
                updatePayload = { tokens: currentTokens.filter(t => t.tokenId !== token.tokenId) };
                toast.error(`Token "${token.name}" removido do mapa.`);
                break;
            case 'kill':
                updatePayload = { 
                    tokens: currentTokens.map(t => t.tokenId === token.tokenId ? { ...t, isDead: !t.isDead } : t) 
                };
                toast.info(`Status de morte de "${token.name}" alterado.`);
                break;
            case 'toggleVisibility':
                 updatePayload = {
                     tokens: currentTokens.map(t => t.tokenId === token.tokenId ? { ...t, isVisible: !(t.isVisible ?? true) } : t)
                 };
                break;
            default: return;
        }
        updateRoom(updatePayload);
    };

    const handleTokenSelect = (token) => {
        setSelectedTokenId(token ? token.tokenId : null);
        setContextMenu({ token: null, x: 0, y: 0 });
    };

    const handleTokenContextMenu = (e, token) => {
        if (!token) { setContextMenu({ token: null, x: 0, y: 0 }); return; }
        const container = e.target.getStage()?.container();
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = e.evt.clientX - rect.left;
        const y = e.evt.clientY - rect.top;
        setContextMenu(prev => (prev.token?.tokenId === token.tokenId ? { token: null, x: 0, y: 0 } : { token, x, y }));
        setSelectedTokenId(null);
    };
    
    const activeTurnTokenId = (initiativeOrder[currentIndex] || null)?.tokenId;

    return (
        <>
            <VTTLayout>
                <LeftSidebar onToolSelect={toggleWindow} />
                <MapArea>
                    <VTTMap
                        activeScene={activeScene}
                        selectedTokenId={selectedTokenId}
                        onTokenSelect={handleTokenSelect}
                        onTokenContextMenu={handleTokenContextMenu}
                        activeTurnTokenId={activeTurnTokenId}
                        fowTool={isMaster && windows.fogOfWar ? fowTool : null}
                    />
                    <AnimatePresence>
                        {contextMenu.token && <TokenContextMenu token={contextMenu.token} x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu({ token: null, x: 0, y: 0 })} onAction={handleContextMenuAction} />}
                    </AnimatePresence>
                </MapArea>
                <DiceToolbar 
                    macros={macros} onRoll={executeRoll} onOpenMacroManager={() => toggleWindow('macroManager')} 
                />
            </VTTLayout>

            <DiceRoller isVisible={isRolling} rollData={currentRoll} onAnimationComplete={onAnimationComplete} />
            <DiceModifierModal isOpen={isModifierModalOpen} onClose={closeModifierModal} />
            
            <FloatingWindow title="Gerenciador de Cenas" isOpen={windows.sceneManager} onClose={() => toggleWindow('sceneManager')}><SceneManager /></FloatingWindow>
            <FloatingWindow title="Grimório" isOpen={windows.enemyGrimoire} onClose={() => toggleWindow('enemyGrimoire')}><EnemyGrimoire /></FloatingWindow>
            <FloatingWindow title="Ordem de Iniciativa" isOpen={windows.initiativeTracker || isRunning} onClose={() => toggleWindow('initiativeTracker')}><InitiativeTracker onPlayerRoll={handlePlayerRollInitiative} /></FloatingWindow>
            <FloatingWindow title="Log de Rolagens" isOpen={windows.gameLog} onClose={() => toggleWindow('gameLog')} initialPosition={{ x: window.innerWidth - 420, y: 50 }}><GameLog /></FloatingWindow>
            <FloatingWindow title="Gerenciador de Macros" isOpen={windows.macroManager} onClose={() => toggleWindow('macroManager')}><MacroManager macros={macros} addMacro={addMacro} updateMacro={updateMacro} deleteMacro={deleteMacro} /></FloatingWindow>
            <FloatingWindow title="Controle de Névoa de Guerra" isOpen={windows.fogOfWar} onClose={() => toggleWindow('fogOfWar')}>
                <FogOfWarManager
                    tool={fowTool.tool} setTool={(tool) => setFowTool(prev => ({ ...prev, tool }))}
                    brushSize={fowTool.brushSize} setBrushSize={(size) => setFowTool(prev => ({ ...prev, brushSize: size }))}
                    onFillAll={fillFog}
                    onClearAll={clearFog}
                />
            </FloatingWindow>
            <FloatingWindow title="Configurações da Sala" isOpen={windows.roomSettings} onClose={() => toggleWindow('roomSettings')}>
                <RoomSettings />
            </FloatingWindow>
        </>
    );
};

export const GameRoomUI = () => {
    const { loading, room } = useRoom();
    if (loading) return <RPGLoader />;
    if (!room) return null;
    return <GameRoomContent />;
};