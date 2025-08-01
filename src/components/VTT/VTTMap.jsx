import React, { useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Line, Circle, Text } from 'react-konva';
import useImage from 'use-image';
import { MapContainer } from './styles';
import { useRoom } from '../../contexts/RoomContext';

const SceneBackground = ({ imageUrl }) => {
    const [img] = useImage(imageUrl, 'anonymous');
    return <KonvaImage image={img} x={0} y={0} />;
};

const Token = ({ tokenData, onDragEnd, gridSize }) => {
    const [img] = useImage(tokenData.imageUrl, 'anonymous');

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
                x={tokenData.x + gridSize / 2} y={tokenData.y + gridSize / 2}
                radius={gridSize / 2} fillPatternImage={img} fillPatternScale={{ x: 0.5, y: 0.5 }}
                draggable onDragEnd={handleDragEnd}
                stroke={tokenData.color || 'white'} strokeWidth={4}
            />
            <Text
                text={tokenData.name} x={tokenData.x} y={tokenData.y + gridSize + 5}
                width={gridSize} align="center" fill="white" fontSize={12}
            />
        </>
    );
};


export const VTTMap = ({ activeScene }) => {
    const { room, updateRoom } = useRoom();
    const stageRef = useRef(null);

    const handleStageDragEnd = (e) => {
        // A biblioteca já mantém a posição visual, não precisamos de estado para o pan.
        // O handler está aqui apenas para satisfazer o aviso do react-konva.
    };
    
    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        stage.scale({ x: newScale, y: newScale });
        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
    };
    
    const updateTokenPosition = (tokenId, newPos) => {
        const newTokens = room.tokens.map(t => t.id === tokenId ? { ...t, ...newPos } : t);
        updateRoom({ tokens: newTokens });
    };

    return (
        <MapContainer>
            <Stage
                width={window.innerWidth - 280}
                height={window.innerHeight}
                onWheel={handleWheel}
                draggable
                onDragEnd={handleStageDragEnd} // CORREÇÃO: Handler adicionado
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