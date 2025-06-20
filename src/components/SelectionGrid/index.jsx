import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Garanta que o toast está importado
import { Modal } from '../Modal';
import { CustomItemModal } from '../CustomItemModal';
import { ConfirmModal } from '../ConfirmModal';
import { FaPen, FaTrash } from 'react-icons/fa';
import { 
    Grid, ItemCard, ItemName, ItemCost, SearchBar, GridContainer, SelectedItemsContainer, 
    SelectedItem, RemoveButton, GridHeader, AddCustomButton, HintText, CustomItemControls
} from './styles';
import { ChoiceButton } from '../../screens/CharacterSheet/styles';

export const SelectionGrid = ({ items, selectedItems, disabledItems, onAddItem, onRemoveItem, listName, onAddCustomItem, onUpdateCustomItem, onDeleteCustomItem }) => {
    const [modalContent, setModalContent] = useState(null);
    const [subOptionModalItem, setSubOptionModalItem] = useState(null);
    const [customItemModalOpen, setCustomItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemClick = (item) => {
        if (disabledItems.includes(item.nome)) return;
        if (item.opcoes) {
            setSubOptionModalItem(item);
        } else {
            onAddItem(item);
        }
    }
    
    const handleSaveCustom = (customItem) => {
        const typeMap = { 'Perícias': 'pericias', 'Vantagens': 'vantagens', 'Desvantagens': 'desvantagens' };
        const type = typeMap[listName];
        if (customItem.id) {
            onUpdateCustomItem(type, customItem);
        } else {
            onAddCustomItem(type, customItem);
        }
    }

    const handleDeleteConfirm = () => {
        const typeMap = { 'Perícias': 'pericias', 'Vantagens': 'vantagens', 'Desvantagens': 'desvantagens' };
        const type = typeMap[listName];
        
        // Adiciona o toast antes de deletar
        toast.success(`"${deletingItem.nome}" customizado deletado com sucesso!`);
        
        onDeleteCustomItem(type, deletingItem.id);
        setDeletingItem(null);
    }

    return (
        <>
            <GridHeader>
                <SearchBar
                    type="text"
                    placeholder={`Buscar em ${listName}...`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddCustomButton onClick={() => { setEditingItem(null); setCustomItemModalOpen(true); }}>
                    + Criar Customizada
                </AddCustomButton>
            </GridHeader>

            <SelectedItemsContainer>
                {selectedItems.map(item => (
                    <SelectedItem key={item.id} $fromArchetype={item.fromArchetype}>
                        {item.nome} {item.subOption && `(${item.subOption})`}
                        <RemoveButton onClick={() => onRemoveItem(item.id)}>&times;</RemoveButton>
                    </SelectedItem>
                ))}
            </SelectedItemsContainer>

            <GridContainer>
                <Grid>
                    {filteredItems.map(item => {
                        const isDisabled = disabledItems.includes(item.nome);
                        return (
                            <ItemCard
                                key={item.id || item.nome}
                                disabled={isDisabled}
                                $isCustom={item.custom}
                                onClick={() => !isDisabled && handleItemClick(item)}
                                onContextMenu={(e) => { e.preventDefault(); setModalContent(item); }}
                            >
                                <ItemName>{item.nome}</ItemName>
                                <ItemCost>{item.custo > 0 ? `+${item.custo}` : item.custo}pt</ItemCost>
                                {item.custom && !isDisabled && (
                                    <CustomItemControls>
                                        <button title="Editar Item" onClick={(e) => { e.stopPropagation(); setEditingItem(item); setCustomItemModalOpen(true); }}><FaPen /></button>
                                        <button title="Deletar Item" className="delete" onClick={(e) => { e.stopPropagation(); setDeletingItem(item); }}><FaTrash /></button>
                                    </CustomItemControls>
                                )}
                            </ItemCard>
                        )
                    })}
                </Grid>
            </GridContainer>

            <HintText>
                Clique para selecionar. Botão direito para ver detalhes.
            </HintText>

            <CustomItemModal
                isOpen={customItemModalOpen}
                onClose={() => setCustomItemModalOpen(false)}
                onSave={handleSaveCustom}
                itemType={listName.slice(0, -1)}
                initialData={editingItem}
            />
            <ConfirmModal
                isOpen={!!deletingItem}
                onClose={() => setDeletingItem(null)}
                onConfirm={handleDeleteConfirm}
                title={`Deletar ${listName.slice(0, -1)}`}
                message={`Tem certeza que deseja deletar permanentemente "${deletingItem?.nome}"?`}
            />
            {modalContent && (
                <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
                    <h3>{modalContent.nome}</h3>
                    <p><strong>Custo:</strong> {modalContent.custo > 0 ? `+${modalContent.custo}` : modalContent.custo}pt</p>
                    <p style={{marginTop: '1rem'}}>{modalContent.descricao}</p>
                </Modal>
            )}
            {subOptionModalItem && (
                <Modal isOpen={!!subOptionModalItem} onClose={() => setSubOptionModalItem(null)}>
                    <h3>Escolha uma opção para: {subOptionModalItem.nome}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        {subOptionModalItem.opcoes.map(opt => (
                            <ChoiceButton key={opt} onClick={() => {
                                onAddItem(subOptionModalItem, opt);
                                if (!subOptionModalItem.repetivel) {
                                    setSubOptionModalItem(null);
                                }
                            }}>
                                {opt}
                            </ChoiceButton>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
};