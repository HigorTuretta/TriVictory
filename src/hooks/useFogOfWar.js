// src/hooks/useFogOfWar.js
import { useCallback, useMemo } from 'react';
import { useRoom } from '../contexts/RoomContext';
import toast from 'react-hot-toast';
import _ from 'lodash';

export const useFogOfWar = (activeSceneId) => {
    const { room, updateRoom } = useRoom();

    const fogState = useMemo(() => {
        // Agora só precisamos dos fogPaths
        return room.fogOfWar?.[activeSceneId] || { fogPaths: [] };
    }, [room.fogOfWar, activeSceneId]);

    const debouncedUpdateFog = useCallback(_.debounce((newFogData) => {
        if (!activeSceneId) return;
        const newFogOfWarState = { ...room.fogOfWar, [activeSceneId]: newFogData };
        updateRoom({ fogOfWar: newFogOfWarState });
    }, 500), [activeSceneId, room.fogOfWar, updateRoom]);

    const setFogPaths = useCallback((paths) => {
        const sanitizedPaths = paths.map(p => ({
            points: p.points,
            brushSize: p.brushSize,
            isEraser: p.isEraser,
        }));
        debouncedUpdateFog({ ...fogState, fogPaths: sanitizedPaths });
    }, [fogState, debouncedUpdateFog]);

    const fillAll = useCallback(() => {
        const fillPath = { points: [0, 0, 5000, 0, 5000, 5000, 0, 5000], isEraser: false };
        // Atualiza diretamente para uma resposta mais rápida
        updateRoom({ fogOfWar: { ...room.fogOfWar, [activeSceneId]: { fogPaths: [fillPath] } } });
        toast.success("Mapa totalmente coberto.");
    }, [activeSceneId, room.fogOfWar, updateRoom]);

    const clearAll = useCallback(() => {
        updateRoom({ fogOfWar: { ...room.fogOfWar, [activeSceneId]: { fogPaths: [] } } });
        toast.error("Névoa de guerra totalmente revelada.");
    }, [activeSceneId, room.fogOfWar, updateRoom]);

    return {
        fogPaths: fogState.fogPaths || [],
        setFogPaths,
        fillAll,
        clearAll,
    };
};