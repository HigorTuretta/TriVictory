// src/components/VTT/JukeboxPlayer.jsx
import React, { useRef, useEffect } from 'react';
import { useRoom } from '../../contexts/RoomContext';

export const JukeboxPlayer = () => {
    const { room } = useRoom();
    const audioRefs = useRef({});

    const activeSceneId = room?.activeSceneId;
    const playlist = (activeSceneId && room?.jukebox?.[activeSceneId]) || [];

    useEffect(() => {
        const currentAudioElements = audioRefs.current;
        const playlistTrackIds = new Set(playlist.map(track => track.id));

        // Sincroniza os players existentes com o estado da sala
        playlist.forEach(track => {
            const audio = currentAudioElements[track.id];
            if (audio) {
                // Sincroniza o play/pause
                if (track.isPlaying && audio.paused) {
                    audio.play().catch(e => console.warn("Audio play failed:", e));
                } else if (!track.isPlaying && !audio.paused) {
                    audio.pause();
                }

                // Sincroniza volume e loop
                if (audio.volume !== track.volume) audio.volume = track.volume;
                if (audio.loop !== track.loop) audio.loop = track.loop;
            }
        });
        
        // Remove players de áudio que não estão mais na playlist
        Object.keys(currentAudioElements).forEach(trackId => {
            if (!playlistTrackIds.has(trackId)) {
                const audio = currentAudioElements[trackId];
                audio.pause();
                delete currentAudioElements[trackId];
            }
        });

    }, [playlist]);

    // Renderiza os elementos de áudio (são invisíveis para o usuário)
    return (
        <div style={{ display: 'none' }}>
            {playlist.map(track => (
                <audio
                    key={track.id}
                    ref={el => {
                        if (el) audioRefs.current[track.id] = el;
                    }}
                    src={track.url}
                    preload="auto"
                />
            ))}
        </div>
    );
};