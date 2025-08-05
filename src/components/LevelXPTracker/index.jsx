// src/components/LevelXPTracker/index.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus, FaSync, FaSkull } from 'react-icons/fa';
import { ConfirmModal } from '../ConfirmModal';
import {
    Wrapper, LevelDisplay, BarContainer, BarInfo, XPBar, XPProgress,
    Actions, ActionButton, AddXpForm, AddXpInput, ResetActions,
    EditGrid, EditField, RadioGroup
} from './styles';

// --- Subcomponente para a Visão de Edição ---
const EditView = ({ level, xp, basePoints, onUpdate }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const isXpField = name.startsWith('xp.');
        const parsedValue = type === 'number' ? parseInt(value, 10) || 0 : value;

        if (isXpField) {
            const xpKey = name.split('.')[1];
            onUpdate({ xp: { ...xp, [xpKey]: parsedValue } });
        } else {
            onUpdate({ [name]: parsedValue });
        }
    };

    return (
        <EditGrid>
            <EditField>
                <label htmlFor="level">Nível</label>
                <input id="level" type="number" name="level" value={level} onChange={handleChange} />
            </EditField>
            <EditField>
                <label htmlFor="basePoints">Pontos Base</label>
                <input id="basePoints" type="number" name="basePoints" value={basePoints} onChange={handleChange} />
            </EditField>
            <EditField>
                <label htmlFor="xp.current">XP Atual</label>
                <input id="xp.current" type="number" name="xp.current" value={xp.current} onChange={handleChange} />
            </EditField>
            <EditField>
                <label htmlFor="xp.target">XP para Próximo Nível</label>
                <input id="xp.target" type="number" name="xp.target" value={xp.target} onChange={handleChange} />
            </EditField>
        </EditGrid>
    );
};

// --- Subcomponente para a Visão de Display ---
const DisplayView = ({ level, xp, progress, isDead, onXpChange, onResetRequest }) => {
    const [isFormActive, setIsFormActive] = useState(false);
    const [xpAmount, setXpAmount] = useState('');
    const [isSubtracting, setIsSubtracting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = parseInt(xpAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Por favor, insira um valor válido.");
            return;
        }
        
        onXpChange(isSubtracting ? -amount : amount);
        setXpAmount('');
        setIsFormActive(false);
    };

    return (
        <>
            <LevelDisplay>
                <span>Nível</span>
                <span>{level}</span>
            </LevelDisplay>

            <BarContainer>
                <BarInfo>
                    <span>Progresso</span>
                    <ResetActions>
                        <button title="Resetar XP Atual" onClick={() => onResetRequest('xp')} disabled={isDead}>
                            <FaSync size={12} />
                        </button>
                        <button title="Resetar Nível e XP" className="danger" onClick={() => onResetRequest('level')} disabled={isDead}>
                            <FaSkull size={12} />
                        </button>
                    </ResetActions>
                </BarInfo>
                <XPBar>
                    <XPProgress style={{ width: `${progress}%` }} />
                </XPBar>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#888' }}>
                    {xp.current} / {xp.target} XP
                </div>
            </BarContainer>

            {isFormActive ? (
                <AddXpForm onSubmit={handleSubmit}>
                    <AddXpInput
                        type="number"
                        value={xpAmount}
                        onChange={(e) => setXpAmount(e.target.value)}
                        placeholder="Valor"
                        autoFocus
                        onBlur={() => !xpAmount && setIsFormActive(false)}
                    />
                    <ActionButton type="submit" title={isSubtracting ? 'Confirmar Remoção' : 'Confirmar Adição'}>
                        {isSubtracting ? <FaMinus /> : <FaPlus />}
                    </ActionButton>
                </AddXpForm>
            ) : (
                <Actions>
                    <ActionButton title="Remover XP" className="remove" onClick={() => { setIsFormActive(true); setIsSubtracting(true); }} disabled={isDead}>
                        <FaMinus />
                    </ActionButton>
                    <ActionButton title="Adicionar XP" onClick={() => { setIsFormActive(true); setIsSubtracting(false); }} disabled={isDead}>
                        <FaPlus />
                    </ActionButton>
                </Actions>
            )}
        </>
    );
};

// --- Componente Principal ---
export const LevelXPTracker = ({
    level = 0,
    xp = { current: 0, target: 10 },
    basePoints = 10,
    isEditing,
    onUpdate,
    isDead
}) => {
    const [confirmReset, setConfirmReset] = useState(null); // 'xp' ou 'level'

    const handleXpChange = (amount) => {
        let newXp = xp.current + amount;
        let newLevel = level;
        let newBasePoints = basePoints;

        // Lógica de Level Up
        if (newXp >= xp.target && amount > 0) {
            newLevel += 1;
            newXp -= xp.target;
            newBasePoints += 1;
            toast.success(`🎉 LEVEL UP! Você alcançou o Nível ${newLevel}!`);
            toast.success(`✨ Você ganhou +1 Ponto de Personagem!`);
        }

        newXp = Math.max(0, newXp);

        onUpdate({
            level: newLevel,
            xp: { ...xp, current: newXp },
            basePoints: newBasePoints
        });
    };

    const handleReset = () => {
        if (confirmReset === 'xp') {
            onUpdate({ xp: { ...xp, current: 0 } });
            toast.success("XP do nível atual zerado!");
        } else if (confirmReset === 'level') {
            const startingBasePoints = basePoints - level;
            
            onUpdate({ 
                level: 0, 
                xp: { ...xp, current: 0 }, 
                // CORREÇÃO: Garante que o valor resetado não seja menor que o padrão de 10
                basePoints: Math.max(10, startingBasePoints)
            });
            toast.success("Nível e XP zerados!");
        }
        setConfirmReset(null);
    };

    const progress = xp.target > 0 ? (xp.current / xp.target) * 100 : 0;

    return (
        <>
            <ConfirmModal
                isOpen={!!confirmReset}
                onClose={() => setConfirmReset(null)}
                onConfirm={handleReset}
                title={`Resetar ${confirmReset === 'xp' ? 'XP' : 'Nível'}`}
                message={`Tem certeza que deseja resetar o ${confirmReset === 'xp' ? 'XP atual' : 'Nível e XP'} do personagem? Esta ação não pode ser desfeita.`}
                confirmVariant={confirmReset === 'level' ? 'confirm' : 'default'}
            />

            <Wrapper $isEditing={isEditing}>
                {isEditing ? (
                    <EditView level={level} xp={xp} basePoints={basePoints} onUpdate={onUpdate} />
                ) : (
                    <DisplayView
                        level={level}
                        xp={xp}
                        progress={progress}
                        isDead={isDead}
                        onXpChange={handleXpChange}
                        onResetRequest={setConfirmReset}
                    />
                )}
            </Wrapper>
        </>
    );
};