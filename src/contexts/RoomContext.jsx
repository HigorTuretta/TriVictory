import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const debouncedUpdate = useCallback(
    _.debounce((data) => {
      if (!roomId) return;
      const roomRef = doc(db, 'rooms', roomId);
      updateDoc(roomRef, data).catch(() => toast.error('Falha na sincronização.'));
    }, 500),
    [roomId]
  );

  useEffect(() => {
    if (!roomId || !currentUser?.uid) {
      setLoading(false);
      return;
    }
    const roomRef = doc(db, 'rooms', roomId);
    const unsub = onSnapshot(roomRef, (snap) => {
      if (!snap.exists()) {
        toast.error('Sala não encontrada.');
        return navigate('/rooms');
      }
      const data = snap.data();

      const validated = {
        scenes: [],
        tokens: [],
        initiative: { order: [], currentIndex: -1, isRunning: false },
        fogOfWar: {},
        roomSettings: {
          playerVision: true,
          allyVision: true,
          visionRadius: 3.5,
          showGrid: true,
          gridSize: 70,
          gridOffset: { x: 0, y: 0 },
          ...(data.roomSettings || {}),
        },
        ...data,
      };

      // garantir estrutura FOW por cena
      const fog = { ...(validated.fogOfWar || {}) };
      (validated.scenes || []).forEach((s) => {
        const prev = fog[s.id] || {};
        fog[s.id] = {
          fogPaths: prev.fogPaths || [],
          exploredByUser: prev.exploredByUser || {}, // { [userId]: [{x,y,radius}] }
        };
      });

      setRoom({ id: snap.id, ...validated, fogOfWar: fog });
      setLoading(false);
    });

    return () => unsub();
  }, [roomId, currentUser, navigate]);

  const updateRoom = (updateData) => {
    setRoom((prev) => ({ ...prev, ...updateData }));
    debouncedUpdate(updateData);
  };

  // Atualiza posição imediatamente (sem debounce) para evitar "snap back"
  const updateTokenPosition = (tokenId, newPos) => {
    setRoom((prev) => {
      const updated = (prev.tokens || []).map((t) =>
        t.tokenId === tokenId ? { ...t, ...newPos } : t
      );
      if (roomId) {
        const roomRef = doc(db, 'rooms', roomId);
        updateDoc(roomRef, { tokens: updated }).catch(() => {
          toast.error('Não foi possível salvar o movimento.');
        });
      }
      return { ...prev, tokens: updated };
    });
  };

  const setFogPaths = (activeSceneId, paths) => {
    if (!activeSceneId) return;
    const newFog = {
      ...room.fogOfWar,
      [activeSceneId]: {
        ...(room.fogOfWar?.[activeSceneId] || {}),
        fogPaths: paths,
        exploredByUser: (room.fogOfWar?.[activeSceneId]?.exploredByUser) || {},
      },
    };
    updateRoom({ fogOfWar: newFog });
  };

  // >>> PERSISTÊNCIA IMEDIATA DA EXPLORAÇÃO <<<
  const recordExploration = (sceneId, userId, circle) => {
    if (!sceneId || !userId) return;
    setRoom((prev) => {
      const sceneFogPrev = prev.fogOfWar?.[sceneId] || {};
      const exploredByUserPrev = sceneFogPrev.exploredByUser || {};
      const prevArr = exploredByUserPrev[userId] || [];
      const MAX = 800; // mais folgado
      const trimmed = prevArr.length >= MAX ? prevArr.slice(prevArr.length - (MAX - 1)) : prevArr;
      const exploredByUser = { ...exploredByUserPrev, [userId]: [...trimmed, circle] };

      const fogOfWar = {
        ...(prev.fogOfWar || {}),
        [sceneId]: {
          fogPaths: sceneFogPrev.fogPaths || [],
          exploredByUser,
        },
      };

      // escreve JÁ no Firestore para não perder no snapshot seguinte
      if (roomId) {
        const roomRef = doc(db, 'rooms', roomId);
        updateDoc(roomRef, { fogOfWar }).catch(() => {
          // não trava a UI; já está no estado local
        });
      }

      return { ...prev, fogOfWar };
    });
  };

  const addToInitiative = (entity, roll) => {
    const order = room.initiative?.order || [];
    if (order.some((i) => i.tokenId === entity.tokenId)) {
      return toast.error(`"${entity.name}" já está na iniciativa.`);
    }
    const item = { id: uuidv4(), tokenId: entity.tokenId, name: entity.name, type: entity.type, initiative: roll };
    const newOrder = [...order, item].sort((a, b) => b.initiative - a.initiative);
    updateRoom({ initiative: { ...room.initiative, order: newOrder, isRunning: true } });
  };
  
  const addPing = useCallback((position) => {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);

    const newPing = {
      id: uuidv4(), // ID único para evitar re-trigger
      x: position.x,
      y: position.y,
      senderId: currentUser.uid,
    };

    // Atualiza apenas o campo 'latestPing' para servir como um gatilho
    updateDoc(roomRef, { latestPing: newPing });

  }, [roomId, currentUser?.uid]);

  return (
    <RoomContext.Provider
      value={{
        room,
        loading,
        roomId,
        updateRoom,
        updateTokenPosition,
        setFogPaths,
        recordExploration,
        addToInitiative,
        addPing,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error('useRoom deve ser usado dentro de um RoomProvider');
  return ctx;
};
