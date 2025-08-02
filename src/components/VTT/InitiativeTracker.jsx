// src/components/VTT/InitiativeTracker.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRoom } from '../../contexts/RoomContext';
import { useInitiative } from '../../hooks/useInitiative';
import { useCurrentPlayerCharacter } from '../../hooks/useCurrentPlayerCharacter';
import { TrackerContainer, InitiativeList, InitiativeItem, InitiativeInfo, InitiativeRoll, InitiativeName, InitiativeControls, PlayerInitiativeButton } from './styles';
import { FaTrash, FaRedo, FaAngleDoubleRight, FaDiceD20 } from 'react-icons/fa';

export const InitiativeTracker = ({ onPlayerRoll }) => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const { initiativeOrder, currentIndex, nextTurn, removeFromInitiative, resetInitiative } = useInitiative();
    const { character: myCharacter } = useCurrentPlayerCharacter();
    const isMaster = room.masterId === currentUser.uid;

    const isPlayerInInitiative = myCharacter ? initiativeOrder.some(item => item.tokenId === myCharacter.id) : false;

    return (
        <TrackerContainer>
            <InitiativeList>
                {initiativeOrder.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>A iniciativa está vazia.</p>}
                {initiativeOrder.map((item, index) => (
                    <InitiativeItem key={item.id} $isActive={index === currentIndex}>
                        <InitiativeInfo>
                            <InitiativeRoll>{item.initiative}</InitiativeRoll>
                            <InitiativeName>{item.name}</InitiativeName>
                        </InitiativeInfo>
                        {isMaster && (
                            <button onClick={() => removeFromInitiative(item.id)} title="Remover da Iniciativa" style={{ color: '#F44336' }}>
                                <FaTrash />
                            </button>
                        )}
                    </InitiativeItem>
                ))}
            </InitiativeList>

            {/* Controles do Jogador */}
            {!isMaster && myCharacter && !isPlayerInInitiative && (
                <PlayerInitiativeButton onClick={onPlayerRoll}>
                    <FaDiceD20 /> Rolar Iniciativa
                </PlayerInitiativeButton>
            )}

            {/* Controles do Mestre */}
            {isMaster && (
                <InitiativeControls>
                    <button onClick={resetInitiative} style={{ flex: 1 }}><FaRedo /> Limpar</button>
                    <button 
                        onClick={nextTurn} 
                        style={{ flex: 2, background: '#4CAF50', color: 'white' }}
                        disabled={initiativeOrder.length === 0}
                    >
                        <FaAngleDoubleRight /> Próximo Turno
                    </button>
                </InitiativeControls>
            )}
        </TrackerContainer>
    );
};