import React, { useState, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { moedas } from '../../data/gameData';
import {
    MoneyContainer, MoneyDisplay, Amount, CurrencyType, ActionForm, AmountInput,
    ActionButton, EditContainer, EditRow, QuickControls, QuickButton, FormButton
} from './styles';

// --- Configuração para os botões de ação rápida ---
const quickActions = [
    { value: 1, variant: 'subtract', label: '-1' },
    { value: 10, variant: 'subtract', label: '-10' },
    { value: 1, variant: 'add', label: '+1' },
    { value: 10, variant: 'add', label: '+10' },
];

// --- Subcomponente para a Visão de Edição ---
const EditView = ({ money, onUpdate }) => {
    // Valores padrão para evitar erros se a prop 'money' for nula.
    const currentMoney = money || { amount: 0, type: { nome: '' } };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type') {
            const newType = moedas.find(m => m.nome === value);
            onUpdate({ ...currentMoney, type: newType });
        } else {
            onUpdate({ ...currentMoney, [name]: parseInt(value) || 0 });
        }
    };

    return (
        <EditContainer>
            <EditRow>
                <label htmlFor="money-type">Tipo de Moeda</label>
                <select id="money-type" name="type" value={currentMoney.type.nome} onChange={handleChange}>
                    {moedas.map(m => <option key={m.nome} value={m.nome}>{m.nome}</option>)}
                </select>
            </EditRow>
            <EditRow>
                <label htmlFor="money-amount">Quantidade Inicial</label>
                <input id="money-amount" type="number" name="amount" value={currentMoney.amount} onChange={handleChange} />
            </EditRow>
        </EditContainer>
    );
};

// --- Subcomponente para a Visão de Jogo ---
const DisplayView = ({ money, onUpdate, isDead, isOwner }) => {
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [isSubtracting, setIsSubtracting] = useState(false);
    const holdTimeoutRef = useRef(null);
    const holdIntervalRef = useRef(null);
    const controlsDisabled = isDead || !isOwner;

    // Valores padrão para segurança.
    const currentMoney = money || { amount: 0, type: { sigla: '--' } };

    // **CORREÇÃO PRINCIPAL**: Esta função agora calcula o novo objeto e o passa para 'onUpdate'.
    const handleQuickChange = useCallback((value) => {
        const newAmount = Math.max(0, currentMoney.amount + value);
        onUpdate({ ...currentMoney, amount: newAmount });
    }, [currentMoney, onUpdate]);

    const startHold = useCallback((value) => {
        handleQuickChange(value);
        holdTimeoutRef.current = setTimeout(() => {
            holdIntervalRef.current = setInterval(() => handleQuickChange(value), 150);
        }, 500);
    }, [handleQuickChange]);

    const stopHold = useCallback(() => {
        clearTimeout(holdTimeoutRef.current);
        clearInterval(holdIntervalRef.current);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const value = parseInt(amount, 10);
        if (isNaN(value) || value <= 0) {
            toast.error("Valor inválido.");
            return;
        }
        const finalAmount = isSubtracting ? -value : value;
        handleQuickChange(finalAmount);
        setShowForm(false);
        setAmount('');
    };

    return (
        <MoneyContainer>
            <MoneyDisplay>
                <Amount>{currentMoney.amount.toLocaleString('pt-BR')}</Amount>
                <CurrencyType>{currentMoney.type.sigla}</CurrencyType>
            </MoneyDisplay>

            {showForm ? (
                <ActionForm onSubmit={handleFormSubmit}>
                    <AmountInput
                        type="number"
                        value={amount}
                        onChange={(e) => /^\d*$/.test(e.target.value) && setAmount(e.target.value)}
                        placeholder="Valor"
                        autoFocus
                    />
                    <div>
                        <FormButton type="submit">OK</FormButton>
                        <FormButton type="button" $variant="cancel" onClick={() => setShowForm(false)}>
                            Cancelar
                        </FormButton>
                    </div>
                </ActionForm>
            ) : (
                <>
                    <QuickControls>
                        {quickActions.map(({ value, variant, label }) => (
                            <QuickButton
                                key={label}
                                $variant={variant}
                                onMouseDown={() => startHold(variant === 'add' ? value : -value)}
                                onMouseUp={stopHold}
                                onMouseLeave={stopHold}
                                onTouchStart={() => startHold(variant === 'add' ? value : -value)}
                                onTouchEnd={stopHold}
                               disabled={controlsDisabled || (variant === 'subtract' && currentMoney.amount < value)}
                                title={`${variant === 'add' ? 'Adicionar' : 'Diminuir'} ${value} (segure)`}
                            >
                                {label}
                            </QuickButton>
                        ))}
                    </QuickControls>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                        <ActionButton $variant="subtract" onClick={() => { setShowForm(true); setIsSubtracting(true); }}  disabled={controlsDisabled} title="Remover valor personalizado"><FaMinus /></ActionButton>
                        <ActionButton $variant="add" onClick={() => { setShowForm(true); setIsSubtracting(false); }}  disabled={controlsDisabled} title="Adicionar valor personalizado"><FaPlus /></ActionButton>
                    </div>
                </>
            )}
        </MoneyContainer>
    );
};

// --- Componente Principal ---
export const MoneyTracker = ({ money, onUpdate, isEditing, isDead, isOwner }) => {
    // Guarda de segurança para o caso da prop 'money' ainda não ter chegado.
    if (!money) {
        return <MoneyContainer>Carregando dinheiro...</MoneyContainer>;
    }

    return isEditing
        ? <EditView money={money} onUpdate={onUpdate} />
        : <DisplayView money={money} onUpdate={onUpdate} isDead={isDead} isOwner={isOwner} />;
};