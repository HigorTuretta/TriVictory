import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../Modal';
import { Form, FormGroup, Label, Input, Textarea, SaveButton } from './styles';

// Define o estado inicial fora do componente para clareza e reutilização.
const INITIAL_STATE = { nome: '', custo: 0, descricao: '' };

export const CustomItemModal = ({ isOpen, onClose, onSave, itemType, initialData }) => {
    const [item, setItem] = useState(INITIAL_STATE);

    // Determina se o modal está em modo de edição para simplificar a lógica.
    const isEditing = !!initialData;

    useEffect(() => {
        // Popula o formulário com dados iniciais se estiver editando,
        // caso contrário, reseta para o estado inicial sempre que o modal for aberto.
        if (isEditing) {
            setItem(initialData);
        } else {
            setItem(INITIAL_STATE);
        }
    }, [initialData, isEditing, isOpen]); // A dependência de `isOpen` garante o reset ao reabrir.

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Garante que o campo de custo seja sempre tratado como um número.
        const processedValue = type === 'number' ? parseInt(value, 10) || 0 : value;
        setItem(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!item.nome.trim() || !item.descricao.trim()) {
            toast.error("Nome e Descrição são obrigatórios!");
            return;
        }
        onSave(item);
        onClose(); // Fecha o modal após o salvamento bem-sucedido.
    };

    // Textos dinâmicos para o modal, melhorando a experiência do usuário.
    const modalTitle = `${isEditing ? 'Editar' : 'Criar'} ${itemType} Customizada`;
    const saveButtonText = isEditing ? 'Salvar Alterações' : `Criar ${itemType}`;

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{modalTitle}</h3>
            <Form onSubmit={handleSave}>
                <FormGroup>
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" type="text" name="nome" value={item.nome} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="custo">Custo em Pontos (Use valores negativos para Desvantagens)</Label>
                    <Input id="custo" type="number" name="custo" value={item.custo} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" name="descricao" value={item.descricao} onChange={handleChange} rows="4" required />
                </FormGroup>
                <SaveButton type="submit">{saveButtonText}</SaveButton>
            </Form>
        </Modal>
    );
};