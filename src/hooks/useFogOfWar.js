// src/hooks/useFogOfWar.js
import { useCallback, useMemo } from 'react';
import { useRoom } from '../contexts/RoomContext';
import toast from 'react-hot-toast';
import _ from 'lodash';

export const useFogOfWar = (activeSceneId) => {
    const { room, updateRoom } = useRoom();

    const fogState = useMemo(() => {
        return room.fogOfWar?.[activeSceneId] || { fogPaths: [] };
    }, [room.fogOfWar, activeSceneId]);

    const debouncedUpdateFog = useCallback(_.debounce((newFogData) => {
        if (!activeSceneId) return;
        const newFogOfWarState = { ...room.fogOfWar, [activeSceneId]: newFogData };
        updateRoom({ fogOfWar: newFogOfWarState });
    }, 500), [activeSceneId, room.fogOfWar, updateRoom]);

    const setFogPaths = useCallback((paths) => {
        debouncedUpdateFog({ ...fogState, fogPaths: paths });
    }, [fogState, debouncedUpdateFog]);

    const fillAll = useCallback(() => {
        // "Cobrir tudo" significa remover todos os caminhos revelados.
        setFogPaths([]);
        toast.success("Mapa totalmente coberto.");
    }, [setFogPaths]);

    const clearAll = useCallback(() => {
        // CORREÇÃO FINAL: Cria um segmento de linha válido (de um ponto a outro)
        // e aplica um brushSize gigante para apagar toda a área.
        const revealPath = { 
            points: [2500, 2500, 2501, 2501], // Linha minúscula no centro do mapa.
            brushSize: 10000,                  // Pincel gigante que cobre tudo.
            isEraser: true                     // Essencial para apagar.
        };
        setFogPaths([revealPath]);
        toast.error("Névoa de guerra totalmente revelada.");
    }, [setFogPaths]);

    return {
        fogPaths: fogState.fogPaths || [],
        setFogPaths,
        fillAll,
        clearAll,
    };
};