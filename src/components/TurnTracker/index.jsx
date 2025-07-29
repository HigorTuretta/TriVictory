import React, { useState, useMemo } from 'react';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaRedo, FaAngleDoubleRight } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import {
    TrackerContainer, Header, AddNpcForm as FormStyled, AddNpcInput, AddNpcButton,
    TurnList, TurnItem, TurnItemName, TurnItemControls, DmControls
} from './styles';

// --- Subcomponente: Formulário para Adicionar NPC ---
const AddNpcForm = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim());
        setName('');
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <AddNpcInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adicionar NPC/Monstro"
            />
            <AddNpcButton type="submit" title="Adicionar"><FaPlus /></AddNpcButton>
        </FormStyled>
    );
};

// --- Subcomponente: Lista de Iniciativa Principal ---
const InitiativeList = ({ turnOrder, activeIndex, isMaster, onMove, onRemove }) => (
    <TurnList>
        {turnOrder.length === 0 && <p>A ordem de iniciativa está vazia.</p>}
        {turnOrder.map((item, index) => (
            <TurnItem key={item.id} $isActive={index === activeIndex}>
                <TurnItemName>{item.name}</TurnItemName>
                {isMaster && (
                    <TurnItemControls>
                        <button onClick={() => onMove(index, -1)} title="Mover para Cima" disabled={index === 0}><FaArrowUp /></button>
                        <button onClick={() => onMove(index, 1)} title="Mover para Baixo" disabled={index === turnOrder.length - 1}><FaArrowDown /></button>
                        <button onClick={() => onRemove(item.id)} title="Remover"><FaTrash /></button>
                    </TurnItemControls>
                )}
            </TurnItem>
        ))}
    </TurnList>
);

// --- Subcomponente: Painel para Adicionar Personagens ---
const AddCharacterPanel = ({ characters, onAdd, turnOrderIds }) => (
    <>
        <Header><h3>Personagens dos Jogadores</h3></Header>
        <TurnList>
            {characters.map(char => {
                const isAdded = turnOrderIds.has(char.id);
                return (
                    <TurnItem key={char.id} $variant="add" onClick={() => !isAdded && onAdd(char)} disabled={isAdded}>
                        <TurnItemName>{char.name}</TurnItemName>
                        <button disabled={isAdded}>{isAdded ? 'Adicionado' : <><FaPlus /> Adicionar</>}</button>
                    </TurnItem>
                );
            })}
        </TurnList>
    </>
);

// --- Componente Principal ---
export const TurnTracker = ({ room, linkedCharactersData, onUpdate }) => {
    const { currentUser } = useAuth();
    
    const turnOrder = room.turnOrder || [];
    const currentTurnIndex = room.currentTurnIndex || 0;
    const isMaster = room.masterId === currentUser.uid;

    const playerCharacters = useMemo(() => Object.values(linkedCharactersData || {}), [linkedCharactersData]);
    const turnOrderIds = useMemo(() => new Set(turnOrder.map(item => item.id)), [turnOrder]);

    const handleAddNpc = (npcName) => {
        const newNpc = { id: `npc-${Date.now()}`, name: npcName, type: 'npc' };
        onUpdate({ turnOrder: [...turnOrder, newNpc] });
    };

    const handleAddPlayer = (character) => {
        if (turnOrderIds.has(character.id)) return;
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
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
        onUpdate({ turnOrder: newOrder });
    };

    const nextTurn = () => {
        if (turnOrder.length === 0) return;
        const nextIndex = (currentTurnIndex + 1) % turnOrder.length;
        onUpdate({ currentTurnIndex: nextIndex });
    };

    return (
        <TrackerContainer>
            <Header>
                <h3>Ordem de Iniciativa</h3>
                {isMaster && <AddNpcForm onAdd={handleAddNpc} />}
            </Header>

            <InitiativeList
                turnOrder={turnOrder}
                activeIndex={currentTurnIndex}
                isMaster={isMaster}
                onMove={handleMoveItem}
                onRemove={handleRemoveItem}
            />

            {isMaster && (
                <>
                    <AddCharacterPanel
                        characters={playerCharacters}
                        onAdd={handleAddPlayer}
                        turnOrderIds={turnOrderIds}
                    />
                    <DmControls>
                        <button onClick={() => onUpdate({ turnOrder: [], currentTurnIndex: 0 })}><FaRedo /> Limpar Lista</button>
                        <button onClick={nextTurn} disabled={turnOrder.length === 0}><FaAngleDoubleRight /> Próximo Turno</button>
                    </DmControls>
                </>
            )}
        </TrackerContainer>
    );
};