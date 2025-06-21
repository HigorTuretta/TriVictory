import React, { useState } from 'react';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaRedo, FaAngleDoubleRight } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import {
    TrackerContainer,
    Header,
    AddNpcForm,
    TurnList,
    TurnItem,
    TurnItemName,
    TurnItemControls,
    DmControls
} from './styles';

export const TurnTracker = ({ room, linkedCharactersData, onUpdate }) => {
    const { currentUser } = useAuth();
    const [npcName, setNpcName] = useState('');

    const turnOrder = room.turnOrder || [];
    const currentTurnIndex = room.currentTurnIndex || 0;
    const isMaster = room.masterId === currentUser.uid;

    const handleAddNpc = (e) => {
        e.preventDefault();
        if (!npcName.trim()) return;
        const newNpc = { id: `npc-${Date.now()}`, name: npcName, type: 'npc' };
        onUpdate({ turnOrder: [...turnOrder, newNpc] });
        setNpcName('');
    };
    
    const handleAddPlayer = (character) => {
        if (turnOrder.some(item => item.id === character.id)) return; // Evita duplicatas
        const newPlayer = { id: character.id, name: character.name, type: 'player' };
        onUpdate({ turnOrder: [...turnOrder, newPlayer] });
    };

    const handleRemoveItem = (id) => {
        onUpdate({ turnOrder: turnOrder.filter(item => item.id !== id) });
    };

    const handleMoveItem = (index, direction) => {
        const newOrder = [...turnOrder];
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= newOrder.length) return;
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]]; // Troca de posição
        onUpdate({ turnOrder: newOrder });
    };
    
    const handleSetTurn = (index) => {
        onUpdate({ currentTurnIndex: index });
    };
    
    const nextTurn = () => {
        const nextIndex = (currentTurnIndex + 1) % turnOrder.length;
        handleSetTurn(nextIndex);
    };

    return (
        <TrackerContainer>
            <Header>
                <h3>Ordem de Iniciativa</h3>
                {isMaster && (
                    <AddNpcForm onSubmit={handleAddNpc}>
                        <input
                            value={npcName}
                            onChange={(e) => setNpcName(e.target.value)}
                            placeholder="Adicionar NPC/Monstro"
                        />
                        <button type="submit"><FaPlus /></button>
                    </AddNpcForm>
                )}
            </Header>

            <TurnList>
                {turnOrder.length === 0 && <p>A ordem de iniciativa está vazia.</p>}
                {turnOrder.map((item, index) => (
                    <TurnItem key={item.id} $isActive={index === currentTurnIndex}>
                        <TurnItemName>{item.name}</TurnItemName>
                        {isMaster && (
                            <TurnItemControls>
                                <button onClick={() => handleMoveItem(index, -1)} title="Mover para Cima"><FaArrowUp /></button>
                                <button onClick={() => handleMoveItem(index, 1)} title="Mover para Baixo"><FaArrowDown /></button>
                                <button onClick={() => handleRemoveItem(item.id)} title="Remover"><FaTrash /></button>
                            </TurnItemControls>
                        )}
                    </TurnItem>
                ))}
            </TurnList>

            {isMaster && (
                <>
                    <Header><h3>Personagens dos Jogadores</h3></Header>
                    <TurnList>
                        {Object.values(linkedCharactersData).map(char => (
                             <TurnItem key={char.id} className="add-player" onClick={() => handleAddPlayer(char)}>
                                <TurnItemName>{char.name}</TurnItemName>
                                <button><FaPlus /> Adicionar à Ordem</button>
                            </TurnItem>
                        ))}
                    </TurnList>
                    <DmControls>
                        <button onClick={() => onUpdate({ turnOrder: [], currentTurnIndex: 0 })}><FaRedo /> Limpar Lista</button>
                        <button onClick={nextTurn}><FaAngleDoubleRight /> Próximo Turno</button>
                    </DmControls>
                </>
            )}
        </TrackerContainer>
    );
};
