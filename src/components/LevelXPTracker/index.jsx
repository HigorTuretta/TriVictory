import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus, FaSync, FaSkull } from 'react-icons/fa';
import { ConfirmModal } from '../ConfirmModal';

// Importe os novos componentes de estilo
import {
    Wrapper, LevelDisplay, BarContainer, BarInfo, XPBar, XPProgress,
    Actions, ActionButton, AddXpForm, AddXpInput, ResetActions,
    EditGrid, EditField, RadioGroup
} from './styles';

export const LevelXPTracker = ({
    level = 0,
    xp = { current: 0, target: 100, system: 'unit' },
    basePoints = 12,
    isEditing,
    onUpdate,
    isDead
}) => {
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
        let newBasePoints = basePoints;

        if (newXp >= xp.target && !isSubtracting) {
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

        setXpAmount('');
        setIsAddingXp(false);
        setIsSubtracting(false);
    };

    const handleReset = (type) => {
        if (type === 'xp') {
            onUpdate({ xp: { ...xp, current: 0 } });
            toast.success("XP do nível atual zerado!");
        } else if (type === 'level') {
            onUpdate({ level: 0, xp: { ...xp, current: 0 }, basePoints: 12 }); // Reseta os pontos base também
            toast.success("Nível e XP zerados!");
        }
        setConfirmReset(null);
    };

    const progress = xp.system === 'percentage'
        ? xp.current
        : xp.target > 0 ? (xp.current / xp.target) * 100 : 0;

    // --- MODO DE EDIÇÃO ---
    if (isEditing) {
        // ... (código do modo de edição permanece o mesmo)
    }

    // --- MODO DE VISUALIZAÇÃO ---
    return (
        <>
            <ConfirmModal
                isOpen={!!confirmReset}
                onClose={() => setConfirmReset(null)}
                onConfirm={() => handleReset(confirmReset)}
                title={`Resetar ${confirmReset === 'xp' ? 'XP' : 'Nível'}`}
                message={`Tem certeza que deseja resetar o ${confirmReset === 'xp' ? 'XP atual' : 'Nível e XP'} do personagem? Esta ação não pode ser desfeita.`}
                confirmButtonClass={confirmReset === 'level' ? 'danger' : ''}
            />

            <Wrapper $isEditing={isEditing}>
                <LevelDisplay>
                    <span>Nível</span>
                    <span>{level}</span>
                </LevelDisplay>

                <BarContainer>
                    <BarInfo>
                        <span>Progresso</span>
                        <ResetActions>
                            <button title="Resetar XP Atual" onClick={() => setConfirmReset('xp')} disabled={isDead}>
                                <FaSync size={12} />
                            </button>
                            <button title="Resetar Nível e XP" className="danger" onClick={() => setConfirmReset('level')} disabled={isDead}>
                                <FaSkull size={12} />
                            </button>
                        </ResetActions>
                    </BarInfo>
                    <XPBar>
                        <XPProgress
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        />
                    </XPBar>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#888' }}>
                        {xp.current} / {xp.target} XP
                    </div>
                </BarContainer>

                {isAddingXp ? (
                    <AddXpForm onSubmit={handleXpChange}>
                        <AddXpInput
                            type="number"
                            value={xpAmount}
                            onChange={(e) => setXpAmount(e.target.value)}
                            placeholder="Valor"
                            autoFocus
                            onBlur={() => {
                                if (!xpAmount) {
                                    setIsAddingXp(false);
                                    setIsSubtracting(false);
                                }
                            }}
                        />
                        <ActionButton type="submit" title={isSubtracting ? 'Confirmar Remoção' : 'Confirmar Adição'}>
                            {isSubtracting ? <FaMinus /> : <FaPlus />}
                        </ActionButton>
                    </AddXpForm>
                ) : (
                    <Actions>
                        <ActionButton
                            title="Remover XP"
                            className="remove"
                            onClick={() => { setIsAddingXp(true); setIsSubtracting(true); }}
                            disabled={isDead}
                        >
                            <FaMinus />
                        </ActionButton>
                        <ActionButton
                            title="Adicionar XP"
                            onClick={() => { setIsAddingXp(true); setIsSubtracting(false); }}
                            disabled={isDead}
                        >
                            <FaPlus />
                        </ActionButton>
                    </Actions>
                )}
            </Wrapper>
        </>
    );
};
