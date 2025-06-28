import React, { useRef, useCallback } from 'react';
import {
    AttributeCard, AttributeGrid, CardValue, CardLabel, CardResource,
    ControlWrapper, ControlButton,
    CompactWrapper, CompactCard, ResourceBar, ResourceProgress, ResourceText, ResourceControls, ResourceButton
} from './styles';
import { FaHeart, FaStar, FaBolt, FaArrowUp } from 'react-icons/fa';

export const AttributeDisplay = ({ 
    attributes, 
    resources, 
    currentResources, 
    onAttributeChange, 
    onResourceChange, 
    isEditing, 
    isDead,
    points 
}) => {
    // Refs para controle de segurar botão
    const holdTimeoutRef = useRef(null);
    const holdIntervalRef = useRef(null);
    
    const handleCurrentChange = (resourceKey, currentValue, amount, max) => {
        if(isDead) return;
        const newValue = Math.max(0, Math.min(max, currentValue + amount));
        onResourceChange(resourceKey, newValue);
    }
    
    const handleSetToMax = (resourceKey, max) => {
        if(isDead) return;
        onResourceChange(resourceKey, max);
    }

    // Função para iniciar o hold (segurar botão)
    const startHold = useCallback((callback, initialDelay = 500, repeatDelay = 100) => {
        // Executa imediatamente
        callback();
        
        // Aguarda o delay inicial antes de começar a repetir
        holdTimeoutRef.current = setTimeout(() => {
            holdIntervalRef.current = setInterval(callback, repeatDelay);
        }, initialDelay);
    }, []);

    // Função para parar o hold
    const stopHold = useCallback(() => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        if (holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }
    }, []);

    // Validações para atributos no modo edição
    const canIncreaseAttribute = (attr) => {
        if (!points) return true;
        return points.remaining > 0 && attributes[attr] < 5;
    };

    const canDecreaseAttribute = (attr) => {
        return attributes[attr] > 0;
    };

    // --- MODO DE EDIÇÃO ---
    if (isEditing) {
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
                    {points && (
                        <div style={{ 
                            fontSize: '0.7rem', 
                            color: points.remaining <= 0 ? '#F44336' : '#888',
                            marginTop: '0.25rem',
                            textAlign: 'center'
                        }}>
                            Pontos restantes: {points.remaining}
                        </div>
                    )}
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
                    {points && (
                        <div style={{ 
                            fontSize: '0.7rem', 
                            color: points.remaining <= 0 ? '#F44336' : '#888',
                            marginTop: '0.25rem',
                            textAlign: 'center'
                        }}>
                            Pontos restantes: {points.remaining}
                        </div>
                    )}
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
                    {points && (
                        <div style={{ 
                            fontSize: '0.7rem', 
                            color: points.remaining <= 0 ? '#F44336' : '#888',
                            marginTop: '0.25rem',
                            textAlign: 'center'
                        }}>
                            Pontos restantes: {points.remaining}
                        </div>
                    )}
                </AttributeCard>
            </AttributeGrid>
        );
    }

    // --- MODO DE JOGO ---
    return (
        <CompactWrapper>
            <CompactCard>
                <FaHeart color="#F44336" title="Pontos de Vida" />
                <ResourceBar>
                    <ResourceProgress $progress={(currentResources.pv_current / resources.pv) * 100} $color="#F44336" />
                    <ResourceText>{currentResources.pv_current} / {resources.pv}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pv_current;
                            handleCurrentChange('pv_current', current, -1, resources.pv);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pv_current;
                            handleCurrentChange('pv_current', current, -1, resources.pv);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pv_current <= 0}
                        title="Diminuir PV (segure para continuar)"
                    >
                        -
                    </ResourceButton>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pv_current;
                            handleCurrentChange('pv_current', current, 1, resources.pv);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pv_current;
                            handleCurrentChange('pv_current', current, 1, resources.pv);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pv_current >= resources.pv}
                        title="Aumentar PV (segure para continuar)"
                    >
                        +
                    </ResourceButton>
                    <ResourceButton 
                        onClick={() => handleSetToMax('pv_current', resources.pv)} 
                        disabled={isDead} 
                        title="Restaurar Vida"
                    >
                        <FaArrowUp />
                    </ResourceButton>
                </ResourceControls>
            </CompactCard>
            
            <CompactCard>
                <FaBolt color="#00BCD4" title="Pontos de Mana" />
                <ResourceBar>
                    <ResourceProgress $progress={(currentResources.pm_current / resources.pm) * 100} $color="#00BCD4" />
                    <ResourceText>{currentResources.pm_current} / {resources.pm}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pm_current;
                            handleCurrentChange('pm_current', current, -1, resources.pm);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pm_current;
                            handleCurrentChange('pm_current', current, -1, resources.pm);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pm_current <= 0}
                        title="Diminuir PM (segure para continuar)"
                    >
                        -
                    </ResourceButton>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pm_current;
                            handleCurrentChange('pm_current', current, 1, resources.pm);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pm_current;
                            handleCurrentChange('pm_current', current, 1, resources.pm);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pm_current >= resources.pm}
                        title="Aumentar PM (segure para continuar)"
                    >
                        +
                    </ResourceButton>
                    <ResourceButton 
                        onClick={() => handleSetToMax('pm_current', resources.pm)} 
                        disabled={isDead} 
                        title="Restaurar Mana"
                    >
                        <FaArrowUp />
                    </ResourceButton>
                </ResourceControls>
            </CompactCard>
            
            <CompactCard>
                <FaStar color="#FFC107" title="Pontos de Ação" />
                <ResourceBar>
                    <ResourceProgress $progress={(currentResources.pa_current / resources.pa) * 100} $color="#FFC107" />
                    <ResourceText>{currentResources.pa_current} / {resources.pa}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pa_current;
                            handleCurrentChange('pa_current', current, -1, resources.pa);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pa_current;
                            handleCurrentChange('pa_current', current, -1, resources.pa);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pa_current <= 0}
                        title="Diminuir PA (segure para continuar)"
                    >
                        -
                    </ResourceButton>
                    <ResourceButton 
                        onMouseDown={() => startHold(() => {
                            const current = currentResources.pa_current;
                            handleCurrentChange('pa_current', current, 1, resources.pa);
                        })}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={() => startHold(() => {
                            const current = currentResources.pa_current;
                            handleCurrentChange('pa_current', current, 1, resources.pa);
                        })}
                        onTouchEnd={stopHold}
                        disabled={isDead || currentResources.pa_current >= resources.pa}
                        title="Aumentar PA (segure para continuar)"
                    >
                        +
                    </ResourceButton>
                    <ResourceButton 
                        onClick={() => handleSetToMax('pa_current', resources.pa)} 
                        disabled={isDead} 
                        title="Restaurar Ação"
                    >
                        <FaArrowUp />
                    </ResourceButton>
                </ResourceControls>
            </CompactCard>
        </CompactWrapper>
    );
}; 

