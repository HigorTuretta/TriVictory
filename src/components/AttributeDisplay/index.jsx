// src/components/AttributeDisplay/index.jsx
import React, { useRef, useCallback } from 'react';
import {
    AttributeGrid, AttributeCard, CardValue, CardLabel, CardResource, ControlWrapper, ControlButton,
    CompactWrapper, CompactCard, ResourceColumn, AttributeText, ResourceBar, ResourceProgress, ResourceText, ResourceControls, ResourceButton
} from './styles';
import { FaHeart, FaStar, FaBolt, FaArrowUp } from 'react-icons/fa';

// ... (EditView sem alterações) ...
const EditView = ({ attributes, points, onAttributeChange, resources }) => {
    const canIncreaseAttribute = (attr) => {
        if (!points) return true;
        return points.remaining > 0 && attributes[attr] < 5;
    };

    const canDecreaseAttribute = (attr) => {
        return attributes[attr] > 0;
    };

    return (
        <AttributeGrid>
            <AttributeCard>
                <CardValue>{attributes.poder}</CardValue>
                <CardLabel>💪 Poder</CardLabel>
                <CardResource>PA Máximo: {resources.pa}</CardResource>
                <ControlWrapper>
                    <ControlButton 
                        onClick={() => onAttributeChange('poder', attributes.poder - 1)}
                        disabled={!canDecreaseAttribute('poder')}
                        title={!canDecreaseAttribute('poder') ? 'Não é possível diminuir abaixo de 0' : 'Diminuir Poder'}
                    >
                        -
                    </ControlButton>
                    <ControlButton 
                        onClick={() => onAttributeChange('poder', attributes.poder + 1)}
                        disabled={!canIncreaseAttribute('poder')}
                        title={
                            !canIncreaseAttribute('poder') 
                                ? (points?.remaining <= 0 ? 'Sem pontos de personagem disponíveis' : 'Máximo de 5 pontos por atributo')
                                : 'Aumentar Poder'
                        }
                    >
                        +
                    </ControlButton>
                </ControlWrapper>
            </AttributeCard>
            
            <AttributeCard>
                <CardValue>{attributes.habilidade}</CardValue>
                <CardLabel>🧠 Habilidade</CardLabel>
                <CardResource>PM Máximo: {resources.pm}</CardResource>
                <ControlWrapper>
                    <ControlButton 
                        onClick={() => onAttributeChange('habilidade', attributes.habilidade - 1)}
                        disabled={!canDecreaseAttribute('habilidade')}
                        title={!canDecreaseAttribute('habilidade') ? 'Não é possível diminuir abaixo de 0' : 'Diminuir Habilidade'}
                    >
                        -
                    </ControlButton>
                    <ControlButton 
                        onClick={() => onAttributeChange('habilidade', attributes.habilidade + 1)}
                        disabled={!canIncreaseAttribute('habilidade')}
                        title={
                            !canIncreaseAttribute('habilidade') 
                                ? (points?.remaining <= 0 ? 'Sem pontos de personagem disponíveis' : 'Máximo de 5 pontos por atributo')
                                : 'Aumentar Habilidade'
                        }
                    >
                        +
                    </ControlButton>
                </ControlWrapper>
            </AttributeCard>
            
            <AttributeCard>
                <CardValue>{attributes.resistencia}</CardValue>
                <CardLabel>🛡️ Resistência</CardLabel>
                <CardResource>PV Máximo: {resources.pv}</CardResource>
                <ControlWrapper>
                    <ControlButton 
                        onClick={() => onAttributeChange('resistencia', attributes.resistencia - 1)}
                        disabled={!canDecreaseAttribute('resistencia')}
                        title={!canDecreaseAttribute('resistencia') ? 'Não é possível diminuir abaixo de 0' : 'Diminuir Resistência'}
                    >
                        -
                    </ControlButton>
                    <ControlButton 
                        onClick={() => onAttributeChange('resistencia', attributes.resistencia + 1)}
                        disabled={!canIncreaseAttribute('resistencia')}
                        title={
                            !canIncreaseAttribute('resistencia') 
                                ? (points?.remaining <= 0 ? 'Sem pontos de personagem disponíveis' : 'Máximo de 5 pontos por atributo')
                                : 'Aumentar Resistência'
                        }
                    >
                        +
                    </ControlButton>
                </ControlWrapper>
            </AttributeCard>
        </AttributeGrid>
    );
};
// --- CORREÇÃO APLICADA AQUI ---
const DisplayView = ({ attributes, resources, currentResources, onResourceChange, isDead, isOwner }) => {
    const holdTimeoutRef = useRef(null);
    const holdIntervalRef = useRef(null);
    
    // Controles agora estão desabilitados se o personagem estiver morto OU se o usuário não for o dono
    const controlsDisabled = isDead || !isOwner;

    const handleCurrentChange = (resourceKey, currentValue, amount, max) => {
        if(controlsDisabled) return;
        const newValue = Math.max(0, Math.min(max, currentValue + amount));
        onResourceChange(resourceKey, newValue);
    };
    
    const handleSetToMax = (resourceKey, max) => {
        if(controlsDisabled) return;
        onResourceChange(resourceKey, max);
    };

    const startHold = useCallback((callback) => {
        callback();
        holdTimeoutRef.current = setTimeout(() => {
            holdIntervalRef.current = setInterval(callback, 100);
        }, 500);
    }, []);

    const stopHold = useCallback(() => {
        clearTimeout(holdTimeoutRef.current);
        clearInterval(holdIntervalRef.current);
    }, []);
    
    const resourceConfig = [
        { key: 'pv', icon: FaHeart, color: '#F44336', title: 'Pontos de Vida', attrKey: 'resistencia', attrLabel: 'Resistência' },
        { key: 'pm', icon: FaBolt, color: '#00BCD4', title: 'Pontos de Mana', attrKey: 'habilidade', attrLabel: 'Habilidade' },
        { key: 'pa', icon: FaStar, color: '#FFC107', title: 'Pontos de Ação', attrKey: 'poder', attrLabel: 'Poder' },
    ];

    return (
        <CompactWrapper>
            {resourceConfig.map(res => {
                const current = currentResources[`${res.key}_current`];
                const max = resources[res.key];
                return (
                    <CompactCard key={res.key}>
                        <res.icon color={res.color} title={res.title} size={24} />
                        <ResourceColumn>
                            <AttributeText>
                                {res.attrLabel} <strong>{attributes[res.attrKey]}</strong>
                            </AttributeText>
                            <ResourceBar>
                                <ResourceProgress $progress={(current / max) * 100} $color={res.color} />
                                <ResourceText>{current} / {max}</ResourceText>
                            </ResourceBar>
                        </ResourceColumn>
                        <ResourceControls>
                            <ResourceButton onMouseDown={() => startHold(() => handleCurrentChange(`${res.key}_current`, current, -1, max))} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchStart={() => startHold(() => handleCurrentChange(`${res.key}_current`, current, -1, max))} onTouchEnd={stopHold} disabled={controlsDisabled || current <= 0} title={`Diminuir ${res.key.toUpperCase()}`}>-</ResourceButton>
                            <ResourceButton onMouseDown={() => startHold(() => handleCurrentChange(`${res.key}_current`, current, 1, max))} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchStart={() => startHold(() => handleCurrentChange(`${res.key}_current`, current, 1, max))} onTouchEnd={stopHold} disabled={controlsDisabled || current >= max} title={`Aumentar ${res.key.toUpperCase()}`}>+</ResourceButton>
                            <ResourceButton onClick={() => handleSetToMax(`${res.key}_current`, max)} disabled={controlsDisabled} title={`Restaurar ${res.key.toUpperCase()}`}><FaArrowUp /></ResourceButton>
                        </ResourceControls>
                    </CompactCard>
                );
            })}
        </CompactWrapper>
    );
};

export const AttributeDisplay = ({ 
    attributes, 
    resources, 
    currentResources, 
    onAttributeChange, 
    onResourceChange, 
    isEditing, 
    isDead,
    points,
    isOwner // Receber a nova prop
}) => {
    if (isEditing) {
        return <EditView attributes={attributes} points={points} onAttributeChange={onAttributeChange} resources={resources} />;
    }
    return <DisplayView attributes={attributes} resources={resources} currentResources={currentResources} onResourceChange={onResourceChange} isDead={isDead} isOwner={isOwner} />;
};