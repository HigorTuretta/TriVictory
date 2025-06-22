import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Form, FormGroup, Label, Input, Select, Textarea, SaveButton, QuickAddContainer, QuickAddButton } from './styles';
import toast from 'react-hot-toast';

const INITIAL_STATE = { name: '', quantity: 1, weight: 0, description: '', rarity: 'Nenhum' };

const quickPotions = [
  { name: 'Cura menor', weight: 0.1, rarity: 'Comum', description: 'Recupera 5 PV.' },
  { name: 'Cura maior', weight: 0.2, rarity: 'Incomum', description: 'Recupera 10 PV.' },
  { name: 'Energia menor', weight: 0.1, rarity: 'Incomum', description: 'Recupera 5 PM.' },
  { name: 'Energia maior', weight: 0.2, rarity: 'Raro', description: 'Recupera 10 PM.' },
  { name: 'Adrenalina menor', weight: 0.1, rarity: 'Raro', description: 'Recupera 1 PA.' },
];

export const AddItemModal = ({ isOpen, onClose, onSave }) => {
  const [item, setItem] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const numericValue = type === 'number' ? Math.max(0, parseFloat(value) || 0) : value;
    setItem(prev => ({
      ...prev,
      [name]: type === 'number' ? numericValue : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!item.name.trim()) {
      toast.error('O nome do item é obrigatório.');
      return;
    }
    onSave({ ...item, quantity: Math.max(1, item.quantity) });
    setItem(INITIAL_STATE);
    onClose();
  };

  const handleQuickAdd = (potion) => {
    setItem(prev => ({
      ...prev,
      ...potion,
    }));
    toast(`"${potion.name}" pronto para adicionar.`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Adicionar Novo Item</h3>
      <Form onSubmit={handleSave}>
        
        <FormGroup>
          <Label>Adição Rápida</Label>
          <QuickAddContainer>
            {quickPotions.map(potion => (
              <QuickAddButton key={potion.name} type="button" onClick={() => handleQuickAdd(potion)}>
                + {potion.name}
              </QuickAddButton>
            ))}
          </QuickAddContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name">Nome do Item</Label>
          <Input id="name" name="name" type="text" value={item.name} onChange={handleChange} required />
        </FormGroup>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormGroup>
            <Label htmlFor="quantity">Quantidade</Label>
            <Input id="quantity" name="quantity" type="number" value={item.quantity} onChange={handleChange} min="1" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="weight">Peso (Unitário)</Label>
            <Input id="weight" name="weight" type="number" value={item.weight} onChange={handleChange} step="0.1" min="0" />
          </FormGroup>
        </div>

        <FormGroup>
            <Label htmlFor="rarity">Raridade (Consumível)</Label>
            <Select id="rarity" name="rarity" value={item.rarity} onChange={handleChange}>
                <option>Nenhum</option>
                <option>Comum</option>
                <option>Incomum</option>
                <option>Raro</option>
                <option>Lendário</option>
            </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" name="description" rows="3" value={item.description} onChange={handleChange} />
        </FormGroup>
        
        <SaveButton type="submit">Adicionar à Mochila</SaveButton>
      </Form>
    </Modal>
  );
};