// src/components/VTT/VTTMap.jsx
import React, { useRef, useState, useMemo } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { MapContainer } from './styles';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { getTokenImageUrl } from '../../services/cloudinaryService';
import { TokenContextMenu } from './TokenContextMenu';

const GRID_SIZE = 70;

const SceneBackground = ({ imageUrl }) => {
    const [img] = useImage(imageUrl, 'anonymous');
    return <KonvaImage image={img} x={0} y={0} />;
};

const Token = ({ tokenData, onDragEnd, onClick, isDraggable }) => {
    const [img] = useImage(tokenData.imageUrl, 'anonymous');
    
    const handleDragEnd = (e) => {
        const newPos = {
            x: Math.round(e.target.x() / GRID_SIZE) * GRID_SIZE,
            y: Math.round(e.target.y() / GRID_SIZE) * GRID_SIZE,
        };
        e.target.position(newPos);
        onDragEnd(tokenData.tokenId, newPos);
    };

    return (
        <Group
            x={tokenData.x} y={tokenData.y} draggable={isDraggable}
            onDragEnd={handleDragEnd} onClick={onClick} onTap={onClick}
            opacity={tokenData.isVisible === false ? 0.5 : 1}
        >
            <Circle
                radius={GRID_SIZE / 2}
                fillPatternImage={img}
                fillPatternScaleX={GRID_SIZE / (img?.width || GRID_SIZE)}
                fillPatternScaleY={GRID_SIZE / (img?.height || GRID_SIZE)}
                fillPatternOffset={{ x: (img?.width || GRID_SIZE) / 2, y: (img?.height || GRID_SIZE) / 2 }}
                stroke={tokenData.color || '#3498db'} strokeWidth={4}
                shadowColor="black" shadowBlur={10} shadowOpacity={0.6}
            />
            <Text
                text={tokenData.name} y={GRID_SIZE / 2 + 5} width={GRID_SIZE * 1.5}
                offsetX={(GRID_SIZE * 1.5) / 2} align="center" fill="white"
                fontSize={14} fontStyle="bold" shadowColor="black" shadowBlur={10}
            />
        </Group>
    );
};

export const VTTMap = ({ activeScene }) => {
    const { room, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const stageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const isMaster = room.masterId === currentUser.uid;

    const [contextMenu, setContextMenu] = useState({ token: null, x: 0, y: 0 });
    
    // CORREÇÃO: Memoiza os tokens dos jogadores, garantindo que só sejam criados quando os dados estiverem prontos.
    const playerTokens = useMemo(() => {
        // Só processa se a cena e os personagens existirem e forem arrays
        if (!activeScene || !Array.isArray(room.characters)) return [];
        
        return room.characters.map(charLink => {
            // Garante que todo token de jogador tenha os dados mínimos para renderizar
            if (!charLink.characterId) return null;

            return {
                tokenId: charLink.characterId,
                type: 'player',
                name: charLink.characterName || 'Jogador',
                imageUrl: getTokenImageUrl(charLink.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${charLink.characterName}`,
                x: charLink.x || 0,
                y: charLink.y || 0,
                isVisible: charLink.isVisible ?? true,
                isDead: charLink.isDead || false,
                color: '#3498db',
                sceneId: activeScene.id,
            };
        }).filter(Boolean); // Remove quaisquer resultados nulos
    }, [room.characters, activeScene]);


    const handleTokenClick = (e, token) => {
        if (!isMaster) return;
        e.evt.preventDefault();
        const container = e.target.getStage().container();
        const rect = container.getBoundingClientRect();
        const x = e.evt.clientX - rect.left;
        const y = e.evt.clientY - rect.top;
        setContextMenu({ token, x, y });
    };

    const handleContextMenuAction = (action, token) => {
        let newTokens = [...(room.tokens || [])];
        let newCharacters = [...(room.characters || [])];
        const isPlayerToken = token.type === 'player';

        switch (action) {
            case 'delete':
                if (isPlayerToken) {
                    toast.error("Não é possível remover o token de um jogador do mapa. Desvincule o personagem na barra lateral.");
                } else {
                    newTokens = newTokens.filter(t => t.tokenId !== token.tokenId);
                    toast.error(`Token "${token.name}" removido do mapa.`);
                }
                break;
            case 'kill':
                if (isPlayerToken) {
                    newCharacters = newCharacters.map(c => c.characterId === token.tokenId ? { ...c, isDead: !c.isDead } : c);
                } else {
                    newTokens = newTokens.map(t => t.tokenId === token.tokenId ? { ...t, isDead: !t.isDead } : t);
                }
                toast.info(`Status de morte de "${token.name}" alterado.`);
                break;
            case 'toggleVisibility':
                 if (isPlayerToken) {
                    newCharacters = newCharacters.map(c => c.characterId === token.tokenId ? { ...c, isVisible: !(c.isVisible ?? true) } : c);
                } else {
                    newTokens = newTokens.map(t => t.tokenId === token.tokenId ? { ...t, isVisible: !(t.isVisible ?? true) } : t);
                }
                break;
            case 'rollInitiative':
                toast.success(`Iniciativa rolada para ${token.name}! (Funcionalidade pendente)`);
                break;
            default:
                break;
        }
        updateRoom({ tokens: newTokens, characters: newCharacters });
        setContextMenu({ token: null, x: 0, y: 0 });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        const enemyDataString = e.dataTransfer.getData('application/vtt-enemy');
        if (enemyDataString && activeScene) {
            const enemy = JSON.parse(enemyDataString);
            const position = stageRef.current.getPointerPosition();
            const stage = stageRef.current;
            const x = Math.round((position.x - stage.x()) / stage.scaleX() / GRID_SIZE) * GRID_SIZE;
            const y = Math.round((position.y - stage.y()) / stage.scaleY() / GRID_SIZE) * GRID_SIZE;
            const currentTokens = room.tokens || [];
            const sameNameCount = currentTokens.filter(t => t.grimoireId === enemy.id && t.sceneId === activeScene.id).length;
            const tokenName = sameNameCount > 0 ? `${enemy.name} ${sameNameCount + 1}` : enemy.name;
            const newToken = { ...enemy, tokenId: uuidv4(), grimoireId: enemy.id, type: 'enemy', sceneId: activeScene.id, name: tokenName, x, y, color: '#FF3B30', isVisible: true, isDead: false };
            delete newToken.id;
            updateRoom({ tokens: [...currentTokens, newToken] });
        }
    };
    
    const handleDragOver = (e) => e.preventDefault();
    const handleStageClick = (e) => { if (e.target === e.target.getStage()) { setContextMenu({ token: null, x: 0, y: 0 }); } };
    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        const mousePointTo = { x: (pointer.x - stage.x()) / oldScale, y: (pointer.y - stage.y()) / oldScale };
        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        stage.scale({ x: newScale, y: newScale });
        const newPos = { x: pointer.x - mousePointTo.x * newScale, y: pointer.y - mousePointTo.y * newScale };
        stage.position(newPos);
    };
    
    const updateTokenPosition = (tokenId, newPos) => {
        const isPlayerToken = (room.characters || []).some(c => c.characterId === tokenId);
        if (isPlayerToken) {
            const newCharacters = (room.characters || []).map(c => c.characterId === tokenId ? { ...c, ...newPos } : c);
            updateRoom({ characters: newCharacters });
        } else {
            const newTokens = (room.tokens || []).map(t => t.tokenId === tokenId ? { ...t, ...newPos } : t);
            updateRoom({ tokens: newTokens });
        }
    };

    const sceneEnemyTokens = (room.tokens || []).filter(t => t.sceneId === activeScene?.id);
    const allTokensOnScene = [...playerTokens, ...sceneEnemyTokens];
    const visibleTokens = isMaster ? allTokensOnScene : allTokensOnScene.filter(t => t.isVisible !== false);

    return (
        <>
            <MapContainer ref={mapContainerRef} onDrop={handleDrop} onDragOver={handleDragOver}>
                <Stage
                    width={mapContainerRef.current?.clientWidth || window.innerWidth - 280}
                    height={mapContainerRef.current?.clientHeight || window.innerHeight}
                    onWheel={handleWheel} draggable onClick={handleStageClick} ref={stageRef}
                >
                    <Layer>
                        {activeScene?.imageUrl && <SceneBackground imageUrl={activeScene.imageUrl} />}
                        {visibleTokens.map(token => (
                            <Token
                                key={`${token.type}-${token.tokenId}`}
                                tokenData={token}
                                onDragEnd={updateTokenPosition}
                                onClick={(e) => handleTokenClick(e, token)}
                                isDraggable={isMaster || (token.type === 'player' && token.tokenId === (room.characters.find(c => c.userId === currentUser.uid)?.characterId))}
                            />
                        ))}
                    </Layer>
                </Stage>
            </MapContainer>
            
            <TokenContextMenu
                token={contextMenu.token}
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu({ token: null, x: 0, y: 0 })}
                onAction={handleContextMenuAction}
            />
        </>
    );
};