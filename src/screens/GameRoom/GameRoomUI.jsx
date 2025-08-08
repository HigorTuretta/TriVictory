// src/screens/GameRoom/GameRoomUI.jsx

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCurrentPlayerCharacter } from '../../hooks/useCurrentPlayerCharacter';
import { useDiceRoller } from '../../hooks/useDiceRoller';
import { useInitiative } from '../../hooks/useInitiative';
import { useRollMacros } from '../../hooks/useRollMacros';
import { useFogOfWar } from '../../hooks/useFogOfWar';
import { useLinkedCharactersData } from '../../hooks/useLinkedCharactersData';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import _ from 'lodash';
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
import { JukeboxManager } from '../../components/VTT/JukeboxManager';
import { JukeboxPlayer } from '../../components/VTT/JukeboxPlayer';
import toast from 'react-hot-toast';
import { FogOfWarManager } from '../../components/VTT/FogOfWarManager';
import { MacroManager } from '../../components/VTT/MacroManager';
import { useChat } from '../../hooks/useChat'; // NOVO
import { ChatWindow } from '../../components/VTT/ChatWindow';
import { Howl } from 'howler';
import pingSoundFile from '../../assets/sounds/ping.mp3';

const GameRoomContent = () => {
    const { room, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const { character, updateCharacter } = useCurrentPlayerCharacter();
    const { executeRoll, isRolling, currentRoll, onAnimationComplete, isModifierModalOpen, closeModifierModal } = useDiceRoller(character, updateCharacter); const { addToInitiative, initiativeOrder, currentIndex, isRunning } = useInitiative();
    const { macros, addMacro, updateMacro, deleteMacro } = useRollMacros();
    const { charactersData, loading: charactersLoading } = useLinkedCharactersData();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [windows, setWindows] = useState({
        sceneManager: false, initiativeTracker: false, enemyGrimoire: false,
        gameLog: true, macroManager: false, fogOfWar: false, roomSettings: false, jukebox: false, chat: false,
    });
    const [selectedTokenId, setSelectedTokenId] = useState(null);
    const [contextMenuTokenId, setContextMenuTokenId] = useState(null);
    const [fowTool, setFowTool] = useState({ tool: 'eraser', brushSize: 70 });
    const { messages, sendMessage, unreadCount } = useChat(windows.chat);
    const [localPings, setLocalPings] = useState([]);
    const lastPingIdRef = useRef(null);

    const pingSound = useMemo(() => new Howl({
        src: [pingSoundFile],
        volume: 0.1,
    }), []);

    const isMaster = room.masterId === currentUser.uid;
    const activeScene = (Array.isArray(room.scenes) && room.activeSceneId) ? room.scenes.find(s => s.id === room.activeSceneId) : null;

    const { fillAll: fillFog, clearAll: clearFog } = useFogOfWar(activeScene?.id);

    const debouncedCharacterUpdate = useCallback(_.debounce((charId, data) => {
        if (charId) {
            const charRef = doc(db, 'characters', charId);
            updateDoc(charRef, data).then(() => toast.success('Ficha salva!', { id: 'save-toast', duration: 1500 })).catch(() => toast.error('Falha ao salvar ficha.', { id: 'save-toast' }));
        }
    }, 800), []);

    const liveContextMenuToken = useMemo(() => {
        if (!contextMenuTokenId) return null;
        const tokenFromRoom = room.tokens.find(t => t.tokenId === contextMenuTokenId);
        if (!tokenFromRoom) return null;

        if (tokenFromRoom.type === 'player' && charactersData[tokenFromRoom.tokenId]) {
            const fullCharData = charactersData[tokenFromRoom.tokenId];
            const { attributes = {}, advantages = [] } = fullCharData;
            const { poder = 0, habilidade = 0, resistencia = 0 } = attributes;

            // CORREÇÃO: Calcula os totais de recursos incluindo os bônus das vantagens
            let totalPa = poder || 1;
            let totalPm = (habilidade * 5) || 1;
            let totalPv = (resistencia * 5) || 1;

            advantages.forEach(vantagem => {
                if (vantagem.nome === '+Vida') totalPv += 10;
                if (vantagem.nome === '+Mana') totalPm += 10;
                if (vantagem.nome === '+Ação') totalPa += 2;
            });

            return {
                ...tokenFromRoom,
                pv_max: totalPv,
                pm_max: totalPm,
                pa_max: totalPa,
            };
        }
        return tokenFromRoom;
    }, [contextMenuTokenId, room.tokens, charactersData]);

    const toggleWindow = (windowName) => setWindows(prev => ({ ...prev, [windowName]: !prev[windowName] }));

    const handleRollInitiativeFor = (token) => {
        const onRollComplete = (rollData) => {
            addToInitiative(token, rollData.total);
            setContextMenuTokenId(null);
        };

        const tokenDataSource = room.tokens.find(t => t.tokenId === token.tokenId);
        const habilidade = tokenDataSource?.attributes?.habilidade || 0;

        // CORREÇÃO: Comando limpo, modificador passado separadamente.
        const command = '1d6';
        const baseModifiers = [{ label: 'Habilidade', value: habilidade }];

        executeRoll(command, baseModifiers, onRollComplete);
    };

    const handlePlayerRollInitiative = () => {
        if (!character) { toast.error("Vincule um personagem para rolar iniciativa."); return; }
        const playerToken = room.tokens.find(t => t.tokenId === character.id);
        if (!playerToken) { toast.error("Você precisa colocar seu personagem no mapa para rolar iniciativa."); return; }
        handleRollInitiativeFor(playerToken);
    };

    const handleContextMenuAction = (action, payload) => {
        const tokens = [...(room.tokens || [])];
        const tokenIndex = tokens.findIndex(t => t.tokenId === payload.tokenId);
        if (tokenIndex === -1) return;
        let token = { ...tokens[tokenIndex] };

        if (!isMaster) {
            if (action === 'updateResource' && token.userId === currentUser.uid) {
                token[payload.resource] = payload.value;
                tokens[tokenIndex] = token;
                updateRoom({ tokens });
                debouncedCharacterUpdate(token.tokenId, { [payload.resource]: payload.value });
            }
            return;
        }

        switch (action) {
            case 'rollInitiative':
                if (token.type === 'enemy') { handleRollInitiativeFor(token); }
                return;
            case 'updateResource':
                token[payload.resource] = payload.value;
                if (token.type === 'player') debouncedCharacterUpdate(token.tokenId, { [payload.resource]: payload.value });
                break;
            case 'fillResource':
                const resourceKey = payload.resource;
                const maxKey = resourceKey.replace('_current', '_max');
                const maxValue = liveContextMenuToken[maxKey];
                token[resourceKey] = maxValue;
                if (token.type === 'player') debouncedCharacterUpdate(token.tokenId, { [resourceKey]: maxValue });
                break;
            case 'toggleVisibility':
                token.isVisible = !(token.isVisible ?? true);
                break;
            case 'toggleImmobilized':
                token.isImmobilized = !token.isImmobilized;
                break;
            case 'toggleKnockedOut':
                token.isKnockedOut = !token.isKnockedOut;
                break;
            case 'toggleDead':
                const newDeadStatus = !token.isDead;
                const newPv = newDeadStatus ? 0 : 1;
                token.isDead = newDeadStatus;
                token.pv_current = newPv;
                if (token.type === 'player') {
                    const charRef = doc(db, 'characters', token.tokenId);
                    updateDoc(charRef, { isDead: newDeadStatus, pv_current: newPv });
                }
                break;
            case 'delete':
                updateRoom({ tokens: tokens.filter(t => t.tokenId !== payload.tokenId) });
                setContextMenuTokenId(null);
                toast.error(`Token "${token.name}" removido.`);
                return;
            default: return;
        }
        tokens[tokenIndex] = token;
        updateRoom({ tokens });
    };

    const handleRoll = useCallback(async (...args) => {
        const result = await executeRoll(...args);

        // Se a rolagem gastou PA, força a atualização do token local para feedback imediato
        if (result && result.wasPaSpent) {
            const currentTokens = room.tokens || [];
            const updatedTokens = currentTokens.map(t => {
                if (t.tokenId === character.id) {
                    // Desconta 1 do valor que o token *tinha*
                    return { ...t, pa_current: Math.max(0, t.pa_current - 1) };
                }
                return t;
            });
            updateRoom({ tokens: updatedTokens });
        }
    }, [character, room.tokens, executeRoll, updateRoom]);

    const handleTokenSelect = (token) => {
        setSelectedTokenId(token ? token.tokenId : null);
        setContextMenuTokenId(null);
    };

    const handleTokenContextMenu = (e, token) => {
        if (!token) { setContextMenuTokenId(null); return; }
        setContextMenuTokenId(token.tokenId);
        setSelectedTokenId(null);
    };

    useEffect(() => {
        const latestPing = room?.latestPing;
        // Se houver um novo ping e for diferente do último processado...
        if (latestPing && latestPing.id !== lastPingIdRef.current) {
            lastPingIdRef.current = latestPing.id; // Marca como processado
            
            // Adiciona ao estado local para renderização
            setLocalPings(current => [...current, latestPing]);

            // Toca o som para todos, exceto para quem enviou
            if (latestPing.senderId !== currentUser.uid) {
                pingSound.play();
            }

            // Agenda a remoção do estado local
            setTimeout(() => {
                setLocalPings(current => current.filter(p => p.id !== latestPing.id));
            }, 4000); // Garante que a animação tenha tempo de completar
        }
    }, [room?.latestPing, currentUser.uid, pingSound]);

    const activeTurnTokenId = (initiativeOrder[currentIndex] || null)?.tokenId;

    if (charactersLoading) return <RPGLoader />;

    return (
        <>
            <JukeboxPlayer />
            <VTTLayout $isSidebarCollapsed={isSidebarCollapsed}>
                <LeftSidebar
                    onToolSelect={toggleWindow}
                    onToggleCollapse={setIsSidebarCollapsed}
                    unreadChatMessages={unreadCount}
                />
                <MapArea>

                    <VTTMap
                        activeScene={activeScene}
                        selectedTokenId={selectedTokenId}
                        onTokenSelect={handleTokenSelect}
                        onTokenContextMenu={handleTokenContextMenu}
                        activeTurnTokenId={activeTurnTokenId}
                        fowTool={isMaster && windows.fogOfWar ? fowTool : null}
                        charactersData={charactersData}
                        localPings={localPings}
                    />
                </MapArea>
                <DiceToolbar macros={macros} onRoll={handleRoll} onOpenMacroManager={() => toggleWindow('macroManager')} />
            </VTTLayout>

            <DiceRoller isVisible={isRolling} rollData={currentRoll} onAnimationComplete={onAnimationComplete} />
            <DiceModifierModal
                isOpen={isModifierModalOpen}
                onClose={closeModifierModal}
                character={character} // Passa o personagem para o modal verificar o PA
            />

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
            <FloatingWindow title="Configurações da Sala" isOpen={windows.roomSettings} onClose={() => toggleWindow('roomSettings')}><RoomSettings /></FloatingWindow>
            <FloatingWindow title="Jukebox da Cena" isOpen={windows.jukebox} onClose={() => toggleWindow('jukebox')}><JukeboxManager activeSceneId={activeScene?.id} /></FloatingWindow>
            <FloatingWindow title="Chat da Sala" isOpen={windows.chat} onClose={() => toggleWindow('chat')} initialPosition={{ x: 85, y: 150 }}>
                <ChatWindow messages={messages} sendMessage={sendMessage} />
            </FloatingWindow>
            {liveContextMenuToken && (
                <FloatingWindow
                    title={`Controle: ${liveContextMenuToken.name}`}
                    isOpen={!!liveContextMenuToken}
                    onClose={() => setContextMenuTokenId(null)}
                    initialPosition={{ x: window.innerWidth / 2 - 200, y: 100 }}
                >
                    <TokenContextMenu
                        token={liveContextMenuToken}
                        onAction={(action, data) => handleContextMenuAction(action, { ...data, tokenId: liveContextMenuToken.tokenId })}
                    />
                </FloatingWindow>
            )}
        </>
    );
};

export const GameRoomUI = () => {
    const { loading, room } = useRoom();
    if (loading) return <RPGLoader />;
    if (!room) return null;
    return <GameRoomContent />;
};