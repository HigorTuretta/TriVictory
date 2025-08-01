// src/components/VTT/VTTMap.jsx
import React, { useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text } from 'react-konva';
import useImage from 'use-image';
import { MapContainer } from './styles';
import { useRoom } from '../../contexts/RoomContext';
import { v4 as uuidv4 } from 'uuid';

const SceneBackground = ({ imageUrl }) => {
    const [img] = useImage(imageUrl, 'anonymous');
    return <KonvaImage image={img} x={0} y={0} />;
};

const Token = ({ tokenData, onDragEnd, gridSize }) => {
    const [img] = useImage(tokenData.imageUrl, 'anonymous');
    const shapeRef = useRef();

    const handleDragEnd = (e) => {
        const newPos = {
            x: Math.round(e.target.x() / gridSize) * gridSize,
            y: Math.round(e.target.y() / gridSize) * gridSize,
        };
        e.target.position(newPos);
        onDragEnd(tokenData.id, newPos);
    };

    return (
        <>
            <Circle
                ref={shapeRef}
                x={tokenData.x + gridSize / 2}
                y={tokenData.y + gridSize / 2}
                radius={gridSize / 2}
                fillPatternImage={img}
                fillPatternScaleX={gridSize / (img?.width || gridSize)}
                fillPatternScaleY={gridSize / (img?.height || gridSize)}
                draggable
                onDragEnd={handleDragEnd}
                stroke={tokenData.color || 'white'}
                strokeWidth={4}
            />
            <Text
                text={tokenData.name}
                x={tokenData.x - (gridSize / 2)}
                y={tokenData.y + gridSize + 5}
                width={gridSize * 2}
                align="center"
                fill="white"
                fontSize={14}
                fontStyle="bold"
                shadowColor="black"
                shadowBlur={5}
                shadowOffsetX={1}
                shadowOffsetY={1}
            />
        </>
    );
};

export const VTTMap = ({ activeScene }) => {
    const { room, updateRoom } = useRoom();
    const stageRef = useRef(null);
    const mapContainerRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        
        const enemyDataString = e.dataTransfer.getData('application/vtt-enemy');
        if (enemyDataString && activeScene) {
            const enemy = JSON.parse(enemyDataString);
            const position = stageRef.current.getPointerPosition();
            
            const gridSize = 70;
            const stage = stageRef.current;
            const x = Math.round((position.x - stage.x()) / stage.scaleX() / gridSize) * gridSize;
            const y = Math.round((position.y - stage.y()) / stage.scaleY() / gridSize) * gridSize;
            
            const sameNameCount = room.tokens.filter(t => t.baseName === enemy.name && t.sceneId === activeScene.id).length;
            const tokenName = sameNameCount > 0 ? `${enemy.name} ${sameNameCount + 1}` : enemy.name;

            const newToken = {
                id: uuidv4(),
                sceneId: activeScene.id,
                baseName: enemy.name,
                name: tokenName,
                imageUrl: enemy.imageUrl,
                x, y,
                color: '#FF3B30', // Cor padrão para inimigos
                ...enemy, // Traz todos os dados do inimigo
            };
            
            updateRoom({ tokens: [...room.tokens, newToken] });
        }
    };
    
    const handleDragOver = (e) => e.preventDefault();
    const handleStageDragEnd = () => {};
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
        const newTokens = room.tokens.map(t => t.id === tokenId ? { ...t, ...newPos } : t);
        updateRoom({ tokens: newTokens });
    };

    return (
        <MapContainer ref={mapContainerRef} onDrop={handleDrop} onDragOver={handleDragOver}>
            <Stage
                width={mapContainerRef.current?.clientWidth || window.innerWidth - 280}
                height={mapContainerRef.current?.clientHeight || window.innerHeight}
                onWheel={handleWheel}
                draggable
                onDragEnd={handleStageDragEnd}
                ref={stageRef}
            >
                <Layer>
                    {activeScene?.imageUrl && <SceneBackground imageUrl={activeScene.imageUrl} />}
                    {room.tokens.filter(t => t.sceneId === activeScene?.id).map(token => (
                        <Token key={token.id} tokenData={token} onDragEnd={updateTokenPosition} gridSize={70} />
                    ))}
                </Layer>
            </Stage>
        </MapContainer>
    );
};