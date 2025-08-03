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
// CORREÇÃO: Importa a função para construir URLs do Cloudinary.
import { getTokenImageUrl } from '../../services/cloudinaryService';
import toast from 'react-hot-toast';

const GRID_SIZE = 70;
const FOG_COLOR = "#0a0a0c";

const SceneBackground = ({ imageUrl, onLoad }) => {
    const [img] = useImage(imageUrl, 'anonymous');
    
    useEffect(() => {
        if (img) {
            onLoad({ width: img.width, height: img.height });
        }
    }, [img, onLoad]);

    return <KonvaImage image={img} x={0} y={0} listening={false} />;
};

const Token = ({ tokenData, onDragEnd, onClick, onContextMenu, isDraggable, isMaster, isSelected, theme, isTurn }) => {
    // CORREÇÃO: A URL da imagem do token já virá pronta para ser consumida.
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
                fillPatternOffset={{ x: (img?.width || GRID_SIZE) / 2, y: (img?.height || GRID_SIZE) / 2 }}
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

const FogOfWarLayer = ({ paths, playerTokens, isMaster, visionSettings, mapSize }) => {
    const opacity = isMaster ? 0.7 : 1;

    return (
        <Layer listening={false}>
            <Rect 
                x={0} y={0} 
                width={mapSize.width || 5000} 
                height={mapSize.height || 5000} 
                fill={FOG_COLOR} 
                opacity={opacity} 
            />
            
            {!isMaster && visionSettings.playerVision && playerTokens.map(token => (
                <Circle
                    key={`vision-${token.tokenId}`}
                    x={token.x + GRID_SIZE / 2}
                    y={token.y + GRID_SIZE / 2}
                    radius={GRID_SIZE * visionSettings.visionRadius}
                    fill="white"
                    globalCompositeOperation={'destination-out'}
                />
            ))}

            {(paths || []).map((path, i) => (
                <Line
                    key={i}
                    points={path.points}
                    stroke={path.isEraser ? 'white' : FOG_COLOR}
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
    const { room, updateRoom, updateTokenPosition, setFogPaths } = useRoom();
    const { currentUser } = useAuth();
    const isMaster = room.masterId === currentUser.uid;
    const theme = useTheme();
    const stageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastLine = useRef(null);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [isPanningWithSpace, setIsPanningWithSpace] = useState(false);
    const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

    const roomSettings = room.roomSettings || { playerVision: true, visionRadius: 3.5 };
    
    const sceneTokens = useMemo(() => {
        if (!Array.isArray(room.tokens) || !activeScene) return [];
        return room.tokens.filter(t => t.sceneId === activeScene.id);
    }, [room.tokens, activeScene]);

    const playerVisionSources = useMemo(() => {
        if (!activeScene) return [];
        return sceneTokens.filter(t => t.type === 'player' && t.isVisible !== false);
    }, [sceneTokens, activeScene]);

    useEffect(() => {
        if (activeScene) {
            setMapSize({ width: 0, height: 0 });
        }
    }, [activeScene?.id]);

    // CORREÇÃO: Unifica todos os event listeners de teclado em um único useEffect para evitar conflitos.
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Lógica da barra de espaço
            if (e.code === 'Space') {
                if (!isPanningWithSpace) {
                    e.preventDefault();
                    setIsPanningWithSpace(true);
                }
                return; // Impede que o código das setas seja executado
            }
            
            // Lógica das teclas de seta
            if (e.code.startsWith('Arrow')) {
                if (!selectedTokenId) return;
                e.preventDefault();
                const tokenToMove = sceneTokens.find(t => t.tokenId === selectedTokenId);
                if (!tokenToMove) return;

                let newPos = { x: tokenToMove.x, y: tokenToMove.y };
                switch (e.key) {
                    case 'ArrowUp': newPos.y -= GRID_SIZE; break;
                    case 'ArrowDown': newPos.y += GRID_SIZE; break;
                    case 'ArrowLeft': newPos.x -= GRID_SIZE; break;
                    case 'ArrowRight': newPos.x += GRID_SIZE; break;
                    default: return;
                }
                newPos.x = Math.max(0, newPos.x);
                newPos.y = Math.max(0, newPos.y);
                updateTokenPosition(selectedTokenId, newPos);
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPanningWithSpace(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPanningWithSpace, selectedTokenId, sceneTokens, updateTokenPosition]);
    
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
    
    const getDropPosition = (e) => {
        stageRef.current.setPointersPositions(e);
        const position = stageRef.current.getPointerPosition();
        const stage = stageRef.current;
        return {
            x: Math.round((position.x - stage.x()) / stage.scaleX() / GRID_SIZE) * GRID_SIZE,
            y: Math.round((position.y - stage.y()) / stage.scaleY() / GRID_SIZE) * GRID_SIZE,
        };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (!activeScene) return;

        const enemyDataString = e.dataTransfer.getData('application/vtt-enemy');
        const playerDataString = e.dataTransfer.getData('application/vtt-player-character');
        const currentTokens = room.tokens || [];
        const { x, y } = getDropPosition(e);

        if (enemyDataString) {
            const enemy = JSON.parse(enemyDataString);
            const sameNameCount = currentTokens.filter(t => t.grimoireId === enemy.id && t.sceneId === activeScene.id).length;
            const tokenName = sameNameCount > 0 ? `${enemy.name} ${sameNameCount + 1}` : enemy.name;
            const newToken = {
                ...enemy,
                tokenId: uuidv4(),
                grimoireId: enemy.id,
                type: 'enemy',
                sceneId: activeScene.id,
                name: tokenName,
                x, y,
                color: '#FF3B30',
                // CORREÇÃO: Constrói a URL completa para o token do inimigo.
                imageUrl: getTokenImageUrl(enemy.imageUrl),
                // MUDANÇA: Inimigos agora entram invisíveis por padrão.
                isVisible: false,
                isDead: false
            };
            delete newToken.id;
            updateRoom({ tokens: [...currentTokens, newToken] });
        } else if (playerDataString) {
            const playerChar = JSON.parse(playerDataString);
            if (currentTokens.some(t => t.tokenId === playerChar.characterId)) {
                return toast.info(`${playerChar.characterName} já está no mapa.`);
            }
            const newToken = {
                tokenId: playerChar.characterId,
                userId: playerChar.userId,
                name: playerChar.characterName,
                imageUrl: getTokenImageUrl(playerChar.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${playerChar.characterName}`,
                type: 'player', sceneId: activeScene.id, x, y,
                color: '#3498db', isVisible: true, isDead: false,
            };
            updateRoom({ tokens: [...currentTokens, newToken] });
        }
    };
    
    const handleDragOver = (e) => e.preventDefault();
    const handleStageClick = (e) => { if (e.target === e.target.getStage()) onTokenSelect(null); };
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
        if (!isMaster || !activeScene || e.target !== e.target.getStage() || !fowTool || isPanningWithSpace) return;
        setIsDrawing(true);
        const pos = e.target.getRelativePointerPosition();
        lastLine.current = { points: [pos.x, pos.y], brushSize: fowTool.brushSize, isEraser: fowTool.tool === 'eraser' };
    };
    const handleMouseMove = (e) => {
        const stage = e.target.getStage();
        if (stage) {
            const pos = stage.getRelativePointerPosition();
            setCursorPos(pos);
            if (!isDrawing || !isMaster || !activeScene || isPanningWithSpace) return;
            const updatedPoints = lastLine.current.points.concat([pos.x, pos.y]);
            lastLine.current.points = updatedPoints;
            stage.batchDraw();
        }
    };
    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            const currentPaths = room.fogOfWar?.[activeScene.id]?.fogPaths || [];
            setFogPaths(activeScene.id, [...currentPaths, lastLine.current]);
            lastLine.current = null;
        }
    };
    
    const visibleTokens = isMaster ? sceneTokens : sceneTokens.filter(t => t.isVisible !== false || t.userId === currentUser.uid);
    const fogPaths = room.fogOfWar?.[activeScene?.id]?.fogPaths || [];
    const isDraggable = (isPanningWithSpace || !fowTool) && !isDrawing;

    return (
        <MapContainer ref={mapContainerRef} onDrop={handleDrop} onDragOver={handleDragOver} tabIndex={1}>
            <Stage
                width={mapContainerRef.current?.clientWidth || window.innerWidth - 280}
                height={mapContainerRef.current?.clientHeight || window.innerHeight}
                onWheel={handleWheel} draggable={isDraggable} onClick={handleStageClick} ref={stageRef}
                onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                onContextMenu={(e) => e.evt.preventDefault()}
            >
                <Layer>
                    {activeScene?.imageUrl && <SceneBackground imageUrl={activeScene.imageUrl} onLoad={setMapSize} />}
                </Layer>
                <FogOfWarLayer
                    paths={fogPaths}
                    playerTokens={playerVisionSources}
                    isMaster={isMaster}
                    visionSettings={roomSettings}
                    mapSize={mapSize}
                />
                <Layer>
                    {visibleTokens.map(token => <Token key={token.tokenId} tokenData={token} onDragEnd={updateTokenPosition} onClick={(e) => handleTokenClick(e, token)} onContextMenu={(e) => handleTokenClick(e, token)} isDraggable={isMaster || token.userId === currentUser.uid} isMaster={isMaster} isSelected={token.tokenId === selectedTokenId} isTurn={token.tokenId === activeTurnTokenId} theme={theme} />)}
                </Layer>
                {isMaster && fowTool && !isPanningWithSpace && (
                    <Layer listening={false}>
                        <BrushCursor x={cursorPos.x} y={cursorPos.y} brushSize={fowTool.brushSize} tool={fowTool.tool} />
                    </Layer>
                )}
            </Stage>
        </MapContainer>
    );
};