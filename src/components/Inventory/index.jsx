import React, { useState } from 'react';
import { InventoryContainer, ItemList, Item, DeleteButton, AddItemForm, AddButton } from './styles';

export const Inventory = ({ items, onUpdate }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (index) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <InventoryContainer>
      <AddItemForm onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar novo item..."
        />
        <AddButton type="submit">Adicionar</AddButton>
      </AddItemForm>
      <ItemList>
        {items.map((item, index) => (
          <Item key={index}>
            <span>{item}</span>
            <DeleteButton onClick={() => handleDeleteItem(index)}>Remover</DeleteButton>
          </Item>
        ))}
      </ItemList>
    </InventoryContainer>
  );
};