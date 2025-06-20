import React from 'react';
import {
    AttributeCard, AttributeGrid, CardValue, CardLabel, CardResource,
    ControlWrapper, ControlButton,
    CompactWrapper, CompactCard, ResourceBar, ResourceProgress, ResourceText, ResourceControls, ResourceButton
} from './styles';
import { FaHeart, FaStar, FaBolt, FaArrowUp } from 'react-icons/fa';

export const AttributeDisplay = ({ attributes, resources, currentResources, onAttributeChange, onResourceChange, isEditing, isDead }) => {
    
    const handleCurrentChange = (resourceKey, currentValue, amount, max) => {
        if(isDead) return;
        const newValue = Math.max(0, Math.min(max, currentValue + amount));
        onResourceChange(resourceKey, newValue);
    }
    
    const handleSetToMax = (resourceKey, max) => {
        if(isDead) return;
        onResourceChange(resourceKey, max);
    }

    // --- MODO DE EDIÇÃO ---
    if (isEditing) {
        return (
            <AttributeGrid>
                <AttributeCard>
                    <CardValue>{attributes.poder}</CardValue>
                    <CardLabel>💪 Poder</CardLabel>
                    <CardResource>PA Máximo: {resources.pa}</CardResource>
                    <ControlWrapper>
                        <ControlButton onClick={() => onAttributeChange('poder', attributes.poder - 1)}>-</ControlButton>
                        <ControlButton onClick={() => onAttributeChange('poder', attributes.poder + 1)}>+</ControlButton>
                    </ControlWrapper>
                </AttributeCard>
                <AttributeCard>
                    <CardValue>{attributes.habilidade}</CardValue>
                    <CardLabel>🧠 Habilidade</CardLabel>
                    <CardResource>PM Máximo: {resources.pm}</CardResource>
                    <ControlWrapper>
                        <ControlButton onClick={() => onAttributeChange('habilidade', attributes.habilidade - 1)}>-</ControlButton>
                        <ControlButton onClick={() => onAttributeChange('habilidade', attributes.habilidade + 1)}>+</ControlButton>
                    </ControlWrapper>
                </AttributeCard>
                <AttributeCard>
                    <CardValue>{attributes.resistencia}</CardValue>
                    <CardLabel>🛡️ Resistência</CardLabel>
                    <CardResource>PV Máximo: {resources.pv}</CardResource>
                    <ControlWrapper>
                        <ControlButton onClick={() => onAttributeChange('resistencia', attributes.resistencia - 1)}>-</ControlButton>
                        <ControlButton onClick={() => onAttributeChange('resistencia', attributes.resistencia + 1)}>+</ControlButton>
                    </ControlWrapper>
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
                    <ResourceProgress $progress={(currentResources.pv_current / resources.pv) * 100} $color="var(--color-error)" />
                    <ResourceText>{currentResources.pv_current} / {resources.pv}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton onClick={() => handleCurrentChange('pv_current', currentResources.pv_current, -1, resources.pv)} disabled={isDead}>-</ResourceButton>
                    <ResourceButton onClick={() => handleCurrentChange('pv_current', currentResources.pv_current, 1, resources.pv)} disabled={isDead}>+</ResourceButton>
                    <ResourceButton onClick={() => handleSetToMax('pv_current', resources.pv)} disabled={isDead}><FaArrowUp /></ResourceButton>
                </ResourceControls>
            </CompactCard>
            <CompactCard>
                <FaBolt color="#00BCD4" title="Pontos de Mana" />
                <ResourceBar>
                    <ResourceProgress $progress={(currentResources.pm_current / resources.pm) * 100} $color="var(--color-secondary)" />
                    <ResourceText>{currentResources.pm_current} / {resources.pm}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton onClick={() => handleCurrentChange('pm_current', currentResources.pm_current, -1, resources.pm)} disabled={isDead}>-</ResourceButton>
                    <ResourceButton onClick={() => handleCurrentChange('pm_current', currentResources.pm_current, 1, resources.pm)} disabled={isDead}>+</ResourceButton>
                    <ResourceButton onClick={() => handleSetToMax('pm_current', resources.pm)} disabled={isDead}><FaArrowUp /></ResourceButton>
                </ResourceControls>
            </CompactCard>
            <CompactCard>
                <FaStar color="#FFC107" title="Pontos de Ação" />
                <ResourceBar>
                    <ResourceProgress $progress={(currentResources.pa_current / resources.pa) * 100} $color="#FFC107" />
                    <ResourceText>{currentResources.pa_current} / {resources.pa}</ResourceText>
                </ResourceBar>
                <ResourceControls>
                    <ResourceButton onClick={() => handleCurrentChange('pa_current', currentResources.pa_current, -1, resources.pa)} disabled={isDead}>-</ResourceButton>
                    <ResourceButton onClick={() => handleCurrentChange('pa_current', currentResources.pa_current, 1, resources.pa)} disabled={isDead}>+</ResourceButton>
                    <ResourceButton onClick={() => handleSetToMax('pa_current', resources.pa)} disabled={isDead}><FaArrowUp /></ResourceButton>
                </ResourceControls>
            </CompactCard>
        </CompactWrapper>
    );
};