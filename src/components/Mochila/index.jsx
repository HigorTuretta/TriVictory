import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { Modal } from '../Modal';
import { AddItemModal } from '../AddItemModal';
import { QuickAccessBar } from '../QuickAccessBar';
import {
  MochilaContainer, InventoryHeader, CapacityBar, ItemList, ItemCard,
  ItemInfo, ItemName, ItemDetails, ItemActions, AddButton, RarityBadge
} from './styles';

// A prop onApplyEffect foi renomeada para onConsume para maior clareza
export const Mochila = ({ items = [], onUpdate, capacity, totalWeight, isDead, onConsume }) => {
  const [detailsModalItem, setDetailsModalItem] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleAddItem = (newItem) => {
    const newItems = [...items, { ...newItem, id: uuidv4() }];
    onUpdate(newItems);
    toast.success(`"${newItem.name}" foi adicionado à mochila.`);
  };

  const handleQuantityChange = (e, itemId, delta) => {
    e.stopPropagation();
    let newItems = items.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(0, (item.quantity || 1) + delta) }
        : item
    );
    const targetItem = newItems.find(item => item.id === itemId);
    if (targetItem && targetItem.quantity === 0) {
      newItems = newItems.filter(item => item.id !== itemId);
      toast.error(`"${targetItem.name}" foi removido da mochila.`);
    }
    onUpdate(newItems);
  };

  const handleDeleteItem = (e, itemId, itemName) => {
    e.stopPropagation();
    const newItems = items.filter(item => item.id !== itemId);
    onUpdate(newItems);
    toast.error(`"${itemName}" foi removido da mochila.`);
  };

  const percentage = capacity > 0 ? (totalWeight / capacity) * 100 : 0;

  return (
    <>
      <MochilaContainer>
        <InventoryHeader>
          <span>Carga: {totalWeight.toFixed(1)}kg / {capacity.toFixed(1)}kg</span>
          <AddButton onClick={() => setIsAddItemModalOpen(true)} disabled={isDead}>
            <FaPlus /> Adicionar Item
          </AddButton>
        </InventoryHeader>
        <CapacityBar $percentage={percentage} />

        <ItemList>
          {items.length === 0 ? (
            <p>Mochila vazia.</p>
          ) : (
            items.map(item => (
              <ItemCard key={item.id} onClick={() => setDetailsModalItem(item)}>
                <ItemInfo>
                  <ItemName>{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</ItemName>
                  <ItemDetails>
                    {item.weight > 0 ? `${item.weight}kg` : 'Peso leve'}
                    {item.rarity !== 'Nenhum' && <RarityBadge rarity={item.rarity}>{item.rarity}</RarityBadge>}
                  </ItemDetails>
                </ItemInfo>
                <ItemActions>
                  <button onClick={(e) => handleQuantityChange(e, item.id, -1)} disabled={isDead}><FaMinus /></button>
                  <button onClick={(e) => handleQuantityChange(e, item.id, 1)} disabled={isDead}><FaPlus /></button>
                  <button className="delete" onClick={(e) => handleDeleteItem(e, item.id, item.name)} disabled={isDead}><FaTrash /></button>
                </ItemActions>
              </ItemCard>
            ))
          )}
        </ItemList>

        <QuickAccessBar
          inventory={items}
          onConsume={onConsume} // A prop onConsume será passada diretamente para a QuickAccessBar
          isDead={isDead}
        />
      </MochilaContainer>

      <AddItemModal 
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSave={handleAddItem}
      />

      {detailsModalItem && (
        <Modal isOpen={!!detailsModalItem} onClose={() => setDetailsModalItem(null)}>
          <h3>{detailsModalItem.name}</h3>
          <p><strong>Quantidade:</strong> {detailsModalItem.quantity || 1}</p>
          <p><strong>Peso Unitário:</strong> {detailsModalItem.weight || 0}kg</p>
          {detailsModalItem.rarity !== 'Nenhum' && <p><strong>Raridade:</strong> <RarityBadge rarity={detailsModalItem.rarity}>{detailsModalItem.rarity}</RarityBadge></p>}
          {detailsModalItem.description && <p style={{ marginTop: '1rem' }}>{detailsModalItem.description}</p>}
        </Modal>
      )}
    </>
  );
};