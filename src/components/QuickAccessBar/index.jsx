import React, { useMemo } from 'react';
import { BarContainer, QuickButton, ButtonIcon, ButtonLabel, ButtonQuantity } from './styles';
import { GiHealthPotion, GiRunningShoe } from 'react-icons/gi';
import { FaBolt } from 'react-icons/fa';

// --- Configuração Centralizada para os Itens de Acesso Rápido ---
const QUICK_ACCESS_CONFIG = [
    { name: 'Cura menor', label: '+5 PV', Icon: GiHealthPotion, color: '#F44336' },
    { name: 'Cura maior', label: '+10 PV', Icon: GiHealthPotion, color: '#F44336' },
    { name: 'Energia menor', label: '+5 PM', Icon: FaBolt, color: '#00BCD4' },
    { name: 'Energia maior', label: '+10 PM', Icon: FaBolt, color: '#00BCD4' },
    { name: 'Adrenalina menor', label: '+1 PA', Icon: GiRunningShoe, color: '#FFC107' },
];

export const QuickAccessBar = ({ inventory = [], onConsume = () => {}, isDead }) => {
    // A linha acima foi corrigida. Adicionamos `= () => {}` à prop `onConsume`.
    // Isso garante que `onConsume` seja sempre uma função, prevenindo o erro.

    const inventoryMap = useMemo(() => {
        return new Map(inventory.map(item => [item.name, item]));
    }, [inventory]);

    return (
        <BarContainer>
            {QUICK_ACCESS_CONFIG.map(({ name, label, Icon, color }) => {
                const inventoryItem = inventoryMap.get(name);
                const quantity = inventoryItem ? inventoryItem.quantity : 0;

                return (
                    <QuickButton
                        key={name}
                        onClick={() => onConsume(name)} // Esta linha agora é segura
                        disabled={isDead || quantity === 0}
                        title={`${name} (x${quantity})`}
                    >
                        <ButtonIcon $color={color}>
                            <Icon />
                        </ButtonIcon>
                        <ButtonLabel>{label}</ButtonLabel>
                        <ButtonQuantity $hasItems={quantity > 0}>
                            {quantity}
                        </ButtonQuantity>
                    </QuickButton>
                );
            })}
        </BarContainer>
    );
};