import React from 'react';
import { RoomProvider } from '../../contexts/RoomContext';
import { GameRoomUI } from './GameRoomUI';
import { GameRoomContainer } from './styles';

// Componente Wrapper com o Provider
export const GameRoom = () => {
    return (
        <GameRoomContainer>
            <RoomProvider>
                <GameRoomUI />
            </RoomProvider>
        </GameRoomContainer>
    );
};