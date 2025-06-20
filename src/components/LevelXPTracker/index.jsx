import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus, FaSync, FaSkull } from 'react-icons/fa';
import { ConfirmModal } from '../ConfirmModal';
import {
    XPContainer, LevelDisplay, XPBar, XPProgress, XPText,
    AddXPButton, EditContainer, EditForm, EditInput, EditLabel,
    RadioGroup, AddXpForm, AddXpInput, ActionButtonsWrapper
} from './styles';

export const LevelXPTracker = ({ level = 0, xp = { current: 0, target: 100, system: 'unit' }, isEditing, onUpdate, isDead }) => {
    const [isAddingXp, setIsAddingXp] = useState(false);
    const [xpAmount, setXpAmount] = useState('');
    const [isSubtracting, setIsSubtracting] = useState(false);
    const [confirmReset, setConfirmReset] = useState(null); // 'xp' ou 'level'

    const handleXpChange = (e) => {
        e.preventDefault();
        const amount = parseInt(xpAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Por favor, insira um valor válido.");
            return;
        }

        const modifier = isSubtracting ? -1 : 1;
        let newXp = xp.current + (amount * modifier);
        let newLevel = level;

        if (newXp >= xp.target && !isSubtracting) {
            newLevel += 1;
            newXp -= xp.target;
            toast.success(`🎉 LEVEL UP! Você alcançou o Nível ${newLevel}!`);
        }

        newXp = Math.max(0, newXp); // Impede XP negativo

        onUpdate({ level: newLevel, xp: { ...xp, current: newXp } });
        setXpAmount('');
        setIsAddingXp(false);
        setIsSubtracting(false);
    };

    const handleReset = (type) => {
        if (type === 'xp') {
            onUpdate({ xp: { ...xp, current: 0 } });
            toast.success("XP do nível atual zerado!");
        } else if (type === 'level') {
            onUpdate({ level: 0, xp: { ...xp, current: 0 } });
            toast.success("Nível e XP zerados!");
        }
        setConfirmReset(null);
    };

    const progress = xp.system === 'percentage'
        ? xp.current
        : xp.target > 0 ? (xp.current / xp.target) * 100 : 0;

    if (isEditing) {
        return (
            <EditContainer>
                <EditForm>
                    <EditLabel>Nível Atual:</EditLabel>
                    <EditInput
                        type="number"
                        value={level}
                        onChange={(e) => onUpdate({ level: parseInt(e.target.value, 10) || 0 })}
                    />
                </EditForm>
                <EditForm>
                    <EditLabel>Sistema de XP:</EditLabel>
                    <RadioGroup>
                        <input type="radio" id="unit" name="xpSystem" value="unit" checked={xp.system === 'unit'} onChange={(e) => onUpdate({ xp: { ...xp, system: e.target.value } })} />
                        <label htmlFor="unit">Unidade</label>
                        <input type="radio" id="percentage" name="xpSystem" value="percentage" checked={xp.system === 'percentage'} onChange={(e) => onUpdate({ xp: { ...xp, system: e.target.value, target: 100 } })} />
                        <label htmlFor="percentage">Porcentagem</label>
                    </RadioGroup>
                </EditForm>
                {xp.system === 'unit' && (
                    <EditForm>
                        <EditLabel>XP para Nv. Seguinte:</EditLabel>
                        <EditInput
                            type="number"
                            value={xp.target}
                            onChange={(e) => onUpdate({ xp: { ...xp, target: parseInt(e.target.value, 10) || 1 } })}
                        />
                    </EditForm>
                )}
            </EditContainer>
        );
    }

    return (
        <>
            <ConfirmModal
                isOpen={!!confirmReset}
                onClose={() => setConfirmReset(null)}
                onConfirm={() => handleReset(confirmReset)}
                title={`Resetar ${confirmReset === 'xp' ? 'XP' : 'Nível'}`}
                message={`Tem certeza que deseja resetar o ${confirmReset === 'xp' ? 'XP atual' : 'Nível e XP'} do personagem?`}
            />

            <XPContainer>
                <LevelDisplay>
                    <span>Nível {level}</span>
                    <ActionButtonsWrapper>
                        <button title="Resetar XP Atual" onClick={() => setConfirmReset('xp')} disabled={isDead}><FaSync size={12} /></button>
                        <button title="Resetar Nível" onClick={() => setConfirmReset('level')} disabled={isDead}><FaSkull size={12} /></button>
                    </ActionButtonsWrapper>
                </LevelDisplay>
                <XPBar>
                    <XPProgress $progress={progress} />
                    <XPText>{xp.current} / {xp.target} XP</XPText>
                </XPBar>
                {isAddingXp ? (
                    <AddXpForm onSubmit={handleXpChange}>
                        <AddXpInput type="number" value={xpAmount} onChange={(e) => setXpAmount(e.target.value)} placeholder="XP" autoFocus />
                        <button type="submit">OK</button>
                    </AddXpForm>
                ) : (
                    <ActionButtonsWrapper>
                        <AddXPButton title="Remover XP" className="remove" onClick={() => { setIsAddingXp(true); setIsSubtracting(true); }} disabled={isDead}><FaMinus /></AddXPButton>
                        <AddXPButton title="Adicionar XP" onClick={() => { setIsAddingXp(true); setIsSubtracting(false); }} disabled={isDead}><FaPlus /></AddXPButton>
                    </ActionButtonsWrapper>
                )}
            </XPContainer>
        </>
    );
};