import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SceneList, SceneItem } from './styles';
import { v4 as uuidv4 } from 'uuid';

export const SceneManager = () => {
    const { room, updateRoom } = useRoom();
    const [newSceneName, setNewSceneName] = useState('');
    const [newSceneUrl, setNewSceneUrl] = useState('');

    const handleAddScene = () => {
        if (!newSceneName.trim() || !newSceneUrl.trim()) return;
        const newScene = { id: uuidv4(), name: newSceneName, imageUrl: newSceneUrl };
        updateRoom({ scenes: [...room.scenes, newScene] });
        setNewSceneName('');
        setNewSceneUrl('');
    };
    
    const handleSetActive = (sceneId) => {
        updateRoom({ activeSceneId: sceneId });
    };

    return (
        <div>
            <SceneList>
                {room.scenes.map(scene => (
                    <SceneItem key={scene.id} $isActive={scene.id === room.activeSceneId}>
                        <span>{scene.name}</span>
                        <button onClick={() => handleSetActive(scene.id)} disabled={scene.id === room.activeSceneId}>
                            {scene.id === room.activeSceneId ? 'Ativa' : 'Ativar'}
                        </button>
                    </SceneItem>
                ))}
            </SceneList>
            <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                <input value={newSceneName} onChange={e => setNewSceneName(e.target.value)} placeholder="Nome da Cena" />
                <input value={newSceneUrl} onChange={e => setNewSceneUrl(e.target.value)} placeholder="URL da Imagem do Mapa" />
                <button onClick={handleAddScene}>+ Adicionar Cena</button>
            </div>
        </div>
    );
};