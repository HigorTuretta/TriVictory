import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Garanta que o toast está importado
import { Modal } from '../Modal';
import { CustomItemModal } from '../CustomItemModal';
import { ConfirmModal } from '../ConfirmModal';
import { FaPen, FaTrash } from 'react-icons/fa';
import { 
    Grid, ItemCard, ItemName, ItemCost, SearchBar, GridContainer, SelectedItemsContainer, 
    SelectedItem, RemoveButton, GridHeader, AddCustomButton, HintText, CustomItemControls,
    SpecializationModalContent, SpecializationInput, DisclaimerText
} from './styles';
import { ChoiceButton } from '../../screens/CharacterSheet/styles';

export const SelectionGrid = ({ items, selectedItems, disabledItems, onAddItem, onRemoveItem, listName, onAddCustomItem, onUpdateCustomItem, onDeleteCustomItem }) => {
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
        if (disabledItems.includes(item.nome)) return;
        
        // --- LÓGICA ATUALIZADA ---
        // Se for a lista de perícias, abre o modal de especialização
        if (listName === 'Perícias') {
            setSpecializationModalItem(item);
            return;
        }

        // Comportamento antigo para Vantagens e Desvantagens
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
            // Adiciona a perícia como especialização, com o nome no subOption
            onAddItem({ ...pericia, isSpecialization: true }, specializationName.trim());
        } else {
            // Adiciona a perícia completa
            onAddItem(pericia, null);
        }
        // Reseta e fecha o modal
        setSpecializationModalItem(null);
        setSpecializationName('');
    };

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
                            "Lembre-se, tudo isto deve ser aprovado pelo mestre. Isso significa que o jogador propõe uma especialização que se encaixe em seu conceito de personagem, e o Mestre avalia se ela é adequada para a campanha."
                            <span>3DeT Victory - Livro Básico, pág. 168</span>
                        </DisclaimerText>
                    </SpecializationModalContent>
                </Modal>
            )}

            {modalContent && (
                <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
                    <h3>{modalContent.nome}</h3>
                    <p><strong>Custo:</strong> {modalContent.custo > 0 ? `+${modalContent.custo}` : modalContent.custo}pt</p>
                    <p style={{ marginTop: '1rem' }}>{modalContent.descricao}</p>
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