// src/hooks/useFogOfWar.js
import { useCallback, useMemo } from 'react';
import { useRoom } from '../contexts/RoomContext';
import toast from 'react-hot-toast';
import _ from 'lodash';

/**
 * Atualizado para que "Cobrir tudo" e "Revelar tudo" afetem também a área explorada:
 *  - fillAll(): limpa exploredByUser (nada explorado)
 *  - clearAll(): escreve um círculo gigante em exploredByUser.__all (tudo explorado)
 *
 * Observação: mantive o comportamento de fogPaths para compatibilidade com o desenho do mestre.
 */
export const useFogOfWar = (activeSceneId) => {
  const { room, updateRoom } = useRoom();

  const fogState = useMemo(() => {
    return room.fogOfWar?.[activeSceneId] || { fogPaths: [], exploredByUser: {} };
  }, [room.fogOfWar, activeSceneId]);

  const debouncedUpdateFog = useCallback(
    _.debounce((newFogData) => {
      if (!activeSceneId) return;
      const newFogOfWarState = { ...room.fogOfWar, [activeSceneId]: newFogData };
      updateRoom({ fogOfWar: newFogOfWarState });
    }, 500),
    [activeSceneId, room.fogOfWar, updateRoom]
  );

  const setFogPaths = useCallback(
    (paths) => {
      debouncedUpdateFog({ ...fogState, fogPaths: paths, exploredByUser: fogState.exploredByUser || {} });
    },
    [fogState, debouncedUpdateFog]
  );

  // "Cobrir tudo": limpa exploração persistente da cena e zera os paths revelados pelo pincel.
  const fillAll = useCallback(() => {
    if (!activeSceneId) return;
    const newFogData = {
      fogPaths: [],               // opcional: zera os caminhos (mestre cobre tudo)
      exploredByUser: {},         // nada explorado
    };
    const newFogOfWarState = { ...room.fogOfWar, [activeSceneId]: newFogData };
    updateRoom({ fogOfWar: newFogOfWarState });
    toast.success('Mapa totalmente coberto.');
  }, [activeSceneId, room.fogOfWar, updateRoom]);

  // "Revelar tudo": cria um círculo gigante em exploredByUser.__all (tudo vira explorado esmaecido para players).
  const clearAll = useCallback(() => {
    if (!activeSceneId) return;
    // círculo absurdo que cobre qualquer mapa
    const huge = { x: 0, y: 0, radius: 999999 };
    const newFogData = {
      fogPaths: fogState.fogPaths || [],
      exploredByUser: { __all: [huge] },
    };
    const newFogOfWarState = { ...room.fogOfWar, [activeSceneId]: newFogData };
    updateRoom({ fogOfWar: newFogOfWarState });
    toast.error('Névoa de guerra totalmente revelada.');
  }, [activeSceneId, room.fogOfWar, updateRoom, fogState.fogPaths]);

  return {
    fogPaths: fogState.fogPaths || [],
    setFogPaths,
    fillAll,   // "Cobrir tudo"
    clearAll,  // "Revelar tudo"
  };
};
