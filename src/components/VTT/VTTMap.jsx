// src/components/VTT/VTTMap.jsx
import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group, Rect, Line, Shape } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useTheme } from 'styled-components';
import { MapContainer, ZoomSliderContainer } from './styles';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { getTokenImageUrl } from '../../services/cloudinaryService';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

// ---- Constantes visuais ----
const FOG_RGBA = 'rgba(10, 10, 12, 1)'; // blackout dos players
const MASTER_FOG_ALPHA = 0.35;          // FOW do mestre (clarinha)
const EXPLORED_DIM_ALPHA = 0.38;        // quão escuro fica o "explorado" fora da visão

// ---------- Util ----------
const SceneBackground = ({ imageUrl, onLoad }) => {
  const [img] = useImage(imageUrl, 'anonymous');
  useEffect(() => { if (img) onLoad({ width: img.width, height: img.height }); }, [img, onLoad]);
  return <KonvaImage image={img} x={0} y={0} listening={false} />;
};

const Token = ({
  tokenData, onDragEnd, onClick, onContextMenu, isDraggable, isMaster,
  isSelected, theme, isTurn, gridSize, gridOffset,
}) => {
  const [img] = useImage(tokenData.imageUrl, 'anonymous');
  const dragBoundFunc = (pos) => ({
    x: Math.round((pos.x - gridOffset.x) / gridSize) * gridSize + gridOffset.x,
    y: Math.round((pos.y - gridOffset.y) / gridSize) * gridSize + gridOffset.y,
  });
  const handleDragEnd = (e) => {
    const node = e.target;
    onDragEnd(tokenData.tokenId, { x: node.x(), y: node.y() }, tokenData);
  };

  const statusIcons = [];
  if (tokenData.isDead) statusIcons.push('💀');
  if (tokenData.isImmobilized) statusIcons.push('🚷');
  if (tokenData.isKnockedOut) statusIcons.push('😴');

  return (
    <Group
      x={tokenData.x}
      y={tokenData.y}
      draggable={isDraggable}
      dragBoundFunc={dragBoundFunc}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      onTap={onClick}
      onContextMenu={onContextMenu}
      opacity={tokenData.isVisible === false && isMaster ? 0.5 : 1}
    >
      <Circle
        x={gridSize / 2}
        y={gridSize / 2}
        radius={gridSize / 2}
        fillPatternImage={img}
        fillPatternScaleX={gridSize / (img?.width || gridSize)}
        fillPatternScaleY={gridSize / (img?.height || gridSize)}
        fillPatternOffset={{ x: (img?.width || gridSize) / 2, y: (img?.height || gridSize) / 2 }}
        stroke={isTurn ? '#FFD700' : isSelected ? theme.primary : tokenData.color || '#3498db'}
        strokeWidth={isSelected || isTurn ? 6 : 4}
        shadowColor={isTurn ? '#FFD700' : isSelected ? theme.primary : 'black'}
        shadowBlur={isSelected || isTurn ? 20 : 10}
        shadowOpacity={isSelected || isTurn ? 0.9 : 0.6}
      />
      <Text
        text={tokenData.name}
        x={gridSize / 2}
        y={gridSize + 5}
        width={gridSize * 1.5}
        offsetX={(gridSize * 1.5) / 2}
        align="center"
        fill="white"
        fontSize={14}
        fontStyle="bold"
        shadowColor="black"
        shadowBlur={10}
      />
      {statusIcons.map((icon, idx) => (
        <Text key={idx} text={icon} x={gridSize} y={0 + idx * 22} fontSize={24} shadowColor="black" shadowBlur={5} />
      ))}
    </Group>
  );
};

// Máscara única com todos os círculos (não acumula alpha)
const ExploredMaskShape = ({ circles, mode = 'cut', alpha = 1 }) => (
  <Shape
    listening={false}
    sceneFunc={(ctx) => {
      if (!circles || !circles.length) return;
      ctx.save();
      ctx.beginPath();
      circles.forEach((c) => {
        ctx.moveTo(c.x + c.radius, c.y);
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      });
      if (mode === 'cut') {
        ctx.fillStyle = 'black';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
      } else if (mode === 'dim') {
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fill();
      }
      ctx.restore();
    }}
  />
);

// Paths do mestre
const ManualFogPaths = ({ fogPaths, currentDrawing, mode }) => {
  const lines = [];
  const strokeForMode = mode === 'dim'
    ? `rgba(0,0,0,${EXPLORED_DIM_ALPHA})`
    : FOG_RGBA;

  (fogPaths || []).forEach((p, i) => {
    if (!p?.points || p.points.length < 4) return;
    if (p.isEraser) {
      lines.push(
        <Line key={`fp-erase-${mode}-${i}`} points={p.points} stroke="black" strokeWidth={p.brushSize}
          lineCap="round" lineJoin="round" globalCompositeOperation="destination-out" listening={false} />
      );
    } else {
      lines.push(
        <Line key={`fp-brush-${mode}-${i}`} points={p.points} stroke={strokeForMode} strokeWidth={p.brushSize}
          lineCap="round" lineJoin="round" globalCompositeOperation="source-over" listening={false} />
      );
    }
  });

  if (currentDrawing && currentDrawing.points?.length >= 4) {
    const p = currentDrawing;
    if (p.isEraser) {
      lines.push(
        <Line key={`fp-erase-live-${mode}`} points={p.points} stroke="black" strokeWidth={p.brushSize}
          lineCap="round" lineJoin="round" globalCompositeOperation="destination-out" listening={false} />
      );
    } else {
      lines.push(
        <Line key={`fp-brush-live-${mode}`} points={p.points} stroke={strokeForMode} strokeWidth={p.brushSize}
          lineCap="round" lineJoin="round" globalCompositeOperation="source-over" listening={false} />
      );
    }
  }

  return <>{lines}</>;
};

/**
 * PLAYER: um único Layer.
 * Ordem: blackout -> fura com explorado -> traços mestre (cut)
 *        -> fura blackout com visão (corte duro)
 *        -> pinta dim explorado -> traços mestre (dim)
 *        -> remove dim com visão (corte duro) => raio 100% claro
 */
const PlayerFogLayer = ({
  exploredCircles,
  visionSources,
  mapSize,
  fogPaths,
  livePath,
  globalReveal
}) => (
  <Layer listening={false}>
    {/* 1) BLACKOUT base */}
    <Rect
      x={0}
      y={0}
      width={mapSize.width || 5000}
      height={mapSize.height || 5000}
      fill={FOG_RGBA}
      opacity={globalReveal ? 0 : 1}
    />

    {/* 2) Revelar tudo: fura tudo e sai */}
    {globalReveal && (
      <Rect
        x={0}
        y={0}
        width={mapSize.width || 5000}
        height={mapSize.height || 5000}
        fill="black"
        globalCompositeOperation="destination-out"
        listening={false}
      />
    )}

    {!globalReveal && (
      <>
        {/* 3) Fura o BLACKOUT com EXPLORADO (permanente) */}
        <ExploredMaskShape circles={exploredCircles} mode="cut" />
        <ManualFogPaths fogPaths={fogPaths} currentDrawing={livePath} mode="blackout" />

        {/* 3b) Fura o BLACKOUT com a VISÃO ATUAL (corte duro) */}
        {visionSources.map((v, i) => (
          <Circle
            key={`cut-blackout-vision-${i}`}
            x={v.x}
            y={v.y}
            radius={v.radius}
            fill="black"
            globalCompositeOperation="destination-out"
            listening={false}
            perfectDrawEnabled={false}
          />
        ))}

        {/* 4) Pinta DIM do explorado por cima (fora do raio fica esmaecido) */}
        <ExploredMaskShape circles={exploredCircles} mode="dim" alpha={EXPLORED_DIM_ALPHA} />
        <ManualFogPaths fogPaths={fogPaths} currentDrawing={livePath} mode="dim" />

        {/* 5) Remove o DIM com a VISÃO ATUAL (corte duro) -> 100% claro */}
        {visionSources.map((v, i) => (
          <Circle
            key={`cut-dim-vision-${i}`}
            x={v.x}
            y={v.y}
            radius={v.radius}
            fill="black"
            globalCompositeOperation="destination-out"
            listening={false}
            perfectDrawEnabled={false}
          />
        ))}
      </>
    )}
  </Layer>
);

// --------- MESTRE ---------
const MasterPermanentFogLayer = ({ exploredCircles, mapSize, fogPaths, livePath, globalReveal }) => (
  <Layer listening={false}>
    <Rect x={0} y={0} width={mapSize.width || 5000} height={mapSize.height || 5000} fill={FOG_RGBA} opacity={MASTER_FOG_ALPHA} />
    {globalReveal ? (
      <Rect x={0} y={0} width={mapSize.width || 5000} height={mapSize.height || 5000}
        fill="black" opacity={1} globalCompositeOperation="destination-out" listening={false} />
    ) : (
      <>
        <ExploredMaskShape circles={exploredCircles} mode="cut" />
        <ManualFogPaths fogPaths={fogPaths} currentDrawing={livePath} mode="blackout" />
      </>
    )}
  </Layer>
);

const MasterVisionMarkersLayer = ({ sources }) => (
  <Layer listening={false}>
    {sources.map(({ x, y, radius }, idx) => (
      <Circle key={`mv-${idx}`} x={x} y={y} radius={radius} stroke="#00E0FF" strokeWidth={2} dash={[8, 6]} opacity={0.9} listening={false} />
    ))}
  </Layer>
);

// grid / cursor / zoom
const GridLayer = ({ width, height, gridSize, offset, theme }) => {
  const lines = [];
  const offsetX = offset.x % gridSize;
  const offsetY = offset.y % gridSize;
  for (let i = -1; i < width / gridSize + 1; i++) {
    lines.push(
      <Line key={`v-${i}`} points={[Math.round(i * gridSize) + offsetX, 0, Math.round(i * gridSize) + offsetX, height]}
        stroke={theme.border} strokeWidth={1} opacity={0.5} />
    );
  }
  for (let j = -1; j < height / gridSize + 1; j++) {
    lines.push(
      <Line key={`h-${j}`} points={[0, Math.round(j * gridSize) + offsetY, width, Math.round(j * gridSize) + offsetY]}
        stroke={theme.border} strokeWidth={1} opacity={0.5} />
    );
  }
  return <Layer listening={false}>{lines}</Layer>;
};

const BrushCursor = ({ x, y, brushSize, tool }) => {
  if (!tool) return null;
  return <Circle x={x} y={y} radius={brushSize / 2} stroke={tool === 'eraser' ? '#00BFFF' : '#FF4136'} strokeWidth={2} listening={false} dash={[10, 5]} />;
};

const ZoomSlider = ({ scale, onZoomChange, onZoomIn, onZoomOut }) => (
  <ZoomSliderContainer initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
    <button onClick={onZoomIn}><FaPlus /></button>
    <input type="range" min="0.2" max="3" step="0.01" value={scale} onChange={(e) => onZoomChange(parseFloat(e.target.value))} />
    <button onClick={onZoomOut}><FaMinus /></button>
  </ZoomSliderContainer>
);

// --------- principal ---------
export const VTTMap = ({
  activeScene,
  selectedTokenId,
  onTokenSelect,
  onTokenContextMenu,
  activeTurnTokenId,
  fowTool,
  charactersData
}) => {
  const { room, updateRoom, updateTokenPosition, setFogPaths, recordExploration } = useRoom();
  const { currentUser } = useAuth();
  const isMaster = room.masterId === currentUser.uid;
  const theme = useTheme();

  const stageRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isPanningWithSpace, setIsPanningWithSpace] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  const throttleExplore = useRef(
    _.throttle((sceneId, userId, circle) => recordExploration(sceneId, userId, circle), 120, { trailing: true })
  ).current;

  const roomSettings = room.roomSettings || {
    playerVision: true,
    allyVision: true,
    visionRadius: 3.5,
    showGrid: true,
    gridSize: 70,
    gridOffset: { x: 0, y: 0 }
  };
  const gridSize = roomSettings.gridSize || 70;
  const gridOffset = roomSettings.gridOffset || { x: 0, y: 0 };

  const sceneTokens = useMemo(() => {
    if (!Array.isArray(room.tokens) || !activeScene) return [];
    return room.tokens.filter((t) => t.sceneId === activeScene.id);
  }, [room.tokens, activeScene]);

  const allPlayerTokens = useMemo(
    () => sceneTokens.filter((t) => t.type === 'player' && t.isVisible !== false),
    [sceneTokens]
  );

  const viewerVisionTokens = useMemo(() => {
    if (!activeScene) return [];
    if (isMaster) return allPlayerTokens;
    if (roomSettings.allyVision) return allPlayerTokens;
    return allPlayerTokens.filter((t) => t.userId === currentUser.uid);
  }, [activeScene, isMaster, allPlayerTokens, roomSettings.allyVision, currentUser.uid]);

  // FOG DATA
  const sceneFog = room.fogOfWar?.[activeScene?.id] || { fogPaths: [], exploredByUser: {} };
  const fogPaths = sceneFog.fogPaths || [];
  const exploredByUser = sceneFog.exploredByUser || {};
  const hasGlobalReveal = !!(exploredByUser.__all && exploredByUser.__all.length);

  // Explorado visível ao viewer
  const exploredCirclesForViewer = useMemo(() => {
    if (!activeScene) return [];
    if (isMaster) return Object.values(exploredByUser).flat();
    if (roomSettings.playerVision === false) return Object.values(exploredByUser).flat();
    if (roomSettings.allyVision) return Object.values(exploredByUser).flat();
    return exploredByUser[currentUser.uid] || [];
  }, [exploredByUser, activeScene?.id, isMaster, roomSettings.playerVision, roomSettings.allyVision, currentUser.uid]);

  const applyZoom = useCallback((newScale) => {
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stage.scaleX();
    const center = { x: stage.width() / 2, y: stage.height() / 2 };
    const mousePointTo = { x: (center.x - stage.x()) / oldScale, y: (center.y - stage.y()) / oldScale };
    const clamped = Math.max(0.2, Math.min(newScale, 3));
    stage.scale({ x: clamped, y: clamped });
    const newPos = { x: center.x - mousePointTo.x * clamped, y: center.y - mousePointTo.y * clamped };
    stage.position(newPos);
    setScale(clamped);
  }, []);

  useEffect(() => { if (activeScene) setMapSize({ width: 0, height: 0 }); }, [activeScene?.id]);

  // mover token + explorar
// mover token + explorar
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === 'Space') {
      if (!isPanningWithSpace) { e.preventDefault(); setIsPanningWithSpace(true); }
      return;
    }
    if (!e.code.startsWith('Arrow')) return;
    if (!selectedTokenId) return;

    const token = sceneTokens.find((t) => t.tokenId === selectedTokenId);
    if (!token || (token.isImmobilized && !isMaster)) return;
    if (!isMaster && token.userId !== currentUser.uid) return;

    e.preventDefault();
    const step = gridSize;
    let newPos = { x: token.x, y: token.y };
    if (e.key === 'ArrowUp') newPos.y -= step;
    if (e.key === 'ArrowDown') newPos.y += step;
    if (e.key === 'ArrowLeft') newPos.x -= step;
    if (e.key === 'ArrowRight') newPos.x += step;

    updateTokenPosition(selectedTokenId, newPos);

    if (roomSettings.playerVision && token.type === 'player') {
      const centerX = newPos.x + gridSize / 2;
      const centerY = newPos.y + gridSize / 2;
      const radius = gridSize * (roomSettings.visionRadius || 3.5);
      throttleExplore(activeScene.id, token.userId, { x: centerX, y: centerY, radius });
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === 'Space') { e.preventDefault(); setIsPanningWithSpace(false); }
  };

  // ✅ aqui estava o bug: faltava o segundo argumento
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, [
  isPanningWithSpace,
  selectedTokenId,
  sceneTokens,
  isMaster,
  gridSize,
  roomSettings.playerVision,
  roomSettings.visionRadius,
  activeScene?.id,
  currentUser.uid,
  updateTokenPosition,
  throttleExplore
]);


  const handleTokenClick = (e, token) => {
    const own = token.type === 'player' && token.userId === currentUser.uid;
    if (e.evt.button === 2 || e.evt.ctrlKey) { e.evt.preventDefault(); if (isMaster || own) onTokenContextMenu(e, token); return; }
    if (isMaster || own) onTokenSelect(token);
  };

  const getDropPosGrid = (e) => {
    stageRef.current.setPointersPositions(e);
    const pos = stageRef.current.getPointerPosition();
    const stage = stageRef.current;
    const world = {
      x: (pos.x - stage.x()) / stage.scaleX(),
      y: (pos.y - stage.y()) / stage.scaleY(),
    };
    return {
      x: Math.round((world.x - gridOffset.x) / gridSize) * gridSize + gridOffset.x,
      y: Math.round((world.y - gridOffset.y) / gridSize) * gridSize + gridOffset.y,
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!activeScene) return;
    const enemyData = e.dataTransfer.getData('application/vtt-enemy');
    const playerData = e.dataTransfer.getData('application/vtt-player-character');
    const currentTokens = room.tokens || [];
    const { x, y } = getDropPosGrid(e);

    if (enemyData) {
      const enemy = JSON.parse(enemyData);
      const newToken = {
        tokenId: `enemy-${uuidv4()}`,
        grimoireId: enemy.id,
        name: enemy.name,
        imageUrl: getTokenImageUrl(enemy.imageUrl) || `https://api.dicebear.com/8.x/bottts/svg?seed=${enemy.name}`,
        type: 'enemy',
        sceneId: activeScene.id,
        x, y,
        color: '#e74c3c',
        isVisible: true,
        isDead: false,
        isImmobilized: false,
        isKnockedOut: false,
        pv_current: enemy.pv,
        pv_max: enemy.pv,
        pm_current: enemy.pm,
        pm_max: enemy.pm,
        pa_current: enemy.pa,
        pa_max: enemy.pa,
        attributes: enemy.attributes,
      };
      updateRoom({ tokens: [...currentTokens, newToken] });
    } else if (playerData) {
      const playerLink = JSON.parse(playerData);
      if (currentTokens.some((t) => t.tokenId === playerLink.characterId && t.sceneId === activeScene.id)) {
        return toast.info(`${playerLink.characterName} já está nesta cena.`);
      }
      const fullChar = charactersData[playerLink.characterId];
      if (!fullChar) { toast.error(`Dados da ficha de ${playerLink.characterName} ainda não carregaram.`); return; }
      const { poder = 0, habilidade = 0, resistencia = 0 } = fullChar.attributes || {};
      const pv_max = resistencia * 5 || 1;
      const pm_max = habilidade * 5 || 1;
      const pa_max = poder || 1;
      const newToken = {
        tokenId: playerLink.characterId,
        userId: playerLink.userId,
        name: playerLink.characterName,
        imageUrl: getTokenImageUrl(playerLink.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${playerLink.characterName}`,
        type: 'player',
        sceneId: activeScene.id,
        x, y,
        color: '#3498db',
        isVisible: true,
        isDead: false,
        isImmobilized: false,
        isKnockedOut: false,
        pv_current: fullChar.pv_current ?? pv_max,
        pv_max,
        pm_current: fullChar.pm_current ?? pm_max,
        pm_max,
        pa_current: fullChar.pa_current ?? pa_max,
        pa_max,
        attributes: fullChar.attributes,
      };
      updateRoom({ tokens: [...currentTokens, newToken] });

      if (roomSettings.playerVision) {
        const centerX = x + gridSize / 2;
        const centerY = y + gridSize / 2;
        const radius = gridSize * (roomSettings.visionRadius || 3.5);
        throttleExplore(activeScene.id, playerLink.userId, { x: centerX, y: centerY, radius });
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleStageClick = (e) => { if (e.target === e.target.getStage()) onTokenSelect(null); };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = stageRef.current;
    const old = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const mousePoint = { x: (pointer.x - stage.x()) / old, y: (pointer.y - stage.y()) / old };
    const next = Math.max(0.2, Math.min(e.evt.deltaY > 0 ? old / scaleBy : old * scaleBy, 3));
    setScale(next);
    stage.scale({ x: next, y: next });
    stage.position({ x: pointer.x - mousePoint.x * next, y: pointer.y - mousePoint.y * next });
  };

  // Pintura FOW (mestre)
  const [fowDrawing, setFowDrawing] = useState(null);
  const handleMouseDown = (e) => {
    if (!isMaster || !activeScene || e.target !== e.target.getStage() || !fowTool || isPanningWithSpace) return;
    setIsDrawing(true);
    const pos = e.target.getRelativePointerPosition();
    setFowDrawing({ points: [pos.x, pos.y], brushSize: fowTool.brushSize, isEraser: fowTool.tool === 'eraser' });
  };
  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getRelativePointerPosition();
      setCursorPos(pos);
      if (!isDrawing || !isMaster || !activeScene || isPanningWithSpace) return;
      setFowDrawing((prev) => ({ ...prev, points: prev.points.concat([pos.x, pos.y]) }));
      stage.batchDraw();
    }
  };
  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const current = (room.fogOfWar?.[activeScene.id]?.fogPaths || []);
    setFogPaths(activeScene.id, [...current, fowDrawing]);
    setFowDrawing(null);
  };

  const onDragEndWithExplore = (tokenId, newPos, tokenData) => {
    updateTokenPosition(tokenId, newPos);
    if (roomSettings.playerVision && tokenData?.type === 'player') {
      const centerX = newPos.x + gridSize / 2;
      const centerY = newPos.y + gridSize / 2;
      const radius = gridSize * (roomSettings.visionRadius || 3.5);
      throttleExplore(activeScene.id, tokenData.userId, { x: centerX, y: centerY, radius });
    }
  };

  const visibleTokens = isMaster ? sceneTokens : sceneTokens.filter((t) => t.isVisible !== false || t.userId === currentUser.uid);
  const canDragNow = (isPanningWithSpace || !fowTool) && !isDrawing;

  // Fontes de visão (revelação/allyVision)
  const visionSources = useMemo(() => {
    const players = roomSettings.allyVision
      ? sceneTokens.filter(t => t.type === 'player' && t.isVisible !== false)
      : sceneTokens.filter(t => t.type === 'player' && t.userId === currentUser.uid && t.isVisible !== false);

    return players.map(t => ({
      x: t.x + gridSize / 2,
      y: t.y + gridSize / 2,
      radius: gridSize * (roomSettings.visionRadius || 3.5),
    }));
  }, [sceneTokens, roomSettings.allyVision, currentUser.uid, gridSize, roomSettings.visionRadius]);

  // Tokens do próprio player por cima
  const ownPlayerTokens = useMemo(
    () => sceneTokens.filter((t) => t.type === 'player' && t.userId === currentUser.uid),
    [sceneTokens, currentUser.uid]
  );

  return (
    <MapContainer onDrop={handleDrop} onDragOver={handleDragOver} tabIndex={1} ref={mapContainerRef}>
      <Stage
        width={mapContainerRef.current?.clientWidth || window.innerWidth - 280}
        height={mapContainerRef.current?.clientHeight || window.innerHeight}
        onWheel={handleWheel}
        draggable={canDragNow}
        onClick={handleStageClick}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => e.evt.preventDefault()}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer><SceneBackground imageUrl={activeScene?.imageUrl} onLoad={setMapSize} /></Layer>

        {roomSettings.showGrid && mapSize.width > 0 && (
          <GridLayer width={mapSize.width} height={mapSize.height} gridSize={gridSize} offset={gridOffset} theme={theme} />
        )}

        {/* Tokens (todos) */}
        <Layer>
          {visibleTokens.map((token) => {
            const canDrag = isMaster || (token.userId === currentUser.uid && !token.isImmobilized);
            return (
              <Token
                key={token.tokenId}
                tokenData={token}
                onDragEnd={onDragEndWithExplore}
                onClick={(e) => handleTokenClick(e, token)}
                onContextMenu={(e) => handleTokenClick(e, token)}
                isDraggable={canDrag}
                isMaster={isMaster}
                isSelected={token.tokenId === selectedTokenId}
                isTurn={token.tokenId === activeTurnTokenId}
                theme={theme}
                gridSize={gridSize}
                gridOffset={gridOffset}
              />
            );
          })}
        </Layer>

        {/* PLAYER: tudo no MESMO layer (raio 100% claro) */}
        {!isMaster && (
          <PlayerFogLayer
            exploredCircles={exploredCirclesForViewer}
            visionSources={roomSettings.playerVision ? visionSources : []}
            mapSize={mapSize}
            fogPaths={fogPaths}
            livePath={isDrawing ? fowDrawing : null}
            globalReveal={hasGlobalReveal}
          />
        )}

        {/* Tokens do PRÓPRIO player por cima de tudo */}
        {!isMaster && ownPlayerTokens.length > 0 && (
          <Layer>
            {ownPlayerTokens.map((token) => {
              const canDrag = !token.isImmobilized;
              return (
                <Token
                  key={`own-${token.tokenId}`}
                  tokenData={token}
                  onDragEnd={onDragEndWithExplore}
                  onClick={(e) => handleTokenClick(e, token)}
                  onContextMenu={(e) => handleTokenClick(e, token)}
                  isDraggable={canDrag}
                  isMaster={false}
                  isSelected={token.tokenId === selectedTokenId}
                  isTurn={token.tokenId === activeTurnTokenId}
                  theme={theme}
                  gridSize={gridSize}
                  gridOffset={gridOffset}
                />
              );
            })}
          </Layer>
        )}

        {/* MESTRE */}
        {isMaster && (
          <>
            <MasterPermanentFogLayer
              exploredCircles={exploredCirclesForViewer}
              mapSize={mapSize}
              fogPaths={fogPaths}
              livePath={isDrawing ? fowDrawing : null}
              globalReveal={hasGlobalReveal}
            />
            {roomSettings.playerVision && visionSources.length > 0 && (
              <MasterVisionMarkersLayer sources={visionSources} />
            )}
          </>
        )}

        {isMaster && fowTool && !isPanningWithSpace && (
          <Layer listening={false}>
            <BrushCursor x={cursorPos.x} y={cursorPos.y} brushSize={fowTool.brushSize} tool={fowTool.tool} />
          </Layer>
        )}
      </Stage>

      <ZoomSliderContainer as={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
        <button onClick={() => setScale((s) => Math.min(3, s * 1.2))}><FaPlus /></button>
        <input type="range" min="0.2" max="3" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
        <button onClick={() => setScale((s) => Math.max(0.2, s / 1.2))}><FaMinus /></button>
      </ZoomSliderContainer>
    </MapContainer>
  );
};
