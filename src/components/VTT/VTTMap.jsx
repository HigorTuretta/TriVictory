// src/components/VTT/VTTMap.jsx
import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group, Rect, Line } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useTheme } from 'styled-components';
import { MapContainer } from './styles';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { getTokenImageUrl } from '../../services/cloudinaryService';

const GRID_SIZE = 70;
const FOG_COLOR = "#0a0a0c";

// --- Componentes Internos do Mapa ---

const SceneBackground = ({ imageUrl }) => {
    const [img] = useImage(imageUrl, 'anonymous');
    return <KonvaImage image={img} x={0} y={0} listening={false} />;
};

const Token = ({ tokenData, onDragEnd, onClick, onContextMenu, isDraggable, isMaster, isSelected, theme, isTurn }) => {
    const [img] = useImage(tokenData.imageUrl, 'anonymous');
    const shapeRef = useRef(null);

    useEffect(() => {
        if (shapeRef.current) {
            shapeRef.current.to({
                x: tokenData.x,
                y: tokenData.y,
                duration: 0.2,
                easing: Konva.Easings.EaseInOut,
            });
        }
    }, [tokenData.x, tokenData.y]);
    
    const handleDragEnd = (e) => {
        const newPos = {
            x: Math.round(e.target.x() / GRID_SIZE) * GRID_SIZE,
            y: Math.round(e.target.y() / GRID_SIZE) * GRID_SIZE,
        };
        onDragEnd(tokenData.tokenId, newPos);
    };

    return (
        <Group
            ref={shapeRef}
            x={tokenData.x}
            y={tokenData.y}
            draggable={isDraggable}
            onDragEnd={handleDragEnd}
            onClick={onClick}
            onTap={onClick}
            onContextMenu={onContextMenu}
            opacity={(tokenData.isVisible === false && isMaster) ? 0.5 : 1}
        >
            <Circle
                radius={GRID_SIZE / 2}
                fillPatternImage={img}
                fillPatternScaleX={GRID_SIZE / (img?.width || GRID_SIZE)}
                fillPatternScaleY={GRID_SIZE / (img?.height || GRID_SIZE)}
                fillPatternOffset={{ 
                    x: (img?.width || GRID_SIZE) / 2,
                    y: (img?.height || GRID_SIZE) / 2
                }}
                stroke={isTurn ? '#FFD700' : (isSelected ? theme.primary : (tokenData.color || '#3498db'))}
                strokeWidth={isSelected || isTurn ? 6 : 4}
                shadowColor={isTurn ? '#FFD700' : (isSelected ? theme.primary : 'black')}
                shadowBlur={isSelected || isTurn ? 20 : 10}
                shadowOpacity={isSelected || isTurn ? 0.9 : 0.6}
            />
            <Text
                text={tokenData.name}
                y={GRID_SIZE / 2 + 5}
                width={GRID_SIZE * 1.5}
                offsetX={(GRID_SIZE * 1.5) / 2}
                align="center"
                fill="white"
                fontSize={14}
                fontStyle="bold"
                shadowColor="black"
                shadowBlur={10}
            />
        </Group>
    );
};

const FogOfWarLayer = ({ paths, playerTokens, isMaster }) => {
    const opacity = isMaster ? 0.7 : 1;
    return (
        <Layer listening={false}>
            <Rect x={0} y={0} width={5000} height={5000} fill={FOG_COLOR} opacity={opacity} />
            
            {!isMaster && playerTokens.map(token => (
                <Circle
                    key={`vision-${token.tokenId}`}
                    x={token.x + GRID_SIZE / 2}
                    y={token.y + GRID_SIZE / 2}
                    radius={GRID_SIZE * 3.5}
                    fill="white"
                    globalCompositeOperation={'destination-out'}
                />
            ))}

            {(paths || []).map((path, i) => (
                <Line
                    key={i}
                    points={path.points}
                    stroke="white"
                    strokeWidth={path.brushSize}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={path.isEraser ? 'destination-out' : 'source-over'}
                />
            ))}
        </Layer>
    );
};

const BrushCursor = ({ x, y, brushSize, tool }) => {
    if (!tool) return null;
    return <Circle x={x} y={y} radius={brushSize / 2} stroke={tool === 'eraser' ? '#00BFFF' : '#FF4136'} strokeWidth={2} listening={false} dash={[10, 5]} />;
};

export const VTTMap = ({ activeScene, selectedTokenId, onTokenSelect, onTokenContextMenu, activeTurnTokenId, fowTool }) => {
    const { room, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const isMaster = room.masterId === currentUser.uid;
    const theme = useTheme();
    const stageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastLine = useRef(null);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

    const allTokensOnScene = useMemo(() => {
        const playerTokensData = (Array.isArray(room.characters) && activeScene) ? room.characters.map(charLink => ({
            tokenId: charLink.characterId, type: 'player', name: charLink.characterName || 'Jogador',
            imageUrl: getTokenImageUrl(charLink.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${charLink.characterName}`,
            x: charLink.x ?? 0, y: charLink.y ?? 0, isVisible: charLink.isVisible ?? true, isDead: charLink.isDead || false,
            color: '#3498db', sceneId: activeScene.id,
        })).filter(Boolean) : [];
        const enemyTokens = (Array.isArray(room.tokens) && activeScene) ? room.tokens.filter(t => t.sceneId === activeScene.id) : [];
        return [...playerTokensData, ...enemyTokens];
    }, [room.characters, room.tokens, activeScene]);
    
    const updateTokenPosition = useCallback((tokenId, newPos) => {
        const isPlayerToken = (room.characters || []).some(c => c.characterId === tokenId);
        const updatePayload = {};

        if (isPlayerToken) {
            updatePayload.characters = (room.characters || []).map(c => c.characterId === tokenId ? { ...c, ...newPos } : c);
        } else {
            updatePayload.tokens = (room.tokens || []).map(t => t.tokenId === tokenId ? { ...t, ...newPos } : t);
        }
        updateRoom(updatePayload);
    }, [room.characters, room.tokens, updateRoom]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedTokenId) return;
            const tokenToMove = allTokensOnScene.find(t => t.tokenId === selectedTokenId);
            if (!tokenToMove) return;
            let newPos = { x: tokenToMove.x, y: tokenToMove.y };
            let moved = false;
            switch (e.key) {
                case 'ArrowUp': newPos.y -= GRID_SIZE; moved = true; break;
                case 'ArrowDown': newPos.y += GRID_SIZE; moved = true; break;
                case 'ArrowLeft': newPos.x -= GRID_SIZE; moved = true; break;
                case 'ArrowRight': newPos.x += GRID_SIZE; moved = true; break;
                default: break;
            }
            if (moved) {
                e.preventDefault();
                newPos.x = Math.max(0, newPos.x);
                newPos.y = Math.max(0, newPos.y);
                updateTokenPosition(selectedTokenId, newPos);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedTokenId, allTokensOnScene, updateTokenPosition]);
    
    const handleTokenClick = (e, token) => {
        const myCharId = room.characters?.find(c => c.userId === currentUser.uid)?.characterId;
        const canSelect = isMaster || (token.type === 'player' && token.tokenId === myCharId);
        if (!canSelect) return;
        if (e.evt.button === 2 || e.evt.ctrlKey) {
            e.evt.preventDefault();
            onTokenContextMenu(e, token);
        } else {
            onTokenSelect(token);
        }
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
    const handleStageClick = (e) => {
        if (e.target === e.target.getStage()) {
            onTokenSelect(null);
            onTokenContextMenu(e, null);
        }
    };
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

    const handleMouseDown = (e) => {
        if (!isMaster || !activeScene || e.target !== e.target.getStage() || !fowTool) return;
        setIsDrawing(true);
        const pos = e.target.getRelativePointerPosition();
        lastLine.current = { points: [pos.x, pos.y], brushSize: fowTool.brushSize, isEraser: fowTool.tool === 'eraser' };
    };
    const handleMouseMove = (e) => {
        const stage = e.target.getStage();
        if (stage) {
            const pos = stage.getRelativePointerPosition();
            setCursorPos(pos);
            if (!isDrawing || !isMaster || !activeScene) return;
            const updatedPoints = lastLine.current.points.concat([pos.x, pos.y]);
            lastLine.current.points = updatedPoints;
            stage.batchDraw();
        }
    };
    const handleMouseUp = () => {
        if (isDrawing && isMaster) {
            setIsDrawing(false);
            const sceneFog = room.fogOfWar?.[activeScene.id] || { fogPaths: [] };
            const newPaths = [...(sceneFog.fogPaths || []), lastLine.current];
            updateRoom({ fogOfWar: { ...room.fogOfWar, [activeScene.id]: { ...sceneFog, fogPaths: newPaths } } });
            lastLine.current = null;
        }
    };
    
    const visibleTokens = isMaster ? allTokensOnScene : allTokensOnScene.filter(t => t.isVisible !== false);
    const fogPaths = room.fogOfWar?.[activeScene?.id]?.fogPaths || [];

    return (
        <MapContainer ref={mapContainerRef} onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={(e) => e.preventDefault()} tabIndex={1}>
            <Stage
                width={mapContainerRef.current?.clientWidth || window.innerWidth - 280}
                height={mapContainerRef.current?.clientHeight || window.innerHeight}
                onWheel={handleWheel}
                draggable={!isDrawing}
                onClick={handleStageClick}
                onTap={handleStageClick}
                onContextMenu={(e) => e.evt.preventDefault()}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={stageRef}
            >
                <Layer>
                    {activeScene?.imageUrl && <SceneBackground imageUrl={activeScene.imageUrl} />}
                    {visibleTokens.map(token => (
                        <Token
                            key={`${token.type}-${token.tokenId}`}
                            tokenData={token}
                            onDragEnd={updateTokenPosition}
                            onClick={(e) => handleTokenClick(e, token)}
                            onContextMenu={(e) => handleTokenClick(e, token)}
                            isDraggable={isMaster || (token.type === 'player' && token.tokenId === (room.characters?.find(c => c.userId === currentUser.uid)?.characterId))}
                            isMaster={isMaster}
                            isSelected={token.tokenId === selectedTokenId}
                            isTurn={token.tokenId === activeTurnTokenId}
                            theme={theme}
                        />
                    ))}
                </Layer>
                <FogOfWarLayer
                    paths={fogPaths}
                    playerTokens={allTokensOnScene.filter(t => t.type === 'player' && t.sceneId === activeScene?.id)}
                    isMaster={isMaster}
                />
                {isMaster && fowTool && (
                    <Layer listening={false}>
                        <BrushCursor x={cursorPos.x} y={cursorPos.y} brushSize={fowTool.brushSize} tool={fowTool.tool} />
                    </Layer>
                )}
            </Stage>
        </MapContainer>
    );
};