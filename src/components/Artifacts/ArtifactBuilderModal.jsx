// src/components/Artifacts/ArtifactBuilderModal.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '../Modal';
import { ConfirmModal } from '../ConfirmModal';
import * as gameData from '../../data/gameData';
import toast from 'react-hot-toast';
import { BuilderWrapper, Header, XpTracker, QualityGrid, QualityCard, AddCustomButton, SubChoiceInput } from './styles';
import { SelectionGrid } from '../SelectionGrid';
import { ModalSelectionWrapper, ModalOptionButton } from '../SelectionGrid/styles';

const SubChoiceModal = ({ isOpen, title, options, onSelect, onClose, description }) => {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            <ModalSelectionWrapper>
                {options.map(opt => (
                    <ModalOptionButton key={opt.label} onClick={() => onSelect(opt.value)}>
                        {opt.label}
                        {opt.description && <small>{opt.description}</small>}
                    </ModalOptionButton>
                ))}
            </ModalSelectionWrapper>
        </Modal>
    );
};

const SubtypeInputModal = ({ isOpen, quality, onClose, onSelect }) => {
    const [subType, setSubType] = useState('');
    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!subType.trim()) {
            return toast.error(`Você precisa definir um(a) ${quality.requerSubtipo}.`);
        }
        onSelect(subType);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Detalhe para: {quality.nome}</h3>
            <p>{quality.descricao}</p>
            <SubChoiceInput
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                placeholder={`Defina o(a) ${quality.requerSubtipo}`}
                autoFocus
            />
            <button onClick={handleConfirm} style={{width: '100%', marginTop: '1rem'}}>Confirmar</button>
        </Modal>
    );
};

const CodigoChooserModal = ({ isOpen, quality, onSelect, onClose }) => {
    const codigoOptions = useMemo(() => {
        const codigoDisadvantage = gameData.desvantagens.find(d => d.nome === 'Código');
        return codigoDisadvantage?.opcoes || [];
    }, []);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Escolha um Código para "{quality?.nome}"</h3>
            <p>Selecione o código de honra que este artefato seguirá.</p>
            <ModalSelectionWrapper>
                 {codigoOptions.map(opt => (
                    <ModalOptionButton key={opt.nome} onClick={() => onSelect({ subOption: opt.nome, cost: quality.custo })}>
                        {opt.nome}
                        {/* A descrição agora existe e será exibida corretamente */}
                        <small>{opt.descricao}</small> 
                    </ModalOptionButton>
                ))}
            </ModalSelectionWrapper>
        </Modal>
    );
};

export const ArtifactBuilderModal = ({ 
    isOpen, onClose, onSave, artifactToEdit, xpBudget,
    characterSkills = [], characterAdvantages = [], characterDisadvantages = [] 
}) => {
    const [name, setName] = useState('');
    const [qualities, setQualities] = useState([]);
    const [subChoice, setSubChoice] = useState({ modal: null, quality: null });

    useEffect(() => {
        if (isOpen) {
            if (artifactToEdit) {
                setName(artifactToEdit.name);
                setQualities(artifactToEdit.qualities || []);
            } else {
                setName('');
                setQualities([]);
            }
        }
    }, [artifactToEdit, isOpen]);

    const spentXp = useMemo(() => qualities.reduce((sum, q) => sum + (q.custo || 0), 0), [qualities]);
    const remainingXp = xpBudget - spentXp;
    
    const closeSubModal = () => setSubChoice({ modal: null, quality: null });

    const handleToggleQuality = useCallback((quality) => {
        const existingQuality = qualities.find(q => q.nome === quality.nome && !q.repetivel);
        if (existingQuality) {
            return setQualities(prev => prev.filter(q => q.id !== existingQuality.id));
        }

        const baseCost = Array.isArray(quality.custos) ? Math.min(...quality.custos.map(cost => Math.abs(cost))) : (quality.custo || 0);
        if (remainingXp < baseCost && !quality.requerVantagem) {
            return toast.error("XP do Artefato insuficiente!");
        }
        
        if (quality.custos) setSubChoice({ modal: 'custos', quality });
        else if (quality.requerSubtipo) setSubChoice({ modal: 'subtype', quality });
        else if (quality.requerVantagem) setSubChoice({ modal: 'vantagem', quality });
        else if (quality.requerCodigo) setSubChoice({ modal: 'codigo', quality });
        else if (quality.requerInimigo) setSubChoice({ modal: 'inimigo', quality });
        else if (quality.requerPericia) setSubChoice({ modal: 'pericia', quality });
        else {
            setQualities(prev => [...prev, { ...quality, id: uuidv4() }]);
        }
    }, [qualities, remainingXp]);
    
    const handleSubChoiceSelect = (choiceData) => {
        const { quality } = subChoice;
        
        // CORREÇÃO: Lógica unificada para criar o novo objeto de qualidade
        const newQuality = { 
            ...quality, 
            id: uuidv4(), 
            subOption: choiceData.subOption, 
            custo: choiceData.cost 
        };
        
        if (remainingXp < (newQuality.custo || 0)) {
            toast.error("XP do Artefato insuficiente!");
        } else {
            setQualities(prev => [...prev, newQuality]);
        }
        closeSubModal();
    };

    const getSubModalOptions = useCallback(() => {
        const { quality } = subChoice;
        if (!quality) return [];
        if (quality.custos) {
            return quality.custos.map(cost => ({ 
                label: `${quality.nome} (${cost > 0 ? `+${cost}` : cost}XP)`, 
                value: { cost, subOption: `${cost}XP` } 
            }));
        }
        if (quality.requerVantagem) {
            return gameData.vantagens.filter(v => v.custo > 0).map(v => ({ 
                label: v.nome, 
                value: { subOption: v.nome, cost: v.custo * 10 }
            }));
        }
        return [];
    }, [subChoice]);

     const formatQualityCost = (quality) => {
        if (quality.custos) {
            return `(${quality.custos.join('/')}XP)`;
        }
        if (quality.custo === 0) return '(XP Variável)';
        return `(${quality.custo > 0 ? `+${quality.custo}`: quality.custo}XP)`;
    };

    const handleSave = () => {
        if (!name.trim()) return toast.error("O artefato precisa de um nome.");
        if (spentXp > xpBudget) return toast.error("XP gasto excede o total disponível do artefato.");
        const artifactData = { id: artifactToEdit?.id || `art-${Date.now()}`, name, qualities };
        onSave(artifactData);
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="large">
                <BuilderWrapper>
                    <Header>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Artefato"/>
                        <XpTracker $invalid={remainingXp < 0}>XP Gasto: {spentXp} / {xpBudget} (Restam: {remainingXp})</XpTracker>
                    </Header>
                    <QualityGrid>
                        {gameData.qualidadesDeArtefatos.map(q => {
                            const isSelected = qualities.some(sq => sq.nome === q.nome && !sq.repetivel);
                            const baseCost = Array.isArray(q.custos) ? Math.min(...q.custos.map(Math.abs)) : (q.custo || 0);
                            const isDisabled = !isSelected && remainingXp < baseCost;

                            return (
                                <QualityCard key={q.nome} onClick={() => handleToggleQuality(q)} $selected={isSelected} disabled={isDisabled}>
                                    <strong>{q.nome} {formatQualityCost(q)}</strong>
                                    <small>{q.descricao}</small>
                                </QualityCard>
                            );
                        })}
                    </QualityGrid>
                    <AddCustomButton onClick={() => toast('Funcionalidade em breve!', { icon: '🚧' })}>+ Adicionar Qualidade Customizada</AddCustomButton>
                    <button onClick={handleSave}>Salvar Artefato</button>
                </BuilderWrapper>
            </Modal>
            
            <SubChoiceModal 
                isOpen={subChoice.modal === 'custos' || subChoice.modal === 'vantagem'}
                onClose={closeSubModal}
                title={`Selecione uma opção para ${subChoice.quality?.nome}`}
                options={getSubModalOptions()}
                onSelect={handleSubChoiceSelect}
            />
            
            <SubtypeInputModal 
                isOpen={subChoice.modal === 'subtype'}
                quality={subChoice.quality}
                onClose={closeSubModal}
                onSelect={(subOption) => handleSubChoiceSelect({ subOption, cost: subChoice.quality.custo })}
            />
            
            <CodigoChooserModal
                isOpen={subChoice.modal === 'codigo'}
                quality={subChoice.quality}
                onClose={closeSubModal}
                onSelect={handleSubChoiceSelect} // Passa a função diretamente
            />

            <Modal isOpen={subChoice.modal === 'vantagem'} onClose={closeSubModal} size="large">
                <h3>Escolha uma Vantagem para "{subChoice.quality?.nome}"</h3>
                <SelectionGrid items={gameData.vantagens.filter(v => v.custo > 0)} selectedItems={[]} onAddItem={(item) => handleSubChoiceSelect({ subOption: item.nome, cost: (item.custo || 1) * 10 })} listName="Vantagens" isEditing={true} points={{ remaining: 999 }} />
            </Modal>
             <Modal isOpen={subChoice.modal === 'pericia'} onClose={closeSubModal} size="large">
                <h3>Escolha uma Perícia para "{subChoice.quality?.nome}"</h3>
                <SelectionGrid items={gameData.pericias} selectedItems={[]} onAddItem={(item) => handleSubChoiceSelect({ subOption: item.nome, cost: subChoice.quality.custo })} listName="Perícias" isEditing={true} points={{ remaining: 999 }} characterSkills={characterSkills} />
            </Modal>
        </>
    );
};