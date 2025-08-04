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

// --- Subcomponente para o Modal de Detalhes ---
const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <h3>{item.name}</h3>
      <p><strong>Quantidade:</strong> {item.quantity || 1}</p>
      <p><strong>Peso Unitário:</strong> {item.weight || 0}kg</p>
      {item.rarity && item.rarity !== 'Nenhum' && (
        <p><strong>Raridade:</strong> <RarityBadge rarity={item.rarity}>{item.rarity}</RarityBadge></p>
      )}
      {item.description && (
        <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>
      )}
    </Modal>
  );
};

// --- Subcomponente para cada Item do Inventário ---
const InventoryItem = ({ item, onQuantityChange, onDelete, onShowDetails, isDead }) => (
  <ItemCard onClick={onShowDetails}>
     <ItemInfo>
      <ItemName>{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</ItemName>
      <ItemDetails>
        {item.weight > 0 ? `${item.weight.toFixed(1)}kg` : 'Peso leve'}
        {item.rarity && item.rarity !== 'Nenhum' && (
          // CORREÇÃO: Passa a prop como `$rarity`
          <RarityBadge $rarity={item.rarity}>{item.rarity}</RarityBadge>
        )}
      </ItemDetails>
    </ItemInfo>
    <ItemActions>
      <button onClick={(e) => onQuantityChange(e, item.id, -1)} disabled={isDead}><FaMinus /></button>
      <button onClick={(e) => onQuantityChange(e, item.id, 1)} disabled={isDead}><FaPlus /></button>
      <button className="delete" onClick={(e) => onDelete(e, item.id, item.name)} disabled={isDead}><FaTrash /></button>
    </ItemActions>
  </ItemCard>
);

// --- Componente Principal ---
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
    
    const itemToUpdate = items.find(item => item.id === itemId);
    if (!itemToUpdate) return;
    
    const newItems = items
      .map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, (item.quantity || 1) + delta) }
          : item
      )
      .filter(item => item.quantity > 0); // Filtra itens cuja quantidade chegou a zero
      
    if (newItems.length < items.length) {
        toast.error(`"${itemToUpdate.name}" foi removido da mochila.`);
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
          <span>Carga: {totalWeight.toFixed(1)}kg / {capacity > 0 ? capacity.toFixed(1) : '∞'}kg</span>
          <AddButton onClick={() => setIsAddItemModalOpen(true)} disabled={isDead}>
            <FaPlus /> Adicionar Item
          </AddButton>
        </InventoryHeader>
        <CapacityBar $percentage={percentage} />

        <ItemList>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>Mochila vazia.</p>
          ) : (
            items.map(item => (
              <InventoryItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDeleteItem}
                onShowDetails={() => setDetailsModalItem(item)}
                isDead={isDead}
              />
            ))
          )}
        </ItemList>

        <QuickAccessBar
          inventory={items}
          onConsume={onConsume}
          isDead={isDead}
        />
      </MochilaContainer>

      <AddItemModal 
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSave={handleAddItem}
      />

      <ItemDetailsModal 
        item={detailsModalItem} 
        onClose={() => setDetailsModalItem(null)} 
      />
    </>
  );
};