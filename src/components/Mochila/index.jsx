import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa';
import { Modal } from '../Modal';
import {
    MochilaContainer, InventoryHeader, CapacityBar, ItemList, ItemCard,
    ItemName, ItemQuantity, ItemWeight, ItemActions, ItemForm, FormGrid,
    FormGroup, FormLabel, FormActions
} from './styles';

export const Mochila = ({ items, onUpdate, capacity, totalWeight, isDead }) => {
    const [detailsModalItem, setDetailsModalItem] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', quantity: 1, weight: 0, description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'quantity' || name === 'weight' ? parseFloat(value) || 0 : value;
        setNewItem(prev => ({ ...prev, [name]: parsedValue }));
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.name) {
            toast.error("O item precisa de um nome!");
            return;
        }
        onUpdate([...items, { ...newItem, id: uuidv4() }]);
        setNewItem({ name: '', quantity: 1, weight: 0, description: '' });
        toast.success("Item adicionado à mochila!");
    };

    const handleDeleteItem = (id) => {
        onUpdate(items.filter(i => i.id !== id));
        toast.success("Item removido da mochila!");
    };

    const handleQuantityChange = (e, id, amount) => {
        e.stopPropagation(); // Impede que o modal de detalhes abra
        const updatedItems = items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(0, (item.quantity || 0) + amount);
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean);
        onUpdate(updatedItems);
    };

    const weightPercentage = capacity > 0 ? Math.min((totalWeight / capacity) * 100, 100) : 0;

    return (
        <>
            {detailsModalItem && (
                <Modal isOpen={!!detailsModalItem} onClose={() => setDetailsModalItem(null)}>
                    <h3>{detailsModalItem.name}</h3>
                    <p><strong>Quantidade:</strong> {detailsModalItem.quantity}</p>
                    <p><strong>Peso Unitário:</strong> {detailsModalItem.weight}kg</p>
                    <p style={{ marginTop: '1rem' }}>{detailsModalItem.description || "Sem descrição."}</p>
                </Modal>
            )}

            <MochilaContainer>
                <InventoryHeader>
                    <div>
                        <p>Carga: {totalWeight.toFixed(1)}kg / {capacity.toFixed(1)}kg</p>
                        <CapacityBar $percentage={weightPercentage} />
                    </div>
                </InventoryHeader>
                <ItemForm onSubmit={handleAddItem}>
                    <FormGrid>
                        <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Nome do Item</FormLabel>
                            <input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Espada Longa" required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Qtd.</FormLabel>
                            <input name="quantity" type="number" value={newItem.quantity} onChange={handleInputChange} min="1" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Peso (kg)</FormLabel>
                            <input name="weight" type="number" value={newItem.weight} onChange={handleInputChange} step="0.1" min="0" />
                        </FormGroup>
                    </FormGrid>
                    <FormGroup>
                        <FormLabel>Descrição (Opcional)</FormLabel>
                        <textarea name="description" value={newItem.description} onChange={handleInputChange} rows="2" />
                    </FormGroup>
                    <FormActions>
                        <button type="submit" disabled={isDead}>
                            + Adicionar
                        </button>
                    </FormActions>
                </ItemForm>
                <ItemList>
                    {items.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            Mochila vazia. Adicione um item abaixo.
                        </p>
                    )}
                    {items.map(item => (
                        <ItemCard key={item.id} onClick={() => setDetailsModalItem(item)} title="Ver detalhes">
                            <ItemName>{item.name}</ItemName>
                            <ItemQuantity>x{item.quantity}</ItemQuantity>
                            <ItemWeight>{((item.weight || 0) * (item.quantity || 1)).toFixed(1)}kg</ItemWeight>
                            <ItemActions>
                                <button onClick={(e) => handleQuantityChange(e, item.id, -1)} disabled={isDead} title="Diminuir"><FaMinus size={10} /></button>
                                <button onClick={(e) => handleQuantityChange(e, item.id, 1)} disabled={isDead} title="Aumentar"><FaPlus size={10} /></button>
                                <button className="delete" onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id) }} disabled={isDead} title="Remover"><FaTrash size={12} /></button>
                            </ItemActions>
                        </ItemCard>
                    ))}
                </ItemList>


            </MochilaContainer>
        </>
    );
};