import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext';
import { useCurrentPlayerCharacter } from '../../hooks/useCurrentPlayerCharacter';
import { useDiceRoller } from '../../hooks/useDiceRoller';
import { RPGLoader } from '../../components/RPGLoader';
import { VTTLayout, MapArea } from './styles';
import { LeftSidebar } from '../../components/VTT/LeftSidebar';
import { VTTMap } from '../../components/VTT/VTTMap';
import { DiceToolbar } from '../../components/VTT/DiceToolbar';
import { DiceRoller } from '../../components/DiceRoller';
import { DiceModifierModal } from '../../components/VTT/DiceModifierModal';
import { FloatingWindow } from '../../components/VTT/FloatingWindow';
import { SceneManager } from '../../components/VTT/SceneManager';
import { EnemyGrimoire } from '../../components/VTT/EnemyGrimoire';

const GameRoomContent = () => {
    const { room } = useRoom();
    const { character } = useCurrentPlayerCharacter();
    const { executeRoll, isRolling, currentRoll, onAnimationComplete, modifierModal, setModifierModal } = useDiceRoller(character);
    
    const [windows, setWindows] = useState({
        sceneManager: false,
        initiativeTracker: false,
        enemyGrimoire: false,
    });

    const toggleWindow = (windowName) => {
        setWindows(prev => ({ ...prev, [windowName]: !prev[windowName] }));
    };
    
    const activeScene = (Array.isArray(room.scenes) && room.activeSceneId)
        ? room.scenes.find(s => s.id === room.activeSceneId)
        : null;

    return (
        <>
            <VTTLayout>
                <LeftSidebar onToolSelect={toggleWindow} />
                <MapArea>
                    <VTTMap activeScene={activeScene} />
                </MapArea>
                <DiceToolbar onRoll={executeRoll} />
            </VTTLayout>

            <DiceRoller isVisible={isRolling} rollData={currentRoll} onAnimationComplete={onAnimationComplete} />
            <DiceModifierModal modalState={modifierModal} setModalState={setModifierModal} />
            
            <FloatingWindow title="Gerenciador de Cenas" isOpen={windows.sceneManager} onClose={() => toggleWindow('sceneManager')}>
                <SceneManager />
            </FloatingWindow>
            <FloatingWindow title="Grimório de Inimigos" isOpen={windows.enemyGrimoire} onClose={() => toggleWindow('enemyGrimoire')}>
                <EnemyGrimoire />
            </FloatingWindow>
        </>
    );
};

export const GameRoomUI = () => {
    const { loading, error } = useRoom();
    if (loading) return <RPGLoader />;
    if (error) return null;
    return <GameRoomContent />;
};