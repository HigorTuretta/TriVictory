import React from 'react';
import { BarContainer, QuickButton, ButtonIcon, ButtonLabel, ButtonQuantity } from './styles';
import { GiHealthPotion } from 'react-icons/gi';
import { FaRunning } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
const getIcon = (itemName) => {
    if (itemName.includes('Cura')) return <GiHealthPotion />;
    if (itemName.includes('Energia')) return <SlEnergy />;
    if (itemName.includes('Adrenalina')) return <FaRunning />;
    return null;
};

export const QuickAccessBar = ({ inventory, onConsume, isDead }) => {
    const quickItems = [
        { name: 'Cura menor', label: '+5 PV' },
        { name: 'Cura maior', label: '+10 PV' },
        { name: 'Energia menor', label: '+5 PM' },
        { name: 'Energia maior', label: '+10 PM' },
        { name: 'Adrenalina menor', label: '+1 PA' },
    ];

    return (
        <BarContainer>
            {quickItems.map(quickItem => {
                const inventoryItem = inventory.find(i => i.name === quickItem.name);
                const quantity = inventoryItem ? inventoryItem.quantity : 0;

                return (
                    <QuickButton
                        key={quickItem.name}
                        onClick={() => onConsume(quickItem.name)}
                        disabled={isDead || quantity === 0}
                        title={`${quickItem.name} (x${quantity})`}
                    >
                        <ButtonIcon>{getIcon(quickItem.name)}</ButtonIcon>
                        <ButtonLabel>{quickItem.label}</ButtonLabel>
                        <ButtonQuantity>{quantity}</ButtonQuantity>
                    </QuickButton>
                );
            })}
        </BarContainer>
    );
};