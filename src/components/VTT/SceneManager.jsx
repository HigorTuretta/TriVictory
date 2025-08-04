// src/components/VTT/SceneManager.jsx
import React, { useState, useRef } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { SceneList, SceneItem, SceneForm } from './styles';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { uploadImage } from '../../services/cloudinaryService';

export const SceneManager = () => {
    const { room, updateRoom } = useRoom();
    const [newSceneName, setNewSceneName] = useState('');
    const [newSceneUrl, setNewSceneUrl] = useState('');
    const [newSceneFile, setNewSceneFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleAddScene = async () => {
        if (!newSceneName.trim()) {
            return toast.error("O nome da cena é obrigatório.");
        }
        if (!newSceneUrl.trim() && !newSceneFile) {
            return toast.error("Forneça uma URL ou uma imagem para a cena.");
        }

        setIsUploading(true);
        let finalImageUrl = newSceneUrl;

        try {
            if (newSceneFile) {
                const uploadResult = await uploadImage(newSceneFile);
                finalImageUrl = uploadResult.secure_url; // Usamos a URL segura retornada
            }

            const newScene = { id: uuidv4(), name: newSceneName.trim(), imageUrl: finalImageUrl.trim() };
            const currentScenes = Array.isArray(room.scenes) ? room.scenes : [];
            const updatedScenes = [...currentScenes, newScene];
            
            updateRoom({ scenes: updatedScenes });
            
            toast.success(`Cena "${newScene.name}" adicionada!`);
            setNewSceneName('');
            setNewSceneUrl('');
            setNewSceneFile(null);
            if (fileInputRef.current) fileInputRef.current.value = null; // Limpa o input do arquivo
        } catch (error) {
            toast.error(error.message || "Falha ao enviar a imagem da cena.");
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleSetActive = (sceneId) => {
        updateRoom({ activeSceneId: sceneId });
    };

    const handleDeleteScene = (sceneId) => {
        const updatedScenes = (room.scenes || []).filter(s => s.id !== sceneId);
        const updateData = { scenes: updatedScenes };

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
                <input value={newSceneUrl} onChange={e => setNewSceneUrl(e.target.value)} placeholder="Cole a URL da Imagem do Mapa" disabled={!!newSceneFile} />
                
                <label htmlFor="scene-file-upload" style={{textAlign: 'center', margin: '0.5rem 0', fontWeight: 'bold' }}>OU</label>
                
                <input 
                    id="scene-file-upload"
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                        setNewSceneFile(e.target.files[0]);
                        setNewSceneUrl(''); // Limpa a URL se um arquivo for selecionado
                    }} 
                />

                <button onClick={handleAddScene} disabled={isUploading}>
                    {isUploading ? 'Enviando...' : '+ Adicionar Cena'}
                </button>
            </SceneForm>
        </div>
    );
};