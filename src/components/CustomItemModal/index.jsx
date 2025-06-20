import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../Modal';
import { Form, FormGroup, Label, Input, Textarea, SaveButton } from './styles';

export const CustomItemModal = ({ isOpen, onClose, onSave, itemType, initialData }) => {
    const [item, setItem] = useState({ nome: '', custo: 0, descricao: '' });

    useEffect(() => {
        // Se recebermos dados iniciais (modo edição), preenche o formulário
        if (initialData) {
            setItem(initialData);
        } else {
            // Senão (modo criação), reseta o formulário
            setItem({ nome: '', custo: 0, descricao: '' });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: name === 'custo' ? parseInt(value) || 0 : value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!item.nome || !item.descricao) {
            toast.error("Nome e Descrição são obrigatórios!");
            return;
        }
        onSave(item);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{initialData ? `Editar` : 'Criar'} {itemType} Customizada</h3>
            <Form onSubmit={handleSave}>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input type="text" name="nome" value={item.nome} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Custo em Pontos (Use valores negativos para Desvantagens)</Label>
                    <Input type="number" name="custo" value={item.custo} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Textarea name="descricao" value={item.descricao} onChange={handleChange} rows="4" required />
                </FormGroup>
                <SaveButton type="submit">Salvar Item</SaveButton>
            </Form>
        </Modal>
    );
};