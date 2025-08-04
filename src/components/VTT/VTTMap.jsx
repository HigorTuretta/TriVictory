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
import toast from 'react-hot-toast';
import { useUserCharacters } from '../../hooks/useUserCharacters';

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
    const [img] = useImage(tokenData.imageUrl, 'anonymous');
    const shapeRef = useRef(null);

    useEffect(() => {
        if (shapeRef.current) {
            shapeRef.current.to({ x: tokenData.x, y: tokenData.y, duration: 0.2, easing: Konva.Easings.EaseInOut });
        }
    }, [tokenData.x, tokenData.y]);
    
    const handleDragEnd = (e) => {
        const newPos = { x: Math.round(e.target.x() / GRID_SIZE) * GRID_SIZE, y: Math.round(e.target.y() / GRID_SIZE) * GRID_SIZE };
        onDragEnd(tokenData.tokenId, newPos);
    };

    const statusIcons = [];
    if (tokenData.isDead) statusIcons.push('💀');
    if (tokenData.isImmobilized) statusIcons.push('🚷');
    if (tokenData.isKnockedOut) statusIcons.push('😴');

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
            {statusIcons.map((icon, index) => (
                <Text
                    key={index}
                    text={icon}
                    x={GRID_SIZE / 2 - 10}
                    y={-GRID_SIZE/2 + (index * 22)}
                    fontSize={24}
                    shadowColor="black"
                    shadowBlur={5}
                    shadowOffsetX={1}
                    shadowOffsetY={1}
                />
            ))}
        </Group>
    );
};

const FogOfWarLayer = ({ paths, playerTokens, isMaster, visionSettings, mapSize }) => {
    const opacity = isMaster ? 0.7 : 1;
    return (
        <Layer listening={false}>
            <Rect x={0} y={0} width={mapSize.width || 5000} height={mapSize.height || 5000} fill={FOG_COLOR} opacity={opacity} />
            {!isMaster && visionSettings.playerVision && playerTokens.map(token => (
                <Circle key={`vision-${token.tokenId}`} x={token.x + GRID_SIZE / 2} y={token.y + GRID_SIZE / 2} radius={GRID_SIZE * visionSettings.visionRadius} fill="white" globalCompositeOperation={'destination-out'}/>
            ))}
            {(paths || []).map((path, i) => (
                <Line key={i} points={path.points} stroke={path.isEraser ? 'white' : FOG_COLOR} strokeWidth={path.brushSize} lineCap="round" lineJoin="round" globalCompositeOperation={path.isEraser ? 'destination-out' : 'source-over'}/>
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
    const { characters: allPlayerCharacters } = useUserCharacters();

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
        if (activeScene) setMapSize({ width: 0, height: 0 });
    }, [activeScene?.id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                if (!isPanningWithSpace) { e.preventDefault(); setIsPanningWithSpace(true); }
                return;
            }
            if (e.code.startsWith('Arrow')) {
                if (!selectedTokenId) return;
                const tokenToMove = sceneTokens.find(t => t.tokenId === selectedTokenId);
                if (!tokenToMove || (tokenToMove.isImmobilized && !isMaster)) return;
                
                e.preventDefault();
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
        const handleKeyUp = (e) => { if (e.code === 'Space') { e.preventDefault(); setIsPanningWithSpace(false); } };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
    }, [isPanningWithSpace, selectedTokenId, sceneTokens, updateTokenPosition, isMaster]);
    
    const handleTokenClick = (e, token) => {
        const isOwnPlayerToken = token.type === 'player' && token.userId === currentUser.uid;
        if (e.evt.button === 2 || e.evt.ctrlKey) {
            e.evt.preventDefault();
            if (isMaster || isOwnPlayerToken) { onTokenContextMenu(e, token); }
            return;
        }
        if (isMaster || isOwnPlayerToken) { onTokenSelect(token); }
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
                tokenId: uuidv4(), type: 'enemy', name: tokenName, grimoireId: enemy.id, imageUrl: getTokenImageUrl(enemy.imageUrl), sceneId: activeScene.id, x, y, color: '#FF3B30', isVisible: false, isDead: false, isImmobilized: false, isKnockedOut: false,
                pv_current: enemy.pv, pv_max: enemy.pv, pm_current: enemy.pm, pm_max: enemy.pm, pa_current: enemy.pa, pa_max: enemy.pa, attributes: enemy.attributes,
            };
            updateRoom({ tokens: [...currentTokens, newToken] });
        } else if (playerDataString) {
            const playerLink = JSON.parse(playerDataString);
            // CORREÇÃO: A verificação agora inclui o ID da cena ativa.
            if (currentTokens.some(t => t.tokenId === playerLink.characterId && t.sceneId === activeScene.id)) {
                return toast(`${playerLink.characterName} já está nesta cena.`);
            }
            
            const fullCharData = allPlayerCharacters.find(c => c.id === playerLink.characterId);
            if (!fullCharData) return toast.error("Não foi possível carregar os dados completos do personagem.");

            const { poder = 0, habilidade = 0, resistencia = 0 } = fullCharData.attributes || {};
            const pv_max = resistencia * 5 || 1;
            const pm_max = habilidade * 5 || 1;
            const pa_max = poder || 1;

            const newToken = {
                tokenId: playerLink.characterId, userId: playerLink.userId, name: playerLink.characterName, imageUrl: getTokenImageUrl(playerLink.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${playerLink.characterName}`, type: 'player', sceneId: activeScene.id, x, y, color: '#3498db',
                isVisible: true, isDead: false, isImmobilized: false, isKnockedOut: false,
                pv_current: fullCharData.pv_current ?? pv_max, pv_max,
                pm_current: fullCharData.pm_current ?? pm_max, pm_max,
                pa_current: fullCharData.pa_current ?? pa_max, pa_max,
                attributes: fullCharData.attributes,
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
            <Stage width={mapContainerRef.current?.clientWidth || window.innerWidth - 280} height={mapContainerRef.current?.clientHeight || window.innerHeight} onWheel={handleWheel} draggable={isDraggable} onClick={handleStageClick} ref={stageRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onContextMenu={(e) => e.evt.preventDefault()}>
                <Layer><SceneBackground imageUrl={activeScene?.imageUrl} onLoad={setMapSize} /></Layer>
                <FogOfWarLayer paths={fogPaths} playerTokens={playerVisionSources} isMaster={isMaster} visionSettings={roomSettings} mapSize={mapSize} />
                <Layer>
                    {visibleTokens.map(token => {
                        const canDrag = isMaster || (token.userId === currentUser.uid && !token.isImmobilized);
                        return (<Token key={token.tokenId} tokenData={token} onDragEnd={updateTokenPosition} onClick={(e) => handleTokenClick(e, token)} onContextMenu={(e) => handleTokenClick(e, token)} isDraggable={canDrag} isMaster={isMaster} isSelected={token.tokenId === selectedTokenId} isTurn={token.tokenId === activeTurnTokenId} theme={theme} />);
                    })}
                </Layer>
                {isMaster && fowTool && !isPanningWithSpace && (
                    <Layer listening={false}><BrushCursor x={cursorPos.x} y={cursorPos.y} brushSize={fowTool.brushSize} tool={fowTool.tool} /></Layer>
                )}
            </Stage>
        </MapContainer>
    );
};