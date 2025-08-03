// src/components/VTT/JukeboxManager.jsx
import React, { useState, useCallback } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { uploadAudio } from '../../services/cloudinaryService';
import _ from 'lodash';
import { FaPlay, FaPause, FaTrash, FaUndo, FaRedo } from 'react-icons/fa';
import { JukeboxContainer, TrackList, TrackItem, TrackInfo, TrackControls, JukeboxForm } from './styles';

export const JukeboxManager = ({ activeSceneId }) => {
    const { room, updateRoom } = useRoom();
    const [formState, setFormState] = useState({ name: '', url: '', file: null });
    const [isUploading, setIsUploading] = useState(false);

    const playlist = (activeSceneId && room.jukebox?.[activeSceneId]) || [];

    const updatePlaylist = (newPlaylist) => {
        const newJukeboxState = {
            ...room.jukebox,
            [activeSceneId]: newPlaylist
        };
        updateRoom({ jukebox: newJukeboxState });
    };

    const debouncedUpdatePlaylist = useCallback(_.debounce(updatePlaylist, 200), [activeSceneId, room.jukebox, updateRoom]);

    const handleAddTrack = async () => {
        if (!activeSceneId) return toast.error("Selecione uma cena primeiro.");
        if (playlist.length >= 5) return toast.error("Cada cena pode ter no máximo 5 faixas de áudio.");
        if (!formState.name.trim()) return toast.error("O nome da faixa é obrigatório.");
        if (!formState.url.trim() && !formState.file) return toast.error("Forneça uma URL ou um arquivo de áudio.");

        let trackUrl = formState.url;
        setIsUploading(true);

        try {
            if (formState.file) {
                const result = await uploadAudio(formState.file);
                trackUrl = result.secure_url;
            }

            const newTrack = {
                id: uuidv4(),
                name: formState.name,
                url: trackUrl,
                isPlaying: false,
                volume: 0.5,
                loop: false,
            };

            updatePlaylist([...playlist, newTrack]);
            setFormState({ name: '', url: '', file: null });
        } catch (error) {
            toast.error(error.message || "Falha ao adicionar áudio.");
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleControlClick = (trackId, newValues) => {
        const newPlaylist = playlist.map(track => 
            track.id === trackId ? { ...track, ...newValues } : track
        );
        // Usar debounce para volume, mas atualização imediata para outros controles
        if ('volume' in newValues) {
            debouncedUpdatePlaylist(newPlaylist);
        } else {
            updatePlaylist(newPlaylist);
        }
    };

    const handleDelete = (trackId) => {
        const newPlaylist = playlist.filter(track => track.id !== trackId);
        updatePlaylist(newPlaylist);
        toast.error("Faixa de áudio removida.");
    };

    return (
        <JukeboxContainer>
            <TrackList>
                {!activeSceneId ? <p>Nenhuma cena ativa selecionada.</p> :
                 playlist.length === 0 ? <p>Nenhuma faixa de áudio para esta cena.</p> :
                 playlist.map(track => (
                    <TrackItem key={track.id} $isPlaying={track.isPlaying}>
                        <TrackInfo title={track.name}>{track.name}</TrackInfo>
                        <TrackControls>
                            <button onClick={() => handleControlClick(track.id, { isPlaying: !track.isPlaying })}>
                                {track.isPlaying ? <FaPause/> : <FaPlay/>}
                            </button>
                            <input
                                type="range" min="0" max="1" step="0.05"
                                value={track.volume}
                                onChange={(e) => handleControlClick(track.id, { volume: parseFloat(e.target.value) })}
                            />
                            <button onClick={() => handleControlClick(track.id, { loop: !track.loop })} title={track.loop ? "Desativar Loop" : "Ativar Loop"}>
                                {track.loop ? <FaRedo/> : <FaUndo/>}
                            </button>
                            <button onClick={() => handleDelete(track.id)} title="Remover Faixa"><FaTrash/></button>
                        </TrackControls>
                    </TrackItem>
                 ))}
            </TrackList>
            {activeSceneId && (
                <JukeboxForm>
                    <input value={formState.name} onChange={e => setFormState(p => ({...p, name: e.target.value}))} placeholder="Nome da Faixa" />
                    <input value={formState.url} onChange={e => setFormState(p => ({...p, url: e.target.value, file: null}))} placeholder="URL do Áudio (.mp3, .wav)" disabled={!!formState.file} />
                    <input type="file" accept=".mp3,.wav,.ogg" onChange={(e) => setFormState(p => ({...p, file: e.target.files[0], url: ''}))} />
                    <button onClick={handleAddTrack} disabled={isUploading}>{isUploading ? 'Enviando...' : '+ Adicionar Faixa'}</button>
                </JukeboxForm>
            )}
        </JukeboxContainer>
    );
};