// src/components/VTT/TokenContextMenu.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaEyeSlash, FaBed, FaRunning, FaSkullCrossbones, FaPlus, FaMinus, FaArrowUp } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useRoom } from '../../contexts/RoomContext';
import { 
    ContextMenuBody, ResourceBar, BarVisual, 
    BarFill, ActionGrid, ResourceInput, ResourceControls 
} from './styles'; // Usaremos os novos estilos que vamos adicionar

const ResourceControl = ({ label, resourceKey, value, max, color, onAction, editable }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleBlur = () => {
        const numValue = parseInt(currentValue, 10);
        if (isNaN(numValue) || numValue === value) {
            setCurrentValue(value); // Reseta se for inválido ou não mudou
        } else {
            onAction('updateResource', { resource: resourceKey, value: Math.max(0, numValue) });
        }
    };
    
    const handleQuickChange = (amount) => {
        const newValue = Math.max(0, value + amount);
        onAction('updateResource', { resource: resourceKey, value: newValue });
    };

    return (
        <ResourceBar>
            <label>{label}</label>
            <BarVisual>
                <BarFill color={color} width={max > 0 ? (value / max) * 100 : 0} />
            </BarVisual>
            <ResourceInput 
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
                disabled={!editable}
            />
            <span>/ {max}</span>
            {editable && (
                 <ResourceControls>
                    <button onClick={() => handleQuickChange(-1)} disabled={value <= 0}>-</button>
                    <button onClick={() => handleQuickChange(1)} disabled={value >= max}>+</button>
                    <button onClick={() => onAction('fillResource', { resource: resourceKey })} title={`Encher ${label}`}><FaArrowUp /></button>
                </ResourceControls>
            )}
        </ResourceBar>
    );
};

export const TokenContextMenu = ({ token, onAction }) => {
    const { room } = useRoom();
    const { currentUser } = useAuth();
    
    if (!token) return null;
    
    const isMaster = room.masterId === currentUser.uid;
    const isOwner = token.userId === currentUser.uid;
    const canEditResources = isMaster || isOwner;

    return (
        <ContextMenuBody>
            <ResourceControl 
                label="PV"
                resourceKey="pv_current"
                value={token.pv_current || 0}
                max={token.pv_max || 1}
                color="#4CAF50"
                editable={canEditResources}
                onAction={onAction}
            />
            <ResourceControl 
                label="PM"
                resourceKey="pm_current"
                value={token.pm_current || 0}
                max={token.pm_max || 1}
                color="#2196F3"
                editable={canEditResources}
                onAction={onAction}
            />
            <ResourceControl 
                label="PA"
                resourceKey="pa_current"
                value={token.pa_current || 0}
                max={token.pa_max || 1}
                color="#FFC107"
                editable={canEditResources}
                onAction={onAction}
            />

            {isMaster && (
                <ActionGrid>
                    <button onClick={() => onAction('toggleVisibility')}>
                        <FaEyeSlash /> {token.isVisible === false ? 'Revelar' : 'Ocultar'}
                    </button>
                     <button onClick={() => onAction('toggleImmobilized')}>
                        <FaRunning /> {token.isImmobilized ? 'Liberar' : 'Imobilizar'}
                    </button>
                     <button onClick={() => onAction('toggleKnockedOut')}>
                        <FaBed /> {token.isKnockedOut ? 'Acordar' : 'Nocautear'}
                    </button>
                     <button onClick={() => onAction('toggleDead')} className="danger">
                        <FaSkullCrossbones /> {token.isDead ? 'Reviver' : 'Matar'}
                    </button>
                     <button onClick={() => onAction('delete')} className="danger">
                        <FaTrash /> Remover
                    </button>
                </ActionGrid>
            )}
        </ContextMenuBody>
    );
};