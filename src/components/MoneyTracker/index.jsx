import React, { useState, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {
    MoneyContainer, MoneyDisplay, Amount, CurrencyType, ActionForm,
    AmountInput, ActionButton, EditContainer, EditRow, QuickControls, QuickButton
} from './styles';
import { moedas } from '../../data/gameData'; // Importa a lista de moedas

export const MoneyTracker = ({ money, onUpdate, isEditing, isDead }) => {
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [isSubtracting, setIsSubtracting] = useState(false);
    
    // Refs para controle de segurar botão
    const holdTimeoutRef = useRef(null);
    const holdIntervalRef = useRef(null);

    // Função para iniciar o hold (segurar botão)
    const startHold = useCallback((callback, initialDelay = 500, repeatDelay = 150) => {
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

    // Funções para mudanças rápidas
    const quickAdd = useCallback((value) => {
        const newAmount = money.amount + value;
        onUpdate({ ...money, amount: newAmount });
    }, [money, onUpdate]);

    const quickSubtract = useCallback((value) => {
        const newAmount = Math.max(0, money.amount - value);
        onUpdate({ ...money, amount: newAmount });
    }, [money, onUpdate]);

    const handleUpdateAmount = (e) => {
        e.preventDefault();
        const value = parseInt(amount, 10);
        if (isNaN(value) || value <= 0) {
            toast.error("Valor inválido.");
            return;
        }

        const newAmount = isSubtracting
            ? Math.max(0, money.amount - value)
            : money.amount + value;

        onUpdate({ ...money, amount: newAmount });
        setShowForm(false);
        setAmount('');
    };

    const handleTypeChange = (e) => {
        const newType = moedas.find(m => m.nome === e.target.value);
        onUpdate({ ...money, type: newType });
    };

    if (isEditing) {
        return (
            <EditContainer>
                <EditRow>
                    <label>Tipo de Moeda</label>
                    <select value={money.type.nome} onChange={handleTypeChange}>
                        {moedas.map(m => <option key={m.nome} value={m.nome}>{m.nome}</option>)}
                    </select>
                </EditRow>
                <EditRow>
                    <label>Quantidade Inicial</label>
                    <input
                        type="number"
                        value={money.amount}
                        onChange={(e) => onUpdate({ ...money, amount: parseInt(e.target.value) || 0 })}
                    />
                </EditRow>
            </EditContainer>
        );
    }

    return (
        <MoneyContainer>
            <MoneyDisplay>
                <Amount>{money.amount.toLocaleString('pt-BR')}</Amount>
                <CurrencyType>{money.type.sigla}</CurrencyType>
            </MoneyDisplay>
            
            {showForm ? (
                <ActionForm onSubmit={handleUpdateAmount}>
                    <div className="input-row">
                        <AmountInput
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) setAmount(val);
                            }}
                            placeholder="Valor"
                            min="1"
                            step="1"
                            autoFocus
                        />
                    </div>

                    <div className="button-row">
                        <button type="submit">OK</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                </ActionForm>
            ) : (
                <>
                    {/* Controles Rápidos */}
                    <QuickControls>
                        <QuickButton 
                            onMouseDown={() => startHold(() => quickSubtract(1))}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={() => startHold(() => quickSubtract(1))}
                            onTouchEnd={stopHold}
                            disabled={isDead || money.amount <= 0}
                            title="Diminuir 1 (segure para continuar)"
                            className="subtract"
                        >
                            -1
                        </QuickButton>
                        
                        <QuickButton 
                            onMouseDown={() => startHold(() => quickSubtract(10))}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={() => startHold(() => quickSubtract(10))}
                            onTouchEnd={stopHold}
                            disabled={isDead || money.amount < 10}
                            title="Diminuir 10 (segure para continuar)"
                            className="subtract"
                        >
                            -10
                        </QuickButton>
                        
                        <QuickButton 
                            onMouseDown={() => startHold(() => quickAdd(1))}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={() => startHold(() => quickAdd(1))}
                            onTouchEnd={stopHold}
                            disabled={isDead}
                            title="Adicionar 1 (segure para continuar)"
                            className="add"
                        >
                            +1
                        </QuickButton>
                        
                        <QuickButton 
                            onMouseDown={() => startHold(() => quickAdd(10))}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={() => startHold(() => quickAdd(10))}
                            onTouchEnd={stopHold}
                            disabled={isDead}
                            title="Adicionar 10 (segure para continuar)"
                            className="add"
                        >
                            +10
                        </QuickButton>
                    </QuickControls>
                    
                    {/* Controles de Formulário */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <ActionButton 
                            className="remove" 
                            onClick={() => { setShowForm(true); setIsSubtracting(true); }} 
                            disabled={isDead}
                            title="Remover valor personalizado"
                        >
                            <FaMinus />
                        </ActionButton>
                        <ActionButton 
                            className="add" 
                            onClick={() => { setShowForm(true); setIsSubtracting(false); }} 
                            disabled={isDead}
                            title="Adicionar valor personalizado"
                        >
                            <FaPlus />
                        </ActionButton>
                    </div>
                </>
            )}
        </MoneyContainer>
    );
};

