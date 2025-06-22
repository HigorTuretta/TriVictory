import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../Modal';
import { CustomItemModal } from '../CustomItemModal';
import { ConfirmModal } from '../ConfirmModal';
import { FaPen, FaTrash } from 'react-icons/fa';
import { 
    Grid, 
    ItemCard, 
    ItemName, 
    ItemCost, 
    SearchBar, 
    GridContainer, 
    SelectedItemsContainer, 
    SelectedItem, 
    RemoveButton, 
    GridHeader, 
    AddCustomButton, 
    HintText, 
    CustomItemControls,
    SpecializationModalContent, 
    SpecializationInput,
    DisclaimerText,
    CounterBadge
} from './styles';
import { ChoiceButton } from '../../screens/CharacterSheet/styles'// Usando o botão já estilizado

export const SelectionGrid = ({ 
    items, 
    selectedItems = [], 
    lockedItems = new Set(), 
    itemCounts = {},
    onAddItem, 
    onRemoveItem, 
    listName,
    onAddCustomItem,
    onUpdateCustomItem,
    onDeleteCustomItem
}) => {
    const [modalContent, setModalContent] = useState(null);
    const [subOptionModalItem, setSubOptionModalItem] = useState(null);
    const [customItemModalOpen, setCustomItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationModalItem, setSpecializationModalItem] = useState(null);
    const [specializationName, setSpecializationName] = useState('');

    const filteredItems = items.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemClick = (item) => {
        if (listName === 'Perícias') {
            setSpecializationModalItem(item);
            return;
        }

        if (item.opcoes) {
            setSubOptionModalItem(item);
        } else {
            onAddItem(item, null);
        }
    };

    const handleConfirmSpecialization = (pericia, isSpecialization) => {
        if (isSpecialization) {
            if (!specializationName.trim()) {
                toast.error('Por favor, defina um nome para a especialização.');
                return;
            }
            onAddItem({ ...pericia, isSpecialization: true }, specializationName.trim());
        } else {
            onAddItem(pericia, null);
        }
        setSpecializationModalItem(null);
        setSpecializationName('');
    };
    
    const handleSaveCustom = (customItemData) => {
        if (editingItem) {
            onUpdateCustomItem({ ...editingItem, ...customItemData });
            setEditingItem(null);
        } else {
            onAddCustomItem(customItemData);
        }
    };

    const handleDeleteCustom = () => {
        if (deletingItem) {
            onDeleteCustomItem(deletingItem);
            setDeletingItem(null);
        }
    };

    return (
        <>
            <GridHeader>
                <SearchBar
                    type="text"
                    placeholder={`Buscar em ${listName}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddCustomButton onClick={() => { setEditingItem(null); setCustomItemModalOpen(true); }}>
                    + Criar {listName.slice(0, -1)} Customizada
                </AddCustomButton>
            </GridHeader>

            {selectedItems?.length > 0 && (
                <SelectedItemsContainer>
                    {selectedItems.map((item) => (
                        <SelectedItem 
                            key={item.id} 
                            $fromArchetype={item.fromArchetype}
                            $isLocked={lockedItems.has(item.nome)}
                        >
                            {item.isSpecialization ? `${item.nome} (Especialização: ${item.subOption})` : (item.subOption ? `${item.nome}: ${item.subOption}` : item.nome)}
                            <RemoveButton onClick={() => onRemoveItem(item.id)} title={lockedItems.has(item.nome) ? "Item bloqueado por Arquétipo ou Kit" : "Remover"}>
                                &times;
                            </RemoveButton>
                        </SelectedItem>
                    ))}
                </SelectedItemsContainer>
            )}

            <GridContainer>
                <Grid>
                    {filteredItems.map(item => {
                        const count = itemCounts[item.nome] || 0;
                        const isSelected = count > 0;
                        const isDisabled = lockedItems.has(item.nome) || (isSelected && !item.repetivel);

                        return (
                            <ItemCard
                                key={item.nome}
                                onClick={() => !isDisabled && handleItemClick(item)}
                                onContextMenu={(e) => { e.preventDefault(); setModalContent(item); }}
                                disabled={isDisabled}
                                $isCustom={item.isCustom}
                                $isLocked={lockedItems.has(item.nome)}
                            >
                                <ItemName>{item.nome}</ItemName>
                                <ItemCost>{item.custo > 0 ? `+${item.custo}` : item.custo}pt</ItemCost>
                                
                                {item.repetivel && count > 0 && (
                                    <CounterBadge>{count}</CounterBadge>
                                )}
                                
                                {item.isCustom && isEditing && (
                                    <CustomItemControls>
                                        <button onClick={(e) => { e.stopPropagation(); setEditingItem(item); setCustomItemModalOpen(true); }} title="Editar"><FaPen /></button>
                                        <button onClick={(e) => { e.stopPropagation(); setDeletingItem(item); }} title="Deletar"><FaTrash /></button>
                                    </CustomItemControls>
                                )}
                            </ItemCard>
                        );
                    })}
                </Grid>
            </GridContainer>

            <HintText>
                <b>Botão esquerdo:</b> selecionar item. <b>Botão direito:</b> ver detalhes.
            </HintText>

            {specializationModalItem && (
                <Modal isOpen={!!specializationModalItem} onClose={() => setSpecializationModalItem(null)}>
                    <SpecializationModalContent>
                        <h3>{specializationModalItem.nome}</h3>
                        <p>Deseja adquirir a perícia completa ou uma especialização?</p>
                        
                        <ChoiceButton onClick={() => handleConfirmSpecialization(specializationModalItem, false)}>
                            Perícia Completa (+1 Ponto)
                        </ChoiceButton>
                        
                        <hr />

                        <p>Uma especialização concede acerto crítico com 5 ou 6 em testes, mas apenas em uma área específica da perícia.</p>
                        <SpecializationInput 
                            type="text"
                            value={specializationName}
                            onChange={(e) => setSpecializationName(e.target.value)}
                            placeholder="Ex: Escalar, Lábia, Parkour..."
                        />
                        <ChoiceButton onClick={() => handleConfirmSpecialization(specializationModalItem, true)} disabled={!specializationName.trim()}>
                            Especialização (+1 Ponto)
                        </ChoiceButton>
                        
                        <DisclaimerText>
                            "Lembre-se, tudo isto deve ser aprovado pelo mestre."
                            <span>3DeT Victory - Livro Básico, pág. 168</span>
                        </DisclaimerText>
                    </SpecializationModalContent>
                </Modal>
            )}

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

            <CustomItemModal
                isOpen={customItemModalOpen}
                onClose={() => { setCustomItemModalOpen(false); setEditingItem(null); }}
                onSave={handleSaveCustom}
                itemType={listName.slice(0, -1)}
                initialData={editingItem}
            />

            <ConfirmModal
                isOpen={!!deletingItem}
                onClose={() => setDeletingItem(null)}
                onConfirm={handleDeleteCustom}
                title={`Deletar ${listName.slice(0, -1)}`}
                message={`Tem certeza que deseja deletar "${deletingItem?.nome}"? Esta ação não pode ser desfeita.`}
            />
        </>
    );
};