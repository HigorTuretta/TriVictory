import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../Modal';
import { CustomItemModal } from '../CustomItemModal';
import { ConfirmModal } from '../ConfirmModal';
import { FaPen, FaTrash } from 'react-icons/fa';
import { 
    Grid, ItemCard, ItemName, ItemCost, SearchBar, GridContainer, 
    SelectedItemsContainer, SelectedItem, RemoveButton, GridHeader, 
    AddCustomButton, HintText, CustomItemControls, SpecializationModalContent, 
    SpecializationInput, DisclaimerText, CounterBadge
} from './styles';
import { ChoiceButton } from '../../screens/CharacterSheet/styles';

// --- Subcomponente: Item da Grade ---
const GridItem = ({ item, count, isDisabled, isLocked, onClick, onContextMenu, onEdit, onDelete, isEditing }) => (
    <ItemCard
        onClick={() => !isDisabled && onClick(item)}
        onContextMenu={(e) => { e.preventDefault(); onContextMenu(item); }}
        disabled={isDisabled}
        $isCustom={item.isCustom}
        $isLocked={isLocked}
    >
        <ItemName>{item.nome}</ItemName>
        <ItemCost>{item.custo > 0 ? `+${item.custo}` : item.custo}pt</ItemCost>
        
        {item.repetivel && count > 0 && <CounterBadge>{count}</CounterBadge>}
        
        {item.isCustom && isEditing && (
            <CustomItemControls>
                <button onClick={(e) => { e.stopPropagation(); onEdit(item); }} title="Editar"><FaPen /></button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(item); }} title="Deletar"><FaTrash /></button>
            </CustomItemControls>
        )}
    </ItemCard>
);

// --- Subcomponentes de Modal ---
const ItemDetailsModal = ({ item, onClose }) => {
    // CORREÇÃO: Adicionada verificação para prevenir erro quando 'item' é nulo.
    if (!item) return null;

    return (
        <Modal isOpen={!!item} onClose={onClose}>
            <h3>{item.nome}</h3>
            <p><strong>Custo:</strong> {item.custo > 0 ? `+${item.custo}` : item.custo}pt</p>
            <p style={{marginTop: '1rem', whiteSpace: 'pre-wrap'}}>{item.descricao}</p>
        </Modal>
    );
};

const SubOptionModal = ({ item, onSelect, onClose }) => {
    // CORREÇÃO: Adicionada verificação de segurança.
    if (!item) return null;

    return (
        <Modal isOpen={!!item} onClose={onClose}>
            <h3>Escolha uma opção para: {item.nome}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {item.opcoes.map(opt => (
                    <ChoiceButton key={opt} onClick={() => onSelect(item, opt)}>
                        {opt}
                    </ChoiceButton>
                ))}
            </div>
        </Modal>
    );
};

const SpecializationModal = ({ item, onConfirm, onClose }) => {
    const [name, setName] = useState('');

    // CORREÇÃO: Adicionada verificação de segurança.
    if (!item) return null;

    const handleConfirm = (isSpecialization) => {
        if (isSpecialization && !name.trim()) {
            toast.error('Por favor, defina um nome para a especialização.');
            return;
        }
        onConfirm(item, isSpecialization, name.trim());
        onClose();
    };

    return (
        <Modal isOpen={!!item} onClose={onClose}>
            <SpecializationModalContent>
                <h3>{item.nome}</h3>
                <p>Deseja adquirir a perícia completa ou uma especialização?</p>
                <ChoiceButton onClick={() => handleConfirm(false)}>Perícia Completa (+1 Ponto)</ChoiceButton>
                <hr />
                <p>Uma especialização concede acerto crítico com 5 ou 6, mas apenas em uma área específica da perícia.</p>
                <SpecializationInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Escalar, Lábia, Parkour..."/>
                <ChoiceButton onClick={() => handleConfirm(true)} disabled={!name.trim()}>Especialização (+1 Ponto)</ChoiceButton>
                <DisclaimerText>"Lembre-se, tudo isto deve ser aprovado pelo mestre."<span>3DeT Victory - Livro Básico, pág. 168</span></DisclaimerText>
            </SpecializationModalContent>
        </Modal>
    );
};

// --- Componente Principal ---
export const SelectionGrid = ({
    items, selectedItems = [], lockedItems = new Set(), itemCounts = {},
    onAddItem, onRemoveItem, listName, isEditing,
    onAddCustomItem, onUpdateCustomItem, onDeleteCustomItem
}) => {
    const [activeModal, setActiveModal] = useState({ type: null, data: null });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item => item.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const closeModal = () => setActiveModal({ type: null, data: null });

    const handleItemClick = (item) => {
        if (listName === 'Perícias') {
            setActiveModal({ type: 'specialization', data: item });
        } else if (item.opcoes) {
            setActiveModal({ type: 'subOption', data: item });
        } else {
            onAddItem(item, null);
        }
    };

    const handleSelectSubOption = (item, option) => {
        onAddItem(item, option);
        if (!item.repetivel) {
            closeModal();
        }
    };

    const handleConfirmSpecialization = (pericia, isSpecialization, specializationName) => {
        onAddItem({ ...pericia, isSpecialization }, specializationName);
    };

    const handleSaveCustom = (customItemData) => {
        if (activeModal.type === 'customEdit') {
            onUpdateCustomItem({ ...activeModal.data, ...customItemData });
        } else {
            onAddCustomItem(customItemData);
        }
        closeModal();
    };

    const handleDeleteCustom = () => {
        if (activeModal.type === 'customDelete') {
            onDeleteCustomItem(activeModal.data);
            closeModal();
        }
    };

    return (
        <>
            <GridHeader>
                <SearchBar placeholder={`Buscar em ${listName}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <AddCustomButton onClick={() => setActiveModal({ type: 'customAdd', data: null })}>
                    + Criar {listName.slice(0, -1)} Customizada
                </AddCustomButton>
            </GridHeader>

            {selectedItems?.length > 0 && (
                <SelectedItemsContainer>
                    {selectedItems.map((item) => (
                        <SelectedItem key={item.id} $isLocked={lockedItems.has(item.nome)}>
                            {item.isSpecialization ? `${item.nome} (Especialização: ${item.subOption})` : (item.subOption ? `${item.nome}: ${item.subOption}` : item.nome)}
                            <RemoveButton onClick={() => onRemoveItem(item.id)} title={lockedItems.has(item.nome) ? "Item bloqueado" : "Remover"} disabled={lockedItems.has(item.nome)}>×</RemoveButton>
                        </SelectedItem>
                    ))}
                </SelectedItemsContainer>
            )}

            <GridContainer>
                <Grid>
                    {filteredItems.map(item => (
                        <GridItem
                            key={item.nome}
                            item={item}
                            count={itemCounts[item.nome] || 0}
                            isDisabled={lockedItems.has(item.nome) || (itemCounts[item.nome] > 0 && !item.repetivel)}
                            isLocked={lockedItems.has(item.nome)}
                            isEditing={isEditing}
                            onClick={handleItemClick}
                            onContextMenu={(data) => setActiveModal({ type: 'details', data })}
                            onEdit={(data) => setActiveModal({ type: 'customEdit', data })}
                            onDelete={(data) => setActiveModal({ type: 'customDelete', data })}
                        />
                    ))}
                </Grid>
            </GridContainer>

            <HintText><b>Botão esquerdo:</b> selecionar item. <b>Botão direito:</b> ver detalhes.</HintText>

            {/* Renderização dos Modais */}
            <ItemDetailsModal item={activeModal.type === 'details' ? activeModal.data : null} onClose={closeModal} />
            <SubOptionModal item={activeModal.type === 'subOption' ? activeModal.data : null} onSelect={handleSelectSubOption} onClose={closeModal} />
            <SpecializationModal item={activeModal.type === 'specialization' ? activeModal.data : null} onConfirm={handleConfirmSpecialization} onClose={closeModal} />
            
            <CustomItemModal
                isOpen={activeModal.type === 'customAdd' || activeModal.type === 'customEdit'}
                onClose={closeModal}
                onSave={handleSaveCustom}
                itemType={listName.slice(0, -1)}
                initialData={activeModal.type === 'customEdit' ? activeModal.data : null}
            />
            <ConfirmModal
                isOpen={activeModal.type === 'customDelete'}
                onClose={closeModal}
                onConfirm={handleDeleteCustom}
                title={`Deletar ${listName.slice(0, -1)}`}
                message={`Tem certeza que deseja deletar "${activeModal.data?.nome}"? Esta ação não pode ser desfeita.`}
            />
        </>
    );
};