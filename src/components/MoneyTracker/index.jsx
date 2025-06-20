import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {
    MoneyContainer, MoneyDisplay, Amount, CurrencyType, ActionForm,
    AmountInput, ActionButton, EditContainer, EditRow
} from './styles';
import { moedas } from '../../data/gameData'; // Importa a lista de moedas

export const MoneyTracker = ({ money, onUpdate, isEditing, isDead }) => {
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [isSubtracting, setIsSubtracting] = useState(false);

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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ActionButton className="remove" onClick={() => { setShowForm(true); setIsSubtracting(true); }} disabled={isDead}>
                        <FaMinus />
                    </ActionButton>
                    <ActionButton className="add" onClick={() => { setShowForm(true); setIsSubtracting(false); }} disabled={isDead}>
                        <FaPlus />
                    </ActionButton>
                </div>
            )}
        </MoneyContainer>
    );
};