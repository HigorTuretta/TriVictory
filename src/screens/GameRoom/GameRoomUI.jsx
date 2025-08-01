import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { useCurrentPlayerCharacter } from '../../hooks/useCurrentPlayerCharacter';
import { useDiceRoller } from '../../hooks/useDiceRoller';
import { RPGLoader } from '../../components/RPGLoader';
import { VTTLayout, MapArea } from './styles';

// Componentes do VTT
import { LeftSidebar } from '../../components/VTT/LeftSidebar';
import { VTTMap } from '../../components/VTT/VTTMap';
import { DiceToolbar } from '../../components/VTT/DiceToolbar';
import { DiceRoller } from '../../components/DiceRoller';
import { DiceModifierModal } from '../../components/VTT/DiceModifierModal';
import { FloatingWindow } from '../../components/VTT/FloatingWindow';
import { SceneManager } from '../../components/VTT/SceneManager';
// Futuros: InitiativeTracker, EnemyGrimoire, etc.

// Componente que renderiza a UI principal do VTT
const GameRoomContent = () => {
    const { room } = useRoom();
    const { character } = useCurrentPlayerCharacter();
    const { executeRoll, isRolling, currentRoll, onAnimationComplete, modifierModal, setModifierModal } = useDiceRoller(character);
    
    // Estado para controlar as janelas flutuantes
    const [windows, setWindows] = useState({
        sceneManager: false,
        initiativeTracker: false,
        enemyGrimoire: false,
    });

    const toggleWindow = (windowName) => {
        setWindows(prev => ({ ...prev, [windowName]: !prev[windowName] }));
    };
    
    const activeScene = room.scenes.find(s => s.id === room.activeSceneId) || null;

    return (
        <>
            <VTTLayout>
                <LeftSidebar onToolSelect={toggleWindow} />
                <MapArea>
                    <VTTMap activeScene={activeScene} />
                </MapArea>
                <DiceToolbar onRoll={executeRoll} />
            </VTTLayout>

            {/* Overlays e Modais */}
            <DiceRoller isVisible={isRolling} rollData={currentRoll} onAnimationComplete={onAnimationComplete} />
            <DiceModifierModal modalState={modifierModal} setModalState={setModifierModal} />
            
            {/* Janelas Flutuantes */}
            <FloatingWindow title="Gerenciador de Cenas" isOpen={windows.sceneManager} onClose={() => toggleWindow('sceneManager')}>
                <SceneManager scenes={room.scenes} activeSceneId={room.activeSceneId} />
            </FloatingWindow>
            {/* Adicionar outras janelas aqui */}
        </>
    );
};

// Componente que consome o contexto e decide se renderiza o loader ou a UI
export const GameRoomUI = () => {
    const { loading, error } = useRoom();
    if (loading) return <RPGLoader />;
    if (error) return null; // Contexto já redirecionou
    return <GameRoomContent />;
};