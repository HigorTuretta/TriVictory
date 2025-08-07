// src/hooks/usePlayerVision.js
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';

/**
 * Hook para determinar quais fontes de visão (tokens) um jogador pode ver.
 * @returns {Array} A lista de tokens que servem como fonte de visão para o jogador atual.
 */
export const usePlayerVision = () => {
    const { room } = useRoom();
    const { currentUser } = useAuth();
    
    const sceneTokens = useMemo(() => {
        if (!Array.isArray(room?.tokens) || !room?.activeSceneId) return [];
        return room.tokens.filter(t => t.sceneId === room.activeSceneId);
    }, [room?.tokens, room?.activeSceneId]);

    const visionSources = useMemo(() => {
        const settings = room?.roomSettings || { playerVision: false, alliedVision: false };

        if (!settings.playerVision) return [];

        const allPlayerTokens = sceneTokens.filter(t => t.type === 'player' && t.isVisible !== false);

        if (settings.alliedVision) {
            return allPlayerTokens; // Retorna todos os tokens de jogador visíveis
        } else {
            // Retorna apenas o token do próprio jogador logado
            return allPlayerTokens.filter(t => t.userId === currentUser.uid);
        }

    }, [sceneTokens, room?.roomSettings, currentUser?.uid]);

    return visionSources;
};