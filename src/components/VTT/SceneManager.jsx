// src/components/VTT/SceneManager.jsx
import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SceneList, SceneItem, SceneForm } from './styles';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export const SceneManager = () => {
    const { room, updateRoom } = useRoom();
    const [newSceneName, setNewSceneName] = useState('');
    const [newSceneUrl, setNewSceneUrl] = useState('');

    const handleAddScene = () => {
        if (!newSceneName.trim() || !newSceneUrl.trim()) {
            return toast.error("Nome da cena e URL da imagem são obrigatórios.");
        }
        
        const newScene = { id: uuidv4(), name: newSceneName.trim(), imageUrl: newSceneUrl.trim() };
        
        // CORREÇÃO CRÍTICA: Garante que 'scenes' seja sempre um array.
        // Se 'room.scenes' não existir ou não for um array, ele inicia um novo array com a cena.
        const currentScenes = Array.isArray(room.scenes) ? room.scenes : [];
        const updatedScenes = [...currentScenes, newScene];
        
        updateRoom({ scenes: updatedScenes });
        
        toast.success(`Cena "${newScene.name}" adicionada!`);
        setNewSceneName('');
        setNewSceneUrl('');
    };
    
    const handleSetActive = (sceneId) => {
        updateRoom({ activeSceneId: sceneId });
    };

    const handleDeleteScene = (sceneId) => {
        const updatedScenes = (room.scenes || []).filter(s => s.id !== sceneId);
        const updateData = { scenes: updatedScenes };

        // Se a cena deletada era a ativa, desativa a cena.
        if (room.activeSceneId === sceneId) {
            updateData.activeSceneId = null;
        }

        updateRoom(updateData);
        toast.error("Cena removida.");
    };

    return (
        <div>
            <SceneList>
                {(room.scenes && Array.isArray(room.scenes) && room.scenes.length > 0) ? room.scenes.map(scene => (
                    <SceneItem key={scene.id} $isActive={scene.id === room.activeSceneId}>
                        <span>{scene.name}</span>
                        <div>
                            <button onClick={() => handleSetActive(scene.id)} disabled={scene.id === room.activeSceneId}>
                                {scene.id === room.activeSceneId ? 'Ativa' : 'Ativar'}
                            </button>
                            <button onClick={() => handleDeleteScene(scene.id)} style={{ color: '#F44336', marginLeft: '0.5rem' }}>
                                Lixo
                            </button>
                        </div>
                    </SceneItem>
                )) : <p>Nenhuma cena criada.</p>}
            </SceneList>
            
            <SceneForm>
                <input value={newSceneName} onChange={e => setNewSceneName(e.target.value)} placeholder="Nome da Cena" />
                <input value={newSceneUrl} onChange={e => setNewSceneUrl(e.target.value)} placeholder="URL da Imagem do Mapa" />
                <button onClick={handleAddScene}>+ Adicionar Cena</button>
            </SceneForm>
        </div>
    );
};