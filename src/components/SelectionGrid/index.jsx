// src/components/SelectionGrid/index.jsx
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
    SpecializationInput, DisclaimerText, CounterBadge, ModalSelectionWrapper, ModalOptionButton
} from './styles';
import { ChoiceButton } from '../../screens/CharacterSheet/styles';
import * as gameData from '../../data/gameData'; // Importa para acessar todas as perícias

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
            <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{item.descricao}</p>
        </Modal>
    );
};

const OptionsChooserModal = ({ isOpen, title, options, onSelect, onClose }) => {
    if (!isOpen || !options) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{title}</h3>
            <ModalSelectionWrapper>
                {options.map((opt, idx) => (
                    <ModalOptionButton
                        key={idx}                  // chave local
                        onClick={() => onSelect(idx)}
                    >
                        {opt.label}
                        {opt.description && <small>{opt.description}</small>}
                    </ModalOptionButton>
                ))}
            </ModalSelectionWrapper>
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
                <SpecializationInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Escalar, Lábia, Parkour..." />
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
    onAddCustomItem, onUpdateCustomItem, onDeleteCustomItem,
    characterSkills = [], points = { remaining: 0 }
}) => {
    const [activeModal, setActiveModal] = useState({ type: null, data: null });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item => item.nome.toLowerCase().includes(searchTerm.toLowerCase()));

    const closeModal = () => setActiveModal({ type: null, data: null });

    const handleItemClick = (item) => {
        if (listName === 'Perícias' && item.nome === 'Perícias') { // Exemplo de condição específica se necessário
            setActiveModal({ type: 'specialization', data: item });
        } else if (item.opcoes) {
            setActiveModal({ type: 'options', data: item });
        } else if (item.custos) {
            setActiveModal({ type: 'cost', data: item });
        } else if (item.requerPericia) {
            setActiveModal({ type: 'pericia', data: item });
        } else {
            onAddItem(item, null, item.custo);
        }
    };

 // CORREÇÃO: handleSelectSubOption agora lida com strings diretamente.
    const handleSelectSubOption = (option) => {
        // Se 'option' for um objeto (como em Ajudante), usamos 'option.nome'.
        // Se for uma string (como em Código), usamos a própria string.
        const subOptionName = typeof option === 'string' ? option : option.nome;
        onAddItem(activeModal.data, subOptionName, activeModal.data.custo);
        if (!activeModal.data.repetivel) {
            closeModal();
        }
    };

    const handleConfirmSpecialization = (pericia, isSpecialization, specializationName) => {
        onAddItem({ ...pericia, isSpecialization }, specializationName, pericia.custo);
    };

    const handleCostSelect = (cost) => {
        onAddItem(activeModal.data, null, cost);
        closeModal();
    };

    const handlePericiaSelect = (pericia) => {
        onAddItem(activeModal.data, pericia.nome, activeModal.data.custo);
        closeModal();
    };

    const getModalOptions = () => {
        const { type, data } = activeModal;
        if (!data) return null;

       
        if (type === 'options') {
            return data.opcoes.map(opt => {
                // Se o item da opção é uma string, use-a como label e valor.
                if (typeof opt === 'string') {
                    return { label: opt, description: null, value: opt };
                }
                // Se for um objeto, use as propriedades nome e descrição.
                return { label: opt.nome, description: opt.descricao, value: opt };
            });
        }

        // CORREÇÃO: Garante que o label exiba o custo correto para cada opção.
        if (type === 'cost') {
            return data.custos.map(cost => ({
                label: `${data.nome} (${cost > 0 ? '+' : ''}${cost}pt)`,
                value: cost
            }));
        }

        if (type === 'pericia') {
            const chosenSkills = selectedItems.filter(i => i.nome === data.nome).map(i => i.subOption);
            const allPossibleSkills = listName === 'Vantagens' ? characterSkills : gameData.pericias;
            const availableSkills = allPossibleSkills.filter(p => !chosenSkills.includes(p.nome));

            if (availableSkills.length === 0) {
                // Adiciona um feedback claro se não houver opções
                return [{ label: `Nenhuma perícia disponível para ${data.nome}`, value: null }];
            }

            return availableSkills.map(pericia => ({ label: pericia.nome, value: pericia }));
        }
        return null;
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
                {isEditing && (
                    <AddCustomButton onClick={() => setActiveModal({ type: 'customAdd', data: null })}>
                        + Criar {listName.slice(0, -1)} Customizada
                    </AddCustomButton>
                )}
            </GridHeader>

            {selectedItems?.length > 0 && (
                <SelectedItemsContainer>
                    {selectedItems.map((item) => (
                        <SelectedItem key={item.id} $isLocked={lockedItems.has(item.nome)}>
                            {item.isSpecialization ? `${item.nome} (Especialização: ${item.subOption})` : (item.subOption ? `${item.nome}: ${item.subOption}` : item.nome)}
                            <span style={{ opacity: 0.7, marginLeft: '0.5rem' }}>({item.custo}pt)</span>
                            <RemoveButton onClick={() => onRemoveItem(item.id)} title={lockedItems.has(item.nome) ? "Item bloqueado" : "Remover"} disabled={lockedItems.has(item.nome)}>×</RemoveButton>
                        </SelectedItem>
                    ))}
                </SelectedItemsContainer>
            )}

            <GridContainer>
                <Grid>
                    {filteredItems.map(item => {
                        const cantAfford = isEditing && item.custo > 0 && points.remaining < item.custo;
                        const isDisabled = lockedItems.has(item.nome) || (itemCounts[item.nome] > 0 && !item.repetivel) || cantAfford;

                        return (
                            <GridItem
                                key={item.nome}
                                item={item}
                                count={itemCounts[item.nome] || 0}
                                isDisabled={isDisabled}
                                isLocked={lockedItems.has(item.nome)}
                                isEditing={isEditing}
                                onClick={handleItemClick}
                                onContextMenu={(data) => setActiveModal({ type: 'details', data })}
                                onEdit={(data) => setActiveModal({ type: 'customEdit', data })}
                                onDelete={(data) => setActiveModal({ type: 'customDelete', data })}
                            />
                        );
                    })}
                </Grid>
            </GridContainer>

            <HintText><b>Botão esquerdo:</b> selecionar item. <b>Botão direito:</b> ver detalhes.</HintText>

            <ItemDetailsModal item={activeModal.type === 'details' ? activeModal.data : null} onClose={closeModal} />

            <OptionsChooserModal
                isOpen={activeModal.type === 'options'}
                onClose={closeModal}
                title={`Escolha uma opção para ${activeModal.data?.nome}`}
                options={getModalOptions()}
                onSelect={handleSelectSubOption}
            />
            <OptionsChooserModal
                isOpen={activeModal.type === 'cost'}
                onClose={closeModal}
                title={`Escolha o custo para ${activeModal.data?.nome}`}
                options={getModalOptions()}
                onSelect={handleCostSelect}
            />
            <OptionsChooserModal
                isOpen={activeModal.type === 'pericia'}
                onClose={closeModal}
                title={`Escolha uma Perícia para ${activeModal.data?.nome}`}
                options={getModalOptions()}
                onSelect={handlePericiaSelect}
            />

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